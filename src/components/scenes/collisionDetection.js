function collisionDetection(scene) {
	scene.state.obstacleList.forEach(obstacle => {
	    if (scene.player.boundingBox.intersectsBox(obstacle.boundingBox)) {
	        switch(obstacle.name) {
	        	case 'flower': 
	        		scene.remove(obstacle);
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
	});
}

export default collisionDetection;
