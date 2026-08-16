class_name InventoryTest
extends GdUnitTestSuite


func test_equipment_model_exposes_all_twelve_body_locations() -> void:
	assert_int(EquipmentSlot.Location.size()).is_equal(12)


func test_large_items_reserve_every_grid_cell_in_their_footprint() -> void:
	var inventory: Inventory = Inventory.new()
	var armor: ItemDefinition = _item("Plate", Vector2i(2, 3), [EquipmentSlot.Location.CHEST])
	var ring: ItemDefinition = _item("Ring", Vector2i.ONE, [EquipmentSlot.Location.LEFT_RING_FINGER])

	assert_bool(inventory.place(armor, Vector2i(2, 1))).is_true()
	assert_bool(inventory.place(ring, Vector2i(3, 2))).is_false()
	assert_bool(inventory.place(ring, Vector2i(4, 2))).is_true()


func test_items_cannot_extend_beyond_the_ten_by_four_grid() -> void:
	var inventory: Inventory = Inventory.new()
	var armor: ItemDefinition = _item("Plate", Vector2i(2, 3), [EquipmentSlot.Location.CHEST])

	assert_bool(inventory.place(armor, Vector2i(9, 1))).is_false()
	assert_bool(inventory.place(armor, Vector2i(8, 1))).is_true()


func test_only_a_stored_item_can_enter_an_allowed_equipment_slot() -> void:
	var inventory: Inventory = Inventory.new()
	var helm: ItemDefinition = _item("Helm", Vector2i(2, 2), [EquipmentSlot.Location.HEAD])

	assert_bool(inventory.equip_at(Vector2i.ZERO, EquipmentSlot.Location.HEAD)).is_false()
	assert_bool(inventory.place(helm, Vector2i.ZERO)).is_true()
	assert_bool(inventory.equip_at(Vector2i.ZERO, EquipmentSlot.Location.CHEST)).is_false()
	assert_bool(inventory.equip_at(Vector2i.ZERO, EquipmentSlot.Location.HEAD)).is_true()


func test_two_handed_items_reserve_both_held_slots_without_double_counting_damage() -> void:
	var inventory: Inventory = Inventory.new()
	var greatsword: ItemDefinition = _item(
		"Greatsword",
		Vector2i(2, 4),
		[EquipmentSlot.Location.LEFT_HAND_HELD, EquipmentSlot.Location.RIGHT_HAND_HELD]
	)
	greatsword.occupies_both_held_hands = true
	greatsword.damage_bonus = 9
	assert_bool(inventory.place(greatsword, Vector2i.ZERO)).is_true()

	assert_bool(inventory.equip_at(Vector2i.ZERO, EquipmentSlot.Location.RIGHT_HAND_HELD)).is_true()
	assert_bool(inventory.has_equipped_item(EquipmentSlot.Location.LEFT_HAND_HELD)).is_true()
	assert_bool(inventory.has_equipped_item(EquipmentSlot.Location.RIGHT_HAND_HELD)).is_true()
	assert_int(inventory.equipped_damage_bonus()).is_equal(9)
	var dagger: ItemDefinition = _item(
		"Dagger",
		Vector2i(1, 2),
		[EquipmentSlot.Location.LEFT_HAND_HELD, EquipmentSlot.Location.RIGHT_HAND_HELD]
	)
	assert_bool(inventory.place(dagger, Vector2i.ZERO)).is_true()
	assert_bool(inventory.equip_at(Vector2i.ZERO, EquipmentSlot.Location.LEFT_HAND_HELD)).is_false()


func test_left_and_right_ring_slots_are_independent() -> void:
	var inventory: Inventory = Inventory.new()
	var ring: ItemDefinition = _item(
		"Ring",
		Vector2i.ONE,
		[EquipmentSlot.Location.LEFT_RING_FINGER, EquipmentSlot.Location.RIGHT_RING_FINGER]
	)
	ring.damage_bonus = 2
	assert_bool(inventory.place(ring, Vector2i.ZERO)).is_true()
	assert_bool(inventory.place(ring, Vector2i(1, 0))).is_true()

	assert_bool(inventory.equip_at(Vector2i.ZERO, EquipmentSlot.Location.LEFT_RING_FINGER)).is_true()
	assert_bool(inventory.equip_at(Vector2i(1, 0), EquipmentSlot.Location.RIGHT_RING_FINGER)).is_true()
	assert_bool(inventory.has_equipped_item(EquipmentSlot.Location.LEFT_RING_FINGER)).is_true()
	assert_bool(inventory.has_equipped_item(EquipmentSlot.Location.RIGHT_RING_FINGER)).is_true()
	assert_int(inventory.equipped_damage_bonus()).is_equal(4)


func test_unequipping_returns_an_item_to_free_grid_cells() -> void:
	var inventory: Inventory = Inventory.new()
	var boots: ItemDefinition = _item("Boots", Vector2i(2, 2), [EquipmentSlot.Location.FEET])
	assert_bool(inventory.place(boots, Vector2i.ZERO)).is_true()
	assert_bool(inventory.equip_at(Vector2i.ZERO, EquipmentSlot.Location.FEET)).is_true()

	assert_bool(inventory.unequip(EquipmentSlot.Location.FEET, Vector2i(8, 2))).is_true()
	assert_bool(inventory.has_equipped_item(EquipmentSlot.Location.FEET)).is_false()
	assert_int(inventory.stored_item_count()).is_equal(1)


func _item(name: String, size: Vector2i, slots: Array[EquipmentSlot.Location]) -> ItemDefinition:
	var item: ItemDefinition = ItemDefinition.new()
	item.display_name = name
	item.inventory_size = size
	item.allowed_slots = slots
	return item
