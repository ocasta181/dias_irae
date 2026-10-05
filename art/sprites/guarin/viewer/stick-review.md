# Wolf stick-figure lab

Decision at `db6ccf71fa86e632c32eb8691fe7f3c5f6b10372`, confidence 98%: use the existing twelve-pose v06 targets for a bare stick-figure display. Project the same local joints into eight movement headings. Keep movement and manual frame inspection as separate modes so Right Arrow cannot both move and step.

Authoritative input: `art/sprites/wolf/whole-body/walk-v06/targets.json`. This is planned motion, not measured or approved painted artwork. The older painted study stays available separately.

Success criteria:

- [x] A wolf selected on the current local lab can move as plain connected sticks, with no skin, markers or decorative body geometry.
- [x] WASD/arrows move its root in a straight line; only its limb poses animate.
- [x] A visible frame mode stays paused; each Space/Right Arrow press or next-frame button click advances exactly one of twelve poses, wrapping at the end.
- [x] Held keys, editing controls and focus loss do not cause unintended frame advances or stuck movement.
- [x] Existing painted wolf/Guarin playback passes regression checks.
- [x] Verify the actual local page, record evidence, commit and push.

Verification on 2026-10-06: 46 animation/controller checks pass. They cover twelve unique planned leg poses, fixed torso/root registration, unchanged one-second duration and 36 logical px/s travel, eight projected headings, one-step Space/Right Arrow/button input, ignored repeated keydown events, a stationary paused view, editing/shortcut exclusions and release on focus loss. The east-facing skeleton lines match the supplied guide points exactly.

Native browser input on the existing local lab visits frames 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2 after twelve alternating Right Arrow/Space presses from frame 2. Space on the focused next-frame button advances once. Selecting the frame view focuses the canvas, so the first key press works immediately. The eight-direction sequence runs; changing back to the painted study restores its original metadata. Switching to Guarin hides the wolf controls and Space still strikes.

Responsive checks at 1440 and 390 px verify visible controls and stepping; the narrow page has no horizontal overflow. The temporary viewport override is restored. Reload returns to the default controllable stick view for the wolf; mode/pose choices are transient inspection state. No endpoint, database, review ordering, privacy setting or painted source was changed. The numerical motion plan and its renderer are verified; convincing gait and final painted animation remain unapproved.
