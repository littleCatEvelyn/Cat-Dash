import { Building, City, Ship, Rainbow } from 'objects';
import { Vector3 } from 'three';
import { getAvailableScenes, getStep, getSceneTimeList } from 'utils';

const objectList = ["rainbow", "city", "ship", "building", "city", "ship", "building"];
const step = getStep();
const PUT_DISTANCE = 300;
const trackPositionList = [
	new Vector3(PUT_DISTANCE, 0, -12.5*step),
	new Vector3(PUT_DISTANCE, 0, 12.5*step),
]

const distance = {
    "building": 65,
    "city": 120,
    "ship": 90
}

function collisionCheck(trackId, object) {
    if (object.name == 'rainbow')
        return true;
    const sceneTimeList = getSceneTimeList();
    const lastScene = sceneTimeList[trackId];
    if (lastScene == undefined || PUT_DISTANCE - lastScene.position.x >= distance[lastScene.name]) {
        sceneTimeList[trackId] = object;
        return true;
    } else {
        return false;
    }
}

function generateScene(scene, elapsedTime) {
    const doCreatNewObject = Math.random() > scene.state.sceneProba;
    if (doCreatNewObject) {
        const numOfObjects = objectList.length;
        const objectTypeId = Math.floor(Math.random() * numOfObjects);
        const objectName = objectList[objectTypeId];
        let object = undefined;

        const availableSceneItems = getAvailableScenes();
        if (availableSceneItems[objectName].length != 0) {
            object = availableSceneItems[objectName].pop();
        } else {
            switch(objectName) {
                case "building":
                    object = new Building();
                    break;
                case "city":
                    object = new City();
                    break;
                case "ship":
                    object = new Ship();
                    break;
                case "rainbow":
                    object = new Rainbow();
                    break;
            }
        }
        
        if (objectName != "rainbow") {
            const trackId = Math.floor(Math.random() * trackPositionList.length);
            const trackPosition = trackPositionList[trackId];
            object.position.set(trackPosition.x, trackPosition.y, trackPosition.z);
            if (collisionCheck(trackId, object)) {
                scene.add(object);
                scene.addToUpdateList(object);
            }
        } else {
            object.position.set(PUT_DISTANCE, 0, 0);
            scene.add(object);
            scene.addToUpdateList(object);
        }
    }
}

export default generateScene;