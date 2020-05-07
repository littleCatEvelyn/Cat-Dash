import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './ufo.gltf';

const LIMIT = 2.5e-3 * window.innerWidth;

class UFO extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'ufo';
        this.move = 'left';

        // the model is fetched from https://poly.google.com/view/fojR5i3h_nh
        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(1.5, 1.5, 1.5);
            gltf.scene.rotation.set(0, 0, 0.5);
            gltf.scene.position.set(0, 0.5, 0);
            this.add(gltf.scene);
        });
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
    }
}

export default UFO;
