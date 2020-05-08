import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './board.gltf';

class Board extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();
        this.name = 'board';
        this.label = 'board';

        // the model is fetched from https://poly.google.com/view/dzt483I8sr-
        const loader = new GLTFLoader();
        loader.load(MODEL, (gltf) => {       
            gltf.scene.scale.set(2.3, 2.3, 2.3);
            gltf.scene.rotation.set(0,  1.35 * Math.PI, 0);
            gltf.scene.position.set(5.5, 2.3, -7);
            this.add(gltf.scene);
        });
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        // this.position.x -= 0.5;
        // this.boundingBox.setFromObject(this);
        // // console.log(this.boundingBox);
    }
}

export default Board;
