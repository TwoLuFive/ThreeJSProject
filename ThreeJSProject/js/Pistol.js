function Pistol() {
    var object = this;
    this.animations = [];
    this.mesh = null;
    this.mixer = null;

    const cooldown = 0.2;
    this.load = function(scene)  {
        let loader = new THREE.GLTFLoader();
        loader.load('./models/Pistol.glb', function (gltf) {
            object.mesh = gltf.scene;
            object.mesh.children[0].material = new THREE.MeshStandardMaterial({
                roughness: 0.7,
                color: 0xffffff,
                metalness: 1
            });
            object.mesh.position.set(0, 1.7, -1.5);
            object.mesh.scale.set(0.33, 0.33, 0.33);

            scene.add(object.mesh);

            object.mixer = new THREE.AnimationMixer( object.mesh );
            object.animations = gltf.animations;
        }, undefined, function ( e ) {
            console.error( e );
        } );
    }
    
    this.update = function(timeDelta) {
        if ( object.mixer ) 
        {
            object.mixer.update(timeDelta );
        }
    }
    this.trytoShoot = function()
    {
        console.log(object.animations.length);
        object.mixer.clipAction( object.animations[0] ).play();
    }
}