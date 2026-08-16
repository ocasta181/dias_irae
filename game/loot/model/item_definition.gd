class_name ItemDefinition
extends Resource

@export var display_name: String = "Unnamed item"
@export var inventory_size: Vector2i = Vector2i.ONE
@export var allowed_slots: Array[EquipmentSlot.Location] = []
@export var occupies_both_held_hands: bool = false
@export_range(0, 1000, 1, "or_greater") var damage_bonus: int = 0


func can_equip_in(slot: EquipmentSlot.Location) -> bool:
	return allowed_slots.has(slot)
