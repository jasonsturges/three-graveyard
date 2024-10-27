import "./style.css";
import * as THREE from "three";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import { BrightnessContrastShader } from "three/addons/shaders/BrightnessContrastShader.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { GammaCorrectionShader } from "three/addons/shaders/GammaCorrectionShader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { SimplexNoise } from "three/addons/math/SimplexNoise.js";

import { Bone } from "./geometry/Bone.js";
import { Candle } from "./group/Candle.js";
import { CrossTombstoneGeometry } from "./geometry/CrossTombstoneGeometry.js";
import { Lantern } from "./group/Lantern.js";
import { Leafs } from "./group/Leafs.js";
import { Mausoleum } from "./group/Mausoleum.js";
import { Moon } from "./group/Moon.js";
import { ObeliskTombstoneGeometry } from "./geometry/ObeliskTombstone.js";
import { Rock } from "./group/Rock.js";
import { RoundedTombstoneGeometry } from "./geometry/RoundedTombstoneGeometry.js";
import { SlabTombstoneGeometry } from "./geometry/SlabTombstoneGeometry.js";
import { StoneColumn } from "./group/StoneColumn.js";
import { WroughtIronFence } from "./group/WroughtIronFence.js";

// Create a new scene
const scene = new THREE.Scene();

// Add fog to the scene for spooky atmosphere
scene.fog = new THREE.Fog(0x010101, 5, 35); // Dark gray fog

// Set up a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 7, 13);

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;

// Add OrbitControls for easy navigation
const controls = new OrbitControls(camera, renderer.domElement);

const simplex = new SimplexNoise();

// Terrain geometry
let terrainGeometry = new THREE.PlaneGeometry(32, 32, 256, 256);
terrainGeometry.deleteAttribute("normal");
terrainGeometry.deleteAttribute("uv");
terrainGeometry = BufferGeometryUtils.mergeVertices(terrainGeometry);
terrainGeometry.computeVertexNormals();

const vertices = terrainGeometry.getAttribute("position");
const centerRadius = 12; // Radius of the flat center area
const maxHeight = 2.0; // Adjust to control overall height

for (let i = 0; i < vertices.count; i++) {
  const vertex = new THREE.Vector3().fromBufferAttribute(vertices, i);
  const distanceFromCenter = Math.sqrt(vertex.x * vertex.x + vertex.y * vertex.y);

  // Calculate a height multiplier based on distance from center using easing
  let t = (distanceFromCenter - centerRadius) / (16 - centerRadius);
  t = Math.max(0, Math.min(1, t)); // Clamp t between 0 and 1
  const heightMultiplier = t * t * (3 - 2 * t); // Cubic easing for smooth transition

  // Apply height using simplex noise and height multiplier
  const height = heightMultiplier * simplex.noise(vertex.x * 0.05, vertex.y * 0.05) * maxHeight;
  vertices.setXYZ(i, vertex.x, vertex.y, height);
}

terrainGeometry.computeVertexNormals();

const terrainMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22, flatShading: true });
const terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial);
terrainMesh.rotateX(-Math.PI / 2);
terrainMesh.receiveShadow = true;
scene.add(terrainMesh);

// Create a mausoleum and add it to the scene
const mausoleum = new Mausoleum();
mausoleum.position.set(0, 0, -5);
scene.add(mausoleum);

// Tombstone Material
const tombstoneMaterial = new THREE.MeshStandardMaterial({ color: 0x777777, roughness: 0.8 });

// Function to create a row of randomly oriented tombstones
function createTombstoneRow(numTombstones = 5) {
  const tombstoneGroup = new THREE.Group();
  for (let i = 0; i < numTombstones; i++) {
    const tombstoneTypes = [RoundedTombstoneGeometry, CrossTombstoneGeometry, SlabTombstoneGeometry, ObeliskTombstoneGeometry];
    const randomIndex = Math.floor(Math.random() * tombstoneTypes.length);
    const tombstone = new tombstoneTypes[randomIndex]();

    const tombstoneMesh = new THREE.Mesh(tombstone, tombstoneMaterial);
    tombstoneMesh.position.set(i, 0, (Math.random() - 0.5) * 0.1); // Position tombstones in a row with slight random z variation
    tombstoneMesh.rotation.y = (Math.random() - 0.5) * 0.5; // Slight random rotation
    tombstoneMesh.rotation.z = (Math.random() - 0.5) * 0.25; // Slight random rotation
    tombstoneMesh.castShadow = true;
    tombstoneGroup.add(tombstoneMesh);
  }
  return tombstoneGroup;
}

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 2; j++) {
    const tombstones = createTombstoneRow(7);
    tombstones.position.set(j === 0 ? -7.5 : 1.5, 0, (i + 1) * 2);
    scene.add(tombstones);
  }
}

// Create a stone column and wrought iron fence
const stoneColumn = new StoneColumn();
const wroughtIronFence = new WroughtIronFence(15);

