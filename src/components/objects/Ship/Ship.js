import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './ship.gltf';

class Ship extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'ship';

        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(15, 15, 15);
            gltf.scene.rotation.set(0, Math.PI, 0);
            gltf.scene.position.set(0, 7, 10);
            this.add(gltf.scene);
        });
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        this.position.x -= 0.5;
    }
}

export default Ship;
