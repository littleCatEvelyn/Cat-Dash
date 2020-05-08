import { collisionDetection } from 'scenes';

const LIMIT = -250;

function updateUpdateList(timeStamp, scene) {
    const newUpdateLst = [];

    for (const obj of scene.state.updateList) {
        obj.update(timeStamp);
        if (obj.position.x < LIMIT) 
            scene.remove(obj);
        else {
            // update updateList
            newUpdateLst.push(obj);
            switch(obj.label) {
                case 'scene':
                    break;
                case 'player': // playerList do not need update
                    break;
                case 'obstacle': 
                    // detect collision
                    collisionDetection(scene, obj);
            }
        }
    }

    scene.state.updateList = newUpdateLst;
}

export default updateUpdateList;