# Sprite production and animation specification

Researched 2026-10-05 before the inventory was defined. Scope: a flat 2D, elevated-view action game in the existing Godot project. These are verified tooling facts plus explicit project choices, not a claim that every game must use the same dimensions or frame rate.

## Findings from primary documentation

1. Godot supports individual frames and sprite-sheet regions through `AnimatedSprite2D`/`SpriteFrames`, or discrete frame tracks through `AnimationPlayer`. Use a frame-based pipeline for this drawn art. [Godot sprite animation](https://docs.godotengine.org/en/stable/tutorials/2d/2d_sprite_animation.html)
2. Frame duration can vary. Godot derives duration from the frame's relative duration, animation rate, and playing speed. Frame count alone does not define the timing or weight of an action. [SpriteFrames timing](https://docs.godotengine.org/en/stable/classes/class_spriteframes.html)
3. Raster frame animations need discrete selection rather than a transparent crossfade between two poses. Godot's animation-tree documentation specifically discusses discrete modes for frame-by-frame animation. [AnimationTree](https://docs.godotengine.org/en/stable/tutorials/animation/animation_tree.html)
4. Aseprite exports tagged sprite sheets plus JSON data; slices can hold anchor information. Keep machine-readable frame order, timing, tags, and anchors with the art. Do not infer a runtime contract from filenames alone. [Sprite sheets](https://www.aseprite.org/docs/sprite-sheet/), [export options](https://www.aseprite.org/api/command/ExportSpriteSheet), [slices](https://www.aseprite.org/docs/slices/)
5. Atlas packing, trimming, spacing, and extrusion are distinct operations. Trimming must retain the original placement so an actor does not jump. At least two pixels of shape spacing and edge extrusion are useful against neighboring-texture bleed; choose exact export options with the runtime sampler. Multiple pages are supported when a sheet exceeds its size limit. [TexturePacker settings](https://www.codeandweb.com/texturepacker/documentation/texture-settings), [command-line layout](https://www.codeandweb.com/texturepacker/documentation/commandline/parameters)
6. PNG retains alpha. Godot's default lossless, non-mipmapped 2D imports are an appropriate starting point; pixel-art filtering is selected on the drawing node in Godot 4. Painted sprites can use linear filtering after bleed tests. Mipmaps are conditional on actual zoom/minification, not universally forbidden. [Godot image importing](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_images.html)
7. Browser previews must use elapsed timestamps. Counting display callbacks would make animation run faster on a high-refresh monitor. Background tabs also pause animation callbacks. [MDN requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
8. Combat and audio events can be timed separately from visible frames. Godot supports method/audio animation tracks. The viewer will display proposed event markers; it will not silently move the existing game's instant melee damage to a different time. [Animation track types](https://docs.godotengine.org/en/stable/tutorials/animation/animation_track_types.html)

## Project choices for the first character sheet

- Match the captured #1 gameplay screen's palette, material marks, edge treatment, and character costume. Supply the exact screen and its original character as upstream reference images. Do not supply prior failed sprite attempts.
- Flat drawn 2D only. Oversized head/helmet, tiny short body, squat limbs. Dark, dirty, poor, worn, weary. No polished armor, enormous eyes, clean toy rendering, or volumetric plastic shading.
- Eight directions, independently authored; right sword hand and left shield hand remain anatomically fixed. No automatic horizontal flip of asymmetrical gear.
- Camera production target: orthographic elevated view, about 45 degrees above the ground, readable helmet top and compressed torso. Generated art cannot prove its camera angle; consistency is visually assessed and remains provisional until a calibrated engine-scale test.
- First art budget: eight direction pages, six columns and eight action rows, 48 distinct drawn cells per page. Rows: idle, walk, cut, guard, hurt, death, interact, prayer. Manifest may crop individual irregularly placed frames; never trust model grid placement without measuring it.
- Preserve original generated page bytes. The viewer can extract rectangles without altering them. Any later atlas packing must be a deterministic export operation with original size and pivot retained, not a creative redraw or motion synthesis.
- Original frame boxes include full helmet, shield, sword, boots, and action sweep. No labels, ground scenery, or baked HUD inside the sheets. Transparent background. Shadow is a separate viewer/runtime layer.
- Fixed foot pivot in a common logical canvas; retain source box and offset. Align frames with measured offsets, not by stretching the actor. Collapsed/dead poses preserve the same world origin.
- Start at a 128–160 pixel tall on-screen adult silhouette at an inspectable reference scale, then test at 64–96 pixels for zoomed-out play. These are preview sizes, not a final game-resolution commitment. Character/world scale must be tested together.
- Idle 6 FPS, walk 8, attack nominal 12, hurt/guard transitions 10, death/interact/rite entry 8, prayer/guard hold 6. Rates and unequal durations are tunable. Display rendering and game simulation clocks remain independent.
- Atlas-page cap for later export: 2048×2048 first, split as needed. Four-channel 8-bit uncompressed pixels use width × height × 4 bytes before mipmaps: a 2048 page is 16 MiB. Do not pack the entire campaign into one enormous texture. Limit resident pages by scene/actor, and measure memory on the target platform.
- Fixed-cell, unrotated pages are easiest for first review. Optimize packing after quality and scale are accepted. An engine-ready tight atlas needs padding/extrusion, original canvas/offset data, and a sampling test. The first generated grids are diagnostic source sheets until they pass those gates.

## Transitions and timing

The character has twelve clips derived from eight drawn rows. Guard and prayer have explicit entry/hold/exit tags. Held phases do not replay kneeling or shield lowering. Walk facing changes keep normalized gait phase; one-shot actions lock facing until their recovery unless a future mechanic explicitly permits aiming.

| From | Input / result | Next | Rule |
|---|---|---|---|
| Idle / walk | movement | walk / idle | Retain facing when movement stops. |
| Idle / walk | cut / interact | action | Reset once; repeated press must not restart anticipation forever. |
| Action | clip completes | idle or walk | Return to current locomotion intention. |
| Idle / walk | guard held | guard-in → guard-hold | Release uses guard-out; no cut through the raised shield by accident. |
| Idle / walk | pray | kneel → channel | Stop prayer uses rise. |
| Living state | damage | hurt | Interrupt action or channel; no phantom impact from canceled attack. |
| Living state | defeat | death | Terminal; final corpse frame holds. |
| Death | debug reset | idle | Explicit viewer action, not a game resurrection mechanic. |

Clip events include attack contact and interaction contact. Future guard success, dagger release, rite completion, and effect/sound starts enter the data before integration. Game damage must be authoritative; a sprite callback is not the sole combat rule. Input buffering, invulnerability, cancel windows, root motion, and cooldowns are mechanics to agree before game integration; they are not invented by a preview.

Use variable holds to keep anticipation readable and impact brief. Do not duplicate the first frame at the end of a loop by habit; that can add a hitch. A repeated drawing is valid as a deliberately held pose, not as evidence of a new motion frame. The viewer must make distinct-pose counts and missing/held cells visible.

## Quality gates and continuous improvement

- [ ] Log upstream selection, exact references, generation prompt, output hash, dimensions, and actual alpha.
- [ ] Inspect every direction and action for identity, short proportions, complete weapons, closed/open helm per winner, fixed handedness, and elevated-view consistency.
- [ ] Measure each source frame rectangle, occupied bounds, empty cells, clipping, duplicates, and pivot offsets.
- [ ] Play every loop and one-shot at actual size and slow motion; inspect both ends of loops and entry/hold/exit transitions.
- [ ] Test idle→walk→cut→walk, guard release, prayer interruption, hurt recovery, and death holding.
- [ ] Check chosen sampling mode on contrasting backgrounds and at reduced scale; confirm no neighboring cell bleed.
- [ ] Record defects by page/action/direction, repair from the upstream references, rerun affected checks, and keep previous attempts in the provenance record.
- [ ] Require user visual approval before promoting the pilot to final game assets.

The generator may produce wrong facings, similar poses, grid drift, or costume drift even when the prompt is explicit. A completed tool call only proves that an image exists. Missing states stay marked missing. Timing controls cannot repair bad drawings. No frame may be presented as a walk, attack, or new direction merely by translating, rotating, or recoloring a static character image.
