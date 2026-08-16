class_name CombatSceneTest
extends GdUnitTestSuite


func after_test() -> void:
	Input.action_release("attack")
	Input.action_release("restart")
	Input.action_release("equip")
	Input.action_release("inventory")


func test_inventory_panel_opens_and_closes() -> void:
	var runner: GdUnitSceneRunner = scene_runner("res://game/bootstrap/main.tscn")
	var inventory_panel: InventoryPanel = runner.find_child("InventoryPanel") as InventoryPanel

	assert_bool(inventory_panel.is_open()).is_false()
	inventory_panel.toggle_inventory()
	assert_bool(inventory_panel.is_open()).is_true()
	inventory_panel.toggle_inventory()
	assert_bool(inventory_panel.is_open()).is_false()


func test_player_attack_damages_an_enemy_in_range() -> void:
	var runner: GdUnitSceneRunner = scene_runner("res://game/bootstrap/main.tscn")
	var player: PlayerController = runner.find_child("Player") as PlayerController
	var player_attack: MeleeAttack = player.get_node("MeleeAttack") as MeleeAttack
	var enemy: EnemyController = runner.find_child("Enemy") as EnemyController
	var enemy_health: HealthComponent = enemy.get_node("HealthComponent") as HealthComponent
	enemy.set_physics_process(false)
	enemy.global_position = player.global_position + Vector2(42.0, 0.0)
	await runner.simulate_frames(10)

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
	var encounter: RunController = runner.find_child("RunController") as RunController

	var _result: DamageResult = player_health.receive_damage(Damage.new(100))
	await runner.simulate_frames(1)

	assert_str(encounter.current_message()).contains("YOU DIED")


func test_first_enemy_defeat_offers_the_weapon_reward() -> void:
	var runner: GdUnitSceneRunner = scene_runner("res://game/bootstrap/main.tscn")
	var enemy: EnemyController = runner.find_child("Enemy") as EnemyController
	var enemy_health: HealthComponent = enemy.get_node("HealthComponent") as HealthComponent
	var encounter: RunController = runner.find_child("RunController") as RunController

	var _result: DamageResult = enemy_health.receive_damage(Damage.new(100))
	await runner.simulate_frames(1)

	assert_str(encounter.current_message()).contains("CLAIM THE ASHEN EDGE")
	assert_object(runner.find_child("WeaponPickup")).is_not_null()


func test_equipping_the_reward_increases_damage_and_unlocks_the_short_run() -> void:
	var runner: GdUnitSceneRunner = scene_runner("res://game/bootstrap/main.tscn")
	var player: PlayerController = runner.find_child("Player") as PlayerController
	var run: RunController = runner.find_child("RunController") as RunController
	var enemy: EnemyController = run.current_enemy()
	var enemy_health: HealthComponent = enemy.get_node("HealthComponent") as HealthComponent
	var _result: DamageResult = enemy_health.receive_damage(Damage.new(100))
	await runner.simulate_frames(1)
	var pickup: WeaponPickup = runner.find_child("WeaponPickup") as WeaponPickup
	pickup.collect(player)
	await runner.simulate_frames(1)

	assert_bool(run.equip_collected_weapon()).is_true()
	await runner.simulate_frames(2)

	var attack: MeleeAttack = player.get_node("MeleeAttack") as MeleeAttack
	assert_int(attack.current_damage()).is_equal(18)
	assert_int(run.current_room_number()).is_equal(2)
	assert_bool(run.equip_collected_weapon()).is_false()

	var room_two_health: HealthComponent = run.current_enemy().get_node("HealthComponent") as HealthComponent
	_result = room_two_health.receive_damage(Damage.new(100))
	await runner.simulate_frames(2)
	assert_int(run.current_room_number()).is_equal(3)

	var room_three_health: HealthComponent = run.current_enemy().get_node("HealthComponent") as HealthComponent
	_result = room_three_health.receive_damage(Damage.new(100))
	await runner.simulate_frames(2)
	assert_str(run.current_message()).contains("RUN COMPLETE")
