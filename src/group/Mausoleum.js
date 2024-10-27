import * as THREE from "three";

// Class for Simple Mausoleum Geometry extending THREE.Group
class Mausoleum extends THREE.Group {
  constructor() {
    super();

    // Base of the Mausoleum
    const baseGeometry = new THREE.BoxGeometry(5, 1, 5);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, flatShading: true });
    const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
    baseMesh.position.set(0, 0.5, 0);
    this.add(baseMesh);

    // Main Building Structure
    const buildingGeometry = new THREE.BoxGeometry(4, 3, 4);
    const buildingMaterial = new THREE.MeshStandardMaterial({ color: 0x696969, flatShading: true });
    const buildingMesh = new THREE.Mesh(buildingGeometry, buildingMaterial);
    buildingMesh.position.set(0, 2.5, 0);
    this.add(buildingMesh);

    // Roof (Peaked)
    const roofGeometry = new THREE.ConeGeometry(3.5, 2, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x505050, flatShading: true });
    const roofMesh = new THREE.Mesh(roofGeometry, roofMaterial);
    roofMesh.rotation.y = Math.PI / 4;
    roofMesh.position.set(0, 5, 0);
    this.add(roofMesh);

    // Pillars
    const pillarGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3.5, 16);
    const pillarMaterial = new THREE.MeshStandardMaterial({ color: 0x696969, flatShading: true });

    const pillarPositions = [
      [-1.8, 2.3, -2.2],
      [1.8, 2.3, -2.2],
      [-1.8, 2.3, 2.2],
      [1.8, 2.3, 2.2],
    ];

    pillarPositions.forEach((position) => {
      const pillarMesh = new THREE.Mesh(pillarGeometry, pillarMaterial);
      pillarMesh.position.set(...position);
      this.add(pillarMesh);
    });

    // Corrected Arched Entrance
    const archShape = new THREE.Shape();
    archShape.moveTo(-1, 0);
    archShape.lineTo(-1, 2);
    archShape.absarc(0, 2, 1, Math.PI, 0, true);
    archShape.lineTo(1, 0);

    const extrudeSettings = {
      depth: 0.5,
      bevelEnabled: false,
    };
    const archGeometry = new THREE.ExtrudeGeometry(archShape, extrudeSettings);
    const archMaterial = new THREE.MeshStandardMaterial({ color: 0x404040, flatShading: true });
    const archMesh = new THREE.Mesh(archGeometry, archMaterial);
    archMesh.position.set(0, 0.5, 1.7);
    this.add(archMesh);
  }
}

export { Mausoleum };
