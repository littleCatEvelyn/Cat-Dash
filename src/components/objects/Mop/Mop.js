import { Group, Box3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './mop.gltf';

const UP_LIMIT = 0.5;
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
            gltf.scene.position.set(-2.2, -0.25, 0);
            this.add(gltf.scene);
        });

        this.boundingBox = new Box3;
        parent.addToUpdateList(this);
        parent.addToPlayerList(this);
    }

    update(timeStamp) {
        switch(this.move) {
            case 'up':
                this.position.y += 0.006;
                if (this.position.y >= UP_LIMIT)
                    this.move = 'down';
                break;
            case 'down':
                this.position.y -= 0.005;
                if (this.position.y <= DOWN_LIMIT)
                    this.move = 'up';
                break;
        }

        this.boundingBox.setFromObject(this);
    }
}

export default Mop;
