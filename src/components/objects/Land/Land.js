import { Group, Box3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './land.gltf';

const UP_LIMIT = 8;
const DOWN_LIMIT = -1;
const originalWidth = 1919;
const originalHeight = 946;

class Land extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();
        this.name = 'land';
        this.move = 'up';
        this.label = 'obstacle';

        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {
            gltf.scene.sacle.set(
                1, window.innerHeight / originalHeight, window.innerWidth / originalWidth
            );
        	gltf.scene.position.set(0, 1, 0.5);
            this.add(gltf.scene);
        });

        this.boundingBox = new Box3;
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

        this.boundingBox.setFromObject(this);
    }
}

export default Land;
