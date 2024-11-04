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
		// console.log(
		// 	'🚀 ~ Asteroid ~ constructor ~ this.hasEnteredScreen, this.isOutside:',
		// 	this.hasEnteredScreen,
		// 	this.isOutside
		// );
	}

	update() {
		this.#rotate();
		this.#updatePosition();
		this.#render();

		const justGotInside = !this.hasEnteredScreen && this.#gotInside();

		// console.log(
		// 	'🚀 ~ Asteroid ~ update ~ !this.hasEnteredScreen, this.isOutside:',
		// 	!this.hasEnteredScreen,
		// 	this.#gotInside(),
		// 	justGotInside
		// );

		if (this.hasEnteredScreen) this.#isOutOfScreen();

		if (justGotInside) {
			console.log('Wlecome Asteroid!');
			this.hasEnteredScreen = true;
			this.element.style.display = 'block';
		}

		if (this.hasEnteredScreen && this.isOutside) {
			this.element.remove();
			this.isOutside = true;
		}

		if (this.isCollided) this.element.remove();

		// console.log(
		// 	'🚀 ~ Asteroid ~ update ~ this.hasEnteredScreen, this.isOutside:',
		// 	this.hasEnteredScreen,
		// 	this.isOutside
		// );
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
		const isInside =
			this.position.x + this.width >= 0 + 20 && // enters from left
			this.position.x <= this.gameScreen.clientWidth - 20 && // enters from right
			this.position.y + this.width >= 0 + 20 && // enters from top
			this.position.y <= this.gameScreen.clientHeight - 20; // enters from bottom

		this.hasEnteredScreen = isInside;

		// console.warn(
		// 	this.position,
		// 	this.width,
		// 	this.gameScreen.clientWidth,
		// 	this.gameScreen.clientHeight,
		// 	isInside
		// );

		return isInside;
	}

	#isOutOfScreen() {
		// console.error(
		// 	this.position,
		// 	this.gameScreen.clientWidth,
		// 	this.gameScreen.clientHeight
		// );

		const isOutside =
			this.position.x + this.width < 0 + 20 || // Left of screen
			this.position.x > this.gameScreen.clientWidth - 20 || // Right of screen
			this.position.y + this.width < 0 + 20 || // Above screen
			this.position.y > this.gameScreen.clientHeight - 20; // Below screen

		this.isOutside = isOutside;
	}
}

export default Asteroid;
