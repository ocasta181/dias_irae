class_name RunController
extends Node

signal message_changed(message: String)
signal equipment_changed(message: String)

@export var player: PlayerController
@export var player_health: HealthComponent
@export var player_attack: MeleeAttack
@export var room_renderer: PlaceholderRoom
@export var enemy_scene: PackedScene
@export var pickup_scene: PackedScene
@export var reward: ItemDefinition
@export var rooms: Array[RoomDefinition] = []

var _inventory: Inventory = Inventory.new()
var _room_index: int = 0
var _enemy: EnemyController
var _message: String = ""
var _run_ended: bool = false


func _ready() -> void:
	assert(player != null and player_health != null and player_attack != null, "RunController requires the player combatant")
	assert(room_renderer != null and enemy_scene != null and pickup_scene != null, "RunController requires world scenes")
	assert(reward != null and not rooms.is_empty(), "RunController requires a reward and authored rooms")
	player_health.defeated.connect(_on_player_defeated)
	_start_room()


func _process(_delta: float) -> void:
	if _run_ended and Input.is_action_just_pressed("restart"):
		var _reload_error: Error = get_tree().reload_current_scene()
	elif _inventory.stored_item_count() > 0 and not _inventory.has_equipped_item(EquipmentSlot.Location.RIGHT_HAND_HELD) and Input.is_action_just_pressed("equip"):
		equip_collected_weapon()


func current_message() -> String:
	return _message


func current_room_number() -> int:
	return _room_index + 1


func current_enemy() -> EnemyController:
	return _enemy


func inventory() -> Inventory:
	return _inventory


func equip_collected_weapon() -> bool:
	if _inventory.has_equipped_item(EquipmentSlot.Location.RIGHT_HAND_HELD):
		return false
	if not _inventory.equip_at(Vector2i.ZERO, EquipmentSlot.Location.RIGHT_HAND_HELD):
		return false
	player_attack.equip_damage_bonus(_inventory.equipped_damage_bonus())
	var held_item: ItemDefinition = _inventory.equipped_item(EquipmentSlot.Location.RIGHT_HAND_HELD)
	equipment_changed.emit("%s  ·  DAMAGE %d" % [held_item.display_name.to_upper(), player_attack.current_damage()])
	_set_message("%s EQUIPPED" % held_item.display_name.to_upper())
	_advance_room.call_deferred()
	return true


func _start_room() -> void:
	var definition: RoomDefinition = rooms[_room_index]
	room_renderer.set_room(definition)
	player.global_position = Vector2.ZERO
	_enemy = enemy_scene.instantiate() as EnemyController
	_enemy.target = player
	_enemy.target_health = player_health
	_enemy.position = definition.enemy_position
	add_child(_enemy)
	var enemy_health: HealthComponent = _enemy.get_node("HealthComponent") as HealthComponent
	enemy_health.defeated.connect(_on_enemy_defeated)
	_set_message("ROOM %d / %d  ·  %s" % [_room_index + 1, rooms.size(), definition.room_name])


func _on_enemy_defeated() -> void:
	if _run_ended:
		return
	if _room_index == 0 and _inventory.stored_item_count() == 0:
		var pickup: WeaponPickup = pickup_scene.instantiate() as WeaponPickup
		pickup.item = reward
		pickup.position = _enemy.position
		pickup.collected.connect(_on_reward_collected)
		add_child(pickup)
		_set_message("CLAIM THE ASHEN EDGE")
	else:
		_advance_room.call_deferred()


func _on_reward_collected(item: ItemDefinition) -> void:
	var placed: bool = _inventory.place(item, Vector2i.ZERO)
	assert(placed, "The authored encounter reward must fit in an empty inventory")
	equipment_changed.emit("%s  ·  UNEQUIPPED" % item.display_name.to_upper())
	_set_message("%s COLLECTED  ·  PRESS E TO EQUIP" % item.display_name.to_upper())


func _advance_room() -> void:
	if is_instance_valid(_enemy):
		_enemy.queue_free()
	_room_index += 1
	if _room_index >= rooms.size():
		_run_ended = true
		_set_message("RUN COMPLETE  ·  PRESS R TO RETURN")
		return
	_start_room()


func _on_player_defeated() -> void:
	_run_ended = true
	_set_message("YOU DIED  ·  PRESS R TO RISE")


func _set_message(message: String) -> void:
	_message = message
	message_changed.emit(message)
