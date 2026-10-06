# Wolf pose-transfer investigation and single-sprite proof

2026-10-07. Investigation requested for Astra at maximum reasoning. Starting checkpoint: `6b576047945854dda93312e73a070364fd7a37b0`, branch `main`. The parent committed status-only corrections during this investigation; the checkpoint before writing this report was `159403ab7c7467b1bafd01f93979e6397c930d66`. This assignment writes only this report. No painting, generation, installation, upload, privacy change, runtime change or nested delegation occurred.

**Decision, confidence 95%:** keep the approved motion plan, replace the ambiguous drawing handoff, and test exactly one intact E06 sprite. The immediate test should combine a complete anatomical contour with a separate, clearly identified four-limb control. It should use the existing image tool once, after the controls themselves pass inspection. This is a justified new experiment, not a promise that reference-image conditioning can meet the budget. The probability of a finished-paint pass is unmeasured.

Success for this investigation means a source-grounded explanation, distinct alternatives, and an executable single-pose acceptance plan. Success for the subsequent pilot means an independently measured, correctly attached, correctly registered whole wolf. A good-looking paw near a target is insufficient. All 96 V10 drawings remain rejected; both V11 pilots remain rejected.

Limb identifiers mean anatomical left hind (LH), left fore (LF), right hind (RH) and right fore (RF). E is the right-facing view. All pixel measurements below use the project's logical canvas unless identified as source pixels.

## 1. What the evidence establishes

### The drawing handoff removes the information needed to assign anatomy

I directly inspected the original wolf and canonical crop; S13 and G15; V10 E05/E06/E07 comparisons; the actual E04–06 filled and stick inputs; V11 V02 filled/stick pages and E06 output; V07's earlier E06 candidate; and V09's E06 outline. I read the authoring code, exact requests, target data, measurement records and relevant reviews. I did not repeat the 96-frame review or claim to perceive continuous playback.

| Finding | Evidence and implication | Confidence |
| --- | --- | --- |
| V10 explicitly freezes the upper animal. | `prepare-walk-pages-v10.mjs:54` and `walk-v10/requests/E-04-06.json` say, “Keep the head/spine/camera/scale and coat features identical across all three; only the specified limbs change.” The E template copies the standing original's upper painting over logical y56–140. This directly encourages held head/back/fur and independently repainted lower legs. | Confirmed instruction and pixels. High confidence this contributes to the observed frozen upper body. |
| The E control paints away the near-leg attachments. | In `prepare-walk-pages-v10.mjs:31`, all four legs use the same fill/stroke. Line 33 draws all legs, then the torso is drawn over them. The E branch copies the original upper painting; unlike the other directions, E never redraws its near legs afterward. In E06, both near attachments and both near stifle/elbow points lie inside the covering torso ellipse. | Confirmed from code, image and point-in-ellipse calculation. |
| The supposedly precise filled control has no visible fore/hind ownership beneath the belly. | The surviving E06 lower shapes are two similarly colored short legs. Identical cyan crosses identify only two paw undersides. Neither tells the painter which path begins at the hip. The original standing haunch/chest relationships remain the strongest anatomical image in that reference. | Confirmed missing information; actual model attention is unknown. |
| The public stick is a simplification of the full numerical anatomy. | `walk-controls-v06.mjs:62`–64 and `walk-v07/manifest.json` use a central hip/shoulder, then the stifle/elbow, then the paw. They omit hock/carpus and replace side-specific attachment points. Every line is black, with no limb name, side or hidden-path convention. | Confirmed. This does not invalidate the user's approved preview. It explains why that preview is not a complete paint specification. |
| The V11 change removes one contradiction but leaves the role ambiguity. | V11 redraws geometric masses and permits coordinated body motion, yet still uses one fill color and the same simplified all-black skeleton. Drawing near legs after the torso does not reveal their internal boundaries when both have the same fill. Twelve figures add layout and correspondence work to the same request. | Confirmed inputs; causal contribution to remaining swaps is strongly plausible, not isolated experimentally. |
| V11 V01 had a genuine contour/landmark conflict. | The muzzle ellipse was centered on the nose endpoint and extended eight logical pixels past it. V02 fixes that and shrinks/shifts the overlapping skull. The corrected pilot still fails, with recorded nose errors 9.58–13.47 pixels and a height discontinuity. | Confirmed authoring error and recorded measured failure. V01's nose discrepancy was not a clean provider-precision test. |
| V09 is not an earlier test of the proposed anatomical contour. | `prepare-anidoc-pilot-v09.mjs:21`–26 extracts the scaffold's outer edge plus selected facial ink. `walk-v09/controls/control-07.png` has an empty torso and two lower legs, without internal hip/stifle/chest ownership. The service never ran. | Confirmed. An outer outline alone does not resolve this ambiguity. |
| Review sometimes credited endpoint proximity too early. | The initial E05/E06 descriptions associated a tucked or central paw with hind swing without establishing its connection. The parent has corrected those descriptions. V07's E06 static record labels RF error 2.9011 pixels a pass while also recording uncertainty 1 pixel under a 3-pixel budget. That is not an error-plus-uncertainty pass. Far supports were not established. | Confirmed records. Historical static scores must not be promoted to anatomical or combined-contact passes. |

