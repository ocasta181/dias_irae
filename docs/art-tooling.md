# Art generation and engine assessment

Assessment updated: 2026-10-05. The mood board and equipment board are approved, with cultural and geographic limits. The 24 gameplay screens, first Guarin sprite study and 45 equipment/cast candidates are available for review. Engine decisions remain provisional until the asset pilot is reviewed. [The checklist](art-production-checklist.md) records the approval gates.

## Current generation rules

Use a complete written prompt and the exact selected upstream image for each production stage. Approved mood-board images feed character exploration; the selected character feeds gameplay exploration. The Guarin sprite pilot uses exact **G15 / S13** images. The equipment/cast exploration uses the unchanged original **S13**. Preserve source and output bytes, record actual tool inputs and hashes, and inspect every result before presentation.

The user's later exact-image instructions supersede the earlier blanket prohibition on generated character references. Failed attempts, generated guides, composites and previous session history remain prohibited as inputs. This resolution is recorded at commit `3082452`, confidence 100%, based on the explicit production-chain and S13 instructions. Use [the generation instructions](grok-image-generation.md), [visual brief](../art/concepts/visual-brief.md) and each stage's saved requests for the precise inputs.

Only two-dimensional (2D) drawn art is allowed. Retain the selected source's medium, huge head, tiny squat body, short limbs and small eyes. Hollow Knight and Castle Crashers guide character structure; Diablo II remains relevant to darkness, materials and the elevated gameplay view. Preserve grime, poverty and exhaustion. The intended camera is about 45 degrees above ground; a numeric prompt does not prove that the output is calibrated.

Guarin's full-face greathelm is an explicitly permitted anachronism. Other equipment is predominantly 12th century, with named early-13th comparisons and regional construction limits. The latest requested Malta study is a labeled later heraldic exception, not evidence of a 1101 uniform. [The equipment/cast plan](../art/concepts/expansion/README.md) records dates, origins and exceptions.

## Generation tools and delivery

Grok's existing login and headless image-generation access were verified on 2026-10-04. Its restricted command-line workflow creates an independent session for each prompt, uses native `image_edit` for exact references, and records actual calls. The tool result does not expose the underlying image-model identifier. Connection facts and earlier experiments remain in [the Grok record](grok-image-generation.md).

The user subsequently authorized both Grok and the built-in image generator for gameplay exploration. Both providers received the exact selected character images. The built-in generator produced the Guarin pilot and the latest S13 equipment/cast exploration. The [imagegen skill](/Users/ocasta/.codex/skills/.system/imagegen/SKILL.md) documents its workflow. There is no current blanket restriction to one provider.

- [24 gameplay screens](../art/concepts/gameplay/index.html): four selected character bases, six scene explorations per base. Review remains open.
- [Guarin motion lab](../art/sprites/guarin/viewer/index.html): 384 source poses, eight directions and twelve playback tags per direction. Final visual approval, export scale, pivots and camera calibration remain open.
- [45 equipment/cast candidates](../art/concepts/index.html#current-styles): seven equipment/face groups of five, plus ten named characters. All decisions remain pending.

Concept generation does not guarantee a usable sprite sheet. Validate motion, scale, alpha, anchors, transitions and atlas bounds with deterministic tooling and actual playback. Distinct image hashes prove different pixels, not correct animation. Further sprite categories and first-level integration require the reviews recorded in the checklist.

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

The current sprite preview has 25 passing timing, transition and keyboard tests. Its browser rendering and presets are inspected separately; these checks do not approve the source art or verify game combat. The Godot runtime was not changed by this preview work. Tests or migrations that delete database data require the separate explicit human approval specified by the project rules; general permission to test does not authorize deletion.
