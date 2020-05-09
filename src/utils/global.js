let NUM_OF_FLOWER = 0;

let GAME_STATE = 'before';


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

export { getNumOfFlower, setNumOfFlower, addToNumOfFlower, 
		 getGameState, setGameState };