import * as Dat from 'dat.gui';
import { Scene, Color, Camera, Vector3 } from 'three';
import { Flower, Land, Cat, Mop, Cloud, UFO, Tree } from 'objects';
import { BasicLights } from 'lights';
import { Road } from 'shaders';

const step = 2.5e-3 * window.innerWidth;
const obstacleList = ["flower", "UFO", "land", "tree", "cloud"];

const trackPositionList = [
                new Vector3(150, 0, -step),
                new Vector3(150, 0, 0),
                new Vector3(150, 0, step)
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
        this.background = new Color(0x152236);

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

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
        this.sceneGenerator();
    }

    sceneGenerator() {
        const doCreatNewObstacle = Math.random() > this.state.probability;
        if (doCreatNewObstacle) {
            const numOfObstacles = obstacleList.length;
            const obstacleTypeId = Math.floor(Math.random() * numOfObstacles);
            const obstacleName = obstacleList[obstacleTypeId];
            let obstacle = undefined;
            switch(obstacleName) {
                case "flower":
                    obstacle = new Flower();
                    break;
                case "UFO":
                    obstacle = new UFO();
                    break;
                case "land":
                    obstacle = new Land();
                    break;
                case "tree":
                    obstacle = new Tree();
                    break;
                case "cloud":
                    obstacle = new Cloud();
                    break;
            }

            const trackPosition = trackPositionList[Math.floor(Math.random() * trackPositionList.length)];
            obstacle.position.set(trackPosition.x, trackPosition.y, trackPosition.z);
            this.add(obstacle);
            this.addToUpdateList(obstacle);
        }
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
