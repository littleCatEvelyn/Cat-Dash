import { addToNumOfFlower } from 'utils';

function detectCollision(scene, obstacle) {
    if (scene.player.boundingBox.intersectsBox(obstacle.boundingBox)) {
        switch(obstacle.name) {
        	case 'flower': 
        		scene.remove(obstacle);
                addToNumOfFlower(1);
                scene.meow.play();
        		break;
        	case 'land':
        		scene.state.pause = true;
        		break;
        	case 'ufo':
        		scene.state.pause = true;
        		break;
        	case 'tree':
        		scene.state.pause = true;
        		break;
        }
    }
}

export default detectCollision;
