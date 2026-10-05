import argparse
import hashlib
import json
import shutil
import subprocess
import uuid
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent
PROJECT = ROOT.parents[2]
GROK = "/Users/ocasta/.grok/bin/grok"
PLAN = {item["id"]: item for item in json.loads((ROOT / "plan.json").read_text())}


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def request(identifier, version="v01"):
    return json.loads(
        (ROOT / "requests" / f"{identifier.lower()}-{version}.json").read_text()
    )


def import_image(identifier, source, evidence=None, version="v01"):
    source = Path(source)
    with Image.open(source) as image:
        image.verify()
    with Image.open(source) as image:
        extension = {"PNG": ".png", "JPEG": ".jpg", "WEBP": ".webp"}[image.format]
        dimensions, mode = image.size, image.mode
    destination = ROOT / "images" / f"{identifier.lower()}-{version}{extension}"
    if destination.exists():
        raise ValueError(f"Refusing to replace {destination}")
    shutil.copyfile(source, destination)
    raw_request = request(identifier, version)
    record = {
        "id": identifier,
        "title": PLAN[identifier]["title"],
        "provider": PLAN[identifier]["provider"],
        "model": "not exposed by tool",
        "request": raw_request,
        "source_sha256": digest(Path(raw_request["referenced_image_paths"][0])),
        "source_reference": PLAN[identifier].get("source_id", "S13"),
        "original_output": str(source),
        "file": str(destination.relative_to(PROJECT)),
        "sha256": digest(destination),
        "dimensions": dimensions,
        "mode": mode,
        "pixel_changes": "none",
        "parent_visual_review": "pending",
        "review_status": "pending",
        **(evidence or {}),
    }
    (ROOT / "records" / f"{identifier.lower()}-{version}.json").write_text(
        json.dumps(record, ensure_ascii=False, indent=2) + "\n"
    )
    print(
        json.dumps(
            {"id": identifier, "file": record["file"], "dimensions": dimensions}
        ),
        flush=True,
    )


def generate_grok(identifier, version="v01"):
    if PLAN[identifier]["provider"] != "grok":
        raise ValueError("Not a Grok request")
    if list((ROOT / "records").glob(f"{identifier.lower()}-{version}.json")):
        raise ValueError(f"Already generated {identifier}")
    session = str(uuid.uuid4())
    cwd = Path("/private/tmp") / f"dias-face-{identifier.lower()}-{session}"
    cwd.mkdir()
    raw = request(identifier, version)
    tool_input = {
        "prompt": raw["prompt"],
        "image": raw["referenced_image_paths"],
        "aspect_ratio": "1:1",
    }
    prompt_path = cwd / "request.txt"
    prompt_path.write_text(
        "Call native image_edit exactly once with the following literal JSON arguments. Do not rewrite or abbreviate the prompt, do not use image_gen, and do not call any other tool. After completion report the returned image path only.\n"
        + json.dumps(tool_input, ensure_ascii=False)
    )
    command = [
        GROK,
        "--cwd",
        str(cwd),
        "--session-id",
        session,
        "--prompt-file",
        str(prompt_path),
        "--output-format",
        "streaming-json",
        "--tools",
        "image_edit",
        "--allow",
        "image_edit",
        "--permission-mode",
        "dontAsk",
        "--no-subagents",
        "--disable-web-search",
        "--verbatim",
        "--max-turns",
        "4",
    ]
    events_path = cwd / "events.ndjson"
    with events_path.open("w") as output, (cwd / "stderr.txt").open("w") as errors:
        completed = subprocess.run(command, stdout=output, stderr=errors, check=False)
    events = [
        json.loads(line)
        for line in events_path.read_text().splitlines()
        if line.startswith("{")
    ]
    calls = [event for event in events if event.get("type") == "tool_call"]
    outputs = [
        event
        for event in events
        if event.get("type") == "tool_call_update"
        and event.get("status") == "completed"
        and event.get("rawOutput", {}).get("path")
    ]
    evidence = {
        "session_id": session,
        "fresh_session": True,
        "cwd": str(cwd),
        "command": command,
        "raw_events_path": str(events_path),
        "exit_code": completed.returncode,
        "actual_tool_inputs": [event.get("rawInput") for event in calls],
        "reference_verified": len(calls) == 1
        and calls[0].get("toolName") == "image_edit"
        and calls[0].get("rawInput") == tool_input,
    }
    if completed.returncode or not evidence["reference_verified"] or len(outputs) != 1:
        (ROOT / "records" / f"{identifier.lower()}-failed-{session}.json").write_text(
            json.dumps(evidence, indent=2) + "\n"
        )
        raise RuntimeError(
            f"{identifier} failed or actual inputs differed; inspect {events_path}"
        )
    evidence["tool_output"] = outputs[0]["rawOutput"]
    import_image(identifier, evidence["tool_output"]["path"], evidence, version)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--grok", nargs="+")
    parser.add_argument("--import-image", nargs=2, metavar=("ID", "ORIGINAL"))
    parser.add_argument("--version", default="v01", choices=("v01", "v02", "v03"))
    args = parser.parse_args()
    if args.import_image:
        import_image(*args.import_image, version=args.version)
    elif args.grok:
        with ThreadPoolExecutor(max_workers=3) as executor:
            list(
                executor.map(
                    lambda identifier: generate_grok(identifier, args.version),
                    args.grok,
                )
            )
