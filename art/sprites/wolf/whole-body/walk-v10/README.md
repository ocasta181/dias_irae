# Complete wolf walking study

2026-10-07 whole-body correction: a manual 96-frame comparison is in progress in `audit/`. V10's authoring instructions wrongly froze head/spine/coat and changed only the legs. That premise is withdrawn. Coverage remains complete, but the cycle needs coordinated whole-body drawings and measured contacts. Keep the runtime root straight; movement of shoulder/haunch/head/tail/fur must be drawn inside intact sprites.

2026-10-06 decision at `35a4ccf`, confidence 99%: follow the user's instruction to fill every approved stick frame through the existing original-reference plus exact-pose still drawing method. AniDoc is not selected and no upload to it occurs.

The target is eight facings × twelve distinct whole-body bitmap poses, one one-second cycle at twelve pose changes per second. Idle holds pose 1. Sixty source poses cover E/NE/SE/N/S; W/NW/SW reflect the whole corresponding source image with a six-pose phase shift and swapped anatomical sides. That mapping matches the approved joint geometry, not merely the screen direction.

Each request contains the exact original wolf, one fresh three-pose silhouette template and its literal approved stick guides. No generated or failed artwork is a drawing input. Original provider bytes and exact actual arguments are retained in `raw/`. `manifest.json` tracks the selected frame sources; `progress.json` reports current drawing coverage. A drawing slot filled is not a production-quality pass.

Export uses one uniform page/cell scale into a 192-square logical canvas. E profile pages share one whole-page integer translation measured from their three nose tips to the existing canonical nose anchor (144,126). All three poses receive the same translation; no individual silhouette fitting, body-part assembly or runtime pose offset occurs. Source registration measurements and shifts are recorded. Other facings retain the fixed crop. Every renderer pivot stays (96,156), at reference height 64 and stride/speed 36 logical units per second.

Candidate sheets use four columns, three rows and two clear pixels per frame edge, giving 784×588 alpha PNGs. Packing copies decoded frame bytes directly; all completed sheet cells reconstruct exactly. Root motion is straight and independent of body pose; the player adds no bob, sway or rotation.

The motion lab's painted-wolf option loads `walk-v10/atlas.json`. Completed directions become available while the rest are drawn. All twelve walk sources play sequentially with 83.333 ms holds. The shared frame-by-frame setting and compass work with every available direction. In the inspection panel, **Ground pivot, frame bounds and approved pose** overlays the exact stick drawing on the skin; it is planned geometry, not measured painted contacts.

## Completed drawing coverage — 2026-10-06

All **96/96** painted frame slots and **8/8** candidate sheets are filled. The current atlas has twelve distinct whole-body frames per facing, held across one second, plus pose-1 idle aliases. Sixty source paintings and thirty-six whole-image reflections supply the package. All 96 decoded frame images are distinct and every atlas cell reconstructs its complete source canvas byte-for-byte.

The native browser steps all twelve phases and wraps in N/NE/E/SE/S/SW/W/NW. Space advances from 1→2 and Right Arrow from 2→3 in the painted view. The continuous eight-direction sequence completes through NW and returns to held idle. Tests exercise all eight new bitmap facings, exact straight travel, keyboard release, clock/frame boundaries, unchanged roots, input lineage and atlas reconstruction. **61 checks pass**, covering software/artifact properties. Desktop 1440 and phone 390 verification report no horizontal overflow.

Visual inspection caught a green hole inside NE pose 9's hind leg and two problematic initial diagonal head views. Their repairs use original-only inputs; failed bytes remain under `raw/`. Stronger chroma extraction removes green edge contamination without modifying the raw provider files. A final texture-first SE01–03 experiment is retained as a held diagnostic, not adopted as a three-frame change inside the existing cycle.

Coverage is not the remaining quality gate: the painted/stick overlay still exposes spatial differences. No full measured contact-budget pass or human-style continuous-motion perception is claimed. Refine painted geometry, camera and texture/loop continuity before calling this production-ready. Current software accepts all eight facings; it does not substitute the stick model or add procedural limb movement.

Open quality work remains: actual paw/contact errors, camera/proportion differences, texture continuity, adjacent transitions and loop seams must be assessed in the rendered package. The first diagonal trials raised the muzzle or retained a side profile; targeted original-only repairs correct their facing. This is a drawing study under review, not approved production animation.
