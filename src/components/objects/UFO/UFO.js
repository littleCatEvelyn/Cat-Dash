import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './ufo.gltf';

class UFO extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'ufo';

        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(1.5, 1.5, 1.5);
            gltf.scene.rotation.set(0, 0, 0.5);
            gltf.scene.position.set(0, 0.5, 0);
            this.add(gltf.scene);
        });
    }

    update(timeStamp) {
        this.translateX(-0.5);
    }
}

export default UFO;
