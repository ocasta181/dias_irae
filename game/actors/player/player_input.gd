class_name PlayerInput
extends Node


func movement_direction() -> Vector2:
	return MovementDirection.from_axes(
		Input.get_axis("move_left", "move_right"),
		Input.get_axis("move_up", "move_down")
	)
