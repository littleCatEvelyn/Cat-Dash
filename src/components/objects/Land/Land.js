import { Group, Box3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './land.gltf';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

const UP_LIMIT = 8;
const DOWN_LIMIT = -1;
const originalWidth = 1919;
const originalHeight = 946;

class Land extends Group {
    constructor() {
        // Call parent Group() constructor
        super();
        this.name = 'land';
        this.label = 'obstacle';

        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            gltf.scene.scale.set(
                1, 1 * window.innerHeight / originalHeight, 1 * window.innerWidth / originalWidth
            );
        	gltf.scene.position.set(0, 1, 0.5);
            this.add(gltf.scene);
        });

        this.boundingBox = new Box3;

        const floatingUp = new TWEEN.Tween(this.position)
            .to({ y: UP_LIMIT }, 2000)
            .easing(TWEEN.Easing.Quadratic.Out);
        const floatingDown = new TWEEN.Tween(this.position)
            .to({ y: DOWN_LIMIT }, 2000)
            .easing(TWEEN.Easing.Quadratic.Out);

        floatingUp.onComplete(() => floatingDown.start());
        floatingDown.onComplete(() => floatingUp.start());

        floatingUp.start();
    }

    update(timeStamp, speed) {
        this.position.x -= speed;
        this.boundingBox.setFromObject(this);
        TWEEN.update();
    }
}

export default Land;
