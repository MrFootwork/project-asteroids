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
	let gameScreen = document.querySelector('#gameScreen');
	let gameOverButton = document.querySelector('#gameOverButton');

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
		startGame();
		refreshGameEventListeners();

		homeScreen.style.display = 'none';
		gameScreen.style.display = 'block';
	}

	// Game Screen
	function onGameOver() {
		gameScreen.style.display = 'none';
		resultScreen.style.display = 'block';

		resetGameScreen();
	}

	// Result Screen
	function onToHome() {
		resultScreen.style.display = 'none';
		homeScreen.style.display = 'block';
	}

	/***********************************
	 *  Game Engine
	 ***********************************/
	let game;

	function startGame() {
		// instantiate game
		const spaceshipElement = createSpaceship();
		game = new Game({ gameScreen, spaceshipElement });
		game.start();
	}

	// for testing
	onStart();

	// functions
	function resetGameScreen() {
		gameOverButton.removeEventListener('click', onGameOver);
		gameScreen.innerHTML = /*html*/ `<button id="gameOverButton">Game Over</button>`;
		gameOverButton = document.querySelector('#gameOverButton');
		gameOverButton.addEventListener('click', onGameOver);
	}

	function refreshGameEventListeners() {
		document.removeEventListener('keydown', e => game.onKeyDown(e));
		document.removeEventListener('keyup', e => game.onKeyUp(e));
		window.removeEventListener('resize', game.resizeScreen);

		document.addEventListener('keydown', e => game.onKeyDown(e));
		document.addEventListener('keyup', e => game.onKeyUp(e));
		window.addEventListener('resize', game.resizeScreen);
	}

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
