import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './land.gltf';

class Land extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'land';

        loader.load(MODEL, (gltf) => {
        	gltf.scene.position.set(0, 1, 0.5);
            this.add(gltf.scene);
        });
    }

    update() {
        this.translateX(-0.5);
    }
}

export default Land;
