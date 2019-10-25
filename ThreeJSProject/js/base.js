var scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0,40,100);

var clock = new THREE.Clock();
var mixer;

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
    light.position.set(0, 90, 200);
    scene.add(light);

    var light = new THREE.PointLight(0xffffff, 5);
    light.position.set(100, 300, 0);
    scene.add(light);


    var loader = new THREE.FBXLoader();
    loader.load( './test.fbx', function ( object ) {
        object.position.set(0,0,0);
        mixer = new THREE.AnimationMixer( object );
        object.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        } );
        object.animations.forEach( function ( clip ) {
            mixer.clipAction( clip ).play();
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