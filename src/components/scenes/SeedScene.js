import { Scene, Color, Camera, Vector3, Fog, AudioListener, 
         Audio, AudioLoader } from 'three';
import { Cat, Mop, Road, Building, GenerateTitle } from 'objects';
import { BasicLights } from 'lights';
import { BackgroundTexture } from 'textures';
import { generateObstacle, generateScene, initializeScene,
         updateScene } from 'functions';

const step = 2.5e-3 * window.innerWidth;

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            updateList: [],
            playerList: [], // subset of updateList, including obj labeled player
            pause: true,
            track: 0,
            probability: 0.99
        };

        // setup audio
        var listener = new AudioListener();
        var sound = new Audio( listener );
        var audioLoader = new AudioLoader();

        // the audio source comes from https://music.163.com/#/song?id=223339
        audioLoader.load( 'meow.mp3', function( buffer ) {
            sound.setBuffer( buffer );
            sound.setLoop( false );
            sound.setVolume( 1.0 );
            sound.pause();
        });

        this.meow = sound;

        // Set background to a nice color
        this.background = BackgroundTexture;
        this.fog = new Fog( 0xa2aab8, 5, 1e4 );

        // Add meshes to scene
        const lights = new BasicLights();
        const cat = new Cat(this);
        const mop = new Mop(this);
        const road = new Road(this, step).mesh;
        GenerateTitle(this);

        this.player = cat;
        this.add(lights, cat, mop, road);
        initializeScene(this);
    }

    update(timeStamp) {
        updateScene(timeStamp, this);        
        generateObstacle(this);
        generateScene(this);
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
