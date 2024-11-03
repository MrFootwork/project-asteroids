import Spaceship from './objects/Spaceship.js';
import Projectile from './objects/Projectile.js';

const FRAME_DURATION = Math.round(1000 / 60);

class Game {
	constructor({ gameScreen, spaceshipElement }) {
		// global states
		this.keys = {
			arrowUp: { pressed: false },
			arrowDown: { pressed: false },
			arrowLeft: { pressed: false },
			arrowRight: { pressed: false },
			space: { pressed: false },
		};
		this.gameScreen = gameScreen;

		// game states
		this.spaceship = new Spaceship({
			spaceshipElement,
			gameScreen,
			keys: this.keys,
		});
		this.projectiles = [];
		this.asteroids = [];
		this.currentLevelIndex = 0;
		this.fireRate = Math.round(1000 / 12); // Time in milliseconds between shots
		this.lastFired = 0; // Timestamp of the last shot

		// internal states
		this.gameloopIntervalID = null;
		this.currentFrame = 0;
		this.screenSize = {
			width: this.gameScreen.clientWidth,
			height: this.gameScreen.clientHeight,
		};
		this.spawnIntervalID = null;
	}

	start() {
		this.gameloopIntervalID = setInterval(() => {
			this.gameLoop();
			this.currentFrame++;
		}, FRAME_DURATION);
	}

	gameLoop() {
		this.spaceship.update();
		this.#createProjectile();

		// update and garbage collect projectiles
		for (let i = this.projectiles.length - 1; i >= 0; i--) {
			this.projectiles[i].update();
			if (this.projectiles[i].isOutside) this.projectiles.splice(i, 1);
		}
	}

	// key press handling
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

			default:
				break;
		}
	}

	#createProjectile() {
		// Check if enough time has passed since the last shot
		const now = Date.now();

		if (this.keys.space.pressed && now - this.lastFired >= this.fireRate) {
			// Update the last fired timestamp
			this.lastFired = now;

			const projectileElement = document.createElement('div');
			projectileElement.id = 'projectile';
			this.gameScreen.appendChild(projectileElement);

			this.projectiles.push(
				new Projectile({
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
				})
			);
		}
	}

	resizeScreen() {
		this.screenSize = {
			width: this.gameScreen.clientWidth,
			height: this.gameScreen.clientHeight,
		};
	}
}

export default Game;
