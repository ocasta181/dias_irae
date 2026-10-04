# Dias Irae — mood board

Review stage: **approved by the user in chat on 2026-10-04**. All 26 references retained. These are internet references, not generated concept art or game-ready assets.

Open [game-language.jpg](game-language.jpg) for the weighted Hollow Knight / Castle Crashers preview, [index.html](index.html) for the gallery, [overview.jpg](overview.jpg) for the full visual overview, or the category folders to review individual files. [manifest.md](manifest.md) lists the references and gives space for decisions. Full provenance, credits, licenses, downloaded dimensions and file hashes are recorded in [sources.json](sources.json).

## The intended feeling

A veteran comes home to an ordinary household in a harvest that has gone wrong. Limewash, mail, cold stone, folded cloth and rye are familiar. The horror emerges through those materials: black grain, a gait that has too many feet, the body caught inside a sacred image. The institutions are inhabited by people trying to help and failing in specific ways.

## Approved game-language direction — 2026-10-04

**Dark and pixelated: more cartoony than Diablo II, less cartoony than Hollow Knight.** This latest approval refinement supersedes the earlier Hollow Knight-dominant rendering treatment. Subsequent character feedback clarifies cutesy oversized heads, small bodies and small/no visible eyes, with textured, weighty materials and atmospheric darkness. The selected S09 character direction and current S15 camera candidate carry that newer instruction. Castle Crashers remains a light influence on posing and action readability; Darkwood informs ordinary unease.

Hollow Knight and Castle Crashers guide compact character structure; Diablo II guides the elevated game camera, material weight and darkness. Period kit, Romanesque spaces and sacred/body-horror motifs come from the story and historical references. The approved palette is the story's earthy palette; exact color tuning, pixel density and edge treatment remain for concept review and the sprite pilot.

Official reference sources: [Hollow Knight](https://www.hollowknight.com/), [Castle Crashers](https://ww2.castlecrashers.com/game/) and [Diablo II: Resurrected](https://diablo2.blizzard.com/). Concept direction: [visual-brief.md](../concepts/visual-brief.md).

| Folder | Visual question |
|---|---|
| `01-sacred-horror/` | How do flesh, judgment and sacred light become uncanny? |
| `02-stone-and-limewash/` | How small, painted and heavy should churches and undercrofts feel? |
| `03-people-and-arms/` | Can we recognize a working household, a worn knight and an ordinary animal? |
| `04-harvest-and-blight/` | Does the disease first read as something wrong with the harvest? |
| `05-land-and-water/` | What do pale rock, water and the grain route contribute? |
| `06-bread-bone-and-ritual/` | Can an ordinary meal and a modest sacred object carry the horror? |
| `07-game-language/` | How do compact cartoon characters carry Diablo II’s material weight, darkness and elevated camera? |
| `user-references/` | Your additions; these will be reconciled into the next board revision |

Palette words come directly from the story: rye gold, charcoal, limewash, Antonine black/taupe, dried-blood wine, pig-fat yellow, bone white and dull iron. The swatches in the gallery are a proposed interpretation, not an approved palette or measured samples from the images.

The later paintings contribute mood, flesh and color. Near-period embroidery and Romanesque interiors contribute material culture. Modern nature photographs contribute anatomy and geology. Each reference has a specific limitation in the manifest so later costumes, glassware or architectural additions do not silently enter 1101.

## How to review

1. Open [the HTML gallery](index.html). Each reference has **Accept**, **Reject**, **Revise** and **Pending** buttons plus a **Your commentary** text box. Decisions remain reversible and rejected references stay visible.
2. Your choices and commentary save as a draft in the same browser. If browser storage is unavailable, the gallery says so; use **Download manifest** to preserve the review. Opening the page in a different browser does not transfer its draft.
3. When ready, click **Download manifest** and save the downloaded file as `art/mood-board/manifest.md`, replacing the existing manifest. This captures every decision and comment without changing source credits. The browser draft does not directly edit repository files; `sources.json` and preview images remain snapshots until reconciliation.
4. You may still delete individual image files or add your own to `user-references/` or the appropriate category folder. Keep source/credit notes beside additions. The gallery hides missing images on reload; additions and overview images are refreshed at reconciliation.
5. Tell me when the revised mood board is approved. Keeping an image or accepting individual rows does not automatically approve the whole board.

Useful review notes: which references carry the right feeling; which are too colorful, clean, ornate or overtly monstrous; and how coarse the pixels, strong the outlines and exaggerated the proportions should be. The approved dark, pixelated balance is directed by the user; exact sprite scale and finish remain open for review.

The new [dress and equipment supplement](equipment/index.html) adds 23 separately pending choices for helmets, armor, weapons, clergy, townspeople and nobles. Each card has decisions and written commentary. Save its downloaded review as `art/mood-board/equipment/manifest.md`; the original 26-reference approval is retained.

The board approval is recorded in the checklist. Concept candidates are now being generated from the accepted references and the refined brief; review them in [the concept manifest](../concepts/manifest.md).

## Reference use

Downloaded images remain unchanged. The overview resizes them into a labeled contact sheet. Credits and licenses apply individually; links and terms are preserved in the manifest and source inventory. Game screenshots are labeled reference-only with no reuse permission inferred. This collection does not authorize placing source photographs, paintings or screenshots into the shipped game.

`art/.gdignore` keeps these reference and working-art folders out of Godot's import scan. The eventual runtime export location will be defined with the sprite specification.

Progress and approval gates: [art-production-checklist.md](../../docs/art-production-checklist.md). Tool and engine assessment: [art-tooling.md](../../docs/art-tooling.md).
