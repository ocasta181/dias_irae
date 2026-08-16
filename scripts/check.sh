#!/bin/sh
set -eu

script_directory=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
project_root=$(CDPATH= cd -- "$script_directory/.." && pwd)
godot_binary=${DIAS_IRAE_GODOT_BIN:-godot}

if ! command -v "$godot_binary" >/dev/null 2>&1; then
	echo "Godot was not found. Set DIAS_IRAE_GODOT_BIN to the Godot executable."
	exit 1
fi

installed_version=$("$godot_binary" --version)
case "$installed_version" in
	4.7.1.stable.*) ;;
	*)
		echo "Expected Godot 4.7.1-stable, found $installed_version."
		exit 1
		;;
esac

cd "$project_root"
"$godot_binary" --headless --editor --path "$project_root" --quit
"$godot_binary" \
	--headless \
	--path "$project_root" \
	-s res://addons/gdUnit4/bin/GdUnitCmdTool.gd \
	--ignoreHeadlessMode \
	-a game
"$godot_binary" --headless --path "$project_root" --quit-after 2
