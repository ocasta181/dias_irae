# Canine animation research

Decision at `77b62fb`, confidence 95%: investigate canine mechanics and animation practice before another painted walk batch. The current wolf gait remains rejected. More drawings or a different playback rate cannot establish correct limb movement.

## Delegated investigation

The user explicitly requested the bounded-subagent skill. The installed skill now follows the confidence rule: infer reversible settings at confidence ≥80%, ask only below that threshold, preserve explicit choices and required approvals. Its frontmatter validator passes. The installed copy is independent of its former link into another project's feature branch; that original source and checkout are unchanged.

Assignment: `/root/canine_gait_research`, read-only, parent model and reasoning effort inherited. It must research canine walk/trot/gallop mechanics, professional animation methods, audit our pose plan and return a concrete pilot/quality-assurance plan with reviewed primary sources. Parent owns integration and the frame-rate comparison. Investigation is running; no conclusion is accepted yet.

## Frame timing evidence

[Paul Siramy's original animation-extraction research](https://tristram-archives.github.io/diablo2_infodump/2013/just%20hosting%20these,%20Downloaded%20from%20Internet/documentation/extracting_diablo_2_animations.pdf), pages 36–37, documents Diablo II's 25 Hz logic clock and separate per-clip speeds. Its Barbarian walk `BATW1SS` has eight drawings played at 25 FPS: a 320 ms loop. Its neutral `BATN1SS` uses `AnimationSpeed=80`, giving `25 × 80 / 256 = 7.8125` drawing changes per second. These are documented examples, not a universal rate for every character/action or every gameplay speed modifier.

[Unity's Team Cherry case study](https://unity.com/made-with-unity/hollow-knight) confirms traditional Photoshop animation, PNG sprites and 2D Toolkit. It does not publish exact clip frame rates. Team Cherry's publicly provided image library, inspected through ACMI, also supplies no timing metadata. The local Hollow Knight folder contains configuration remnants, not the game's serialized animation assets. A claimed universal 12 FPS rate is **unverified** and must not become our benchmark.

Keep these separate:

- Display/render rate: how often the screen updates.
- Drawing cadence: how often a new sprite pose appears.
- Cycle duration: time until the same anatomical phase repeats.
- Ground speed: distance per cycle divided by cycle duration.

The existing motion-lab FPS control scales both time and travel. Raising an eight-drawing clip from 8 to 15 FPS would shorten its loop and accelerate movement; it would not add in-betweens. A cadence comparison must use the same motion, cycle duration and stride, sampled at different drawing counts.

## Temporal review correction

Our visual tools return snapshots, not a continuously perceived video stream. Previous browser screenshots and `8/8 seen` traces establish selected poses and renderer coverage, **not** a convincing gait. The earlier assertion of having watched and verified the walk at normal speed was too strong.

Before promoting another candidate, inspect an ordered full-cycle sequence including last→first, maintain anatomical paw identities, measure actual painted stance contacts against actual root travel, and inspect both stationary-root and moving-root evidence at intended scale. Check the whole animal's silhouette, texture and occlusion across transitions. Missing/occluded measurements stay missing; planned guide coordinates cannot substitute for observations. No new candidate is promoted by this research checkpoint.

## Pending decisions

- [ ] Verify and integrate the subagent's primary-source findings.
- [ ] Choose a cadence/stride pilot from the mechanics and perceptual requirements, with a fair comparison at fixed cycle duration and travel.
- [ ] Correct motion blocking before detailed art; retain the user's exaggerated whole-body identity and straight runtime root path.
- [ ] Obtain whole-cycle temporal evidence and measured painted contacts before any motion-quality pass.
