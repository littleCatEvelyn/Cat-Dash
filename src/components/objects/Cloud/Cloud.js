import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './cloud.gltf';

class Cloud extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'cloud';

        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(1.5e-2, 1.5e-2, 1.5e-2);
            gltf.scene.rotation.set(0, Math.PI / 2, 0);
            gltf.scene.position.set(0, 0.5, 0);
            this.add(gltf.scene);
        });
    }

    update(timeStamp) {
        this.position.x -= 0.5;
    }
}

export default Cloud;
