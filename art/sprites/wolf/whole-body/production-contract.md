# Whole-body wolf replacement

## Current whole-body motion correction — 2026-10-07

Decision at `1a99439`, confidence 99%: the user's latest instruction requires manual comparison of every active drawing with its exact approved stick pose, and coordinated movement of the complete animal. The fixed-head/fixed-spine instructions below are historical and superseded for new drawings. The approved paw schedule and straight ground travel remain authoritative. Small shoulder, haunch, spine, neck, head and tail changes belong inside each complete bitmap. Fur landmarks follow those masses; random texture replacement is a defect.

Do not author or animate separate painted parts. Each step is one intact wolf with continuous neck/torso/limbs and retained exaggerated proportions. The runtime uses one fixed canvas/pivot/scale and straight root travel; it adds no wobble, bob, rotation or body deformation. New drawing controls may articulate the torso/head while retaining the approved paw endpoints and stance/swing identities. Body motion amplitudes are explicit pilot hypotheses, not biological measurements or user approval.

V10 supplies 96 candidate frames, not a motion-quality pass. Registered manual comparisons are in `walk-v10/audit/`; planned overlays are not measurements. Repair a complete pilot loop and inspect its actual paw positions, body/coat continuity and seam before replacing the active eight-direction study. Supply only the original identity and fresh controls to the drawing tool. Preserve the rejected V10 paintings as evidence. Do not use nose registration to erase deliberately drawn head motion.

## Current cadence decision

2026-10-05 user clarification at `68c47fb`, confidence 100%: **12 FPS means twelve distinct newly drawn whole-body poses across one second of action.** Create more frames; do not shorten the eight-frame cycle or accelerate travel. The incorrect timing-only change is withdrawn. The new pilot uses twelve drawings, 83.333 ms holds, a 1,000 ms cycle, 36 logical px/stride and the original 36 logical px/s ground speed (54 screen px/s at default size).

`walk-controls-v06.mjs` produces twelve unique stick guides and exact joint/paw targets in `walk-v06/`. The four-beat schedule has three drawings per beat and four swing drawings per paw. A 2/3 stance fraction aligns landings and toe-offs with twelve equal hold boundaries; it is a deliberately slow stylized-walk hypothesis, not a universal canine constant. Planned held-contact error is ±1.5 logical px. Fixed body/head/pivot and exact loop closure are verified in the plan. Actual paintings must be measured separately.

Generate one complete wolf pose per call from the canonical v02 wolf and that frame's fresh guide. Never supply rejected walking paintings. Preserve the original eight-drawing study at its original duration/travel while replacements are in production; it remains rejected. The v05 reports preserve the withdrawn speed-up's history. New acceptance requires twelve distinct useful poses, coherent limb identities/contacts and measured whole-cycle/seam evidence.

Current authoring checkpoint: two single-pose paintings are held back for layout/contact defects. The method changes to one continuous Grok-generated whole-body walk followed by frame extraction, retaining canonical-only identity inputs and the new guides. The actual native call fails under Grok's zero-data-retention setting because output storage is unconfigured. No video or twelve-frame replacement exists. Preserve privacy; await the user's storage choice/approval. Exact inputs, failure and remaining gates are in `walk-v06/README.md` and `video-record.json`.

## Straight-path registration correction

Decision at `28a31b7`, confidence 98%: the user's instruction requires straight root travel and no added positioning animation. The active viewer already uses constant vertical translation, pivot and scale during rightward walking. The drawings themselves shift between source cells: the inspected nose edge moves by up to seven logical pixels vertically.

The new export corrects that static registration. It translates each complete logical canvas by whole pixels to the standing pose's inspected nose anchor `(144,126)`, with no rescaling, rotation, limb assembly or pixel repainting. This is baked into `wolf-whole-e-v03.png`; the runtime does not read the recorded registration offsets. This explicitly replaces the pilot's former prohibition on individual registration correction below. Original sources, the v02 atlas and its metadata remain preserved. Exact pixel reconstruction and a fixed registered anchor are required; this correction does not certify the rejected gait or planted contacts.

Decision at commit `d33dc2ed0d9e1399819bed59b73d49c69109a400`, confidence 99%: S13 controls the wolf's exaggerated proportions as well as its drawing style. The user's explicit correction rejects natural wolf proportions. M15 supplies species features only. No rejected wolf image is a generation input.

