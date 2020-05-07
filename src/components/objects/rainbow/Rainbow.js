import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import MODEL from './rainbow.gltf';

class Rainbow extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();

        this.name = 'rainbow';

        loader.load(MODEL, (gltf) => {  
            console.log('hhhhjjjkkk');
            gltf.scene.scale.set(18, 18, 18);
            // // gltf.scene.rotation.set(0, Math.PI / 2, 0);
            // gltf.scene.position.set(10, -30, 5);
            this.add(gltf.scene);
        });
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        this.position.x -= 0.5;
    }
}

export default Rainbow;
