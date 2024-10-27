import * as THREE from "three";

// Class for Lantern Geometry
class Lantern extends THREE.Group {
  constructor(height = 1.3, baseWidth = 0.5) {
    super();

    // Lantern Base (cylinder)
    const baseGeometry = new THREE.CylinderGeometry(baseWidth, baseWidth, 0.2, 16);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513, flatShading: true });
    const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
    baseMesh.position.set(0, 0, 0);
    this.add(baseMesh);

    // Lantern Body (a rectangular frame)
    const bodyGeometry = new THREE.CylinderGeometry(baseWidth * 0.9, baseWidth * 0.9, height);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xffd700, flatShading: true, transparent: true, opacity: 0.6 });
    const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);
    bodyMesh.position.set(0, height / 2 + 0.1, 0); // Adjust position based on height
    this.add(bodyMesh);

    // Lantern Roof (a cone)
    const roofGeometry = new THREE.ConeGeometry(baseWidth * 1.1, 0.5, 8);
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513, flatShading: true });
    const roofMesh = new THREE.Mesh(roofGeometry, roofMaterial);
    roofMesh.position.set(0, height + 0.35, 0); // Adjusted position based on height
    this.add(roofMesh);

    // Lantern Handle (a torus)
    const handleGeometry = new THREE.TorusGeometry(baseWidth * 0.8, 0.05, 8, 16);
    const handleMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513, flatShading: true });
    const handleMesh = new THREE.Mesh(handleGeometry, handleMaterial);
    handleMesh.position.set(0, height + 0.85, 0); // Adjusted to sit above the roof
    this.add(handleMesh);

    // Lantern Light (point light inside)
    const light = new THREE.PointLight(0xffaa00, 1.5, 15);
    light.position.set(0, height / 2 + 0.1, 0); // Adjust position based on height
    light.castShadow = true;
    this.add(light);
  }
}

export { Lantern };
