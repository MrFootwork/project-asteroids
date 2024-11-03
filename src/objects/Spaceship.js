class Spaceship {
	constructor({ spaceshipElement, gameScreen, keys }) {
		// global states
		this.gameScreen = gameScreen;
		this.element = spaceshipElement;
		this.keys = keys;
		this.isAccelerating = false;
		this.isDecelerating = false;

		// ship characteristics
		this.ANGLE_OFFSET = Math.PI / 2;
		this.SPEED = 8;
		this.ROTATIONAL_SPEED = 0.2;

		// internal states
		this.position = { x: 200, y: 400 };
		this.velocity = { x: 0, y: 0 };
		this.rotaionalVelocity = 0;
		this.orientation = 0; // Orientation in radians
		this.thrustOrientation = 0;
	}

	update() {
		this.#updateKeys();
		this.#rotate();
		this.#updateVelocity();
		this.#updatePosition();

		this.#render();
	}

	getCurrentVelocity() {
		return {
			x: Math.cos(this.orientation - this.ANGLE_OFFSET),
			y: Math.sin(this.orientation - this.ANGLE_OFFSET),
		};
	}

	#render() {
		this.element.style.left = `${this.position.x}px`;
		this.element.style.top = `${this.position.y}px`;

		this.element.style.transform = `rotate(${this.orientation}rad)`;
	}

	#updateKeys() {
		this.isAccelerating = this.keys.arrowUp.pressed;
		this.isDecelerating = this.keys.arrowDown.pressed;
	}

	#rotate() {
		let direction = 0;
		if (this.keys.arrowLeft.pressed) direction = -1;
		if (this.keys.arrowRight.pressed) direction = 1;

		// Accelerate rotational velocity gradually
		const acceleration = 0.03; // Lower this for finer control on initial tap
		this.rotaionalVelocity += direction * acceleration;

		// Apply drag to smooth out the movement
		const drag = 0.8;
		this.rotaionalVelocity *= drag;

		// Cap the rotational speed
		const maxSpeed = this.ROTATIONAL_SPEED;
		if (this.rotaionalVelocity > maxSpeed) this.rotaionalVelocity = maxSpeed;
		if (this.rotaionalVelocity < -maxSpeed) this.rotaionalVelocity = -maxSpeed;

		this.orientation += this.rotaionalVelocity;
	}

	#updateVelocity() {
		// Calculate thrust vector based on current orientation
		let thrustMagnitude = 0;
		if (this.isAccelerating) thrustMagnitude = 0.2;

		const thrustX =
			thrustMagnitude * Math.cos(this.orientation - this.ANGLE_OFFSET);
		const thrustY =
			thrustMagnitude * Math.sin(this.orientation - this.ANGLE_OFFSET);

		// Add thrust vector to the existing velocity
		this.velocity.x += thrustX;
		this.velocity.y += thrustY;

		// Apply a slight drag to naturally slow the spaceship over time
		const drag = 0.99;
		this.velocity.x *= drag;
		this.velocity.y *= drag;

		// decelerate
		if (this.isDecelerating) {
			const decelerationFactor = 0.94;
			this.velocity.x *= decelerationFactor;
			this.velocity.y *= decelerationFactor;
		}

		// Limit speed to max speed
		const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
		const maxSpeed = this.SPEED;

		if (speed > maxSpeed) {
			// Scale velocity down to max speed
			this.velocity.x = (this.velocity.x / speed) * maxSpeed;
			this.velocity.y = (this.velocity.y / speed) * maxSpeed;
		}
	}

	#updatePosition() {
		// FIXME keep spaceship in bound
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}
}

export default Spaceship;
