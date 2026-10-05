# Deterministic export, playback and delivery

Read for stages 8–10. Source grids are authoring material; final atlases must be built from verified drawings by a deterministic exporter.

## Prepare source frames

- Preserve originals, exact source selection and editable files/rig when available. Extract only selected frame rectangles. Keep full-canvas placement, root, gear sweep and shadow/effect policy.
- Validate every required frame is present, nonempty and decodes. Detect overlapping figures, unexpected edge contacts, clipping, isolated debris and visible guide labels. Component detection can find regions, but separate sword/gear pixels may be legitimate; inspect ambiguous components.
- Check actual alpha. Inspect semitransparent edges on dark, pale and saturated backgrounds for matte fringes. Do not key out dark pixels from black metal or claim that a background removal succeeded because a file is named PNG.
- Keep a stable pixel grid for pixel art. Choose nearest/integer scaling according to the contract; painted art may need linear filtering. Any cleanup/resampling must be recorded, preserve anchors and pass the final sampling test.

## Metadata the engine must retain

Use its established format instead of imposing a second runtime schema. For every logical frame preserve stable ID, source page/rectangle, original logical canvas size, trim offset, origin/pivot, duration, clip/direction, source hash and any permitted packing rotation. Keep ordered clip membership, loop/one-shot/terminal behavior, held phases, events and transitions.

The contact/measurement record can remain an authoring sidecar. Do not assume the engine must load all review annotations. Never change a deployed interface to fit an exporter without the project's required schema approval.

For a logical root `P` and trim offset `O`, the root relative to trimmed pixels is `P − O`. Place trimmed pixels at `worldRoot − (P − O)` after scaling. Reconstruct the untrimmed logical canvas and compare it to the source frame; compare decoded pixels and placement, not just file hashes. Packing rotation additionally requires a correctly transformed rectangle/pivot and a consumer that supports it.

Do not let atlas placement determine draw order, animation order or world origin. Never omit intentional held frames/events just because identical textures can share one rectangle.

## Packing choices

Start with fixed cells when they simplify review; choose tight packing only after placement is established. Disable rotation unless the consumer supports it. Keep content rectangles distinct from extrusion/gutters.

Set padding, extrusion and page-border policy from actual filtering, zoom/minification and mipmaps. Two pixels of separation can be a starting hypothesis for simple non-mipmapped linear sampling; it is not a guarantee at every mip level or arbitrary atlas edge. Extrusion repeats edge pixels, while transparent gutters separate regions. Test both in the real sampler. Do not automatically require power-of-two pages when the target does not.

Choose page size from hardware/engine limits and scene residency. Uncompressed four-channel 8-bit memory is `width × height × 4` bytes before mipmaps; a 2048-square page is 16 mebibytes. PNG disk size does not predict resident texture memory. Avoid one giant campaign atlas loaded everywhere. Group by actual actor/scene usage and measure the imported footprint.

Use the project's exporter, Aseprite, TexturePacker or another verified tool. Pin/record version and actual options. Do not ask an image model to rearrange verified frames into the production atlas.

When Aseprite is already the authoring tool, an untrimmed diagnostic export can use this command-line interface (CLI) pattern, after creating the output folder:

```sh
aseprite --batch hero.aseprite --sheet-type rows --sheet-columns 8 \
  --border-padding 2 --shape-padding 2 --extrude \
  --list-tags --list-slices --format json-array \
  --sheet output/hero-review.png --data output/hero-review.json
```

These options produce example diagnostic settings, not an engine-neutral guarantee. Check the installed version's help, adapt paths/columns and sampler budgets, and use new destination filenames. Trimming/packed production export must retain the original placement metadata and pass reconstruction. Do not claim this command was executed if it was only documented.

Primary export references: [Aseprite CLI](https://www.aseprite.org/docs/cli/), [Aseprite sheets](https://www.aseprite.org/docs/sprite-sheet/) and [TexturePacker settings](https://www.codeandweb.com/texturepacker/documentation/texture-settings). Verify current tool documentation when using or changing version-sensitive flags.

## Playback acceptance matrix

Load the actual final atlas and metadata through the intended consumer. A GIF of raw drawings cannot verify trimming, pivots, engine timing or filtering.

| Test | Concrete observation |
|---|---|
| Every action × direction | Correct source selection, pose order, anatomy and complete gear at intended size. |
| In-place and moving-root walk | Ground marks stay under planted contacts; lift/direction and stride/travel agree. |
| Loop seam | Last→first has expected next-step spacing, no inserted duplicate pause or texture flash. |
| Quiet idle | Locked contacts remain still; requested breathing stays within the contract. |
| Start/stop/turn | Test releases and turns from each meaningful support phase; no delayed input, foot teleport or root jump. |
| Movement/action recovery | Movement consumes only allowed time; strike facing/contact/recovery follow the game contract. |
| Held guard/prayer | Entry, stable hold and exit work without replaying entry. Early release and interruption recover correctly. |
| Hit/death | Canceled events do not fire; terminal pose remains until the specified reset/game transition. |
| Timing and delayed updates | Equivalent elapsed time yields the same pose/events/travel across different update schedules. |
| Filter, zoom and background | No neighboring texture bleed, halos, cropped tips or loss of required readability. |
| Equipment combinations | Attachment/occlusion still work for every required variant; no unintended mirroring. |

Use elapsed timestamps for browser/engine playback, positive per-frame durations and bounded update partitioning at action boundaries. Account for intentional held drawings; distinguish unique pose count from frame-entry count. Test loops/events and travel separately from style.

When a character tester is in scope, reuse or create a small control surface: keyboard movement, action key, named sequences, pause/step, facing/clip selection, slow speed, background/sampling controls and contact overlays. Include input release, focus loss and takeover during a preset. Use a local server/process when required; the tester must not depend on a transient chat tool session. Keep diagnostic controls separate from game mechanics.

For Godot, its [SpriteFrames](https://docs.godotengine.org/en/stable/classes/class_spriteframes.html) duration is relative duration divided by animation rate and playback speed. [Godot image importing](https://docs.godotengine.org/en/stable/tutorials/assets_pipeline/importing_images.html) documents lossless 2D import defaults and where filtering is set. For a browser tester, [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) supplies an elapsed-time clock and may pause in background tabs. Read the documentation for the actual target/version rather than port these details unchanged to another engine.

## Finish checklist

- Required action/direction/variant inventory is complete; optional or missing rows are named.
- Source lineage, tool/version/options, requests and original outputs are recorded. Source selection is reproducible.
- Motion plan, measured-art checks and runtime checks are distinct and pass their own budgets.
- All required visual inspections are complete, including reduced-size motion and difficult views. Open defects are not hidden behind automated passes.
- Atlas alpha, regions, clipping, placement reconstruction, timing, tags/events, sampling and memory pass in the actual consumer.
- Original/editable sources, final alpha pages, native metadata/resources, reproducible export and playback evidence are delivered at exact paths.
- Existing human approval gates are satisfied, or the package is accurately marked candidate/study and those gates remain open.

Report production readiness only after this checklist passes. If a tool cannot meet a required property, deliver the useful verified artifacts with the precise limitation; do not invent a successful image, skipped test, achieved camera angle or approval.
