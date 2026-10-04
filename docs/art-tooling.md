# Art generation and engine assessment

Assessment date: 2026-10-04. The mood board and equipment board are approved. Grok's existing-login generation access works. The user discarded S24–S34 and requires every future iteration to start from a complete raw prompt in an independent session. Optional image inputs may come only from approved mood-board base references; prior generated concepts and guides are prohibited. [Generation instructions](grok-image-generation.md) record this rule. The latest rendering rule permits only flat 2D drawn art: no 2.5D appearance, rounded shading or metallic glints. The mood must convey grime, poverty and exhaustion. Complete raw prompts and actual parent image inspection remain mandatory. Current S55/S51/S52 style proposals use pixels, sparse ink and rough stencil; only S55 uses approved M22 base, with no previous concept input. Engine decisions remain provisional until the asset pilot is reviewed.

## Concept generation

The initial concepts used the built-in **ImageGen** tool available in this chat. It accepts image references and supports transparent outputs. Use a curated subset of accepted board images for each subject; the story provides identity, period kit and narrative constraints. Save results into `art/concepts/`, preserve exact prompts and reference identifiers, and review each candidate in the manifest.

Mood board approved in chat on 2026-10-04. The initial concept batch used the built-in ImageGen tool with local approved references and [the refined visual brief](../art/concepts/visual-brief.md). The next character work will use Grok for a camera/proportion pilot.

The initial advantage was an available reference-driven generation and editing workflow without another account or integration. The user explicitly requested a replacement provider after repeated camera and proportion failures, then selected Grok because they already have its account and CLI. MAI-Image-2.6, Reve 2.1 and Grok Imagine Image 2.0 are documented in the linked comparison. Grok's image tools were tested, but they did not expose the underlying image-model identifier. Prior-output editing is now prohibited; future trials must use independent raw prompts.

Concept generation is not a guarantee of a usable sprite sheet. For sprite production, use accepted concepts to establish identity, generate a small pilot, then validate and assemble frames with deterministic tooling. Temporal consistency, fixed scale, clean alpha, anchors and grid placement must be checked. The latest direction is dark and pixelated with a cutesy feel, oversized heads and small bodies. Exact pixel density and edge treatment will be established through the selected approach and the pilot.

Prompt briefs carry the latest clarification explicitly: Hollow Knight and Castle Crashers guide cute large-head/small-body structure; oversized eyes were rejected. Diablo II supplies dark materials and the elevated gameplay view. Guarin requires the explicitly allowed full-face greathelm. S09 remains written design direction; S13/S17 remain texture-preference history. None may be uploaded as a generation reference. The equipment supplement now has 42 approved references, with cultural/geographic limits and a strong 12th-century emphasis. The discarded S24–S34 batch and its generated geometry guides have been removed. State the intended camera, costume and proportions in full in each independent raw prompt; inspect each output before review.

The [imagegen skill](/Users/ocasta/.codex/skills/.system/imagegen/SKILL.md) supplied the initial built-in workflow. The user's replacement-provider request now governs tool selection. Grok's existing login and headless image-generation access are verified; preserve exact tool inputs and outputs during its next trial.

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
