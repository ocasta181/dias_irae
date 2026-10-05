import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SELECTION = json.loads((ROOT / "round-2-selection.json").read_text())
SOURCES = {item["id"]: item for item in SELECTION["selected"]}
COMMON = """Use case: precise-object-edit / stylized-concept.
Input image: the exact preferred face study named below, used as the edit target and the drawing-medium reference. It is explicitly selected by the user. Produce ONE full-body Guarin image, with no panels, text, labels or inset.
Change only the specified facial feature grammar. Retain the source's facial silhouette, giant head, short squat body, hair, stubble, weary adult identity, pose, elevated three-quarter camera, framing and charcoal background. Preserve the exact wine-red worn scarf/cape, dull mail, brown gloves, belt, wrapped legs, boots, straight sword in his right hand and battered wood-and-iron kite shield on his left arm. Do not redesign, brighten, rotate or enlarge the body or equipment.
Match the reference's flat 2D game drawing: irregular dark edges and granular broken pigment in muddy taupe, dark brown, dull bone and dead wine red. Facial marks must have the same roughness, grain, restrained values and ambient light as the rest of the character. Tiny eyes, oversized head and tiny exhausted body remain essential. Dark, poor, wretched, dirty, worn, tired and hopeless, with cute compact proportions. No 3D, modeled toy volume, airbrushed realism, clean comic contours, glossy highlights, anime eyes, large eye whites, smiling or bright colors.
The nose MUST NOT remain a squared rectangular block. Draw the requested alternate nose as a small irregular tapered or curved graphic mark, with rough edges consistent with the source. No straight rectangular column, squared shovel tip or cuboid nose. Curves are built from coarse broken pigment, not smooth vector outlines. Where another feature is the study's focus, use a short softly bent nose with a rounded tapered end and keep that nose understated.
This is a close feature-design variation, not a different costume, different illustration medium, new portrait or facial expression sheet. Make the named change visibly legible while keeping all other features as close to the reference as possible. Preserve the source's tired neutral closed-mouth expression unless its subtle mouth line is specifically being explored.
"""
BRIEFS = [
    (
        "F25",
        "Nose: small round tip",
        "Replace the long squared nose with a short narrow bridge ending in a tiny irregular rounded tip, one dark nostril nick. Keep F25's little square eye marks, flat low brows and small mouth unchanged.",
    ),
    (
        "F25",
        "Nose: lean downward hook",
        "A thin gently bent bridge ends in a very small downward hook, drawn as two broken earthy strokes and a shallow dark underside. No bulb or rectangular tip. Keep F25's eyes, eyebrows and mouth.",
    ),
    (
        "F25",
        "Nose: blunt broken asymmetry",
        "A short broad flattened nose with uneven rounded lobes and a slightly crooked bridge, represented by a rough skin patch and two tiny detached nostril marks. Subtle old break, no wounds. Keep F25's other features.",
    ),
    (
        "F25",
        "Nose: soft low bulb",
        "An understated low round bulb nose with almost no visible bridge, a dull ochre oval patch and incomplete dark curved underside. Keep F25's tiny eyes, low brows and tucked closed mouth.",
    ),
    (
        "F25",
        "Nose: tapered teardrop",
        "A narrow tapering teardrop of dirty skin pigment and one interrupted curved side stroke; the point turns softly downward. Eyes, eyebrows, mouth and face outline remain F25.",
    ),
    (
        "F25",
        "Eyes: tiny round heavy dots",
        "Change only F25's square eye pixels into very small uneven round dark dots tucked beneath the same low brows; no whites. Use an understated short curved nose instead of the square nose. Keep the source mouth and face outline.",
    ),
    (
        "F25",
        "Eyes: tired tapered slits",
        "Replace square eyes with extremely short tapering horizontal eyelid cuts, almost closed, with one tiny under-eye tick. Original low eyebrows and mouth stay. Nose becomes a very small bent hook, not a block.",
    ),
    (
        "F25",
        "Mouth: crooked dry seam",
        "Keep F25's eyes and brows. Draw the small closed mouth as a thin interrupted crooked seam, one corner slightly lower, lower lip a detached two-pixel earthy nick. A tiny rounded bent nose replaces the squared nose.",
    ),
    (
        "F25",
        "Brows: two offset brush chunks",
        "Break each horizontal brow into two short rough offset chunks, maintaining the tired low placement and tiny original eyes. Keep original mouth. Nose is a short curved dry-pigment hook with a blunt rounded end.",
    ),
    (
        "V25",
        "Granular: low hook and lid nicks",
        "Stay very near V25's rough clustered skin. Make eyes tiny closed lid nicks under shallow ragged brows; nose a short broad rounded hook; mouth one shallow torn dark seam. Avoid anatomical gradients or square nose.",
    ),
    (
        "V22",
        "Dry pigment: narrow curved bridge",
        "Keep V22's dry mottled grain, eye placement and jaw. Nose becomes a narrow lightly arched bridge ending in a small rounded underside notch. Thin slack mouth line has one broken central gap. No clean portrait modeling.",
    ),
    (
        "F18",
        "Angular: oblique cuts and soft tip",
        "Retain F18's compact angular face and oblique closed eyes, shorten the brow marks to uneven separate wedges. Replace its rectangular nose with a slender bent taper ending in a small rounded nick; original tiny mouth stays.",
    ),
    (
        "F20",
        "Stalk: slight arch and droplet tip",
        "Stay close to F20's broad face and small close-set tired eyes. Nose is still long and thin but curves gently, ending in a little droplet-shaped tip instead of a flat square end. Shorter mouth seam, same tired mood.",
    ),
    (
        "V21",
        "Ink shorthand: interrupted curve",
        "Preserve V21's economical face marks and granular medium. Nose is one short interrupted curved ink stroke with a small separate nostril dot. Eyes become slightly narrower tiny dark lid marks; mouth remains closed and understated.",
    ),
    (
        "V23",
        "Carved: rounded elbow nose",
        "Keep V23's broad angular cheek grammar but replace the block nose with an irregular elbow-shaped hooked mark with a tapered rounded tip. Use two separated coarse brow wedges, small weary slits, very short flat mouth.",
    ),
    (
        "F25",
        "Nose: squat uneven button",
        "Keep F25's original eyes, brows, mouth and huge-head silhouette. Nose becomes a very small squat uneven button, one dim rounded skin dab and a broken horseshoe underside, without a long bridge.",
    ),
    (
        "F25",
        "Nose: narrow humped profile",
        "Replace the square nose with a long slender nose, a mild curved hump and small rounded downward tip. Use a few jagged pigment patches and one interrupted contour, no three-dimensional smooth shading. All other F25 features stay.",
    ),
    (
        "F25",
        "Nose: almost absent curved notch",
        "Reduce the nose to a very small broken curved side mark and one shallow underside notch; broad unmarked worn skin occupies its former bridge. Keep F25's exact eye and brow grammar and original mouth.",
    ),
    (
        "F25",
        "Nose: off-center rough comma",
        "A short slightly off-center narrow bridge merges into a coarse comma-shaped rounded tip; one separate tiny nostril. Keep the same face identity, small square eyes, heavy brows and original mouth.",
    ),
    (
        "F25",
        "Eyes: dim almond fragments",
        "Change square eye marks into extremely small incomplete narrow almond fragments with dark centers and no bright whites; heavy lids dominate. Keep original brows and mouth. A little low rounded nose arch replaces the squared nose.",
    ),
    (
        "F25",
        "Mouth: shallow weighted curve",
        "Draw a tiny closed shallow downturned mouth curve with a slightly heavier center and two dim detached lower-lip ticks. Not a big frown. Preserve F25's eye and eyebrow design; nose short, tapered and rounded.",
    ),
    (
        "F25",
        "Mouth: compressed offset lip",
        "A short compressed closed lip seam, slightly offset, drawn as two unequal coarse horizontal pigment nicks rather than one smooth line. Preserve F25's eyes and brow; nose a small soft bent wedge without square tip.",
    ),
    (
        "F25",
        "Brows: depressed broken arches",
        "Each low eyebrow becomes a shallow depressed arch of three coarse separated pigment dabs. Keep tiny F25 eye marks and mouth. Nose narrow, gently bent and rounded, not a column. Exhaustion without anger.",
    ),
    (
        "F25",
        "Brows: uneven tired shorthand",
        "One eyebrow stays almost straight but ragged, the other is a short shallow bowed mark slightly lower. Keep F25's small eyes, jaw and mouth; add a tiny rounded hooked nose replacing the block. Very subtle asymmetry, no dramatic expression.",
    ),
    (
        "F19",
        "Double brow: dot eyes and round nub",
        "Preserve F19's separated chunky eyebrow marks and worn face. Eyes become tiny low dark dot-and-lid pairs. Nose a short rounded nub with one tiny side tick. Mouth a very small irregular closed dash, not a grin.",
    ),
    (
        "F26",
        "Frayed brush: soft two-stroke nose",
        "Preserve F26's loose granular facial marks. Nose is two short frayed curved strokes with a soft rounded end. Eyes remain little half-shut brush nicks with detached dull under-eye flecks; mouth a worn short horizontal dry-brush seam.",
    ),
    (
        "V24",
        "Soft face: smaller eyes and hooked dab",
        "Retain V24's soft broad face but reduce its eyes to tiny dark oblong dots under uneven drooping lids, no bright whites. Nose is a short curved earthy dab ending in a rounded tip. Mouth one narrow softly downturned seam.",
    ),
    (
        "F23",
        "Stepped marks: tapered crooked nose",
        "Keep F23's stepped irregular pigment clusters without pixelating the body. Replace its block nose with a tapering crooked curved contour built from coarse uneven steps and a rounded nub. Eyes tiny slanted clusters, brows two ragged low bars, mouth short offset nick.",
    ),
    (
        "F16",
        "Socket cuts: curved nose and lip gap",
        "Stay near F16's charcoal eye sockets with very small dim skin-colored cuts for the eyes, not glowing whites. Nose defined by two small interrupted curved ticks and a round blunt tip. Mouth a tiny worn negative-space seam, same grain and huge head.",
    ),
    (
        "V25",
        "Granular: pin eyes and broken lips",
        "Keep V25's mottled coarse pigment and huge head. Tiny dark pin eyes under short rough flat brows; nose small softly crooked tapered hook with a rounded end; mouth two tiny separated horizontal lip fragments. More economical feature grammar, same tired adult identity.",
    ),
]


