# Parent review of the flat Guarin concepts

Reviewed 2026-10-04. Latest user feedback supersedes [the prior assessment](assessment-2d.md): A/C still looked modeled and too similar; B had malformed helmet geometry. My earlier acceptance of their flatness and B geometry was too lenient.

The new screen requires solid dark fills, no rounded surface lighting or metallic bevels, dirt drawn as marks, a coherent closed barrel helmet, exaggerated short body, distinct drawing media and visible poverty/exhaustion. The same written costume remains mandatory. All eight actual outputs were inspected; source images were copied unchanged.

| Study | Parent findings | Disposition |
|---|---|---|
| [S47](images/s47-guarin-flat-raster-wretched-v01.jpg) | Held back: dark flat fills but lost the requested fine raster medium. Light upper arms and upright body weaken the fixed costume and exhausted pose. | Hold back; not a current candidate |
| [S48](images/s48-guarin-flat-ink-wretched-v01.jpg) | Held back: the barrel helmet is repaired and the drawing is flat, but the light beige background misses the required charcoal mood. | Hold back; not a current candidate |
| [S49](images/s49-guarin-flat-wash-wretched-v01.jpg) | Held back: the dirty wash still models rounded volume and uses a light paper background. This fails the stricter flatness requirement. | Hold back; not a current candidate |
| [S50](images/s50-guarin-flat-raster-wretched-v02.jpg) | Held back: fine pixel art and grim color, but raised metallic edge highlights still imply 2.5D volume. Added helmet fitting and costume drift. | Hold back; not a current candidate |
| [S51](images/s51-guarin-flat-ink-wretched-v02.jpg) | Flat dark fills, sparse ink contours and a slumped pose. The barrel helmet now has an intact faceplate and a lid of normal width. Filthy cloth and wraps read as worn. Mail is too sparse, buckle/guard construction drifted, and the tilted head does not prove the intended camera. | Present as limited style proposal; user review pending |
| [S52](images/s52-guarin-flat-stencil-wretched-v02.jpg) | Broad irregular flat patches and broken stencil edges replace the ink outline. Muddy brown rags, stains and sagging posture feel wretched. The front plate is lighter than the shell; mail becomes patched cloth and the narrow wine shield panel is missing. Camera remains uncalibrated. | Present as limited style proposal; user review pending |
| [S53](images/s53-guarin-flat-raster-wretched-v03.jpg) | Held back: the short squat pixel silhouette is useful, but metallic rim highlights and an added side fitting persist. Not promoted as a solution to flatness. | Hold back; not a current candidate |
| [S55](images/s55-guarin-flat-raster-mood-base-v05.jpg) | Flat stepped pixel clusters; broad dark fills replace the modeled metal sheen. Huge helmet and very short body are preserved. Rust and torn cloth add wear, although the pose is less exhausted than B/C. Unrequested circular helmet fitting, exposed light arms and overly broad red shield panel need correction. Camera remains too shallow/unverified. | Present as limited style proposal; user review pending |

A/B/C now differ through pixel clusters, sparse ink contours and broad broken stencil edges. B fixes the previous pancake lid and crushed faceplate. B/C have the clearest slumped, worn mood; A is more upright and less desperate. Remaining discrete surface-value changes still imply some form, especially C's lighter faceplate. The improvement is a flatter drawing language, not a claim of perfect compliance.

Costume drift remains visible: A adds a side fitting and exposed light upper arms and broadens the shield's wine panel; B under-describes mail and changes buckle/guard construction; C substitutes patched cloth for part of the mail and loses the narrow wine panel. These must not become canon. Helmets remain huge, but B/C's longer silhouettes still need checking against the shortest squat target. No concept is approved for production.

All prompts target an elevated 45-degree game view, but tilt and stylization make numeric measurement unreliable. Camera consistency remains open; no achieved 15-degree increase is asserted.

## Input audit

S47–S53 each made one text-only native `image_gen` call in a unique fresh session. S55 made one native `image_edit` call with the complete raw prompt and only approved base M22: `../mood-board/07-game-language/m22-hollow-knight-combat.jpg`. Its hash is verified against the approved source inventory. No prior concept image or history was supplied. Its wide aspect is the provider output, despite the square request; pixels were not cropped or repainted.

S54 produced no art: its override dispatcher made two unsuccessful tool searches and ended cancelled. S55 used a new session and the standard dispatcher, which called native image_edit directly. Exact successful calls, source bytes, dimensions, hashes and limited orchestration cost reports are saved in the generation records. CLI identity does not expose the exact image model or its internal rendering method.
