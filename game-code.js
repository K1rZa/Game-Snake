const canvas = document.getElementById('snake_game')
const context = canvas.getContext('2d')

const ground_img = new Image()
ground_img.src = 'Resources/ground.png'
const food_img = new Image()
food_img.src = 'Resources/food.png'

const tile = 32
const width_coef = snake_game.width / tile
const height_coef = snake_game.height / tile

var speed = 1
var score = 0

let food = {
	x: food_position().x,
	y: food_position().y,
}

let snake = []
snake[0] = {
	x: 9 * tile,
	y: 9 * tile,
}
let snakehead = {
	x: snake[0].x,
	y: snake[0].y,
}

function random_int(min, max) {
	return Math.floor(Math.random() * (max - (min - 1))) + min
}

function food_position() {
	let x = random_int(1, width_coef - 2) * tile
	let y = random_int(1, height_coef - 2) * tile
	return {
		x: x,
		y: y,
	}
}
function snake_draw() {
	for (let i = 0; i < snake.length; i++) {
		if (i == 0) {
			context.fillStyle = 'red'
			context.fillRect(snakehead.x, snakehead.y, tile, tile)
		} else {
			context.fillStyle = 'blue'
			context.fillRect(snake[i].x, snake[i].y, tile, tile)
		}
	}
}
function snake_eat() {
	if (snakehead.x == food.x && snakehead.y == food.y) {
		snake.length++
		food = {
			x: food_position().x,
			y: food_position().y,
		}
		return 1
	} else {
		return 0
	}
}
function score_math() {
	if (snake_eat() == 1) {
		score++
	}
	context.fillStyle = 'white'
	context.font = '50px Arial'
	context.fillText(score, tile * 2.5, tile * 1.7)
}
function set_speed() {
	if (score_math() == 2) {
		speed -= 0.1
	} else if (score_math() == 5) {
		speed -= 0.1
	} else if (score_math() == 7) {
		speed -= 0.1
	}
}
function drawgame() {
	context.drawImage(ground_img, 0, 0)
	context.drawImage(food_img, food.x, food.y)

	snake_draw()
	snake_eat()
	score_math()
	set_speed()
}

let game = setInterval(drawgame, 150 * speed)
