import Spaceship from './objects/Spaceship.js';
import Projectile from './objects/Projectile.js';
import Asteroid from './objects/Asteroid.js';
import levels from '../data/levels.js';

const FRAMES_PER_SECOND = 60;
const FRAME_DURATION = Math.round(1000 / FRAMES_PER_SECOND);
const TIME_TO_SURVIVE = 120; // 2 minutes

// TODO test, if still needed after using vite bundling
const isGitHubPages = window.location.hostname === 'mrfootwork.github.io';
const basePath = isGitHubPages ? '/project-asteroids/' : '';

class Game {
	constructor({ gameScreen }) {
		/*******************************
		 *	External State
		 *******************************/
		this.keys = {
			arrowUp: { pressed: false },
			arrowDown: { pressed: false },
			arrowLeft: { pressed: false },
			arrowRight: { pressed: false },
			space: { pressed: false },
		};
		this.gameScreen = gameScreen;

		/*******************************
		 *	Internal State
		 *******************************/
		this.currentFrame = 0;
		this.gameloopIntervalID = null;

		/*******************************
		 *	Game State
		 *******************************/
		// Level
		this.currentLevelIndex = 0;
		this.remainingTime = TIME_TO_SURVIVE;

		// Player
		this.spaceship = new Spaceship({
			spaceshipElement: this.#createSpaceshipElement(),
			gameScreen,
			keys: this.keys,
		});
		this.playerLives = 3;
		this.playerScore = 0;

		// Projectiles
		this.projectiles = [];
		this.fireRate = Math.round(1000 / 12); // Time in milliseconds between shots
		this.lastFired = 0; // Timestamp of the last shot

		// Asteroids
		this.asteroids = [];
		this.baseAsteroidSpeed = 1.5;
	}

	/*******************************
	 *	Public Methods
	 *******************************/

	/** Starts the game engine. */
	start() {
		// Access dimensions after start is called, ensuring the DOM is ready
		this.screenSize = {
			width: this.gameScreen.clientWidth,
			height: this.gameScreen.clientHeight,
		};

		this.#loadLevelData(this.currentLevelIndex);
		this.#spawnInitialAsteroids(this.currentLevel.initialAsteroids);
		this.#startLoopInterval();
	}

	resizeScreen() {
		this.screenSize = {
			width: this.gameScreen.clientWidth,
			height: this.gameScreen.clientHeight,
		};
	}

	/**
	 * Returns a formatted string for the remaining game time
	 *
	 * @returns {string} `"1:35"` for `this.remainingTime = 95`
	 */
	getFormattedRemainingTime() {
		return `${Math.floor(this.remainingTime / 60)}:${this.remainingTime % 60}`;
	}

