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

Inspection and current limits: [assessment](assessment.md). The face page has 30 new drawings and five existing face studies; project saving is automatic and verified.
