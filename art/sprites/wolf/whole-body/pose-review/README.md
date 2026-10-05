# Exact wolf pose evidence

Decision at commit `96e5f67278f14be7634e2065de157af5aa566913`, confidence 98%: show the existing eight-frame target plan and the actual exported drawings before any further repair. The user's request is for inspectable joint positions, not another speed adjustment or a new generated batch.

The original two guide images and prompts remain unchanged. `review-poses.mjs` redraws their numerical coordinates with readable joint indices, lists 26 planned anchors per frame, and pairs each frame with the painting currently displayed at that time. It records the runtime swaps explicitly. These diagrams are a new presentation of old targets, not proof that the output followed them.

The original guides had overlapping/clipped labels. Four drawings were reordered in the active walk. Neither the guide's plausible geometry nor the slower cadence establishes a painted walk. The 36-pixel stride was selected in the plan, not derived from measured painted foot movement. Required contacts, limb identity and pose continuity still fail or lack evidence. Ears, eyes and coat markings lacked separate numeric anchors.

Run the existing canvas dependency with `node art/sprites/wolf/whole-body/review-poses.mjs` to reproduce this review. The generator verifies unchanged saved inputs and sources, reads the current atlas, and writes only this review folder. It never alters the artwork, animation order, speed or root travel.

Verified: all eight plans and 208 anchor coordinates match the original guide data; all page links resolve and the active source mapping is preserved. Browser checks cover side-by-side rendering at 1440 pixels, stacked figures without overflow at 390 pixels, keyboard opening/closing of the 26-row coordinate table, and navigation to the lab and back/forward. The viewport override was reset. [The browser preview](browser-proof.jpg) shows both the skeleton and actual painting. All 36 existing controller/guide tests pass; they do not approve this rejected motion. No database, endpoint contract or generation input changed.
