class_name AttackFlash
extends Node

@export var target: CanvasItem
@export_range(0.01, 1.0, 0.01, "or_greater") var duration: float = 0.12

var _base_color: Color
var _tween: Tween


func _ready() -> void:
	assert(target != null, "AttackFlash requires a CanvasItem target")
	_base_color = target.modulate
	target.visible = false


func play() -> void:
	if _tween != null:
		_tween.kill()
	target.visible = true
	target.modulate = _base_color
	_tween = create_tween()
	_tween.tween_property(target, "modulate:a", 0.0, duration)
	_tween.tween_callback(target.set_visible.bind(false))
