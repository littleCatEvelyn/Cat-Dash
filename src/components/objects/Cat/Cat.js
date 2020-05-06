import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './cat.gltf';

class Cat extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'cat';

        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(1e-2, 1e-2, 1e-2);
            gltf.scene.rotation.set(0, Math.PI, -0.3);
            gltf.scene.position.set(0, 0.32, 0);
            this.add(gltf.scene);
        });
        parent.state.playerList.push(this);
    }
}

export default Cat;
