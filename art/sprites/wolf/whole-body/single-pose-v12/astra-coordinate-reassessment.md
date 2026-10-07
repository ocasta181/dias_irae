# Wolf pose correspondence: corrected investigation

2026-10-07. Astra, maximum reasoning. Read-only investigation plus this report; no painting, generation, installation, upload, asset modification, commit or push. Repository checkpoint: `04b767792c5af2706111f3b658ac7c6d65243386` on `main`. Parent owns implementation and the untracked C output files. Confidence in the decision to stop the existing generation routes and require a different spatial contract: high, approximately 95%; this is not a probability that a proposed replacement will succeed.

## 1. Correction and decision

My earlier assessment was incorrect in its emphasis. The central defect is that the painted legs do not occupy the approved positions. Exposing hips, explaining attachment, or identifying a leg as hind rather than fore does not establish correspondence to the stick figure. I treated categorical anatomy as a stronger result than it was and gave an attachment hypothesis too much explanatory weight. The user's correction is justified.

The reassessment starts from the actual paintings and controls, then checks their coordinate handling. It finds a confirmed additional error in V10 registration, substantial errors already present in raw painting, and an invalid success proxy in C. It does not establish the model's internal reason for ignoring a pose.

The immediate decision is **no further A, B or C image calls, and no repair of C by clipping, shifting material, filling its empty leg regions or changing its mask**. The next useful action is to establish an actual spatial painting capability before another one-sprite proof. A reference image and prose coordinates are not such a capability by themselves. Direct whole-cel painting is the most controllable alternative; a native lineart-conditioned generator is the most justified bounded automation experiment. Both must retain the agreed wolf style.

The newest C material has the style direction the user accepts: the broad head, compact body, weary eyes and flat, gritty gray-brown paint. Its pose remains rejected. That style acceptance does not authorize using C, B, A or any other failed generated walking image as a new reference. The original wolf, S13 and G15 remain the generation references.

## 2. What was compared

I reopened the V10 E05/E06/E07 painted/stick/overlay pairs, the actual E04–06 filled and stick input pages, V11's second whole-cycle control and E06 result, V12 A and B, the original wolf crop and S13, and C's raw material and final composite before revisiting explanations. This is a representative investigation, not a new claim to have independently measured all 96 frames. The user's rejection of the entire set remains in force.

Paths below are relative to `art/sprites/wolf/whole-body/` unless stated otherwise.

### Coordinate authority and transforms

The full logical canvas is 192 × 192 with root `(96,156)`. The artwork crop is the 128 × 128 region beginning at `(32,56)`. For a square raw crop of side `N`, its fixed mapping is:

`logical(x,y) = (32,56) + raw(x,y) × 128/N`.

This maps the whole image, not individual legs. Pixel-edge/center conventions and resampling uncertainty must be recorded separately. A whole-image translation still changes every foot relative to the ground root.

I compared V06's approved E pose data with the full E limb points in the V07 manifest: all 12 poses × four limbs × four joints have maximum coordinate difference **0**, and stance flags agree. V12 E06 uses those same paw targets. There is no evidence here that a changed foot plan accounts for the failures.

| E06 landmark | Approved full logical coordinate | State |
| --- | --- | --- |
| LH, far hind sole | `(75.500000,150.343146)` | stance |
| LF, far fore sole | `(116.500000,150.343146)` | stance |
| RH, near hind sole | `(91.953125,161.139087)` | swing |
| RF, near fore sole | `(100.046875,161.139087)` | swing |
| Nose tip/edge | `(144,126)` | registration landmark |

The near soles are only 8.09375 logical pixels apart. Their target clearance above the near ground line `y=161.656854` is 0.517767 logical pixels. These are demanding, measurable requirements; they must not be replaced by “two paws somewhere under the belly.”

The approved public stick uses a simplified centerline and omits hock/carpus. Its hip/shoulder height is `140.443651`; the full E side-specific near joints are at `146.100505` and far joints at `134.786797`. That is a coordinate-definition distinction for comparing upper joints, not an explanation for misplaced feet. Both representations have the same paw endpoints. Do not move the approved endpoints or silently compare a private side attachment with a public centerline point.

The full near paths, in order, are:

- RH: hip `(80,146.100505)` → stifle `(91.489808,148.548393)` → hock `(87.292138,157.248380)` → sole `(91.953125,161.139087)`.
- RF: shoulder `(112,146.100505)` → elbow `(102.206231,149.641839)` → carpus `(98.480693,157.707829)` → sole `(100.046875,161.139087)`.

