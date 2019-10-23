var scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,2,3);

var mixer;
var clock = new THREE.Clock();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

var start = function () {
    
    var light = new THREE.PointLight(0xffffff, 5);
    light.position.set(0, 3, 5);
    scene.add(light);

    var light = new THREE.PointLight(0xffffff, 5);
    light.position.set(2, 10, 0);
    scene.add(light);


    var loader = new THREE.FBXLoader();
    loader.load( './zombie2.fbx', function ( object ) {
        object.position.set(0,0,0);
        mixer = new THREE.AnimationMixer( object );
        var action = mixer.clipAction( object.animations[ 0 ] );
        action.play();
        object.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        } );
        scene.add( object );
    
    }, undefined, function ( e ) {
    
      console.error( e );
    
    } );
}
var update = function () {
    var delta = clock.getDelta();
    if ( mixer ) mixer.update( delta );
};
//Draws the scene using the camera.
var render = function () {
    renderer.render(scene, camera);
};
//Technically the base update function. Calls Update, Render...
var loopGame = function () {
    requestAnimationFrame(loopGame);

    update();
    render();
};

start();
loopGame();