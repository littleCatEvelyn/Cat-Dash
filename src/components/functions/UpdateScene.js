import { detectCollision } from 'functions';
import { getAvailableScenes, getAvailableObstacles } from 'utils';

const LIMIT = -100;

function updateUpdateList(timeStamp, scene) {
    const newUpdateLst = [];
    const availableSceneItems = getAvailableScenes();
    const availableObstacleItems = getAvailableObstacles();

    for (const obj of scene.state.updateList) {
        obj.update(timeStamp, scene.state.speed);

        if (obj.position.x < LIMIT) {
            scene.remove(obj);
            switch(obj.label) {
                case 'scene':
                    availableSceneItems[obj.name].push(obj);
                    break;
                case 'obstacle':
                    availableObstacleItems[obj.name].push(obj);
                    break;
            }
        } else {
            // update updateList
            newUpdateLst.push(obj);
            //detect collision
            if (obj.label == 'obstacle') {
                detectCollision(scene, obj);
            }
        }
    }

    scene.state.updateList = newUpdateLst;
}

export default updateUpdateList;