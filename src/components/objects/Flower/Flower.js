import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './flower.gltf';

class Flower extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            twirl: 0,
        };

        // Load object
        const loader = new GLTFLoader();

        this.name = 'flower';
        loader.load(MODEL, (gltf) => {
            gltf.scene.rotation.set(0, Math.PI / 2, 0);
            this.add(gltf.scene);
        });
    }

    update(timeStamp) {
        this.rotation.y += Math.PI / 20;
        this.position.x -= 0.5;
    }
}

export default Flower;
