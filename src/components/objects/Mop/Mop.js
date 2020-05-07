import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './mop.gltf';

const UP_LIMIT = 0.6;
const DOWN_LIMIT = -0.2;

class Mop extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.name = 'mop';
        this.move = 'up';

        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(0.5, 0.5, 0.5);
            gltf.scene.rotation.set(3, Math.PI, 1.8);
            gltf.scene.position.set(-2.2, -0.25, 0);
            this.add(gltf.scene);
        });
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
    }
}

export default Mop;
