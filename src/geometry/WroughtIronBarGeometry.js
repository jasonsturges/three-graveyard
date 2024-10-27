import * as THREE from 'three';
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

// Class for Vertical Iron Bars with Spikes
/**
 * const material = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8, roughness: 0.4 });
 * const fenceGroup = new THREE.Group();
 *
 * const numBars = 10;
 * const barSpacing = 0.4;
 * const barHeight = 2.0;
 * const railHeight = 0.1;
 * const railDepth = 0.05;
 * const fenceLength = (numBars - 1) * barSpacing;
 *
 * // Add Vertical Bars with Spikes
 * for (let i = 0; i < numBars; i++) {
 *   const barGeometry = new WroughtIronBarGeometry(barHeight);
 *   const barMesh = new THREE.Mesh(barGeometry, material);
 *
 *   // Position each bar along the x-axis
 *   barMesh.position.set(i * barSpacing, 0, 0);
 *
 *   // Add the bar to the group
 *   fenceGroup.add(barMesh);
 * }
 *
 * // Add Horizontal Top and Bottom Rails
 * const railGeometry = new THREE.BoxGeometry(fenceLength + barSpacing, railHeight, railDepth);
 * const bottomRail = new THREE.Mesh(railGeometry, material);
 * const topRail = new THREE.Mesh(railGeometry, material);
 *
 * // Position the bottom rail
 * bottomRail.position.set(fenceLength / 2, railHeight / 2, 0);
 *
 * // Position the top rail at the top of the bars
 * topRail.position.set(fenceLength / 2, barHeight - railHeight / 2, 0);
 *
 * // Add rails to the group
 * fenceGroup.add(bottomRail);
 * fenceGroup.add(topRail);
 *
 * // Add the fence group to the scene
 * scene.add(fenceGroup);
 *
 */
class WroughtIronBarGeometry extends THREE.BufferGeometry {
  constructor(barHeight = 2.0, barRadius = 0.05, spikeHeight = 0.3) {
    super();

    // Create a cylinder for the vertical bar
    const barGeometry = new THREE.CylinderGeometry(barRadius, barRadius, barHeight, 8);
    barGeometry.translate(0, barHeight / 2, 0); // Shift up to stand on the ground

    // Create a cone for the spike on top
    const spikeGeometry = new THREE.ConeGeometry(barRadius * 1.5, spikeHeight, 8);
    spikeGeometry.translate(0, barHeight + spikeHeight / 2, 0); // Place on top of the bar

    // Merge bar and spike into one geometry
    this.copy(BufferGeometryUtils.mergeGeometries([barGeometry, spikeGeometry], true));
  }
}

export { WroughtIronBarGeometry };
