# Wolf stick-figure lab

Decision at `db6ccf71fa86e632c32eb8691fe7f3c5f6b10372`, confidence 98%: use the existing twelve-pose v06 targets for a bare stick-figure display. Project the same local joints into eight movement headings. Keep movement and manual frame inspection as separate modes so Right Arrow cannot both move and step.

Authoritative input: `art/sprites/wolf/whole-body/walk-v06/targets.json`. This is planned motion, not measured or approved painted artwork. The older painted study stays available separately.

Success criteria:

- [ ] A wolf selected on the current local lab can move as plain connected sticks, with no skin, markers or decorative body geometry.
- [ ] WASD/arrows move its root in a straight line; only its limb poses animate.
- [ ] A visible frame mode stays paused; each Space/Right Arrow press or next-frame button click advances exactly one of twelve poses, wrapping at the end.
- [ ] Held keys, editing controls and focus loss do not cause unintended frame advances or stuck movement.
- [ ] Existing painted wolf/Guarin playback passes regression checks.
- [ ] Verify the actual local page, record evidence, commit and push.
