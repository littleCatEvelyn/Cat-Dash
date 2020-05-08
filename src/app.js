/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3, Clock } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { SeedScene } from 'scenes';

// Initialize core ThreeJS components
const scene = new SeedScene();
const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
const renderer = new WebGLRenderer({ antialias: true });
const clock = new Clock(false);
let timeAccumulator = 0;

// Set up camera
camera.position.set(-10, 4, 0);

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);
console.log(scene);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableKeys = false;
controls.target.set(8, 0, 0);
// // // // controls.enableDamping = true;
// // // // controls.enablePan = false;
// // // // controls.minDistance = 0;
// // // // controls.maxDistance = 16;
// controls.target.set(new Vector3(0, 0, 0));
controls.update();


// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    controls.update();
    renderer.render(scene, camera);
    if (scene.state.pause) {
        if (clock.running) {
            timeAccumulator += clock.getElapsedTime();
            clock.stop();
            console.log(timeAccumulator);
            console.log(scene);
            // TODO handle time overflow
        }
    } else {
        if (!clock.running){
            clock.start();
        }
        scene.update && scene.update(timeStamp); 
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
    if (!scene.state.pause) {
        if (isKeyboardLocked) {
            return;
        }
        isKeyboardLocked = true;
        scene.switchTrack(event.key);
        setTimeout( function(){ isKeyboardLocked = false; }, 300); 
    } 
})