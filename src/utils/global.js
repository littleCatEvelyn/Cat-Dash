let NUM_OF_FLOWER = 0;

function getNumOfFlower() {
	return NUM_OF_FLOWER;
}

function setNumOfFlower(num) {
	NUM_OF_FLOWER = num;
}

function addToNumOfFlower(num) {
	NUM_OF_FLOWER += num;
}

export { getNumOfFlower, setNumOfFlower, addToNumOfFlower };