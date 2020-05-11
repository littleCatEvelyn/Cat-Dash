import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './star.gltf';

const originalWidth = 1919;
const originalHeight = 946;

class Star extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();
        this.name = 'star';
        this.label = 'scene';

        // the model is fetched from https://poly.google.com/view/7_bVjItDir2
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {      
            gltf.scene.scale.set(1e-1, 1e-1, 1e-1);
            gltf.scene.position.set(350, 50, 1e-1);

            // gltf.scene.rotation.set(0, Math.PI / 2, 0);
            this.add(gltf.scene);
        });
        parent.addToUpdateList(this);
    }

    update(timeStamp, speed) {
        this.rotation.x += Math.PI / 500;
    }
}

export default Star;
