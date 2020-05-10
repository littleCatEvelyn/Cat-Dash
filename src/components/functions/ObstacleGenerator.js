import { Flower, Land, Cloud, UFO, Tree} from 'objects';
import { Vector3 } from 'three';
import { getObstacleTimeList } from "utils";

const obstacleList = ["flower", "UFO", "land", "tree", "cloud"];
const step = 2.5e-3 * window.innerWidth;
const PUT_DISTANCE = 250;
const trackPositionList = [
	new Vector3(PUT_DISTANCE, 0, -step),
	new Vector3(PUT_DISTANCE, 0, 0),
	new Vector3(PUT_DISTANCE, 0, step)
]

function canPut(trackId, obstacle) {
    let neighborId = undefined;
    if (trackId == 0)
        neighborId = [1, 2];
    else if (trackId == 1)
        neighborId = [0, 2];
    else
        neighborId = [0, 1];

    var obstacleTimeList = getObstacleTimeList();

    const neighbor1 = obstacleTimeList[neighborId[0]];
    const neighbor2 = obstacleTimeList[neighborId[1]];
    
    if (neighbor1 == undefined || neighbor2 == undefined || 
        PUT_DISTANCE - neighbor1.position.x > 8 || PUT_DISTANCE - neighbor2.position.x > 8) {
        obstacleTimeList[trackId] = obstacle;
        return true;
    } else {
        return false;
    }
}

function generateObstacle(scene, elapsedTime) {
    const doCreatNewObstacle = Math.random() > scene.state.probability;
    if (doCreatNewObstacle) {
        const trackId = Math.floor(Math.random() * trackPositionList.length);
        const trackPosition = trackPositionList[trackId];
        const numOfObstacles = obstacleList.length;
        const obstacleTypeId = Math.floor(Math.random() * numOfObstacles);
        const obstacleName = obstacleList[obstacleTypeId];
        let obstacle = undefined;
        switch(obstacleName) {
            case "flower":
                obstacle = new Flower(scene);
                break;
            case "UFO":
                obstacle = new UFO(scene);
                break;
            case "land":
                obstacle = new Land(scene);
                break;
            case "tree":
                obstacle = new Tree(scene);
                break;
            case "cloud":
                obstacle = new Cloud(scene);
                break;
        }
        
        obstacle.position.set(trackPosition.x, trackPosition.y, trackPosition.z);

        if (canPut(trackId, obstacle)) 
            scene.add(obstacle);
    }
}

export default generateObstacle;