## Proportion lock

The canonical appearance candidate is [base-wolf-v02.png](base-wolf-v02.png), drawn afresh from S13, G15, M15 and a new neutral skeletal guide. It has an oversized broad head, compressed round torso, very short thick legs, compact paws and tiny eyes. It is an intact animal. The realistic v01 base and the earlier component assembly are rejected.

The guide uses a 192-pixel square canvas and ground root `(96,156)`. Its head envelope is 48 pixels wide, shoulder-to-hip distance 32 pixels, body envelope 52 × 28 pixels and shoulder height 22 pixels. Head width is 1.5 times the torso axis length. These are project-specific drawing targets, not universal canine anatomy. The painting must retain this exaggeration in every direction and state.

Landmarks to measure on the actual finished frames: skull/muzzle envelope, shoulder, hip, exposed leg height, contact points and connected neck silhouette. Record uncertainty and occlusion. Ratio compliance in the guide is not a measurement of the artwork. A realistic silhouette fails even when contact coordinates pass.

## Controlled pilot

Cadence correction at commit `cf834d9`, confidence 96%: the user's report requires fewer purposeful pose changes and more canvas travel. The active replacement has eight new whole-body keys, 125 ms holds, a 1,000 ms cycle and 36 logical pixels per stride. At the default 96-pixel preview height, canonical height 64 gives 54 screen pixels/second. The prior study was 26.67 pose changes/second and 40 screen pixels/second. New drawings use four enlarged controls per request, with geometry as the first reference. No earlier walk output is a generation input.

The new planned hold error is 2.25 logical pixels, derived from the longer holds and stride. A proposed 3-pixel combined diagnostic budget leaves 0.75 pixel for drawing uncertainty. This is not a pass for the old failed drawings or an increase that hides their 9.53-pixel error. The new art must be measured independently. Segment lengths are 11/12 fore and 12/13 hind, folded under the same 22-pixel shoulder height; the oversized head and short silhouette remain fixed.

The first two source poses in each new half have their observed sweep reversed; the authored order is `2,1,3,4,6,5,7,8`. The whole source drawings are reordered, never assembled, stretched or recentered separately. Source placement and anatomical side errors still need inspection. The earlier 24-drawing study and measurements remain preserved below as failure evidence.

Start with a right-facing whole-body standing pose and one full four-beat walk. Camera target: orthographic, 45 degrees above horizontal. Forelegs use shoulder/elbow/carpus/paw joints; hindlegs use hip/stifle/hock/paw joints. Root, head and torso remain registered while each paw follows its annotated guide.

Shortened stride: 24 logical pixels per 900 ms. Twenty-four midpoint drawings at 37.5 ms each limit the planned contact hold error to 0.5 pixel. Maximum paw lift is 5 pixels. The resulting reference travel is 26.67 pixels/second. Actual painted contact measurements must establish the separate drawing-error budget.

Each generation receives the intact v02 identity, the actual skeleton guide, S13 and G15 with separate roles, plus the numerical rows. Output is complete painted animals, never isolated components. Preserve all raw outputs and prompts. One page-level scale/translation is allowed for registration; no per-frame silhouette scaling, limb assembly or correction disguised as packing.

## Stage record

- [x] Reject realistic base and component assembly; preserve them as failure evidence.
- [x] Compute shortened, exaggerated neutral and 24 walk controls.
- [x] Generate and inspect intact exaggerated v02 identity.
- [x] Measure a failed six-frame diagnostic from actual painted near-forepaw pixels; retain missing observations explicitly. Maximum observed contact error 9.53 logical pixels against a 2-pixel budget.
- [x] Draw two chronological twelve-pose whole-body source sheets and pack them deterministically for inspection. Proportions are retained; pose placement and planted-paw motion need revision.
- [x] Make the intact wolf study the motion lab's default wolf. Offer only the available E heading and idle/walk states; never substitute a missing state with another drawing.
- [ ] Verify real exported pilot in the local motion lab.
- [ ] Pass motion and visual checks before expanding to eight directions and other states.
- [ ] User reviews the identity and pilot; no final asset approval is inferred.
