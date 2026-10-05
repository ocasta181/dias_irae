import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
BASE = ROOT.parent / "images/s13-guarin-isometric-v02.png"
COMMON = """Use case: identity-preserve / stylized-concept.
Edit target: the supplied original S13 Guarin illustration. Produce ONE full-body character, one image, no sheet, inset, labels or text.
Change ONLY his head: remove the helmet and replace it with an unhelmeted face. Keep the same giant head envelope, around half his whole standing height, and the original elevated three-quarter camera. Do not shrink the head or lengthen the body. Preserve the exact pose, tiny squat torso and short limbs, wine-red ragged scarf/cape, dull mail, brown gloves, belt, wrapped legs and boots. Preserve the small straight sword in his anatomical RIGHT hand and the wood-and-iron kite shield with its faded red stripe on his anatomical LEFT arm. Retain all source clothing, gear, ground shadow, framing and background. No added armor, symbols, straps, weapons or decorations.
Art direction: use the original S13 drawing throughout: flat hand-drawn 2D, rough soot-black edges, broken dry-pigment grain, restrained muddy taupe/bone/brown/dead-wine colors on soft charcoal ground. Dark, poor, dirty, worn, tired, desperate medieval game mood. Cute compact proportions without a cheerful face. The exposed face must share the body's palette, texture, low values and restrained ambient light. No clean comic-book finish, anime eyes, glossy highlights, photorealism, 3D, 2.5D toy, sculpted volume or airbrushed portrait.
Identity held constant across studies: Guarin of Royans, weary 34-year-old returned soldier in 1101. Cropped uneven dark hair, a small white cut through the hair above the anatomical LEFT ear, short dark stubble, sun-darkened dirty skin. Small tired eyes, no large whites or shiny pupils. Closed mouth, exhausted neutral expression; do not change the expression into a smile, scream or rage. Preserve his story identity while exploring how the same face is drawn. This is an art-style study, not a claim that the selected greathelm is historical costume for 1101.
The distinct facial design below is essential. Make it readable at gameplay size through the shape of the face and the placement and drawing of features, rather than merely changing hairstyle or adding more dirt. Keep the same S13 drawing medium and full-body image outside the head.
"""
BRIEFS = [
    (
        "Broad notched mask",
        "Very broad square face with a short blunt jaw. Two small horizontal eye notches sit under a continuous low brow shelf. A single blunt trapezoid marks the nose and a tiny offset dash marks the mouth. Minimal internal lines, large rough matte skin patches; facial features feel carved into an exhausted compact mask.",
    ),
    (
        "Drooping pear",
        "Pear-shaped face: narrow temples, full low cheeks and a softly rounded heavy chin. Tiny downward-curved eyes with separate drooping brows. Short round nose represented by one curved dark hook, very short low mouth and mottled cheek stubble. Gentle tired rounded forms, no bright babyface.",
    ),
    (
        "Sharp wedge",
        "Angular wedge head with wide angular temples tapering to a small squared chin. Thin separated diagonal eye cuts, long narrow triangular nose, compressed zigzag mouth and two sharp cheek wedges. Express the face through broken polygonal dry-pigment patches rather than anatomical shading.",
    ),
    (
        "Sunken sockets",
        "Long rectangular face within the same huge head footprint. Small pinprick eyes deep within two dull charcoal socket shapes, disconnected short brows, flattened nose made of two short vertical marks, hollow cheek patches and a low straight mouth. Keep this a tired living 34-year-old, not a skull or undead.",
    ),
    (
        "Stubby broken boxer",
        "Rounded block head, broad broken blunt nose pushed slightly to one side, low thick disconnected brow strokes, uneven tiny eye marks, short thick jaw and small downturned mouth. Features built from chunky dry brush dabs, with no realistic anatomical gradients.",
    ),
    (
        "Soot silhouette features",
        "Wide oval face dominated by a single rough dark brow-and-eye silhouette with two tiny skin-colored eye breaks. Nose is a short skin wedge interrupting that soot band; the mouth is one rough dark nick. Three flat dirty values only on the head, soft granular skin edge.",
    ),
    (
        "Fine weary scratches",
        "Compact oval head, facial contours almost absent. Very fine broken scratch marks describe tiny eyes, skinny crooked brows, a narrow bent nose and two short mouth ticks. Skin remains flat stained pigment with dense irregular tiny stubble scratches near the jaw. Sparse marks rather than large dark eye masses.",
    ),
    (
        "Low sloped brow",
        "Very low sloping brow, small deep-set narrow eyes and a wide tall forehead. Face nearly rectangular with cut-off rounded corners, short recessed chin, short straight block nose. Draw the brow, nose and tired mouth using thick dry horizontal strokes; almost no cheek lines.",
    ),
    (
        "Cheek ledges",
        "Pentagonal face with pronounced flat outward cheek ledges, a small chin and very small eyes far apart. Dark brows are short bent elbows, nose a short downward triangle, mouth a narrow uneven curve. Dirty cheekbone planes are graphic rough-edged shapes, not sculpted light.",
    ),
    (
        "Heavy nose light marks",
        "Large broad face with a dominant hooked bulb nose represented by a bent flat ochre shape and a dark underside notch. Small horizontal eyes and short separated brows drawn with light sparse marks; small tucked mouth, rounded lower jaw. Flat dirt patches rather than facial crosshatching.",
    ),
    (
        "Shut lid shorthand",
        "Broad softly squared head with tiny nearly closed eyes formed by single thin low curved lids, no visible eyeballs. Two small tired brow arcs, short bent nose stroke, thin compressed mouth and large slack jowls. Very economical tired facial marks, rough pigment, no cute shine.",
    ),
    (
        "Broken hatch planes",
        "Faceted squat head, tiny eye cuts under interrupted angled brow marks, blunt wedge nose and short low downturned mouth. Rough short directional hatching forms cheek, forehead and stubble patches, with paper-like gaps. Hatching belongs only to the face and must share the original dull granular body medium.",
    ),
    (
        "Wide spaced pin marks",
        "Broad round head, two very small widely spaced dark eye dots below short straight brows. Nose a tiny off-center triangular mark, mouth a small low flat dash. Wide uninterrupted worn skin areas and scattered stubble flecks. Keep eyebrows heavy enough to read exhaustion, not cheerful innocence.",
    ),
    (
        "Compressed grim lower face",
        "Tall broad forehead occupying most of the huge head, facial features crowded into its lower third. Small tired slit eyes, very short wide nose and compressed low mouth above a tiny square chin. Blunt flattened shapes with rough flat patches; no realistic portrait proportions.",
    ),
    (
        "Asymmetric worn timber",
        "Squat rectangular face with visibly asymmetric broken feature lines: one short low straight brow, one shallow arch, small mismatched tired eyes, slightly bent long block nose and crooked short mouth. Use irregular woodcut-like dark gouges and worn pigment without changing age or expression.",
    ),
    (
        "Chalk cut sockets",
        "A broad trapezoid head, small eyes made as tiny dirty-bone negative-space cuts in dark narrow sockets. Nose and mouth formed by small gaps between chunky charcoal marks. Flattened cheeks and heavy rounded chin, rough granular skin. No glowing white eyes; keep all cuts dim.",
    ),
    (
        "Soft pouch face",
        "Broad soft pouch-shaped face with low rounded cheeks and no hard cheekbone planes. Two tiny straight eye dashes, loosely curved disconnected brows, low blunt button-shaped nose drawn with one dull flat patch, short tucked mouth. Facial edges gentle but worn; dark stubble stipple and tired folds remain economical.",
    ),
    (
        "Oblique sliver eyes",
        "Angular short hexagonal face with narrow oblique sliver eyes set beneath two separate sharp brow angles. Crooked flat rectangular nose and one tiny downward mouth stroke. A few large ragged geometric skin patches, thin rough contours, no realistic muscle planes.",
    ),
    (
        "Double mark brow",
        "Square squat head, brows each built from two short separated heavy strokes. Each tiny eye consists of a dark lid and a smaller detached under-eye tick; short flat-ended nose, very small folded mouth. Flat tired skin stained in large muted patches, broad cheek silhouette.",
    ),
    (
        "Thin stalk nose",
        "Very wide upper face tapering to a broad soft chin, extremely thin long bent nose drawn as a broken stalk ending in a blunt dark nub. Tiny level eyes close to the stalk, short thick eyebrow dabs, small flattened mouth. Distinct big empty cheeks and little lower-face detail.",
    ),
    (
        "Hollow rounded rings",
        "Rounded block head with two small incomplete rough under-eye rings surrounding very tiny dark eyes; no large eyeballs. Brows two short blunt dots, nose low and wide with a dark crescent underside, mouth tiny and straight. Dry broken rings convey sleeplessness rather than realistic sockets.",
    ),
    (
        "Bridge and brow monogram",
        "Short broad shield-shaped face whose brow and narrow bent nose join as one rough T-like ink mark. Two tiny side eye notches, separated soft skin cheeks and one little sideways mouth nick. Head remains warm muddy pigment, original medium, not a black symbol pasted over skin.",
    ),
    (
        "Sparse stepped marks",
        "Wide compact jaw with a short squared nose. Eyes, eyebrows and mouth use very small broken stepped raster-like clusters, not smooth lines, while all source body textures stay unchanged. Three muted facial value clusters with irregular coarse edges; no heavy whole-image pixelation.",
    ),
    (
        "Sagging crescent lids",
        "Round tall-cheeked head, two minuscule drooping crescent lids and short heavy brows well above them. A low flat broad nose notch, slack small downturned mouth and rounded protruding chin. Soft contours with ragged stained pigment; tired and fragile, never smiling or babyish.",
    ),
    (
        "Narrow lower mask",
        "Very wide flat temples and narrow lower jaw, head like a blunt inverted trapezoid. Tiny separated square eye marks, brows short broad horizontal slabs, small long flat nose, two-part uneven mouth. Only large ragged face planes, no hatching or portrait detail.",
    ),
    (
        "Frayed brush features",
        "Squat oblong head, eyes two very small frayed horizontal brush nicks, brows loose dry-brush commas, nose a rough blunt L shape, mouth a short torn-edged low brush stroke. Facial grammar noticeably loose and brushy, with economical stubble dabs and no clean outline.",
    ),
    (
        "Tiny outlined tired eyes",
        "Broad square-rounded face, eyes drawn as two exceptionally small incomplete rough narrow outlines with tiny dark centers, heavy shallow brows, broad low nose and thin tucked mouth. Keep eye size smaller than the nose width and the outlines dim; no anime or cartoon white eye blobs.",
    ),
    (
        "Blunt oval relief",
        "Oval face with a very wide blunt jaw, tiny closely set eye slits, arched broken brows and short flattened nose. Large offset rough-edged skin islands describe forehead, cheek and jaw with only three muted flat values; mouth a dark notch between islands, no modeled relief or rim light.",
    ),
    (
        "Long weary mouth",
        "Broad triangular face with a small squared chin, two tiny irregular eye ticks under short sagging brows and a narrow hooked nose. A relatively wide but paper-thin uneven downturned mouth is the defining graphic feature. Minimal cheek detail, worn matte skin and short stubble, never a grin.",
    ),
    (
        "Low contrast ghost marks",
        "Rounded rectangular huge head whose tiny eyes, blunt bent nose and small compressed mouth are drawn with faded brown broken marks only slightly darker than skin. Short heavy brows remain the darkest element. Broad stained pigment patches and dispersed dark stubble make a subdued exhausted face, readable without sharp black socket masses.",
    ),
]


def prepare():
    plan = []
    for number, (title, change) in enumerate(BRIEFS, 1):
        identifier = f"F{number:02d}"
        provider = "grok" if number <= 15 else "built-in imagegen"
        prompt = (
            COMMON
            + f"\nFace study {identifier}: {title}.\nFacial design: {change}\nKeep every non-head component and the camera as in S13. One full-body image; no text or comparison panels."
        )
        request = {
            "prompt": prompt,
            "referenced_image_paths": [str(BASE)],
            "transparent_background": False,
        }
        (ROOT / "requests" / f"{identifier.lower()}-v01.json").write_text(
            json.dumps(request, ensure_ascii=False) + "\n"
        )
        (ROOT / "prompts" / f"{identifier.lower()}-v01.txt").write_text(prompt + "\n")
        plan.append(
            {"id": identifier, "title": title, "provider": provider, "change": change}
        )
    (ROOT / "plan.json").write_text(
        json.dumps(plan, ensure_ascii=False, indent=2) + "\n"
    )
    print(
        f"Prepared {len(plan)} distinct face requests. Source SHA256: {hashlib.sha256(BASE.read_bytes()).hexdigest()}"
    )


if __name__ == "__main__":
    prepare()
