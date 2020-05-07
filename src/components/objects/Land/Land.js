import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './land.gltf';

const UP_LIMIT = 8;
const DOWN_LIMIT = -1;

class Land extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();
        this.name = 'land';
        this.move = 'up';

        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
        	gltf.scene.position.set(0, 1, 0.5);
            this.add(gltf.scene);
        });
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        this.position.x -= 0.5;

        // move up and down
        switch(this.move) {
            case 'up':
                this.position.y += 0.1;
                if (this.position.y >= UP_LIMIT)
                    this.move = 'down';
                break;
            case 'down':
                this.position.y -= 0.1;
                if (this.position.y <= DOWN_LIMIT)
                    this.move = 'up';
                break;
        }
    }
}

export default Land;
