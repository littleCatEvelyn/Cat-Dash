import { Group, Box3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './tree.gltf';

const originalWidth = 1919;
const originalHeight = 946;

class Tree extends Group {
    constructor() {
        // Call parent Group() constructor
        super();
        this.name = 'tree';
        this.label = 'obstacle';

        // the model is fetched from https://poly.google.com/view/boa81hhHF25
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(
                4, 4 * window.innerHeight / originalHeight, 4 * window.innerWidth / originalWidth
            );
            gltf.scene.position.set(0, -3.3, 2.8);
            this.add(gltf.scene);
        });

        this.boundingBox = new Box3;
    }

    update(timeStamp, speed) {
        this.position.x -= speed;

        this.boundingBox.setFromObject(this);
    }
}

export default Tree;
