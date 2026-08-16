class_name MeleeAttack
extends Node

signal performed

@export var attack_area: Area2D
@export_range(1, 10000, 1, "or_greater") var damage_amount: int = 10
@export_range(0.05, 10.0, 0.05, "or_greater") var cooldown_seconds: float = 0.5

var _cooldown_remaining: float = 0.0
var _damage_bonus: int = 0


func _ready() -> void:
	assert(attack_area != null, "MeleeAttack requires an attack Area2D dependency")


func _physics_process(delta: float) -> void:
	_cooldown_remaining = maxf(_cooldown_remaining - delta, 0.0)


func try_attack() -> bool:
	if _cooldown_remaining > 0.0:
		return false

	_cooldown_remaining = cooldown_seconds
	performed.emit()
	var damage: Damage = Damage.new(current_damage())
	for area: Area2D in attack_area.get_overlapping_areas():
		var hurtbox: Hurtbox = area as Hurtbox
		if hurtbox != null:
			var _result: DamageResult = hurtbox.receive_damage(damage)
	return true


func equip_damage_bonus(value: int) -> void:
	assert(value >= 0, "Equipment damage bonus cannot be negative")
	_damage_bonus = value


func current_damage() -> int:
	return damage_amount + _damage_bonus
