# S13 equipment and cast exploration

The user authorizes 35 equipment/face variants and ten new character illustrations. The initial sprite and keyboard playground are complete as a first study; this exploration does not imply final sprite approval.

## Defined output list

The exact choices, changes, dates, origins and limits are in [plan.json](plan.json): five shields (V01–V05), five one-handed weapons (V06–V10), five two-handed weapons without shields (V11–V15), five helmet types (V16–V20), five unhelmeted face grammars (V21–V25), five armor treatments (V26–V30), and five cloaks/tunics (V31–V35). R01–R10 cover Almodis, Odo, Giraud, Agnes, Raimon, Isarn, Durand, Raimbaut, Lambert and Fulk.

Every call receives the unchanged original [S13](../images/s13-guarin-isometric-v02.png). For equipment it is the character identity, costume, camera and rendering reference. Change only the named category; two-handed gear additionally changes the arm hold and removes the shield/sword. For the cast it is the style, proportions, texture and camera reference; each new subject follows its own dossier. No previous expansion output or failed sprite is an input.

Use the built-in image generator, one call per illustration, with complete independent prompts. Preserve its returned image bytes, save exact requests and input/output hashes, and inspect each drawing before review. Use the existing concept gallery, ranking, comments and direct save contract; no endpoint or database changes.

## Historical scope and exceptions

Decision at commit `5f4f4ac`, confidence 98%: preserve the approved predominantly 12th-century equipment scope and label reconstruction rather than implying every illustrated form was used locally in 1101. V05 and V27 are early-13th comparisons. Guarin's existing greathelm remains the previously authorized exception. Regional scale/lamellar armor, smaller shield size and improvised weapons are explicitly design interpretations.

The latest request explicitly includes Malta. V32 is a later heraldic study, with period-style cloth and the original S13 gear; it is not claimed as a 1101 or 12th-century uniform. Hospitaller and Malta refer to the same historical order at different times. V31/V33 are later-than-story order comparisons. These options do not rewrite the campaign's local costume rules.

Primary order evidence: [Order of Malta history](https://www.orderofmalta.int/history/), [its eight-pointed cross history](https://www.orderofmalta.int/history/the-eight-pointed-cross/), [its flags and emblems](https://www.orderofmalta.int/government/flags-emblems/), and [Teutonic Order chronology](https://www.deutscherorden.de/site/schwestern/geschichtlicherhintergrun). The Malta sources differ in how early they describe the eight-pointed cross; the emblem page dates its present form to over 400 years ago. Do not call the modern geometry a securely documented 1101 badge.

Story source: [character dossiers](../../../story/characters.md). Art proportions override realistic height descriptions. Adult figures share S13's compact scale; Agnes is a smaller child, and Raimon's wrong legs remain compact. Depictions are initial living/encounter concepts, not all boss transformations or animation sheets.

## Review checks

- Category change is visible and differs meaningfully from its neighbors.
- Equipment variants retain S13's full-face helmet unless the helmet/face category changes it; shield, weapon and clothing stay fixed where required.
- Two-handed variants have one coherent weapon, two correct grips and no shield.
- Large heads, tiny bodies, small eyes, dirt, muted pigment, heavy irregular edges and hand-drawn 2D medium remain intact.
- Cast identity, age, role, clothing, props and story condition follow the dossiers; no official order badge is assigned to Raimbaut's invented order.
- Document drift and hold back unusable results; generation completion is not visual approval.

Status: plan defined; generation and review pending. Exact prompts and records will be retained here as the batch progresses.
