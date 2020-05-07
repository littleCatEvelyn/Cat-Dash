import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './tree.gltf';

class Tree extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'tree';

        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(3, 3, 3);
            gltf.scene.rotation.set(0, 0, 0);
            gltf.scene.position.set(0, 0, 5.5);
            this.add(gltf.scene);
        });
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        this.position.x -= 0.5;
    }
}

export default Tree;
