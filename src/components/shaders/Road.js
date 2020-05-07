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
  #define TIMESCALE 0.25 
  #define TILES 8
  #define COLOR 0.7, 1.6, 2.8

  void mainImage( out vec4 fragColor, in vec2 fragCoord )
  {
    vec2 uv = fragCoord.xy / iResolution.xy;
    uv.x *= iResolution.x / iResolution.y;
    
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

class Road extends Group {
    constructor(parent, step) {
        // Call parent Group() constructor
        super();
        this.name = 'road';

        // // handle shaders
        // this.uniforms = { 
        //     iTime: { value: 0 },
        //     iResolution:  { value: new Vector3() },
        //     iChannel0: { value: texture },
        // };

        // this.material = new ShaderMaterial( {
        //     uniforms: this.uniforms,
        //     // vertexShader: vertexShader,
        //     fragmentShader: fragmentShader,
        //     side: DoubleSide
        // } );

        // const plane = new PlaneBufferGeometry(6 * step, 1e4);

        // this.mesh = new Mesh(plane,this.material);
        // this.mesh.position.set(0, -5, 0);
        // this.mesh.rotation.set(Math.PI / 2, 0, Math.PI / 2);

        const plane = new PlaneBufferGeometry(6 * step, 1e4);

        this.uniforms = {
            iTime: { value: 0 },
            iResolution:  { value: new Vector3(1, 1, 1) },
            iChannel0: { value: texture },
        };

        const material = new ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: this.uniforms,
            side: DoubleSide
        });



          this.mesh = new Mesh(plane, material);
          this.mesh.position.set(0, -5, 0);
        this.mesh.rotation.set(Math.PI / 2, 0, Math.PI / 2);


        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        timeStamp *= 0.001;
        this.uniforms.iTime.value = timeStamp;

    }
}

export default Road;
