class_name WeaponDefinition
extends Resource

@export var display_name: String = "Unnamed weapon"
@export_range(0, 1000, 1, "or_greater") var damage_bonus: int = 0
