import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './city.gltf';

class City extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'city';

        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(8, 8, 8);
            gltf.scene.position.set(0, 30, 0);
            this.add(gltf.scene);
        });
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        this.position.x -= 0.5;
    }
}

export default City;
