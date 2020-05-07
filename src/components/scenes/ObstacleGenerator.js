import { Flower, Land, Cloud, UFO, Tree} from 'objects';
import { Vector3 } from 'three';

const obstacleList = ["flower", "UFO", "land", "tree", "cloud"];
const step = 2.5e-3 * window.innerWidth;
const trackPositionList = [
	new Vector3(250, 0, -step),
	new Vector3(250, 0, 0),
	new Vector3(250, 0, step)
]

function obstacleGenerator(scene) {
    const doCreatNewObstacle = Math.random() > scene.state.probability;
    if (doCreatNewObstacle) {
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
                console.log('jjj')
                break;
            case "cloud":
                obstacle = new Cloud(scene);
                break;
        }

        const trackPosition = trackPositionList[Math.floor(Math.random() * trackPositionList.length)];
        obstacle.position.set(trackPosition.x, trackPosition.y, trackPosition.z);

        scene.addToObstacleList(obstacle);
        scene.add(obstacle);
    }
}

export default obstacleGenerator;