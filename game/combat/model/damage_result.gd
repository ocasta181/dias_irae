class_name DamageResult
extends RefCounted

var applied_damage: int:
	get:
		return _applied_damage

var remaining_health: int:
	get:
		return _remaining_health

var caused_defeat: bool:
	get:
		return _caused_defeat

var _applied_damage: int
var _remaining_health: int
var _caused_defeat: bool


func _init(applied: int, remaining: int, defeated: bool) -> void:
	_applied_damage = applied
	_remaining_health = remaining
	_caused_defeat = defeated
