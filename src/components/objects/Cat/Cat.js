import { Group, Box3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './cat.gltf';

const UP_LIMIT = 0.5;
const DOWN_LIMIT = -0.2;

class Cat extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();
        this.name = 'cat';
        this.move = 'up';
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

export default Cat;
