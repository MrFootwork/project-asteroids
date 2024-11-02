import Spaceship from './objects/Spaceship.js';

const FRAME_DURATION = Math.round(1000 / 60);

class Game {
	constructor({ gameScreen, spaceshipElement }) {
		// global states
		this.keys = {
			ArrowUp: { pressed: false },
			ArrowLeft: { pressed: false },
			ArrowRight: { pressed: false },
		};
		this.gameScreen = gameScreen;
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
				this.keys.ArrowUp.pressed = true;
				break;
			case 'ArrowLeft':
			case 'KeyA':
				this.keys.ArrowLeft.pressed = true;
				break;
			case 'ArrowRight':
			case 'KeyD':
				this.keys.ArrowRight.pressed = true;
				break;

			default:
				break;
		}
	}

	onKeyUp(event) {
		switch (event.code) {
			case 'ArrowUp':
			case 'KeyW':
				this.keys.ArrowUp.pressed = false;
				break;
			case 'ArrowLeft':
			case 'KeyA':
				this.keys.ArrowLeft.pressed = false;
				break;
			case 'ArrowRight':
			case 'KeyD':
				this.keys.ArrowRight.pressed = false;
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
