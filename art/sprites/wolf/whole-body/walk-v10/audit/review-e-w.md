# East / west manual frame comparison

2026-10-07, parent reviewer. Opened all 24 individual registered three-pane PNGs with the image viewer: E-01 through E-12 and W-01 through W-12. Each contains the actual active bitmap, the corresponding approved stick and an aligned overlay. No frame is inferred from its reflected source. Rechecked the numerical E paw table from the approved manifest. Left/right here mean anatomical sides, not screen sides.

These are visual observations, not an independently measured contact pass. Hidden paws cannot be assigned exact painted coordinates from these small images. Every frame needs a coordinated-body repair; useful leg ideas do not approve the cycle.

User correction at `6b57604`, confidence 98%: the screenshot is E-06. The rear-leg forward swing is not transferred to the painting. The guide connects hip `(80,140.44)` through its simplified knee `(91.49,148.55)` to paw `(91.95,161.14)`, forward under the belly. In the painting, the prominent paw in that central area belongs to a limb descending from the chest; the visible rear leg remains back beneath the rump. A paw near the target is not evidence of the correct leg when its attachment and joint path are wrong. The original E-05/E-06 wording understated or misclassified this defect. Trace hip/shoulder → joints → paw before accepting any future pose correspondence; mark obscured connections unverified.

| Frame | Comparison with exact stick / drawing observation |
| --- | --- |
| E-01 | Near RH and RF read as planted; far LF lifting is mostly obscured under the chest. Far LH support is dark and difficult to identify. Intact broad-head silhouette, but head/ruff/back held. |
| E-02 | Far forepaw advances, broadly matching LF swing; its underside sits below the high target. Near rear paw retracts; near front support remains. Upper outline repeats E-01 rather than sharing weight transfer. |
| E-03 | Far forepaw reaches forward and rear near limb extends backward; general LF/RH swing idea reads. RH target endpoint does not align cleanly with the extended paw. Head/torso still held. |
| E-04 | Page boundary changes chest/leg overlap. RH swing is tucked behind the body; LF landing appears lower than its far-lane endpoint. Near front foot extends below its target. Upper outline stays frozen within this group. |
| E-05 | A small dark paw is tucked beneath the belly, but its attachment cannot be traced confidently to the required right hind leg. The earlier claim that RH passes under the belly was too strong. Near front paw remains almost fixed despite planned stance retraction. Hind swing and far supports remain unverified. Head, ears and ruff repeat E-04. |
| E-06 | **Rear-leg pose/attachment failure:** the stick's right hind leg swings forward from the hip into the space under the belly. The painting keeps the visible rear leg back; the prominent central paw is connected to a foreleg from the chest. The required hind-leg path is not visible or correctly represented. Front-leg motion cannot substitute for rear-leg swing, even when a paw is near the target. No corresponding whole-body response. |
| E-07 | Near front paw appears weight-bearing although RF is a swing target; the lifted forepaw is shown in the farther lane. Side identity/support is questionable. RH landing does not clearly match the near endpoint. Upper body repeats a neutral hold. |
| E-08 | One forepaw reaches ahead while the other remains underneath. Planned near RF swing versus far LF support is not readable from the overlap. Rear support appears high against the near-lane endpoint. Ruff/back do not respond. |
| E-09 | Forward forepaw extension and backward rear extension are visible; RF endpoint is approximately in the right region, but hind-side assignment/near RH support is unclear. No torso/head response to this extended pose. |
| E-10 | Boundary resets extended forepaw into a down-standing pose; RF landing should remain ahead, while the painted prominent forepaw is too far back relative to that endpoint. Body/ruff detail changes abruptly. |
| E-11 | Near forepaw is still well behind the forward RF target. Hind swing is hard to separate from the dark far paw. Back/head/ruff again repeat the preceding pose rather than transferring weight. |
| E-12 | Lifted forepaw under the belly reads as LF swing; RH and RF supports are plausible but do not align cleanly to both endpoints. The upper body holds while limb silhouette changes. |
| W-01 | Leftward heading reads; a forepaw curls backward with LF swing while another supports. The far support and near rear endpoint are ambiguous. Back/head/tail silhouette held. |
| W-02 | Left forepaw advances, broadly matching swing; drawn underside is below the elevated endpoint. Near front support retracts, but whole-body weight remains unchanged. |
| W-03 | Forepaw reaches forward and rear leg extends rightward. RH swing/stance side identities are difficult to retain through overlap; guide rear endpoint remains exposed. Upper body held. |
| W-04 | Page boundary removes the forward extension. LF landing should remain forward but the prominent front foot sits back beneath the chest; RH swing is tucked. Ruff/tail/neck changes are not phased. |
| W-05 | Near front foot remains behind forward LF target. Rear swing is partly obscured; lower silhouette changes while the upper body remains held. |
| W-06 | Raised far front paw reads as RF swing, while near support remains. Rear forward/back assignments are obscured. No shoulder or neck response; group outline repeats. |
| W-07 | Near forepaw is down at approximately the correct support region. RF swing is hidden under the chest. Near rear support endpoint is outside the drawn paw. Frozen upper silhouette. |
| W-08 | Far forepaw extends to screen left; forepaw lane/contact height does not cleanly match the guide. Near hind stance is high/back relative to the endpoint. Body remains static. |
| W-09 | Forward forepaw and extended rear leg are visible, but near/far side assignment is ambiguous. Rear swing endpoint lies outside the extended painted hind paw. Head/back unchanged. |
| W-10 | Boundary brings the extended front paw down and backwards; far forepaw target is still forward. Near support extends below its target. Upper outline changes across the page boundary. |
| W-11 | Tucked hind leg follows the passing idea; visible front foot stays almost stationary although the support endpoint retracts. Other supports hidden. Head/ruff held. |
| W-12 | Front pair split around the belly, broadly corresponding to swing onset; endpoint height and side mapping do not establish a contact pass. Upper body again held. |

## Cycle and seam verdict

- The source is one complete bitmap per pose. The runtime does not assemble it from parts. The *drawing instructions* nevertheless imposed a parts-like motion policy: identical upper body, changing legs.
- E has four three-frame groups. Upper fur/ear/ruff silhouettes are nearly static within groups; visible texture/overlap changes cluster at E-03→04, 06→07, 09→10 and 12→01. E-09→10 is especially abrupt at the front leg. W has the reflected phase-offset version of those defects; it was inspected independently.
- Both loops fail visual whole-body coherence. Fur changes need to follow bending shoulder/haunch/neck masses; random texture regeneration is not secondary motion.
- Preserve the paw trajectory/support schedule. Add small *drawn* shoulder/haunch/spine/neck changes with smooth periodic phase and stable fur landmarks. Keep the runtime ground root, scale and travel straight. Do not pin each regenerated nose to one identical location: that would erase intended drawn head movement.
- Test a complete E loop first, including page boundaries and 12→01. Supply original identity plus fresh whole-body controls only. Do not use these failed drawings as authoring references.
