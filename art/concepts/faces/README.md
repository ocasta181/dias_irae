# Robert face exploration — earlier source studies

**Name revision — 6 October 2026.** Robert of Rookmere is the active protagonist. [The current story brief](../1149-story-brief.md) supplies his revised context. Guarin in the source decisions below identifies the original studies; their inputs, face preferences, proportions, and recorded approvals are preserved.

Decision at commit `47bab5d`, 2026-10-05, confidence 98%: the user requests 30 additional face studies of the same Guarin, not a new costume or 30 new whole-character media. Use only the unchanged original S13 for each generation. Remove the helm, keep the huge head and squat body, clothing, equipment, pose, palette, camera and rough drawing medium. Explore facial silhouette and feature grammar. Guarin is 34, dark-haired, with a white cut through his hair above his left ear; the dossier's realistic stature does not override the approved exaggerated game proportions.

- [Defined 30 variations](plan.json): F01–F15 use Grok; F16–F30 use the built-in image generator.
- Each prompt is complete and independent. No generated face candidate, failed iteration, screenshot or prior session is an input.
- Grok uses one native `image_edit` call in a fresh session and empty working directory. Actual tool input must match the saved prompt and original S13 path.
- Provider bytes are copied unchanged into `images/`. Records preserve source/output hashes, actual inputs, dimensions and inspection findings.
- The five earlier V21–V25 studies belong with this face comparison. Their source files and existing review content will be preserved.
- The dedicated page will keep individual commentary, decisions and drag/number ordering, with cards minimized initially. Order, comments and decisions save automatically to the independent project manifest after every change. There is no Save button or file picker. Conflicts remain visible and preserve the browser draft.

## Progress

- [x] Define 30 distinct face designs and fixed source constraints.
- [x] Generate and inspect 15 Grok studies; six earlier outputs were replaced after eye/texture review.
- [x] Generate and inspect 15 built-in studies.
- [x] Publish a dedicated face comparison page with browser drafts.
- [x] User authorizes automatic project saving; implement and verify face/equipment destinations and independent review pages.
- [ ] User selects face direction.

These are review candidates. Tool success is not visual approval.

Inspection and current limits: [assessment](assessment.md). The first face round has 30 drawings and five existing face studies; project saving is automatic and verified.


## Preferred-feature round — 2026-10-05

Decision at commit `c0b8812`, confidence 98%: retain the captured saved top twelve in [round-2-selection.json](round-2-selection.json). The captured #5 is **F25, Narrow lower mask**. Produce 30 close facial-mark variations, F31–F60: 18 from F25 and 12 from the other preferred face families. Keep the source outfit, huge head, tiny body, pose, camera, dull palette and granular drawing. Change noses, eye marks, mouths and eyebrows. Each call uses the exact selected original face image. No new-round output or failed trial is an input. This replaces the initial round's S13-only source rule for these explicitly requested variants.

- [x] Capture ranking and source image hashes before generation.
- [x] Save 30 independent feature briefs, prompts and exact requests.
- [x] Inspect 15 initial Grok trials and one narrower repair; hold back all 16 for smooth or oversized feature drift.
- [x] Generate all 30 current candidates with the built-in tool, preserving provider bytes.
- [x] Inspect all original full figures and a face contact sheet; independently strengthen F38 and F54 from the original F25.
- [x] Publish the 30 reviewed additions with existing comments and relative ranking preserved.
- [ ] User selects the preferred facial marks.

The current round uses the built-in generator after the Grok trials failed the medium check. This is a documented change from the initial 15/15 provider plan. Every card links its actual request and record; these files, rather than the initial planning allocation, identify the actual generation inputs. Current images are `images/f31-v03.png` through `images/f45-v03.png`, except F38 uses `f38-v04.png`, and `images/f46-v01.png` through `images/f60-v01.png`, except F54 uses `f54-v02.png`.


## Hair, nose and eyebrow round — 2026-10-06

Current identity decision at commit `24c570a`, confidence 98%: the drawing the user chose under the misleading “F25” heading is **F37**. The selected three families are F37, V22 and F18. The user attached an authoritative eye close-up, matched to F37 with normalized image correlation 0.9926. Use only these two eye marks; eyebrows are an explicit variable.

F61–F69 use F37, F70–F78 use V22, and F79–F87 use F18. Each family crosses three hairstyles (close blunt crop, ear-length ragged side part, receding sparse crown) and three noses (small rounded button, slender curved hook, short crooked broad tip). Heavy level bars, thin sloping strokes and sparse broken arches vary the brows. Every request includes the selected original source and the exact F37 eye reference. No failed/new-round output is a generation input.

- [x] Resolve candidate/source ambiguity: card titles and compact controls show their own IDs, with sources separately labeled “Based on”.
- [x] Capture exact eye reference, source hashes, candidate matrix and independent raw requests.
- [x] Generate all 27 first corrected-source trials and inspect original full figures and head/eye comparisons.
- [x] Publish all 27 checked studies F61–F87. The original 65 decisions/comments and their relative ranking are preserved; 92 cards are live.
- [x] Independently replace the 20 eye-drifted trials from original selected references, using literal ink-mark geometry and the full F37 drawing alongside its eye-only crop.
- [ ] User reviews and chooses the face direction.

Current images: F62, F63, F64, F66, F68 and F69 use their `v04` images; F61, F65, F67 and F70–F87 use `v05`. All 27 are published. For V22/F18 repairs, each request includes the literal selected base, full original F37 as an eye-only reference and the exact original eye crop. The earlier twenty source-eye/enlargement trials stay held back. They were never inputs. The displayed studies share the selected graphic eye treatment; generative redraw changes some edges and placements, so they are not mathematically identical pixels. Some nose/brow differences are subtle at full-body scale and need face zoom. No face is production-approved.

The page saves positions, comments and decisions automatically. Four publisher tests and six autosave tests cover review/identity preservation and saving behavior. Source and provider output hashes are verified; provider image bytes are unchanged. Fresh browser verification confirms all 92 cards, all F61–F87 candidates, matching header/title IDs, automatic saving ready, and no Save button or horizontal overflow. All 27 served image responses match their recorded provider hashes. All 92 positions are persisted, and the preceding relative order is preserved.

Correction history: early F61/F70 pilots used loose eye grammar; F70/F79 v02 mistakenly locked eyebrows; 15 completed v03 trials used original F25 square eyes. These are held back. F61 v04 finally used the chosen eye grammar but retained an overly long nose, so its independently generated v05 replaced it. The F25 title on F37 was a source label presented as a candidate title; IDs are now unambiguous.
