import Game from './Game.js';

let game;

document.addEventListener('DOMContentLoaded', () => {
	/***********************************
	 *  HTML Elements
	 ***********************************/
	// Home View
	const homeScreen = document.querySelector('#homeScreen');
	const startButton = document.querySelector('#startButton');

	// Game View
	const gameScreen = document.querySelector('#gameScreen');
	const backgroundImageSolid = document.querySelector('#backgroundImageSolid');
	const backgroundImageTransparent = document.querySelector(
		'#backgroundImageTransparent'
	);
	const gameOverButton = document.querySelector('#gameOverButton');
	const pauseButton = document.querySelector('#pauseButton');
	const timeDisplay = document.querySelector('#timeDisplay');
	const scoreDisplay = document.querySelector('#scoreDisplay');
	const livesDisplay = document.querySelector('#livesDisplay');

	// Result View
	const resultScreen = document.querySelector('#resultScreen');
	const toHomeButton = document.querySelector('#toHomeButton');
	const restartButton = document.querySelector('#restartButton');

	/***********************************
	 *  Game Engine Instance
	 * ---------------------------------
	 * After elements are defined,
	 * create a game instance before
	 * event listeners are declared.
	 ***********************************/
	game = new Game({ gameScreen });

	/***********************************
	 *  Event Listeners
	 ***********************************/
	// add in game event listeners
	addGameEventListeners();

	// Home View
	startButton.addEventListener('click', () => {
		game.currentLevelID = 1;
		changeViewToGame();
	});

	// Result View
	toHomeButton.addEventListener('click', changeViewToHome);
	restartButton.addEventListener('click', changeViewToGame);

	/***********************************
	 *  Event Handlers
	 ***********************************/
	// Home View
	/** Switching to Game View. Does everything to start a game */
	function changeViewToGame() {
		// Spin up a game
		startGame();

		// Change view
		homeScreen.style.display = 'none';
		gameScreen.style.display = 'block';
		resultScreen.style.display = 'none';
	}

	// Game View
	/** Switching to Result View. */
	function changeViewToResult() {
		homeScreen.style.display = 'none';
		gameScreen.style.display = 'none';
		resultScreen.style.display = 'block';
	}

	// Result View
	/** Switching to Home View. */
	function changeViewToHome() {
		homeScreen.style.display = 'block';
		gameScreen.style.display = 'none';
		resultScreen.style.display = 'none';
	}

	/***********************************
	 *  Game Engine Starter
	 ***********************************/
	/** Instantiates and starts a game. */
	function startGame() {
		requestAnimationFrame(() => {
			if (game) {
				game.reset();
			}
		});

		requestAnimationFrame(() => {
			game.start();

			// TESTING pause
			// const pauseFrameAt = 29;

			// setTimeout(() => {
			// 	game.pauseOrResumeGame();
			// 	console.warn(`Pausing for testing at frame ${pauseFrameAt}.`);
			// }, pauseFrameAt);
		});
	}

	// TESTING start
	// changeViewToGame();

	/***********************************
	 *  Grouping Functions
	 ***********************************/
	function addGameEventListeners() {
		window.addEventListener('resize', game.resizeScreen);

		gameOverButton.addEventListener('click', changeViewToResult);
		pauseButton.addEventListener('click', e => game.pauseOrResumeGame(e));

		document.addEventListener('keydown', e => game.onKeyDown(e));
		document.addEventListener('keyup', e => game.onKeyUp(e));
	}
});
