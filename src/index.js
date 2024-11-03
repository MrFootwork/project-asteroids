import Game from './Game.js';

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
	let pauseButton = document.querySelector('#pauseButton');

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
	pauseButton.addEventListener('click', e => game.onPause(e));

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
		game = new Game({ gameScreen });
		game.start();
	}

	// for testing
	onStart();

	// functions
	function resetGameScreen() {
		// game over
		gameOverButton.removeEventListener('click', onGameOver);
		gameScreen.innerHTML = /*html*/ `<button id="gameOverButton">Game Over</button>`;
		gameOverButton = document.querySelector('#gameOverButton');
		gameOverButton.addEventListener('click', onGameOver);
		// pause
		pauseButton.removeEventListener('click', onPause);
		pauseButton = document.createElement('button');
		pauseButton.id = 'pauseButton';
		pauseButton.textContent = 'Pause / Play';
		gameScreen.appendChild(pauseButton);
		pauseButton = document.querySelector('#pauseButton');
		pauseButton.addEventListener('click', onPause);
	}
	function refreshGameEventListeners() {
		document.removeEventListener('keydown', e => game.onKeyDown(e));
		document.removeEventListener('keyup', e => game.onKeyUp(e));
		window.removeEventListener('resize', game.resizeScreen);

		document.addEventListener('keydown', e => game.onKeyDown(e));
		document.addEventListener('keyup', e => game.onKeyUp(e));
		window.addEventListener('resize', game.resizeScreen);
	}
});
