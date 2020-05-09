import { MeshBasicMaterial, Texture, DoubleSide, Mesh, PlaneGeometry, 
         FontLoader, TextGeometry, MeshLambertMaterial } from 'three';

function createScore(scene, text) {
    var loader = new FontLoader();
    loader.load('font.json', function(font) {
        var geometry = new TextGeometry(text, {
        font: font,
        size: 80,
        height: 5,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 10,
        bevelSize: 8,
        bevelSegments: 5
        });

        var material = new MeshLambertMaterial({
        color: 0xffff00
        });
        var mesh = new Mesh(geometry, material);
        mesh.position.set(0, 2, 0);
        mesh.scale.multiplyScalar(0.01)
        mesh.castShadow = true;
        scene.add(mesh);
        return mesh;
    });
}

export default createScore