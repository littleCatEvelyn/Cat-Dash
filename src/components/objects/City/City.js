import { Group, Box3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './city.gltf';

class City extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();
        this.name = 'city';
        this.label = 'scene';

        // the model is fetched from https://poly.google.com/view/2binsxeOBve
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(8, 8, 8);
            gltf.scene.position.set(0, 30, -0.5);
            this.add(gltf.scene);
        });
        this.boundingBox = new Box3;
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        this.position.x -= 0.5;
        this.boundingBox.setFromObject(this);
        // console.log(this.boundingBox);
    }
}

export default City;
