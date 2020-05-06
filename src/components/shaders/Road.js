import { ShaderMaterial, BoxBufferGeometry, Mesh, Clock, 
         Group, PlaneBufferGeometry, DoubleSide, Vector3 } from 'three';

const fragmentShader = `
    #include <common>

    uniform vec3 iResolution;
    uniform float iTime;

    // By iq: https://www.shadertoy.com/user/iq  
    // license: Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
    void mainImage( out vec4 fragColor, in vec2 fragCoord )
    {
        // Normalized pixel coordinates (from 0 to 1)
        vec2 uv = fragCoord/iResolution.xy;

        // Time varying pixel color
        vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));

        // Output to screen
        fragColor = vec4(col,1.0);
    }

    void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
    }
`;

const vertexShader = `
    varying vec2 vUv;

    void main()
    {
        vUv = uv;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * mvPosition;
    }
`;

class Road extends Group {
    constructor(parent, step) {
        // Call parent Group() constructor
        super();
        this.name = 'road';

        this.clock = new Clock();
        this.uniforms = { 
            iTime: { value: 0 },
            iResolution:  { value: new Vector3() },
        };
        this.material = new ShaderMaterial( {
            uniforms: this.uniforms,
            // vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: DoubleSide
        } );

        this.plane = new PlaneBufferGeometry(6 * step, 1e4);

        this.geometry = new BoxBufferGeometry( 0.75, 0.75, 0.75 );
        this.mesh = new Mesh( this.plane, this.material );
        this.mesh.position.set(0, -5, 0);
        this.mesh.rotation.set(Math.PI / 2, 0, Math.PI / 2);

        parent.addToUpdateList(this);
    }

    update() {
        var delta = this.clock.getDelta();
        this.uniforms[ "iTime" ].value += delta * 3;
        this.uniforms["iResolution"].value.set(window.innerWidth, window.innderHeight, 1);
    }
}

export default Road;
