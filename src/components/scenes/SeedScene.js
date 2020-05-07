import * as Dat from 'dat.gui';
import { Scene, Color, Camera, Vector3, Fog} from 'three';
import { Flower, Land, Cat, Mop, Cloud, UFO, 
         Tree, Road, Building } from 'objects';
import { BasicLights } from 'lights';
import { BackgroundTexture } from 'textures';
import { obstacleGenerator } from 'scenes';

const step = 2.5e-3 * window.innerWidth;

const trackPositionList = [
                new Vector3(250, 0, -step),
                new Vector3(250, 0, 0),
                new Vector3(250, 0, step)
              ]

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            updateList: [],
            playerList: [],
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
        const building = new Building(this);

        this.add(lights, cat, mop, road, building);

        // Populate GUI
        this.state.gui.add(this.state, 'pause');
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    addToPlayerList(object) {
        this.state.playerList.push(object);
    }

    update(timeStamp) {
        const newList = [];
        const { rotationSpeed, updateList } = this.state;
        for (const obj of updateList) {
            obj.update(timeStamp);
            if (obj.position.x < -500) {
                this.remove(obj);
            } else {
                newList.push(obj);
            }
        }
        this.state.updateList = newList;
        obstacleGenerator(this);
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
