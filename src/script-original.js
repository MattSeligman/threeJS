import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import gsap from 'gsap';
import GUI from 'lil-gui';

/**
 * Textures
 */
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
	console.log('Loading...');
};

loadingManager.onProgress = () => {
	console.log('Progress');
};

loadingManager.onError = () => {
	console.log('Error');
};
const textureLoader = new THREE.TextureLoader(loadingManager);
const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager);

const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorAmbientTexture = textureLoader.load(
	'/textures/door/ambientOcclusion.jpg'
);
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');

const matcapTexture = textureLoader.load('/textures/matcaps/7.png');
const donutMatcapTexture = textureLoader.load('/textures/matcaps/4.png');
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg');
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

const environmentMapTexture = cubeTextureLoader.load([
	'/textures/environmentMaps/0/px.jpg',
	'/textures/environmentMaps/0/nx.jpg',
	'/textures/environmentMaps/0/py.jpg',
	'/textures/environmentMaps/0/ny.jpg',
	'/textures/environmentMaps/0/pz.jpg',
	'/textures/environmentMaps/0/nz.jpg',
]);

/**
 * Fonts
 */
const fontLoader = new FontLoader();
fontLoader.load('/fonts/helvetiker_regular.typeface.json', font => {
	console.log(`Font Loaded`);

	const textGeometry = new TextGeometry(`Matt Seligman`, {
		font: font,
		size: 0.5,
		height: 0.2,
		curveSegments: 3,
		bevelEnabled: true,
		bevelThickness: 0.03,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 5,
	});

	// textGeometry.computeBoundingBox();
	// textGeometry.translate(
	// 	-(textGeometry.boundingBox.max.x - 0.02) * 0.5,
	// 	-(textGeometry.boundingBox.max.y - 0.02) * 0.5,
	// 	-(textGeometry.boundingBox.max.z - 0.03) * 0.5
	// );
	// console.log(textGeometry.boundingBox);
	textGeometry.center();

	const textMaterial = new THREE.MeshMatcapMaterial({
		matcap: matcapTexture,
	});
	const text = new THREE.Mesh(textGeometry, textMaterial);
	text.castShadow = true;
	scene.add(text);

	console.time('donuts');
	const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 200, 45);
	const donutMaterial = new THREE.MeshMatcapMaterial({
		matcap: donutMatcapTexture,
	});

	for (let i = 0; i < 100; i++) {
		const donut = new THREE.Mesh(donutGeometry, donutMaterial);
		donut.position.x = (Math.random() - 0.5) * 10;
		donut.position.y = (Math.random() - 0.5) * 10;
		donut.position.z = (Math.random() - 0.5) * 10;

		donut.rotation.x = Math.random() * Math.PI;
		donut.rotation.z = Math.random() * Math.PI;

		const donutScale = Math.random();
		donut.scale.set(donutScale, donutScale, donutScale);
		donut.castShadow = true;
		scene.add(donut);
	}
	console.timeEnd('donuts');
});

/**
 * UV Map Options
 */
// doorColorTexture.repeat.x = 1; // Repeat Texture on X Axis
// doorColorTexture.repeat.y = 2; // Repeat Texture on Y Axis

// doorColorTexture.offset.x = 0.5; // Repeat UVs on X Axis
// doorColorTexture.offset.y = 0.5; // Repeat UVs on Y Axis

// doorColorTexture.rotation = Math.PI / 4; // Rotate UVs

// doorColorTexture.wrapS = THREE.RepeatWrapping; // Repeat Texture
// doorColorTexture.wrapT = THREE.RepeatWrapping; // Repeat Texture

doorColorTexture.generateMipmaps = false;
doorColorTexture.minFilter = THREE.NearestFilter;
doorColorTexture.magFilter = THREE.NearestFilter;

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
 * Objects Materials
 */

// const material = new THREE.MeshBasicMaterial({
// 	transparent: true,
// 	map: doorColorTexture,
// 	alphaMap: doorAlphaTexture,
// });

// Normal Map Materials
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true; // unsmooths the material

// Matcap Materials
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcapTexture;

// const material = new THREE.MeshDepthMaterial();

// const material = new THREE.MeshLambertMaterial(); // Lambert Material

// const material = new THREE.MeshPhongMaterial(); // Phong Material
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff); // Control the color of specularity

// const material = new THREE.MeshToonMaterial(); // Toon Material
// material.gradientMap = gradientTexture;

// const material = new THREE.MeshStandardMaterial({
// 	transparent: true,
// 	map: doorColorTexture,
// 	alphaMap: doorAlphaTexture,
// 	aoMap: doorAmbientTexture,
// 	aoMapIntensity: 1,
// 	displacementMap: doorHeightTexture,
// 	displacementScale: 0.3,
// 	metalnessMap: doorMetalnessTexture,
// 	roughnessMap: doorRoughnessTexture,
// 	normalMap: doorNormalTexture,
// });

const material = new THREE.MeshStandardMaterial({
	// metalness: 0.7,
	roughness: 0.2,
	// envMap: environmentMapTexture,
});

material.normalScale.set(0.5, 0.5);

gui
	.add(material, 'displacementScale')
	.min(0)
	.max(1)
	.step(0.0001)
	.name('Displacement Scale');

