const levelDictionary = {
	1: {
		initialAsteroids: 3,
		spawnRate: 5000,
		speedMultiplier: 1.0,
		startPosition: null,
		asteroidSpeed: 1.5,
	},
	2: {
		initialAsteroids: 5,
		spawnRate: 4000,
		speedMultiplier: 1.2,
		startPosition: null,
		asteroidSpeed: 2,
	},
	3: {
		initialAsteroids: 7,
		spawnRate: 3000,
		speedMultiplier: 1.5,
		startPosition: null,
		asteroidSpeed: 2.5,
	},
	4: {
		initialAsteroids: 9,
		spawnRate: 2500,
		speedMultiplier: 1.5,
		startPosition: null,
		asteroidSpeed: 2.5,
	},
	5: {
		initialAsteroids: 11,
		spawnRate: 2000,
		speedMultiplier: 1.5,
		startPosition: null,
		asteroidSpeed: 2.5,
	},
	6: {
		initialAsteroids: 60,
		spawnRate: Infinity,
		speedMultiplier: 2,
		startPosition: null,
		asteroidSpeed: 3,
	},
};

export default levelDictionary;
