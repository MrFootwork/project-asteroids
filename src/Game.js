import Spaceship from './objects/Spaceship.js';

class Game {
	constructor({ gameScreen, spaceshipElement }) {
		this.gameScreen = gameScreen;
		this.spaceship = new Spaceship({ spaceshipElement, gameScreen });
		this.intervalID = '';
		this.currentFrame = 0;
	}

	start() {
		this.intervalID = setInterval(() => {
			// console.log(this.currentFrame++);
			this.gameLoop();
		}, 1000 / 60);
	}

	gameLoop() {
		this.spaceship.render();
	}

	onKeyDown = event => {
		// console.log(event.key, event.code);
		switch (event.key) {
			case 'ArrowUp':
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
	};
}

export default Game;
