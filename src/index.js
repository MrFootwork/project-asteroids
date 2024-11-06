import Game from './Game.js';

let game;

document.addEventListener('DOMContentLoaded', () => {
	/***********************************
	 *  HTML Elements
	 ***********************************/
	// Intro
	const introOverlay = document.querySelector('#introOverlay');
	const introScreen = document.querySelector('#introScreen');
	const skipIntroInstruction = document.querySelector('#skipIntroInstruction');
	// Intro Media
	const videoPlayer = document.querySelector('#videoPlayer');
	const musicPlayer = document.getElementById('musicPlayer');
	const musicPlayerSource = document.querySelector('#musicPlayer source');

	// Home View
	const homeScreen = document.querySelector('#homeScreen');
	const startButton = document.querySelector('#startButton');
	const newGameButton = document.querySelector('#newGameButton');
	const settingsButton = document.querySelector('#settingsButton');
	const exitButton = document.querySelector('#exitButton');

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
	// Intro
	introScreen.addEventListener('click', firstClick);
	introScreen.addEventListener('keyup', skipIntro);

	// add in game event listeners
	addGameEventListeners();

	// Home View
	startButton.addEventListener('click', changeViewToGame); // continue
	newGameButton.addEventListener('click', () => {
		game.currentLevelID = 1;
		changeViewToGame();
	});

	// Result View
	toHomeButton.addEventListener('click', changeViewToHome);
	restartButton.addEventListener('click', changeViewToGame);

	/***********************************
	 *  Event Handlers
	 ***********************************/
	// Intro View
	function firstClick() {
		musicPlayer.play().catch(error => console.error('Playback error:', error));
		introOverlay.classList.add('fade-out-overlay');
		setTimeout(() => {
			videoPlayer.play();
			skipIntroInstruction.classList.add('show-skip-intro-instruction');
		}, 500);
	}

	function skipIntro(e) {
		if (e.code === 'Space') {
			changeViewToHome();
		}
	}

	// Home View
	/** Switching to Game View. Does everything to start a game */
	function changeViewToGame() {
		// Spin up a game
		startGame();

		// Change view
		homeScreen.style.display = 'none';
		gameScreen.style.display = 'block';
		resultScreen.style.display = 'none';

		// Change Music
		musicPlayer.pause();
		musicPlayerSource.src = 'assets/sounds/stardust-ambient.mp3';
		musicPlayer.load();
		musicPlayer.play();
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
		// Change music
		musicPlayer.pause();
		musicPlayerSource.src = 'assets/sounds/metropolis-of-the-future.mp3';
		musicPlayer.load();
		musicPlayer.play();

		// Change view
		homeScreen.style.display = 'flex';
		gameScreen.style.display = 'none';
		resultScreen.style.display = 'none';
		introScreen.style.display = 'none';
	}

	/***********************************
	 *  Game Engine Starter
	 ***********************************/
	/** Instantiates and starts a game. */
	function startGame() {
		requestAnimationFrame(() => {
			if (game) game.reset();
		});

		requestAnimationFrame(() => {
			game.start();

			// TESTING pause
			const pauseFrameAt = 29;

			setTimeout(() => {
				// game.pauseOrResumeGame();
				console.warn(`Pausing for testing at frame ${pauseFrameAt}.`);
			}, pauseFrameAt);
		});
	}

	// TESTING start
	// changeViewToGame();

	/***********************************
	 *  Grouping Functions
	 ***********************************/
	function addGameEventListeners() {
		window.addEventListener('resize', game.resizeScreen);

		// FIXME Test pause button
		gameOverButton.addEventListener('click', changeViewToResult);
		pauseButton.addEventListener('click', game.pauseOrResumeGame);

		document.addEventListener('keydown', e => game.onKeyDown(e));
		document.addEventListener('keyup', e => game.onKeyUp(e));
	}
});
