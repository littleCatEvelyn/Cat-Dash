import * as Dat from 'dat.gui';
import { Scene, Color, Camera, Vector3, Fog} from 'three';
import { Cat, Mop, Road } from 'objects';
import { BasicLights } from 'lights';
import { BackgroundTexture } from 'textures';
import { obstacleGenerator, sceneGenerator } from 'scenes';

const step = 2.5e-3 * window.innerWidth;

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            updateList: [],
            playerList: [],
            obstacleList: [],
            pause: true,
            track: 0,
            probability: 0.99
        };

        // Set background to a nice color
        this.background = BackgroundTexture;//new Color(0x152236);
        this.fog = new Fog( 0xa2aab8, 5, 1e4 );

        // Add meshes to scene
        const lights = new BasicLights();
        const cat = new Cat(this);
        const mop = new Mop(this);
        const road = new Road(this, step).mesh;

        this.add(lights, cat, mop, road);

        // Populate GUI
        this.state.gui.add(this.state, 'pause');
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    addToPlayerList(object) {
        this.state.playerList.push(object);
    }

    addToObstacleList(object) {
        this.state.obstacleList.push(object);
    }

    update(timeStamp) {
        const newList = [];
        const { rotationSpeed, updateList } = this.state;
        for (const obj of updateList) {
            // remove past objects
            obj.update(timeStamp);
            if (obj.position.x < -250) {
                this.remove(obj);
            } else {
                newList.push(obj);
            }
        }
        this.state.updateList = newList;
        obstacleGenerator(this);
        sceneGenerator(this);
    }

    switchTrack(direction) {
        const { playerList } = this.state;
        switch(direction) {
            case "ArrowUp": console.log("up");break;
            case "ArrowDown": console.log('down');break;
            case "ArrowLeft":
                if (this.state.track != -1) {
                    playerList.forEach(obj => {obj.position.z -= step});
                    this.state.track -= 1;
                }
                break;
            case "ArrowRight":
                if (this.state.track != 1) {
                    playerList.forEach(obj => {obj.position.z += step});
                    this.state.track += 1;
                }
                break;
        }
    }
}

export default SeedScene;
