import { ShaderMaterial, BoxBufferGeometry, Mesh, Clock, 
         Group, PlaneBufferGeometry, DoubleSide } from 'three';

const fragmentShader = `
    uniform float time;

    varying vec2 vUv;

    void main( void ) {

        vec2 position = vUv;

        float color = 0.0;
        color += sin( position.x * cos( time / 15.0 ) * 80.0 ) + cos( position.y * cos( time / 15.0 ) * 10.0 );
        color += sin( position.y * sin( time / 10.0 ) * 40.0 ) + cos( position.x * sin( time / 25.0 ) * 40.0 );
        color += sin( position.x * sin( time / 5.0 ) * 10.0 ) + sin( position.y * sin( time / 35.0 ) * 80.0 );
        color *= sin( time / 10.0 ) * 0.5;

        gl_FragColor = vec4( vec3( color, color * 0.5, sin( color + time / 3.0 ) * 0.75 ), 1.0 );

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
        this.uniforms = { "time": { value: 1.0 } };
        this.material = new ShaderMaterial( {
            uniforms: this.uniforms,
            vertexShader: vertexShader,
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
        this.uniforms[ "time" ].value += delta * 5;
    }
}

export default Road;
