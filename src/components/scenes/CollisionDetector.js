import { addToNumOfFlower, getGameState, setGameState } from 'utils'

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
                setGameState('end');
                scene.add(scene.end);
        		break;
        	case 'ufo':
        		scene.state.pause = true;
                setGameState('end');
                scene.add(scene.end);
        		break;
        	case 'tree':
        		scene.state.pause = true;
                setGameState('end');
                scene.add(scene.end);
        		break;
        }
    }
}

export default detectCollision;
