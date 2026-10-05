# Guarin animation study

Open [the motion lab](http://127.0.0.1:8765/art/sprites/guarin/viewer/index.html). The existing art server is `python3 scripts/serve_art.py --port 8765` from the project root. The app needs no package install, new service, endpoint, database, or build step.

Selected style: G15 / S13, captured after inventory verification on 2026-10-05 local time. The selected gameplay screen and its original character were actual image inputs in every generation. The logical sheet contains **384 drawn poses, eight directions, eight state families, and twelve playback tags per direction**. It uses ten original transparent PNG pages: six east cut poses and six southwest hurt poses come from separate repaired pages. Source rasters remain unchanged.

The default view is a controllable character stage with six side-panel presets: walk/strike/walk, eight-direction walking, guard/release/strike, kneel/pray/rise, hurt/defeat, and a full state tour. Movement and strike cancel a running preset. Reset returns the character to the starting position. The defeat pose remains held until reset.

Open **Inspect frames and animation settings** for the clip selector, action controls, pause/step/scrub, rate, speed, size, previous pose, foot guide, backgrounds and sampling modes. Inspection tools and guides start collapsed/off. The clip selector is a diagnostic override; action controls use entry/hold/exit behavior. Manual inspection cancels a running preset.

Keyboard controls work across the page, except while editing inputs: arrows or W/A/S/D move; Space strikes; G guards while held; P starts/stops prayer; H applies hurt; K defeats; R resets. Movement resumes playback and cancels a running preset. Defeat stays on its final corpse frame. This does not add gameplay mechanics or change combat timing in Godot.

Review decisions and comments belong in [manifest.md](manifest.md). Parent findings are in [assessment.md](assessment.md). Final export and game integration need visual approval. Draft campaign actions P09–P23 are listed in the [campaign inventory](../asset-list.md), not marked produced.

Rebuild measured frame data with `inspect_sheets.py` using Python with Pillow and NumPy. The bundled runtime used for this checkpoint is `/Users/ocasta/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3`. Run `node --test art/sprites/guarin/viewer/*.test.mjs` from the project root for 23 deterministic timing, transition and keyboard-controller tests. Updates crossing strike recovery move the character only for the remaining walking time, independent of display refresh. Preset actions also retain their exact scheduled start times across delayed updates. The importer fails if it cannot locate 48 figures on a page; do not bypass that check.

`active-pages.json` chooses the eight direction bases. `row-overrides.json` selects narrowly repaired families. `atlas.json` stores original source paths, measured frame rectangles, foot offsets, source standing heights, unequal durations, and preview events. `validation.json` reports transparent regions, distinct hashes, and source-page border contacts. Hashes prove different pixels rather than correct motion. Foot pivots and camera calibration remain provisional.
