# Guarin sprite review manifest

Review this character in the [motion lab](viewer/index.html). Selection, timestamp, ranking snapshot, and reference hashes are in [selection.json](selection.json). The inventory is [../asset-list.md](../asset-list.md).

This is the complete first character animation study: eight directions, eight drawn families, 384 source poses, twelve playback tags per direction. It covers current player behavior plus guard, interaction and prayer. The campaign's draft abilities P09–P23 are inventoried separately and are not falsely marked produced. No final game asset approval has been given.

Change `pending` to `accepted`, `revise`, or `rejected`, and write a note. A ranking preference does not automatically accept an asset. The active page list is [active-pages.json](active-pages.json); prompts and actual requests are preserved in `prompts/` and `records/`.

## Direction pages

| ID | Direction | Active source page | Poses | Decision | Notes |
|---|---|---|---:|---|---|
| GP-S | Front | [S v01](pages/guarin-s-v01.png) | 48 | pending | Inspect symmetry, ground anchor, and loop joins. |
| GP-SE | Front/right | [SE v01](pages/guarin-se-v01.png) | 48 | pending | Closest to source facing; inspect weapon sweep and prayer depth. |
| GP-E | Right profile | [E v02](pages/guarin-e-v02.png) | 48 | pending | E v02 supplies 42 poses; [E v03](pages/guarin-e-v03.png) supplies only the six improved cut poses. |
| GP-NE | Rear/right | [NE v01](pages/guarin-ne-v01.png) | 48 | pending | Rear cloak and far shield; inspect gear continuity and ground anchor. |
| GP-N | Rear | [N v01](pages/guarin-n-v01.png) | 48 | pending | Solid rear helmet and back cloak; inspect covered limbs in gait. |
| GP-NW | Rear/left | [NW v02](pages/guarin-nw-v02.png) | 48 | pending | Replaces false front visor on the v01 rear view. |
| GP-W | Left profile | [W v01](pages/guarin-w-v01.png) | 48 | pending | Near shield partially hides sword hand; inspect limb continuity. |
| GP-SW | Front/left | [SW v02](pages/guarin-sw-v02.png) | 48 | pending | SW v02 supplies 42 poses; [SW v03](pages/guarin-sw-v03.png) supplies six hurt poses with the retained sword. Shield screen position follows anatomical rotation. |

## State families

| ID | Family | Tags | Source poses per direction | Decision | Notes |
|---|---|---|---:|---|---|
| P01 | Idle | idle | 6 | pending | Breathing should be restrained; texture flicker must not replace motion. |
| P02 | Walk | walk | 6 | pending | Both feet participate; inspect passing/contact, sliding, and pose 6→1. |
| P03 | Sword cut | cut | 6 | pending | East now uses an overhead/downward sweep. Inspect all cut recoveries and silhouette continuity. |
| P04 | Guard | guard_in / guard_hold / guard_out | 2 / 2 / 2 | pending | Shield must meaningfully cover the body; hold must not replay raising/lowering. |
| P05 | Hurt | hurt | 6 | pending | Inspect equipment continuity during recoil and recovered stance. |
| P06 | Death | death | 6 | pending | All directions collapse to the ground; final corpse holds until explicit debug reset. |
| P07 | Interact | interact | 6 | pending | Reach may be obscured by the shield; do not silently swap sword/shield hands. |
| P08 | Prayer | kneel / channel / rise | 2 / 2 / 2 | pending | Body lowers and bows; held channel does not replay kneeling; damage interrupts. |

## Inspection and repair

- [x] Capture #1 after the inventory coverage check: G15 / S13 at `2026-10-04T23:47:21.832831+00:00`.
- [x] Supply the exact G15 and S13 files as inputs to every generation, including repairs.
- [x] Preserve all original output bytes, prompts, input hashes, and failed attempts.
- [x] Replace wrong east and southwest facings and the northwest rear visor.
- [x] Locate 48 figures on each active page; validate transparency, occupied bounds, distinct pixel hashes, and no source-page border contacts.
- [x] Isolate neighboring figures without changing generated pixels or synthesizing motion.
- [x] Provide elapsed-time playback, unequal holds, twelve tags, eight facings, frame stepping, speed/rate/scale controls, overlays, and transition tests.
- [x] Verify walk→cut→walk, guard release, prayer interruption, and terminal death in the browser; twelve deterministic timing/transition tests pass.
- [x] Repair east cut and southwest hurt with six new poses each; retain the other 42 poses of each direction and verify source selection.
- [ ] Refine approximate foot anchors where in-motion review shows sliding or jumps.
- [ ] Close remaining gesture/gear continuity and loop-join findings with specific pose repairs.
- [ ] User approves motion, camera, pixel scale, and texture before final export or game integration.

The logical sheet draws from ten unchanged transparent RGBA PNG pages: nine are 1086×1448; southwest v03 is 1199×1312. Eight supply directional sets; two supply only repaired state rows. They are diagnostic animation sources, not tightly packed final game atlases. [atlas.json](atlas.json) defines measured rectangles, offsets, frame timing and events. Pixel hashes prove distinct drawings, not correct motion. Camera angle is estimated rather than calibrated.
