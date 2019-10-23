var scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 7;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

var start = function () {

}
var update = function () {

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