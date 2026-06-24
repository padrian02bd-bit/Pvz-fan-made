extends Node2D

class_name Zombie

# Zombie properties
var zombie_type: String = "basic"
var health: int = 30
var speed: float = 50.0  # pixels per second
var attack_damage: int = 10
var attack_cooldown: float = 1.5

var time_since_last_attack: float = 0.0
var direction: Vector2 = Vector2.LEFT  # Moving left (toward plants)

func _ready():
	print("Zombie spawned: %s" % zombie_type)

func _process(delta):
	# Move zombie
	position += direction * speed * delta
	
	# Attack cooldown
	if time_since_last_attack < attack_cooldown:
		time_since_last_attack += delta

func attack():
	if time_since_last_attack >= attack_cooldown:
		print("%s attacks!" % zombie_type)
		time_since_last_attack = 0.0
		return attack_damage
	return 0

func take_damage(damage: int):
	health -= damage
	if health <= 0:
		die()

func die():
	print("%s died" % zombie_type)
	queue_free()
