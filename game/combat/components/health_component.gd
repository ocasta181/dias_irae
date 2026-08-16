class_name HealthComponent
extends Node

signal health_changed(current: int, maximum: int)
signal defeated

@export_range(1, 10000, 1, "or_greater") var maximum_health: int = 100

var _health: Health


func _ready() -> void:
	_health = Health.new(maximum_health)


func receive_damage(damage: Damage) -> DamageResult:
	var result: DamageResult = _health.apply(damage)
	if result.applied_damage > 0:
		health_changed.emit(_health.current, _health.maximum)
	if result.caused_defeat:
		defeated.emit()
	return result


func current_health() -> int:
	return _health.current


func is_depleted() -> bool:
	return _health.is_depleted()
