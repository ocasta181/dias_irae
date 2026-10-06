# Concept art review manifest

**Story revision — 6 October 2026.** The current protagonist is Robert of Rookmere in autumn 1149. [The active brief](1149-story-brief.md) governs new cast and scene requirements. Earlier source names, exact inputs, images, reviews, and approvals below retain their recorded history.

Current checkpoint: **45 S13 equipment and cast candidates are ready for review: seven groups of five, plus ten named story characters.** The latest inspected versions are in the existing ordered gallery. Every call uses the exact original S13; prior failures are excluded as inputs. Dates, regional limits and visual deviations are recorded per card. No new sprite assets are approved by this checkpoint.

Previous gameplay checkpoint: **The user selected S49, S13, S15 and S01, in that order, for four gameplay-screen comparisons on 2026-10-05.** The complete Brave review has been saved into this manifest, including all comments, decisions and 45 ranked drawings. The latest instruction requires these exact selected files as gameplay inputs, preserving design and medium. This does not approve a calibrated camera or production assets.

## Mandatory generation rule — updated 2026-10-05

Use a complete written prompt for every call. The production chain is **approved mood-board images → character exploration → exact selected character image → gameplay-screen exploration**. For gameplay screens, supply the unchanged selected character file as an actual image input, preserve its design and rendering medium, and extend that medium across the entire world. Do not substitute a written approximation. Do not use failed gameplay outputs, screenshots, composites, generated guides or prior session history as references. Grok uses a fresh session and native `image_edit`; the built-in generator receives the exact source path. Record source paths and SHA256 hashes, inspect actual tool inputs, and view every output before presentation. Check character identity, squat proportions, equal human actor scale, shared palette, lighting, texture and projection.

Only 2D drawn art is allowed. For current gameplay work, preserve the user-selected image's own drawn texture and value treatment, including the preferred S49 painting. Prohibit 3D renders, sculpts, miniature photography, glossy shaders and studio-lighting effects in every complete raw prompt and dispatcher instruction. Describe the approved mood and each reference's role; game names alone are not enough. The parent assistant must view and assess each output before presenting it. Hold back failures of the 2D or mood requirements and record why. Production camera and costume approval remain separate open requirements.

Earlier, eight drawings were inspected. Five were held back for wrong medium, light backgrounds or modeled metallic highlights. The subsequently rejected trio was flatter and more distinct than the previous comparison, with limitations in costume, pose and camera still documented in [the assessment](assessment-flat.md). B/C most clearly convey exhaustion; A keeps the shortest, squattest structure but has visible costume drift. These are style proposals, not approved final assets.

Each call used a complete raw prompt and a new independent session. **A uses only approved mood-board base M22 (Hollow Knight combat), through `image_edit`; B and C use `image_gen` with no image input.** No prior generated concept, screenshot, guide, composite or session history was supplied. One earlier reference-call dispatcher failed without producing an image; S54 is documented below, and S55 retried in a new session.

The fixed costume and Royans/Isère, 1101 story remain authoritative; the greathelm is the allowed anachronism. Generator additions and substitutions are revision issues, not new costume canon. **Camera remains uncalibrated.** Target remains about 45 degrees above the ground; no achieved angle or exact 15-degree increase is claimed.

