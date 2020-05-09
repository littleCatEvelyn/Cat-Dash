import { detectCollision } from 'scenes';

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
                case 'obstacle': 
                    // detect collision
                    detectCollision(scene, obj);
            }
        }
    }

    scene.state.updateList = newUpdateLst;
}

export default updateUpdateList;