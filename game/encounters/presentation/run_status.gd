class_name RunStatus
extends Label

@export var run: RunController


func _ready() -> void:
	assert(run != null, "RunStatus requires a RunController dependency")
	text = run.current_message()
	run.message_changed.connect(_on_message_changed)


func _on_message_changed(message: String) -> void:
	text = message
