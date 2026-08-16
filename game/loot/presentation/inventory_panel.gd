class_name InventoryPanel
extends Control

const PANEL: Rect2 = Rect2(170.0, 50.0, 940.0, 620.0)
const GRID_ORIGIN: Vector2 = Vector2(635.0, 170.0)
const CELL_SIZE: float = 42.0
const SLOTS: Array[EquipmentSlot.Location] = [
	EquipmentSlot.Location.HEAD,
	EquipmentSlot.Location.CHEST,
	EquipmentSlot.Location.NECK,
	EquipmentSlot.Location.LEFT_HAND_HELD,
	EquipmentSlot.Location.RIGHT_HAND_HELD,
	EquipmentSlot.Location.HANDS_COVERED,
	EquipmentSlot.Location.LEFT_RING_FINGER,
	EquipmentSlot.Location.RIGHT_RING_FINGER,
	EquipmentSlot.Location.BACK,
	EquipmentSlot.Location.WAIST,
	EquipmentSlot.Location.LEGS,
	EquipmentSlot.Location.FEET,
]
const SLOT_LABELS: Array[String] = [
	"HEAD", "CHEST", "NECK", "LEFT HAND · HELD", "RIGHT HAND · HELD", "HANDS · COVERED",
	"LEFT RING", "RIGHT RING", "BACK · CLOAK", "WAIST", "LEGS", "FEET",
]

@export var run: RunController
var _font: Font


func _ready() -> void:
	assert(run != null, "InventoryPanel requires a RunController dependency")
	_font = ThemeDB.fallback_font
	visible = false


func _process(_delta: float) -> void:
	if Input.is_action_just_pressed("inventory"):
		toggle_inventory()
	if visible:
		queue_redraw()


func toggle_inventory() -> void:
	visible = not visible
	queue_redraw()


func is_open() -> bool:
	return visible


func _draw() -> void:
	draw_rect(PANEL, Color(0.035, 0.03, 0.027, 0.97))
	draw_rect(PANEL, Color("6a5748"), false, 2.0)
	draw_string(_font, Vector2(210.0, 98.0), "INVENTORY & EQUIPMENT", HORIZONTAL_ALIGNMENT_LEFT, -1.0, 25, Color("eadcc7"))
	draw_string(_font, Vector2(635.0, 145.0), "BACKPACK · 10 × 4", HORIZONTAL_ALIGNMENT_LEFT, -1.0, 15, Color("c58a63"))
	_draw_equipment(run.inventory())
	_draw_backpack(run.inventory())
	draw_string(_font, Vector2(635.0, 390.0), "I · CLOSE    E · QUICK EQUIP", HORIZONTAL_ALIGNMENT_LEFT, -1.0, 13, Color("8f8275"))


func _draw_equipment(inventory: Inventory) -> void:
	for index: int in range(SLOTS.size()):
		var column: int = index / 6
		var row: int = index % 6
		var slot_rect: Rect2 = Rect2(210.0 + column * 205.0, 130.0 + row * 78.0, 185.0, 58.0)
		draw_rect(slot_rect, Color("171411"))
		draw_rect(slot_rect, Color("4e443a"), false, 1.0)
		draw_string(_font, slot_rect.position + Vector2(10.0, 20.0), SLOT_LABELS[index], HORIZONTAL_ALIGNMENT_LEFT, 165.0, 11, Color("887a6d"))
		var item: ItemDefinition = inventory.equipped_item(SLOTS[index])
		if item != null:
			draw_string(_font, slot_rect.position + Vector2(10.0, 43.0), item.display_name.to_upper(), HORIZONTAL_ALIGNMENT_LEFT, 165.0, 13, Color("d79a6d"))


func _draw_backpack(inventory: Inventory) -> void:
	for y: int in range(Inventory.GRID_SIZE.y):
		for x: int in range(Inventory.GRID_SIZE.x):
			var cell: Rect2 = Rect2(GRID_ORIGIN + Vector2(x, y) * CELL_SIZE, Vector2.ONE * CELL_SIZE)
			draw_rect(cell, Color("15120f"))
			draw_rect(cell, Color("40372f"), false, 1.0)
	for placement: InventoryPlacement in inventory.stored_placements():
		var item_rect: Rect2 = Rect2(
			GRID_ORIGIN + Vector2(placement.origin) * CELL_SIZE,
			Vector2(placement.item.inventory_size) * CELL_SIZE
		).grow(-2.0)
		draw_rect(item_rect, Color("6f321e"))
		draw_rect(item_rect, Color("c36c3f"), false, 2.0)
		draw_string(_font, item_rect.position + Vector2(7.0, 20.0), placement.item.display_name.to_upper(), HORIZONTAL_ALIGNMENT_LEFT, item_rect.size.x - 14.0, 11, Color("f0d4b7"))
