import { Group, Box3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './cat.gltf';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

const UP_LIMIT = 0.7;
const DOWN_LIMIT = -0.2;

class Cat extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();
        this.name = 'cat';
        this.label = 'player';

        // Load GLTF model
        // the model is fetched from https://poly.google.com/view/4Pp1CY3bC43
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(1e-2, 1e-2, 1e-2);
            gltf.scene.rotation.set(0, Math.PI, -0.3);
            gltf.scene.position.set(0, 0.32, 0);
            this.add(gltf.scene);
        });

        this.boundingBox = new Box3;
        parent.addToUpdateList(this);
        parent.addToPlayerList(this);

        const floatingUp = new TWEEN.Tween(this.position)
            .to({ y: UP_LIMIT }, 800)
            .easing(TWEEN.Easing.Quadratic.Out);
        const floatingDown = new TWEEN.Tween(this.position)
            .to({ y: DOWN_LIMIT }, 1000)
            .easing(TWEEN.Easing.Quadratic.Out);

        floatingUp.onComplete(() => floatingDown.start());
        floatingDown.onComplete(() => floatingUp.start());

        floatingUp.start();
    }

    movePlayer(distance) {
        const moveDis = new TWEEN.Tween(this.position)
            .to({ z: this.position.z + distance }, 250)
            .easing(TWEEN.Easing.Quadratic.Out);
        moveDis.start();
    }

    update(timeStamp, speed) {
        this.boundingBox.setFromObject(this);
        TWEEN.update();
    }
}

export default Cat;
