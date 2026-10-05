# Authoring, measurement and repair

Read for stages 5–7. The key separation is pose construction versus painting. Pose control must survive the drawing process; a model's completion message is not motion evidence.

## Choose a method that can meet the contract

Use existing editable animation files, rigged painted parts or verified source frames when available. Use image generation for new raster drawing when requested, following the available image-generation skill/tool and user-selected provider. Inspect provider capabilities before committing to transparent output, multiple image inputs or a precise sheet layout. Record unsupported requirements.

Free-form image generation can propose a convincing character but cannot guarantee exact coordinates, grid placement, consistent gear or temporal texture. Supply numerical targets and visible control drawings, then measure the result. Where exact motion/texture repeatedly fails, use controlled 2D parts with stable painted surfaces, hand-corrected frames, or a tool with suitable pose constraints. Do not substitute a rendered miniature for requested drawn 2D art.

Preserve reference lineage. A preferred concept is an identity/style authority only to the extent the user selected it. Original identity/style images and newly computed control guides are distinct inputs. For a repair, reuse an explicit edit target only when the task permits editing that target; otherwise redraw the affected range from the authoritative images and controls. Rejected outputs must not become the next iteration's style reference.

## Pilot selection

Select the smallest unit that can falsify the method: a complete locomotion loop in a difficult facing, an idle with locked feet, or an action with an obscured grip/attachment. Include enough adjacent frames to test the repair's entry and exit. Do not generate every direction and action before a difficult pilot has been inspected in motion.

Predetermine the pilot's pass conditions. A walk pilot must test contacts and root travel; an idle pilot must test lower-body and texture stability; an attack pilot must test grip, straight weapon construction, arc, impact timing and recovery. Meet existing review gates before expanding beyond their approved scope.

## Self-contained drawing handoff

Give a drawing tool or authorized worker all of the following, in the actual request:

| Input | Required concrete contents |
|---|---|
| Identity image | Exact selected file and hash; anatomy/proportion, face/helmet, gear, hand assignment and distinctive marks. |
| Style image | Exact selected file; line/edge, paint/pixel density, palette and material rules. |
| Scene-scale reference | When relevant, the actual gameplay frame with target character size, shared lighting and environmental texture. |
| Pose control | Matching diagram/skeleton with stable IDs, direction, camera, logical canvas and fixed origin. |
| Numerical plan | The relevant rows embedded in the prompt: time/hold, contacts, feet/joints, attachments and depth order. A repository file path is not a table the image model can read. |
| Unit scope | One action/facing or bounded contiguous range, frame count/order and output layout. Explain loop or one-shot behavior and boundary poses. |
| Invariants | Which camera, geometry, texture, costume and source frames must remain unchanged; excluded artifacts and failed inputs. |
| Output contract | Real alpha, unclipped full gear, declared cell size, no guides/labels/background, expected destination and record fields. |
| Verification | Measured tolerances, visual failure examples and pass/fail evidence the parent must inspect. |

Do not rely on conversation history. Use a fresh complete prompt for each bounded unit. Identify image roles explicitly. If the worker cannot access the files, attach the actual pixels through its supported interface before claiming they were supplied.

## Prompt construction pattern

Write a concrete request in this order:

1. Name the asset, facing, action and rendering medium. State camera and which front/profile/rear surfaces are visible.
2. Assign each supplied image its role. State that geometric guides control motion while the selected character/style controls appearance.
3. State logical canvas, fixed root, constant neutral scale, chronological layout and actual frame count.
4. Describe the contact/gesture sequence, then embed the specific numeric rows. Distinguish planted, lifted and occluded landmarks. Give gear grips and shape invariants.
5. Specify restrained or strong secondary motion as measured limits. Freeze material marks on surfaces so dirt/mail/helmet texture does not flicker as independent random repainting.
6. State output transparency and exclusion of diagram marks, captions, scenery or unwanted shadows. Use the tool's actual transparency mechanism.

For example, a diagonal rear walk request must say which rear helmet/cloak surfaces appear, where the anatomical sword/shield hands are, which sole is planted in each frame, where the swing foot goes, and how the next contact closes the loop. "Six walking poses with the same feet" cannot convey this.

Do not promise unsupported size, model version, seed reproducibility or pixel accuracy. Capture actual returned dimensions and tool settings; mark undisclosed values unknown. Never invent a model identifier.

## Register and measure real drawings

1. Preserve raw source bytes and compute their hash. Decode the image and inspect alpha and every requested figure. An opaque checkerboard is not transparency; JPEG cannot contain alpha.
2. Reconcile actual dimensions with declared cell geometry using one known page-level transform. Prefer a controlled render's known coordinates. If model placement is irregular, measure each source region and its placement in the common logical canvas; reject unknown root registration rather than infer it from changing feet/silhouette centres.
3. Annotate actual anatomical landmarks from source pixels after registration: contact point, sole/heel/toe, ankle/knee/hip, grip and gear attachment where relevant. Record which are occluded and who/what measured them. Do not copy target coordinates and call them measurements.
4. Compare measured landmarks with target coordinates and compute world contact drift using actual root travel. Keep measurement uncertainty visible. Missing or occluded critical landmarks cannot automatically pass.
5. Inspect normal, slowed and reduced-scale playback on contrasting backgrounds. Distinguish temporal holding error, pivot error, wrong limb motion and texture repainting. A silhouette-bounds correction cannot repair a reversed gait.
6. Record a defect row: stable frame/range ID, observed failure, evidence path, measured value versus budget, probable cause and the smallest repair. Use descriptive observations, not vague "looks better" scores.

Do not independently recenter, stretch, flip or rotate every figure until its boots overlap the guide. That would conceal a failed pose. Deterministic extraction/repacking preserves placement; creative correction belongs to a declared authoring repair.

## Repair discipline

Fix one dominant failure at a time: wrong support trajectory, weak lift, wrong facing, gear discontinuity, unstable materials or bad gesture. Specify the change plus the invariants and target rows. Replacing six failed guard frames must not quietly replace the other forty-two source frames.

Maintain a source-selection map and verify unchanged frames by hash and metadata comparison. Measure repaired frames and their preceding/following boundary again. Do not treat a different pixel hash as evidence of distinct useful motion.

After two targeted attempts at the same defect, compare requests, actual input hashes and results. If prompts and inputs changed but the defect remains, diagnose a control limitation. Choose a controlled 2D method within task authorization or report the limit; do not continue an open-ended expensive loop. A further attempt needs a concrete new hypothesis/control, not new adjectives.

## Visual pass conditions

At intended gameplay size, check recognizable identity, silhouette and proportions; view/camera; anatomical sides and occlusion; believable contact and direction; stable grip/weapon/shield shape; compatible palette/lighting with the scene; consistent line/pixel density; stable material detail; and useful anticipation, action and recovery.

Test the hardest visibility cases. A correct far-side shield may be largely hidden in profile/rear art. Do not move it to the near hand merely to display its decoration. Preserve exaggeration deliberately; solving limb targets must not make a squat character anatomically realistic.

Use automated checks for geometry, timing, bounds and identity of bytes. Use visual judgment for drawn anatomy, pose meaning, texture and mood. Report these as separate evidence categories.
