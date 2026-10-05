# Wolf whole-body assessment

## Registration and playback correction

The active `wolf-whole-e-v03.png` uses the same complete painted animals with corrected static registration. The previously inspected nose edge varied from x 144–150 and y 119–126, including idle. Each complete logical canvas is translated by whole pixels to `(144,126)` during export. The viewer reads neither these offsets nor a bob/sway curve: all frames retain pivot `(96,156)`, canonical height 64 and a constant runtime scale.

[Registration checks](qa-registration-v04.json) reconstruct all nine drawings from the preserved v02 atlas and verify exact translated pixels, no clipping, constant head anchor and unchanged sources. The idle is unchanged. I inspected all eight registered poses in the local lab; [pose 1](registered-pose-1.jpg) and [pose 8](registered-pose-8.jpg) show the same stage placement. The frame-preserving player also shows every key during stalled updates; [playback evidence](../../guarin/viewer/playback-review.md) separates this preview policy from real-time simulation.

This corrects cell placement and playback, not the underlying rejected gait. The [new contact report](contact-report-v04.json) still fails: the submitted near-forepaw drift reaches 10.75 logical pixels against the same 3-pixel budget, and other required observations remain missing. The original observations and report remain unchanged. The same identified paw regions were translated with the complete drawings for the new measurement; no target coordinate replaced a measurement. Anatomy, camera and foot movement still need repair before production acceptance.

The proportions are corrected: v02 uses a conspicuously oversized broad head, short round torso and very short thick legs. The intact neck and haunches remove the earlier component assembly's disconnected appearance. S13 is now the dominant proportion reference; M15 supplies species features only. User visual approval remains pending.

## User rejects the cadence revision

The user reports that the active eight-key sequence still flails and its canvas speed does not match a walk. The current motion is rejected. The [exact pose review](pose-review/index.html) shows all eight original target poses, 26 anchors per pose and their actual playback drawings. It links the unchanged guide images, complete prompts and saved generation inputs.

The handoff did include the intact base, skeleton guide and numeric rows, but the output did not follow them. The original guide labels overlap and clip. Reordering drawings 1/2 and 5/6 broke correspondence with the requested phase/support schedule. Selecting runtime travel from the planned 36-pixel stride did not establish that speed from painted foot motion. Those are failures of verification and integration; lower cadence was not a gait repair. The readable review preserves these discrepancies instead of replacing the old evidence. Eyes, ears and coat markings did not receive separate numeric position controls.

## Current eight-key cadence revision

The active atlas has nine complete drawings: one unchanged standing pose and eight new walk keys. Two four-pose requests supplied an enlarged skeleton control first, the exact intact v02 base second and original S13/G15 as proportion/medium and palette references. Neither rejected animation nor the first new walk output was supplied to the second call. Original pixels, prompts and input hashes are preserved in `walk-records-v03.json`.

The lab now displays eight pose changes per second over a one-second loop. At the default 96-pixel standing height, movement is 54 screen pixels per second, increased from 40. The [browser preview](lab-cadence-review.jpg) shows the current eight-frame sequence at normal playback speed. The lower cadence addresses the frenetic leg changes; it does not prove that the gait is correct.

The near right forepaw was identified visually in the first four playback poses. `qa-current.mjs` measures its lower painted alpha edge in the recorded region of the actual packed logical canvas. Contact uncertainty is approximately ±1 logical pixel. The [current contact report](contact-report-v03.json) fails: the largest observed drift is 12.77 logical pixels against the proposed 3-pixel budget. Other required paw observations remain explicitly missing. This is a partial measured-art rejection, not a complete gait assessment. The changed cadence and stride prevent treating its result as a direct improvement comparison with the former study.

[Current package checks](qa-current.json) verify unchanged page/source hashes, reconstruct all nine packed logical canvases bit-for-bit, require one major connected alpha silhouette per drawing, and check the eight-key timing and default travel calibration. Connectivity cannot certify anatomy. Camera, limb identity, planted contacts and the loop still need repair. The lab labels this as a study and does not offer the missing seven headings or ungenerated attacks.

The original v02 exporter used one fixed scale and translation per original sheet, so placement failures remained visible. Its atlas and metadata are preserved in `atlas-v02.json`, `registration-v02.json` and `wolf-whole-e-v02.png`. The current registration correction above changes only complete-canvas translation; it does not assemble limbs, rescale individual figures or substitute planned contact targets for measurements. A stationary whole-body idle uses one unchanged drawing.

The numerical skeleton has fixed segment lengths, reachable short legs, three supports, stable head/body and contact-consistent root travel. These checks validate the plan only. Whole-body appearance and usable motion are separate gates; the full eight-direction inventory is still pending.

Repeat the current exporter `export.mjs`, then `qa-current.mjs`, with the existing canvas dependency. The latter now writes `qa-registration-v04.json` and `contact-observations-v04.json`. Run the skill's `check_contacts.py` on those observations, choosing a new output filename. Its expected exit code is 1 because this art fails the contact checks. Do not describe that rejection as passing art quality assurance.

## Archived 24-pose failure

The former two walk sheets preserve the general silhouette and have twelve complete animals each. They used the intact v02 base, original S13/G15 and fresh controls. Their lineage remains in `walk-records.json`; the original 25-frame package remains in `atlas-v01.json`, `registration-v01.json` and `wolf-whole-e-v01.png`. The user rejected its frenetic motion.

That walk also failed the numerical pose contract. The tool enlarged/repositioned drawings relative to the guide, shifted the torso between source rows and did not maintain the required planted-paw trajectory. Its camera retained some diagonal profile rather than the strict E control. These were authoring failures, not packing defects.

The near right forepaw was identified visually in the first six source cells. `qa.mjs` measures its lower painted alpha edge inside the recorded region, applies the fixed source registration and tests the actual root stride. Region identification is human judgment; the pixel measurement and calculation are deterministic. Contact-point uncertainty is approximately ±0.5 logical pixel. Other required paw observations remain explicitly missing; no target is substituted.

[The contact report](contact-report-v01.json) fails: frame 3 drifts 4.16 pixels, frame 4 drifts 4.5 pixels and frame 6 drifts 9.53 pixels against the 2-pixel budget. Frame 5's 2.02-pixel result is within measurement uncertainty of the boundary; it is not the basis for rejection. The larger failures exceed uncertainty. The check covers six frames and one measured paw only, not the complete cycle.

[Package checks](qa-report.json) reconstruct all 25 logical canvases bit-for-bit from the packed atlas and verify unchanged source hashes and one major connected alpha silhouette. They also find original source-cell edge contact in walk frame 4, so clipping remains an art defect. Connectivity cannot certify good anatomy. The raw sheets' body placement jumps and the half-cycle join still require repair.

`qa.mjs` reads the archived v01 atlas and registration; it can repeat the historical package and measurement checks without replacing the active atlas. The old contact checker likewise exits 1 on `contact-observations-v01.json`. The active exporter builds the new eight-key revision, not this archive.
