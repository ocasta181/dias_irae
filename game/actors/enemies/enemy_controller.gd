class_name EnemyController
extends CharacterBody2D

@export var target: Node2D
@export var target_health: HealthComponent
@export var attack: MeleeAttack
@export_range(0.0, 1000.0, 10.0, "or_greater") var move_speed: float = 145.0
@export_range(1.0, 500.0, 1.0, "or_greater") var attack_distance: float = 48.0


func _ready() -> void:
	assert(target != null, "EnemyController requires a target")
	assert(target_health != null, "EnemyController requires target health")
	assert(attack != null, "EnemyController requires a MeleeAttack dependency")


func _physics_process(_delta: float) -> void:
	if target_health.is_depleted():
		velocity = Vector2.ZERO
		return

	var offset: Vector2 = target.global_position - global_position
	if offset.length() > attack_distance:
		velocity = offset.normalized() * move_speed
		var _collided: bool = move_and_slide()
	else:
		velocity = Vector2.ZERO
		var _attacked: bool = attack.try_attack()


func on_defeated() -> void:
	velocity = Vector2.ZERO
	set_physics_process(false)
	collision_layer = 0
	collision_mask = 0
