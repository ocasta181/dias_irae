class_name EquipmentStatus
extends Label

@export var run: RunController


func _ready() -> void:
	assert(run != null, "EquipmentStatus requires a RunController dependency")
	run.equipment_changed.connect(_on_equipment_changed)


func _on_equipment_changed(message: String) -> void:
	text = message
