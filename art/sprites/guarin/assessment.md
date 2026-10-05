# Guarin animation assessment

Second art checkpoint, 2026-10-05. Current data contains six direction pages, 288 source frames, and twelve playback tags per direction. Southwest and northwest are being replaced after parent visual inspection. This is not the completed character sheet or a production approval.

Selection: the user-saved #1 gameplay preference was G15, from S13, captured at `2026-10-04T23:47:21.832831+00:00`. Exact references, saved ordering, and hashes are in [selection.json](selection.json). Every generation uses G15 and the original S13; failed sprite pages are not supplied as references.

Observed strengths: worn gritty iron, wine cloth, mail and short wrapped limbs retain the selected identity; several distinct gait, cut, recoil, collapse, interaction and bowed poses exist. All six active pages have actual RGBA transparency and 48 nonempty, different-pixel figures each.

Known defects being corrected:

- The generator did not place figures on a consistent exact grid. The importer now locates all 48 connected figures, retains measured rectangles and row/column anchors, and clips neighboring silhouettes in the viewer. All six active pages have no source-page border contacts. No generated pixel files were changed. Manual foot-pivot refinement remains a review task.
- East v01 repeats a forward diagonal stance and is rejected. East v02 improves the side profile, but its cut reads partly as a thrust and requires motion review. Southwest v01 repeats southeast, and northwest v01 shows a front visor on the rear; both are rejected and replacements are being generated from exact upstream references only.
- Rear diagonal rotation, guard coverage, kneeling depth, gait amplitude and loop transitions still require motion inspection. Distinct pixel hashes do not prove correct movement.
- Camera angle is an artistic estimate, not a calibrated measured projection.

The viewer's twelve timing/transition tests pass. The browser loads actual sheet pixels, plays Walk, selects clips, pauses, scrubs, and shows an isolated sword-contact pose without grid clipping. Other directions, final motion checks and user approval remain open.
