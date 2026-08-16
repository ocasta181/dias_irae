class_name CombatantFeedback
extends Node

@export var target: CanvasItem

var _base_color: Color
var _tween: Tween


func _ready() -> void:
	assert(target != null, "CombatantFeedback requires a CanvasItem target")
	_base_color = target.modulate


func show_damage(_current: int, _maximum: int) -> void:
	if _tween != null:
		_tween.kill()
	target.modulate = Color(1.5, 1.5, 1.5, 1.0)
	_tween = create_tween()
	_tween.tween_property(target, "modulate", _base_color, 0.16)


func show_defeat() -> void:
	if _tween != null:
		_tween.kill()
	target.modulate = Color(0.19, 0.17, 0.16, 0.65)
