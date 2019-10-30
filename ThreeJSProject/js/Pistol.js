function Pistol() {
    var object = this;
    this.animations = [];
    this.mesh = null;
    this.mixer = null;
    this.raycaster = null;

    const cooldown = 0.4;
    var cooldownRemaining = 0;
    this.load = function (scene) {
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

            object.mixer = new THREE.AnimationMixer(object.mesh);
            object.animations = gltf.animations;

            object.raycaster = new THREE.Raycaster();
        }, undefined, function (e) {
            console.error(e);
        });
    }

    this.update = function (timeDelta) {
        if(cooldownRemaining > 0)
        {
            cooldownRemaining -= timeDelta;
        }
        if (object.mixer) {
            object.mixer.update(timeDelta);
        }
    }
    this.trytoShoot = function (camera, listofZombies) {
        if (cooldownRemaining <= 0) {
            cooldownRemaining = cooldown;

            
            let listofMeshes = new Array(listofZombies.length);
            for(let i = 0; i < listofMeshes.length; i++)
            {
                listofMeshes[i] = listofZombies[i].mesh;
            }
            let directionCamera = new THREE.Vector3(0, 0, 0);
            camera.getWorldDirection(directionCamera);
            //RAYCASTING
            object.raycaster.set(camera.position, directionCamera);
            let intersects = object.raycaster.intersectObjects(listofMeshes, true);
            console.log(intersects.length);
            for(let i = 0; i < intersects.length; i++)
            {
                intersects[ i ].object.material.color.set( 0xff0000 );
            }
            //ANIMATIONS
            let animation = object.mixer.clipAction(object.animations[0]);
            animation.setLoop(THREE.LoopOnce);
            animation.clampWhenFinished = true;
            animation.enable = true;

            animation.play().reset();

            let animation2 = object.mixer.clipAction(object.animations[1]);
            animation2.setLoop(THREE.LoopOnce);
            animation2.clampWhenFinished = true;
            animation2.enable = true;

            animation2.play().reset();

            //RECOIL
            let target = new THREE.Vector3(camera.position.x + directionCamera.x, camera.position.y + directionCamera.y, camera.position.z + directionCamera.z)
            camera.lookAt(new THREE.Vector3(target.x + Math.random() * 0.005, target.y + Math.random() * 0.3, target.z + Math.random() * 0.005));

            return intersects.length > 0;
        }
    }
}