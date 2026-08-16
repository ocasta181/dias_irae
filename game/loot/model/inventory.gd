class_name Inventory
extends RefCounted

var _weapons: Array[WeaponDefinition] = []
var _equipped: WeaponDefinition


func add(weapon: WeaponDefinition) -> void:
	assert(weapon != null, "Inventory cannot add an empty weapon")
	_weapons.append(weapon)


func equip(index: int) -> bool:
	if index < 0 or index >= _weapons.size():
		return false
	_equipped = _weapons[index]
	return true


func weapon_count() -> int:
	return _weapons.size()


func equipped_damage_bonus() -> int:
	if _equipped == null:
		return 0
	return _equipped.damage_bonus


func equipped_name() -> String:
	if _equipped == null:
		return "Unarmed"
	return _equipped.display_name
