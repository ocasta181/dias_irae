class_name Inventory
extends RefCounted

const GRID_SIZE: Vector2i = Vector2i(10, 4)

var _placements: Array[InventoryPlacement] = []
var _equipment: Dictionary[int, InventoryPlacement] = {}


func place(item: ItemDefinition, origin: Vector2i) -> bool:
	if not can_place(item, origin):
		return false
	_placements.append(InventoryPlacement.new(item, origin))
	return true


func can_place(item: ItemDefinition, origin: Vector2i) -> bool:
	if item == null or item.inventory_size.x <= 0 or item.inventory_size.y <= 0:
		return false
	var area: Rect2i = Rect2i(origin, item.inventory_size)
	var bounds: Rect2i = Rect2i(Vector2i.ZERO, GRID_SIZE)
	if not bounds.encloses(area):
		return false
	for placement: InventoryPlacement in _placements:
		if area.intersects(placement.occupied_area()):
			return false
	return true


func equip_at(origin: Vector2i, slot: EquipmentSlot.Location) -> bool:
	var placement: InventoryPlacement = _placement_at_origin(origin)
	if placement == null or not placement.item.can_equip_in(slot):
		return false
	var required_slots: Array[EquipmentSlot.Location] = _required_slots(placement.item, slot)
	if required_slots.is_empty():
		return false
	for required_slot: EquipmentSlot.Location in required_slots:
		if _equipment.has(required_slot):
			return false
	_placements.erase(placement)
	for required_slot: EquipmentSlot.Location in required_slots:
		_equipment[required_slot] = placement
	return true


func unequip(slot: EquipmentSlot.Location, origin: Vector2i) -> bool:
	if not _equipment.has(slot):
		return false
	var placement: InventoryPlacement = _equipment[slot]
	if not can_place(placement.item, origin):
		return false
	for equipped_slot: int in _equipment.keys():
		if _equipment[equipped_slot] == placement:
			_equipment.erase(equipped_slot)
	placement.origin = origin
	_placements.append(placement)
	return true


func stored_item_count() -> int:
	return _placements.size()


func has_equipped_item(slot: EquipmentSlot.Location) -> bool:
	return _equipment.has(slot)


func equipped_item(slot: EquipmentSlot.Location) -> ItemDefinition:
	if not _equipment.has(slot):
		return null
	return _equipment[slot].item


func equipped_damage_bonus() -> int:
	var counted: Array[InventoryPlacement] = []
	var total: int = 0
	for placement: InventoryPlacement in _equipment.values():
		if not counted.has(placement):
			counted.append(placement)
			total += placement.item.damage_bonus
	return total


func _placement_at_origin(origin: Vector2i) -> InventoryPlacement:
	for placement: InventoryPlacement in _placements:
		if placement.origin == origin:
			return placement
	return null


func _required_slots(item: ItemDefinition, slot: EquipmentSlot.Location) -> Array[EquipmentSlot.Location]:
	var slots: Array[EquipmentSlot.Location] = [slot]
	if not item.occupies_both_held_hands:
		return slots
	if slot != EquipmentSlot.Location.LEFT_HAND_HELD and slot != EquipmentSlot.Location.RIGHT_HAND_HELD:
		return []
	return [EquipmentSlot.Location.LEFT_HAND_HELD, EquipmentSlot.Location.RIGHT_HAND_HELD]
