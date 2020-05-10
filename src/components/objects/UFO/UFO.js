import { Group, Box3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './ufo.gltf';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

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

        const floatingLeft = new TWEEN.Tween(this.position)
            .to({ z: -1.5 * LIMIT }, 2000);
        const floatingRight = new TWEEN.Tween(this.position)
            .to({ z: 1.5 * LIMIT }, 2000);

        floatingLeft.onComplete(() => floatingRight.start());
        floatingRight.onComplete(() => floatingLeft.start());

        floatingLeft.start();
    }

    update(timeStamp, speed) {
        this.position.x -= speed;
        this.boundingBox.setFromObject(this);
        TWEEN.update();
    }
}

export default UFO;
