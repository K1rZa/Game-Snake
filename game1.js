const canvas = document.getElementById('snake_game')
const ctx = canvas.getContext('2d')

const ground = new Image()
ground.src = 'Resources/ground.png'

const foodImg = new Image()
foodImg.src = 'Resources/food1.png'

const snakehead_img = new Image()
snakehead_img.src = 'Resources/golova.png'

const snakecell_img = new Image()
snakecell_img.src = 'Resources/cell.png'

const tile = 32
const width_coef = snake_game.width / tile
const height_coef = snake_game.height / tile

var speed = 1
let score = 0

let food = {
	x: food_position().x,
	y: food_position().y,
}

let snake = []
snake[0] = {
	x: 9 * tile,
	y: 10 * tile,
}
let snakehead = {
	x: snake[0].x,
	y: snake[0].y,
}

document.addEventListener('keydown', direction)

let dir

function direction(event) {
	if (event.keyCode == 37 && dir != 'right') dir = 'left'
	else if (event.keyCode == 38 && dir != 'down') dir = 'up'
	else if (event.keyCode == 39 && dir != 'left') dir = 'right'
	else if (event.keyCode == 40 && dir != 'up') dir = 'down'
}
function snake_move() {
	if (dir == 'left') snakehead.x -= tile
	if (dir == 'right') snakehead.x += tile
	if (dir == 'up') snakehead.y -= tile
	if (dir == 'down') snakehead.y += tile
}

function random_int(min, max) {
	return Math.floor(Math.random() * (max - (min - 1))) + min
}

function food_position() {
	let x = random_int(2, width_coef - 4) * tile
	let y = random_int(5, height_coef - 4) * tile
	return {
		x: x,
		y: y,
	}
}
function snake_draw() {
	for (let i = 0; i < snake.length; i++) {
		if (i == 0) {
			ctx.drawImage(snakehead_img, snakehead.x, snakehead.y)
			//ctx.fillStyle = 'red'
			//ctx.fillRect(snakehead.x, snakehead.y, tile, tile)
		} else {
			ctx.drawImage(snakecell_img, snake[i].x, snake[i].y)
			//ctx.fillStyle = 'blue'
			//ctx.fillRect(snake[i].x, snake[i].y, tile, tile)
		}
	}
}
function score_draw() {
	ctx.fillStyle = 'white'
	ctx.font = '50px Arial'
	ctx.fillText(score, tile * 2.5, tile * 1.7)
}
function snake_eat() {
	if (snakehead.x == food.x && snakehead.y == food.y) {
		score++
		food = {
			x: food_position().x,
			y: food_position().y,
		}
	} else {
		snake.pop()
	}
}

function eatTail(head, arr) {
	for (let i = 0; i < arr.length; i++) {
		if (head.x == arr[i].x && head.y == arr[i].y) clearInterval(game)
	}
}

function drawGame() {
	ctx.drawImage(ground, 0, 0)

	ctx.drawImage(foodImg, food.x, food.y)

	snake_draw()

	score_draw()

	snake_eat()

	if (
		snakehead.x < tile ||
		snakehead.x > tile * 17 ||
		snakehead.y < 3 * tile ||
		snakehead.y > tile * 17
	)
		clearInterval(game)

	snake_move()

	let newHead = {
		x: snakehead.x,
		y: snakehead.y,
	}

	eatTail(newHead, snake)

	snake.unshift(newHead)
}

let game = setInterval(drawGame, 125)

//
