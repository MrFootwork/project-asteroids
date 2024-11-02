import Spaceship from './objects/Spaceship.js';

const FRAME_DURATION = Math.round(1000 / 60);

class Game {
	constructor({ gameScreen, spaceshipElement }) {
		// global states
		this.keys = {
			arrowUp: { pressed: false },
			arrowDown: { pressed: false },
			arrowLeft: { pressed: false },
			arrowRight: { pressed: false },
		};
		this.gameScreen = gameScreen;

		// game objects
		this.spaceship = new Spaceship({
			spaceshipElement,
			gameScreen,
			keys: this.keys,
		});

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
	}

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

			default:
				break;
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
