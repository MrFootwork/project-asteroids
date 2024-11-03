class Projectile {
	constructor({
		gameScreen,
		spaceshipElement,
		position,
		velocity,
		projectileElement,
		orientation,
	}) {
		// global states
		this.gameScreen = gameScreen;
		this.spaceshipElement = spaceshipElement;
		this.element = projectileElement;

		// internal states
		this.position = position;
		this.velocity = velocity;
		this.orientation = orientation;
		this.hasBeenRenderedOnce = false;
		this.isOutside = false;
		this.isCollided = false;
		this.width = 20;
	}

	update() {
		this.#render();
		this.#updatePosition();
		if (this.#isOutOfScreen()) {
			this.element.remove();
			this.isOutside = true;
		}
		if (this.isCollided) this.element.remove();
	}

	getCollisionShape() {
		return {
			x: this.position.x + this.width / 2 + 20,
			y: this.position.y + this.width / 2 + 20,
			radius: this.width / 2,
		};
	}

	#render() {
		this.element.style.left = `${this.position.x}px`;
		this.element.style.top = `${this.position.y}px`;

		if (!this.hasBeenRenderedOnce) {
			this.element.style.width = `${this.width}px`;
			this.element.style.transform = `
        translateX(${(this.spaceshipElement.clientWidth - this.width) / 2}px)
        translateY(${(this.spaceshipElement.clientHeight - this.width) / 2}px)
        rotate(${this.orientation}rad)
        translateY(-${
					(this.spaceshipElement.clientHeight - this.width + 30) / 2
				}px)
      `;
			this.hasBeenRenderedOnce = true;
		}
	}

	#updatePosition() {
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}

	#isOutOfScreen() {
		const gameScreenRect = this.gameScreen.getBoundingClientRect();
		const projectileRect = this.element.getBoundingClientRect();

		const isOutside =
			projectileRect.right < gameScreenRect.left || // Left of screen
			projectileRect.left > gameScreenRect.right || // Right of screen
			projectileRect.bottom < gameScreenRect.top || // Above screen
			projectileRect.top > gameScreenRect.bottom; // Below screen

		return isOutside;
	}
}

export default Projectile;
