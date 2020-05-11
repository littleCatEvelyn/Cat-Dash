import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './sun.gltf';

const originalWidth = 1919;
const originalHeight = 946;

class Sun extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();
        this.name = 'sun';
        this.label = 'scene';

        // the model is fetched from https://poly.google.com/view/7_bVjItDir2
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {      
            gltf.scene.scale.set(5e-2, 5e-2, 5e-2);
            gltf.scene.position.set(350, -50, -2);

            gltf.scene.rotation.set(0, 0, Math.PI / 2);
            this.add(gltf.scene);
        });
        parent.addToUpdateList(this);
    }

    update(timeStamp, speed) {
        this.rotation.x += Math.PI / 500;
    }
}

export default Sun;
