from __future__ import annotations

import hashlib
import json
from pathlib import Path
from statistics import median

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent
FAMILIES = ["idle", "walk", "cut", "guard", "hurt", "death", "interact", "prayer"]


def figures(alpha: Image.Image) -> list[dict]:
    parents, runs, previous = [], [], []

    def root(index):
        while parents[index] != index:
            parents[index] = parents[parents[index]]
            index = parents[index]
        return index

    for y, row in enumerate(np.array(alpha) > 32):
        edges = np.diff(np.r_[False, row, False].astype(np.int8))
        current = []
        for start, end in zip(np.flatnonzero(edges == 1), np.flatnonzero(edges == -1)):
            neighbors = [run[2] for run in previous if run[0] <= end and run[1] >= start]
            if neighbors:
                label = root(neighbors[0])
                for neighbor in neighbors[1:]:
                    parents[root(neighbor)] = label
            else:
                label = len(parents)
                parents.append(label)
            current.append((int(start), int(end), label))
            runs.append((int(start), int(end), y, label))
        previous = current
    groups = {}
    for start, end, y, label in runs:
        group = groups.setdefault(root(label), {"box": [start, y, end, y + 1], "runs": [], "area": 0})
        box = group["box"]
        box[0], box[1] = min(box[0], start), min(box[1], y)
        box[2], box[3] = max(box[2], end), max(box[3], y + 1)
        group["runs"].append((start, end, y))
        group["area"] += end - start
    major = sorted((group for group in groups.values() if group["area"] > 2000), key=lambda group: group["box"][1])
    if len(major) != 48:
        raise ValueError(f"Expected 48 isolated figures; found {len(major)}. Inspect layout before importing.")
    return [figure for row in range(8) for figure in sorted(major[row * 6:row * 6 + 6], key=lambda group: group["box"][0])]


def inspect_page(path: Path) -> dict:
    with Image.open(path) as image:
        if image.mode != "RGBA":
            raise ValueError(f"{path.name}: no RGBA transparency")
        located = figures(image.getchannel("A"))
        columns = [(figure["box"][0] + figure["box"][2]) / 2 for figure in located[:6]]
        baselines = [median(figure["box"][3] for figure in located[row * 6:row * 6 + 6]) - image.height / 8 * 0.075 for row in range(8)]
        frames = []
        for index, figure in enumerate(located):
            left, top, right, bottom = figure["box"]
            x, y = max(0, left - 3), max(0, top - 3)
            width, height = min(image.width, right + 3) - x, min(image.height, bottom + 3) - y
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
                    "pivot": [columns[index % 6] - x, baselines[index // 6] - y],
                    "occupied": [left - x, top - y, right - x, bottom - y],
                    "sha256": hashlib.sha256(frame.tobytes()).hexdigest(),
                    "border_touch": left == 0 or top == 0 or right == image.width or bottom == image.height,
                }
            )
            neighbors = sum(
                max(0, min(end, x + width) - max(start, x))
                for other in located if other is not figure
                for start, end, row_y in other["runs"] if y <= row_y < y + height
            )
            frames[-1]["neighbor_pixels_in_rectangle"] = neighbors
            if neighbors:
                frames[-1]["maskPath"] = "".join(
                    f"M{start - x - 2},{row_y - y - 2}h{end - start + 4}v5h-{end - start + 4}Z"
                    for start, end, row_y in figure["runs"]
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
            "assessment": "Generated study; gait, guard coverage, prayer and directional identity require motion review. Figure regions are measured, with row/column foot anchors; manual pivot refinement remains open.",
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
        "packing": "Original generated pixels; measured figure regions and clipping masks isolate neighboring figures. No pixel files are altered, no rotated/warped/recolored/synthetic animation. Final atlas packing remains gated by visual review.",
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
