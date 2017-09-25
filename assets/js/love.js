var camera, tick = 0,
	scene, renderer, clock = new THREE.Clock(),
	controls, container,
	options, spawnerOptions, particleSystem;

init();
animate();

function init() {

	container = document.getElementById('3-container');

	camera = new THREE.PerspectiveCamera(28, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.z = 100;

	scene = new THREE.Scene();

	particleSystem = new THREE.GPUParticleSystem({
		maxParticles: 500000
	});

	scene.add(particleSystem);

	options = {
		position: new THREE.Vector3(),
		positionRandomness: 1,
		velocity: new THREE.Vector3(),
		velocityRandomness: 1,
		color: 0xaa88ff,
		colorRandomness: 0,
		turbulence: 20,
		lifetime: 30,
		size: 3,
		sizeRandomness: 1
	};

	spawnerOptions = {
		spawnRate: 50000,
		horizontalSpeed: 1.5,
		verticalSpeed: 1.33,
		timeScale: 1
	};

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);

	// controls = new THREE.TrackballControls(camera, renderer.domElement);
	// controls.rotateSpeed = 5.0;
	// controls.zoomSpeed = 2.2;
	// controls.panSpeed = 1;
	// controls.dynamicDampingFactor = 0.3;

	window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

	requestAnimationFrame(animate);

	// controls.update();

	var delta = clock.getDelta() * spawnerOptions.timeScale;

	tick += delta;

	if (tick < 0) tick = 0;

	if (delta > 0) {
		options.position.x = Math.sin(tick * spawnerOptions.horizontalSpeed) * 20;
		options.position.y = Math.sin(tick * spawnerOptions.verticalSpeed) * 10;
		options.position.z = Math.sin(tick * spawnerOptions.horizontalSpeed + spawnerOptions.verticalSpeed) * 5;
		for (var x = 0; x < spawnerOptions.spawnRate * delta; x++) {
			// Yep, that's really it.	Spawning particles is super cheap, and once you spawn them, the rest of
			// their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
			particleSystem.spawnParticle(options);
		}
	}

	particleSystem.update(tick);

	render();
}

function render() {

	renderer.render(scene, camera);

}