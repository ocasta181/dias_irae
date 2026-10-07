# E06 V02: independent topology-first review

2026-10-07. Checkpoint `faf5ace09a5870df7d0b1d54b490dcc9256d2321`, branch `main`. Astra review at maximum reasoning. This report is the only file written in this assignment. No generation, source modification, registration change, installation, commit or push occurred.

**Completed verdict: qualitative limb ownership passes. The near hind paw remains connected to the haunch through the required forward-thigh/backward-hock path, separately from the chest-connected near forepaw. The complete pose remains unaccepted pending the parent's independent geometry/contact checks. The retained black construction curves are a material finish concern.** Flatter soles and readable ownership do not establish numerical accuracy. All 96 V10 drawings remain rejected.

## Inspection order and source

I first opened `raw/E-06-v02-pale-qa.png` without a target overlay and assigned the four paws by their proximal origins and overlaps. I then opened `raw/E-06-v02.png` and `raw/E-06-v02-feet-qa.png`. I inspected an in-memory, enlarged crop of the actual legs, raw rectangle `(400,715,480,325)`, and selected the paw regions below. No temporary image file was written.

Only after assigning the roles did I open `controls/E-06-rough-alpha-v02.png`, the original wolf crop, the original S13 image and the V02 request record. I also opened the fixed 192-square frame. I did not open the parent's `observations-v02-draft.json`, use an approved-target overlay, select a point by target proximity, or change the initial limb assignments.

The raw painting is 1254×1254 RGBA, SHA-256 `23ad25881fc9fbc65180c035716a6db2305fcffff3a67a10d4a3949508bc0602`; I independently computed the hash. The record specifies the fixed mapping `raw × 128/1254 + (32,56)`. I used raw coordinates for this review and did not fit the image.

The recorded edit target is the complete transparent gray cel, SHA-256 `a1bc9865a9e0efe433db41ae409131f97991ff688f878c773ed48aa941b66450`. The other three recorded inputs are the original wolf crop, S13 and G15. I checked all four current reference hashes against the record; all match. No V01 painting appears in the recorded input list. The transparent gray cel is a geometry source, not a painted identity source.

## Attachment-first findings

LH/LF/RH/RF mean anatomical left hind, left fore, right hind and right fore. In this E view, right limbs are near and left limbs are far. Confidence below concerns categorical ownership and visible path order, not coordinate accuracy.

| Observed paw | Assigned role | Actual painted attachment and path | Confidence and limits |
| --- | --- | --- | --- |
| Low left-central paw | **RH, near hind** | The rear-flank/haunch line descends into the upper thigh. The thigh extends forward under the abdomen to a clear front bend. The lower leg then returns backward to the hock region before the paw/toes turn forward. The filled mass follows that route as well as the black crease. It does not originate at the chest. | About 95%. Hip ownership and bend order are clear. The exact hip pivot and stifle center are not exposed as anatomical points. |
| Low right-central paw | **RF, near fore** | The upper leg joins the chest beneath the ruff. Its path slopes backward toward the lower carpal/paw region, with the toes directed forward. A continuous transparent gap separates it from RH. The chest origin is independent of the haunch/thigh line. | About 95% for ownership, about 85% for the exact interpretation of the partly covered elbow region. The elbow is not a sharply exposed bony point. |
| Small higher rear-left paw | **LH, far hind** | A short distal segment emerges behind the near haunch, toward the tail side. Its paw is distinct from the pointed furry tail and from the near thigh crossing in front. | About 90% for role. The proximal hind chain is occluded. Its hidden joints cannot be measured from the painting. |
| Small higher front-right paw | **LF, far fore** | The distal segment/paw emerges behind the near chest/foreleg, toward the muzzle side. The near limb overlaps its upper connection. | About 90% for role. Its hidden shoulder/elbow remain unobserved. |

All four undersides are visibly separate. The near pair does not fuse, and neither far paw is a fifth appendage or a coat tuft. The lower silhouettes are flatter than V01. The two near legs retain different proximal origins even when their dark crease marks are treated only as supplementary clues. I find no return of the V10 foreleg-for-hindleg substitution and no new categorical limb swap.

The body is continuous: haunch, abdomen, chest, neck and head form one animal. The drawing has no visible disconnected painted-part assembly. Far/near overlap is coherent. This does not establish that every joint follows its planned coordinate, that the paws have correct clearance, or that any support contact passes during root travel.

## Appearance and the retained construction lines

The broad oversized head, compressed torso, short thick legs, small tired eye, cream muzzle and gray-brown coat remain recognizable. The rough matte texture and flat graphic shading broadly follow the original wolf/S13 direction. The result does not read as a realistic tall wolf or a glossy sculpt. The pointed ears and angular limb drawing give it a more graphic silhouette than the original; numerical proportion fidelity is not certified here.

The main finish concern is specific: long smooth, nearly uniform black curves sit on top of the mottled fur. The curve from below the ear through the neck/chest, the rear haunch curve, the forward thigh line and the chest-to-foreleg line read partly as retained construction drawing. Their termini and crossings are too clean compared with the broken painted coat edges. They improve path readability but leave the surface looking unfinished in the raw image. The effect is smaller in the registered game-size frame, which I also opened; it remains a finish concern rather than a demonstrated user approval.

