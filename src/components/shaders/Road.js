import { ShaderMaterial, BoxBufferGeometry, Mesh,
         Group, PlaneBufferGeometry, DoubleSide, Vector3,
         TextureLoader, NearestFilter, RepeatWrapping,
         BoxGeometry } from 'three';

const fragmentShader = `
    #include <common>

    uniform vec3 iResolution;
    uniform float iTime;
    uniform sampler2D iChannel0;

    // By Daedelus: https://www.shadertoy.com/user/Daedelus
    // license: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
    #define TIMESCALE 0.5
    #define TILES 8
    #define COLOR 0.7, 1.6, 2.8

    void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
        vec2 uv = fragCoord.xy / iResolution.xy;
        uv.x *= iResolution.x / iResolution.y;
        uv.y *= 200.0;

        vec4 noise = texture2D(iChannel0, floor(uv * float(TILES)) / float(TILES));
        float p = 1.0 - mod(noise.r + noise.g + noise.b + iTime * float(TIMESCALE), 1.0);
        p = min(max(p * 3.0 - 1.8, 0.1), 2.0);

        vec2 r = mod(uv * float(TILES), 1.0);
        r = vec2(pow(r.x - 0.5, 2.0), pow(r.y - 0.5, 2.0));
        p *= 1.0 - pow(min(1.0, 12.0 * dot(r, r)), 2.0);

        fragColor = vec4(COLOR, 1.0) * p;
    }

    varying vec2 vUv;

    void main() {
        mainImage(gl_FragColor, vUv * iResolution.xy);
    }
`;

const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`;

const loader = new TextureLoader();
const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/bayer.png');
texture.minFilter = NearestFilter;
texture.magFilter = NearestFilter;
texture.wrapS = RepeatWrapping;
texture.wrapT = RepeatWrapping;

const LENGTH = 1e4;

class Road extends Group {
    constructor(parent, step) {
        // Call parent Group() constructor
        super();
        this.name = 'road';
        this.parent = parent;
        this.step = step;

        const plane = new PlaneBufferGeometry(6 * step, LENGTH);
        this.uniforms = {
            iTime: { value: 0 },
            iResolution:  { value: new Vector3(window.innerWidth, window.innerHeight, 1) },
            iChannel0: { value: texture },
        };
        this.material = new ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: this.uniforms,
            side: DoubleSide
        });

        this.mesh = new Mesh(plane, this.material);
        this.mesh.rotation.set(Math.PI / 2, 0, Math.PI / 2);
        this.mesh.position.set(0, -5, 0);
        this.mesh.name = "road";
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        timeStamp *= 0.001;
        this.mesh.position.x -= 0.5;
        this.uniforms.iTime.value = timeStamp;

        // renew road
        if (LENGTH - Math.abs(this.mesh.position.x) < 0.5 * LENGTH) {
            this.parent.remove(this.mesh);
            const plane = new PlaneBufferGeometry(6 * this.step, LENGTH);
            this.mesh = new Mesh(plane, this.material);
            this.mesh.rotation.set(Math.PI / 2, 0, Math.PI / 2);
            this.mesh.position.set(0, -5, 0);
            this.mesh.name = "road";
            this.parent.add(this.mesh);
        }
    }
}

export default Road;
