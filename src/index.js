import Game from './Game.js';
import dialogMessages from '../data/dialogMessages.js';
import { getBasePath } from './helper/utils.js';
import Statistics from './Statistics.js';

// let game;
// let statistics;

window.onload = () => {
	/***********************************
	 *  States
	 ***********************************/
	var state = {
		intro: {
			isPlaying: false,
		},
		musicOn: true,
		sfxOn: true,
		musicLow: false,
		modal: {
			element: null,
		},
	};

	/***********************************
	 *  HTML Elements
	 ***********************************/
	// Music Control Panel
	const musicControlPanel = document.querySelector('#musicControlPanel');
	const musicToggler = document.querySelector('.icon-button.music');
	const sfxToggler = document.querySelector('.icon-button.sfx');

	// Modal
	const modal = document.querySelector('#gameModal');
	const messageElement = modal.querySelector('p#modalMessage');
	const goodButton = modal.querySelector('#positive');
	const badButton = modal.querySelector('#negative');

	state.modal.element = modal;

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
	const subtitleH3 = document.querySelector('#resultSubTitle');
	const toHomeButton = document.querySelector('#toHomeButton');
	const restartButton = document.querySelector('#restartButton');

	// SFX
	const buttonHoverSoundPlayer = document.querySelector(
		'#buttonHoverSoundPlayer'
	);
	const allButtons = document.querySelectorAll('button:not(:disabled)');
	const allSFXPlayers = document.querySelectorAll('audio.sfx');

	/***********************************
	 *  Sounds
	 ***********************************/
	// Button Click
	const buttonClickSoundPlayer = new Audio('assets/sounds/sci-fi-click.wav');
	buttonClickSoundPlayer.volume = 0.4;

	/***********************************
	 *  Statistics Instance
	 * ---------------------------------
	 * The Statistics instance will
	 * collect game data and store it.
	 ***********************************/
	const statistics = new Statistics();

	/***********************************
	 *  Game Engine Instance
	 * ---------------------------------
	 * After elements are defined,
	 * create a game instance before
	 * event listeners are declared.
	 ***********************************/
	const game = new Game({ gameScreen, state, statistics });

	/***********************************
	 *  Event Listeners
	 ***********************************/
	// Modal
	badButton.addEventListener('click', changeViewToResult);

	// Handle click on goodButton
	goodButton.addEventListener('click', () => {
		if (messageElement.classList.contains('pause')) {
			game.toggleMusicVolume(musicPlayer);
			game.togglePause();
			modal.close();
			return;
		}

		game.reset();
		modal.close();
		game.start();
	});

	// Intro
	introScreen.addEventListener('click', onClickOnIntro);
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
		button.addEventListener('click', () => {
			if (state.sfxOn) {
				buttonHoverSoundPlayer.currentTime = 0;
				buttonClickSoundPlayer.play();
			}
		});
	});

	/***********************************
	 *  Event Handlers
	 ***********************************/
	// Music Control
	musicToggler.addEventListener('click', e => {
		state.musicOn = !state.musicOn;

		if (musicPlayer.paused) musicPlayer.play();
		else musicPlayer.pause();

		// Remove focus from the button
		e.target.blur();
	});

	sfxToggler.addEventListener('click', e => {
		state.sfxOn = !state.sfxOn;

		allSFXPlayers.forEach(player => {
			player.pause();
			player.currentTime = 0;
		});

		// Remove focus from the button
		e.target.blur();
	});

	// Intro View
	videoPlayer.addEventListener('ended', () => {
		console.log('The video has finished playing!');
		changeViewToHome();
	});

	function onClickOnIntro() {
		if (state.intro.isPlaying) {
			videoPlayer.pause();
			musicPlayer.pause();
			changeViewToHome();
			// FIXME clear all timeouts
		}

		// Play Music
		musicPlayer.volume = 0.6;
		musicPlayer.play().catch(error => console.error('Playback error:', error));

		// First Video
		videoPlayer.src = `${getBasePath()}assets/videos/asteroids-migration.mp4`;
		videoPlayer.playbackRate = 0.7;
		videoPlayer.play();

		introOverlay.classList.add('fade-out-overlay');

		setTimeout(() => {
			skipIntroInstruction.classList.add('show-skip-intro-instruction');
		}, 500);

		// Second Video
		setTimeout(() => {
			console.log('next Video');
			videoPlayer.src = `${getBasePath()}assets/videos/asteroid-approaching-earth.mp4`;
		}, 8_820);

		state.intro.isPlaying = true;
	}

	function skipIntro(e) {
		if (e.code === 'Space' || e.code === 'Escape' || e.code === 'Enter') {
			changeViewToHome();
		}
	}

	// Home View => Game View
	/** Switching to Game View. Does everything to start a game */
	function changeViewToGame() {
		// Remove Shake
		gameScreen.classList.remove('shake');

		// Spin up a game
		startGame();

		// Reset Music
		const isWrongSong =
			musicPlayerSource.src.split('/').at(-1) !== 'stardust-ambient.mp3';

		if (isWrongSong) {
			musicPlayerSource.src = 'assets/sounds/stardust-ambient.mp3';
			musicPlayer.load();
		}

		state.musicLow = false;
		musicPlayer.volume = 0.3;

		if (state.musicOn) musicPlayer.play();

		// Change view
		homeScreen.style.display = 'none';
		gameScreen.style.display = 'block';
		resultScreen.style.display = 'none';
	}

	// Game View => Result View
	/** Switching to Result View. */
	function changeViewToResult() {
		// Set Background
		resultScreen.style.backgroundImage = game.player.hasWon
			? "url('assets/images/result-victory.jpg')"
			: "url('assets/images/result-defeat.jpg')";

		// Stop game loop, if not already paused
		if (!game.isPaused) game.togglePause();

		// Collect Data
		statistics.addGame(game);
		// if (statistics.games.length <= 1) statistics.addGame(game);
		console.log(statistics);

		// Render Results
		renderStatistics();

		// Play some Music
		const nextSong = game.player.hasWon
			? 'assets/sounds/achievement.mp3'
			: 'assets/sounds/defeat-background.mp3';

		musicPlayerSource.src = nextSong;
		musicPlayer.load();
		if (state.musicOn) musicPlayer.play();

		// Close modal
		if (modal.open) modal.close();

		// Change View
		homeScreen.style.display = 'none';
		gameScreen.style.display = 'none';
		resultScreen.style.display = 'flex';

		// Stop Animation
		gameScreen.classList.remove('shake');

		console.log(game);
	}

	// Result View => Home View
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
	 *  Renderer for Statistics
	 ***********************************/
	function renderStatistics() {
		const statisticsHTML = document.querySelector('#statistics');

		console.log('Rendering statistics...');
		const sortedGames = statistics.games.sort(
			({ timestamp: timeA }, { timestamp: timeB }) => {
				return timeB - timeA;
			}
		);

		// Result View Sub Title
		subtitleH3.textContent = sortedGames[0].won ? 'You won!' : 'You lost!';

		// Iterate through statistics and build table rows
		const tableRows = sortedGames.reduce((allRows, gameData) => {
			// Level Completion
			const formattedCompletion = gameData.won ? '✅' : '❌';

			// Time Format
			const formattedDate = new Intl.DateTimeFormat('en-GB', {
				weekday: 'short', // "Di"
				day: '2-digit', // "12", "8"
				month: 'short', // "Okt"
				year: '2-digit', // "24"
				hour: '2-digit', // "12"
				minute: '2-digit', // "35"
			}).format(gameData.timestamp);

			// Accuracy
			const formattedAccuracy = `${Math.round(gameData.accuracy * 100)}%`;

			const currentRow = /*html*/ `
				<tr>
					<th scope="row">${gameData.level}</th>
					<td>${formattedCompletion}</td>
					<td>${formattedDate}</td>
					<td>${gameData.kills}</td>
					<td>${gameData.escapedTargets}</td>
					<td>${gameData.shots}</td>
					<td>${formattedAccuracy}</td>
					<td>${gameData.health}%</td>
				</tr>	
			`;
			return allRows + currentRow;
		}, '');

		const table = /*html*/ `
			<table>
				<!-- Table Caption -->
				<caption>How you have done in each level</caption>
				
				<!-- Table Head (Column Headers) -->
				<thead>
					<tr>
						<th scope="col" scope="row">Level</th>
						<td scope="col">✔ Completed</td>
						<td scope="col">⌚ Time</td>
						<td scope="col">🌠 Kills</td>
						<td scope="col">💩 Missed Targets</td>
						<td scope="col">🔫 Shots</td>
						<td scope="col">🎯 Accuracy</td>
						<td scope="col">🩺 Health</td>
					</tr>
				</thead>
				
				<!-- Table Body (Main Data) -->
				<tbody>
					${tableRows}
				</tbody>
				
				<!-- Table Footer -->
				<!-- <tfoot>
					<tr>
						<th scope="row">Total</th>
						<td colspan="3">Footer data or total calculation here</td>
					</tr>
				</tfoot> -->
			</table>
		`;

		statisticsHTML.innerHTML = table;
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
		});
	}

	/***********************************
	 *  Grouping Functions
	 ***********************************/
	function addGameEventListeners() {
		window.addEventListener('resize', game.resizeScreen);

		gameOverButton.addEventListener('click', changeViewToResult);
		pauseButton.addEventListener('click', e => {
			game.togglePause();
			game.toggleMusicVolume(musicPlayer);

			// Has to be after game.togglePause()
			// because it nullifies game.gameLoopIntervalID
			const isPaused = !Boolean(game.isPaused);

			console.log('isPaused: ', isPaused);

			if (game.isPaused) game.showModal(dialogMessages.pause);

			// Remove focus from the button
			e.target.blur();
		});

		document.addEventListener('keydown', e => game.onKeyDown(e));
		document.addEventListener('keyup', e => {
			game.onKeyUp(e, musicPlayer);
		});
	}
};
