import Game from './Game.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
console.log('🚀 ~ canvas.width:', canvas.width);
canvas.height = window.innerHeight;

// Spaceship properties
const game = new Game({ canvasElement: canvas, ctx: ctx });

// Start the game loop
function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	game.spaceship.draw();
	game.spaceship.update();

	requestAnimationFrame(gameLoop);
}

gameLoop();
