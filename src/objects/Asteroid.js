class Asteroid {
	constructor({ position, velocity, width, element, gameScreen }) {
		this.element = element;
		this.position = position;
		this.velocity = velocity;
		this.width = width;
		this.orientation = 0;
		this.ROTATIONAL_SPEED = -0.04 + Math.random() * 0.08;
		this.isOutside = false;
		this.isCollided = false;
		this.hasEnteredScreen = false;
		this.hasBeenRenderedOnce = false;
		this.gameScreen = gameScreen;
	}

	update() {
		this.#rotate();
		this.#updatePosition();
		this.#render();

		if (!this.hasEnteredScreen) this.#gotInside();
		if (this.hasEnteredScreen) this.#isOutOfScreen();

		if (this.hasEnteredScreen && this.isOutside) {
			this.element.remove();
			this.isOutside = true;
		}
		if (this.isCollided) this.element.remove();
	}

	getCollisionShape() {
		return {
			x: this.position.x + this.width / 2,
			y: this.position.y + this.width / 2,
			radius: this.width / 2 - 10,
		};
	}

	#render() {
		this.element.style.left = `${this.position.x}px`;
		this.element.style.top = `${this.position.y}px`;

		this.element.style.transform = `rotate(${this.orientation}rad)`;

		if (!this.hasBeenRenderedOnce) {
			this.element.style.width = `${this.width}px`;
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

	#gotInside() {
		const gameScreenRect = this.gameScreen.getBoundingClientRect();
		const asteroidRect = this.element.getBoundingClientRect();

		const isInside =
			asteroidRect.right >= gameScreenRect.left && // enters from left
			asteroidRect.left <= gameScreenRect.right && // enters from right
			asteroidRect.bottom >= gameScreenRect.top && // enters from top
			asteroidRect.top <= gameScreenRect.bottom; // enters from bottom

		this.hasEnteredScreen = isInside;
	}

	#isOutOfScreen() {
		const gameScreenRect = this.gameScreen.getBoundingClientRect();
		const asteroidRect = this.element.getBoundingClientRect();

		const isOutside =
			asteroidRect.right < gameScreenRect.left || // Left of screen
			asteroidRect.left > gameScreenRect.right || // Right of screen
			asteroidRect.bottom < gameScreenRect.top || // Above screen
			asteroidRect.top > gameScreenRect.bottom; // Below screen

		this.isOutside = isOutside;
	}
}

export default Asteroid;
