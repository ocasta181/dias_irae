# Guarin animation study

Open [the motion lab](http://127.0.0.1:8765/art/sprites/guarin/viewer/index.html). The existing art server is `python3 scripts/serve_art.py --port 8765` from the project root. The app needs no package install, new service, endpoint, database, or build step.

Selected style: G15 / S13, captured after inventory verification on 2026-10-05 local time. The selected gameplay screen and its original character were actual image inputs in every generation. The logical sheet contains **384 drawn poses, eight directions, eight state families, and twelve playback tags per direction**. It uses nine original transparent PNG pages: the six east cut poses come from a separate repaired page. Source rasters remain unchanged.

Use the clip selector to inspect a tag, or action buttons to test transitions. Pause, step or scrub to inspect individual poses. Adjust rate, speed and standing height; show the previous pose or foot guide; compare contrasting backgrounds and both sampling modes. Stage size controls keep complete pose bounds visible. Action buttons use entry/hold/exit behavior; the selector is a deliberate diagnostic override. Manual inspection cancels the scripted transition demonstration.

Focus the stage for keyboard controls: arrows or W/A/S/D move; Space cuts; G guards while held; P starts/stops prayer; H applies hurt; K defeats; R resets. Defeat stays on its final corpse frame. This does not add gameplay mechanics or change combat timing in Godot.

Review decisions and comments belong in [manifest.md](manifest.md). Parent findings are in [assessment.md](assessment.md). Final export and game integration need visual approval. Draft campaign actions P09–P23 are listed in the [campaign inventory](../asset-list.md), not marked produced.

Rebuild measured frame data with `inspect_sheets.py` using Python with Pillow and NumPy. The bundled runtime used for this checkpoint is `/Users/ocasta/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3`. Run `node --test art/sprites/guarin/viewer/animation.test.mjs` from the project root for the twelve deterministic timing and transition tests. The importer fails if it cannot locate 48 figures on a page; do not bypass that check.

`active-pages.json` chooses the eight direction bases. `row-overrides.json` selects narrowly repaired families. `atlas.json` stores original source paths, measured frame rectangles, foot offsets, source standing heights, unequal durations, and preview events. `validation.json` reports transparent regions, distinct hashes, and source-page border contacts. Hashes prove different pixels rather than correct motion. Foot pivots and camera calibration remain provisional.
