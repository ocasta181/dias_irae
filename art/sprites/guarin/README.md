# Guarin animation study

Open [the motion lab](http://127.0.0.1:8765/art/sprites/guarin/viewer/index.html). The existing art server runs as the macOS login service `com.diasirae.art-server`, independent of Codex. It starts at login and restarts if its process exits. It listens only on this computer, at `127.0.0.1:8765`, and uses Homebrew Python with the standard library. The app needs no package install or build step.

The workstation configuration is [scripts/art-server.plist](../../../scripts/art-server.plist). Install it from the project root:

```sh
mkdir -p "$HOME/Library/LaunchAgents" "$HOME/Library/Logs/DiasIrae"
cp scripts/art-server.plist "$HOME/Library/LaunchAgents/com.diasirae.art-server.plist"
launchctl bootstrap "gui/$(id -u)" "$HOME/Library/LaunchAgents/com.diasirae.art-server.plist"
```

Check the service with `launchctl print "gui/$(id -u)/com.diasirae.art-server"`. Restart it with `launchctl kickstart -k "gui/$(id -u)/com.diasirae.art-server"`. Stop it with `launchctl bootout "gui/$(id -u)/com.diasirae.art-server"`; use the bootstrap command to start it again. Logs are in `~/Library/Logs/DiasIrae/`. The configuration contains this workstation's absolute project, Python and log paths; update them if the project moves.

Selected style: G15 / S13, captured after inventory verification on 2026-10-05 local time. The selected gameplay screen and its original character were actual image inputs in every generation. The logical sheet contains **384 drawn poses, eight directions, eight state families, and twelve playback tags per direction**. It uses twelve original transparent PNG pages: six east cut poses, six southwest hurt poses and six southeast guard poses and six front hurt poses come from separate repaired pages. Source rasters remain unchanged.

The default view is a controllable character stage with six side-panel presets: walk/strike/walk, eight-direction walking, guard/release/strike, kneel/pray/rise, hurt/defeat, and a full state tour. Movement and strike cancel a running preset. Reset returns the character to the starting position. The defeat pose remains held until reset.

Open **Inspect frames and animation settings** for the clip selector, action controls, pause/step/scrub, rate, speed, size, previous pose, foot guide, backgrounds and sampling modes. Inspection tools and guides start collapsed/off. The clip selector is a diagnostic override; action controls use entry/hold/exit behavior. Manual inspection cancels a running preset.

Keyboard controls work across the page, except while editing inputs: arrows or W/A/S/D move; Space strikes; G guards while held; P starts/stops prayer; H applies hurt; K defeats; R resets. Movement resumes playback and cancels a running preset. Defeat stays on its final corpse frame. This does not add gameplay mechanics or change combat timing in Godot.

Review decisions and comments belong in [manifest.md](manifest.md). Parent findings are in [assessment.md](assessment.md). Final export and game integration need visual approval. Draft campaign actions P09–P23 are listed in the [campaign inventory](../asset-list.md), not marked produced.

Rebuild measured frame data with `inspect_sheets.py` using Python with Pillow and NumPy. The bundled runtime used for this checkpoint is `/Users/ocasta/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3`. Run `node --test art/sprites/guarin/viewer/*.test.mjs` from the project root for 25 deterministic timing, transition and keyboard-controller tests. Updates crossing strike recovery move the character only for the remaining walking time, independent of display refresh. Preset actions also retain their exact scheduled start times across delayed updates. The importer fails if it cannot locate 48 figures on a page; do not bypass that check.

`active-pages.json` chooses the eight direction bases. `row-overrides.json` selects narrowly repaired families. `atlas.json` stores original source paths, measured frame rectangles, foot offsets, source standing heights, unequal durations, and preview events. `validation.json` reports transparent regions, distinct hashes, and source-page border contacts. Hashes prove different pixels rather than correct motion. Foot pivots and camera calibration remain provisional.

The ground guide uses a 45-degree elevated orthographic projection. Its vertical/horizontal ground ratio is sin(45°), about 0.7071, shared by grid lines and preview movement. It does not certify the camera angle of the generated artwork.
