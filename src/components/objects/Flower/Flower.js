import { Group, Box3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './flower.gltf';

class Flower extends Group {
    constructor() {
        // Call parent Group() constructor
        super();
        this.name = 'flower';
        this.label = 'obstacle';

        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.set(1.5, 1.5, 1.5);
            gltf.scene.rotation.set(0, Math.PI / 2, 0);
            gltf.scene.position.set(0, -1.5, 0);
            this.add(gltf.scene);
        });

        this.boundingBox = new Box3;
    }

    update(timeStamp, speed) {
        this.rotation.y += Math.PI / 20;
        this.position.x -= speed;

        this.boundingBox.setFromObject(this);
    }
}

export default Flower;
