from __future__ import annotations

import hashlib
import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent
FAMILIES = ["idle", "walk", "cut", "guard", "hurt", "death", "interact", "prayer"]


def inspect_page(path: Path) -> dict:
    with Image.open(path) as image:
        if image.mode != "RGBA":
            raise ValueError(f"{path.name}: no RGBA transparency")
        if image.width % 6 or image.height % 8:
            raise ValueError(f"{path.name}: image dimensions do not fit the specified grid")
        width, height = image.width // 6, image.height // 8
        frames = []
        for index in range(48):
            x, y = index % 6 * width, index // 6 * height
            frame = image.crop((x, y, x + width, y + height))
            alpha = frame.getchannel("A")
            occupied = alpha.point(lambda value: 255 if value > 32 else 0).getbbox()
            if not occupied:
                raise ValueError(f"{path.name}: empty {FAMILIES[index // 6]} frame {index % 6 + 1}")
            if alpha.getextrema()[0] != 0:
                raise ValueError(f"{path.name}: frame {index} has an opaque background")
            frames.append(
                {
                    "family": FAMILIES[index // 6],
                    "pose": index % 6 + 1,
                    "rect": [x, y, width, height],
                    "pivot": [width / 2, height * 0.9],
                    "occupied": list(occupied),
                    "sha256": hashlib.sha256(frame.tobytes()).hexdigest(),
                    "border_touch": occupied[0] == 0
                    or occupied[1] == 0
                    or occupied[2] == width
                    or occupied[3] == height,
                }
            )
        return {
            "dimensions": list(image.size),
            "sha256": hashlib.sha256(path.read_bytes()).hexdigest(),
            "transparent_pixel_fraction": round(
                image.getchannel("A").histogram()[0] / (image.width * image.height), 4
            ),
            "frames": frames,
            "unique_cell_hashes": len({frame["sha256"] for frame in frames}),
            "standingHeight": round(
                sum(frame["occupied"][3] - frame["occupied"][1] for frame in frames[:6])
                / 6
            ),
            "assessment": "Generated study; identity, pose spacing, gait, guard coverage and prayer transitions need in-motion review. Foot pivots are fixed to the source grid, not manually perfected.",
        }


def clip(label: str, start: int, count: int, fps: int, loop: bool, weights=None) -> dict:
    holds = weights if weights is not None else [1] * count
    return {
        "label": label,
        "fps": fps,
        "loop": loop,
        "frames": [
            {"source": start + index, "durationMs": hold * 1000 / fps}
            for index, hold in enumerate(holds)
        ],
    }


def build_manifest() -> dict:
    active = json.loads((ROOT / "active-pages.json").read_text())
    pages = {}
    for direction, filename in active.items():
        data = inspect_page(ROOT / filename)
        pages[direction] = {"image": filename, **data}
    clips = {
        "idle": clip("Idle", 0, 6, 6, True),
        "walk": clip("Walk", 6, 6, 8, True),
        "cut": clip("Sword cut", 12, 6, 12, False, [1, 1.3, 1.2, 0.45, 1.25, 0.8]),
        "guard_in": clip("Raise guard", 18, 2, 10, False),
        "guard_hold": clip("Guard hold", 20, 2, 6, True),
        "guard_out": clip("Lower guard", 22, 2, 10, False),
        "hurt": clip("Hurt", 24, 6, 10, False, [0.9, 1.1, 1, 1, 0.8, 1.2]),
        "death": clip("Death", 30, 6, 8, False, [0.9, 1, 1.2, 1.2, 1.2, 2.5]),
        "interact": clip("Interact", 36, 6, 8, False),
        "kneel": clip("Kneel", 42, 2, 8, False),
        "channel": clip("Prayer channel", 44, 2, 6, True),
        "rise": clip("Rise", 46, 2, 8, False),
    }
    for name in ["cut", "interact"]:
        clips[name]["events"] = [
            {
                "name": f"{name} contact (preview only)",
                "atMs": sum(frame["durationMs"] for frame in clips[name]["frames"][:3]),
            }
        ]
    selection = json.loads((ROOT / "selection.json").read_text())
    return {
        "selection": {
            key: selection[key]
            for key in ["gameplay_id", "source_character", "captured_at_utc"]
        },
        "sourceFrames": len(pages) * 48,
        "reviewStatus": "Generated animation study. Directional and motion defects are recorded; these are not approved game assets.",
        "directions": pages,
        "clips": clips,
        "references": [
            {
                "label": "G15 — selected gameplay style",
                "url": "../../../concepts/gameplay/images/g15-s13-builtin-night-courtyard-v01.png",
            },
            {
                "label": "S13 — exact character identity and costume",
                "url": "../../../concepts/images/s13-guarin-isometric-v02.png",
            },
        ],
        "packing": "Original generated pixels; equal grid rectangles, no rotation, cropping exports, rescaling, recoloring or synthetic motion. Alpha-border warnings require review before engine packing.",
    }


if __name__ == "__main__":
    manifest = build_manifest()
    (ROOT / "atlas.json").write_text(json.dumps(manifest, indent=2) + "\n")
    report = {
        "pages": len(manifest["directions"]),
        "source_frames": manifest["sourceFrames"],
        "clips_per_direction": len(manifest["clips"]),
        "page_checks": {
            direction: {
                "dimensions": page["dimensions"],
                "alpha_fraction": page["transparent_pixel_fraction"],
                "unique_cell_hashes": page["unique_cell_hashes"],
                "border_touching_frames": [
                    index for index, frame in enumerate(page["frames"]) if frame["border_touch"]
                ],
            }
            for direction, page in manifest["directions"].items()
        },
        "limits": "Hashes prove different pixels, not correct motion. Parent visual inspection and user review remain necessary. Camera angle is not numerically calibrated.",
    }
    (ROOT / "validation.json").write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps(report, indent=2))
