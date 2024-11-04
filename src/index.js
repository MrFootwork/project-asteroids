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
	let gameOverButton;
	let pauseButton;
	let timeDisplay;
	let scoreDisplay;
	let livesDisplay;
	querySelectUIElements();

	// Result View
	const resultScreen = document.querySelector('#resultScreen');
	const toHomeButton = document.querySelector('#toHomeButton');
	const restartButton = document.querySelector('#restartButton');

	/***********************************
	 *  Event Listeners
	 ***********************************/
	// Home View
	startButton.addEventListener('click', changeViewToGame);

	// Result View
	toHomeButton.addEventListener('click', changeViewToHome);
	// FIXME Test this button
	restartButton.addEventListener('click', changeViewToGame);

	/***********************************
	 *  Event Handlers
	 ***********************************/
	// Home View
	/** Switching to Game View. Does everything to start a game */
	function changeViewToGame() {
		// Spin up a game
		// FIXME clear/reset game method instead
		// This way existing HTML could be reused for a new game
		createGameUI();
		querySelectUIElements();
		startGame();

		// Event listeners use game methods as callbacks
		removeGameEventListeners();
		addGameEventListeners();

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
	 *  Game Engine
	 ***********************************/
	/** Starts the game engine. */
	function startGame() {
		game = new Game({ gameScreen });
		requestAnimationFrame(() => {
			game.start();

			// TEST pause
			setTimeout(() => {
				game.onPause();
			}, 60);
		});
	}

	// Test start
	changeViewToGame();

	/***********************************
	 *  Grouping Functions
	 ***********************************/
	/** Adds all in game UI elements like timeDisplay or pauseButton.
	 *  Needs to be called before game start to replace all existing game elements.
	 */
	function createGameUI() {
		const gameUIWrapper = document.createElement('div');
		const userInterfaceHTML = /*html*/ `
			<div>
				<button id="gameOverButton">Game Over</button>
				<button id="pauseButton">Pause / Play</button>
			</div>
			<div>
				<p>Time to survive: <span id="timeDisplay">2:00</span></p>
			</div>
			<div>
				<p>☄ Score <span id	="scoreDisplay">0</span></p>
				<p>❤ Lives <span id	="livesDisplay">3</span></p>
			</div>
		`;
		gameUIWrapper.innerHTML = userInterfaceHTML;
		gameScreen.replaceChildren(gameUIWrapper);
	}

	function querySelectUIElements() {
		gameOverButton = document.querySelector('#gameOverButton');
		pauseButton = document.querySelector('#pauseButton');
		timeDisplay = document.querySelector('#timeDisplay');
		scoreDisplay = document.querySelector('#scoreDisplay');
		livesDisplay = document.querySelector('#livesDisplay');
	}

	function removeGameEventListeners() {
		window.removeEventListener('resize', game.resizeScreen);

		gameOverButton.removeEventListener('click', changeViewToResult);
		pauseButton.removeEventListener('click', e => game.onPause(e));

		document.removeEventListener('keydown', e => game.onKeyDown(e));
		document.removeEventListener('keyup', e => game.onKeyUp(e));
	}

	function addGameEventListeners() {
		window.addEventListener('resize', game.resizeScreen);

		gameOverButton.addEventListener('click', changeViewToResult);
		pauseButton.addEventListener('click', e => game.onPause(e));

		document.addEventListener('keydown', e => game.onKeyDown(e));
		document.addEventListener('keyup', e => game.onKeyUp(e));
	}
});
