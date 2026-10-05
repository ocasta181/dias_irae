# Motion lab playback review

Decision at `d0a3e0b85561c067a415709180f4603750bd0f36`, confidence 99%: inspect actual stage drawing calls before attributing missing poses to the art. The earlier controller tests inspected terminal state and travel, not rendered frame coverage.

The first regression checks use the active whole-body wolf atlas, with drawable images present and `drawImage` rectangles recorded separately from thumbnail rendering.

- At 60 display updates per second, the current loop draws every declared key: source `2, 1, 3, 4, 6, 5, 7, 8, 2`. This is its existing reordered membership, not chronological source numbering.
- With updates at 0, 500 and 1000 milliseconds, the current loop draws only sources `2, 6, 2`: playback positions 1, 5, 1. Six keys receive no stage draw.
- The elapsed-time state/event/travel checks remain valid for real-time simulation. They did not establish that every pose was visible.

38 controller and guide tests passed at the initial checkpoint, without changing art or playback behavior.

## Frame-preserving preview

Decision at `7c1b7af`, confidence 99%: the motion lab should expose every drawing by default. Under a display stall, discard excess preview time rather than jump over unseen poses. Root travel and preset scheduling use that same reduced preview time. At normal update rates, fractional elapsed time is preserved. The checkbox can be disabled for real-time simulation comparison; the earlier elapsed-time matrix explicitly tests that mode.

The new renderer checks draw every wolf key through repeated 500-millisecond gaps, retain the original one-second cycle and 54-pixel travel at 60 Hz, and show all strike keys before recovery. They also record the actual canvas translation and scale: rightward travel is linear, vertical translation remains constant, scale remains 1.5 and no wobble/bounce transform is present. An exact fractional-frame boundary defect in `sample` was corrected: millisecond rounding previously selected the preceding key at durations such as 83⅓ milliseconds.

43 controller/guide tests pass, including fractional frame boundaries and unequal held durations. A live browser shows `8/8 seen` and sequential repeated pose visits. Drawing pixels remain unchanged. The subsequent wolf atlas correction bakes integer whole-canvas registration into the sheet; the renderer never consumes those offsets. Package checks verify a fixed nose anchor and exact source-pixel preservation in all nine drawings. The rejected gait and failed foot-contact checks remain open.
