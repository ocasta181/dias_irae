# One E06 whole-body pose proof

2026-10-07. **All A/B/C drawings are rejected debugging artifacts, not an accepted style change or repaired walk.** B passes four-paw endpoint, stance-hold and swing-clearance checks, but this does not establish the full painted leg paths. Its nose misses the limit and its construction arcs/finish are rejected. None replaces the motion lab wolf.

The latest user rejects the changed artistic finish shown in B. Preserve the original exaggerated v02 wolf, S13 and G15. Any earlier C style-only approval is superseded by this correction. The parent opened original/B/C images and confirms C has background-filled near-leg extensions; it is not a valid painted pose even though its alpha matches the authored mask.

`astra-coordinate-reassessment.md` supersedes the earlier investigation's hip-attachment emphasis. Astra saved this report before its run ended on an account usage limit; the parent reviewed it as an investigation artifact, not a completed successful art review. The confirmed additional V10 defect is page-dependent nose fitting, including E04–06 `(-2,+8)`. The fixed-crop register regression test reproduces the failure and verifies the correction without modifying the historical rejected frames.

The requested Astra/max investigation is in `../astra-pose-investigation.md`. It found a feasible numerical plan and concrete handoff/QA defects: copied standing upper body, E-specific occlusion of leg attachments, anonymous incomplete sticks, same-color limb silhouettes and endpoint scoring without anatomical ownership/uncertainty. The first new controls expose all four chains and integrate the near hind and forelegs into one continuous contour. Public stick poses and endpoints are unchanged.

## Two bounded attempts, one pose

- V01: one fresh complete contour-to-paint request. Original wolf, S13 and G15 only supply identity/style. Astra independently identifies the haunch-connected advancing rear leg and separate chest-connected foreleg; all four paws remain visible. Actual paw errors of 2.31–4.84 logical pixels fail precision. This is topology progress only.
- V02: one interior-finishing edit of a locally authored, verified complete transparent cel. It uses original appearance references and no V01 painting. This materially changes the task from reconstruction to finishing existing geometry. All four painted paw errors are 0.18–0.61 logical pixel. The contact/clearance checks below include uncertainty. The generator still changes some outer contours, especially the nose, and leaves long smooth internal black arcs looking unfinished.

Each output is one intact 1254-square alpha bitmap. Raw provider bytes and full actual requests are preserved in `raw/` and `requests/`. A fixed whole-square scale `128/1254` and offset `(32,56)` creates the 192-square logical frame. No source fitting, recoloring, deformation, parts assembly, alpha replacement or per-paw offset is used. Original inputs and output hashes are recorded. QA-only pale backgrounds and enlarged crops do not modify final sources.

## Measured V02 result

Actual paw regions and component seeds were selected after unmarked topology inspection. Each seed belongs to its independently identified paw. Connected-component isolation prevents a neighboring toe fragment from contaminating a sole. Primary measurements use alpha 192. Alpha 128 and connected lower-contour bands 4/8/16 source pixels contribute to uncertainty, alongside sampling and one-source-pixel annotation allowance. Planned points are never substituted for measurements.

| Limb | Position error | Combined uncertainty | Relevant additional check | Verdict |
| --- | ---: | ---: | --- | --- |
| LH, far hind | 0.200 | 0.408 | Hold-boundary drift + uncertainty = 2.004, limit 3 | Pass |
| LF, far fore | 0.181 | 0.267 | Hold-boundary drift + uncertainty = 1.795, limit 3 | Pass |
| RH, near hind | 0.572 | 0.459 | Error + uncertainty = 1.032, limit 1.5; own-lane clearance 0.879 exceeds vertical uncertainty | Pass |
| RF, near fore | 0.613 | 0.306 | Error + uncertainty = 0.919, limit 1.5; own-lane clearance 0.879 exceeds vertical uncertainty | Pass |

All values are logical pixels. E06 represents 416.667–500 ms of the one-second walk. The two stance calculations use the actual painted sole and approved world contact at both hold boundaries with straight root travel. This proves only those two contacts for this one sampled pose, not the cycle.

The nose edge is `(142.5965,125.2057)` against `(144,126)`, an error of **1.613**. Astra independently locates the same extremity and gives a local raw-pixel uncertainty envelope. Including that envelope and sampling yields approximately **0.487** uncertainty. Their sum exceeds the **1.5** limit. Do not relabel the endpoint or shift the whole image to manufacture a pass.

Astra's `topology-v02-astra.md` records visible bend features and uncertainty. Exact bone pivots under fur remain unmeasured; silhouette corners are not joint centers. The required bend order and near-limb ownership are readable, but a complete skeletal-coordinate pass is not claimed. Long black haunch/neck/chest curves improve traceability while remaining a specific finish defect.

## Stop and next method

The existing free-form generation/finishing route is stopped under the predeclared protocol. B's four paw endpoints transfer, but complete leg-path correspondence is not established, the nose shifts and the finish fails. No third wording retry, adjacent pose or sheet follows this result.

The next method must supply an actual protected whole-cel boundary/paint operation or explicit spatial conditioning, with the same complete-sprite anatomy. A prose request to keep alpha unchanged has not enforced it. Direct whole-cel finishing and spatially conditioned generation are Astra's remaining alternatives; neither is implemented or proven here. Do not revive parts, modify privacy, upload to an unapproved service, warp this candidate or loosen its gate.

`measurements-v02.json` and the independent report are the endpoint evidence. No complete painted sprite passes. After B, C's one-call protected-canvas test also fails: the material image paints standing paws elsewhere and the predetermined mask exposes background RGB as lower legs. `controlled-c-v01/raw/` and `final/` preserve both stages; exact mask correspondence is not painted-pose correspondence. No fitting, repair, new call or lab installation follows C. The next gate is a real spatial-control capability, then one whole-body proof in the original style.
