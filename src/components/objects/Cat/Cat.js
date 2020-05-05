import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './cat.gltf';

class Cat extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'cat';

        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(1e-2, 1e-2, 1e-2);
            this.add(gltf.scene);
        });
    }
}

export default Cat;
