import * as THREE from 'three';

// Class for Low-Poly Rock Geometry
class Rock extends THREE.Group{
  constructor() {
    super();

    // Rock Geometry (using Dodecahedron for a low-poly random rock-like shape)
    const rockGeometry = new THREE.DodecahedronGeometry(1, 0); // Low-poly shape
    const rockMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, flatShading: true });

    // Create multiple random rocks with slight variations
    for (let i = 0; i < 5; i++) {
      const rockMesh = new THREE.Mesh(rockGeometry, rockMaterial);
      rockMesh.scale.set(
        0.8 + Math.random() * 0.4,
        0.8 + Math.random() * 0.4,
        0.8 + Math.random() * 0.4
      ); // Scale randomly to make each rock unique
      rockMesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ); // Random rotation for variation
      rockMesh.position.set(
        (Math.random() - 0.5) * 4,
        0, // Keep rocks at ground level
        (Math.random() - 0.5) * 4
      );
      this.add(rockMesh);
    }
  }
}

export { Rock };
