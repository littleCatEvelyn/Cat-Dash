import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

const step = 2.5e-3 * window.innerWidth;

function handleSwitching(direction, scene) {
	const { playerList } = scene.state;
	switch(direction) {
	    case "ArrowUp": console.log("up");break;
	    case "ArrowDown": console.log('down');break;
	    case "ArrowLeft":
	    	const jumpUp = new TWEEN.Tween(scene.state.playerList[0].position)
	            .to({ y: scene.state.playerList[0].position.y + 1 }, 300)
	            .easing(TWEEN.Easing.Quadratic.Out);
	        jumpUp.start();
	        // if (scene.state.track != -1) {
	        //     playerList.forEach(player => {
	        //     	const moveLeft = new TWEEN.Tween(player.position)
			      //       .to({ y: player.position.z - 1 }, 300)
			      //       .easing(TWEEN.Easing.Quadratic.Out);
			      //   moveLeft.start();
	        //     });
	        //     scene.state.track -= 1;
	        // }
	        break;
	    case "ArrowRight":
	        if (scene.state.track != 1) {
	            playerList.forEach(obj => {obj.position.z += step});
	            scene.state.track += 1;
	        }
	        break;
	}
}

export default handleSwitching;