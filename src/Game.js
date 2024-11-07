import Spaceship from './objects/Spaceship.js';
import Projectile from './objects/Projectile.js';
import Asteroid from './objects/Asteroid.js';
import levelDictionary from '../data/levels.js';
import { getBasePath } from './helper/path.js';
const FRAMES_PER_SECOND = 60;
const FRAME_DURATION = Math.round(1000 / FRAMES_PER_SECOND);
// TESTING time
const TIME_TO_SURVIVE = Infinity; // 2 minutes

class Game {
	constructor({ gameScreen, state }) {
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
		this.state = state;

		/*******************************
		 *	Internal State
		 *******************************/
		this.currentFrame = 0;
		this.gameloopIntervalID = null;

		/*******************************
		 *	Game State
		 *******************************/
		// Level
		this.currentLevelID = 1;
		this.currentLevel = levelDictionary[this.currentLevelID];
		this.remainingTime = TIME_TO_SURVIVE;

		// Player
		this.spaceship = new Spaceship({
			spaceshipElement: this.#createSpaceshipElement(),
			gameScreen,
			keys: this.keys,
			state,
		});
		this.player = {
			lives: 3,
			score: 0,
			hasWon: false,
		};
		this.frameAtObstacleHit = null;
		this.HIT_OBSTACLE_DURATION = 40;

		// Projectiles
		this.projectiles = [];
		this.fireRate = FRAMES_PER_SECOND / 2; // Time in frames between shots
		this.lastFired = null; // Timestamp of the last shot

		// Asteroids
		this.asteroids = [];
		this.baseAsteroidSpeed = 1.5;
	}

