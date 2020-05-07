import { TextureLoader, NearestFilter, RepeatWrapping } from 'three';
import TEXTURE from './background.jpg';

const loader = new TextureLoader();
const texture = loader.load(TEXTURE);
texture.minFilter = NearestFilter;
texture.magFilter = NearestFilter;
texture.wrapS = RepeatWrapping;
texture.wrapT = RepeatWrapping;

export default texture;