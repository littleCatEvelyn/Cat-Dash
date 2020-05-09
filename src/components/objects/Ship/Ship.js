import { Group, Box3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './ship.gltf';

const originalWidth = 1919;
const originalHeight = 946;

class Ship extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();
        this.name = 'ship';
        this.label = 'scene';

        // the model is fetched from https://poly.google.com/view/bzRjbJ74JCr
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(
                22, 22 * window.innerHeight / originalHeight, 22 * window.innerWidth / originalWidth
            );
            gltf.scene.rotation.set(0, Math.PI, 0);
            gltf.scene.position.set(0, 7, 10);
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

export default Ship;
