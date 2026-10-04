# Art generation and engine assessment

Assessment date: 2026-10-04. The original mood board is approved. Latest checkpoint: built-in generation paused after camera/proportion failures; [three alternative models](image-model-alternatives.md) researched against current provider documentation and Arena rankings. Proposed first test: MAI-Image-2.6. No external generator is selected or tested yet. Engine decisions remain provisional until the asset pilot is reviewed.

## Concept generation

The initial concepts used the built-in **ImageGen** tool available in this chat. It accepts image references and supports transparent outputs. Use a curated subset of accepted board images for each subject; the story provides identity, period kit and narrative constraints. Save results into `art/concepts/`, preserve exact prompts and reference identifiers, and review each candidate in the manifest.

Mood board approved in chat on 2026-10-04. The initial concept batch used the built-in ImageGen tool with local approved references and [the refined visual brief](../art/concepts/visual-brief.md). Further generation is paused for provider selection and a camera/proportion pilot.

The initial advantage was an available reference-driven generation and editing workflow without another account or integration. The user now explicitly requests a replacement provider after repeated camera and proportion failures. MAI-Image-2.6, Reve 2.1 and Grok Imagine Image 2.0 are documented in the linked comparison. No third-party service has been tested or selected. Do not claim one produces better results on this character without a comparison on the same brief.

Concept generation is not a guarantee of a usable sprite sheet. For sprite production, use accepted concepts to establish identity, generate a small pilot, then validate and assemble frames with deterministic tooling. Temporal consistency, fixed scale, clean alpha, anchors and grid placement must be checked. The latest direction is dark and pixelated with a cutesy feel, oversized heads and small bodies. Exact pixel density and edge treatment will be established through the selected approach and the pilot.

Prompt briefs carry the latest clarification explicitly: Hollow Knight and Castle Crashers guide cute large-head/small-body structure; oversized eyes were rejected. Diablo II supplies darkness, materials and the elevated isometric gameplay camera explicitly confirmed by the user. Guarin requires a full-face greathelm, with the anachronism deliberately authorized. The user selected S09 for continued development; S13 explored the elevated camera, then S14 was drawn from scratch at a higher angle. The user found S14 too steep and requested halfway between them. S15–S17 were further text-only attempts, but the user rejects their camera results and the drift toward human proportions. S13/S17 are preferred for texture only. Exact production projection and exaggerated proportions remain for the next provider pilot. Earlier comparisons and rejections are preserved in the concept manifest. The dated dress/equipment section has 36 active European references from the 12th–14th centuries, with separate pending selections; resume the remaining batch after camera and equipment review. The first alternative-model recommendation is MAI-Image-2.6 with a newly built three-dimensional composition guide that fixes the guide's camera elevation and exaggerated proportions; adherence in the generated result still requires review. This pilot is proposed, not yet generated.

The [imagegen skill](/Users/ocasta/.codex/skills/.system/imagegen/SKILL.md) supplied the initial built-in workflow. The user's replacement-provider request now governs tool selection. Configure the selected provider's access before the next trial and preserve its exact inputs and outputs.

## What exists here

`README.md` and `scripts/check.sh` specify Godot 4.7.1 and statically typed GDScript. The project already has player movement, melee combat, health, room progression, loot, spatial inventory and equipment, with automated checks. These were inspected, not run as part of this art task.

The existing slice draws placeholder isometric floor lines in `game/bootstrap/placeholder_room.gd`; it is not a finished story level or final art pipeline. `game/encounters/run_controller.gd` currently assembles a small room loop using authored `RoomDefinition` resources. Combat, actors, loot, world and encounters already have local boundaries.

## PresidentFighter lessons

The requested sibling path does not exist. The project was found at `../Personal/PresidentFighter` and inspected there.

Its stack is Phaser 3 inside Electron, TypeScript, electron-vite, pnpm, Vitest and Playwright. Useful examples:

- `tools/compile-game-content.mjs` compiles authored YAML (YAML Ain't Markup Language) into validated game content and checks references between items, enemies and levels.
- `src/renderer/game/content/registry.ts` supplies centralized content lookup.
- `docs/tiled-pilot-contract.md` defines a narrow spatial map contract, named markers and explicit collision behavior before integration.
- `tools/generate-sprite-assets.mjs` performs deterministic placeholder-image generation and alpha processing. Its current block-style assets are not the proposed visual treatment here.
- `package.json` exposes architecture, type, unit, smoke and packaged-build checks.

Carry forward explicit authored content, stable asset names, validation and small playable checks. Use native Godot resources/scenes where they already solve the problem; do not introduce a second content compiler or an Electron shell merely to copy that project.

## Engine comparison

Assumption: the game remains the sprite-based isometric action role-playing game described by this repository. Success requires legible combat, dark pixelated/cartoon sprites, interiors with occlusion, authored exploration and story encounters. The newly directed art language continues to fit the existing Godot sprite workflow.

| Option | Fit | Decision pressure |
|---|---|---|
| Godot | Native two-dimensional (2D) scenes, isometric tile sets, sprite animation, collision, navigation and light occlusion; existing implementation and domain tests | Best starting candidate. Validate depth sorting, room cutaways, sprite scale and animation import with the art pilot |
| Unity | Native isometric and Isometric Z as Y tilemaps, sprite tooling and a broader path into three-dimensional (3D) environments | Consider if approved art demands substantial 3D scenes, skeletal production, specialized integrations or team experience that outweighs rewriting the existing slice |
| Phaser + Electron | Isometric tilemaps are supported; PresidentFighter provides a working TypeScript desktop pipeline | Strongest if browser delivery or shared TypeScript tooling is decisive. It would require replacing the current Godot implementation and adapting the existing side-view content/collision assumptions |

**Provisional recommendation: keep Godot.** This is a judgment from the existing investment and the requested sprite workflow, not a benchmark result. Unity is viable, but using it does not remove the need for consistent art, animation or an authored level. There is currently no demonstrated requirement that makes an engine replacement the smaller solution.

Before full sprite production, prove a tiny scene with a character moving behind an occluding prop, one attack animation, a terrain transition and the desired lighting. Record any issue that changes the engine decision. Final sprite projection and scale must follow that decision.

Primary technical sources checked in this session:

- [Godot: using tile sets](https://docs.godotengine.org/en/stable/tutorials/2d/using_tilesets.html) — isometric tile shapes and per-tile collision, navigation and occlusion.
- [Unity: create an isometric tilemap](https://docs.unity.com/en-us/engine/6000.7/manual/unity2d/tilemaps/isometric-tilemap/create-isometric-tilemap) — native isometric grid options.
- [Phaser: tilemap functions](https://docs.phaser.io/api-documentation/function/tilemaps) — isometric tile-to-world conversion support.

## Verification boundaries

This phase adds reference images and documents. Runtime checks will be run when runtime code changes. Tests or migrations that delete database data require the separate explicit human approval specified by the project rules; general permission to test does not authorize deletion.
