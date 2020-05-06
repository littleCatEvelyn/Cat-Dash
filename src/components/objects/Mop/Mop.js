import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './mop.gltf';

class Mop extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'mop';

        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(0.5, 0.5, 0.5);
            gltf.scene.rotation.set(3, Math.PI, 1.8);
            gltf.scene.position.set(-2.2, -0.25, 0);
            this.add(gltf.scene);
        });
        parent.state.playerList.push(this);
    }
}

export default Mop;
