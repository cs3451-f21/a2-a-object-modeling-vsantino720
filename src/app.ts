// abstract library
import { DrawingCommon } from './common';
import * as THREE from 'three'

// A class for our application state and functionality
class Drawing extends DrawingCommon {

    constructor (canv: HTMLElement) {
        super (canv)
    }

    /*
	Set up the scene during class construction
	*/
	initializeScene(){
        const objectRoot = new THREE.Group();

        // HeadRoot
        var headRoot = new THREE.Group();

        // Snout
        var snoutRoot = createSnout();
        snoutRoot.position.set(0.4, 0, 0)
        headRoot.add(snoutRoot);

        // Skull
        var geometry : THREE.BufferGeometry = new THREE.SphereGeometry( 0.7, 100, 100 );
        var material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(0,0,0);
        headRoot.add( mesh );

        // Eyes
        var eyeR = createEye();
        eyeR.position.set(0.58, 0.13, -0.3);
        headRoot.add( eyeR );

        var eyeL = createEye();
        eyeL.position.set(0.58, 0.13, 0.3);
        headRoot.add(eyeL);

        // Ear L
        geometry = new THREE.ConeGeometry(2, 2, 5, 10);
        material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
        mesh = new THREE.Mesh( geometry, material );
        
        mesh.scale.set(0.15, 0.15, 0.15)
        mesh.position.set(0, 0.6, 0.4)
        mesh.rotation.set((Math.PI / 8), -(Math.PI / 4), (2 * Math.PI / 4))

        headRoot.add( mesh );

        // Ear R
        geometry = new THREE.ConeGeometry(2, 2, 5, 10);
        material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
        mesh = new THREE.Mesh( geometry, material );
        
        mesh.rotateZ((Math.PI / 2))
        mesh.rotateX((Math.PI/4))
        mesh.rotateY((Math.PI / 4))
        mesh.position.set(0, 0.6, -0.4)
        mesh.scale.set(0.15, 0.15, 0.15)

        headRoot.add( mesh );

        // BodyRoot
        var bodyRoot = new THREE.Group();

        // Torso
        geometry = new THREE.CylinderGeometry(1, 0.75, 2, 10, 10)
        material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(0,0,0);
        mesh.rotation.set(0, 0, -(Math.PI / 2))
        bodyRoot.add(mesh);

        geometry = new THREE.CylinderGeometry(0.75, 0.75, 1, 10, 10)
        material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
        mesh = new THREE.Mesh( geometry, material );

        mesh.position.set(-1.5,0,0);
        mesh.rotation.set(0, 0, -(Math.PI / 2))
        bodyRoot.add(mesh);

        var geometry : THREE.BufferGeometry = new THREE.SphereGeometry( 1, 100, 100 );
        var material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(0.9, -.05, 0);
        bodyRoot.add( mesh );

        var geometry : THREE.BufferGeometry = new THREE.SphereGeometry( 0.75, 100, 100 );
        var material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set(-2, -.035, 0);
        bodyRoot.add( mesh );

        // Neck
        geometry = new THREE.CylinderGeometry(1, 0.5, 1.5, 10);
        material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
        mesh = new THREE.Mesh( geometry, material );
                
        mesh.position.set(1.5, 0.4, 0)
        mesh.rotateZ(2 * Math.PI / 3)
        
        bodyRoot.add( mesh );

        headRoot.position.set(2.5, 1, 0)
        headRoot.rotateY(Math.PI / 4);

        objectRoot.add(headRoot);
        objectRoot.add(bodyRoot);
        this.scene.add( objectRoot );
    }

	/*
	Update the scene during requestAnimationFrame callback before rendering
	*/
	updateScene(time: DOMHighResTimeStamp){}
}

// a global variable for our state.  We implement the drawing as a class, and 
// will have one instance
var myDrawing: Drawing;

// main function that we call below.
// This is done to keep things together and keep the variables created self contained.
// It is a common pattern on the web, since otherwise the variables below woudl be in 
// the global name space.  Not a huge deal here, of course.

function exec() {
    // find our container
    var div = document.getElementById("drawing");

    if (!div) {
        console.warn("Your HTML page needs a DIV with id='drawing'")
        return;
    }

    // create a Drawing object
    myDrawing = new Drawing(div);
}

exec()

function createSnout() : THREE.Group {
    var snoutRoot = new THREE.Group();
    var geometry: THREE.BufferGeometry = new THREE.CylinderGeometry( 0.35, 0.65, 1, 15, 30 );
    var material = new THREE.MeshPhongMaterial( { color: 0x202020, flatShading: true } );
    var mesh = new THREE.Mesh( geometry, material );

    mesh.rotation.set(0, 0, -(2 * Math.PI / 3))
    mesh.position.set(0, -0.25 ,0);
    snoutRoot.add( mesh );

    geometry = new THREE.SphereGeometry( 0.25, 30, 30 );
    material = new THREE.MeshPhongMaterial( { color: 0x505050, flatShading: true } );
    mesh = new THREE.Mesh( geometry, material ); 

    mesh.position.set(0.5, -0.45 , 0.15);
    snoutRoot.add( mesh );

    geometry = new THREE.SphereGeometry( 0.25, 30, 30 );
    material = new THREE.MeshPhongMaterial( { color: 0x505050, flatShading: true } );
    mesh = new THREE.Mesh( geometry, material ); 

    mesh.position.set(0.5, -0.45 , -0.15);
    snoutRoot.add( mesh );
    
    geometry = new THREE.SphereGeometry( 0.33, 30, 30 );
    material = new THREE.MeshPhongMaterial( { color: 0x707070, flatShading: true } );
    mesh = new THREE.Mesh( geometry, material ); 

    mesh.position.set(0.35, -0.50 , 0);
    snoutRoot.add( mesh );

    geometry = new THREE.CylinderGeometry(0.2, 0.4, 1, 5, 5);
    material = new THREE.MeshPhongMaterial( { color: 0x303030, flatShading: true } );
    mesh = new THREE.Mesh( geometry, material ); 

    mesh.rotateZ(-(2 * Math.PI / 3));
    mesh.rotateY(0.8 * Math.PI / 8)
    
    mesh.position.set(0.25, -0.13 , 0);
    snoutRoot.add( mesh );
    return snoutRoot;
}

function createEye() : THREE.Group {
    var eyeGroup = new THREE.Group();
    var geometry = new THREE.SphereGeometry( 0.07, 100, 100 );
    var material = new THREE.MeshPhongMaterial( { color: 0xffff00, flatShading: true } );
    var mesh = new THREE.Mesh( geometry, material );

    mesh.position.set(0, 0, 0);
    eyeGroup.add( mesh );

    geometry = new THREE.SphereGeometry( 0.02, 100, 100 );
    material = new THREE.MeshPhongMaterial( { color: 0x000000, flatShading: true } );
    mesh = new THREE.Mesh( geometry, material );

    mesh.position.set(0.058, 0, 0);
    eyeGroup.add( mesh );
    return eyeGroup;
}
