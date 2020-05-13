let NUM_OF_FLOWER = 0;

let GAME_STATE = 'before';

const OBSTACLE_TIME_LIST = [undefined, undefined, undefined];

const SCENE_TIME_LIST = [undefined, undefined];

const STEP = 3e-3 * window.innerWidth;

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

function resetObstacleTimeList() {
	OBSTACLE_TIME_LIST[0] = undefined;
	OBSTACLE_TIME_LIST[1] = undefined;
	OBSTACLE_TIME_LIST[2] = undefined;
}

function getSceneTimeList() {
	return SCENE_TIME_LIST;
}

function resetSceneTimeList() {
	SCENE_TIME_LIST[0] = undefined;
	SCENE_TIME_LIST[1] = undefined;
}

function getAvailableScenes() {
	return availableScenes;
}

function getAvailableObstacles() {
	return availableObstacles;
}

function getStep() {
	return STEP;
}

export { getNumOfFlower, setNumOfFlower, addToNumOfFlower, 
		 getGameState, setGameState, getObstacleTimeList,
		 getSceneTimeList, getAvailableScenes,
		 getAvailableObstacles, getStep, resetObstacleTimeList,
		 resetSceneTimeList };