class_name MovementDirection
extends RefCounted


static func from_axes(horizontal: float, vertical: float) -> Vector2:
	return Vector2(horizontal, vertical).limit_length(1.0)
