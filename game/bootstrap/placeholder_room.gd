class_name PlaceholderRoom
extends Node2D

const HALF_WIDTH: float = 1100.0
const HALF_HEIGHT: float = 700.0
const GRID_STEP: float = 64.0
const GRID_SLOPE: float = 0.5


func _draw() -> void:
	draw_rect(
		Rect2(-HALF_WIDTH, -HALF_HEIGHT, HALF_WIDTH * 2.0, HALF_HEIGHT * 2.0),
		Color("12100f")
	)

	for offset: int in range(-28, 29):
		var center_y: float = float(offset) * GRID_STEP
		draw_line(
			Vector2(-HALF_WIDTH, center_y - HALF_WIDTH * GRID_SLOPE),
			Vector2(HALF_WIDTH, center_y + HALF_WIDTH * GRID_SLOPE),
			Color("272320"),
			1.0
		)
		draw_line(
			Vector2(-HALF_WIDTH, center_y + HALF_WIDTH * GRID_SLOPE),
			Vector2(HALF_WIDTH, center_y - HALF_WIDTH * GRID_SLOPE),
			Color("272320"),
			1.0
		)

	var room_outline: PackedVector2Array = PackedVector2Array([
		Vector2(0.0, -520.0),
		Vector2(900.0, 0.0),
		Vector2(0.0, 520.0),
		Vector2(-900.0, 0.0),
		Vector2(0.0, -520.0),
	])
	draw_polyline(room_outline, Color("514840"), 3.0, true)
	draw_circle(Vector2.ZERO, 92.0, Color(0.51, 0.21, 0.12, 0.16))
	draw_circle(Vector2.ZERO, 90.0, Color("6d3928"), false, 2.0, true)
