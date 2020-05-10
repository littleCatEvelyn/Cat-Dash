import { Group, Box3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './mop.gltf';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

const UP_LIMIT = 0.7;
const DOWN_LIMIT = -0.2;

class Mop extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();
        this.name = 'mop';
        this.move = 'up';
        this.label = 'player';

        // the model is fetched from https://poly.google.com/view/bzCi_ZLQPN4
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(0.5, 0.5, 0.5);
            gltf.scene.rotation.set(3, Math.PI, 1.8);
            gltf.scene.position.set(-2.2, -0.25, 0.06);
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

export default Mop;
