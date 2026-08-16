class_name PlayerSceneTest
extends GdUnitTestSuite


func after_test() -> void:
	Input.action_release("move_right")


func test_move_right_action_moves_the_player_right() -> void:
	var runner: GdUnitSceneRunner = scene_runner(
		"res://game/actors/player/player.tscn"
	)
	var player: PlayerController = runner.scene() as PlayerController
	var initial_x: float = player.position.x

	Input.action_press("move_right")
	await runner.simulate_frames(6)
	Input.action_release("move_right")

	assert_float(player.position.x).is_greater(initial_x)


func test_arrow_keys_are_bound_to_navigation_actions() -> void:
	assert_bool(_action_has_key("move_left", KEY_LEFT)).is_true()
	assert_bool(_action_has_key("move_right", KEY_RIGHT)).is_true()
	assert_bool(_action_has_key("move_up", KEY_UP)).is_true()
	assert_bool(_action_has_key("move_down", KEY_DOWN)).is_true()
	assert_bool(_action_has_key("inventory", KEY_I)).is_true()


func _action_has_key(action: StringName, key: Key) -> bool:
	for event: InputEvent in InputMap.action_get_events(action):
		if event is InputEventKey:
			var key_event: InputEventKey = event
			if key_event.physical_keycode == key:
				return true
	return false
