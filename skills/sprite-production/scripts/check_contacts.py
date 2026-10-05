import argparse
import json
import math
import sys
from itertools import pairwise
from pathlib import Path
from typing import Any


def require(condition: bool, message: str) -> None:
    if not condition:
        raise ValueError(message)


def number(value: Any, label: str) -> float:
    require(
        type(value) in (int, float) and math.isfinite(value),
        f"{label} must be a finite number",
    )
    return float(value)


def point(value: Any, label: str) -> tuple[float, float]:
    require(
        isinstance(value, list) and len(value) == 2, f"{label} needs two coordinates"
    )
    return number(value[0], label), number(value[1], label)


def identifier(value: Any, label: str) -> str:
    require(
        isinstance(value, str) and bool(value.strip()), f"{label} needs an identifier"
    )
    return value


def mapping(value: Any, label: str) -> dict[str, Any]:
    require(isinstance(value, dict), f"{label} must be an object")
    return value


def sequence(value: Any, label: str) -> list[Any]:
    require(isinstance(value, list) and bool(value), f"{label} must be a nonempty list")
    return value


def check_contacts(document: dict[str, Any]) -> dict[str, Any]:
    document = mapping(document, "document")
    basis = document.get("basis")
    require(
        basis in ("target-plan", "measured-art"), "declare target-plan or measured-art"
    )
    budget = number(document.get("max_drift_px"), "max_drift_px")
    require(budget >= 0, "max_drift_px cannot be negative")
    failures: list[dict[str, Any]] = []
    observation_count = 0
    clip_ids: set[str] = set()
    for clip in sequence(document.get("clips"), "clips"):
        clip = mapping(clip, "clip")
        clip_id = identifier(clip.get("id"), "clip.id")
        require(clip_id not in clip_ids, f"duplicate clip {clip_id}")
        clip_ids.add(clip_id)
        targets = {
            identifier(key, "contact ID"): point(value, f"{clip_id}/{key}")
            for key, value in mapping(
                clip.get("world_contacts"), "world_contacts"
            ).items()
        }
        frame_ids: set[str] = set()
        expected_start = 0.0
        clip_observations = 0
        for frame in sequence(clip.get("frames"), f"{clip_id}.frames"):
            frame = mapping(frame, "frame")
            frame_id = identifier(frame.get("id"), "frame.id")
            label = f"{clip_id}/{frame_id}"
            require(frame_id not in frame_ids, f"duplicate frame {label}")
            frame_ids.add(frame_id)
            start = number(frame.get("start_ms"), f"{label}.start_ms")
            duration = number(frame.get("duration_ms"), f"{label}.duration_ms")
            require(duration > 0, f"{label} needs a positive duration")
            require(
                math.isclose(start, expected_start, rel_tol=0, abs_tol=1e-7),
                f"{label} timeline has a gap or overlap",
            )
            expected_start = start + duration
            pivot = point(frame.get("pivot"), f"{label}.pivot")
            required = frame.get("required_contacts")
            require(isinstance(required, list), f"{label} needs required_contacts")
            required = [identifier(key, label) for key in required]
            require(
                len(set(required)) == len(required), f"duplicate contacts in {label}"
            )
            require(set(required) <= targets.keys(), f"unknown contact in {label}")
            measured = mapping(frame.get("contacts"), f"{label}.contacts")
            require(
                measured.keys() <= set(required), f"unexpected measurement in {label}"
            )
            measured = {key: point(value, label) for key, value in measured.items()}
            samples = []
            for sample in sequence(frame.get("root_samples"), f"{label}.root_samples"):
                sample = mapping(sample, label)
                offset = number(sample.get("offset_ms"), f"{label}.offset_ms")
                require(0 <= offset <= duration, f"root sample outside {label} hold")
                samples.append((offset, point(sample.get("position"), label)))
            require(
                len(samples) >= 2
                and samples[0][0] == 0
                and math.isclose(samples[-1][0], duration, rel_tol=0, abs_tol=1e-7)
                and all(a[0] < b[0] for a, b in pairwise(samples)),
                f"{label} root samples must run in order from hold start to end",
            )
            for contact_id in required:
                location = {"clip": clip_id, "frame": frame_id, "contact": contact_id}
                if contact_id not in measured:
                    failures.append({**location, "reason": "missing-measurement"})
                    continue
                contact = measured[contact_id]
                errors = []
                for offset, root in samples:
                    actual = [root[i] + contact[i] - pivot[i] for i in (0, 1)]
                    error = math.dist(actual, targets[contact_id])
                    require(math.isfinite(error), f"non-finite projection in {label}")
                    errors.append((error, offset, actual))
                drift, offset, actual = max(errors, key=lambda entry: entry[0])
                clip_observations += len(samples)
                if drift > budget + 1e-9:
                    failures.append(
                        {
                            **location,
                            "reason": "contact-drift",
                            "drift_px": drift,
                            "budget_px": budget,
                            "offset_ms": offset,
                            "expected_world": targets[contact_id],
                            "actual_world": actual,
                        }
                    )
        if clip_observations == 0:
            failures.append({"clip": clip_id, "reason": "no-contact-evidence"})
        observation_count += clip_observations
    return {
        "passed": not failures,
        "basis": basis,
        "scope": "submitted contact samples only",
        "observation_count": observation_count,
        "failures": failures,
    }


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Check projected sprite contact measurements"
    )
    parser.add_argument("input", type=Path)
    parser.add_argument(
        "--output", type=Path, help="Write a new report; never overwrite a file"
    )
    args = parser.parse_args()
    try:
        report = check_contacts(json.loads(args.input.read_text()))
        serialized = json.dumps(report, indent=2, allow_nan=False) + "\n"
        if args.output:
            with args.output.open("x") as output:
                output.write(serialized)
    except (OSError, ValueError, TypeError, OverflowError) as error:
        print(json.dumps({"passed": False, "error": str(error)}), file=sys.stderr)
        return 2
    print(serialized, end="")
    return 0 if report["passed"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
