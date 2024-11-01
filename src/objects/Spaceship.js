class Spaceship {
	constructor({ canvasElement, ctx }) {
		console.log('🚀 ~ Spaceship ~ constructor ~ canvasElement:', this);

		this.canvas = canvasElement;
		this.ctx = ctx;
		this.x = this.canvas.width / 2;
		this.y = this.canvas.height / 2;
		this.angle = 0;
		this.speed = 0;
	}

	draw() {
		this.ctx.save();
		this.ctx.translate(this.x, this.y);
		this.ctx.rotate(this.angle);
		this.ctx.fillStyle = 'white';
		this.ctx.beginPath();
		this.ctx.moveTo(0, -15);
		this.ctx.lineTo(10, 10);
		this.ctx.lineTo(-10, 10);
		this.ctx.closePath();
		this.ctx.fill();
		this.ctx.restore();
	}
	update() {
		this.x += Math.cos(this.angle) * this.speed;
		this.y += Math.sin(this.angle) * this.speed;

		// Wrap around the screen
		if (this.x > this.canvas.width) this.x = 0;
		else if (this.x < 0) this.x = this.canvas.width;

		if (this.y > this.canvas.height) this.y = 0;
		else if (this.y < 0) this.y = this.canvas.height;
	}
}

export default Spaceship;
