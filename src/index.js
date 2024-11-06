import Game from './Game.js';

let game;

document.addEventListener('DOMContentLoaded', () => {
	/***********************************
	 *  States
	 ***********************************/
	const state = { musicOn: true, sfxOn: true };

	/***********************************
	 *  HTML Elements
	 ***********************************/
	// Music Control Panel
	const musicControlPanel = document.querySelector('#musicControlPanel');
	const musicToggler = document.querySelector('.icon-button.music');
	const sfxToggler = document.querySelector('.icon-button.sfx');

	// Intro
	const introOverlay = document.querySelector('#introOverlay');
	const introScreen = document.querySelector('#introScreen');
	const skipIntroInstruction = document.querySelector('#skipIntroInstruction');
	// Intro Media
	const videoPlayer = document.querySelector('#videoPlayer');
	videoPlayer.muted = true;

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

	// SFX
	const buttonHoverSoundPlayer = document.querySelector(
		'#buttonHoverSoundPlayer'
	);
	const allButtons = document.querySelectorAll('button:not(:disabled)');
	const allSFXPlayers = document.querySelectorAll('audio.sfx');

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
	introScreen.addEventListener('click', playIntroVideo);
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

	// SFX
	allButtons.forEach(button => {
		button.addEventListener('mouseenter', () => {
			if (state.sfxOn) {
				buttonHoverSoundPlayer.currentTime = 0;
				buttonHoverSoundPlayer.play();
			}
		});
	});

	/***********************************
	 *  Event Handlers
	 ***********************************/
	// Music Control
	musicToggler.addEventListener('click', () => {
		state.musicOn = !state.musicOn;

		if (musicPlayer.paused) musicPlayer.play();
		else musicPlayer.pause();
	});

	sfxToggler.addEventListener('click', () => {
		state.sfxOn = !state.sfxOn;

		allSFXPlayers.forEach(player => {
			player.pause();
			player.currentTime = 0;
		});
	});

	// Intro View
	videoPlayer.addEventListener('ended', () => {
		console.log('The video has finished playing!');
		changeViewToHome();
	});

	function playIntroVideo() {
		musicPlayer.volume = 0.6;
		musicPlayer.play().catch(error => console.error('Playback error:', error));

		videoPlayer.playbackRate = 0.7;
		videoPlayer.play();

		introOverlay.classList.add('fade-out-overlay');

		setTimeout(() => {
			skipIntroInstruction.classList.add('show-skip-intro-instruction');
		}, 500);

		// Second Video
		setTimeout(() => {
			console.log('next Video');
			videoPlayer.src = 'assets/videos/asteroid-approaching-earth.mp4';
		}, 8_820);
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

		// Change Music
		const isWrongSong =
			musicPlayerSource.src.split('/').at(-1) !== 'stardust-ambient.mp3';

		if (isWrongSong) {
			musicPlayerSource.src = 'assets/sounds/stardust-ambient.mp3';
			musicPlayer.load();
		}

		musicPlayer.volume = 0.3;
		if (state.musicOn) musicPlayer.play();

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
		// Change music
		musicPlayer.volume = 0.3;

		musicPlayerSource.src = 'assets/sounds/metropolis-of-the-future.mp3';
		musicPlayer.load();
		if (state.musicOn) musicPlayer.play();

		// Change view
		homeScreen.style.display = 'flex';
		gameScreen.style.display = 'none';
		resultScreen.style.display = 'none';
		introScreen.style.display = 'none';

		// Show Music Controls
		musicControlPanel.classList.add('show');
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

		gameOverButton.addEventListener('click', changeViewToResult);
		pauseButton.addEventListener('click', () => game.pauseOrResumeGame());

		document.addEventListener('keydown', e => game.onKeyDown(e));
		document.addEventListener('keyup', e => game.onKeyUp(e));
	}
});