	/*******************************
	 *	Game Loop
	 *******************************/
	#startLoopInterval() {
		this.gameloopIntervalID = setInterval(() => {
			this.currentFrame++;
			this.#updateTime();

			if (this.#playerWinsOrLooses()) {
				this.#stopLoopInterval();
				return;
			}

			this.#gameLoop();
		}, FRAME_DURATION);
	}

	#gameLoop() {
		this.spaceship.update();
		this.#createProjectile();
		this.#spawnLaterAsteroids();

		// Handle Collision Detection and Garbage Collection
		// update and garbage-collect projectiles
		for (let i = this.projectiles.length - 1; i >= 0; i--) {
			this.projectiles[i].update();

			for (let j = this.asteroids.length - 1; j >= 0; j--) {
				if (
					isColliding(
						this.projectiles[i].getCollisionShape(),
						this.asteroids[j].getCollisionShape()
					)
				) {
					// handle projectile
					this.projectiles[i].isCollided = true;
					this.projectiles[i].update();
					this.projectiles.splice(i, 1);
					// handle asteroid
					this.asteroids[j].isCollided = true;
					this.asteroids[j].update();
					this.asteroids.splice(j, 1);
				}
			}
			if (this.projectiles[i].isOutside) this.projectiles.splice(i, 1);
		}

		// update and garbage-collect asteroids
		for (let i = this.asteroids.length - 1; i >= 0; i--) {
			if (
				isColliding(
					this.spaceship.getCollisionShape(),
					this.asteroids[i].getCollisionShape()
				)
			) {
				// handle collision
				clearInterval(this.gameloopIntervalID);
				this.gameScreen.parentElement.style.backgroundColor = 'black';
				this.gameScreen.classList.add('shake');
			}

			this.asteroids[i].update();
			if (this.asteroids[i].isOutside) this.asteroids.splice(i, 1);
		}
	}

	/*******************************
	 *	Handle Events
	 *******************************/
	onKeyDown(event) {
		switch (event.code) {
			case 'ArrowUp':
			case 'KeyW':
				this.keys.arrowUp.pressed = true;
				break;
			case 'ArrowDown':
			case 'KeyS':
				this.keys.arrowDown.pressed = true;
				break;
			case 'ArrowLeft':
			case 'KeyA':
				this.keys.arrowLeft.pressed = true;
				break;
			case 'ArrowRight':
			case 'KeyD':
				this.keys.arrowRight.pressed = true;
				break;
			case 'Space':
				this.keys.space.pressed = true;
				break;

			default:
				break;
		}
	}

	onKeyUp(event) {
		switch (event.code) {
			case 'ArrowUp':
			case 'KeyW':
				this.keys.arrowUp.pressed = false;
				break;
			case 'ArrowDown':
			case 'KeyS':
				this.keys.arrowDown.pressed = false;
				break;
			case 'ArrowLeft':
			case 'KeyA':
				this.keys.arrowLeft.pressed = false;
				break;
			case 'ArrowRight':
			case 'KeyD':
				this.keys.arrowRight.pressed = false;
				break;
			case 'Space':
				this.keys.space.pressed = false;
				break;
			case 'KeyP':
				this.pauseOrResumeGame();
				break;

			default:
				break;
		}
	}

	pauseOrResumeGame() {
		if (this.gameloopIntervalID) {
			this.#stopLoopInterval();
			return;
		}

		if (!this.gameloopIntervalID) {
			this.#startLoopInterval();
			return;
		}
	}

	/*******************************
	 *	Private Methods
	 *******************************/
	#playerWinsOrLooses() {
		const timeIsUp = this.remainingTime === 0;
		return timeIsUp;
	}

	#stopLoopInterval() {
		clearInterval(this.gameloopIntervalID);
		this.gameloopIntervalID = null;
	}

	#loadLevelData(levelIndex) {
		this.currentLevel = levels[levelIndex];
	}

	#spawnInitialAsteroids(count) {
		for (let i = 0; i < count; i++) {
			this.#spawnAsteroid();
		}
	}

	#spawnAsteroid() {
		let position = { x: null, y: null };

		const width = 50 + Math.floor(Math.random() * 150);

		const randomSide = ['top', 'right', 'bottom', 'left'][
			Math.floor(Math.random() * 3)
		];

		// randomize flight direction (orientation for velocity)
		let orientation = null;
		const baseSpread = 0.3;
		const angledSpread = baseSpread * Math.random() - baseSpread / 2;
		let correction = null;
		const correctionFraction = 1 / 1.1;

		switch (randomSide) {
			case 'top':
				position.x = Math.floor(Math.random() * this.screenSize.width);
				position.y = 0 - width;
				correction =
					(position.x / this.screenSize.width - 0.5) * correctionFraction;
				orientation = (0.5 + angledSpread + correction) * Math.PI;
				break;

			case 'right':
				position.x = this.screenSize.width - 100;
				position.y = Math.floor(Math.random() * this.screenSize.height);
				correction =
					(position.y / this.screenSize.height - 0.5) * correctionFraction;
				orientation = (1 + angledSpread + correction) * Math.PI;
				break;

			case 'bottom':
				position.x = Math.floor(Math.random() * this.screenSize.width);
				position.y = this.screenSize.height;
				correction =
					(position.x / this.screenSize.width - 0.5) * correctionFraction;
				orientation = (1.5 + angledSpread - correction) * Math.PI;
				break;

			case 'left':
				position.x = 0 - width;
				position.y = Math.floor(Math.random() * this.screenSize.height);
				correction =
					(position.y / this.screenSize.height - 0.5) * correctionFraction;
				orientation = (2 + angledSpread - correction) * Math.PI;
				break;

			default:
				break;
		}

		const asteroidSpeed =
			0.2 +
			Math.random() *
				this.baseAsteroidSpeed *
				this.currentLevel.speedMultiplier;

		const velocity = {
			x: asteroidSpeed * Math.cos(orientation),
			y: asteroidSpeed * Math.sin(orientation),
		};

		// build asteroid in DOM
		const asteroidElement = document.createElement('div');
		asteroidElement.className = 'asteroid';

		const asteroidImage = document.createElement('img');
		asteroidImage.src = `${basePath}assets/images/asteroid.png`;

		asteroidElement.appendChild(asteroidImage);
		this.gameScreen.appendChild(asteroidElement);

		// create Asteroid
		const asteroid = new Asteroid({
			position,
			velocity,
			width,
			element: asteroidElement,
			gameScreen: this.gameScreen,
		});

		// push Asteroid to array
		this.asteroids.push(asteroid);
	}

	#spawnLaterAsteroids() {
		// TODO randomize, so asteroids don't spawn too statically
		if (
			(this.currentFrame * FRAMES_PER_SECOND) %
				levels[this.currentLevelIndex].spawnRate ===
			0
		) {
			this.#spawnAsteroid();
		}
	}

	#createProjectile() {
		// Check if enough time has passed since the last shot
		const now = Date.now();

		if (this.keys.space.pressed && now - this.lastFired >= this.fireRate) {
			// Update the last fired timestamp
			this.lastFired = now;

			const projectileElement = document.createElement('div');
			projectileElement.className = 'projectile';
			this.gameScreen.appendChild(projectileElement);

			const projectile = new Projectile({
				gameScreen: this.gameScreen,
				position: {
					x: this.spaceship.position.x,
					y: this.spaceship.position.y,
				},
				velocity: {
					x: 8 * this.spaceship.getCurrentVelocity().x,
					y: 8 * this.spaceship.getCurrentVelocity().y,
				},
				projectileElement,
				orientation: this.spaceship.orientation,
				spaceshipElement: this.spaceship.element,
			});

			this.projectiles.push(projectile);
		}
	}

	#updateTime() {
		if (this.currentFrame % FRAMES_PER_SECOND === 0) {
			this.remainingTime--;
			timeDisplay.textContent = this.getFormattedRemainingTime();
		}
	}

	#createSpaceshipElement() {
		const spaceshipElement = document.createElement('div');
		spaceshipElement.id = 'spaceship';

		const spaceshipImageElement = document.createElement('img');
		spaceshipImageElement.src = `${basePath}assets/images/spaceship.png`;

		spaceshipElement.appendChild(spaceshipImageElement);
		this.gameScreen.appendChild(spaceshipElement);

		return spaceshipElement;
	}
}

/*******************************
 *	Helper Functions
 *******************************/
function isColliding(circle1, circle2) {
	const dx = circle2.x - circle1.x;
	const dy = circle2.y - circle1.y;
	const distance = Math.sqrt(dx ** 2 + dy ** 2);

	return distance < circle1.radius + circle2.radius;
}

export default Game;
