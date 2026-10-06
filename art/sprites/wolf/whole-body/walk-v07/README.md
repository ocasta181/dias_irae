# Wolf drawings from the approved stick poses

Decision at `a0231492668b576e3e76b07974f445efd18e79cd`, confidence 95%: eight directional sheets, each with twelve intact painted wolf drawings, covering all 96 distinct approved stick poses. Idle uses the same held pose-01 alias as the current stick lab. Other actions have no approved sticks yet and are outside this batch.

The unavailable Grok video workflow remains stopped. The user explicitly requested base-plus-stick pose filling, so this is a separate still-image `image_edit` pilot, with no video retry or privacy change. Two prior built-in stills failed; this pilot changes provider and uses a larger, exactly matching identity/control crop to address layout drift. Test one frame before authorizing a full batch from measured evidence. A successful tool response is not a pose pass.

Inputs are original intact wolf v02, its fixed canonical registration and the exact approved v06 targets as projected by the live lab. Rejected sprites, components, failed trials and prior sessions are excluded. Every request carries the actual canonical crop and its own pose guide, complete numeric canine joints and full style/shape invariants. The fixed logical crop is (32,56,128,128), with six source pixels per unit. Reconstruct output with one whole-image transform back into the 192-square logical frame; never normalize each silhouette independently.

- [x] Prepare and verify all eight sets of twelve exact guides and independent raw requests. Three reproducible checks confirm all 96 match the live approved stick lines and phase order, source hashes and fixed crop bounds.
- [x] Run one fresh Grok still-image pilot without changing privacy; preserve actual inputs/output. Two calls ran with exactly verified inputs and unused sessions: identity-first, then guide-first. Both preserve appearance but ignore the walking paw placements and are held back. Near-paw errors reach 13.74 logical pixels against the three-pixel budget.
- [ ] Measure painted paws, registration, identity/style and anatomy against the approved pose. Hold back failed artwork.
- [ ] Complete remaining frames only after the pilot satisfies measured and visual checks; verify each cycle and seam.
- [ ] Export eight alpha sheets and metadata; install them in the painted wolf lab and verify actual playback.

`manifest.json` tracks each pose, reference hashes and its pending/generated/measured status. Guide sheets are controls, not the requested painted sprite sheets. No finished sheets exist yet.

Diagnosis: swapping the two references does not make the sparse stick drawing control the painted anatomy. Do not expand this reference-only method. The next bounded experiment will use one pose-shaped edit target containing the canonical upper body and provisional silhouette regions at the approved lower-body/foot positions, asking the image tool to paint those regions into a complete animal. This is an authoring scaffold; playback will still render complete sprites, without assembling painted parts.

That third Grok call changed the pose, but the rounded tail silhouette became a limb-like form and the output has invalid paw/joint anatomy. It is held back. The corrected scaffold distinguishes the tapered tail from the two visible near legs; far limbs are explicitly occluded. Test this corrected control with the built-in image generator as a separate provider before selecting a production method. No failed painting is supplied to that test.

Built-in results: E-01, E-02 v03 and E-07 pass the three-pixel static near-paw budget. E-01 errors are 0.50/0.77 logical pixels, E-02 v03 0.56/2.26, and E-07 0.84/2.41. Actual alpha corners are transparent, with no opaque green found in E-01. Hidden far contacts are not measured. These are three isolated pose checks, not a completed cycle or sheet. E-02 v01 missed its forepaw by 3.53 pixels; its first targeted retry made the legs too dark. Both remain held back.

Rear-view pilots rotate correctly but have not met the contact/layout budget. The filled-control experiment also exposed a control error: thick rounded ends could project beyond the intended paw underside. The latest clean N control clips those ends at the contact and passes actual pixel-boundary checks; its marked version is a new authoring input, never a prior failed painting. A further layout test is required. No failed N drawing is used as a canonical reference.

PNG handling: the built-in 1254-square RGBA originals decode correctly with Sharp. Use decoded RGBA for measurements/packing; one canvas decoder rejected them. The on-pale previews are QA-only flattened copies; original alpha bytes remain unchanged. A lossless re-encoding was pixel-compared to the original decode.

## Current checkpoint — 2026-10-06

At `8a49a5f`, confidence 95%: keep the requested eight sheets × twelve approved poses, with intact whole-body drawings and fixed source registration. Six isolated candidates meet the measured visible-paw budget: E01, E02, E03, E06, E07 and N01. None is a production frame until its complete cycle, silhouette stability, contacts and playback pass. The corrected N01 observation excludes the separate tail from its left-paw region; both actual hind paws miss by less than 1.3 logical pixels.

A fixed black border corrects the model's repeated zoom/framing changes, but it does not reliably constrain limb geometry. Its E04, E05 and E08 trials still fail the three-pixel budget; E04's hind paw misses by 8.13 pixels. Its E06 passes at 0.09/2.90. These are original-derived controls, never rejected image inputs. No further batch is authorized by this evidence. The current free-form still method has reached its precision limit; stop repeat purchases of the same failure. A pose-conditioned drawing method or a manually controlled whole-body authoring workflow is required before expansion.

Whole-frame reflection with a six-pose phase shift matches all projected joints for E↔W, SE↔SW and NE↔NW within floating-point error. This reduces work only after the source cycle passes. It is not a painted-part rig, a per-frame rescale, a repeated pose, or a finished reflected animation. The wolf has no asymmetric equipment. Painted reflection is unverified.

- [x] Preserve all raw provider outputs, exact requests and failed/static candidate measurements.
- [x] Prepare all 96 exact original-derived pose guides; three input-integrity tests pass.
- [x] Test sparse guides, silhouette controls, original fur texture controls and fixed-border registration. Record the remaining precision failure.
- [ ] Obtain a drawing method that respects every approved pose before spending on the other cycles.
- [ ] Complete and measure twelve painted poses in each facing; verify actual world contacts and loop seams.
- [ ] Export eight transparent sheets and all 96 source frames; check exact reconstruction.
- [ ] Load the verified sheets into the painted-wolf option in the existing local lab and review normal/slow/stepped playback.

`coverage.json` is the machine-readable checkpoint. Rebuild it with `node art/sprites/wolf/whole-body/report-production-v07.mjs`. Final frames: **0/96**. Complete sheets: **0/8**. The approved stick lab remains functional; the painted lab still contains the rejected earlier E study.
