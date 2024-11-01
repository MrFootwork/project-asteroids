import Spaceship from './objects/Spaceship.js';

class Game {
	constructor({ canvasElement, ctx }) {
		this.spaceship = new Spaceship({ canvasElement, ctx });
		this.canvas = canvasElement;
		this.ctx = ctx;

		// Control the spaceship with arrow keys
		document.addEventListener('keydown', e => {
			if (e.key === 'ArrowUp')
				this.spaceship.speed = Math.min(
					this.spaceship.speed + this.spaceship.acceleration,
					this.spaceship.maxSpeed
				);
			if (e.key === 'ArrowDown') this.spaceship.speed = 0;
			if (e.key === 'ArrowLeft') this.spaceship.angle -= 0.1;
			if (e.key === 'ArrowRight') this.spaceship.angle += 0.1;
		});

		document.addEventListener('keyup', e => {
			if (e.key === 'ArrowUp') this.spaceship.speed = 0;
		});
	}
}

export default Game;
