import { Cat, Mop, Road, Building, GenerateTitle } from 'objects';
import { Scene } from 'three';

class StartScene extends Scene {
	constructor() {
		super();
		this.end = undefined;
		this.restart = undefined;

		GenerateTitle(this);
	}
}

export default StartScene;
