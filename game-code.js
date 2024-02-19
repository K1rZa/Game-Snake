const canvas = document.getElementById('snake_game')
const context = canvas.getContext('2d')

const ground_img = new Image()
ground_img.src = 'Resources/ground.png'
const food_img = new Image()
food_img.src = 'Resources/food.png'

const tile = 32
const width_area = snake_game.width / tile
const height_area = snake_game.height / tile

var speed = 0.5
var score = 0

let food = {
	x: food_position_x(),
	y: food_position_y(),
}

let snake = []
snake[0] = {
	x: 9 * tile,
	
	y: 10 * tile,
}

function random_int(min, max) {
	return Math.floor(Math.random() * (max - (min - 1))) + min
}
function food_position_x() {
	let x = random_int(1, width_area - 2) * tile
 /*let y = random_int(1, height_area - 2) * tile*/
	return x
}
function food_position_y() {
	let y = random_int(1, height_area - 2) * tile
	return y
}
function drawgame() {
	context.drawImage(ground_img, 0, 0)

	context.drawImage(food_img, food.x, food.y)
}

let game = setInterval(drawgame, 100)
