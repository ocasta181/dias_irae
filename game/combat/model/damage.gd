class_name Damage
extends RefCounted

var amount: int:
	get:
		return _amount

var _amount: int


func _init(value: int) -> void:
	assert(value > 0, "Damage must be positive")
	_amount = value
