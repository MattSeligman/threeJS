import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import GUI from 'lil-gui';

/**
 * Debug (Dat GUI) - Top Right Panel
 */
const gui = new GUI({ closed: true });

/**
 * Cursor
 */
const cursor = {
	x: 0,
	y: 0,
};

window.addEventListener('mousemove', event => {
	cursor.x = event.clientX / sizes.width - 0.5;
	cursor.y = -(event.clientY / sizes.height - 0.5);

	// console.log(`Cursor: X: ${cursor.x}, Y: ${cursor.y}`);
});

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
 * Added Menus for Debug GUI
 * object, axis, max, min, step (precision)
 */
const visibilityFolder = gui.addFolder('Visibility');
visibilityFolder.add(axesHelper, 'visible').name('Axis Visibility');
visibilityFolder.add(group, 'visible').name('Hide Group');
visibilityFolder.close();

const wireframeFolder = gui.addFolder('Wireframe');
wireframeFolder.add(cube1.material, 'wireframe').name('Box 1 - Wireframe');
wireframeFolder.add(cube2.material, 'wireframe').name('Box 2 - Wireframe');
wireframeFolder.add(cube3.material, 'wireframe').name('Box 3 - Wireframe');
wireframeFolder.close();

gui.add(group.position, 'y').min(-3).max(3).step(0.1).name('Group 1 - Y Axis');

const parameters = {
	color: 0xff0000,
	spin: () => {
		gsap.to(group.rotation, { y: Math.PI * 2, duration: 1 });
	},
};

gui
	.addColor(parameters, 'color')
	.name('Cube 1 - Color')
	.onChange(() => {
		cube1.material.color.set(parameters.color);
	});

gui
	.addColor(parameters, 'color')
	.name('Cube 2 - Color')
	.onChange(() => {
		cube2.material.color.set(parameters.color);
	});

gui
	.addColor(parameters, 'color')
	.name('Cube 3 - Color')
	.onChange(() => {
		cube3.material.color.set(parameters.color);
	});

gui.add(parameters, 'spin');

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

/**
 * Update's the Sizes on Viewport Resize
 */
window.addEventListener('resize', () => {
	// Update Sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update Camera's Aspect Ratio
	camera.aspect = sizes.width / sizes.height;

	// Update's the camera's Projection Matrix on Resize
	camera.updateProjectionMatrix();

	// Update the Render & Canvas with new sizes
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener('dblclick', () => {
	const fullscreenElement =
		document.fullscreenElement || document.webkitFullscreenElement;

	if (!fullscreenElement) {
		if (canvas.requestFullscreen) {
			canvas.requestFullscreen();
		} else if (canvas.webkitRequestFullscreen) {
			canvas.webkitRequestFullscreen();
		}
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}
	}
});
/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);

// # Orthographic Camera
// const aspectRatio = sizes.width / sizes.height;
// const orthCamSettings = {
// 	left: -1 * aspectRatio,
// 	right: 1 * aspectRatio,
// 	top: 1,
// 	bottom: -1,
// 	near: 0.1,
// 	far: 100
// }

// const camera = new THREE.OrthographicCamera(orthCamSettings.left, orthCamSettings.right, orthCamSettings.top, orthCamSettings.bottom, orthCamSettings.near, orthCamSettings.far);

scene.add(camera);

/**
 *  Camera Positions
 */
camera.position.z = 5;
// camera.position.y = 1;
// camera.position.x = 0;
// camera.lookAt(group);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 *  Clock
 */
const clock = new THREE.Clock();

/**
 * GSAP Examples
 */
/* Object Animating (Mesh/Group), Object including destination.  */
// gsap.to(group.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(group.position, { duration: 1, delay: 2, x: 0 });

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas);
controls.target.y = 2;
controls.enableDamping = true;
controls.update();

/**
 * Keyframe Animations
 */
const keyframe = () => {
	/**
	 * Clock to determine time between frames
	 */
	const elapsedTime = clock.getElapsedTime();

	/**
	 * Object Animation Updates
	 */
	// # Adjust position incrementally per frame
	// group.position.z -= 0.01;
	// group.position.x += 0.01;

	// # Rotation of Group using Math.sin & Math.cos
	// group.rotation.y = Math.sin(elapsedTime);
	// group.position.y = Math.sin(elapsedTime);
	// group.position.x = Math.cos(elapsedTime);

	// # Rotation of Camera using Math.sin & Math.cos
	// camera.rotation.y = Math.sin(elapsedTime);
	// camera.position.y = Math.sin(elapsedTime);
	// camera.position.x = Math.cos(elapsedTime);

	/**
	 * Update Camera Position
	 */
	// View left and right objects
	// camera.position.x = cursor.x * 10
	// camera.position.y = cursor.y * 10

	/** Update Object Controls */
	controls.update();

	/**
	 * Animate Rotating Objects
	 */

	// # Animate based on Camera Position equaling the Math.sin & Math.cos of the elapsed time multiplied by the distance
	// camera.position.x = Math.sin(elapsedTime) * 5;
	// camera.position.z = Math.cos(elapsedTime) * 5;

	// # Animate Based on Cursor Position
	// camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 5;
	// camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 5;
	// camera.position.y = cursor.y * 5;

	/**
	 *  Camera Look at the Group
	 */
	camera.lookAt(group.position);

	/**
	 * Alternative camera.lookAt (If not using Group or using Cursor)
	 */
	// camera.lookAt(new THREE.Vector3(0, 0, 0));
	// camera.lookAt(new THREE.Vector3(cursor.x, cursor.y, 0));

	/**
	 * Render the Scene & Camera
	 */
	renderer.render(scene, camera);
	window.requestAnimationFrame(keyframe);
};

keyframe();
