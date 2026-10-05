# Guarin animation assessment

Checkpoint: 2026-10-05. The defined P01–P08 character study has 384 source poses, eight independently drawn directions and twelve playback tags per direction. This completes the first study's source coverage. Final game export, campaign expansion P09–P23 and visual approval remain open.

The user-saved #1 preference was **G15 / S13**, captured after the inventory check at `2026-10-04T23:47:21.832831+00:00`. [selection.json](selection.json) retains that exact ranking, review status, paths and hashes. Rank is preference, not acceptance. Every generation and repair receives the actual G15 gameplay image and original S13 character; no failed sprite attempt is used as an image reference.

The selected worn iron, wine cloth, mail, huge closed helmet, tiny torso and short wrapped limbs remain recognizable. The pictures contain actual separate drawn gait, cut, recoil, collapse, reaching and bowed poses. Original PNG bytes are preserved; the viewer selects measured regions. It does not rotate, recolor or translate a still image to pretend it is a newly drawn action.

## Repairs and exclusions

| Finding | Action | Current result |
|---|---|---|
| Figure positions drift from the requested uniform grid. | Locate isolated figures; retain source rectangles, row/column anchors and neighbor masks. | 384 active source regions are nonempty, distinct by pixel hash and free of source-page border contacts. Source rasters are unchanged. |
| E v01 repeats a diagonal front view. | Generate E v02 from upstream references. | Improved right-facing profile imported. |
| NW v01 puts a front visor on a rear-facing body. | Generate NW v02 with a plain rear helmet. | Rear-left view imported; no false front visor. |
| SW v01 repeats southeast. | Generate SW v02 from upstream references. | Front-left rotation imported. |
| E v02 cut reads as a thrust. | Generate E v03 and select only its six cut poses. | Clear overhead anticipation and downward angular sweep. Keep the earlier 42 poses; exclude the new hurt row's weapon regression. |
| SW v02 hurt loses the sword. | Request SW v03 with explicit visible sword retention. | All six new recoil poses retain their sword. Select only hurt; keep the other 42 SW v02 poses. Browser pose inspection confirms the retained blade. |
| Thumbnail canvas clips overhead sword anticipation. | Fit all poses in a clip at one common normalized scale/anchor. | Full weapon travel is visible in the pose strip. |
| Concurrent page loading fails intermittently in the in-app browser. | Load source pages in sequence and report the exact failing path. | Two subsequent fresh loads succeeded; no silent retry or omitted image. |

Projection correction at commit `c2bfc28`: anatomical left does not mean screen-left. In SW, the left shield is near and can occupy screen-right/front while the right sword is far-left; SE reverses depth, not handedness. The SW v02 request contains an incorrect screen-left shield rule. Its observed front-left turn takes precedence; the original request is retained. Confidence: 95%, based on fixed-handed body rotation. SW v03 corrects the request.

## Verification

- Original source pages: nine at 1086×1448 and the southwest repair at 1199×1312, all transparent RGBA PNG. Requests asked for larger exact cells; the provider did not return those dimensions. The importer measures actual output rather than claiming the requested dimensions were achieved.
- All eight direction sets contain 48 usable source regions. All 96 direction/tag combinations select and draw in the browser. Repaired east cut maps to exactly six E v03 regions; the other 42 east regions remain E v02. The southwest repair similarly changes only its six hurt regions; other SW regions remain v02.
- Twelve deterministic tests pass: elapsed-time/refresh independence, unequal holds, gait phase on turns, non-restarting attacks, locked action facing, recovery to movement intent, single contact event, interrupted contact cancellation, guard hold/release/early release, prayer hold/interruption, and terminal death/reset.
- Browser transition demonstration completes walk→cut→walk, guard entry/hold/exit, kneel/channel interrupted by hurt, and held final corpse. Manual inspection cancels the demo instead of being overwritten by its pending actions.
- Browser checks cover frame selection/stepping, pause/play, source strips, 96-pixel nearest sampling on pale ground and 160-pixel smooth sampling on dark ground. No neighboring figure appears in the inspected regions.
- Stage preview limits use complete pose extents; resizing retains aspect and bounds. Observed browser viewport is 1280×720. The requested 375-pixel override did not change that viewport in this in-app session, so a narrow-screen visual test is not claimed.

## Open art review

Timing decision at commit `e5baae3`, confidence 99%: split tester updates at animation recovery boundaries so movement consumes walking time only. Reproduced the previous bug with two failing intent tests: a 600-millisecond update including the 500-millisecond strike moved 84 pixels, while frequent updates moved much less. The corrected expected travel is 14 pixels for the remaining 100 milliseconds. This changes preview timing only, not source pixels, game combat or an endpoint contract.

Playground update on 2026-10-05: the default view now shows the keyboard-controlled character and six preset sequence buttons beside it. Detailed frame controls and references are collapsed. Browser checks confirm WASD/arrow facing and Space strikes without canvas focus, all six preset completions, and keyboard takeover. Eighteen automated tests pass, including held diagonal displacement, key release, strike repeats, input editing, focus loss and guard takeover. The keyboard tests use a simulated document; desktop layout and actual source rendering were inspected separately in the browser. This update does not change source artwork or game mechanics.

Foot anchors are approximations, not artist-authored skeletal pivots. Check gait sliding, action recovery and loop joins in motion. Some guard raises, interactions and kneeling depth remain subtle; gear/gesture continuity needs final scrutiny across directions. Camera target is about 45 degrees above the ground, but generated projection is not calibrated. Final texture density, game-scale silhouettes and atlas sampling need a scene test before production integration.

Use [manifest.md](manifest.md) for decisions and notes, and [the motion lab](viewer/index.html) for inspection. Distinct hashes prove different pixels, not motion correctness. No page is accepted solely because an image tool completed.
