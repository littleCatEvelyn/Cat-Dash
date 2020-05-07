import { Building} from 'objects';
import { Vector3 } from 'three';

const obstacleList = ["building"];
const step = 2.5e-3 * window.innerWidth;
const trackPositionList = [
	new Vector3(500, 0, -15*step),
	new Vector3(500, 0, 15*step),
]

function sceneGenerator(scene) {
    const doCreatNewObstacle = Math.random() > scene.state.probability;
    if (doCreatNewObstacle) {
        const numOfObstacles = obstacleList.length;
        const obstacleTypeId = Math.floor(Math.random() * numOfObstacles);
        const obstacleName = obstacleList[obstacleTypeId];
        let obstacle = undefined;
        switch(obstacleName) {
            case "building":
                obstacle = new Building(scene);
                console.log('jj');
                break;
        }

        const trackPosition = trackPositionList[Math.floor(Math.random() * trackPositionList.length)];
        obstacle.position.set(trackPosition.x, trackPosition.y, trackPosition.z);
        scene.add(obstacle);
    }
}

export default sceneGenerator;