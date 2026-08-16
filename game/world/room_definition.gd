class_name RoomDefinition
extends Resource

@export var room_name: String = "Unnamed chamber"
@export var enemy_position: Vector2 = Vector2(300.0, 0.0)
@export var accent: Color = Color("6d3928")
@export_range(1, 5, 1) var motif_count: int = 1
