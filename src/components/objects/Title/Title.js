import { MeshBasicMaterial, Texture, DoubleSide, Mesh, PlaneGeometry, 
         FontLoader, TextGeometry, MeshLambertMaterial } from 'three';

function Title(scene) {
    var loader = new FontLoader();
    loader.load('font.json', function(font) {
        var geometry = new TextGeometry("CAT   DASH", {
            font: font,
            size: 250,
            height: 8,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 9,
            bevelSegments: 5
        });

        var material = new MeshLambertMaterial({
            color: 0xffff00
        });

        var mesh = new Mesh(geometry, material);
        mesh.position.set(15, 5, -8);
        mesh.rotation.set(0, Math.PI * 1.5, 0);
        mesh.scale.multiplyScalar(0.01)
        mesh.castShadow = true;
        mesh.name = 'Title';
        scene.add(mesh);
        scene.title = mesh;
    });
}

export default Title