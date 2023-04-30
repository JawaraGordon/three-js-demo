import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

// field of view. FOV is the extent of the scene that is seen on the display at any given moment. The value is in degrees.
const camera = new THREE.PerspectiveCamera(
  10,
  //   The second one is the aspect ratio. You almost always want to use the width of the element divided by the height, or you'll get the same result as when you play old movies on a widescreen TV - the image looks squished.
  window.innerWidth / window.innerHeight,
  //   near and far clipping plane. What that means, is that objects further away from the camera than the value of far or closer than near won't be rendered
  0.1,
  1000
);

// set scene BG color

scene.background = new THREE.Color('white');
let light = new THREE.DirectionalLight(0xffffff, 50);
scene.add(light);

// It's a good idea to use the width and height of the area we want to fill with our app - in this case, the width and height of the browser window. For performance intensive apps, you can also give setSize smaller values, like window.innerWidth/2 and window.innerHeight/2, which will make the app render at quarter size.
const renderer = new THREE.WebGLRenderer();
// If you wish to keep the size of your app but render it at a lower resolution, you can do so by calling setSize with false as updateStyle (the third argument). For example, setSize(window.innerWidth/2, window.innerHeight/2, false) will render your app at half resolution, given that your <canvas> has 100% width and height.
renderer.setSize(window.innerWidth, window.innerHeight);
// This is a <canvas> element the renderer uses to display the scene to us.
document.body.appendChild(renderer.domElement);

// contains all the points (vertices) and fill (faces) of the cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
// All materials take an object of properties which will be applied to them
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

// an object that takes a geometry, and applies a material to it, then inserted into a scene,
const cube = new THREE.Mesh(geometry, material);

// scene.add(cube);
// defaults to coordinates (0,0,0). This would cause both the camera and the cube to be inside each other. To avoid this, move the camera out
camera.position.z = 10;
camera.position.y = 5;

// render / animate loop
function animate() {
  // This will create a loop that causes the renderer to draw the scene every time the screen is refreshed (on a typical screen this means 60 times per second).

  // pauses when the user navigates to another browser tab, hence not wasting their precious processing power and battery life.
  requestAnimationFrame(animate);
  //   This will be run every frame (normally 60 times per second), and give the cube a nice rotation animation. Basically, anything you want to move or change while the app is running has to go through the animate loop.
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  //   model.rotation.x += 0.01;
  model.rotation.y += 0.01;
  renderer.render(scene, camera);
}
// adding camera / mouse controls
const controls = new OrbitControls(camera, renderer.domElement);

// adding 3D model asset
// download the asset from this link: https://sketchfab.com/3d-models/crystal-skull-1861e32380a64d159a5232193661efce
// Artist:
// Ramon
// WEBSITE
// https://linktr.ee/ramon.sales

let model;

const loader = new GLTFLoader();

loader.load(
  // add the relative path from your directory
  'assets/crystal_skull/scene.gltf',
  function (gltf) {
    model = gltf.scene;
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

animate();
