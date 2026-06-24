extends Node2D

class_name Plant

# Plant properties
var plant_type: String = "peashooter"
var health: int = 20
var sun_cost: int = 100
var attack_damage: int = 10
var attack_cooldown: float = 1.5

var time_since_last_attack: float = 0.0

func _ready():
	print("Plant spawned: %s" % plant_type)

func _process(delta):
	if time_since_last_attack < attack_cooldown:
		time_since_last_attack += delta

func attack():
	if time_since_last_attack >= attack_cooldown:
		print("%s attacks!" % plant_type)
		time_since_last_attack = 0.0
		return attack_damage
	return 0

func take_damage(damage: int):
	health -= damage
	if health <= 0:
		die()

func die():
	print("%s died" % plant_type)
	queue_free()
