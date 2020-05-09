import { Building, City, Ship } from 'objects';
import { Vector3 } from 'three';

const objectList = ["city", "ship", "building"];
const step = 2.5e-3 * window.innerWidth;
const trackPositionList = [
    new Vector3(0, 0, -15*step),
    new Vector3(100, 0, -15*step),
    new Vector3(200, 0, -15*step),
    new Vector3(300, 0, -15*step),
    new Vector3(400, 0, -15*step),
    new Vector3(0, 0, 15*step),
    new Vector3(100, 0, 15*step),
    new Vector3(200, 0, 15*step),
    new Vector3(300, 0, 15*step),
    new Vector3(400, 0, 15*step),
]

function initializeScene(scene) {
    for (let i = 0; i < trackPositionList.length; i++) {
        const numOfObjects = objectList.length;
        const objectTypeId = Math.floor(Math.random() * numOfObjects);
        const objectName = objectList[objectTypeId];
        let object = undefined;
        switch(objectName) {
            case "building":
                object = new Building(scene);
                break;
            case "city":
                object = new City(scene);
                break;
            case "ship":
                object = new Ship(scene);
                break;
        }

        const trackPosition = trackPositionList[i];
        object.position.set(trackPosition.x, trackPosition.y, trackPosition.z);
        scene.add(object);
    }
}

export default initializeScene;