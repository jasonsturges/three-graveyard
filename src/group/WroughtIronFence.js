import * as THREE from "three";
import { WroughtIronBarGeometry } from "../geometry/WroughtIronBarGeometry.js";

class WroughtIronFence extends THREE.Group {
  constructor(numBars = 10, barSpacing = 0.4, barHeight = 2.0, railHeight = 0.1, railDepth = 0.05) {
    super();

    const fenceLength = (numBars - 1) * barSpacing;
    const material = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.8, roughness: 0.4 });

    // Add Vertical Bars with Spikes
    for (let i = 0; i < numBars; i++) {
      const barGeometry = new WroughtIronBarGeometry(barHeight);
      const barMesh = new THREE.Mesh(barGeometry, material);
      barMesh.castShadow = true;

      // Position each bar along the x-axis
      barMesh.position.set(i * barSpacing, 0, 0);

      // Add the bar to the group
      this.add(barMesh);
    }

    // Add Horizontal Top and Bottom Rails
    const railGeometry = new THREE.BoxGeometry(fenceLength + barSpacing, railHeight, railDepth);
    const bottomRail = new THREE.Mesh(railGeometry, material);
    const topRail = new THREE.Mesh(railGeometry, material);

    // Position the bottom rail
    bottomRail.position.set(fenceLength / 2, railHeight / 2, 0);

    // Position the top rail at the top of the bars
    topRail.position.set(fenceLength / 2, barHeight - railHeight / 2, 0);

    // Add rails to the group
    this.add(bottomRail);
    this.add(topRail);
  }
}

export { WroughtIronFence };