In the actual V10 E06, the forward central paw reads as connected to the chest/foreleg; the exposed rear leg remains back. The approved near hind path must instead come from the hip and reach forward under the belly. Calling whichever paw is closest to the RH target “RH” conceals this specific failure. V11 E06 also retains a rearward/high hind configuration against the required forward reach.

The complete animal being a single bitmap proves neither correct attachment nor coordinated animation. Conversely, these results do not prove the model secretly assembles parts. The supported diagnosis is **lost/contradictory anatomical control, soft reference conditioning, and an acceptance method that did not consistently require anatomical correspondence before measuring endpoints**. We cannot infer the model's internal confusion from its output.

### The approved plan is feasible and should remain authoritative

For E, the projection is:

`x = 96 + forward; y = 156 + (lateral - height) / sqrt(2)`.

Anatomical left is the far lane at lateral −8; right is the near lane at +8. The body centerline uses lateral 0. Therefore the full side attachment differs vertically from the public centerline by 5.656854 logical pixels. This is intentional projection, not registration drift.

For E06, the public hip and shoulder are `(80,140.443651)` and `(112,140.443651)`. The full near attachment points are `(80,146.100505)` and `(112,146.100505)`; the far ones are `(80,134.786797)` and `(112,134.786797)`. **Do not move the approved stick or replace these side attachments with the centerline to make a painting fit.** Keep the public preview unchanged. The private guide must expose the existing `.feet[id].points` data and explain the mapping.

I compared all 48 E paw endpoints and support flags across V06, V07 and V11 V02: maximum endpoint difference 0; support mismatches 0. The V06 two-link solutions have positive reachability margin across the cycle, at least 1.7343 units from either reach limit. E06 lengths are fore 11, 12 and 5.0990; hind 12, 13 and 7.2111 in the local forward/height plane. There is no mathematical necessity to change the approved feet, stride or short-legged design. Reachability is necessary, not a certification of the painted volumes.

The V10 E torso ellipse is centered at `(96,140.443651)`, with radii `24` and `sqrt(160)`. All four proximal attachments and all four stifle/elbow points lie inside it in E06. This verifies the information loss: the control covers the very joints that distinguish the limb roles. A fat torso with small paws is feasible, but it needs **internal anatomical contours and explicit occlusion**, not just a filled union of ellipses and thick strokes. The V11 ball-and-ellipse body is a volume placeholder, not a measured outline of the selected wolf's broad skull, ruff, abdomen or haunch.

### Registration and playback are separate from the wrong anatomy

The current audit uses fixed canvas coordinates and overlays planned lines; it does not independently fit the wolves. V11's 1448×1086 output was divided into twelve 362-square cells, each uniformly mapped to a 128-square crop at `(32,56)` in a 192-square canvas. Those are explicit transforms. A drawing that drifts within its cell remains a drawing failure. Per-frame nose pinning would conceal it and erase intentional head movement.