These are planned bone/sole locations. A dark crease, a fur edge, a leg's center of mass and a skeletal joint are different measurements. My previous categorical topology reviews did not establish that the painted centerlines and bends match these coordinates.

### V10: painting error plus a confirmed registration error

`register-walk-page-v10.mjs` detects the average nose location across each three-frame E page, rounds a translation toward `(144,126)`, and applies it to every frame on that page. The approved foot targets and fixed root are not translated.

| Actual E source page | Recorded page translation | Final crop origin |
| --- | --- | --- |
| E01–03 | `(-4,+5)` | `(28,61)` |
| E04–06 | `(-2,+8)` | `(30,64)` |
| E07–09 | `(-6,+1)` | `(26,57)` |
| E10–12 | `(-3,+7)` | `(29,63)` |

The actual source pages are 2172 × 724, so each square cell is uniformly reduced by `128/724`. I reconstructed E06 from the third cell of `walk-v10/raw/E-04-06.png`, with the script's green key, marker removal, border clearing, Lanczos resize and `(30,64)` placement. Decoded RGBA byte differences against `walk-v10/frames/E-06.png`: **0**. This is active behavior in the delivered asset, not an unused script.

Approximate sole samples selected from visible paws in the exported E06 image are:

| Visible painted feature, selected without target matching | Exported logical point | Same point with the recorded page shift removed |
| --- | --- | --- |
| Rear visible sole | `(64.5,159.5)` | `(66.5,151.5)` |
| Central visible sole | `(95.5,165.5)` | `(97.5,157.5)` |
| Front visible sole | approximately `(117.0–117.5,164.5)` | approximately `(119.0–119.5,156.5)` |

These diagnostic samples use alpha 128/192 lower-edge midpoints in independently selected paw regions, with approximately one logical pixel of conservative interpretation uncertainty. They are not a precise four-limb certification: only three paws are clearly exposed, and I do not invent a fourth or assign roles by nearest target.

An assignment-free failure is sufficient: **the rear visible sole is 11 pixels left of the leftmost target; it is still 9 pixels left before the export translation**. Thus removing nose registration cannot make the raw painting correct. Conversely, adding eight pixels downward unquestionably changes all E06 contacts and can make an already inaccurate pose worse.

Across E06→E07, the same visible rear-paw feature moves approximately `(-2,-5)` in the export. Removing the two recorded page translations gives approximately `(+2,+2)` instead. This is a concrete example of page registration altering apparent movement. It is not a complete trajectory measurement or proof that those two visible features satisfy the target LH path.

The transition in page shift alone is `(-4,-7)`. Similar batch-dependent shifts must not appear in a future fixed-root proof. Fixing this exporter policy is warranted for future work, but cannot rehabilitate the rejected 96 paintings.

### V12 A and B: fixed mapping, actual measured paws

Both square raw images are 1254 × 1254 and use exactly `128/1254 + (32,56)`, with no fitting. The following are actual observations in `measurements-v01.json` and `measurements-v02.json`, not copied targets. Sole uncertainty includes alpha-threshold and connected lower-band sensitivity, half-pixel sampling and annotation allowance.

| Paw | A measured `(x,y)` | A error / uncertainty | B measured `(x,y)` | B error / uncertainty |
| --- | --- | --- | --- | --- |
| LH | `(80.281,150.979)` | `4.823 / 0.476` | `(75.585,150.163)` | `0.200 / 0.408` |
| LF | `(118.609,151.285)` | `2.310 / 0.255` | `(116.517,150.163)` | `0.181 / 0.267` |
| RH | `(96.051,160.574)` | `4.137 / 0.817` | `(91.509,160.778)` | `0.572 / 0.459` |
| RF | `(104.829,160.370)` | `4.844 / 0.459` | `(100.542,160.778)` | `0.613 / 0.306` |

A's correct categorical leg arrangement did not solve placement. All four feet fail the established checks. Rounded soles and uncertainty do not close these gaps.

B's four paws pass the recorded position, stance-hold and swing-clearance checks. This matters: the plan is not shown to be impossible, and a universal units/scale mistake is contradicted by B. However, B's measured nose is `(142.596,125.206)`, error `1.613` plus uncertainty `0.487`, outside the 1.5-pixel static budget. Its long black construction arcs are unfinished. B is not an accepted whole sprite, and its foot pass does not retroactively measure every leg bend.

