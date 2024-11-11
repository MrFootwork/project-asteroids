import Bar from './Bar.js';

class Asteroid {
	constructor({ position, velocity, width, element, gameScreen }) {
		// External State
		this.gameScreen = gameScreen;
		this.element = element;
		this.image = element.querySelector('img');
		this.position = position;
		this.velocity = velocity;
		this.width = width;

		// Asteroid Characteristics
		this.ROTATIONAL_SPEED = -0.04 + Math.random() * 0.08;

		// Internal State
		this.orientation = 0;
		this.isOutside = false;
		this.hasCollided = false;
		this.hasEnteredScreen = false;
		this.hasBeenRenderedOnce = false;
		// Health
		this.health = Math.round(width);
		this.healthBar = new Bar({
			totalValue: this.health,
			parentObject: this,
		});
	}

	update() {
		this.#rotate();
		this.#updatePosition();

		// Handle screen entry and leave
		if (this.hasEnteredScreen) this.#handleScreenLeave();
		if (!this.hasEnteredScreen) this.#handleScreenEntry();

		this.#render();
	}

	getCollisionShape() {
		return {
			x: this.position.x + this.width / 2,
			y: this.position.y + this.width / 2,
			radius: this.width / 2,
		};
	}

	#render() {
		this.element.style.left = `${this.position.x}px`;
		this.element.style.top = `${this.position.y}px`;

		this.image.style.transform = `rotate(${this.orientation}rad)`;

		// First Render Setup
		if (!this.hasBeenRenderedOnce) {
			this.element.style.width = `${this.width}px`;
			this.image.style.width = `${this.width}px`;
			this.hasBeenRenderedOnce = true;
		}
	}

	#rotate() {
		this.orientation += this.ROTATIONAL_SPEED;
	}

	#updatePosition() {
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}

	#handleScreenEntry() {
		const isInside =
			this.position.x + this.width >= 0 + 20 && // enters from left
			this.position.x <= this.gameScreen.clientWidth - 20 && // enters from right
			this.position.y + this.width >= 0 + 20 && // enters from top
			this.position.y <= this.gameScreen.clientHeight - 20; // enters from bottom

		this.hasEnteredScreen = isInside;
	}

	#handleScreenLeave() {
		const isOutside =
			this.position.x + this.width < 0 + 20 || // Left of screen
			this.position.x > this.gameScreen.clientWidth - 20 || // Right of screen
			this.position.y + this.width < 0 + 20 || // Above screen
			this.position.y > this.gameScreen.clientHeight - 20; // Below screen

		this.isOutside = isOutside;
	}
}

export default Asteroid;
