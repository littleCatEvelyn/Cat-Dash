/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3, Clock,
         AudioListener, Audio, AudioLoader } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SeedScene } from 'scenes';
import { getNumOfFlower, getGameState, setGameState } from 'utils'

// Initialize core ThreeJS components
const scene = new SeedScene();
const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
const renderer = new WebGLRenderer({ antialias: true });
const clock = new Clock(false);
let timeAccumulator = 0;

console.log(scene);

// Set up camera
camera.position.set(-10, 4, 0);

// Load audio
var listener = new AudioListener();
camera.add( listener );
var sound = new Audio( listener );
var audioLoader = new AudioLoader();
// the audio source comes from https://music.163.com/#/song?id=223339
audioLoader.load( 'backgroundMusic.mp3', function( buffer ) {
    sound.setBuffer( buffer );
    sound.setLoop( true );
    sound.setVolume( 0.5 );
    sound.pause();
});

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableKeys = false;
controls.target.set(8, 0, 0);
controls.enableDamping = true;
controls.update();

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    renderer.render(scene, camera);
    let currentState = getGameState();
    if (scene.state.pause) {
        if (clock.running) {
            timeAccumulator += clock.getElapsedTime();
            clock.stop();
            console.log(timeAccumulator);
            console.log(scene);
        }
        if (sound.isPlaying) {
            sound.pause();
        }
    } else {
        if (!clock.running){
            clock.start();
        }
        if (!sound.isPlaying) {
            sound.play();
        }
        if (getGameState() == 'before') {
            scene.remove(scene.title);
            setGameState('on progress');
        }
        scene.update && scene.update(timeStamp); 
        document.getElementById('score').innerHTML =
            Math.round(timeAccumulator + clock.getElapsedTime()) + getNumOfFlower();
    }
    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};
windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);

let isKeyboardLocked = false;
window.addEventListener('keydown', event => {
    const key = event.key;
    if (key==' ')
        scene.state.pause = !scene.state.pause;
    if (!scene.state.pause) {
        if (isKeyboardLocked) {
            return;
        }
        isKeyboardLocked = true;
        scene.switchTrack(event.key);
        setTimeout( function(){ isKeyboardLocked = false; }, 250); 
    } 
})