### C: authored alpha is exact; painted geometry is wrong

C used the frozen clean whole-cel master and the original wolf/S13/G15. It used no failed A/B painting as input. The raw material is an opaque 1254-square RGB painting of a standing wolf. The final operation uniformly resizes that material to 1024 square, places frozen finishing ink above it, and supplies the pre-authored alpha.

I independently checked the decoded result:

- Final alpha versus frozen master alpha: **0 differing bytes**.
- Final RGB versus the declared finishing-ink-or-resized-material operation: **0 differing bytes**.
- Raw material SHA-256: `1c0eeccbe3f3008e8fc0ea8a55e828d5e0f1d97d4247116ff22401ee1e3c1b03`.
- Frozen alpha SHA-256: `2b84b3d392e6353c4e017d2a65e89fa3a85032dce9cf59420a5f012202b65a49`.

The compositor did the declared operation. The wrong placement is already present in the raw RGB. The final's target-shaped lower legs contain portions of the painting's background, while pieces of the original standing legs are clipped into the wrong places. This directly invalidates alpha-only contact evidence for C.

Two measurements make that visible failure reproducible:

1. The lowest actual painted paw has a lower dark outline around raw `y=997.5`, or logical `y≈157.818`. Even allowing a conservative ±5 raw pixels (±0.510 logical), it is well above both required near soles at `161.139`. The near-paw alpha extensions are not corresponding painted paws. A rear exposed painted sole is around raw `(468,953.5)`, logical `(79.77,153.33)`; the lowest front exposed sole is around raw `(691,997.5)`, logical `(102.53,157.82)`. These are diagnostic RGB-outline estimates, with roughly 0.5–1 logical pixel uncertainty, not a four-leg acceptance table.
2. At points 1.5 logical pixels above the two required near soles, independently inspected 7 × 7 raw patches are nearly flat background: RH centered around raw `(587,1015)` has mean RGB approximately `(62.12,54.24,47.88)`; RF around `(667,1015)` has approximately `(61.47,53.63,47.57)`. In the final, interior pixels at `(480,829)` and `(544,829)` have opaque alpha and RGB `(62,54,48)` and `(62,53,47)` respectively, with no finishing ink there. The raw and final images visibly confirm that these are background-filled leg regions. Color constancy alone is not a general fur classifier.

The proposed C mask mechanism constrained where pixels were visible. It did not constrain where the material generator painted paws, limb shafts, fur direction or shading. My earlier confidence in it as a next painting method was too high. A valid master proves that an artist could paint this silhouette; it does not cause a reference-driven generator to do so.

## 3. Ranked causes, confidence and falsification

| Finding | Evidence and scope | Confidence / what would change the conclusion |
| --- | --- | --- |
| **The generation stage has no demonstrated binding between target coordinates and painted RGB geometry.** | Wrong positions occur in raw V10 and C, and fixed-registration A still misses. The currently exposed image tool takes prompt, references and transparency; it exposes no spatial-condition tensor, native initialization strength, explicit edit mask or coordinate constraint. The workflow treated soft reference following as exact pose transfer. | High confidence in the observed contract gap and failure location. Unknown internal model mechanism. An actual spatial-control API/graph or raw output passing full geometry would change the available capability assessment; B already disproves any claim that this tool can never place paws accurately. |
| **V10 adds uncontrolled ground-relative motion through page nose fitting.** | Actual page records, code and byte-exact E06 reconstruction establish translations up to eight logical pixels. Different pages use different translations while feet/root targets remain fixed. | Confirmed for these exports. Falsified only by different authoritative delivered assets/transforms; not a theory about the generator. Fixed-registration A/B/C show it is not the universal cause. |
| **Quality assurance promoted insufficient proxies.** | Planned coordinates, categorical leg identity, plausible guides and exact alpha were allowed to carry more weight than actual painted positions. C is a direct counterexample: perfect alpha, absent painted near paws. | Confirmed process defect. A complete audit measuring RGB-supported legs, all required landmarks and then trajectories before expansion would remove this failure mode. It does not explain model internals. |
| **Some handoffs carry competing or incomplete visual instructions.** | V10 literally copies standing upper artwork and commands it to remain identical; simplified sticks omit distal joints, while full coordinates live in text. C provides a gray contour plus standing identity and asks for opaque material. The resulting C RGB closely resembles standing arrangement. | Confirmed input facts; only medium confidence that reference competition contributed to a particular output. No isolated ablation proves causality. V11 and B also differ in several factors. Do not assert that one reference, one hidden joint or one color caused the failure. |
| **Multi-frame pages create extra correspondence and consistency demands.** | V10 uses three poses per call, V11 twelve; observed batches and loops fail. | Plausible secondary risk, not sufficient cause: single-frame A/C also fail, and one accurate single pose would not prove sequence consistency. |

