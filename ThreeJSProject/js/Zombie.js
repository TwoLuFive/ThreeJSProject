function Zombie(startX, startZ, walkDirection) {
    var object = this;
    this.startX = startX;
    this.startZ = startZ;
    walkDirection.normalize();
    this.walkDirection = walkDirection.multiplyScalar(0.01);
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
            let modelOrientation = new THREE.Vector3(0,0,-1);
            if(object.walkDirection.x <= 0){
                object.mesh.rotation.y = modelOrientation.angleTo(object.walkDirection) + Math.PI;  
            }else{
                object.mesh.rotation.y = -modelOrientation.angleTo(object.walkDirection) + Math.PI;  
            }
                         
            object.mesh.position.set(object.startX, 0, object.startZ);
            scene.add(object.mesh);

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
    this.die = function(timeDelta)
    {
        object.mixer.stopAllAction();
        object.mixer.clipAction( object.animations[1] ).play();
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
                    object.mesh.position.x += (object.walkDirection.x);
                    object.mesh.position.y += (object.walkDirection.y);
                    object.mesh.position.z += (object.walkDirection.z);
                }
                if (object.mesh.position.length() < 1) {
                    object.wait = Math.random()*10.0 + 5.0;
                    object.mesh.position.z = object.startZ;
                    object.mesh.position.x = object.startx;
                    console.log("Reset to ", object.mesh.position);
                    object.mixer.stopAllAction();
                    object.mixer.clipAction( object.animations[0] ).play();
                }
            }
        }
    }
}