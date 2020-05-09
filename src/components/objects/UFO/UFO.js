import { Group, Box3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './ufo.gltf';

const LIMIT = 2.5e-3 * window.innerWidth;
const originalWidth = 1919;
const originalHeight = 946;

class UFO extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();
        this.name = 'ufo';
        this.move = 'left';
        this.label = 'obstacle';

        // the model is fetched from https://poly.google.com/view/fojR5i3h_nh
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(
                1.5, 1.5 * window.innerHeight / originalHeight, 1.5 * window.innerWidth / originalWidth
            );
            gltf.scene.rotation.set(0, 0, 0.5);
            gltf.scene.position.set(0, 0.5, 0);
            this.add(gltf.scene);
        });

        this.boundingBox = new Box3;
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        this.position.x -= 0.5;

        // move left and right
        switch(this.move) {
            case 'left':
                this.position.z -= 0.1;
                if (this.position.z <= -1.5 * LIMIT)
                    this.move = 'right';
                break;
            case 'right':
                this.position.z += 0.1;
                if (this.position.z >= 1.5 * LIMIT)
                    this.move = 'left';
                break;
        }

        this.boundingBox.setFromObject(this);
    }
}

export default UFO;
