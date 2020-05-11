let NUM_OF_FLOWER = 0;

let GAME_STATE = 'before';

const OBSTACLE_TIME_LIST = [undefined, undefined, undefined];

const availableScenes = {
	"rainbow": [],
	 "city": [],
	 "ship": [],
	 "building": []
}; 

const availableObstacles = {
	"flower": [],
	 "ufo": [],
	 "land": [],
	 "tree": [],
	 "cloud": []
}; 

function getNumOfFlower() {
	return NUM_OF_FLOWER;
}

function setNumOfFlower(num) {
	NUM_OF_FLOWER = num;
}

function addToNumOfFlower(num) {
	NUM_OF_FLOWER += num;
}

function getGameState() {
	return GAME_STATE;
}

function setGameState(state) {
	GAME_STATE = state;
}

function getObstacleTimeList() {
	return OBSTACLE_TIME_LIST;
}

function getAvailableScenes() {
	return availableScenes;
}

function getAvailableObstacles() {
	return availableObstacles;
}

export { getNumOfFlower, setNumOfFlower, addToNumOfFlower, 
		 getGameState, setGameState, getObstacleTimeList,
		 getAvailableScenes, getAvailableObstacles };