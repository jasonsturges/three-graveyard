import * as THREE from "three";

/**
 * Class for Rectangular Slab Tombstone Geometry
 *
 * Usage: Create and add a slab tombstone to the scene
 * ```
 * const slabTombstoneGeometry = new SlabTombstoneGeometry();
 * const slabTombstoneMesh = new THREE.Mesh(slabTombstoneGeometry, tombstoneMaterial);
 * slabTombstoneMesh.position.set(0, 0, -1); // Position the rectangular slab tombstone
 * slabTombstoneMesh.rotation.z = Math.PI / 16; // Add a slight tilt for an eerie look
 * scene.add(slabTombstoneMesh);
 * ```
 */
class SlabTombstoneGeometry extends THREE.BufferGeometry {
  constructor(width = 0.5, height = 0.8, depth = 0.15) {
    super();

    // Create a rectangular slab
    const slabGeometry = new THREE.BoxGeometry(width, height, depth);
    slabGeometry.translate(0, height / 2, 0); // Shift up to stand on the ground

    this.copy(slabGeometry);
  }
}
export { SlabTombstoneGeometry };