def prepare():
    plan = json.loads((ROOT / "plan.json").read_text())
    if any(item["id"] == "F31" for item in plan):
        raise ValueError("Round two is already prepared")
    for number, (source_id, title, change) in enumerate(BRIEFS, 31):
        source = SOURCES[source_id]
        path = Path(source["file"])
        if hashlib.sha256(path.read_bytes()).hexdigest() != source["sha256"]:
            raise ValueError(f"Selected source changed: {source_id}")
        identifier = f"F{number:02d}"
        provider = "grok" if number <= 45 else "built-in imagegen"
        prompt = (
            COMMON
            + f"\nSource: {source_id}, {source['title']}, captured preference #{source['rank']}.\nStudy {identifier}: {title}.\nSpecific facial change: {change}\nPreserve the reference everywhere outside those facial marks. One full-body image, no text."
        )
        request = {
            "prompt": prompt,
            "referenced_image_paths": [str(path)],
            "transparent_background": False,
        }
        (ROOT / "requests" / f"{identifier.lower()}-v01.json").write_text(
            json.dumps(request, ensure_ascii=False) + "\n"
        )
        (ROOT / "prompts" / f"{identifier.lower()}-v01.txt").write_text(prompt + "\n")
        plan.append(
            {
                "id": identifier,
                "title": f"{source_id} · {title}",
                "provider": provider,
                "source_id": source_id,
                "round": 2,
                "change": change,
            }
        )
    (ROOT / "plan.json").write_text(
        json.dumps(plan, ensure_ascii=False, indent=2) + "\n"
    )
    print(
        "Prepared 30 independent face requests: 18 F25 studies, 12 nearby top-twelve studies, 15 per provider."
    )


if __name__ == "__main__":
    prepare()
