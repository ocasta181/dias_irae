class_name WeaponPickup
extends Area2D

signal collected(weapon: WeaponDefinition)

@export var weapon: WeaponDefinition
var _is_collected: bool = false


func _ready() -> void:
	assert(weapon != null, "WeaponPickup requires a weapon definition")
	body_entered.connect(collect)


func collect(body: Node2D) -> void:
	if _is_collected or body is not PlayerController:
		return
	_is_collected = true
	collected.emit(weapon)
	queue_free()
