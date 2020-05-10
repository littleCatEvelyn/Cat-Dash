let NUM_OF_FLOWER = 0;

let GAME_STATE = 'before';

let OBSTACLE_TIME_LIST = [undefined, undefined, undefined];

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

export { getNumOfFlower, setNumOfFlower, addToNumOfFlower, 
		 getGameState, setGameState, getObstacleTimeList };