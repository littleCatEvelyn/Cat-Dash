import { Scene, Color, Camera, Vector3, Fog, AudioListener, 
         Audio, AudioLoader } from 'three';
import { Cat, Mop, Road, Rainbow, Star, Sun } from 'objects';
import { BasicLights } from 'lights';
import { BackgroundTexture } from 'textures';
import { generateObstacle, generateScene, initializeScene,
         updateScene } from 'functions';
import { StartScene } from 'scenes';

const step = 3e-3 * window.innerWidth;

class MainScene extends Scene {
    constructor() {
        super();
        this.state = {
            updateList: [],
            playerList: [],
            pause: true,
            track: 0,
            probability: 0.98,
            sceneProba: 0.95,
            speed: 0.5,
            speedFlag: false
        };

        this.startScene = new StartScene();
        this.add(this.startScene);

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
        const star = new Star(this);
        const sun = new Sun(this);
        const rainbow = new Rainbow(this);

        this.addToUpdateList(rainbow);
        this.player = cat;
        this.add(lights, cat, mop, road, rainbow, star, sun);
        initializeScene(this);
    }

    update(timeStamp, elapsedTime) {
        if (elapsedTime % 10 == 0) {
            if (this.state.speedFlag) {
                this.state.speed = Math.min(this.state.speed + 0.1, 2.3);
                this.state.speedFlag = false;
                this.state.probability = Math.max(this.state.probability - 2e-3, 0.80);
                this.state.sceneProba = Math.max(this.state.probability - 2e-3, 0.90);
            }
        } else {
            this.state.speedFlag = true;
        }
        updateScene(timeStamp, this);        
        generateObstacle(this, elapsedTime);
        generateScene(this);
    }

    switchTrack(direction) {
        const { playerList } = this.state;
        switch(direction) {
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

export default MainScene;
