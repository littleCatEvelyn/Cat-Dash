import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './rainbow.gltf';

const originalWidth = 1919;
const originalHeight = 946;

class Rainbow extends Group {
    constructor() {
        // Call parent Group() constructor
        super();
        this.name = 'rainbow';
        this.label = 'scene';
        // the model is fetched from https://poly.google.com/view/cdaoZ3DWU9F
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {   
            gltf.scene.scale.set(
                2.5, 2.5 * window.innerHeight / originalHeight, 2.5 * window.innerWidth / originalWidth
            );
            gltf.scene.position.set(22, -5, 0.5);
            this.add(gltf.scene);
        });
    }

    update(timeStamp, speed) {
        this.position.x -= speed;
    }
}

export default Rainbow;
