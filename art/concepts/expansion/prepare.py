import argparse
import hashlib
import json
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent
PROJECT = ROOT.parents[2]
BASE = ROOT.parent / "images/s13-guarin-isometric-v02.png"
PLAN = json.loads((ROOT / "plan.json").read_text())
COMMON = """Use case: stylized-concept.
Asset: ONE full-body game character concept illustration, one figure only, no comparison sheet, no inset, no text.
Input image 1 is the exact S13 original. It is the mandatory drawing-medium, camera, proportion, palette and texture reference. No other iteration is a reference.
Copy its dark hand-drawn 2D language: rough irregular dark ink edges, granular dry pigment and modest stepped marks, dirty matte iron, dead wine-red cloth, muddy brown leather, grey-bone fabric. Somber poor wretched medieval world, exhausted and desperate rather than heroic or brightly cheerful. Preserve its soft charcoal ground and small diffuse contact shadow, flat restrained values, rough distressed surfaces. Never 3D, 2.5D miniature, glossy render, studio lighting, sculpted toy, comic-book splash, airbrushed realistic anatomy or photoreal portrait.
Preserve the exact S13 elevated three-quarter viewing direction and orthographic-like projection. Do not invent a new camera angle. Huge head around half the whole standing height, tiny compact torso, short squat legs and arms, very small eyes wherever exposed. The overall silhouette must be cute and compact even in a hopeless mood. Full figure and complete weapons fit in the frame with generous margins. Draw coherent hands and straight shafts/blades; no duplicated hands, shields or weapons.
"""
EQUIPMENT = """This is the SAME Guarin from S13. Preserve his pose, stature, greathelm, wine scarf and ragged cape, mail, belt, wrapped gloves/legs/boots, small straight sword in anatomical RIGHT hand and worn kite shield on anatomical LEFT arm EXCEPT the category explicitly changed below. Preserve the literal S13 costume components and weathering outside that category. No additional knee disks, plated bracers, decorations, new armor, extra straps or invented insignia. Make the requested category distinctly readable while the rest remains recognizable.
"""
CAST = """Use S13 as the exact style/proportion/camera template, but draw the NEW STORY PERSON described below. Do not dress every person as Guarin or reuse his helmet, shield or sword unless specified. Keep the huge head, tiny body and short limbs across gender, age and role; interpret dossier words such as tall through personality/shape rather than realistic height. Adult figures are at the same general scale as S13, not 2–3 times taller. Faces have very small expressive eyes, no anime eyes or glitter. This is an initial encounter character illustration, not a boss transformation or animation sheet.
"""


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def prepare():
    for directory in ("requests", "prompts", "records", "images"):
        (ROOT / directory).mkdir(exist_ok=True)
    for item in PLAN:
        prompt = COMMON + (CAST if item["category"] == "Story cast" else EQUIPMENT)
        prompt += f"\nRequested illustration: {item['id']} — {item['title']}.\nExact change/subject: {item['change']}\nContext: {item['date']}; {item['region']}. Evidence limitation: {item['basis']}. These notes are context, not text to draw.\nDo not change any unrequested category. ONE full character, no panels or labels."
        request = {"prompt": prompt, "referenced_image_paths": [str(BASE)], "transparent_background": False}
        (ROOT / "requests" / f"{item['id'].lower()}-v01.json").write_text(json.dumps(request, ensure_ascii=False) + "\n")
        (ROOT / "prompts" / f"{item['id'].lower()}-v01.txt").write_text(prompt + "\n")


def import_image(identifier, original):
    item = next(item for item in PLAN if item["id"] == identifier)
    source = Path(original)
    with Image.open(source) as image:
        image.verify()
    with Image.open(source) as image:
        extension = {"PNG": ".png", "JPEG": ".jpg", "WEBP": ".webp"}[image.format]
        dimensions, mode = image.size, image.mode
    destination = ROOT / "images" / f"{identifier.lower()}-v01{extension}"
    if destination.exists():
        raise ValueError(f"Refusing to replace {destination}")
    shutil.copyfile(source, destination)
    request = json.loads((ROOT / "requests" / f"{identifier.lower()}-v01.json").read_text())
    record = {"id": identifier, "title": item["title"], "provider": "built-in imagegen", "model": "not exposed by tool", "request": request, "input_sha256": digest(BASE), "original_output": str(source), "file": str(destination.relative_to(PROJECT)), "sha256": digest(destination), "dimensions": dimensions, "mode": mode, "pixel_changes": "none", "parent_visual_review": "pending"}
    (ROOT / "records" / f"{identifier.lower()}-v01.json").write_text(json.dumps(record, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({"id": identifier, "file": record["file"], "dimensions": dimensions}))


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--import-image", nargs=2, metavar=("ID", "ORIGINAL"))
    args = parser.parse_args()
    if args.import_image:
        import_image(*args.import_image)
    else:
        prepare()
