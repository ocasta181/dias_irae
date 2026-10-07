"""Prepare spatial diagrams and inspectable appearance inputs, not final art."""

import hashlib
import json
from pathlib import Path

import cv2
import numpy as np
from PIL import Image
from transformers import CLIPImageProcessor

ROOT = Path(__file__).resolve().parent
BODY = ROOT.parent


def digest(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> None:
    if (ROOT / "raw-E06.png").exists():
        raise RuntimeError("Proof inputs cannot change after generation.")
    targets = json.loads((BODY / "single-pose-v12/targets-v02.json").read_text())
    source = BODY / "single-pose-v12/controls/E-06-rough-alpha-v02.png"
    original = BODY / "walk-v07/canonical-crop.png"
    rough = Image.open(source).convert("RGBA")
    assert rough.size == (1024, 1024)
    # One exterior edge avoids copying the rejected long construction arcs.
    edges = cv2.Canny(np.asarray(rough)[:, :, 3], 100, 200)
    control = Image.fromarray(np.repeat(edges[:, :, None], 3, axis=2))
    control.save(ROOT / "control-E06.png")
    wolf = Image.open(original).convert("RGBA")
    assert wolf.size == (768, 768)
    appearance = Image.alpha_composite(Image.new("RGBA", wolf.size, "white"), wolf).convert("RGB")
    appearance.save(ROOT / "appearance-wolf.png")
    processor = CLIPImageProcessor()
    pixels = processor(images=appearance, return_tensors="np").pixel_values[0]
    assert pixels.shape == (3, 224, 224)
    decoded = pixels.transpose(1, 2, 0) * np.asarray(processor.image_std) + np.asarray(processor.image_mean)
    Image.fromarray(np.clip(decoded * 255, 0, 255).astype(np.uint8)).save(ROOT / "appearance-processed.png")
    samples = []
    for limb in ["RH", "RF"]:
        points = targets["feet"][limb]["points"]
        for segment in [1, 2]:
            a, b = points[segment:segment + 2]
            for fraction in [0.25, 0.5, 0.75]:
                samples.append({"limb": limb, "segment": segment, "fraction": fraction,
                                "point": [a[i] + (b[i] - a[i]) * fraction for i in range(2)]})
    manifest = {
        "decision": {"commit": "4cf5e4e", "confidence": 0.90,
                     "method": "native SDXL Canny spatial input plus separate original wolf IP-Adapter Plus input"},
        "status": "inputs frozen for one E06 proof; not artwork or a quality pass",
        "size": [1024, 1024], "logicalMap": {"scale": 0.125, "offset": [32, 56]},
        "sources": {str(p.relative_to(BODY)): digest(p) for p in [source, original]},
        "inputs": {name: digest(ROOT / name) for name in ["control-E06.png", "appearance-wolf.png", "appearance-processed.png"]},
        "control": "Single Canny alpha-boundary edge: white on black, RGB, no colors/labels/long construction arcs. Whole authored control, not a failed painting.",
        "appearance": "Only original wolf encoded. S13/G15 inspected as inherited style authority; not averaged with animal encoding to avoid introducing human gear/environment.",
        "feet": targets["feet"], "nose": [144, 126], "nearShaftSamples": samples,
        "gates": {"staticErrorPlusUncertainty": 1.5, "stanceHoldErrorPlusUncertainty": 3,
                  "nearGroundY": 161.65685424949237,
                  "rgb": "Each actual painted leg must occupy target corridors; authored alpha cannot supply missing paint.",
                  "style": "Original huge head, squat body, short thick legs, tiny weary eyes, flat gritty jagged gray/brown/cream paint. No clean comic ink or construction arcs.",
                  "motion": "A still proves no walk. One E06 first, adjacent frames only after full spatial/style pass, then twelve distinct poses and manual travelling-loop review."},
        "prompt": "single full body 2D game wolf sprite, huge broad head, tiny squat body, short thick legs, small tired eyes, muddy gray brown cream fur, gritty dry painted flecks, rough broken edges, flat dreary gouache, right facing elevated orthographic view, four paws in guided walking pose, isolated plain white background",
        "negative_prompt": "photograph, realistic anatomy, glossy 3D render, smooth sculpture, clean comic ink, anime, long thin legs, large eyes, tall lean body, diagram, construction lines, skeleton, labels, extra limbs, missing paws, fused paws, background scene, floor shadow",
        "settings": {"seed": 0, "steps": 50, "guidance": 5.0, "controlStrength": 1.0,
                     "controlStart": 0.0, "controlEnd": 1.0, "appearanceStrength": 0.6},
        "settingsReason": "Control strength1 is the native API default, chosen for precise geometry instead of the checkpoint example's generalization-oriented0.5. Appearance0.6 is a bounded experimental compromise. No parameter/seed sweep.",
    }
    (ROOT / "proof-inputs.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print("Prepared fresh spatial condition and original appearance; no image call.")


if __name__ == "__main__":
    main()
