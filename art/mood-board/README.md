# Dias Irae — mood board

Review stage: **pending**. These are internet references, not generated concept art or game-ready assets.

Open [index.html](index.html) for the gallery, [overview.jpg](overview.jpg) for a single visual overview, or the category folders to review individual files. [manifest.md](manifest.md) lists the references and gives space for decisions. Full provenance, credits, licenses, downloaded dimensions and file hashes are recorded in [sources.json](sources.json).

## The intended feeling

A veteran comes home to an ordinary household in a harvest that has gone wrong. Limewash, mail, cold stone, folded cloth and rye are familiar. The horror emerges through those materials: black grain, a gait that has too many feet, the body caught inside a sacred image. The institutions are inhabited by people trying to help and failing in specific ways.

| Folder | Visual question |
|---|---|
| `01-sacred-horror/` | How do flesh, judgment and sacred light become uncanny? |
| `02-stone-and-limewash/` | How small, painted and heavy should churches and undercrofts feel? |
| `03-people-and-arms/` | Can we recognize a working household, a worn knight and an ordinary animal? |
| `04-harvest-and-blight/` | Does the disease first read as something wrong with the harvest? |
| `05-land-and-water/` | What do pale rock, water and the grain route contribute? |
| `06-bread-bone-and-ritual/` | Can an ordinary meal and a modest sacred object carry the horror? |
| `07-game-language/` | What can existing games teach about readable darkness, camera and surface detail? |
| `user-references/` | Your additions; these will be reconciled into the next board revision |

Palette words come directly from the story: rye gold, charcoal, limewash, Antonine black/taupe, dried-blood wine, pig-fat yellow, bone white and dull iron. The swatches in the gallery are a proposed interpretation, not an approved palette or measured samples from the images.

The later paintings contribute mood, flesh and color. Near-period embroidery and Romanesque interiors contribute material culture. Modern nature photographs contribute anatomy and geology. Each reference has a specific limitation in the manifest so later costumes, glassware or architectural additions do not silently enter 1101.

## How to review

1. Delete individual image files that do not fit. The gallery hides unavailable images when reloaded; the overview remains a snapshot until rebuilt.
2. Add your own images to `user-references/` or the appropriate category folder. Keep any source/credit notes beside them when available. The current gallery is a snapshot; new additions will appear when the board is reconciled after review.
3. Optionally mark manifest rows `accepted`, `rejected` or `revise` and leave notes. Every existing row starts `pending`.
4. Tell me when the revised mood board is approved. Keeping an image or accepting individual rows does not automatically approve the whole board.

Useful review notes: which references carry the right feeling; which are too colorful, clean, ornate or overtly monstrous; and whether the game should use painted sprites, pixel art or another treatment. The current references do not decide sprite scale or rendering style.

After the review, I will inventory the surviving and added files, refresh the board, record your explicit approval in the checklist, and generate concepts from the accepted direction. The [concept manifest](../concepts/manifest.md) is currently a candidate list only.

## Reference use

Downloaded images remain unchanged. The overview resizes them into a labeled contact sheet. Credits and licenses apply individually; links and terms are preserved in the manifest and source inventory. Game screenshots are labeled reference-only with no reuse permission inferred. This collection does not authorize placing source photographs, paintings or screenshots into the shipped game.

`art/.gdignore` keeps these reference and working-art folders out of Godot's import scan. The eventual runtime export location will be defined with the sprite specification.

Progress and approval gates: [art-production-checklist.md](../../docs/art-production-checklist.md). Tool and engine assessment: [art-tooling.md](../../docs/art-tooling.md).