// Group to hold columns and fence for an enclosed square area
const enclosedFenceGroup = new THREE.Group();
const sideLength = 4;
const columnSpacing = 6;

for (let side = 0; side < sideLength; side++) {
  for (let i = 0; i < sideLength; i++) {
    const columnMesh = stoneColumn.clone();
    let x = side === 1 || side === 3 ? i * columnSpacing : side === 0 ? 0 : (sideLength - 1) * columnSpacing;
    let z = side === 0 || side === 2 ? i * columnSpacing : side === 1 ? (sideLength - 1) * columnSpacing : 0;
    columnMesh.position.set(x, 0, z);
    enclosedFenceGroup.add(columnMesh);

    // Add wrought iron fence section between columns
    if (i < sideLength - 1) {
      const fenceMesh = wroughtIronFence.clone();

      fenceMesh.position.set(x, 0, z);
      if (side === 0 || side === 2) {
        fenceMesh.rotation.y = -Math.PI / 2;
      }

      if (!(side === 1 && i === 1)) enclosedFenceGroup.add(fenceMesh);
    }
  }
}

enclosedFenceGroup.position.set(-9, 0, -9);

scene.add(enclosedFenceGroup);

// Add a spotlight
const spotlight = new THREE.SpotLight(0x23adf5, 100, 10, Math.PI / 8);
spotlight.position.set(0, 9, -15);
spotlight.target = mausoleum; // Aim at the rounded tombstone
spotlight.distance = 15;
spotlight.angle = Math.PI / 6;
spotlight.penumbra = 0.5;
spotlight.castShadow = true;
scene.add(spotlight);

// Add a lantern to the scene
const lantern = new Lantern(1.3, 0.5);
lantern.scale.set(0.5, 0.5, 0.5);
lantern.position.set(-1.25, 1, -2.8);
scene.add(lantern);

// Add candles to the scene
for (let i = 0; i < 5; i++) {
  const candle = new Candle(Math.random(), Math.random() * 0.1);
  candle.position.set(Math.random() * 24 - 12, 0, Math.random() * 24 - 12);
  scene.add(candle);
}

const candle = new Candle(0.2, 0.05);
candle.position.set(4.0, 0, 9.7);
scene.add(candle);

// Place rocks at random polar angles with a minimum distance from the center
for (let i = 0; i < 10; i++) {
  const rock = new Rock();
  rock.scale.set(0.5, 0.5, 0.5);

  // Random polar coordinates
  const angle = Math.random() * 2 * Math.PI; // Random angle between 0 and 2*PI
  const distance = 6 + Math.random() * 12; // Random distance beyond minRadius

  // Convert polar to Cartesian coordinates
  const x = Math.cos(angle) * distance;
  const z = Math.sin(angle) * distance;

  rock.position.set(x, -0.1, z); // Keep rocks at ground level, set x and z based on polar coordinates
  scene.add(rock);
}

for (let i = 0; i < 25; i++) {
  const radius = Math.random() * 0.07 + 0.03;
  const bone = new Bone(radius, radius, radius * 4, 8);
  bone.position.set(Math.random() * 24 - 12, 0, Math.random() * 24 - 12);
  bone.rotation.x = -Math.PI / 2;
  bone.rotation.z = Math.random() * Math.PI;
  bone.rotation.x += Math.random() * 0.1 - 0.05;
  bone.rotation.y += Math.random() * 0.1 - 0.05;
  bone.rotation.z += Math.random() * 0.1 - 0.05;
  scene.add(bone);
}

// Point Light (light that spreads in all directions from a point)
const pointLight = new THREE.PointLight(0xffffff, 1.2, 32);
pointLight.position.set(4.4, 2, 1.7);
pointLight.decay = 2;
pointLight.castShadow = true;
scene.add(pointLight);

// Point Light (light that spreads in all directions from a point)
const pointLight2 = new THREE.PointLight(0xffffff, 1.2, 32);
pointLight2.position.set(-4.4, 2, 1.7);
pointLight2.decay = 2;
pointLight2.castShadow = true;
scene.add(pointLight2);

// Add a moon to the scene
const moon = new Moon();
moon.position.set(9, 15, -45); // Adjust position as desired
scene.add(moon);

// Add leaves mesh to the scene
const leafs = new Leafs();
scene.add(leafs);

const brightnessPass = new ShaderPass(BrightnessContrastShader);
brightnessPass.uniforms["brightness"].value = 0.045; // Positive value to brighten up the scene slightly
brightnessPass.uniforms["contrast"].value = -0.02; // Adjust contrast to taste

const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);

// Create EffectComposer for post-processing1
const composer = new EffectComposer(renderer);

// Add RenderPass
const renderPass = new RenderPass(scene, camera);
composer.addPass(renderPass);
composer.addPass(gammaCorrectionPass);
composer.addPass(brightnessPass);

// Render loop
renderer.setAnimationLoop(() => {
  leafs.update();
  controls.update();
  composer.render();
});

// Handle window resize
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
  composer.setSize(width, height);
});
