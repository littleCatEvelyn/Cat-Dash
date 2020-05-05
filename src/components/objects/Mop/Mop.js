import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './mop.gltf';

class Mop extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'mop';

        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(0.5, 0.5, 0.5);
            gltf.scene.rotation.set(1.5, 0, 1.5);
            gltf.scene.position.set(2.2, -0.1, -0.1);
            this.add(gltf.scene);
        });
    }
}

export default Mop;
