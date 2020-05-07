import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './building.gltf';

class Building extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'building';

        // the model is fetched from https://poly.google.com/view/dzt483I8sr-
        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(0.4, 0.4, 0.4);
            gltf.scene.position.set(-300, -50, 520);
            this.add(gltf.scene);
        });
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        this.position.x -= 0.5;
    }
}

export default Building;
