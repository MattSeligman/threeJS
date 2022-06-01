import './style.css';
import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const group = new THREE.Group();
scene.add(group);

group.scale.y = Math.PI * 1;
group.position.z = Math.PI * 0;

const cube1 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
group.add(cube1);

const cube2 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
group.add(cube2);
cube2.position.set(2, 0, 0);

const cube3 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
group.add(cube3);
cube3.position.set(-2, 0, 0);

/*
 * Axes helper
 */
const axisDistance = 2;
const axesHelper = new THREE.AxesHelper(axisDistance);
scene.add(axesHelper);

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth / 1.02,
	height: window.innerHeight - 95,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);

/**
 *  Camera Positions
 */
camera.position.z = 5;
camera.position.y = 1;
camera.position.x = 0;
// camera.lookAt(group);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

/**
 *  Clock
 */
const clock = new THREE.Clock();

/**
 * Animations
 */

const keyframe = () => {
	// Clock
	const elapsedTime = clock.getElapsedTime();

	// Update Objects
	// group.position.z -= 0.01;
	// group.position.x += 0.01;
	group.rotation.y = Math.sin(elapsedTime);
	group.position.y = Math.sin(elapsedTime);
	group.position.x = Math.cos(elapsedTime);
	// cube1.rotation.y = deltaTime * Math.PI * 0.00005;

	// Render Scene
	renderer.render(scene, camera);

	window.requestAnimationFrame(keyframe);
};

keyframe();
