import Game from './Game.js';

const isGitHubPages = window.location.hostname === 'mrfootwork.github.io';
const basePath = isGitHubPages ? '/project-asteroids/' : '';

document.addEventListener('DOMContentLoaded', () => {
	/***********************************
	 *  HTML Elements
	 ***********************************/
	// Home Screen
	const homeScreen = document.querySelector('#homeScreen');
	const startButton = document.querySelector('#startButton');

	// Game Screen
	const gameScreen = document.querySelector('#gameScreen');
	const gameOverButton = document.querySelector('#gameOverButton');

	// Result Screen
	const resultScreen = document.querySelector('#resultScreen');
	const toHomeButton = document.querySelector('#toHomeButton');

	/***********************************
	 *  Event Listeners
	 ***********************************/
	// Home Screen
	startButton.addEventListener('click', onStart);

	// Game Screen
	gameOverButton.addEventListener('click', onGameOver);

	// Result Screen
	toHomeButton.addEventListener('click', onToHome);

	/***********************************
	 *  Event Handlers
	 ***********************************/
	// Home Screen
	function onStart() {
		homeScreen.style.display = 'none';
		gameScreen.style.display = 'block';
	}

	// Game Screen
	function onGameOver() {
		gameScreen.style.display = 'none';
		resultScreen.style.display = 'block';
	}

	// Result Screen
	function onToHome() {
		resultScreen.style.display = 'none';
		homeScreen.style.display = 'block';
	}

	/***********************************
	 *  Game Engine
	 ***********************************/
	// create spaceship element
	const spaceshipElement = createSpaceship();

	// instantiate game
	const game = new Game({ gameScreen, spaceshipElement });

	// game relevant event listeners
	document.addEventListener('keydown', e => game.onKeyDown(e));
	document.addEventListener('keyup', e => game.onKeyUp(e));
	window.addEventListener('resize', game.resizeScreen);

	// start game
	onStart();
	game.start();

	// functions

	function createSpaceship() {
		const spaceshipElement = document.createElement('div');
		spaceshipElement.id = 'spaceship';
		const spaceshipImageElement = document.createElement('img');
		spaceshipImageElement.src = `${basePath}assets/images/spaceship.png`;
		spaceshipElement.appendChild(spaceshipImageElement);
		gameScreen.appendChild(spaceshipElement);

		return spaceshipElement;
	}
});
