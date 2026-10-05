from __future__ import annotations

import csv
import hashlib
import json
from pathlib import Path

from foot_plan import CLIPS, DIRECTIONS, ORIGIN, frame, frames
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent
FONT = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 12)
COLORS = {"left": "#2362a2", "right": "#b84b21"}


def draw_pose(data: dict, title: str) -> Image.Image:
    image = Image.new("RGB", (256, 256), "#eeebe3")
    pen = ImageDraw.Draw(image)
    pen.rectangle((0, 0, 255, 255), outline="#b5b1a5")
    pen.text((8, 6), title, fill="#242720", font=FONT)
    pen.ellipse((88, 48, 168, 128), outline="#b5b1a5", width=2)
    pen.rectangle((110, 130, 146, 174), outline="#b5b1a5", width=2)
    pen.line((120, 208, 136, 208), fill="#73796d", width=1)
    pen.line((128, 200, 128, 216), fill="#73796d", width=1)
    for row, (side, foot) in enumerate(data["feet"].items()):
        color = COLORS[side]
        pen.line(
            [tuple(foot[key]) for key in ("hip", "knee", "ankle", "sole")],
            fill=color,
            width=3,
        )
        pen.line([tuple(foot[key]) for key in ("heel", "toe")], fill=color, width=4)
        x, y = foot["sole"]
        pen.ellipse((x - 3, y - 3, x + 3, y + 3), outline=color, width=2)
        status = "plant" if foot["planted"] else "lift"
        pen.text(
            (8, 24 + row * 14),
            f"{side[0].upper()} ({x:.2f}, {y:.2f}) {status}",
            fill=color,
            font=FONT,
        )
    pen.text(
        (8, 236), "2D geometry guide; gray = size bounds", fill="#73796d", font=FONT
    )
    return image


def export() -> None:
    selection = json.loads((ROOT.parent / "selection.json").read_text())
    for reference in selection["references"]:
        assert (
            hashlib.sha256(Path(reference["path"]).read_bytes()).hexdigest()
            == reference["sha256"]
        )
    plan = {
        "status": "Verified geometry targets; no replacement character artwork has been generated.",
        "basisCommit": "7f3cc60",
        "references": selection["references"],
        "cellSize": [256, 256],
        "standingHeight": 160,
        "rootCell": list(ORIGIN),
        "cameraElevationDegrees": 45,
        "fullCycleStride": 48,
        "walkCycleMs": 800,
        "walkSpeedAtReferenceScale": 60,
        "stanceFraction": 0.625,
        "maximumFootLift": 8,
        "sampleRule": "Midpoint of each frame hold; coordinates are not rounded before export.",
        "directions": {
            direction: {clip: frames(direction, clip) for clip in CLIPS}
            for direction in DIRECTIONS
        },
    }
    (ROOT / "foot-targets.json").write_text(json.dumps(plan, indent=2) + "\n")
    columns = ["direction", "clip", "frame", "start_ms", "end_ms", "root_forward"]
    for side in COLORS:
        columns += [
            f"{side}_{name}"
            for name in (
                "planted",
                "forward",
                "lift",
                "sole_x",
                "sole_y",
                "heel_x",
                "heel_y",
                "toe_x",
                "toe_y",
                "knee_x",
                "knee_y",
            )
        ]
    with (ROOT / "foot-targets.csv").open("w", newline="") as output:
        writer = csv.DictWriter(output, columns)
        writer.writeheader()
        for direction, clips in plan["directions"].items():
            for clip, poses in clips.items():
                for data in poses:
                    row = {
                        "direction": direction,
                        "clip": clip,
                        "frame": data["number"],
                        "start_ms": data["startMs"],
                        "end_ms": data["endMs"],
                        "root_forward": data["rootForward"],
                    }
                    for side, foot in data["feet"].items():
                        row.update(
                            {
                                f"{side}_{key}": foot[key]
                                for key in ("planted", "forward", "lift")
                            }
                        )
                        row.update(
                            {
                                f"{side}_{key}_{axis}": foot[key][index]
                                for key in ("sole", "heel", "toe", "knee")
                                for index, axis in enumerate(("x", "y"))
                            }
                        )
                    writer.writerow(
                        {
                            key: round(value, 6) if isinstance(value, float) else value
                            for key, value in row.items()
                        }
                    )
    guides = ROOT / "guides"
    guides.mkdir(exist_ok=True)
    for direction, clips in plan["directions"].items():
        for clip, poses in clips.items():
            columns = 6 if clip == "walk" else 3
            sheet = Image.new(
                "RGB", (columns * 256, ((len(poses) + columns - 1) // columns) * 256)
            )
            for index, data in enumerate(poses):
                sheet.paste(
                    draw_pose(data, f"{direction} / {clip} / {index + 1}"),
                    ((index % columns) * 256, (index // columns) * 256),
                )
            sheet.save(guides / f"{direction.lower()}-{clip}.png")
    keys = Image.new("RGB", (1024, 512))
    labels = (
        "L contact",
        "L down",
        "R passing",
        "L up",
        "R contact",
        "R down",
        "L passing",
        "R up",
    )
    phases = (0, 0.125, 0.3125, 0.375, 0.5, 0.625, 0.8125, 0.875)
    for index, label in enumerate(labels):
        keys.paste(
            draw_pose(frame("E", "walk", phases[index]), label),
            ((index % 4) * 256, (index // 4) * 256),
        )
    keys.save(ROOT / "key-poses.png")
    total = sum(
        len(poses) for clips in plan["directions"].values() for poses in clips.values()
    )
    print(
        f"Exported {total} frame targets, {len(DIRECTIONS) * len(CLIPS)} drawing guides and the eight-pose diagram."
    )


if __name__ == "__main__":
    export()
