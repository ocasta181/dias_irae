class_name InventoryPlacement
extends RefCounted

var item: ItemDefinition
var origin: Vector2i


func _init(placed_item: ItemDefinition, placed_origin: Vector2i) -> void:
	item = placed_item
	origin = placed_origin


func occupied_area() -> Rect2i:
	return Rect2i(origin, item.inventory_size)
