import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './city.gltf';

const originalWidth = 1919;
const originalHeight = 946;

class City extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();
        this.name = 'city';
        this.label = 'scene';

        // the model is fetched from https://poly.google.com/view/2binsxeOBve
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(
                12, 12 * window.innerHeight / originalHeight, 12 * window.innerWidth / originalWidth
            );
            gltf.scene.position.set(0, 50 * window.innerHeight / originalHeight, -0.5);
            this.add(gltf.scene);
        });
        // this.boundingBox = new Box3;
        parent.addToUpdateList(this);
    }

    update(timeStamp, speed) {
        this.position.x -= speed;
        // this.boundingBox.setFromObject(this);
    }
}

export default City;
