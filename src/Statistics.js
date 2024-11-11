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
			escapedTargets: game.player.escapedTargets,
			shotsHit: game.player.shotsHit,
			shots: game.player.shots,
			accuracy: game.player.shotsHit / game.player.shots,
			health: Math.max(game.player.health, 0),
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
	addGame(game) {
		this.currentRawGame = game;
		this.#extractDataFrom(game);
	}

	/***********************************
	 *  Getters
	 ***********************************/
}

export default Statistics;
