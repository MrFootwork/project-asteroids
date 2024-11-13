class Spaceship {
	constructor({ spaceshipElement, gameScreen, keys, state }) {
		// External State
		this.gameScreen = gameScreen;
		this.element = spaceshipElement;
		this.keys = keys;
		this.isAccelerating = false;
		this.isDecelerating = false;
		this.state = state;

		// Power Distribution
		this.power = {
			shield: 40,
			thruster: 30,
			weapon: 30,
		};

		console.log(this.power);

		// Spaceship Characteristics
		this.ANGLE_OFFSET = Math.PI / 2;
		this.BASE_SPEED = 8;
		this.ROTATIONAL_BASE_SPEED = 0.2;

		// Internal State
		this.health = 100;
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

		// Thrust Sprite Image
		this.thrustImageIsSet = false;
		this.thrustElement = null;
	}

	update() {
		// Might have missed this info during object initialization
		this.#initializeDimension();
		this.#initializeThrustImage();

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

	// Power Distribution
	// FIXME extract logic as seperate function and reuse
	addPowerToShield() {
		if (this.power.shield === 100) return;

		if (this.power.shield > 90) {
			this.power.shield = 100;
			this.power.thruster = 0;
			this.power.weapon = 0;
			return;
		}

		if (this.power.thruster === 0) {
			this.power.shield += 10;
			this.power.weapon -= 10;
			return;
		}

		if (this.power.weapon === 0) {
			this.power.shield += 10;
			this.power.thruster -= 10;
			return;
		}

		this.power.shield += 10;
		this.power.thruster -= 5;
		this.power.weapon -= 5;
		console.log(this.power);
	}

	addPowerToThruster() {
		if (this.power.thruster === 100) return;

		if (this.power.thruster > 90) {
			this.power.thruster = 100;
			this.power.shield = 0;
			this.power.weapon = 0;
			return;
		}

		if (this.power.shield === 0) {
			this.power.thruster += 10;
			this.power.weapon -= 10;
			return;
		}

		if (this.power.weapon === 0) {
			this.power.thruster += 10;
			this.power.shield -= 10;
			return;
		}

		this.power.shield -= 5;
		this.power.thruster += 10;
		this.power.weapon -= 5;
		console.log(this.power);
	}

	addPowerToSWeapon() {
		if (this.power.weapon === 100) return;

		if (this.power.weapon > 90) {
			this.power.thruster = 0;
			this.power.shield = 0;
			this.power.weapon = 100;
			return;
		}

		if (this.power.shield === 0) {
			this.power.weapon += 10;
			this.power.thruster -= 10;
			return;
		}

		if (this.power.thruster === 0) {
			this.power.weapon += 10;
			this.power.shield -= 10;
			return;
		}

		this.power.shield -= 5;
		this.power.thruster -= 5;
		this.power.weapon += 10;
		console.log(this.power);
	}

	#render() {
		this.element.style.left = `${this.position.x}px`;
		this.element.style.top = `${this.position.y}px`;

		this.element.style.transform = `rotate(${this.orientation}rad)`;

		// Render Thrust Animation
		const thrustElementClass = this.thrustElement.classList;
		const thrustingClass = 'thrusting';

		if (this.isAccelerating) thrustElementClass.add(thrustingClass);
		else thrustElementClass.remove(thrustingClass);
	}

	#initializeThrustImage() {
		if (!this.thrustImageIsSet) {
			// Create DIV as image container for thrust animation
			const imageContainer = document.createElement('div');
			this.element.appendChild(imageContainer);

			imageContainer.classList.add('thrust-image-container');

			// Set Spaceship Properties
			this.thrustElement = imageContainer;
			this.thrustImageIsSet = true;
		}
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
		const maxSpeed = this.ROTATIONAL_BASE_SPEED;
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
		const maxSpeed = this.BASE_SPEED;

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
