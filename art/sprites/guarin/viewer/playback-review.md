# Motion lab playback review

Decision at `d0a3e0b85561c067a415709180f4603750bd0f36`, confidence 99%: inspect actual stage drawing calls before attributing missing poses to the art. The earlier controller tests inspected terminal state and travel, not rendered frame coverage.

The first regression checks use the active whole-body wolf atlas, with drawable images present and `drawImage` rectangles recorded separately from thumbnail rendering.

- At 60 display updates per second, the current loop draws every declared key: source `2, 1, 3, 4, 6, 5, 7, 8, 2`. This is its existing reordered membership, not chronological source numbering.
- With updates at 0, 500 and 1000 milliseconds, the current loop draws only sources `2, 6, 2`: playback positions 1, 5, 1. Six keys receive no stage draw.
- The elapsed-time state/event/travel checks remain valid for real-time simulation. They did not establish that every pose was visible.

38 controller and guide tests pass at this checkpoint. No source art or playback behavior has changed yet. Frame-preserving lab playback and straight-path registration checks remain to be implemented and verified.
