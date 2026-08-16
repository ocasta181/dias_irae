# Dias Irae

An isometric action role-playing game built with Godot 4.7.1 and statically typed GDScript.

## Run the foundation build

Open `project.godot` in Godot 4.7.1 and run the main scene. Move the placeholder character with the W, A, S, and D keys.

## Verify the project

Run `scripts/check.sh`. If Godot is not available as `godot`, provide its executable path:

```sh
DIAS_IRAE_GODOT_BIN="/path/to/Godot" scripts/check.sh
```

The check imports the project, runs the automated tests, and starts the main scene headlessly as a smoke test.

See [`docs/architecture.html`](docs/architecture.html) for the domain boundaries and phased implementation plan.
