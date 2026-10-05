# Face-study inspection — 2026-10-05

Thirty new full-body Guarin studies are present: F01–F15 from Grok native `image_edit`, F16–F30 from the built-in image generator. Five previous unhelmeted studies V21–V25 are included for comparison. All new calls use only the exact original S13 path and source hash. No failed image or previous face iteration is an input.

The parent assistant inspected the outputs, both at full-body scale and in diagnostic face crops. Provider files were copied without pixel changes. The diagnostic sheets under `qa/` are previews, not generation inputs or replacement artwork. Each record contains its exact request and specific visual observations.

## What differs

Grok spans square/block faces, rounded low cheeks, wedge jaws, sunken sockets, broken noses, soot masks, scratch marks, low brows, cheek ledges, hooked noses, curved lids, hatch planes, pin eyes, compressed features and asymmetry. The built-in set spans broader versus narrower jaws, tiny dark versus outlined eyes, joined versus detached brow/nose marks, stepped versus brushy edges, softer versus harder cheek planes and low-contrast features. Hair, stubble, age, weary expression and outfit were held constant in the briefs.

## Limits seen in the actual images

- The body, cloak/scarf, belt, sword, shield, compact stature and elevated camera remain recognizably S13 throughout. This is a visual consistency assessment, not a claim of identical pixels outside the head.
- Grok's faces are generally cleaner and more comic-like than the granular body. Many retain white eye gaps despite the tiny-eye prohibition. All 15 current Grok studies are marked **revise**, with specific notes. Six initial Grok drawings were held back and replaced in fresh sessions from S13; those replacements improved some grain and eye treatments but did not eliminate every issue.
- The built-in set preserves the worn pigment more closely and generally uses smaller dark eyes. Its range is less broad: several requested mark-based treatments still read as anatomical portraits. F27–F30 in particular remain near the same detailed face family. These are candidates for comparison, not a claim that all 15 are equally distinct or equally faithful.
- The white cut above the left ear often becomes a visible white temple streak or cross. The camera's exposed side may be anatomical right; do not treat these marks as approved dossier accuracy. Most prompts request the left-side mark; the stricter Grok correction explicitly permits it to be hidden on the far side.
- No face is production-approved. Selecting a useful shape language does not approve texture, eye size, scar placement, animation or final costume.

## Review page

The independent face gallery uses the established drag/number ranking, minimized cards, per-card Details/commentary and accept/reject controls. Face close-ups enlarges the same provider images in the browser; full figures remain available. Existing earlier face comments and relative order are copied to this page without replacing newer destination drafts or removing source values.

Browser drafts work now. Direct project saving is disabled until the explicit contract approval required by the supplied AGENTS.md section 15. The proposed additions are `faces` and `expansion` to the existing `POST /api/review` board values. No server contract has changed in this task.