`art/sprites/guarin/viewer/viewer.mjs` draws one bitmap with the frame's pivot and scale. Passing packing, input and timing checks cannot repair fore/hind swaps already visible in a stationary source PNG. No new viewer, frame-rate change or atlas repack is part of this remedy.

V10's separate three-frame requests are consistent with its identity jumps at trio boundaries. V11 reduces those batch boundaries, but its last-row height reset shows that a larger request does not guarantee shared registration. A single pose removes this confound from the next experiment.

## 2. Several materially different approaches

The order below is the recommended execution priority under the existing tool and privacy constraints. It is not a fabricated success-rate ranking. Direct drawing offers the strongest geometric control when a suitable artist/tool is available; its labor cost is greater. None has yet passed this wolf's complete acceptance test.

| Approach | Exact input and output | Benefit, cost and failure limit |
| --- | --- | --- |
| **A. One anatomically explicit contour-to-paint request — immediate choice.** | One verified E06 whole-animal contour; matching colored four-chain guide with all joints and depth; original canonical wolf, S13 and G15 as separate role-labeled references. Output exactly one finished whole-body sprite. | One generation after local control work; no new service. Removes the standing-body collage, ambiguous limbs, incomplete chains and sheet-layout task. It directly tests whether the existing tool can transfer an unambiguous whole pose. Still soft conditioning. One failed topology result is not grounds for a larger batch or adjective-only retry. |
| **B. Geometry first, texture second.** | The same controls and original references, initially requesting one complete monochrome/flat rough cel. Measure attachment, limb shape and contacts before asking for finished paint on that verified whole cel. | Separates anatomy failure from style-transfer failure, at the cost of up to two calls. A rough pass is only a geometry pass. The finishing pass must be remeasured because it can move the contour or swap anatomy again. Only a verified draft may be an explicit geometry/edit target; the original remains identity authority. Never feed a rejected draft back. A locally authored complete rough contour can provide this first stage without another model call. |
| **C. Deliberately draw and finish one complete 2D cel.** | Approved geometry plus original identity/style, in a suitable whole-canvas raster drawing workflow. Draw the connected contour, internal overlaps and all paint on one complete pose. Export the full registered bitmap. | Highest direct control of coordinates and topology, with substantial drawing labor. No detached painted limbs, paste-up, bone rig or runtime deformation. A whole-canvas protected contour can keep geometry fixed while texture is painted inside it; this requires a tool that actually preserves that mask, not prose claiming it does. Do not promise a finished gritty sprite from a code-drawn diagram. This is the appropriate fallback when a competent drawing workflow is available and reference conditioning keeps failing. |
| **D. Spatially conditioned diffusion with separate appearance conditioning.** | A compatible whole-wolf line-art/edge map derived from the verified contour, supplied to an actual spatial conditioning input; original wolf supplied independently for appearance. Output one cel, followed by the same measurements. | More controllable than an untyped reference attachment, but entails model/runtime setup and compatibility checks. Use general line-art/edge conditioning for the canine contour. Ordinary human OpenPose is not a canine four-leg controller. A stronger conditioning weight still does not guarantee exact pixels, identity or limb ownership. No installation, upload or provider switch belongs in the immediate test. |

