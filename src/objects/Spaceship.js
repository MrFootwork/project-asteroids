class Spaceship {
	constructor({ spaceshipElement, gameScreen, keys }) {
		// global states
		this.gameScreen = gameScreen;
		this.element = spaceshipElement;
		this.keys = keys;
		this.isAccellerating = false;

		// ship characteristics
		this.ANGEL_OFFSET = (45 * Math.PI) / 2;
		this.SPEED = 6;
		this.ROTATIONAL_SPEED = 0.13;

		// internal states
		this.position = { x: 200, y: 400 };
		this.velocity = { x: 0, y: 0 };
		this.orientation = 0; // Orientation in radians
		this.thrustOrientation = 0;
	}

	update() {
		this.isAccellerating = this.keys.arrowUp.pressed;

		this.#rotate();
		this.#updateVelocity();
		this.#updatePosition();

		this.#render();
	}

	getCurrentVelocity() {
		return {
			x: Math.cos(this.orientation - this.ANGEL_OFFSET),
			y: Math.sin(this.orientation - this.ANGEL_OFFSET),
		};
	}

	#render() {
		this.element.style.left = `${this.position.x}px`;
		this.element.style.top = `${this.position.y}px`;

		this.element.style.transform = `rotate(${this.orientation}rad)`;
	}

	#rotate() {
		let direction = 0;
		if (this.keys.arrowLeft.pressed) direction = -1;
		if (this.keys.arrowRight.pressed) direction = 1;

		this.orientation += direction * this.ROTATIONAL_SPEED;
	}

	#updateVelocity() {
		const initialVelocity = this.isAccellerating ? 1 : 0;
		const isSlow = this.velocity.x < 0.5 && this.velocity.y < 0.5;
		const accelerationFactor = this.isAccellerating ? 1.1 : 0.98;
		const decelerationFactor = 0.9;
		const reachedMaxSpeed = this.velocity.x >= this.SPEED;

		// start fast and stop calculation when too slow
		if (isSlow) {
			this.velocity.x = initialVelocity;
			this.velocity.y = initialVelocity;
			return;
		}

		// decelerate
		if (this.keys.arrowDown.pressed) {
			this.velocity.x *= decelerationFactor;
			this.velocity.y *= decelerationFactor;
			return;
		}

		if (this.isAccellerating) this.thrustOrientation = this.orientation;

		// accelerate until max speed or slow down
		if ((this.isAccellerating && !reachedMaxSpeed) || !this.isAccellerating) {
			this.velocity.x *= accelerationFactor;
			this.velocity.y *= accelerationFactor;
		}
	}

	#updatePosition() {
		const orientation = this.isAccellerating
			? this.orientation - this.ANGEL_OFFSET
			: this.thrustOrientation - this.ANGEL_OFFSET;

		this.position.x += this.velocity.x * Math.cos(orientation);
		this.position.y += this.velocity.y * Math.sin(orientation);
	}
}

export default Spaceship;