I found no evidence for a universal projection or units error, a changed approved foot schedule, a C compositing index error, or an inherently unpaintable E06 pose. The public/private upper-joint distinction is real but does not explain any foot mismatch. The earlier V11 muzzle-control defect is specific to that older control, not an explanation for C. The rendering engine's correct frame timing and intact-bitmap playback cannot correct wrong pixels.

The user's “randomly distributed” description is an appropriate description of failed pose correspondence across the animation. This investigation does not reinterpret it as a claim about a statistical random process.

## 4. Strategies that actually address spatial painting

These are alternatives, not authorization to execute all of them. No method may change the approved pose to fit a painting, adopt generic realistic wolf proportions, create a painted-part kit, introduce 3D final art, or animate the bitmap with runtime body transforms.

### Option 1: Direct painting of one complete cel

**Strongest positional control; skilled painting effort is the cost.** A competent artist paints the entire E06 wolf in a raster editor at a fixed canvas, with the approved skeleton/contour as a removable overlay. Brush strokes alter the actual RGB at chosen positions. The complete body, legs, head, tail and coat are developed together. Whole-image layers for linework, base paint and finish are compatible with one intact final bitmap; detached limb assets and assembled painted pieces are not.

Input: original wolf/S13/G15 and the approved E06 geometry. Output: one complete painted RGBA cel plus editable source. The gray control is guidance, not a code-painted final substitute. Progress is checked against the exact target coordinates throughout, including painted shafts and soles. The original's fur vocabulary, head/body ratio and eye expression remain the visual target.

This gives an artist control of spatial placement; it does not guarantee the agent can paint the required style. The current task's creative-authoring/tool rules do not authorize quietly substituting scripted artwork or an unapproved manual workflow. If direct painting is selected, establish a real authorized painting capability or an artist handoff. Do not call a flat, procedurally colored contour a finished sprite.

### Option 2: Native lineart/edge conditioning with separate original appearance input

