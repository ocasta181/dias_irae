class_name EncounterStatus
extends Label

@export var encounter: RoomEncounter


func _ready() -> void:
	assert(encounter != null, "EncounterStatus requires a RoomEncounter dependency")
	text = encounter.current_message()
	encounter.message_changed.connect(_on_message_changed)


func _on_message_changed(message: String) -> void:
	text = message
