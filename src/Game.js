import Spaceship from './objects/Spaceship.js';

class Game {
	constructor({}) {
		this.spaceship = new Spaceship({});
	}

	test(f) {
		f();
	}
}

export default Game;
