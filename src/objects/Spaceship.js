class Spaceship {
	constructor({ spaceshipElement, gameScreen, keys }) {
		// External State
		this.gameScreen = gameScreen;
		this.element = spaceshipElement;
		this.keys = keys;
		this.isAccelerating = false;
		this.isDecelerating = false;

		// Spaceship Characteristics
		this.ANGLE_OFFSET = Math.PI / 2;
		this.SPEED = 8;
		this.ROTATIONAL_SPEED = 0.2;

		// Internal State
		this.position = { x: 0, y: 0 };
		this.velocity = { x: 0, y: 0 };
		this.rotaionalVelocity = 0;
		this.orientation = 0; // Orientation in radians
		this.thrustOrientation = 0;
		this.dimension = {
			width: spaceshipElement.clientWidth,
			height: spaceshipElement.clientHeight,
		};
		this.hasHitTheEdge = false;
	}

	update() {
		// Might have missed this info during object initialization
		this.#initializeDimension();

		// Actual updates
		this.#updateKeys();
		this.#rotate();
		this.#updateVelocity();
		this.#hitsTheEdge();
		this.#updatePosition();

		this.#render();
	}

	deflectFromObstacle() {
		// Mirror the velocity only in the first frame
		if (this.hasHitTheEdge) {
			this.velocity.x = -this.velocity.x;
			this.velocity.y = -this.velocity.y;

			hitWallSoundPlayer.play();

			this.hasHitTheEdge = false;
		}

		// Allow rotation during deflection
		this.#rotate();

		// Gradually slow down
		const drag = 0.9;
		this.velocity.x *= drag;
		this.velocity.y *= drag;

		// Update Position
		this.#updatePosition();
		this.#render();
	}

	getCurrentVelocity() {
		return {
			x: Math.cos(this.orientation - this.ANGLE_OFFSET),
			y: Math.sin(this.orientation - this.ANGLE_OFFSET),
		};
	}

	getCollisionShape() {
		return {
			x: this.position.x + this.element.clientWidth / 2,
			y: this.position.y + this.element.clientHeight / 2,
			radius: this.element.clientWidth / 2,
		};
	}

	setPosition(position) {
		const defaultWidth = 70;
		const defaultHeight = 70;

		if (!position) {
			this.position.x =
				(gameScreen.clientWidth - this.element.clientWidth || defaultWidth) / 2;
			this.position.y =
				(gameScreen.clientHeight - this.element.clientHeight || defaultHeight) /
				2;
			return;
		}

		this.position.x = position.x;
		this.position.y = position.y;
	}

	setVelocity(velocity) {
		if (!velocity) {
			this.velocity.x = 0;
			this.velocity.y = 0;
			return;
		}

		this.velocity.x = velocity.x;
		this.velocity.y = velocity.y;
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
		this.position.x += this.velocity.x;
		this.position.y += this.velocity.y;
	}

	#initializeDimension() {
		if (!this.dimension.width) {
			this.dimension.width = this.element.clientWidth;
			this.dimension.height = this.element.clientHeight;
		}
	}

	#hitsTheEdge() {
		const hitsTheEdge =
			this.position.x < 0 || // Left of screen
			this.position.x + this.dimension.width > this.gameScreen.clientWidth || // Right of screen
			this.position.y < 0 || // Top of screen
			this.position.y + this.dimension.height > this.gameScreen.clientHeight; // Bottom ofscreen

		this.hasHitTheEdge = hitsTheEdge;
	}
}

export default Spaceship;
