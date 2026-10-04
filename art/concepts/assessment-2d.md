# Parent review of the 2D Grok concepts

**Historical assessment, superseded by user feedback.** A/C still read as 3D/2.5D and too similar; B had malformed helmet geometry. The parent flatness/geometry judgment below was too lenient. See [the new assessment](assessment-flat.md).

Reviewed 2026-10-04. I inspected the actual images against the approved [game-language board](../mood-board/game-language.jpg), [complete overview](../mood-board/overview.jpg) and latest user instructions. Images were viewed locally; none were supplied to the generator. These are judgments from visible art, not provider claims or automatic image scores.

## Review criteria

- Only drawn 2D appearance: flat painted/graphic marks and drawn contours. No CG miniature, sculpt, shiny studio render or photograph.
- Board mood: quiet grim wear, soot-black recesses, dirty gray/taupe, muted dried wine and controlled light. Cute structure does not imply cheerful colors or comedy.
- Oversized enclosed helmet, tiny broad body and stubby limbs; no visible face or large eyes.
- Fixed equipment and regional limits: plain mail, wine cloth, brown leather/wraps, straight sword, kite shield. Greathelm is the explicit exception for the 1101 Royans/Isère story.
- Elevated game view: visible lid and boot tops, no side-scroller framing. Exact 45-degree projection and consistency require further correction.
- A/B/C must differ in drawing language, not outfits.

A failure of 2D appearance or mood is held back and regenerated from a new full text prompt. Costume and calibrated-camera issues still block production approval. A style trial with these issues can be shown with the limitation stated; it is not a finished asset.

## Actual findings

| Study | 2D appearance | Mood / structure | Concrete problems | Action |
|---|---|---|---|---|
| [S41](images/s41-guarin-diablo-2d-v01.jpg) | pass | Mood: pass; cute proportions: pass | Visible brush marks and muted gray, taupe and dried-wine colors; a drawn 2D surface rather than a glossy miniature. The huge helmet and short body remain cute. The view is still shallow, mail marks are repetitive, and an extra horizontal helmet brace appeared. Eligible for style review, not a finished costume/camera reference. | Present for style review; approval pending |
| [S42](images/s42-guarin-hollow-knight-2d-v01.jpg) | pass | Mood: too clean; cute proportions: pass | Held back after my visual review: 2D and muted, but too clean and patterned for the worn mood. Replaced by another complete raw-prompt generation; never uploaded as a reference. | Hold back; new independent raw prompt used |
| [S43](images/s43-guarin-blended-2d-v01.jpg) | pass | Mood: partial; cute proportions: pass | Held back after my visual review: 2D but too close to B, with an extra circular helmet fitting and weak mail representation. Replaced by another complete raw-prompt generation; never uploaded as a reference. | Hold back; new independent raw prompt used |
| [S44](images/s44-guarin-hollow-knight-2d-v02.jpg) | pass | Mood: pass; cute proportions: pass | Held back after my visual review: dark graphic 2D shapes fit the mood, but the model added knee disks outside the fixed costume. Regenerated from a complete raw prompt without supplying this image. | Hold back; new independent raw prompt used |
| [S45](images/s45-guarin-blended-2d-v02.jpg) | pass | Mood: pass; cute proportions: pass | Strongest mood match in my review: soot-black recesses, dry worn pigment, dirty gray/brown iron and subdued wine cloth. Clearly drawn 2D, with a huge helmet and compact body. Mail reads as loose ring clusters and the camera remains shallow. Eligible for style review, not a finished costume/camera reference. | Present for style review; approval pending |
| [S46](images/s46-guarin-hollow-knight-2d-v03.jpg) | pass | Mood: pass; cute proportions: pass | Clearly flat 2D shapes, thin contours and restrained dark color. The lid is much broader and the body compact; no added knee armor. This is the most graphic approach. Mail is too sparse, light upper-arm patches need clarification, and helmet strips drift onto the crown. Eligible for style review, not a finished costume/camera reference. | Present for style review; approval pending |

S45 best conveys the worn, gloomy mood through dirty pigment, chipped surfaces and large black recesses. S41 is softer and less gritty. S46 shows the simplest flat shapes and the broader lid, but suppresses mail too much and adds light upper-arm patches; these need clarification. I did not certify any of them as a production reference. A/C remain too shallow, and B's broad lid does not establish an exact calibrated camera.

All six calls were `image_gen`, each in a unique explicitly new session. The only tool-input keys were `prompt` and `aspect_ratio`, and each actual prompt matches its saved raw text. No prior concept, generated guide, screenshot, composite, mood-board image or session history was passed. Underlying image-model identity and internal generation method are not exposed by the CLI.
