import { Group, Box3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './tree.gltf';

class Tree extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();
        this.name = 'tree';
        this.label = 'obstacle';

        // the model is fetched from https://poly.google.com/view/boa81hhHF25
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(3.2, 3.2, 3.2);
            gltf.scene.position.set(0, -1.3, 2.5);
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

export default Tree;