**Best justified automated next experiment; medium setup cost, unproved fidelity.** Use a pipeline that actually consumes the E06 contour/visible leg linework as spatial conditioning during generation, with the original wolf as a separate appearance input. General lineart or edge conditioning is appropriate; a human-pose detector is not a canine pose model. The official ControlNet 1.1 lineart model explicitly supports manually drawn lineart and even demonstrates a wolf. Its human OpenPose model is a different control. [ControlNet 1.1 documentation](https://github.com/lllyasviel/ControlNet-v1-1-nightly)

The important distinction is a typed spatial control input connected to the denoising pipeline, not adding “ControlNet” to a prompt. ComfyUI documents the conditioning image, compatible model, strength and start/end application fractions. These controls increase influence; they are not hard coordinate guarantees. [ComfyUI ControlNet documentation](https://docs.comfy.org/tutorials/controlnet/controlnet)

Original identity/style can be supplied separately through a compatible image adapter. IP-Adapter documents combining its image prompt with ControlNet for structure. Its default image processor center-crops non-square references, so preserve and inspect the actual processed reference, rather than assuming the supplied file is what the model sees. [IP-Adapter documentation](https://github.com/tencent-ailab/IP-Adapter)

Prerequisites before a wolf call: a compatible installed backend/model family, actual input graph/API, inspected control tensor and original-reference preprocessing, known output size and one frozen configuration. No installation, credentials or upload was performed for this report. The Mac's available hardware alone is not proof that a specific configuration works.

The spatial control should depict the whole visible wolf outline and the real boundaries of its bent legs. Exclude coordinate labels, ground rails, skeleton colors, hidden-joint dashes and long explanatory haunch/chest arcs from the generation condition. Those stay in the audit overlay. Otherwise the control can faithfully preserve marks that do not belong in finished art. The plain public stick stays unchanged.

Failure limit: reject a result that preserves contours but changes character style, paints the wrong shaft/sole positions, or merely imitates black construction lines. A compatible model and explicit spatial channel justify one experiment, not a claim of likely exact compliance or a large seed search.

### Option 3: Native image-to-image finishing from a genuinely painted, correctly posed whole cel

**Useful only after a correct RGB rough exists; not a shortcut from an empty gray mask.** Start with a fresh, fully painted rough of the complete E06 pose, authored from the original references. It must already have correctly placed painted legs and color coverage, not just correct alpha. Pass that bitmap as the pipeline's actual initialization image with controlled low denoising, optionally also with spatial lineart conditioning.

This differs from B's reference-based editing and C's independent material request: the starting image is an explicit pipeline state. Diffusers documents that lower image-to-image strength retains more of the initial image; high strength adds more noise, and strength 1 largely removes that constraint. It still offers no exact landmark guarantee. [Diffusers image-to-image documentation](https://huggingface.co/docs/diffusers/using-diffusers/img2img)

If native masks are used, define a whole-cel finishing region in advance and retain already valid paint outside it. Inpainting can alter unmasked pixels; exact retention requires an explicit preservation operation. Such retention is useful only when the retained RGB was already valid. It cannot create missing painted paws or validate C's empty regions. [Diffusers inpainting documentation](https://huggingface.co/docs/diffusers/using-diffusers/inpaint)

Prerequisite and main cost: someone must first produce the correctly posed, color-complete rough. No failed A/B/C output may become that rough or a style reference. No sequence of isolated leg crops or per-limb composition is proposed. If this prerequisite is absent, do not rename another gray-contour material request “native finishing.”

For the current automated workflow, pursue Option 2's capability check first. Option 1 is the fallback with direct positional control; Option 3 is appropriate only once its missing painted input exists. Custom training would add substantial data and setup requirements without a correct paired dataset here, so it is not the next one-sprite step.

## 5. One-sprite proof, specified before painting

### Capability and input gate

1. Keep E06 as the only proof pose. It exposes a forward near-hind reach, a different near-fore path, two far stance soles and small swing clearance. No adjacent pair or sheet yet.
2. For an automated attempt, inspect a real pipeline exposing a spatial condition and original appearance input. Record model/checkpoint identifiers, compatible control type, settings, reference hashes, seed if available and the actual processed control image. If only the existing prompt/reference interface is available, this gate fails: do not make another renamed A/B/C request.
3. Freeze one whole-canvas mapping before generation. Prefer the existing 1024-square control for a compatible backend: logical crop coordinates are `(32,56) + raw/8`. If a backend requires another native size, choose it before the call and use `128/N`; inspect the resampled control's landmarks and include its sampling error. Never silently crop, aspect-fit, detect a nose, normalize silhouette height or translate after seeing the output.
4. Make a spatial condition from the approved whole-body E06 contour and genuine visible leg boundaries. Preserve the listed sole, bend and nose targets. Do not turn the standing original into the pose condition. Keep role labels/full skeleton in a separate inspection overlay. Preflight the actual processed condition, not merely the source PNG.
5. Use only the original identity crop and original S13/G15 in appearance roles. The latest C image can be viewed as evidence of the accepted style direction during review; it cannot enter the generation input list. Record that distinction explicitly. No realistic-wolf checkpoint/prompt aesthetic may replace the original style.
6. Choose one bounded configuration only after confirming compatibility. Record the actual spatial strength and application range; use the backend's documented baseline rather than invented universal settings. Those values are experimental controls, not proof of fidelity. Do not spend on a parameter sweep, alternate seed gallery or another material-only pass.

### Measurement and visual gates

All gates apply to the unretouched output and the final fixed registration. Alpha and RGB are inspected separately. Passing one row does not compensate for another failure.

**Identify the painted geometry without an overlay first.** An independent reviewer marks each actual painted paw region and the visible extent of each leg once, including uncertainty. Roles are bookkeeping to prevent a nearby wrong paw being scored; visible hips are not a requirement or success criterion. Missing, ambiguous or background-filled painted limbs fail instead of being assigned to whichever target is closest.

**Measure actual soles and nose.** Use the existing connected-component sole protocol: a paw region selected from the art, an interior seed, alpha 192 as the reference lower edge, alpha 128 plus connected lower bands of 4/8/16 raw pixels for sensitivity, and explicit sampling/annotation allowance. For another source resolution, preserve those bands' logical widths rather than changing the uncertainty test. The lower-row midpoint is the declared sole convention; inspect a broad rounded sole rather than allowing an isolated toe pixel or another paw's component to select the answer. If final alpha is authored separately, the measurement must first establish that real painted sole boundaries coincide with it; alpha alone cannot supply a passing point. Inspect the visible nose edge independently in an art-selected region.

**Retain the established budgets.** Let `e` be observed point error and `u` its conservative uncertainty in logical pixels. For swing soles and the nose, require `e + u ≤ 1.5`. For stance soles, evaluate the actual held frame over its beginning/end root travel and require the maximum world-contact error plus uncertainty `≤3`; the 36 pixels/second speed and 1/12-second hold reserve up to 1.5 pixels from midpoint travel. Require swing sole `observed_y + vertical_uncertainty < 161.656854` for E06. Do not round a borderline failure into a pass. Use all four targets in the table above.

**Measure leg placement beyond endpoints.** Before painting, freeze expected visible shaft sections and bend neighborhoods in the approved control. After painting, annotate the painted contours and centerline independently; only then compare. For visible near-leg shaft sections, compare center positions at 25%, 50% and 75% of each exposed planned segment, and record visible hock/carpus bend estimates. A proposed conservative pilot gate is centerline/bend deviation plus annotation uncertainty `≤1.5` logical pixels at every measurable sample, using the same static spatial allowance rather than a new looser tolerance. The target centerline must lie inside the assigned painted limb, and the measured direction of each segment must agree. A thick blob covering several target points is not sufficient: both opposing boundaries and the sequence of bends must describe that leg. Record exact sample definitions before generation so they cannot be selected to flatter the result.

Bone centers beneath the torso or fur are not directly observable. Mark them unmeasurable and inspect the exposed continuation; do not demand visible hip circles, invent precise joint centers from fur, or score construction arcs as anatomy. If the important distal segment cannot be independently identified or bounded within the allowance, the whole-pose proof remains unverified. This gate is stricter than the old categorical topology pass and must not be retroactively claimed for A/B.

**Verify RGB coverage and coherent paint.** Inspect the raw color image beneath any transparency on light and dark backgrounds. Every required sole, paw body and exposed shaft must contain coherent wolf paint in its intended position. Explicitly inspect E06's near-paw interior points 1.5 logical pixels above the soles and the hock/carpus corridors. Reject clipped standing limbs, background-colored extensions, flat unpainted master filler, extra painted legs, missing fur coverage or pasted-looking seams. A flat dark shadow can be legitimate; a threshold or texture-variance statistic alone cannot establish that it is a painted leg. Visual semantics and measured boundaries must agree.

**Verify the agreed character at game size.** Compare side by side with the original wolf and S13/G15: huge broad head, tiny squat torso, very short thick legs, tiny weary eyes, gritty flat gray-brown paint. Reject generic realistic anatomy, long thin legs, a small head, glossy 3D shading and persistent construction arcs. A numerical pass cannot approve a style change. The complete bitmap must read as one painted animal without a forced cutout boundary.

**Do not infer animation from this still.** A passing E06 establishes one sprite only. Only then produce E05/E07 under the same fixed mapping and measure the corresponding RGB-supported limbs across frames. Verify trajectory direction and support timing before the complete twelve distinct poses, then all eight directions. All body/neck/head/tail/fur motion remains inside the drawings; runtime movement stays straight ground-root translation.

## 6. Next action and stop rules

The parent should first inspect whether an available backend can supply Option 2's actual spatial conditioning and original-appearance channels, with a reproducible fixed-canvas graph. Produce a concrete capability/setup decision before any wolf call. Respect the existing tool/service/privacy boundaries and obtain only any approval actually required for a selected setup; this report does not authorize an external upload or install. If that capability is unavailable, report the specific gap and use an authorized direct whole-cel painting workflow or artist handoff. Do not replace the missing capability with more attachment prose.

Under a demonstrably different spatial pipeline, authorize at most one new E06 proof initially. Freeze inputs, transforms and measurement definitions first. If the output fails geometry, RGB coverage or style, stop that proof and report its measured failure. Do not conceal it with alpha replacement, per-leg shifts, warps, generated-part assembly, selected seed shopping or a tolerance change. A clearly identified implementation bug can justify correcting the setup before a future separately bounded proof; an unexplained failure cannot justify another wording cycle.

No full sprite is accepted by this report. A, B, C and the 96-frame set remain rejected or unaccepted as already recorded. No new generator was tested. The strongest new confirmed software finding is V10's page translation; the strongest production finding is that **the real painted geometry must be constrained and measured, independently of targets, labels and alpha**.
