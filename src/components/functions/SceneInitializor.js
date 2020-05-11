import { Building, City, Ship, Rainbow } from 'objects';
import { Vector3 } from 'three';
import { getStep, getSceneTimeList } from 'utils';

const objectList = ["city", "building", "ship"];
const step = getStep();
const trackPositionList = [
    new Vector3(-100, 0, -12.5*step),
    new Vector3(-100, 0, 12.5*step),
    new Vector3(0, 0, -12.5*step),
    new Vector3(0, 0, 12.5*step),
    new Vector3(100, 0, -12.5*step),
    new Vector3(100, 0, 12.5*step),
    new Vector3(200, 0, -12.5*step),
    new Vector3(200, 0, 12.5*step),
    new Vector3(300, 0, -12.5*step),
    new Vector3(300, 0, 12.5*step)
]

const distance = {
    "building": 65,
    "city": 120,
    "ship": 90
}

function collisionCheck(trackId, object, currentDis) {
    const sceneTimeList = getSceneTimeList();
    const lastScene = sceneTimeList[trackId];
    if (lastScene == undefined || currentDis - lastScene.position.x >= distance[lastScene.name]) {
        sceneTimeList[trackId] = object;
        return true;
    } else {
        return false;
    }
}


function initializeScene(scene) {
    for (let i = 0; i < trackPositionList.length; i++) {
        const numOfObjects = objectList.length;
        const objectTypeId = Math.floor(Math.random() * numOfObjects);
        const objectName = objectList[objectTypeId];
        let object = undefined;
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
        }

        const trackPosition = trackPositionList[i];
        object.position.set(trackPosition.x, trackPosition.y, trackPosition.z);

        const trackId = i % 2;
        if (collisionCheck(trackId, object, trackPosition.x)) {
            scene.add(object);
            scene.addToUpdateList(object);
        }
    }
}

export default initializeScene;