import * as THREE from "three";

class Bone extends THREE.Group {
  constructor(radiusTop = 0.5, radiusBottom = 0.5, height = 2, radialSegments = 8) {
    super();

    // Create the cylinder (shaft of the bone)
    const cylinderGeometry = new THREE.CylinderGeometry(
      radiusTop * 0.6, // slightly narrower for the shaft
      radiusBottom * 0.6,
      height,
      radialSegments,
    );
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const cylinderMesh = new THREE.Mesh(cylinderGeometry, material);
    cylinderMesh.position.y = 0;
    this.add(cylinderMesh);

    // Create the spheres (ends of the bone)
    const sphereGeometry = new THREE.SphereGeometry(radiusTop, radialSegments, radialSegments);
    const topSphere1 = new THREE.Mesh(sphereGeometry, material);
    const topSphere2 = new THREE.Mesh(sphereGeometry, material);
    const bottomSphere1 = new THREE.Mesh(sphereGeometry, material);
    const bottomSphere2 = new THREE.Mesh(sphereGeometry, material);

    // Position the spheres at each end of the cylinder
    topSphere1.position.set(0, height / 2 + radiusTop * 0.6, -radiusTop * 0.6);
    topSphere2.position.set(0, height / 2 + radiusTop * 0.6, radiusTop * 0.6);
    bottomSphere1.position.set(0, -height / 2 - radiusBottom * 0.6, -radiusBottom * 0.6);
    bottomSphere2.position.set(0, -height / 2 - radiusBottom * 0.6, radiusBottom * 0.6);

    // Add the spheres to the bone
    this.add(topSphere1);
    this.add(topSphere2);
    this.add(bottomSphere1);
    this.add(bottomSphere2);
  }
}
export { Bone };
