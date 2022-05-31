import './style.css';
import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Mesh Positions
 */
// mesh.position.x = 1;
// mesh.position.y = 1;
// mesh.position.z = 1;
mesh.position.set(1, 1, 1);

/**
 * Mesh Scale
 */
// mesh.scale.x = 1;
// mesh.scale.y = 1;
// mesh.scale.z = 1;
mesh.scale.set(1, 1, 1);

/**
 * Mesh Rotation
 */
mesh.rotation.reorder('YXZ'); /* Control Order to prevent order issues */
mesh.rotation.y = Math.PI * 0.25;
mesh.rotation.x = Math.PI * 0.25;
mesh.rotation.z = Math.PI * 0.25;

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
	width: window.innerWidth - 15,
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
camera.position.z = 4;
camera.position.y = 1;
camera.position.x = 1;
camera.lookAt(mesh.position);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