The official [ControlNet implementation](https://github.com/lllyasviel/ControlNet) distinguishes edge, scribble, depth and human-pose conditioning. Its author notes that line-drawing results can modify image detail. The official [ControlNet 1.1 release](https://github.com/lllyasviel/ControlNet-v1-1-nightly) includes a general line-art model that accepts manually drawn line art. Its segmentation models use established dataset label protocols; arbitrary RH/RF colors are not automatically trained anatomical classes. Therefore the colored guide proposed here is a visual instruction, not a claimed plug-compatible ControlNet segmentation map.

[ComfyUI's ControlNet documentation](https://docs.comfy.org/tutorials/controlnet/controlnet) exposes a processed condition image, strength, and conditioning start/end parameters. [IP-Adapter's official repository](https://github.com/tencent-ailab/IP-Adapter) documents structural generation with ControlNet and an adjustable appearance influence; it also warns that its default processor center-crops references. These are reasons to investigate a real structural input if needed, not evidence of a ready canine pipeline or a guaranteed pose pass. These pages were opened and read during this investigation.

The built-in tool currently exposes a prompt, referenced images and transparency, without a caller-visible landmark tensor, locked contour mask, control strength or reproducible seed. A numeric table in its prompt is descriptive input, not an enforced coordinate contract. The proposed A test is worthwhile because our earlier controls were materially deficient; it cannot establish that those API limitations disappear. Changing reference order alone was already tried in V07 and failed.

Do not resume AniDoc, alter Grok retention/storage, install a model stack or send art to a new destination as an automatic continuation. Those are separate method decisions under the existing authorization boundaries. Do not resurrect the rejected painted-part assembly or use a 3D-rendered final animal.

## 3. Exact single-pose proof: E06

### Fixed authority and reference register

Use `walk-v06/targets.json`, pose index 5, and `walk-v07/manifest.json`, E frame index 5. The latter's complete `.feet` table is the private anatomical authority; its `.guideLines` remains the unchanged public preview. Do not import V11's hypothetical body offsets into this first proof. Holding the E06 anchor values for one drawing is not an instruction to freeze the upper body across future drawings. Draw the haunch/abdomen/chest/ruff as one pose around those anchors.

| Role | File, relative to repository root | SHA-256 |
| --- | --- | --- |
| Original identity, retained source | `art/sprites/wolf/whole-body/base-wolf-v02.png` | `ee925ea9d1d9946cdaea3cf8a1538950748d305e079c96c7a76f837ff551c3b0` |
| Registered original, lineage only | `art/sprites/wolf/whole-body/walk-v06/canonical-canvas.png` | `493f1a64ef6e9cb98fc18e3e0eb4a98a7f81e56b600354ccad0afadf69846fb4` |
| Actual identity input | `art/sprites/wolf/whole-body/walk-v07/canonical-crop.png` | `ce1e63c559fa3e7cd6d2f49dfb62014f8903eedb789fb793d3fd07cdeecbbb92` |
| Original style and exaggerated proportions | `art/concepts/images/s13-guarin-isometric-v02.png` | `02b9e869ba964d9c82e45f1aa4627d170b78cda1219c210bf9b425244c392c5c` |
| Game presentation and paint context | `art/concepts/gameplay/images/g15-s13-builtin-night-courtyard-v01.png` | `191af0e5abbd484ec225633f530e6ed6dd9ebf01c5367910c09a353c4ca465d9` |
| Approved numerical plan | `art/sprites/wolf/whole-body/walk-v06/targets.json` | `16927aa5ea64b2038309b81e6cba9cf03d3d35d8ead19dd0aafbad0f56221277` |
| Projected plan/public guide mapping | `art/sprites/wolf/whole-body/walk-v07/manifest.json` | `2ad63ec93c77e225b5db52ddfe43966f0f5cba48eec478b477056fbb022be545` |

The crop is the original's fixed whole-image registration, not a failed walk. Supply the actual image bytes through reference paths. Do not use V07/V10/V11 failed paintings, previews or their textures as inputs. They remain review evidence only.

### Exact anatomical targets

Full logical canvas: 192×192; fixed root `(96,156)`. Generation crop: `(32,56,128,128)`. Define crop coordinates `C = full coordinates − (32,56)`. Render the two new controls at 1024×1024, eight source pixels per crop unit. All following coordinates are **crop coordinates**, suitable for the actual generation prompt. Keep full-precision source data in the sidecar; rounding below is presentation only.

| Limb and role | Hip/shoulder | Stifle/elbow | Hock/carpus | Paw underside midpoint |
| --- | --- | --- | --- | --- |
| LH, far hind, stance | `(48,78.7868)` | `(51.6686,86.8658)` | `(39.5,90.1005)` | `(43.5,94.3431)` |
| LF, far fore, stance | `(80,78.7868)` | `(74.2380,85.4125)` | `(83.5,90.8076)` | `(84.5,94.3431)` |
| RH, near hind, late swing | `(48,90.1005)` | `(59.4898,92.5484)` | `(55.2921,101.2484)` | `(59.9531,105.1391)` |
| RF, near fore, early swing | `(80,90.1005)` | `(70.2062,93.6418)` | `(66.4807,101.7078)` | `(68.0469,105.1391)` |

Body centerline hip `(48,84.4437)` → shoulder `(80,84.4437)` → head/neck point `(90,71.7157)` → nose edge `(112,70)`. Tail target `(29,93.6360)`; invisible crop root `(64,100)`. The nose is an edge, not the center of a muzzle ellipse. Internal body/neck anchors are not exterior silhouette points.

The distinctive near-hind chain is **forward from the haunch to the stifle, backward to the hock, then forward to the paw**. The near fore chain originates at the chest and folds backward toward its carpus. The output must retain those two different proximal origins even though their paws are close. RH paw is 11.9531 units forward of its hip; RF paw is 11.9531 units behind its shoulder. RH and RF paw centers are 8.09375 units apart.

At phase 0.458333, E06 occupies 416.6667–500 ms. LH and LF are planted. RH has completed 87.5% of swing; RF has completed 12.5%. Both near paws clear their projected ground plane by only **0.517767 logical pixel**: ground y105.656854 in crop coordinates; paw y105.139087. Do not request a dramatic high lift, compare near paws against the far ground plane, or increase lift to make measurement convenient.

### Build two fresh controls, then inspect them before spending a generation

**Control 1: complete neutral wolf contour.** Draw one connected whole-animal rough contour with internal haunch, chest and limb overlap lines. Use the original for the huge broad skull/ruff, tiny torso, short thick legs, tail, ears and weary eyes. Use the full chains above for pose. A simple union of ellipses, an alpha-edge extraction, or a pasted standing upper painting is insufficient.

The near haunch must visibly lead forward into the RH thigh/stifle and then the hock. The chest must visibly lead backward into RF. Establish the contour turn or crease that makes each attachment readable before adding fur. Keep the head, neck, back and abdomen continuous. Far upper limbs can disappear behind the body, but their distal emergence must be deliberate and their soles must be visible in this diagnostic pose. This is a private control, not a claim of finished art.

Plan the narrow spaces explicitly. At the historical seven-unit paw width, the two near paw envelopes have only a 1.09375-unit horizontal gap. Their toes, fur and outlines must not merge into one ambiguous appendage. Use a readable separation or internal boundary; do not shift the target centers. Far paws cannot be moved into the near lane merely to make them visible. If the intended contour cannot expose the four soles and clearly connect the two near chains at the original proportions, fix this contour before generation; do not ask the model to solve the contradiction.

**Control 2: anatomical ownership overlay of exactly the same contour.** Use stable colors and explicit labels, for example RH magenta `#D81B60`, RF blue `#1E88E5`, LH orange `#E69F00`, LF green `#009E73`. Colors have no intrinsic anatomical meaning: include the four names and roles. Trace all four existing points for each leg, including the hock/carpus. Label each attachment and joint; put labels/leaders in margins so they cannot be mistaken for paws. Use solid paths for visible near anatomy and dashed paths for genuinely hidden far segments, with a documented overlap order. The hidden-path drawing is explanatory, not an extra limb in final art. Mark each sole with its own limb identifier, stance/swing label and short underside bar. Include separate near/far ground rails and the fixed root in this control only.

Both controls must use the same shape, coordinates, dimensions and visibility decisions. Do not give the model a second conflicting pose. The clean contour demonstrates the intended finished topology; the colored guide explains its ownership. The public simple-stick preview does not need these additions.

A small control constructor is sufficient; no animation-system rewrite is needed. Read the one E06 row, apply the fixed crop transform, and draw far distal shapes first, then the connected tail/back/head/neck/torso contour, then the near haunch/chest contours and their distal shapes. Trace original proportions for the upper silhouette but draw fresh complete curves; do not paste its pixels. Historical limb widths 6 → 4.5 → 3 units and paw envelope 7×4 are a starting envelope, not an automatic appearance pass. Draw the visible internal near-limb edges and haunch/chest creases last, so the body fill cannot erase their origins. Avoid circular joint outlines and closed proximal cut lines that would make the control look like attached pieces. Export that neutral view, then add the colored full chains, dashed occlusions and marginal labels on a copy for the second view. The neutral view's actual silhouette/crease topology must remain identical in both. These are vector/raster construction aids for one whole animal, never separately painted runtime parts.

Preflight must establish all of the following:

1. Source arrays and support flags are copied without change; the public guide is unmodified. Crop-to-full and full-to-crop transforms round-trip exactly before rasterization.
2. Every drawn control joint is at its table value. Each sole's actual raster underside agrees with its numeric target within one control pixel (0.125 logical unit), including stroke caps. The muzzle contour ends at its declared edge. Check image pixels, not just the arguments passed to a drawing function.
3. The neutral contour alone lets a reviewer trace the near hind leg from haunch to the forward underbelly paw and the near foreleg from chest to the other central paw. Removing the colors must not destroy that reading.
4. The four paw undersides remain independently visible; far proximal occlusion is explicit; no seam, horizontal body cut, disconnected neck, extra appendage, fused paw or unintentional limb crossing is present.
5. The whole wolf still matches the original silhouette proportions and S13's drawing grammar. Coordinates are no excuse for a tall realistic animal, long body, circular generic head or very large eyes.

This preflight is the geometry-first part of approach A, performed locally on controls. If it fails, no image call is justified.

### One bounded painting request

Supply the clean contour first, the matching anatomical overlay second, then the unchanged original crop, S13 and G15. Label the exact roles in the prompt. Reference order is organizational; do not claim it creates a hard priority.

Request **one complete finished E06 wolf**, not a sheet, strip, turnaround or duplicated diagram. The clean contour and numeric table control the pose; the original crop controls identity; S13 controls medium and exaggeration; G15 supplies game context only. Describe the RH hip→forward stifle→backward hock→forward paw chain and the separate RF chest chain in one short paragraph. Embed only the four relevant numerical rows. State that the body, neck, head, tail and fur must be drawn as one connected pose, with anatomical contours surviving the texture treatment. Remove the old frozen-upper-body instruction entirely.

Use true transparency through the existing tool's transparency setting. Request the same full square registration and margins. Remove guide labels, colors, rails, borders, cast shadows and scenery from the final sprite. Do not promise an exact provider resolution the tool does not expose. Save the exact request, reference hashes, returned raw bytes and actual dimensions. One square output of any documented width W maps uniformly by `128/W` plus `(32,56)` into the logical canvas. A non-square or cropped/recomposed result fails layout; do not stretch it or fit its nose/paws afterward.

Preserve raw high-resolution pixels for measurement. Produce the 192-square logical bitmap with that fixed transform only. Keep any subsequent processing limited to declared whole-image registration/export; do not repaint, recenter or scale limbs to manufacture a pass. Generated geometric deviations are failures to diagnose, not extraction offsets.

## 4. Acceptance: identify the limb before scoring the endpoint

Use two review passes, in this order. The first sees the painting without a target overlay; the second compares the registered measurements with the plan. The same observer can perform the passes if an independent reviewer is unavailable, but record that limitation. A target overlay is useful evidence after annotation and can bias identification if shown first.

### Pass 1 — topology, anatomy and appearance

Trace the visible animal from **attachment to paw**, never from nearest target to plausible limb name. For every limb record its body attachment/occlusion, visible sequence of bends, paw boundary, side assignment and confidence. For the two near limbs, annotate a path over the actual painted contours and creases. The central-left near paw must trace back to the haunch through the RH forward stifle and rearward hock. The central-right near paw must trace back to the chest through RF. Assign each observed paw exactly once. A chest-connected paw cannot satisfy RH even if it lies exactly on RH's cross.

For the far pair, the distal emergence and overlap must justify side/role. A far proximal joint may be hidden. Record hidden anatomy as hidden, with no invented measured center. The near attachment regions must be readable; the actual hip/shoulder pivot may lie under fur, so distinguish an inferred articulation center and its uncertainty from a directly visible landmark. Anatomical correspondence can be demonstrated by the connected contour without claiming to see a bone through fur.

Critical near bends and paw edges must be observable. If near ownership is ambiguous, reject the pose immediately. If a required sole is hidden, record it as missing and fail the complete four-paw proof; do not substitute a target coordinate. Do not relocate far paws or make the final animal translucent to obtain measurements. This pilot deliberately requires four visible soles; it does not impose that on every later facing.

Also require one intact animal, correct elevated E view, original broad head/tiny torso/short thick limbs, tiny weary eyes, continuous neck and abdomen, convincing haunch/chest connection, original-like matte gray-brown paint and no guide residue. Fur must clarify the bent volumes rather than camouflage the wrong attachment. Check the painting at working scale and the canonical 64-pixel standing-height scale, plus the usual 96-pixel display scale. A code-generated contour passing geometry is not a finished-sprite pass.

### Pass 2 — measurements from pixels and error accounting

After role assignment, select each paw's actual source-pixel region. Annotate the underside edge midpoint, not its center of mass or the nearest opaque point to the target. Retain source region, raw pixel point, source hash, fixed transform, resulting logical point, observer and uncertainty. Keep paw regions clear of tails, adjacent legs and fur that belongs to another structure.

Use decoded raw alpha as a boundary aid, with a declared threshold such as 192; inspect threshold sensitivity at 128. A numerical lowest-pixel finder alone cannot identify a limb or decide which fur edge is the sole. Measure before downsampling as well as on the exported logical frame, because resampling can change a borderline contact. Derive uncertainty from edge ambiguity, pixel scale, threshold sensitivity and independent annotation disagreement when available. Do not simply declare subpixel certainty because the source is large.

For planted contacts, keep the existing **3 logical-pixel combined limit**. At 36 units/second with an 83.333 ms midpoint hold, unavoidable temporal displacement is 1.5 pixels to either boundary. The conservative remaining budget is:

`measured position error + measurement uncertainty ≤ 1.5`.

Thus measurement uncertainty of 1 pixel leaves only 0.5 pixel for additional drawing error; it does not permit 3 pixels of drawing error. Prefer the exact whole-hold calculation below, which avoids pretending vertical and horizontal errors add in the same direction. Both far contacts must pass it:

`max over hold boundaries || [36*t,0] + measuredPaw - [96,156] - worldContact || + uncertainty ≤ 3`.

For E06, t is 5/12 and 6/12 seconds. LH world contact is `(-4,-5.656854)`; LF is `(37,-5.656854)`. These exact vectors come from the target plan, while `measuredPaw` must come from the painted pixels. For constant straight travel the boundaries bound the norm over the hold. A one-frame pass establishes only this frame's two support intervals, not a cycle.

For the two swing paws, use the same stricter static allowance `position error + uncertainty ≤ 1.5` so a later stance frame does not inherit a looser drawing standard. Additionally require the measured sole's uncertainty interval to lie above its own near ground plane. In full coordinates this is `measuredY + verticalUncertainty < 161.656854`. The target clearance is only 0.517767. If the image cannot establish clearance at that scale, mark swing clearance inconclusive and withhold the full pose pass. Do not exaggerate the lift or quietly widen the tolerance.

For observable stifle/elbow and hock/carpus landmarks, use a 1.5-pixel diagnostic position allowance including annotation uncertainty. This is a pilot constraint derived from the available spatial budget, not an established biological tolerance. A large error or reversed bend rejects the pose even when the paw fits. For an obscured articulation, retain an uncertainty region and categorical attachment judgment; do not claim an exact joint measurement. Nose-edge registration must also fit 1.5 pixels including uncertainty. Head/torso/fur identity is judged visually against the original; pixel identity is not expected for newly drawn anatomy.

No nearest-neighbor permutation, global relabeling of limbs, per-frame fit, target-derived annotation, silhouette-height normalization or “almost passed” aggregate score is permitted. Store separate results for layout, identity/style, near topology, far ownership, four paw measurements, near bends, swing clearance and whole-hold contacts. Any missing critical observation leaves the proof incomplete.

The retrospective V07 E06 RF record illustrates why this matters: error 2.9011 plus uncertainty 1 exceeds the static 3-pixel limit, before considering any contact hold. It was explicitly a static candidate, not an accepted animation frame; its Boolean pass cannot be reused as evidence for the new contract.

## 5. Parent implementation sequence and stop conditions

1. Present the strategy before painting: the controls concealed attachments and contradicted whole-body movement; the new experiment makes one difficult pose unambiguous and checks actual topology before coordinates. Record the chosen method as A and its fidelity as unproved. Existing user authorization covers implementing this bounded proposal; this report creates no new upload/tool-switch authority.
2. Create a new versioned E06 pilot location. Preserve every failed asset. Copy exact V06/V07 E06 values into a small private target sidecar. Build the neutral complete contour and matching anatomical overlay described above. Keep the public stick and runtime unchanged.
3. Inspect the controls without colors and then with them. Reproduce the numerical and raster-edge preflight. If the parent cannot trace the near hind chain correctly before generation, correct the control first; do not spend a call on another ambiguous blob.
4. Make one fresh complete-sprite request through the existing image tool with only the new controls and original identity/style/game references. Capture raw output and lineage. Do not generate E05, E07 or a sheet alongside it.
5. Perform the two-pass review and actual pixel measurements. Return one of: **single-pose proof passes**, **specific visible failure**, or **incomplete evidence**. Show the intact sprite beside the unchanged approved stick and an independently annotated anatomy overlay. A pass still needs the user's art judgment and establishes no motion-cycle claim.
6. If the painted topology is correct but one precise local defect remains, a second attempt is justified only by a named new corrective control or a demonstrated input bug. Rebuild from original identity plus corrected geometry; do not reuse the rejected output as appearance. If the same topology error recurs with a verified explicit control, stop this soft-conditioning method. Two targeted attempts at the same defect are the maximum, not a quota to use automatically. Do not try a different adjective, larger batch or blind seed search.
7. If the first attempt shows that the tool cannot preserve a readable contour, prefer B's geometry-first isolation or C's direct cel workflow; choose D only after a concrete compatible local setup and its required approvals are established. A method change must address a measured failure. Record remaining limits candidly rather than declaring a new provider necessary without evidence.
8. Only after the one finished E06 sprite passes should an adjacent pose test begin. E05→E06 tests RH advancing under the belly while RF leaves support; E06→E07 tests RH landing and RF continuing swing. Use original identity and fresh verified controls throughout. The accepted E06 may be comparison evidence; it does not replace the original identity source. Then test the full twelve distinct frames, whole-body phase/coat continuity and seam. Only then consider the other facings.

One still cannot prove coordinated head/torso/tail motion, material stability through time, twelve useful poses, input transitions or a continuous loop. Those remain explicit later gates. It can decisively prove or disprove the foundational ability to paint the correct intact animal over the correct anatomical pose.

### Remaining uncertainty

Confirmed: the control omissions, E draw-order defect, frozen-upper-body instruction, V01 muzzle contradiction, identical paw/support targets across plans, E06 geometry and historical QA accounting gap. High confidence: those defects make prior outcomes a confounded test of the image tool and justify the proposed single-pose control change. Unproved: whether this tool follows the stronger control within 1.5 spatial pixels, whether its texture stage preserves all four roles, and whether a successful single pose extends to a coherent whole-body cycle. No generated art or numerical art pass is claimed by this investigation.
