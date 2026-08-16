class_name Health
extends RefCounted

var maximum: int:
	get:
		return _maximum

var current: int:
	get:
		return _current

var _maximum: int
var _current: int


func _init(maximum_health: int) -> void:
	assert(maximum_health > 0, "Maximum health must be positive")
	_maximum = maximum_health
	_current = maximum_health


func apply(damage: Damage) -> DamageResult:
	var previous_health: int = _current
	var was_depleted: bool = is_depleted()
	_current = maxi(_current - damage.amount, 0)

	return DamageResult.new(
		previous_health - _current,
		_current,
		not was_depleted and is_depleted()
	)


func is_depleted() -> bool:
	return _current == 0
