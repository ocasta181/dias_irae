class_name HealthTest
extends GdUnitTestSuite


func test_damage_reduces_health_by_its_amount() -> void:
	var health: Health = Health.new(100)
	var result: DamageResult = health.apply(Damage.new(25))

	assert_int(result.applied_damage).is_equal(25)
	assert_int(result.remaining_health).is_equal(75)
	assert_bool(result.caused_defeat).is_false()


func test_lethal_damage_clamps_health_and_causes_defeat_once() -> void:
	var health: Health = Health.new(30)
	var lethal_result: DamageResult = health.apply(Damage.new(50))
	var repeated_result: DamageResult = health.apply(Damage.new(10))

	assert_int(health.current).is_zero()
	assert_int(lethal_result.applied_damage).is_equal(30)
	assert_bool(lethal_result.caused_defeat).is_true()
	assert_int(repeated_result.applied_damage).is_zero()
	assert_bool(repeated_result.caused_defeat).is_false()


func test_non_lethal_damage_preserves_a_live_combatant() -> void:
	var health: Health = Health.new(20)

	health.apply(Damage.new(19))

	assert_int(health.current).is_equal(1)
	assert_bool(health.is_depleted()).is_false()
