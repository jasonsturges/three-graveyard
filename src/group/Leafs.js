import * as THREE from 'three';
import {SimpleLeafGeometry} from "../geometry/SimpleLeafGeometry.js";

class Leafs extends THREE.Group {
  constructor(numLeaves = 200) {
    super();

    // Create Leaf Geometry and Material
    this.leafGeometry = new SimpleLeafGeometry();
    this.leafMaterial = new THREE.MeshStandardMaterial({
      color: 0x88aa33,
      side: THREE.DoubleSide, // Leaves should be visible from both sides
      flatShading: true,
      metalness: 0.1,
      roughness: 0.8,
    });

    // Number of leaves to instance
    this.numLeaves = numLeaves;

    // Create an InstancedMesh
    this.leavesMesh = new THREE.InstancedMesh(this.leafGeometry, this.leafMaterial, this.numLeaves);

    // Set up transformation matrices for each instance
    this.dummyMatrix = new THREE.Matrix4();
    this.randomValues = []; // To store random data for each leaf (e.g., speed)

    for (let i = 0; i < this.numLeaves; i++) {
      // Random position for each leaf
      const x = (Math.random() - 0.5) * 20;
      const y = Math.random() * 9 + 0.5;
      const z = (Math.random() - 0.5) * 20;

      // Random rotation
      const rotationX = (Math.random() - 0.5) * Math.PI;
      const rotationY = (Math.random() - 0.5) * Math.PI;
      const rotationZ = (Math.random() - 0.5) * Math.PI;

      // Set position and rotation for the instance
      this.dummyMatrix.makeRotationFromEuler(new THREE.Euler(rotationX, rotationY, rotationZ));
      this.dummyMatrix.setPosition(x, y, z);

      // Apply the transformation to the instance
      this.leavesMesh.setMatrixAt(i, this.dummyMatrix);

      // Store random values for animation purposes
      this.randomValues.push({
        speedX: (Math.random() - 0.5) * 0.01,
        speedY: -0.005,
        speedZ: (Math.random() - 0.5) * 0.01,
      });
    }

    // Add the InstancedMesh to the group
    this.add(this.leavesMesh);
  }

  // Method to update leaf positions (e.g., for animation purposes)
  update() {
    for (let i = 0; i < this.numLeaves; i++) {
      const matrix = new THREE.Matrix4();
      this.leavesMesh.getMatrixAt(i, matrix);

      const position = new THREE.Vector3();
      position.setFromMatrixPosition(matrix);

      position.x += this.randomValues[i].speedX;
      position.y += this.randomValues[i].speedY;
      position.z += this.randomValues[i].speedZ;

      // Reset leaf if it falls below the ground
      if (position.y < 0) {
        position.set((Math.random() - 0.5) * 20, Math.random() * 3 + 0.5, (Math.random() - 0.5) * 20);

        // Update speed for new variability
        this.randomValues[i].speedX = (Math.random() - 0.5) * 0.01;
        this.randomValues[i].speedY = -0.005;
        this.randomValues[i].speedZ = (Math.random() - 0.5) * 0.01;
      }

      // Set the updated position back to the matrix
      matrix.setPosition(position);
      this.leavesMesh.setMatrixAt(i, matrix);
    }
    this.leavesMesh.instanceMatrix.needsUpdate = true;
  }
}

export { Leafs };
