class_name HealthBar
extends ProgressBar

@export var health_component: HealthComponent


func _ready() -> void:
	assert(health_component != null, "HealthBar requires a HealthComponent dependency")
	max_value = health_component.maximum_health
	value = health_component.current_health()
	health_component.health_changed.connect(_on_health_changed)


func _on_health_changed(current: int, _maximum: int) -> void:
	value = current
