# Whole-body cycle repair pilot

2026-10-07. **Rejected and held outside the motion lab.** This is one twelve-frame complete-cycle drawing request, using the built-in image generator. It is not an accepted replacement for V10.

Inputs: original `walk-v07/canonical-crop.png`, fresh `controls/E-whole-cycle.png` volume/pose template, and fresh `controls/E-stick-cycle.png`. The original supplies appearance; the controls supply chronology and geometry. No failed/generated animation is an input. The exact full prompt is `requests/E-whole-cycle.json`; provider bytes and extraction lineage are retained under `raw/`.

The control changes shoulder/hip height and neck/head/tail placement smoothly with phase while retaining all 48 approved paw endpoints, stance/swing identities, twelve poses, 83.333 ms holds and the one-second/36-unit stride. Inverse geometry verifies reachable limbs. These are restrained stylized motion hypotheses, not measured canine body motion or a new approval of the stick controls.

Extraction yields twelve separate 192-square whole-wolf bitmaps with a fixed page-level scale/placement. No part assembly, per-pose fit, nose pinning, scaling or deformation is applied. Actual provider dimensions are 1448×1086: four by three cells of 362 pixels. Each cell scales uniformly to 128 and is placed at (32,56). The runtime is unchanged and still loads V10.

## Parent inspection

The parent opened all twelve `audit-v01/E-01.png` through `E-12.png` registered comparisons. An independent reviewer separately viewed all twelve and the seam; its full per-frame evidence is in `review-v01-independent.md`.

| Frame | Parent finding against exact approved paw blocking |
| --- | --- |
| E-01 | Prominent near forepaw is low; far LF swing remains under the chest rather than clearly raised in its lane. Head/back match the following frames too closely for readable body response. |
| E-02 | Far LF should move forward; the visible inner paw remains near the belly. Near fore support is almost held while its target retracts. Upper outline remains held-looking. |
| E-03 | Prominent low forepaw moves forward while near RF is in stance; the advancing LF should be on the higher far lane. Near hind extension broadly follows swing onset, but exact side/contact remains uncertain. |
| E-04 | Prominent low forepaw continues ahead despite RF stance retraction. Far LF landing is hidden/merged. No clear chest/head/haunch loading response bridges the transition. |
| E-05 | Inner forepaw becomes visible ahead while the prominent front paw retracts; both should be stance. The rear swing's placement is ambiguous; upper fur/body is held-looking. |
| E-06 | Visible front paw retracts and another paw appears forward. Both RH and RF should be in low swing, but side identity is unclear. Shoulder/neck response is not readable. |
| E-07 | Prominent front foot is still extended down near the belly while RF should be lifted/reaching forward. Hind support lane misses its guide. Upper body remains held-looking. |
| E-08 | Prominent front paw travels backward, opposite RF's forward swing target; the other paw travels forward on the higher lane. This is a support/side contradiction, not corrected by a slower rate. |
| E-09 | Low front paw reaches forward again, but side identity/near hind support cannot be certified. Nose/head/back are displaced from the full-body control. |
| E-10 | RF's forward landing target is not reached by the prominent planted front paw. Hind swing is ambiguous through overlap; body does not carry a readable coherent landing. |
| E-11 | Prominent forepaw remains beneath the shoulder rather than following RF's forward stance target. Upper-body pose changes are weak; fur is stable but mostly held. |
| E-12 | LF toe-off is not clearly readable, and RF stance remains behind its endpoint. The muzzle has drifted up relative to E-01; seam/body coherence is not established. |

The complete request improves identity continuity across the old three-frame batch boundaries. It does not solve anatomical-side mapping, visible paw trajectories or phase-driven whole-body response. Hidden paws remain unmeasured. Distinct PNG hashes do not establish twelve useful walking poses.

The visible muzzle edge was measured independently inside a parent-selected ROI, using alpha ≥192 and the vertical midpoint of its rightmost boundary. `nose-measurements-v01.json` records each observation, targets and ±1.5 logical-pixel measurement uncertainty. Position error is 9.05–10.41 logical pixels, and the observed edge drifts vertically across the loop rather than following the small periodic target. **The parent then found a control error:** the filled muzzle ellipse extended eight pixels beyond the numerical nose endpoint. The silhouette and skeleton therefore supplied conflicting nose geometry. That part of this failed pilot is an authoring-control defect, not a clean test of provider precision. V02 moves the muzzle centre behind its nose-edge endpoint and reduces the overlapping skull envelope; approved paw geometry remains unchanged. No fitting conceals the original measurements.

## Method limit and next requirement

The free-form drawing tool accepts reference images but exposes no deterministic pose-conditioning or temporal control. The pilot does not establish correct painted paw lanes or whole-body phase. Its nose-template contradiction must be corrected before that mismatch can be attributed to the provider. Repeating similar prompts or speeding the animation cannot establish correctness. This output stays rejected; no further eight-direction batch is generated from it.

The next authoring method must prove a difficult adjacent whole-frame pair (such as E-07→08 with RF forward swing and LF stance) using explicit pose conditioning or deliberate hand-drawn complete poses. It must then pass an intact twelve-frame loop, independently measured visible contacts, stable proportions/fur and the seam before expansion. Rejected paintings remain excluded as references. There is no permission to substitute a painted-part rig or runtime body animation.
