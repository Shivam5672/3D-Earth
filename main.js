import * as THREE from 'three';
import vertexShader from './assets/shaders/vertex.glsl';
import fragmentShader from './assets/shaders/fragment.glsl';
import atmosphereVertexShaders from './assets/shaders/atmosphereVertex.glsl';
import atmosphereFragmentShaders from './assets/shaders/atmosphereFragment.glsl';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import myImage from './images/earthUVMap.jpg';

// get the canvas element
const canvas = document.querySelector('#draw');
const canvasContainer = document.querySelector('.canvas');
// create a scene
const scene = new THREE.Scene();
// create a camera
const camera = new THREE.PerspectiveCamera(75, canvasContainer.offsetWidth / canvasContainer.offsetHeight, 1, 10000);
// setting camera position (in z - axis)
camera.position.z = 5;

// create a texture
const earthMapTexture = new THREE.TextureLoader().load(myImage);

// create a sphere
const sphere = new THREE.IcosahedronGeometry(2, 100);
const sphereVertexShader = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    globeTexture: {
      value: earthMapTexture,
    },
  },
});

const sphereMesh = new THREE.Mesh(sphere, sphereVertexShader);


// create a atmosphere
const atmosphere = new THREE.IcosahedronGeometry(2.2, 100);
const atmosphereVertexShader = new THREE.ShaderMaterial({
  vertexShader: atmosphereVertexShaders,
  fragmentShader: atmosphereFragmentShaders,
  blending: THREE.AdditiveBlending,
  side: THREE.BackSide,
});

const atmosphereMesh = new THREE.Mesh(atmosphere, atmosphereVertexShader);
atmosphereMesh.scale.set(1.1, 1.1, 1.1);

// adding cube to the scene
scene.add(sphereMesh);
scene.add(atmosphereMesh);

// create a renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);

window.addEventListener('resize', () => {
  renderer.setSize(canvasContainer.offsetHeight, canvasContainer.offsetHeight);
  camera.aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
  camera.updateProjectionMatrix();
});

// create a control
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  window.requestAnimationFrame(animate);
  sphereMesh.rotation.y += 0.001;
  controls.update();
  renderer.render(scene, camera);
}
animate();

const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 1,
  sizeAttenuation: false,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
});

const starVertices = [];

const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

for (let i = 0; i < 4000; i++) {
  const x = (Math.random() - 0.5) * 500;
  const y = (Math.random() - 0.5) * 500;
  const z = (Math.random() - 0.5) * 500;
  starVertices.push(x, y, z);
}

starGeometry.setAttribute(
  'position',
  new THREE.Float32BufferAttribute(starVertices, 3)
);