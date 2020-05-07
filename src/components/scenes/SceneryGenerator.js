import { Building} from 'objects';
import { Vector3 } from 'three';

const objectList = ["building"];
const step = 2.5e-3 * window.innerWidth;
const trackPositionList = [
	new Vector3(500, 0, -15*step),
	new Vector3(500, 0, 15*step),
]

function sceneGenerator(scene) {
    const doCreatNewObject = Math.random() > scene.state.probability;
    if (doCreatNewObject) {
        const numOfObjects = objectList.length;
        const objectTypeId = Math.floor(Math.random() * numOfObjects);
        const objectName = objectList[objectTypeId];
        let object = undefined;
        switch(objectName) {
            case "building":
                object = new Building(scene);
                console.log(object);
                break;
        }

        const trackPosition = trackPositionList[Math.floor(Math.random() * trackPositionList.length)];
        object.position.set(trackPosition.x, trackPosition.y, trackPosition.z);
        scene.add(object);
    }
}

export default sceneGenerator;