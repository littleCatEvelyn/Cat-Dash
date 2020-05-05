import * as Dat from 'dat.gui';
import { Scene, Color, Camera } from 'three';
import { Flower, Land, Cat, Mop } from 'objects';
import { BasicLights } from 'lights';

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 1,
            updateList: [],
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add meshes to scene
        // const flower = new Flower(this);
        const lights = new BasicLights();
        const cat = new Cat(this);
        const mop = new Mop(this);
        this.add(lights, cat, mop);
        
        // flower.position.set(5,0,0);
        // console.log(flower);
        console.log(cat);
        console.log(mop);

        console.log(this.state);

        // Populate GUI
        this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }

    switchTrack(direction, height, width) {
        const { updateList } = this.state;
        const step = 2e-3 * width;
        for (const obj of updateList) {
            obj.move(direction, step);
        }
    }
}

export default SeedScene;
