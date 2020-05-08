import { Group, Box3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './cloud.gltf';

class Cloud extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();
        this.name = 'cloud';
        this.label = 'obstacle';

        // the model is fetched from https://poly.google.com/view/5vL346OfNST
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(1.5e-2, 1.5e-2, 1.5e-2);
            gltf.scene.rotation.set(0, Math.PI / 2, 0);
            gltf.scene.position.set(0, 0.5, 0);
            this.add(gltf.scene);
        });

        this.boundingBox = new Box3;
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        this.position.x -= 0.5;
        this.boundingBox.setFromObject(this);
    }
}

export default Cloud;
