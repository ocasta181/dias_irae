# Human stick-figure review

Decision at `24c570a2be8b955a75463e44b960c8559915ca8a`, confidence 97%: add a separate Human option in the existing lab, with the approved wolf's movement and one-frame-per-press controls. Preserve the earlier Guarin paintings and numerical plan. The user approved the wolf stick figure on 2026-10-06; the human remains pending review.

Inputs: original S13 identity/proportion image `art/concepts/images/s13-guarin-isometric-v02.png` (SHA-256 `02b9e869ba964d9c82e45f1aa4627d170b78cda1219c210bf9b425244c392c5c`) and the existing Guarin locomotion coordinate convention. S13 was visually inspected for this task. This is motion blocking only; the old rejected painted walk is not a source for the new movement.

The canvas is 256 square, ground root (128, 208), reference height 160, camera elevation 45 degrees. Keep the 80-pixel oversized head and the 40-unit hip height, with 22-unit upper/lower leg bones that reach the sole directly. A single angular head outline makes the large head readable without circles or joint markers. The rest is plain connected sticks, with no numbers, colors, clothing, weapons or body envelopes.

Walk: twelve distinct midpoint poses, 83.333 ms each, one second per cycle, 48-unit full stride and 48 ground units/second. The earlier unapproved 24-pose/800 ms plan remains unchanged. Support lasts 62.5% per foot, left/right contacts alternate half a cycle apart, lanes stay at −8/+8, and lift peaks at eight units. During support, local foot travel exactly cancels root travel. The swing uses matching endpoint velocity and smooth lift. Fixed limb lengths determine knees and elbows. Shoulder/pelvis/head stay fixed; small arm swings oppose the legs. Neutral idle plants both feet and has no motion.

At the reference scale, held midpoint poses allow at most two pixels of temporal contact error. No runtime bob, sway, rotation, per-pose scale, crossfade or decorative root movement is added. These are projected pose lines, not 3D character art. Responsive input uses the lab's current direct stop/heading policy: arbitrary-phase planting and equipment/action transitions remain open production work, not a claimed pass.

Output: `plan.mjs` computes the joints, contacts and eight projections. `atlas.json` is its exported pose data, consumed directly by the existing lab. Reproduce it with `node art/sprites/guarin/locomotion/stick-v01/export.mjs` from the repository root.

Review checklist:

- [x] Numerically verify contact locking, support, reachability, fixed proportions, twelve unique poses, midpoint holding error and loop closure. Nine geometry checks and all 46 existing playback checks pass.
- [ ] Verify actual lab movement and one-frame Space/Right Arrow/button stepping, repeat suppression and stationary manual review.
- [ ] Preserve wolf blocking and original Guarin playback.
- [ ] Visually inspect the local lab and save evidence; commit and push.
- [ ] User approves the human stick figure.
