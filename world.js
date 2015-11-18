$(function() {
	var scene = new THREE.Scene(),
	    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000),
	    renderer = new THREE.WebGLRenderer({alpha:true}),
	    axes = new THREE.AxisHelper(20),

	    // Objects
        planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1),
        planeMaterial = new THREE.MeshLambertMaterial({color:0xffffff}),
        plane = new THREE.Mesh(planeGeometry, planeMaterial),

        cubeGeometry = new THREE.CubeGeometry(4, 4, 4),
        cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000}),
        cube = new THREE.Mesh(cubeGeometry, cubeMaterial),

        sphereGeometry = new THREE.SphereGeometry(4, 20, 20),
        sphereMaterial = new THREE.MeshLambertMaterial({color:0x7777ff}),
        sphere = new THREE.Mesh(sphereGeometry, sphereMaterial),

        // light
        spotLight = new THREE.SpotLight(0xffffff);

    var step = 0;

    var controls = new function() {
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
    }

    var gui = new dat.GUI();
    gui.add(controls, 'rotationSpeed', 0, 0.5);
    gui.add(controls, 'bouncingSpeed', 0, 0.5);

    var initStats = function() {
        var stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.left = '0px';
        stats.domElement.top = '0px';
        $('#Stats-output').append(stats.domElement);
        return stats;
    };

	var initScene = function() {
	    renderer.setSize(window.innerWidth, window.innerHeight);
	    //renderer.setClearColorHex(0xEEEEEE);

	    scene.add(axes);

	    camera.position.x = -30;
	    camera.position.y = 40;
	    camera.position.z = 30;
	    camera.lookAt(scene.position);

	    spotLight.position.set (-40, 60, -10);
	    scene.add(spotLight);
	};

	var initObject = function() {
        plane.rotation.x = -0.5 * Math.PI;
    	plane.position.x = 15;
    	plane.position.y = 0;
    	plane.position.z = 0;
    	scene.add(plane);

    	cube.position.x = -4;
    	cube.position.y = 3;
    	cube.position.z = 0;
    	scene.add(cube);

    	sphere.position.x = 20;
    	sphere.position.y = 4;
    	sphere.position.z = 2;
    	scene.add(sphere);
	};

    var rotate = function() {
        cube.rotation.x += controls.rotationSpeed;
        cube.rotation.y += controls.rotationSpeed;
        cube.rotation.z += controls.rotationSpeed;
    };

    var bounce = function() {
        step += controls.bouncingSpeed;
        sphere.position.x = 20 + 10 * Math.cos(step);
        sphere.position.y = 2 + 10 * Math.abs(Math.sin(step));
    }

    var renderScene = function() {
        rotate();
        bounce();

        stats.update();
        requestAnimationFrame(renderScene);
        renderer.render(scene, camera);
    };

    var stats = initStats();
	initScene();
	initObject();
    //var effect = new THREE.AsciiEffect(renderer);
    //effect.setSize(window.innerWidth, window.innerHeight);
	$("#window").append(renderer.domElement);
	renderScene();

});