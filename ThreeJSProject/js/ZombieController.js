function ZombieController() {
    var object = this;
    spawnPoints = new Array(4);

    spawnPoints[0] = new THREE.Vector3(0, 0, 0);
    spawnPoints[1] = new THREE.Vector3(0, 0, 0);
    spawnPoints[2] = new THREE.Vector3(0, 0, 0);
    spawnPoints[3] = new THREE.Vector3(0, 0, 0);

    this.zombies = new Array();

    this.load = function(scene)  {

        let z = new Zombie(0,-10,new THREE.Vector3(0,0,1));
        z.load(scene);
        object.zombies.push(z);

        let x = new Zombie(5,0,new THREE.Vector3(-1,0,0));
        x.load(scene);
        object.zombies.push(x);

        let y = new Zombie(-8,0,new THREE.Vector3(1,0,0));
        y.load(scene);
        object.zombies.push(y);

        let i = new Zombie(0,13,new THREE.Vector3(0,0,-1));
        i.load(scene);
        object.zombies.push(i);

    }

    this.update = function(timeDelta)  {
        object.zombies.forEach(function(z) {
            z.update(timeDelta);
        });
    }

    
    function doesZombieHitPlayer(player)
    {
        for (z in object.zombies){
            
        }
        return false;
    }
}