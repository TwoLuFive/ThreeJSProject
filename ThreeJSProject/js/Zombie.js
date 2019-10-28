function Zombie() {
    var object = this;
    this.wait = 0;
    this.animations = [];
    this.mesh = null;
    this.mixer = null;

    this.load = function(scene)  {
        var loader = new THREE.GLTFLoader();
        loader.load( './models/zombie1/scene.gltf', function ( gltf ) {
            object.mesh = gltf.scene;
            object.mesh.scale.set(0.01,0.01,0.01);
            object.mesh.children[0].material = new THREE.MeshStandardMaterial({
                roughness: 0.1,
                color: 0xffffff
            });
            scene.add(object.mesh);
            object.mesh.position.set(0, 0, -2);
            
            object.mixer = new THREE.AnimationMixer( object.mesh );
            object.mesh.traverse( function ( child ) {
                if ( child.isMesh ) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            } );
            object.mixer.clipAction( gltf.animations[9] ).play();
            object.animations = gltf.animations;
        }, undefined, function ( e ) {
            console.error( e );
        } );
    }
    
    this.update = function(timeDelta) {
        if ( object.mixer ) {
            object.mixer.update(timeDelta );
        
            if(object.mesh){ 
                if(object.wait != -1){
                    if(object.wait>0){
                        object.wait -= timeDelta;
                    }else{
                        object.mixer.stopAllAction();
                        object.mixer.clipAction( object.animations[9] ).play();
                        object.wait = -1;
                    }
                }else{
                    object.mesh.translateZ(0.01);
                }
                if (object.mesh.position.z > -1) {
                    object.wait = Math.random()*10.0 + 5.0;
                    object.mesh.position.z = -10;
                    object.mixer.stopAllAction();
                    object.mixer.clipAction( object.animations[0] ).play();
                }
            }
        }
    }
}