gui
	.add(material, 'roughness')
	.min(0)
	.max(1)
	.step(0.0001)
	.name('Material Roughness');

gui
	.add(material, 'metalness')
	.min(0)
	.max(1)
	.step(0.0001)
	.name('Material Metalness');

gui
	.add(material, 'aoMapIntensity')
	.min(0)
	.max(10)
	.step(0.0001)
	.name('Ambient Occlusion Intensity');

// material.roughness = 0.15;
// material.metalness = 0.15;

// Transparency Controls
material.transparent = true;
// material.opacity = 0.5;

// Additional ways able to set Texture maps to the Material
// material.map = doorColorTexture;

// Additional ways able to set Colors for the Material
// material.color.set('#ffffff');
// material.color = new THREE.Color('#ffffff');
// material.color = new THREE.Color('white');
// material.color = new THREE.Color(0xff0ff);

/**
 * Shadows
 */

/**
 * Object Lighting
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.01);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 3, 4);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.far = 6;
directionalLight.shadow.camera.near = 1;
// scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0xff000, 0x0000ff, 0.3);
hemisphereLight.position.set(1, 0.25, 0);
hemisphereLight.castShadow = true;
scene.add(hemisphereLight);

const pointLight = new THREE.PointLight(0xff9000, 0.5);
pointLight.position.set(1, -0.5, 1);
pointLight.castShadow = true;
scene.add(pointLight);

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1);
rectAreaLight.position.set(-0.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);

const spotLight = new THREE.SpotLight(
	0x78ff00,
	0.5,
	10,
	Math.PI * 0.1,
	0.25,
	1
);

spotLight.position.set(0, 2, 5);
spotLight.position.set(2, 2, 5);
spotLight.castShadow = true;

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
scene.add(spotLightCameraHelper);
scene.add(spotLight);

spotLight.target.position.x = 0;
scene.add(spotLight.target);

// Helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(
	hemisphereLight,
	0.1
);
scene.add(hemisphereLightHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(
	directionalLight,
	0.1
);
scene.add(directionalLightHelper);

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.1);
scene.add(pointLightHelper);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

window.requestAnimationFrame(() => {
	spotLightHelper.update();
});

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);

// const point = new THREE.PointLight(0xffffff, 0.5);
// const light = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(light, point);

// point.position.x = 2;
// point.position.y = 0;
// point.position.z = 4;

/**
 * Objects
 */

const sphere = new THREE.Mesh(
	new THREE.SphereGeometry(1, 32, 64, 64),
	material
);
const sphere2 = new THREE.Mesh(
	new THREE.SphereGeometry(1, 32, 64, 64),
	material
);

sphere2.position.x = 2;
sphere2.position.y = 0;
sphere2.position.z = -3;

sphere.castShadow = true;

scene.add(sphere2);

// Ambient
sphere.geometry.setAttribute(
	'uv2',
	new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);
sphere.position.y = 3.5;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(3, 3, 100, 100), material);
plane.geometry.setAttribute(
	'uv2',
	new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

plane.position.y = 3.5;
plane.position.x = 3.5;

const torus = new THREE.Mesh(
	new THREE.TorusGeometry(0.5, 0.2, 64, 128),
	material
);

torus.geometry.setAttribute(
	'uv2',
	new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

torus.position.y = 3.5;
torus.position.x = -2.5;

const groundPlane = new THREE.Mesh(
	new THREE.PlaneGeometry(100, 100, 100, 100),
	material
);
groundPlane.position.set(0, -1, 0);
groundPlane.rotation.set(-1.5, 0, 0);
scene.add(groundPlane);

groundPlane.receiveShadow = true;

const group = new THREE.Group();

let hideObjects = {
	hide: false,
	checkIfHidden: () => {
		console.log(hideObjects);
		if (hideObjects.hide === false) {
			scene.add(sphere, plane, torus);
			scene.add(group);
			hideObjects.hide = true;
		} else if (hideObjects.hide === true) {
			scene.remove(sphere, plane, torus);
			scene.remove(group);
			hideObjects.hide = false;
		}

		console.log(hideObjects);
	},
};

group.scale.y = Math.PI * 1;
group.position.z = Math.PI * 0;

const cube1 = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	// new THREE.MeshBasicMaterial({ color: 0xff0000 }) // Color
	new THREE.MeshBasicMaterial({ map: doorColorTexture }) // Texture
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
gui.close();
const visibilityFolder = gui.addFolder('Visibility');
visibilityFolder.add(axesHelper, 'visible').name('Axis Visibility');
visibilityFolder.add(group, 'visible').name('Hide Group');
visibilityFolder.close();

const wireframeFolder = gui.addFolder('Wireframe');
// wireframeFolder.add(material, 'wireframe').name('All Wireframe');
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
gui.add(hideObjects, 'checkIfHidden');

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
	renderer.shadowMap.enabled = true; // Enable Shadows
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

	sphere.rotation.y = 0.1 * elapsedTime;
	plane.rotation.y = 0.1 * elapsedTime;
	torus.rotation.y = 0.1 * elapsedTime;

	sphere.rotation.x = 0.15 * elapsedTime;
	plane.rotation.x = 0.15 * elapsedTime;
	torus.rotation.x = 0.15 * elapsedTime;
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
