import { MeshBasicMaterial, Texture, DoubleSide, Mesh, PlaneGeometry, 
         FontLoader, TextGeometry, MeshLambertMaterial } from 'three';

function Title(scene) {
    var loader = new FontLoader();
    loader.load('font.json', function(font) {
        var material = new MeshLambertMaterial({
            color: 0xffff00
        });

        // game start page signs
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

        var mesh1 = new Mesh(geometry1, material);
        mesh1.position.set(15, 5, -8);
        mesh1.rotation.set(0, Math.PI * 1.5, 0);
        mesh1.scale.multiplyScalar(0.01)
        mesh1.castShadow = true;
        scene.add(mesh1);

        // game over sign
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
        
        var mesh2 = new Mesh(geometry2, material);
        mesh2.position.set(15, 5, -8);
        mesh2.rotation.set(0, Math.PI * 1.5, 0);
        mesh2.scale.multiplyScalar(0.01)
        mesh2.castShadow = true;
        scene.end = mesh2;

        // press to start sign
        var geometry3 = new TextGeometry("Press Space to Start", {
            font: font,
            size: 75,
            height: 5,
        });
        
        var mesh3 = new Mesh(geometry3, material);
        mesh3.position.set(15, 1.5, -4.3);
        mesh3.rotation.set(0, Math.PI * 1.5, 0);
        mesh3.scale.multiplyScalar(0.01)
        mesh3.castShadow = true;
        scene.add(mesh3);

        // press to start sign
        var geometry4 = new TextGeometry("Click to Restart", {
            font: font,
            size: 75,
            height: 5,
        });
        
        var mesh4 = new Mesh(geometry4, material);
        mesh4.position.set(15, 1.5, -4.3);
        mesh4.rotation.set(0, Math.PI * 1.5, 0);
        mesh4.scale.multiplyScalar(0.01)
        mesh4.castShadow = true;
        scene.restart = mesh4;
    });
}

export default Title