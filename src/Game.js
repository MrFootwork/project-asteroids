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

		// game objects
		this.spaceship = new Spaceship({
			spaceshipElement,
			gameScreen,
			keys: this.keys,
		});
		this.projectiles = [];

		// internal states
		this.intervalID = '';
		this.currentFrame = 0;
		this.screenSize = {
			width: this.gameScreen.clientWidth,
			height: this.gameScreen.clientHeight,
		};
	}

	start() {
		this.intervalID = setInterval(() => {
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
		// FIXME implement fire rate
		if (this.keys.space.pressed) {
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
		// console.log('🚀 ~ Game ~ resizeScreen ~ this.screenSize:', this.screenSize);
	}
}

export default Game;