Review [the gallery](index.html?v=15#current-styles), [overview](comparison-grok-flat-v01.jpg), [assessment](assessment-flat.md) and [progress checklist](../../docs/art-production-checklist.md). Per-view decisions and commentary remain available. The board has one ordered gallery. The gallery fills the available window width and adds columns as the window grows. Tiles use a 320-pixel minimum width when space allows; narrow screens use one column. Images scale with their tiles. Drawings without a saved position start at the top, followed by the saved order. Enter a position number and press Enter or leave the field to move a drawing there. Press and hold anywhere on a card to drag it; arrow buttons and keyboard controls are also available. Every card starts minimized, with its header controls and image visible. The **Details** toggle in each card header shows or hides that card’s text, decisions and commentary. Opening or closing details does not change the review or position. **Save review** writes all comments, decisions and the complete gallery order directly to this project through the local art server, with a recoverable dated copy. No download or file placement is required. The browser draft saves automatically in the browser where you review; a Brave draft is separate from the app browser. The saved project manifest is available for reconciliation. Ranking does not imply acceptance. Export preserves historical and planned rows.

## Previous flat-style comparison — rejected

| Identifier | Candidate | Purpose | Image | Status | Notes |
|---|---|---|---|---|---|
| S55 | A — Flat fine raster | Flat style study | [S55](images/s55-guarin-flat-raster-mood-base-v05.jpg) | rejected | not the correct angle for isometric view. good flatness and cartoonishness. insufficiently "cute &amp; squat" body proportions. |
| S51 | B — Worn flat ink animation | Flat style study | [S51](images/s51-guarin-flat-ink-wretched-v02.jpg) | rejected | did not adhere to the body proportions requirements. made body proportions too realistic |
| S52 | C — Rough flat stencil | Flat style study | [S52](images/s52-guarin-flat-stencil-wretched-v02.jpg) | rejected | did not adhere to the body proportions requirements. made body proportions too realistic |

## Flat trials held back after parent review

| Identifier | Candidate | Purpose | Image | Status | Notes |
|---|---|---|---|---|---|
| S47 | A — Flat fine raster | Flat style study | [S47](images/s47-guarin-flat-raster-wretched-v01.jpg) | revise | Held back: dark flat fills but lost the requested fine raster medium. Light upper arms and upright body weaken the fixed costume and exhausted pose.<br><br>incorrect isometric angle. incorrect body proportions too close to human realism. must be more squat. |
| S48 | B — Worn flat ink animation | Flat style study | [S48](images/s48-guarin-flat-ink-wretched-v01.jpg) | revise | Held back: the barrel helmet is repaired and the drawing is flat, but the light beige background misses the required charcoal mood.<br><br>This is very close. |
| S49 | C — Flat dirty charcoal wash | Flat style study | [S49](images/s49-guarin-flat-wash-wretched-v01.jpg) | revise | Held back: the dirty wash still models rounded volume and uses a light paper background. This fails the stricter flatness requirement.<br><br>I *REALLY* like this art style. it looks like a painting. this is much better than basically anything else. explore more in this area. incorrect isometric angle.  |
| S50 | A — Flat fine raster | Flat style study | [S50](images/s50-guarin-flat-raster-wretched-v02.jpg) | revise | Held back: fine pixel art and grim color, but raised metallic edge highlights still imply 2.5D volume. Added helmet fitting and costume drift.<br><br>incorrect angle, incorrect body proportions. otherwise directionally correct art style |
| S53 | A — Flat fine raster | Flat style study | [S53](images/s53-guarin-flat-raster-wretched-v03.jpg) | revise | Held back: the short squat pixel silhouette is useful, but metallic rim highlights and an added side fitting persist. Not promoted as a solution to flatness.<br><br>incorrect angle, incorrect body proportions. head is too small. otherwise directionally correct art style |

## Failed reference dispatch — no image

| Identifier | Candidate | Purpose | Image | Status | Notes |
|---|---|---|---|---|---|
| S54 | A — Approved-base reference trial | Native image_edit dispatch | — | revise | Dispatcher override searched for a tool instead of calling the available native image_edit. No generation occurred and no image was submitted. Retried in a new session as S55 with the standard dispatcher. |

## Previous comparison — user requested flatter, grittier art

| Identifier | Candidate | Purpose | Image | Status | Notes |
|---|---|---|---|---|---|
| S41 | A — Diablo II mood, drawn in 2D | Assessed 2D mood/style study | [S41](images/s41-guarin-diablo-2d-v01.jpg) | revise | User revision: still reads as 3D/2.5D. Make it much flatter, darker and more wretched; A and C were too similar. The earlier parent flatness judgment was too lenient. |
| S46 | B — Hollow Knight shapes, somber 2D | Assessed 2D mood/style study | [S46](images/s46-guarin-hollow-knight-2d-v03.jpg) | rejected | User rejected the malformed B and requested a complete redraw. The oversized lid and compressed faceplate were not acceptable; earlier parent assessment missed this failure. |
| S45 | C — Dark painted 2D blend | Assessed 2D mood/style study | [S45](images/s45-guarin-blended-2d-v02.jpg) | revise | User revision: still too modeled and too similar to A. Make it flatter, darker, muddier, dirtier and exhausted. The earlier parent flatness judgment was too lenient. |

## Held back after my image review

| Identifier | Candidate | Purpose | Image | Status | Notes |
|---|---|---|---|---|---|
| S42 | B — Hollow Knight shapes, somber 2D | Assessed 2D mood/style study | [S42](images/s42-guarin-hollow-knight-2d-v01.jpg) | revise | Held back after my visual review: 2D and muted, but too clean and patterned for the worn mood. Replaced by another complete raw-prompt generation; never uploaded as a reference. |
| S43 | C — Dark painted 2D blend | Assessed 2D mood/style study | [S43](images/s43-guarin-blended-2d-v01.jpg) | revise | Held back after my visual review: 2D but too close to B, with an extra circular helmet fitting and weak mail representation. Replaced by another complete raw-prompt generation; never uploaded as a reference. |
| S44 | B — Hollow Knight shapes, somber 2D | Assessed 2D mood/style study | [S44](images/s44-guarin-hollow-knight-2d-v02.jpg) | revise | Held back after my visual review: dark graphic 2D shapes fit the mood, but the model added knee disks outside the fixed costume. Regenerated from a complete raw prompt without supplying this image. |

## Previous comparison — 2D rerun requested

| Identifier | Candidate | Purpose | Image | Status | Notes |
|---|---|---|---|---|---|
| S38 | A — Diablo II led | Independent text-only style study | [S38](images/s38-guarin-diablo-game-isolated-v01.jpg) | revise | User requires a rerun with only 2D art and stronger mood-board context. Superseded by the assessed 2D comparison; no concept approval. |
| S39 | B — Hollow Knight led | Independent text-only style study | [S39](images/s39-guarin-hollow-game-isolated-v01.jpg) | revise | User requires a rerun with only 2D art and stronger mood-board context. Superseded by the assessed 2D comparison; no concept approval. |
| S40 | C — Blended game rendering | Independent text-only style study | [S40](images/s40-guarin-blended-game-isolated-v01.jpg) | revise | User requires a rerun with only 2D art and stronger mood-board context. Superseded by the assessed 2D comparison; no concept approval. |

## First independent raw-text trials — internal revisions

| Identifier | Candidate | Purpose | Image | Status | Notes |
|---|---|---|---|---|---|
| S35 | A — Diablo II led | Independent text-only style study | [S35](images/s35-guarin-diablo-led-independent-v01.jpg) | revise | Independent raw-text trial. The view stayed too shallow and the metal construction gained details. Kept as an internal revision, never as a generation input. |
| S36 | B — Hollow Knight led | Independent text-only style study | [S36](images/s36-guarin-hollow-knight-led-independent-v01.jpg) | revise | Independent raw-text trial. Flat drawing language, huge helmet and compact body, but the view stayed too shallow. Kept as an internal revision, never as a generation input. |
| S37 | C — Diablo II / Hollow Knight blend | Independent text-only style study | [S37](images/s37-guarin-blended-independent-v01.jpg) | revise | Independent raw-text trial. Painted texture, but the body became less squat and the camera stayed too shallow. Kept as an internal revision, never as a generation input. |

## Discarded comparison — rejected by the user

| Identifier | Candidate | Purpose | Image | Status | Notes |
|---|---|---|---|---|---|
| S30 | A — Diablo II led | Discarded batch | — | rejected | User discarded this batch: prior generated images anchored the outputs. Image, prompt and generation-record files removed from the workspace. Never use these outputs as generation inputs. |
| S31 | B — Hollow Knight led | Discarded batch | — | rejected | User discarded this batch: prior generated images anchored the outputs. Image, prompt and generation-record files removed from the workspace. Never use these outputs as generation inputs. |
| S34 | C — Blended inspiration | Discarded batch | — | rejected | User discarded this batch: prior generated images anchored the outputs. Image, prompt and generation-record files removed from the workspace. Never use these outputs as generation inputs. |

## Discarded supporting attempts

| Identifier | Candidate | Purpose | Image | Status | Notes |
|---|---|---|---|---|---|
| S24 | Diablo II led | Discarded batch | — | rejected | User discarded this batch: prior generated images anchored the outputs. Image, prompt and generation-record files removed from the workspace. Never use these outputs as generation inputs. |
| S25 | Hollow Knight led | Discarded batch | — | rejected | User discarded this batch: prior generated images anchored the outputs. Image, prompt and generation-record files removed from the workspace. Never use these outputs as generation inputs. |
| S26 | Diablo II led | Discarded batch | — | rejected | User discarded this batch: prior generated images anchored the outputs. Image, prompt and generation-record files removed from the workspace. Never use these outputs as generation inputs. |
| S27 | Diablo II led | Discarded batch | — | rejected | User discarded this batch: prior generated images anchored the outputs. Image, prompt and generation-record files removed from the workspace. Never use these outputs as generation inputs. |
| S28 | Diablo II led | Discarded batch | — | rejected | User discarded this batch: prior generated images anchored the outputs. Image, prompt and generation-record files removed from the workspace. Never use these outputs as generation inputs. |
| S29 | Diablo II led | Discarded batch | — | rejected | User discarded this batch: prior generated images anchored the outputs. Image, prompt and generation-record files removed from the workspace. Never use these outputs as generation inputs. |
| S32 | Diablo II / Hollow Knight blend | Discarded batch | — | rejected | User discarded this batch: prior generated images anchored the outputs. Image, prompt and generation-record files removed from the workspace. Never use these outputs as generation inputs. |
| S33 | Diablo II / Hollow Knight blend | Discarded batch | — | rejected | User discarded this batch: prior generated images anchored the outputs. Image, prompt and generation-record files removed from the workspace. Never use these outputs as generation inputs. |

## Previous ink, gouache and charcoal comparison — revision requested

| Identifier | Candidate | Purpose | Image | Status | Notes |
|---|---|---|---|---|---|
| S18 | A — Graphic ink and cel shadows | Same-costume rendering comparison | [S18](images/s18-guarin-graphic-ink-grok-v01.jpg) | revise | User prefers previous A/B to C, but both read too much as comic-book illustration. Steepen the view by 15 degrees and compare Diablo II-led, Hollow Knight-led and blended game rendering. Keep the cute squat proportions and fixed costume. Revision requested; no full concept approval. |
| S22 | B — Dry gouache | Same-costume rendering comparison | [S22](images/s22-guarin-dry-gouache-grok-v02.jpg) | revise | User prefers previous A/B to C, but both read too much as comic-book illustration. Steepen the view by 15 degrees and compare Diablo II-led, Hollow Knight-led and blended game rendering. Keep the cute squat proportions and fixed costume. Revision requested; no full concept approval. |
| S23 | C — Tinted charcoal and etched hatching | Same-costume rendering comparison | [S23](images/s23-guarin-charcoal-etching-grok-v03.jpg) | revise | User prefers previous A/B to this C. Replace the illustration-medium comparison with Diablo II-led, Hollow Knight-led and blended game rendering, at a view 15 degrees steeper. Revision requested; no explicit rejection of this individual image is implied. |

## Earlier Grok fresh-drawing attempts — internal revisions

| Identifier | Candidate | Purpose | Image | Status | Notes |
|---|---|---|---|---|---|
| S19 | Dry gouache | Same-costume rendering comparison | [S19](images/s19-guarin-dry-gouache-grok-v01.jpg) | revise | Internal revision: independent fresh drawing changed small helmet, buckle and pose details. S22 replaces it in the controlled comparison; no user rejection is implied. |
| S20 | Tinted charcoal and etched hatching | Same-costume rendering comparison | [S20](images/s20-guarin-charcoal-etching-grok-v01.jpg) | revise | Internal revision: independent fresh drawing added crossed crown strips and changed facing/sword direction. One capacity failure was retried successfully. Superseded in the current comparison. |
| S21 | Tinted charcoal and etched hatching | Same-costume rendering comparison | [S21](images/s21-guarin-charcoal-etching-grok-v02.jpg) | revise | Internal revision: fresh redraw corrected the sword direction but tilted the helmet and altered faceplate seams. Retained as generation history; S23 is the controlled comparison. |

## Preferred texture references — revision required

| Identifier | Candidate | Purpose | Image | Status | Notes |
|---|---|---|---|---|---|
| S13 | Guarin — selected S09, elevated isometric view | Character style/camera exploration | [S13 v02](images/s13-guarin-isometric-v02.png) | revise | User prefers this texture and its more exaggerated proportions over S17. Camera still too low. Texture preference only; full concept approval pending.<br><br>This is one of the closest, if not the closest to correct of anything here. |
| S17 | Guarin — camera correction study, revision required | Character style/camera exploration | [S17 v06](images/s17-guarin-camera-measured-v06.png) | revise | User prefers S13/S17 textures but rejects persistent camera failure and drift toward anatomically correct proportions. Built-in generation paused; research three alternatives. Texture preference is not full concept approval.<br><br>This is quite close. |

## Other camera studies

| Identifier | Candidate | Purpose | Image | Status | Notes |
|---|---|---|---|---|---|
| S14 | Guarin — new high-camera drawing | Character style/camera exploration | [S14 v03](images/s14-guarin-high-camera-v03.png) | revise | User: too far, half way in between. Camera too steep; S15 is the new midpoint candidate. |
| S15 | Guarin — midpoint camera, drawn from scratch | Character style/camera exploration | [S15 v04](images/s15-guarin-mid-camera-v04.png) | revise | Midpoint attempt did not resolve the user’s camera concern; subsequent camera studies also rejected. Built-in generation paused. |
| S16 | Guarin — camera correction study, revision required | Character style/camera exploration | [S16 v05](images/s16-guarin-camera-plus15-v05.png) | revise | Camera undershot: crown-based approximate estimate 34 degrees above ground, not the requested approximate 40. Further correction attempted. |

## Selected original direction

| Identifier | Candidate | Purpose | Image | Status | Notes |
|---|---|---|---|---|---|
| S09 | Soft painted pixel shapes | Character style/camera exploration | [S09 v01](images/s09-soft-painted-pixel-shapes-v01.png) | revise | Earlier three-image comparison rejected as too similar. Subsequently the user attached S09 and selected this particular character for continued development, requesting a Diablo II isometric camera redraw. This newer selection supersedes the earlier rejection for S09 only; final approval pending. |

## Unselected distinct drawing systems

| Identifier | Candidate | Purpose | Image | Status | Notes |
|---|---|---|---|---|---|
| S10 | A — Shadow cutout | Character style/camera exploration | [S10 v01](images/s10-shadow-cutout-v01.png) | pending |  |
| S11 | B — Engraved woodcut | Character style/camera exploration | [S11 v01](images/s11-engraved-woodcut-v01.png) | pending |  |
| S12 | C — Tapestry stitch | Character style/camera exploration | [S12 v01](images/s12-tapestry-stitch-v01.png) | pending |  |

[Comparison overview](comparison-v04.jpg). These were not redrawn.

## Earlier comparisons

| Identifier | Candidate | Purpose | Image | Status | Notes |
|---|---|---|---|---|---|
| S07 | Dark ink with pixel accents | Character style/camera exploration | [S07 v01](images/s07-dark-ink-pixel-accents-v01.png) | rejected | User: these three are too similar; standing requirement is three truly different options. |
| S08 | Fine pixel cartoon | Character style/camera exploration | [S08 v01](images/s08-fine-pixel-cartoon-v01.png) | rejected | User: these three are too similar; standing requirement is three truly different options. |
| S04 | A — Flat ink cartoon | Character style/camera exploration | [S04 v01](images/s04-flat-ink-cartoon-v01.png) | revise | User asks to explore between S04 and S05: S04 too bright and sword crooked; S05 too pixelated. Both helms should become greathelms. Standing requirement: three truly different options. |
| S05 | B — Chunky pixel minimalism | Character style/camera exploration | [S05 v01](images/s05-chunky-pixel-minimalism-v01.png) | revise | User asks to explore between S04 and S05: S04 too bright and sword crooked; S05 too pixelated. Both helms should become greathelms. Standing requirement: three truly different options. |
| S06 | C — Sculpted pixel toy | Character style/camera exploration | [S06 v01](images/s06-sculpted-pixel-toy-v01.png) | pending |  |
| S01 | A | Character style/camera exploration | [S01 v01](images/s01-round-gentle-v01.png) | rejected | User rejected this comparison: eyes too big; all three too similar, effectively one art style with outfit changes. Requests three wildly different styles and a full-face helm. |
| S02 | B | Character style/camera exploration | [S02 v01](images/s02-bold-chunky-v01.png) | rejected | User rejected this comparison: eyes too big; all three too similar, effectively one art style with outfit changes. Requests three wildly different styles and a full-face helm. |
| S03 | C | Character style/camera exploration | [S03 v01](images/s03-angular-pixel-charm-v01.png) | rejected | User rejected this comparison: eyes too big; all three too similar, effectively one art style with outfit changes. Requests three wildly different styles and a full-face helm. |

## First batch and planned story concepts

| Identifier | Candidate | Purpose | Image | Status | Notes |
|---|---|---|---|---|---|
| C01 | Guarin — rejected first sheet | Character style/camera exploration | [C01 v01](images/c01-guarin-v01.png) | rejected | User rejected the first batch: wants a more cutesy feel, oversized heads and small bodies structurally closer to Hollow Knight and Castle Crashers. |
| C02 | Parish cast — rejected first sheet | Character style/camera exploration | [C02 v01](images/c02-parish-cast-v01.png) | rejected | User rejected the first batch: wants a more cutesy feel, oversized heads and small bodies structurally closer to Hollow Knight and Castle Crashers. |
| C03 | Blighted parishioners and wolves | Recognizable neighbors; wolves uncanny by degrees | — | planned | Resume after camera and equipment review. |
| C04 | Raimon the Long | Elderly household officer, keys, horse-hide and borrowed gait | — | planned | Preserve the man inside the boss. |
| C05 | Homecoming exterior | Rye terraces, village, castrum and wet burned mill | — | planned | Match the selected character direction and isometric context. |
| C06 | Parish church | Small Romanesque space, painted apse and altered crucifix | — | planned | Preserve period scale and sacred distinctions. |
| C07 | Undercroft encounter | Low vaults, stores and readable encounter space | — | planned | Match exterior and church materials. |
| C08 | Evidence and ritual objects | Grain, sclerotia, wheat host, splinter and keys | — | planned | Concept studies do not imply every object becomes a pickup. |

Progress source of truth: [art-production-checklist.md](../../docs/art-production-checklist.md). [Visual brief](visual-brief.md). Generate and review independent prompt-first character candidates before further cast concepts; define each asset category before sprite production.

## Preference ranking

Gallery order, first to last. Ranking does not change acceptance decisions.

1. S49
2. S13
3. S15
4. S01
5. S07
6. S09
7. S08
8. S17
9. S16
10. S04
11. S53
12. S50
13. S45
14. S05
15. S14
16. S23
17. S37
18. S06
19. S02
20. S03
21. S43
22. S21
23. S35
24. S41
25. S42
26. S48
27. S38
28. S44
29. S18
30. S22
31. S36
32. S19
33. S55
34. C01
35. C02
36. S20
37. S40
38. S46
39. S39
40. S11
41. S10
42. S12
43. S51
44. S52
45. S47