No colored ownership paths, labels, joint dots, ground rails or registration border are visible. The residue is the cel's black internal construction linework, deliberately preserved by the finishing request. It should not be mistaken for a newly exposed anatomical skeleton or used as automatic proof of exact joint centers.

After comparison with the gray cel, the output also visibly has serrated fur edges and a remodeled muzzle profile where the cel had simpler smooth/angular contours. Literal full-alpha preservation is not established by visual inspection. The parent should retain its independent mask/edge comparison; successful paw placement alone would not prove that the finishing operation preserved the complete input boundary.

## Independently selected actual-pixel regions

These rectangles were selected from the painted image after role assignment. Coordinates are raw `(left, top, width, height)` on the 1254-square source, not logical coordinates. They are starting regions for the parent to inspect, not target-centered boxes or observed sole midpoints.

| Role | Raw region | Isolation notes |
| --- | --- | --- |
| LH | `(365,860,105,76)` | Contains the far hind paw and emergence. Its upper part includes overlapping thigh/haunch pixels; select the actual bottom-connected paw edge. Exclude tail pixels. |
| LF | `(780,860,95,76)` | Contains the far forepaw behind the chest. Ruff/near-leg pixels occur near the top; do not treat the whole occupied bounding box as a foot. |
| RH | `(505,965,125,75)` | Contains the lower hock/paw and complete sole. The right edge ends before RF's lower paw, avoiding the cross-paw contamination found in the broader V01 boxes. |
| RF | `(630,965,105,75)` | Contains the carpal/paw region and complete sole. Its left boundary is beyond RH's low toe edge. |

Decoded alpha at thresholds 128 and 192 confirms actual paw pixels and full lower edges inside these regions. The far soles reach raw rows 922–923 and the near soles reach row 1026. Those row observations establish that the regions contain the visible undersides; they are not contact scores. The parent should use its predeclared midpoint method and uncertainty, with the paw identities fixed as above.

## Visible bend features and nose observation

The following near-leg marks were read from the enlarged raw-pixel crop. They are useful locations for independent annotation. Manual uncertainties are approximate per-axis raw-pixel bounds. **A silhouette corner or crease endpoint is not the same landmark as the center of a skeletal joint.** Do not feed these coordinates directly into joint-target error arithmetic.

| Painted feature | Actual raw inspection region | Visible-point estimate and limit |
| --- | --- | --- |
| RH forward/stifle bend | `(548,878,75,62)` | The leading outside corner is around `(609,911)`, ±5 raw pixels. The thigh crease ends around `(584,907)`, ±4. The articulation occupies a thick region between contours; no unique stifle pivot is exposed. |
| RH rear/hock bend | `(510,948,78,66)` | The posterior silhouette turns around `(518,976)`, ±6, and the anterior inner corner is around `(569,979)`, ±6. These delimit the backward turn; neither point alone is the hock center. |
| RF upper/elbow region | `(665,879,92,78)` | The chest/foreleg crease ends around `(687,918)`, ±5. The elbow mass is blended into the upper limb and ruff, so its center cannot be independently recovered at comparable precision from this mark. |
| RF lower/carpal region | `(625,949,84,74)` | The inner stem-to-paw corner is around `(691,981)`, ±7. The opposite contour makes a broad rounded transition. The carpal center is not a single visible painted point. |

The body attachment regions remain the rear haunch for RH and chest/ruff for RF. Hidden proximal pivots should remain unmeasured, not populated from the guide. Joint-center inference across these thick volumes would have substantially greater uncertainty than locating the visible corners above.

For the nose, I selected raw region `(1020,635,90,115)` from the visible muzzle and inspected a separate enlarged nose crop. Its rightmost silhouette is the black nose, not fur or a cheek tuft. Direct alpha extraction gives:

- At alpha 128, rightmost column 1084, occupied there on rows 676–678.
- At alpha 192, rightmost column 1083, occupied there on rows 674–681.
- With pixel-center coordinates, a representative extremity is approximately `(1084.0,677.75)`. An honest local envelope, including half-pixel sampling, is x `[1083,1085]`, y `[674,682]` (roughly ±1 raw pixel horizontally and ±4 vertically).

The vertical span is a short rounded edge, not a perfectly defined single nose-tip row. Preserve that uncertainty. This is an actual-source extremity observation; I have not scored it against the planned nose or claimed a nose-position pass.

## Acceptance remains with independent geometry checks

This report completes the topology review only. The parent still needs to integrate its independent sole measurements, nose/contour comparison, observable-bend assessment, uncertainty, far-support hold check and near-lane clearance check under the fixed registration. No contact, complete skeletal-coordinate, motion, loop, engine or human-approval pass is claimed.

If the measured geometry fails, the predeclared B attempt is exhausted: preserve the evidence and halt this generation route. Do not rescue it by favorable point selection, relabeling, registration fitting, paw offsets, alpha replacement or another wording variant. Even a numerical pass would still leave the conspicuous construction curves for explicit finish assessment before calling this one sprite approved. No additional pose or sheet is authorized by this report.
