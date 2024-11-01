import Game from './Game.js';

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

const game = new Game({});
game.test(onStart);
