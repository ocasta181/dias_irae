# Complete wolf walking study

2026-10-06 decision at `35a4ccf`, confidence 99%: follow the user's instruction to fill every approved stick frame through the existing original-reference plus exact-pose still drawing method. AniDoc is not selected and no upload to it occurs.

The target is eight facings × twelve distinct whole-body bitmap poses, one one-second cycle at twelve pose changes per second. Idle holds pose 1. Sixty source poses cover E/NE/SE/N/S; W/NW/SW reflect the whole corresponding source image with a six-pose phase shift and swapped anatomical sides. That mapping matches the approved joint geometry, not merely the screen direction.

Each request contains the exact original wolf, one fresh three-pose silhouette template and its literal approved stick guides. No generated or failed artwork is a drawing input. Original provider bytes and exact actual arguments are retained in `raw/`. `manifest.json` tracks the selected frame sources; `progress.json` reports current drawing coverage. A drawing slot filled is not a production-quality pass.

Export uses one uniform page/cell scale into a 192-square logical canvas. E profile pages share one whole-page integer translation measured from their three nose tips to the existing canonical nose anchor (144,126). All three poses receive the same translation; no individual silhouette fitting, body-part assembly or runtime pose offset occurs. Source registration measurements and shifts are recorded. Other facings retain the fixed crop. Every renderer pivot stays (96,156), at reference height 64 and stride/speed 36 logical units per second.

Candidate sheets use four columns, three rows and two clear pixels per frame edge, giving 784×588 alpha PNGs. Packing copies decoded frame bytes directly; all completed sheet cells reconstruct exactly. Root motion is straight and independent of body pose; the player adds no bob, sway or rotation.

The motion lab's painted-wolf option loads `walk-v10/atlas.json`. Completed directions become available while the rest are drawn. All twelve walk sources play sequentially with 83.333 ms holds. The shared frame-by-frame setting and compass work with every available direction. In the inspection panel, **Ground pivot, frame bounds and approved pose** overlays the exact stick drawing on the skin; it is planned geometry, not measured painted contacts.

Open quality work remains: actual paw/contact errors, camera/proportion differences, texture continuity, adjacent transitions and loop seams must be assessed in the rendered package. The first diagonal trials raised the muzzle or retained a side profile; targeted original-only repairs correct their facing. This is a drawing study under review, not approved production animation.
