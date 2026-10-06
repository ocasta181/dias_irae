# Shared motion-lab controls

Decision on 2026-10-06 at `eb34cd0c58d1d825debe909af79703e91e09b2dd`, confidence 99%: put Guarin painted, human stick, wolf stick and wolf painted in the upper character selector. Remove the separate view selector. Make frame-by-frame a shared checkbox in the right-hand Playback panel and move the facing compass there for every character.

In manual mode, Space/Right Arrow or the next button advances one frame, repeats do not advance, and Left Arrow/the previous button goes back. WASD selects all eight available headings without advancing time or moving the root. The facing buttons retain the current frame when changing direction. The playback setting stays in effect when switching characters; returning to continuous mode retains the inspected direction and phase. The selected clip can also be inspected manually.

The painted wolf has only E artwork; seven compass buttons remain disabled for that model. The approved wolf sticks, human sticks and Guarin paintings have eight views. This is a control change, not new art or an approval of the painted animation. No atlas, pose plan, timing, stride or reference image is changed.

Success criteria:

- [x] Character/rendering variants share the upper selector; no extra view dropdown remains.
- [x] Continuous/manual playback is a right-panel setting for all four choices.
- [x] Each available direction steps correctly without resetting the pose or moving the root.
- [x] Repeats, input editing, focus loss, loop wrap and original continuous playback retain their tested behavior.
- [x] Verify the live page, responsive controls, character switching and native keyboard stepping.
- [x] Save evidence and update the production checklist; commit and push.

Initial verification: 63 geometry and playback tests pass, including all directions of all four variants, diagonal manual keyboard facing, per-press stepping, manual Guarin action clips, shared mode retention, disabled autoplay in manual mode, the selector structure and unchanged pose geometry.

Native browser verification: the wolf stick steps N/NE/E/SE/S/SW/W/NW through successive poses 2–9 without resetting at a turn. Human NE/NW step correctly. The painted wolf steps its eight-frame E clip; its other headings are disabled. Switching to Guarin retains manual mode and steps SW; disabling manual mode restores its SW sword strike. Keyboard A then Space selects W and advances once. The upper menu contains all four choices and the extra view dropdown is absent.

At 1440 px, the Playback and Facing panels are physically to the right of the canvas. `shared-controls-proof.png` captures this actual page. At 390 px, controls wrap below the canvas without horizontal overflow and manual keyboard input still works. The temporary viewport override is restored. Character and mode choices remain transient inspection state; direct links select their character and fresh loads start in continuous mode. Approval and production-art limitations are unchanged.
