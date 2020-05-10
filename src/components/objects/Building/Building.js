import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './building.gltf';

const originalWidth = 1919;
const originalHeight = 946;

class Building extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();
        this.name = 'building';
        this.label = 'scene';

        // the model is fetched from https://poly.google.com/view/dzt483I8sr-
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(
                0.4, 0.4 * window.innerHeight / originalHeight, 0.4 * window.innerWidth / originalWidth
            );
            gltf.scene.position.set(-300, -50, 520);
            this.add(gltf.scene);
        });
        // this.boundingBox = new Box3;
        parent.addToUpdateList(this);
    }

    update(timeStamp, speed) {
        this.position.x -= speed;
        // this.boundingBox.setFromObject(this);
        // console.log(this.boundingBox);
    }
}

export default Building;
