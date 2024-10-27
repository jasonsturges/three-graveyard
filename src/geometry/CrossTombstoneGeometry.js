import * as THREE from "three";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

/**
 * Class for Cross Tombstone Geometry
 *
 * Usage: Create and add a cross tombstone to the scene
 * ```
 * const crossTombstoneGeometry = new CrossTombstoneGeometry();
 * const crossTombstoneMesh = new THREE.Mesh(crossTombstoneGeometry, tombstoneMaterial);
 * crossTombstoneMesh.position.set(-1, 0, 1); // Position the cross tombstone
 * scene.add(crossTombstoneMesh);
 * ```
 */
class CrossTombstoneGeometry extends THREE.BufferGeometry {
  constructor(width = 0.4, height = 1.2, depth = 0.2) {
    super();

    // Create the vertical part of the cross
    const verticalHeight = height * 0.6;
    const verticalGeometry = new THREE.BoxGeometry(width / 2, verticalHeight, depth);
    verticalGeometry.translate(0, verticalHeight / 2, 0);

    // Create the horizontal part of the cross
    const horizontalWidth = width * 1.5;
    const horizontalGeometry = new THREE.BoxGeometry(horizontalWidth, width / 4, depth);
    horizontalGeometry.translate(0, verticalHeight * 0.75, 0);

    // Merge both parts into a cross
    this.copy(BufferGeometryUtils.mergeGeometries([verticalGeometry, horizontalGeometry], true));
  }
}

export { CrossTombstoneGeometry };
