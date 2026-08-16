class_name WeaponPickup
extends Area2D

signal collected(item: ItemDefinition)

@export var item: ItemDefinition
var _is_collected: bool = false


func _ready() -> void:
	assert(item != null, "WeaponPickup requires an item definition")
	body_entered.connect(collect)


func collect(body: Node2D) -> void:
	if _is_collected or body is not PlayerController:
		return
	_is_collected = true
	collected.emit(item)
	queue_free()
