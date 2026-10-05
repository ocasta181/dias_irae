# Canine animation research

Decision at `77b62fb`, confidence 95%: investigate canine mechanics and animation practice before another painted walk batch. The current wolf gait remains rejected. More drawings or a different playback rate cannot establish correct limb movement.

## Delegated investigation

The user explicitly requested the bounded-subagent skill. The installed skill now follows the confidence rule: infer reversible settings at confidence ≥80%, ask only below that threshold, preserve explicit choices and required approvals. Its frontmatter validator passes. The installed copy is independent of its former link into another project's feature branch; that original source and checkout are unchanged.

Assignment: `/root/canine_gait_research`, read-only, parent model and reasoning effort inherited. The investigation is complete. Parent checked the cited gait descriptions, original duty-factor results, professional blocking advice, current guide code and failed contact report. Its conclusions below are accepted as research; no sprite-quality approval follows from them.

Integration decision at `8aca7ee`, confidence 95%: retain the valid four-beat order, repair whole-body drawing/control correspondence and measure painted contacts. Cadence and stance changes below are test hypotheses, not established repairs.

## Frame timing evidence

[Paul Siramy's original animation-extraction research](https://tristram-archives.github.io/diablo2_infodump/2013/just%20hosting%20these,%20Downloaded%20from%20Internet/documentation/extracting_diablo_2_animations.pdf), pages 36–37, documents Diablo II's 25 Hz logic clock and separate per-clip speeds. Its Barbarian walk `BATW1SS` has eight drawings played at 25 FPS: a 320 ms loop. Its neutral `BATN1SS` uses `AnimationSpeed=80`, giving `25 × 80 / 256 = 7.8125` drawing changes per second. These are documented examples, not a universal rate for every character/action or every gameplay speed modifier.

[Unity's Team Cherry case study](https://unity.com/made-with-unity/hollow-knight) confirms traditional Photoshop animation, PNG sprites and 2D Toolkit, but publishes no clip timings. The initial lookup stopped too early at general articles and image libraries. The further lookup below establishes specific clip rates from published extracted game data. The local game folder still contains configuration remnants; these are external research findings, not measurements from a locally running game.

### Hollow Knight: exact clip lookup, 2026-10-05

Decision at `0cde99b`, confidence 95%: use the Knight's **12 FPS normal movement** as the Hollow Knight locomotion reference, rather than treating 12 as a universal rate. [hkrl's original reverse-engineering study](https://github.com/Ramora0/hkrl/blob/eb9844f97896b310c292c831cdbb6985eaf710ac/analysis/specs/tk2d-animator.md) reports `Run` at 12 FPS and `Turn` at 20 FPS, with playback checked against recorded game traces. [Its source description](https://github.com/Ramora0/hkrl/blob/eb9844f97896b310c292c831cdbb6985eaf710ac/README.md) identifies Hollow Knight 1.5.78 and states that the generated tables contain values read from game data.

Parent independently retrieved [the pinned generated timing table](https://raw.githubusercontent.com/Ramora0/hkrl/eb9844f97896b310c292c831cdbb6985eaf710ac/sim/generated/GG_Hornet_1/tables.c), decoded its string/library indices, and read the `Knight` library (214 clips). [The table schema](https://github.com/Ramora0/hkrl/blob/eb9844f97896b310c292c831cdbb6985eaf710ac/sim/fsm/fsm_tables.h) defines each row as name, FPS, wrap mode, loop start, first frame and frame count. This prevents confusing Hornet's same-named clips with the Knight's.

| Knight clip | Clip FPS | Frame slots | Loop start (zero-based) |
| --- | ---: | ---: | ---: |
| Idle | 12 | 9 | 0 |
| Run (normal travelling movement) | 12 | 13 | 6 |
| Walk (walk-zone movement) | 10 | 7 | 0 |
| Sprint | 12 | 10 | 4 |
| Airborne | 16 | 12 | 9 |
| Turn | 20 | 2 | 0 |
| Slash | 20 | 15 | 0 |

These are clip playback rates, not counts of unique drawings per second; frame slots may repeat artwork. `Run` includes an initial section before its seven-frame loop. The original study describes ordinary playback using the clip's FPS, while explicit overrides can change it. The broader game's rates therefore differ by action. The 2019 [official information sheet](https://files.bbystatic.com/enW7ynTFVH2SPga2A19ssQ==/bd7c46c6-763c-4e2c-82bf-bce2a2ac5a1b.pdf) lists 60 FPS game output; that is a separate measurement.

Keep these separate:

- Display/render rate: how often the screen updates.
- Drawing cadence: how often a new sprite pose appears.
- Cycle duration: time until the same anatomical phase repeats.
- Ground speed: distance per cycle divided by cycle duration.

The existing motion-lab FPS control scales both time and travel. Raising an eight-drawing clip from 8 to 15 FPS would shorten its loop and accelerate movement; it would not add in-betweens. A cadence comparison must use the same motion, cycle duration and stride, sampled at different drawing counts.

## Temporal review correction

Our visual tools return snapshots, not a continuously perceived video stream. Previous browser screenshots and `8/8 seen` traces establish selected poses and renderer coverage, **not** a convincing gait. The earlier assertion of having watched and verified the walk at normal speed was too strong.

Before promoting another candidate, inspect an ordered full-cycle sequence including last→first, maintain anatomical paw identities, measure actual painted stance contacts against actual root travel, and inspect both stationary-root and moving-root evidence at intended scale. Check the whole animal's silhouette, texture and occlusion across transitions. Missing/occluded measurements stay missing; planned guide coordinates cannot substitute for observations. No new candidate is promoted by this research checkpoint.

## Mechanics to preserve through exaggeration

- Use the animal's anatomical left/right throughout: LF = left forepaw, RF = right forepaw, LH = left hindpaw, RH = right hindpaw. Occlusion never changes identity. Forelimb: shoulder → elbow → carpus → paw. Hindlimb: hip → stifle → hock → paw. The backward-facing hindleg bend is the hock. Canines bear weight on pads/toes with the heel elevated. Preserve those relationships while retaining the oversized head and squat short-legged S13 proportions. See [University of Minnesota veterinary anatomy](https://vanat.ahc.umn.edu/run/), digitigrade locomotion section; its anatomy does not prescribe our pixel lengths.
- Walk is sequential four-beat motion. LH → LF → RH → RF is a valid simplified order. Normal walking alternates two- and three-foot support. The hindpaw arrives after the same-side forepaw clears; a power walk uses shorter steps and longer three-foot support. Equal quarter-cycle spacing and 75% stance are choices, not universal canine constants. See [University of Minnesota's walk explanation](https://vanat.ahc.umn.edu/gaits/walk.html).
- Trot alternates diagonal pairs, LF/RH and RF/LH; faster versions can include flight. Slight pair dissociation is possible. See [University of Minnesota's trot explanation](https://vanat.ahc.umn.edu/gaits/trot.html). Do not create it by accelerating the four-beat walk.
- Gallop is asymmetric, with a lead and uneven contact spacing. One rotary example is RH → LH → extended flight → LF → RF → collected flight. Dogs also use transverse gallop. See [University of Minnesota's rotary-gallop explanation](https://vanat.ahc.umn.edu/gaits/rotGallop.html). A run needs its own reference and pose plan.

Stance is landing to toe-off; swing is toe-off to the next landing; duty factor is stance duration divided by the same-paw cycle. Stride is distance between successive contacts of the same paw. During stance the paw retracts relative to the body to remain fixed on the ground. Swing must show lift, clearance, forward recovery and a prepared landing. See [the veterinary gait overview](https://vanat.ahc.umn.edu/gaits/info.html). Its simplified cartoons omit trunk motion; they are footfall explanations, not complete acting reference.

[Fischer, Lehmann and Andrada's original study](https://www.nature.com/articles/s41598-018-34310-0), Results—“Speed walk, speed trot, duty factor,” reports fluoroscopy-trial mean walking duty factors 0.58–0.63 and trotting values 0.42–0.47 across four domestic breeds. The marker-based trials report different ranges. Hindlimb sections describe distinct stifle/hock timing and breed differences. These observations refute a universal 75% prescription; they do not determine our wolf's exact joint angles, speed or proportions. The parent reviewed these passages in the in-app browser after the web reader's cookie redirect failed.

## Authoring method

[Steve Cady's original quadruped lesson](https://www.animationmentor.com/blog/how-to-animate-quadruped-walk-cycles-with-a-jurassic-world-animator/), Preparation/Blocking/Clean-up, starts with anatomy and filmed reference, then thumbnails, full/mid-stride blocking and breakdowns before polishing. His example uses a cat and Maya. Transfer the analysis and construction method to intact 2D drawings; do not adopt its species proportions or rendering medium.

[Kevin Koch's timing/spacing lesson](https://www.animationmentor.com/blog/slow-in-and-slow-out-the-12-basic-principles-of-animation/) distinguishes timing from the distance features move between drawings. Interpolation alone cannot choose convincing spacing. Applied here: track the actual painted paws and silhouette landmarks, including transitions where a limb disappears behind the body. Reviewed article text does not establish that the parent or child perceived their embedded videos continuously.

For the next pilot, each stage has a concrete handoff:

1. **Reference analysis.** Input: one complete, readable canine walk and the intact approved-style base. Output: timestamps for every paw's landing, toe-off and passing position, anatomical identities and visible support combinations. Record ambiguous/hidden contacts; do not substitute guesses.
2. **Motion blocking.** Input: that worksheet, fixed camera/pivot and measured base proportions. Output: plain connected-stick guides plus intact rough wolf poses at contact, passing, lift-off and pre-landing landmarks. Keep numerical identities in the separate internal worksheet. Verify short-leg reach and same-side paw clearance before painting.
3. **Whole-cycle drawing.** Input: canonical base plus successful controls. Output: complete animals with stable skull, muzzle, coat landmarks, body volume and paw identities. Build breakdowns around the blocked action. Failed prior animations remain excluded from generation inputs. Two ignored guide formats are evidence to change the control workflow before another finished batch.
4. **Sampling and contact measurement.** Input: coherent rough cycle. Output: ordered frames, explicit holds, measured painted contact coordinates and uncertainty. Derive travel from accepted stride and cycle, rather than assuming generated art followed target coordinates. Sample the same cycle for cadence comparisons.
5. **Temporal and package review.** Input: complete rough export. Output: travelling and stationary-root loops at intended size/speed, chronological cycle/seam evidence, contact results and package results. Finish paint and expand headings only after those distinct gates pass.

All movement is drawn into complete sprites. Runtime root travel stays straight, with constant pivot and scale. No runtime bob, sway, squash or decorative positioning.

## Audit of the current guide and paintings

The parent reread `pose-guides.mjs`, imported `paw()` in `motion.mjs` and `contact-report-v04.json`, and independently recalculated these values:

| Current assumption | Finding |
| --- | --- |
| LH 0 / LF .25 / RH .5 / RF .75 landing phases | Valid simplified walk order; painted correspondence remains unproved. |
| 75% stance, eight midpoint drawings | Six stance drawings and only two swing drawings per paw. Lift-off, clearance and landing have little independent representation. |
| Fixed distal paw vectors | Fore `(1,-5)`, hind `(4,-6)` omit changing carpus/hock angle and paw roll. Reachability is not anatomical correctness. |
| 36 px stride, 32 px shoulder/hip axis | Different measurements; ratio 1.125 alone does not establish an error. At 75% stance the paw retracts 27 px; short painted legs must support that reach. |
| Squared-sine lift and smoothstep recovery | Hypothetical trajectories. Zero local forward speed at the end of recovery does not match the grounded paw's backward local speed. Inspect touchdown spacing. |
| 36 logical px/s, 125 ms holds | Ideal midpoint hold error is ±2.25 px. A 3 px budget leaves 0.75 px for drawing error; current measurement uncertainty is about ±1 px. |
| Actual measured contact report | Fails at 10.75 logical px drift versus 3 px, with many contacts unmeasured. Registration and frame coverage do not override this rejection. |

For a fixed stride S and N equal midpoint holds, ideal stance hold error is S/(2N). Changing cycle duration and travel speed together leaves it unchanged. Playback speed cannot repair this geometric constraint or invalid drawings. The exact whole-body export remains rejected; the unused older component `pose()` bob is not the active viewer's positioning.

## Proposed cadence comparison and pilot

Decision at `8aca7ee`, confidence 80%: start a controlled **15 drawing-changes/second** trial, with a 20/second comparison if stepping remains distracting. This remains our provisional artistic choice. The later lookup places it between Hollow Knight's 12 FPS normal movement and the documented Diablo II Barbarian walk at 25 FPS; neither is a universal rate for its game. At a steady 60 Hz display those proposed rates allow uniform holds of four or three display updates respectively; dropped presentation updates still require separate coverage checks.

Example comparison specification, pending reference-based blocking: same 800 ms cycle, same 24 logical px stride, same 30 logical px/s ground travel, same pose trajectory and canvas scale. Twelve drawings give 15/second and ideal ±1 px midpoint hold error; sixteen give 20/second and ±0.75 px. These are calculated sampling limits, not actual-art passes. Do not compare them by merely increasing the existing eight-frame playback control.

The child's proposed 62.5% stance / 37.5% swing supplies alternating two/three supports and more swing time. It lies near the cited walking results but remains a blocking hypothesis. Keep LH/LF/RH/RF landings at 0/.25/.5/.75; toe-offs occur .625 later modulo one. Reference annotation and the exaggerated body's reach must settle the final schedule and stride before export. Equal-rate samples may fall between those event landmarks; preserve the event poses in the authoring worksheet.

## Acceptance and remaining work

- [x] Verify and integrate the subagent's primary-source findings and reproduce the guide's numerical audit.
- [x] Choose a provisional 15/20 cadence comparison with fixed motion duration and travel; distinguish it from game render FPS. Resolve Hollow Knight's specific clip rates through published extracted metadata.
- [ ] Correct motion blocking before detailed art; retain the user's exaggerated whole-body identity and straight runtime root path.
- [ ] Measure every required painted stance interval through the seam. Check the whole hold, not only its midpoint, and require error plus uncertainty to fit the budget. Missing evidence cannot pass.
- [ ] Establish human continuous-loop/seam review before any convincing-motion claim. Tools that expose only stills/frame traces do not satisfy that observation.
- [ ] Expand to other headings/actions only after the pilot passes; no new animation was generated or promoted by this investigation.

Deterministic QA can verify source hashes, packing, clipping, pivot/scale, timestamps, complete frame coverage, support schedules and drift computed from measured artwork. It cannot establish convincing weight, limb readability or the human experience of a gait. A failed contact test decisively rejects a candidate; a passed numerical test alone cannot certify production motion.
