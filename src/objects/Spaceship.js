class Spaceship {
	constructor({ spaceshipElement, gameScreen }) {
		this.gameScreen = gameScreen;
		this.element = spaceshipElement;
		this.position = { x: 200, y: 400 };
		this.orientation = 0;
	}

	render() {
		this.element.style.left = `${this.position.x}px`;
		this.element.style.bottom = `${this.position.y}px`;
	}

	thrust() {
		console.log('thrust');
	}

	rotate() {
		console.log('rotating');
	}
}

export default Spaceship;
