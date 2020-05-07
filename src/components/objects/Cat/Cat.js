import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './cat.gltf';

const UP_LIMIT = 0.6;
const DOWN_LIMIT = -0.2;

class Cat extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.name = 'cat';
        this.move = 'up';

        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(1e-2, 1e-2, 1e-2);
            gltf.scene.rotation.set(0, Math.PI, -0.3);
            gltf.scene.position.set(0, 0.32, 0);
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

export default Cat;
