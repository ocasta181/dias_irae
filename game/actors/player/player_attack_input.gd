class_name PlayerAttackInput
extends Node

@export var attack: MeleeAttack


func _ready() -> void:
	assert(attack != null, "PlayerAttackInput requires a MeleeAttack dependency")


func _process(_delta: float) -> void:
	if Input.is_action_just_pressed("attack"):
		var _attacked: bool = attack.try_attack()


func on_defeated() -> void:
	set_process(false)
