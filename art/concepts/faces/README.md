# Guarin face exploration

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
