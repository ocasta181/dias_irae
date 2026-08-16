class_name MovementDirectionTest
extends GdUnitTestSuite


func test_diagonal_input_does_not_move_faster() -> void:
	var direction: Vector2 = MovementDirection.from_axes(1.0, 1.0)

	assert_float(direction.length()).is_equal_approx(1.0, 0.0001)


func test_partial_input_preserves_its_strength() -> void:
	var direction: Vector2 = MovementDirection.from_axes(0.25, 0.0)

	assert_float(direction.x).is_equal_approx(0.25, 0.0001)
	assert_float(direction.y).is_zero()
