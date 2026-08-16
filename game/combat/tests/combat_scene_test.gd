class_name CombatSceneTest
extends GdUnitTestSuite


func after_test() -> void:
	Input.action_release("attack")
	Input.action_release("restart")


func test_player_attack_damages_an_enemy_in_range() -> void:
	var runner: GdUnitSceneRunner = scene_runner("res://game/bootstrap/main.tscn")
	var player: PlayerController = runner.find_child("Player") as PlayerController
	var player_attack: MeleeAttack = player.get_node("MeleeAttack") as MeleeAttack
	var enemy: EnemyController = runner.find_child("Enemy") as EnemyController
	var enemy_health: HealthComponent = enemy.get_node("HealthComponent") as HealthComponent
	enemy.set_physics_process(false)
	enemy.position = Vector2(42.0, 0.0)
	await runner.simulate_frames(3)

	var attacked: bool = player_attack.try_attack()
	await runner.simulate_frames(1)

	assert_bool(attacked).is_true()
	assert_int(enemy_health.current_health()).is_less(enemy_health.maximum_health)


func test_enemy_pursues_the_player() -> void:
	var runner: GdUnitSceneRunner = scene_runner("res://game/bootstrap/main.tscn")
	var player: PlayerController = runner.find_child("Player") as PlayerController
	var enemy: EnemyController = runner.find_child("Enemy") as EnemyController
	var initial_distance: float = enemy.position.distance_to(player.position)

	await runner.simulate_frames(10)

	assert_float(enemy.position.distance_to(player.position)).is_less(initial_distance)


func test_player_defeat_ends_the_encounter() -> void:
	var runner: GdUnitSceneRunner = scene_runner("res://game/bootstrap/main.tscn")
	var player: PlayerController = runner.find_child("Player") as PlayerController
	var player_health: HealthComponent = player.get_node("HealthComponent") as HealthComponent
	var encounter: RoomEncounter = runner.find_child("RoomEncounter") as RoomEncounter

	var _result: DamageResult = player_health.receive_damage(Damage.new(100))
	await runner.simulate_frames(1)

	assert_str(encounter.current_message()).contains("YOU DIED")


func test_enemy_defeat_completes_the_encounter() -> void:
	var runner: GdUnitSceneRunner = scene_runner("res://game/bootstrap/main.tscn")
	var enemy: EnemyController = runner.find_child("Enemy") as EnemyController
	var enemy_health: HealthComponent = enemy.get_node("HealthComponent") as HealthComponent
	var encounter: RoomEncounter = runner.find_child("RoomEncounter") as RoomEncounter

	var _result: DamageResult = enemy_health.receive_damage(Damage.new(100))
	await runner.simulate_frames(1)

	assert_str(encounter.current_message()).contains("ENEMY DEFEATED")
