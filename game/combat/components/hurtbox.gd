class_name Hurtbox
extends Area2D

@export var health_component: HealthComponent


func _ready() -> void:
	assert(health_component != null, "Hurtbox requires a HealthComponent dependency")


func receive_damage(damage: Damage) -> DamageResult:
	return health_component.receive_damage(damage)
