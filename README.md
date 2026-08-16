# Dias Irae

An isometric action role-playing game built with Godot 4.7.1 and statically typed GDScript.

## Play the combat slice

Open `project.godot` in Godot 4.7.1 and run the main scene. Move with the W, A, S, and D keys or the arrow keys. Attack with Space or the left mouse button. Press I to open or close inventory. Walk over loot to collect it and press E to equip it. After completing the run or dying, press R to restart.

## Verify the project

Run `scripts/check.sh`. If Godot is not available as `godot`, provide its executable path:

```sh
DIAS_IRAE_GODOT_BIN="/path/to/Godot" scripts/check.sh
```

The check imports the project, runs the automated tests, and starts the main scene headlessly as a smoke test.

See [`docs/architecture.html`](docs/architecture.html) for the domain boundaries and phased implementation plan.
