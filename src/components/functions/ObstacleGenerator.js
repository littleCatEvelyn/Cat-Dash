import { Flower, Land, Cloud, UFO, Tree} from 'objects';
import { Vector3 } from 'three';
import { getObstacleTimeList, getAvailableObstacles, getStep } from "utils";

const obstacleList = ["flower", "ufo", "land", "tree", "cloud"];
const step = getStep();
const PUT_DISTANCE = 250;
const trackPositionList = [
	new Vector3(PUT_DISTANCE, 0, -step),
	new Vector3(PUT_DISTANCE, 0, 0),
	new Vector3(PUT_DISTANCE, 0, step)
]

function playabilityCheck(trackId, obstacle) {
    if (obstacle.name == 'flower')
        return true;
    let neighborId = undefined;
    if (trackId == 0)
        neighborId = [1, 2];
    else if (trackId == 1)
        neighborId = [0, 2];
    else
        neighborId = [0, 1];

    const obstacleTimeList = getObstacleTimeList();

    const neighbor1 = obstacleTimeList[neighborId[0]];
    const neighbor2 = obstacleTimeList[neighborId[1]];
    
    if (neighbor1 == undefined || neighbor2 == undefined || 
        PUT_DISTANCE - neighbor1.position.x >= 8 || PUT_DISTANCE - neighbor2.position.x >= 8) {
        obstacleTimeList[trackId] = obstacle;
        return true;
    } else {
        return false;
    }
}

function generateObstacle(scene, elapsedTime) {
    const doCreatNewObstacle = Math.random() > scene.state.probability;
    if (doCreatNewObstacle) {
        // choose trancl
        const trackId = Math.floor(Math.random() * trackPositionList.length);
        const trackPosition = trackPositionList[trackId];

        // choose obstacle
        const numOfObstacles = obstacleList.length;
        const obstacleTypeId = Math.floor(Math.random() * numOfObstacles);
        const obstacleName = obstacleList[obstacleTypeId];
        let obstacle = undefined;

        const availableObstacleItems = getAvailableObstacles();
        if (availableObstacleItems[obstacleName].length != 0) {
            obstacle = availableObstacleItems[obstacleName].pop();
        } else {
            switch(obstacleName) {
                case "flower":
                    obstacle = new Flower();
                    break;
                case "ufo":
                    obstacle = new UFO();
                    break;
                case "land":
                    obstacle = new Land();
                    break;
                case "tree":
                    obstacle = new Tree();
                    break;
                case "cloud":
                    obstacle = new Cloud();
                    break;
            }
        }
        
        obstacle.position.set(trackPosition.x, trackPosition.y, trackPosition.z);

        if (playabilityCheck(trackId, obstacle)) {
            scene.add(obstacle);
            scene.addToUpdateList(obstacle);
        } 
    }
}

export default generateObstacle;