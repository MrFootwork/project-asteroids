const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Spaceship properties
const spaceship = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	angle: 0,
	speed: 0,
	draw() {
		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.rotate(this.angle);
		ctx.fillStyle = 'white';
		ctx.beginPath();
		ctx.moveTo(0, -15);
		ctx.lineTo(10, 10);
		ctx.lineTo(-10, 10);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	},
	update() {
		this.x += Math.cos(this.angle) * this.speed;
		this.y += Math.sin(this.angle) * this.speed;

		// Wrap around the screen
		if (this.x > canvas.width) this.x = 0;
		else if (this.x < 0) this.x = canvas.width;

		if (this.y > canvas.height) this.y = 0;
		else if (this.y < 0) this.y = canvas.height;
	},
};

function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	spaceship.draw();
	spaceship.update();

	requestAnimationFrame(gameLoop);
}

// Control the spaceship with arrow keys
document.addEventListener('keydown', e => {
	if (e.key === 'ArrowUp') spaceship.speed = 5;
	if (e.key === 'ArrowDown') spaceship.speed = 0;
	if (e.key === 'ArrowLeft') spaceship.angle -= 0.1;
	if (e.key === 'ArrowRight') spaceship.angle += 0.1;
});

document.addEventListener('keyup', e => {
	if (e.key === 'ArrowUp') spaceship.speed = 0;
});

// Start the game loop
gameLoop();
