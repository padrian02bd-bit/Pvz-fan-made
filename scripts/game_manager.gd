extends Node2D

# Game variables
var sun_count: int = 100  # Starting sun
var current_wave: int = 1
var game_active: bool = true

# References
@onready var sun_label = $UI/SunLabel

func _ready():
	title_screen()
	update_sun_display()

func _process(delta):
	if game_active:
		# Game loop
		pass

func add_sun(amount: int):
	sun_count += amount
	update_sun_display()

func remove_sun(amount: int):
	if sun_count >= amount:
		sun_count -= amount
		update_sun_display()
		return true
	return false

func update_sun_display():
	sun_label.text = "Sun: %d" % sun_count

func title_screen():
	print("Welcome to PvZ Fangame!")
	print("Starting game...")

func game_over(won: bool):
	game_active = false
	if won:
		print("You won!")
	else:
		print("Game Over!")
