class_name RoomEncounter
extends Node

signal message_changed(message: String)

enum Outcome { ACTIVE, PLAYER_DEFEATED, ENEMY_DEFEATED }

@export var player_health: HealthComponent
@export var enemy_health: HealthComponent

var _outcome: Outcome = Outcome.ACTIVE
var _message: String = "DEFEAT THE WRETCH"


func _ready() -> void:
	assert(player_health != null, "RoomEncounter requires player health")
	assert(enemy_health != null, "RoomEncounter requires enemy health")
	player_health.defeated.connect(_on_player_defeated)
	enemy_health.defeated.connect(_on_enemy_defeated)


func _process(_delta: float) -> void:
	if _outcome != Outcome.ACTIVE and Input.is_action_just_pressed("restart"):
		var _reload_error: Error = get_tree().reload_current_scene()


func current_message() -> String:
	return _message


func _on_player_defeated() -> void:
	if _outcome != Outcome.ACTIVE:
		return
	_outcome = Outcome.PLAYER_DEFEATED
	_set_message("YOU DIED  ·  PRESS R TO RISE")


func _on_enemy_defeated() -> void:
	if _outcome != Outcome.ACTIVE:
		return
	_outcome = Outcome.ENEMY_DEFEATED
	_set_message("ENEMY DEFEATED  ·  PRESS R TO RESTART")


func _set_message(message: String) -> void:
	_message = message
	message_changed.emit(_message)
