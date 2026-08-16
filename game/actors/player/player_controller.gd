class_name PlayerController
extends CharacterBody2D

@export_range(0.0, 1000.0, 10.0, "or_greater") var move_speed: float = 260.0
@export var input_source: PlayerInput


func _ready() -> void:
	assert(input_source != null, "PlayerController requires a PlayerInput dependency")


func _physics_process(_delta: float) -> void:
	velocity = input_source.movement_direction() * move_speed
	var _collided: bool = move_and_slide()


func on_defeated() -> void:
	velocity = Vector2.ZERO
	set_physics_process(false)
