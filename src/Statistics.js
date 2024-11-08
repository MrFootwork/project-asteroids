class Statistics {
	constructor() {
		this.games = [];
		this.currentRawGame = null;
	}

	/***********************************
	 *  Run Analytics
	 ***********************************/
	#extractDataFrom(game) {
		const data = {
			timestamp: new Date(),
			won: game.player.hasWon,
			level: game.currentLevelID,
			kills: game.player.score,
			missedTargets: game.player.missedTargets,
			shots: game.player.shots,
			accuracy: game.player.score / game.player.shots,
			health: Math.max(game.player.lives, 0),
		};

		this.games.push(data);
	}

	/***********************************
	 *  Store Data
	 ***********************************/
	// TODO do some local storage magic

	/***********************************
	 *  Setters
	 ***********************************/
	loadGame(game) {
		this.currentRawGame = game;
		this.#extractDataFrom(game);
	}

	/***********************************
	 *  Getters
	 ***********************************/
}

export default Statistics;
