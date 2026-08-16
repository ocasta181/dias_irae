class_name InventoryTest
extends GdUnitTestSuite


func test_inventory_starts_without_an_equipment_bonus() -> void:
	var inventory: Inventory = Inventory.new()

	assert_int(inventory.weapon_count()).is_zero()
	assert_int(inventory.equipped_damage_bonus()).is_zero()


func test_only_a_collected_weapon_can_be_equipped() -> void:
	var inventory: Inventory = Inventory.new()

	assert_bool(inventory.equip(0)).is_false()
	assert_bool(inventory.has_equipped_weapon()).is_false()
	assert_int(inventory.equipped_damage_bonus()).is_zero()


func test_equipping_a_collected_weapon_applies_its_damage_bonus() -> void:
	var weapon: WeaponDefinition = WeaponDefinition.new()
	weapon.display_name = "Ashen Edge"
	weapon.damage_bonus = 6
	var inventory: Inventory = Inventory.new()
	inventory.add(weapon)

	assert_bool(inventory.equip(0)).is_true()
	assert_bool(inventory.has_equipped_weapon()).is_true()
	assert_str(inventory.equipped_name()).is_equal("Ashen Edge")
	assert_int(inventory.equipped_damage_bonus()).is_equal(6)
