# E06 V01: independent topology-first review

2026-10-07. Checkpoint `d75317675405867daabaaafdb3402661a97c8bd9`, branch `main`. Astra review at maximum reasoning. Only this report was written; no painting, source edit, registration change or generation occurred.

**Completed verdict: the specific foreleg-for-hindleg substitution is resolved in this candidate. Qualitative limb ownership passes; the complete E06 proof remains unaccepted pending actual geometric/contact measurements.** This is a useful result of the new control, not approval of a sprite sheet or cycle. All 96 V10 drawings remain rejected.

I first opened `raw/E-06-v01-pale-qa.png` without any target overlay. I assigned the four paw identities from their body attachments and overlaps. I then inspected the transparent raw image and the larger feet detail. Only after those assignments did I reopen the contour/anatomy controls, source record and logical frame. I also reopened the original `walk-v07/canonical-crop.png` for appearance comparison. The existing control-preflight measurements were read as control evidence only, not as measurements of this painting.

Raw source: `raw/E-06-v01.png`, 1254×1254, SHA-256 `441600388377ee3450e62046c00618215a5a02813e4705932c26f5d9004c5511`. I independently verified that hash against the source record. The declared mapping is `raw × 128/1254 + (32,56)` into the 192-square logical canvas. The record and registration code describe one uniform whole-image transform without fitting or retouching. No painted paw coordinates were measured in this assignment.

## Attachment-first findings

LH/LF/RH/RF mean anatomical left hind/left fore/right hind/right fore. In this E view, right limbs are near and left limbs are far. Confidence estimates below express certainty in qualitative role assignment, not positional accuracy.

| Observed paw | Assigned role, once only | Visible anatomical evidence | Confidence and occlusion |
| --- | --- | --- | --- |
| Larger left-central low paw | **RH, near hind** | A dark haunch crease descends on the rear flank. The thigh continues forward beneath the abdomen into the upper/front bend, then the exposed lower leg runs back to the hock region before the toes turn forward. This paw belongs to that haunch chain; it is not supplied by a chest-connected foreleg. | About 95% for role and bend order. The actual hip pivot is under fur; the stifle is a broad rounded articulation rather than an exposed point. Neither receives an invented precise coordinate. |
| Larger right-central low paw | **RF, near fore** | Its broad upper connection emerges beneath the chest/ruff, ahead of the abdominal gap. The leg slopes backward toward the lower carpal region and then into the forward toes. It stays separate from RH through the central negative space. | About 90% for role. The elbow region is partly blended into the chest fur, so its precise articulation center is less certain than the visible lower-leg path and paw. |
| Smaller rear-left, higher paw | **LH, far hind** | It emerges behind the rear haunch at the back of the animal. The large near haunch overlaps its proximal path. Its distal segment and complete underside are separately visible. The tail is a different, tapered furry shape above/behind it. | About 85% for role from emergence and depth. Hip/stifle are occluded; I cannot independently trace the whole hidden chain from painted pixels. |
| Smaller front-right, higher paw | **LF, far fore** | It emerges behind the near chest/ruff and foreleg, toward the muzzle side. A short distal connection and complete sole are visible on the far lane. It is not a fifth leg or a fur tuft. | About 85% for role from emergence and depth. Shoulder/elbow are hidden; their exact locations remain unmeasured. |

All four soles are distinguishable in the source. The near paws do not fuse. The rear-left far paw is not confused with the tail. The central pair has different proximal origins, and the near hind leg has the required forward-thigh/backward-hock/forward-toe sequence. I found no visible new limb swap or extra appendage.

This is materially different from V10 E06, where the prominent central paw read as a foreleg while the exposed hind leg remained back. Here the underbelly reach is carried by the haunch-connected leg. Correct categorical attachment still permits incorrect distances, joint positions or support heights; those must be measured separately.

## Control correspondence and appearance

After assigning roles, the controls confirm the same qualitative graph: the left-central near paw is RH, the right-central near paw is RF, and the two higher outer paws are the far supports. This comparison does not prove that the painting follows every control coordinate. Broad furry joint regions, changed contours and source placement require actual annotation; the controls cannot supply the measurements.

The animal reads as one continuous body. The rear flank, thigh and abdomen blend into each other; the chest/ruff carries the foreleg; the neck and head remain connected. There are no detached painted-kit edges. Fur follows the bent masses sufficiently to preserve the attachment clues. The prominent haunch crease is deliberate and useful rather than a floating seam.

The original identity is retained well at this qualitative level: oversized broad head, compressed torso, short thick legs, compact paws, tiny weary eyes, pointed ears, cream muzzle and gray-brown coat. The gritty flat paint and broken dark outlines remain close to the original/S13 direction; the output does not look like a glossy 3D animal or a realistic tall wolf. It is not an exact contour copy, and this review does not certify skull, torso or leg ratios numerically.

I opened the exported 192-square frame as well. The near-paw separation survives that reduction, while the far paws and joint cues naturally become small. This still-image inspection does not establish moving readability, coordinated head/torso/tail motion, fur stability over time or loop continuity.

## Actual-source regions recommended for measurement

These regions were selected from the visible painting, after role assignment. They are approximate **raw-pixel starting regions**, in `(left, top, width, height)` form on the 1254-square source. Inspect and tighten them against decoded pixels before extracting a sole edge. They are not observed landmark coordinates and are not chosen by taking a box around a target.

| Role | Recommended source region | How to use it |
| --- | --- | --- |
| LH | `(405,865,125,85)` | Captures the small rear-left paw and distal emergence. Exclude the tail and the near-haunch edge when selecting the sole midpoint. |
| LF | `(790,865,120,85)` | Captures the small far forepaw behind the chest. Keep ruff fragments outside the sole selection. |
| RH | `(540,955,125,85)` | Captures the low left-central paw/hock region. Its right border is close to the gap before RF; verify separation before applying a lowest-edge routine. |
| RF | `(663,955,110,85)` | Captures the low right-central paw/carpal region. Exclude any RH pixels at the left margin. |

For the RH connection, inspect a broader context around the rear flank and underside, approximately x440–670, y740–940. The long flank crease and the forward thigh must remain connected in any annotation. For RF, inspect the chest/ruff and descending leg around x665–850, y795–990. Do not reduce either review to its paw box. Those broader regions overlap body/far-paw pixels intentionally and are unsuitable for automatic sole extraction.

Use the parent measurement workflow to identify the actual underside midpoint and uncertainty inside each confirmed paw region. Preserve the single fixed registration. Do not relabel paws to minimize distance to targets, move the painting, increase lift, or loosen the existing budget. A visible paw is sufficient for an observation but does not itself prove stance, swing clearance or acceptable contact error.

## Remaining acceptance gates

The parent must measure the four painted undersides, observable near bends and nose edge; retain uncertainty; test the E06 far-support hold interval under straight travel; and establish the near swing clearance against its own lane. If those fail, reject the completed pose while preserving this narrower evidence that the attachment-control change helped. A geometry failure must not be averaged away by the successful topology or appearance.

Hidden far proximal joints remain unobserved. Exact near hip/shoulder centers are also obscured by fur, although their body-region ownership is clear. No numerical contact, full skeletal-coordinate, temporal, engine or human-approval pass is claimed here. No further frame or sheet is justified by this topology result alone.
