import { MeshBasicMaterial, Texture, DoubleSide, Mesh, PlaneGeometry, 
         FontLoader, TextGeometry, MeshLambertMaterial } from 'three';

function Title(scene) {
    var loader = new FontLoader();
    loader.load('font.json', function(font) {
        var geometry1 = new TextGeometry("CAT   DASH", {
            font: font,
            size: 250,
            height: 8,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 9,
            bevelSegments: 5
        });

        var geometry2 = new TextGeometry("Game  Over", {
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

        var mesh1 = new Mesh(geometry1, material);
        mesh1.position.set(15, 5, -8);
        mesh1.rotation.set(0, Math.PI * 1.5, 0);
        mesh1.scale.multiplyScalar(0.01)
        mesh1.castShadow = true;
        mesh1.name = 'Title';
        scene.add(mesh1);
        scene.title = mesh1;

        var mesh2 = new Mesh(geometry2, material);
        mesh2.position.set(15, 5, -8);
        mesh2.rotation.set(0, Math.PI * 1.5, 0);
        mesh2.scale.multiplyScalar(0.01)
        mesh2.castShadow = true;
        mesh2.name = 'Title';
        scene.end = mesh2;
    });
}

export default Title