import Spaceship from './objects/Spaceship.js';

const FRAME_DURATION = Math.round(1000 / 60);

class Game {
	constructor({ gameScreen, spaceshipElement }) {
		this.gameScreen = gameScreen;
		this.spaceship = new Spaceship({ spaceshipElement, gameScreen });
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
		this.spaceship.render();
	}

	onKeyDown(event) {
		switch (event.key) {
			case 'ArrowUp':
				// TODO toggle isThrusting instead
				// console.log(this.spaceship);
				this.spaceship.thrust();
				break;
			case 'ArrowLeft':
				this.spaceship.rotate();
				break;
			case 'ArrowRight':
				this.spaceship.rotate();
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
