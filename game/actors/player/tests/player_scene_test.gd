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
