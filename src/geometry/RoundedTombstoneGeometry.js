import * as THREE from "three";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

/**
 * Class for Rounded Tombstone Geometry
 *
 * Usage: Create and add a rounded tombstone to the scene
 * ```
 * const scene = new THREE.Scene();
 * const tombstoneMaterial = new THREE.MeshStandardMaterial({ color: 0x777777, roughness: 0.8 });
 * const tombstoneGeometry = new RoundedTombstoneGeometry();
 * const tombstoneMesh = new THREE.Mesh(tombstoneGeometry, tombstoneMaterial);
 * tombstoneMesh.position.set(1, 0, 1); // Position the tombstone in the scene
 * scene.add(tombstoneMesh);
 * ```
 */
class RoundedTombstoneGeometry extends THREE.BufferGeometry {
  constructor(width = 0.6, height = 1.0, depth = 0.2) {
    super();

    // Create the base of the tombstone (a box)
    const baseHeight = height * 0.7;
    const baseGeometry = new THREE.BoxGeometry(width, baseHeight, depth);
    baseGeometry.translate(0, baseHeight / 2, 0);

    // Create the rounded top part (a half cylinder with caps)
    const topHeight = height - baseHeight;
    const topGeometry = new THREE.CylinderGeometry(width / 2, width / 2, depth, 16, 1, false, 0, Math.PI);
    topGeometry.rotateY(Math.PI / 2);
    topGeometry.rotateX(Math.PI / 2);
    topGeometry.translate(0, baseHeight + topHeight / 2 - depth / 2 - 0.05, 0);

    // Merge base and top into a single geometry
    this.copy(BufferGeometryUtils.mergeGeometries([baseGeometry, topGeometry], true));
  }
}

export { RoundedTombstoneGeometry };