	/*******************************
	 *	Public Methods
	 *******************************/
	/** Starts the game engine. */
	start() {
		// Initial Render
		requestAnimationFrame(() => {
			timeDisplay.textContent = this.getFormattedRemainingTime();
			this.#updateScore();
			this.#updatePlayerLives();
			this.#updateTime();
		});

		// Access dimensions after start is called, ensuring the DOM is ready
		this.screenSize = {
			width: this.gameScreen.clientWidth,
			height: this.gameScreen.clientHeight,
		};

		this.currentLevel = levelDictionary[this.currentLevelID];
		this.#spawnInitialAsteroids(this.currentLevel.initialAsteroids);

		// Finally start the loops
		requestAnimationFrame(() => this.#startLoopInterval());
	}

	reset() {
		clearInterval(this.gameloopIntervalID);
		this.gameloopIntervalID = null;
		this.currentFrame = 0;
		this.remainingTime = TIME_TO_SURVIVE;

		// Determine next leve ID
		if (!this.player.hasWon) this.currentLevelID = 1;
		if (this.player.hasWon && levelDictionary[this.currentLevelID + 1])
			++this.currentLevelID;

		// Load data for next level
		this.currentLevel = levelDictionary[this.currentLevelID];

		// Reset playerWon flag
		this.player.hasWon = false;

		// Remove all remaining elements
		[this.asteroids, this.projectiles].forEach((container, i) => {
			// HACK list all game objects
			const selectors = ['.asteroid', '.projectile'];

			// Remove all remaining objects from game
			for (let i = container.length - 1; i >= 0; i--) {
				container[i].element.remove();
				container.splice(i, 1);
			}

			// Also remove all remaining objects in the DOM, just in case
			const orphanedObjects = document.querySelectorAll(selectors[i]);
			for (const object of orphanedObjects) object.remove();
		});

		// Player
		this.player.lives = 3;
		this.player.score = 0;

		// Spaceship
		this.spaceship.setPosition(this.currentLevel.startPosition);
		this.spaceship.setVelocity();
		this.spaceship.orientation = 0;
		this.spaceship.update();

		// Projectiles
		this.fireRate = Math.round(1000 / 12); // Time in milliseconds between shots
		this.lastFired = null;

		// Asteroids
		this.baseAsteroidSpeed = this.currentLevel.asteroidSpeed;
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
		const minutes = Math.floor(this.remainingTime / 60);
		const seconds = (this.remainingTime % 60).toString().padStart(2, '0');

		return `${minutes}:${seconds}`;
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

				if (this.player.lives === 0) {
					this.gameScreen.parentElement.style.backgroundColor = 'black';
					this.gameScreen.classList.add('shake');
				}

				return;
			}

			this.#gameLoop();
		}, FRAME_DURATION);
	}

	#updateBackground() {
		setBackgroundPosition({
			spaceshipVelocity: this.spaceship.velocity,
			backgroundElement: backgroundImageSolid,
			decelerationFactor: 0.03,
		});
		setBackgroundPosition({
			spaceshipVelocity: this.spaceship.velocity,
			backgroundElement: backgroundImageTransparent,
			decelerationFactor: 0.02,
		});
	}

	#gameLoop() {
		if (this.spaceship.hasHitTheEdge || this.frameAtObstacleHit) {
			this.#animateDeflection();
		} else this.spaceship.update();

		this.#updateBackground();
		this.#createProjectile();
		this.#spawnLaterAsteroids();

		/***************************************************
		 * 	Projectile Updates
		 * -------------------------------------------------
		 * 	Loops through projectiles, checks for collisions
		 * 	with asteroids or out of bound events and removes
		 * 	both from DOM and game.
		 ***************************************************/
		projectileLoop: for (let i = this.projectiles.length - 1; i >= 0; i--) {
			const projectile = this.projectiles[i];

			asteroidLoop: for (let j = this.asteroids.length - 1; j >= 0; j--) {
				const asteroid = this.asteroids[j];

				const projectileHitsAsteroid = isColliding(
					projectile.getCollisionShape(),
					asteroid.getCollisionShape()
				);

				if (projectileHitsAsteroid) {
					// play sound
					const sound = new Audio('assets/sounds/rock-break.mp3');
					if (this.state.sfxOn) sound.play();

					// handle score
					this.player.score++;
					this.#updateScore();

					// handle projectile
					projectile.hasHitTarget = true;

					// handle asteroid
					asteroid.isShot = true;
					asteroid.element.remove();
					this.asteroids.splice(j, 1);

					break asteroidLoop;
				}
			}

			// Remove projectile
			if (projectile.isOutside || projectile.hasHitTarget) {
				projectile.element.remove();
				this.projectiles.splice(i, 1);

				continue projectileLoop;
			}

			// Update projectile
			projectile.update();
		}

		/***************************************************
		 * 	Asteroid Updates
		 * -------------------------------------------------
		 * 	Loops through asteroids, checks for collisions
		 * 	with player or out of bound events and removes
		 * 	asteroids from DOM and game.
		 ***************************************************/
		for (let i = this.asteroids.length - 1; i >= 0; i--) {
			const asteroid = this.asteroids[i];

			const asteroidHitsPlayer = isColliding(
				this.spaceship.getCollisionShape(),
				asteroid.getCollisionShape()
			);

			if (asteroidHitsPlayer) {
				// handle collision
				asteroid.hasCollided = true;
				this.player.lives--;
				this.#updatePlayerLives();
			}

			// If collision kills player, asteroid should stay visible
			if (asteroidHitsPlayer && !this.player.lives) break;

			// Remove asteroid
			const leavesAfterEntry = asteroid.hasEnteredScreen && asteroid.isOutside;

			if (
				leavesAfterEntry ||
				asteroid.hasCollided ||
				asteroid.isShot ||
				asteroidHitsPlayer
			) {
				asteroid.element.remove();
				this.asteroids.splice(i, 1);

				continue;
			}

			// Update asteroid
			asteroid.update();
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
			case 'Pause':
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
		const playerIsDead = this.player.lives === 0;

		if (timeIsUp && !playerIsDead) {
			this.player.hasWon = true;
		}

		if (timeIsUp || playerIsDead) {
			console.log(
				'Game has ended. TimeIsUp, playerIsDead: ',
				timeIsUp,
				playerIsDead
			);
		}

		return timeIsUp || playerIsDead;
	}

	#stopLoopInterval() {
		clearInterval(this.gameloopIntervalID);
		this.gameloopIntervalID = null;
	}

	#animateDeflection() {
		// Store the first frame
		if (!this.frameAtObstacleHit) this.frameAtObstacleHit = this.currentFrame;

		// Animate the deflection until animation duration has ended
		this.spaceship.deflectFromObstacle();

		// Check if animation duration has passed
		const reachedLastAnimationFrame =
			this.currentFrame - this.frameAtObstacleHit >= this.HIT_OBSTACLE_DURATION;

		// Stop the animation
		if (reachedLastAnimationFrame) this.frameAtObstacleHit = null;
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
			Math.floor(Math.random() * 4)
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
				position.x = this.screenSize.width + 100;
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
		asteroidImage.src = `${getBasePath()}assets/images/asteroid.png`;

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
			(this.currentFrame * FRAMES_PER_SECOND) % this.currentLevel.spawnRate ===
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

			const sound = new Audio('assets/sounds/laser-gun-shot.mp3');
			if (this.state.sfxOn) sound.play();

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

	#updateScore() {
		scoreDisplay.textContent = this.player.score;
	}

	#updatePlayerLives() {
		livesDisplay.textContent = this.player.lives;
	}

	#createSpaceshipElement() {
		const spaceshipElement = document.createElement('div');
		spaceshipElement.id = 'spaceship';

		const spaceshipImageElement = document.createElement('img');
		spaceshipImageElement.src = `${getBasePath()}assets/images/spaceship.png`;

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

/**
 * 	Moves the background image of an Element opposite to the spaceship velocity.
 * 	`decelerationFactor` should be between `0` and `1`.
 *	`0`: not moving
 *	`1`: extremely fast
 *
 * @param {{
 * 	spaceshipVelocity: {x: number, y: number};
 * 	backgroundElement: Element;
 * 	decelerationFactor: number;
 * }} param0
 *
 * @param {*} param0.spaceshipPosition
 * @param {*} param0.backgroundElement
 * @param {*} param0.decelerationFactor
 */
function setBackgroundPosition({
	spaceshipVelocity,
	backgroundElement,
	decelerationFactor,
}) {
	const computedStyle = window.getComputedStyle(backgroundElement);

	const hasLinearGradient = computedStyle.backgroundPosition.includes(', ');
	const backgroundImageIndex = hasLinearGradient ? 1 : 0;

	const [xPosition, yPosition] = hasLinearGradient
		? computedStyle.backgroundPosition
				.split(', ')
				[backgroundImageIndex].split(' ')
		: computedStyle.backgroundPosition.split(' ');

	const xValue =
		parseFloat(xPosition) + spaceshipVelocity.x * decelerationFactor;
	const yValue =
		parseFloat(yPosition) + spaceshipVelocity.y * decelerationFactor;

	backgroundElement.style.backgroundPosition = `${
		hasLinearGradient ? '50% 50%, ' : ''
	}${xValue}% ${yValue}%`;
}

export default Game;
