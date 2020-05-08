import { Scene, Color, Camera, Vector3, Fog} from 'three';
import { Cat, Mop, Road, Building, Board } from 'objects';
import { BasicLights } from 'lights';
import { BackgroundTexture } from 'textures';
import { obstacleGenerator, sceneGenerator, initializeScene, 
         updateScene } from 'scenes';

const step = 2.5e-3 * window.innerWidth;

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            player: undefined,
            updateList: [],
            playerList: [], // subset of updateList, including obj labeled player
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
        const board = new Board(this)

        this.player = cat;
        this.add(lights, cat, mop, road, board);

        initializeScene(this);
    }

    update(timeStamp) {
        updateScene(timeStamp, this);        
        obstacleGenerator(this);
        sceneGenerator(this);
    }

    switchTrack(direction) {
        const { playerList } = this.state;
        switch(direction) {
            case "ArrowUp": console.log("up");break;
            case "ArrowDown": break;
            case "ArrowLeft":
                if (this.state.track != -1) {
                    playerList.forEach(obj => {obj.movePlayer(-step);});
                    this.state.track -= 1;
                }
                break;
            case "ArrowRight":
                if (this.state.track != 1) {
                    playerList.forEach(obj => {obj.movePlayer(step)});
                    this.state.track += 1;
                }
                break;
        }
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    addToPlayerList(object) {
        this.state.playerList.push(object);
    }
}

export default SeedScene;
