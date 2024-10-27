import * as THREE from "three";

/**
 * // Usage: Create and add some stone columns to the scene
 * const scene = new THREE.Scene();
 * const stoneColumn = new StoneColumnGeometry();
 *
 * // Example: Placing multiple columns with wrought iron fence sections
 * const columnsAndFenceGroup = new THREE.Group();
 * for (let i = 0; i < 5; i++) {
 *   const columnMesh = stoneColumn.getMesh().clone();
 *   columnMesh.position.set(i * 6, 0, 0); // Space columns apart
 *   columnsAndFenceGroup.add(columnMesh);
 *
 *   // Add a placeholder for the wrought iron fence section between columns
 *   if (i < 4) { // Add fence only between columns
 *     const fenceGeometry = new THREE.BoxGeometry(5, 2, 0.2); // Placeholder for the fence
 *     const fenceMaterial = new THREE.MeshStandardMaterial({ color: 0x333333, flatShading: true });
 *     const fenceMesh = new THREE.Mesh(fenceGeometry, fenceMaterial);
 *     fenceMesh.position.set(i * 6 + 3, 1.25, 0); // Position between columns
 *     columnsAndFenceGroup.add(fenceMesh);
 *   }
 * }
 */
class StoneColumn extends THREE.Group {
  constructor(height = 2.25) {
    super();

    // Column Base (a wider base for stability)
    const baseGeometry = new THREE.BoxGeometry(1.2, 0.5, 1.2);
    const baseMaterial = new THREE.MeshStandardMaterial({ color: 0x8b7d7b, flatShading: true });
    const baseMesh = new THREE.Mesh(baseGeometry, baseMaterial);
    baseMesh.position.set(0, 0.25, 0);
    baseMesh.castShadow = true;
    this.add(baseMesh);

    // Main Column (a tall rectangular shape, adjustable height)
    const columnGeometry = new THREE.BoxGeometry(1, height, 1);
    const columnMaterial = new THREE.MeshStandardMaterial({ color: 0x8b7d7b, flatShading: true });
    const columnMesh = new THREE.Mesh(columnGeometry, columnMaterial);
    columnMesh.position.set(0, 0.5 + height / 2, 0);
    columnMesh.castShadow = true;
    this.add(columnMesh);

    // Column Cap (a slightly wider cap on top)
    const capGeometry = new THREE.BoxGeometry(1.4, 0.3, 1.4);
    const capMaterial = new THREE.MeshStandardMaterial({ color: 0x8b7d7b, flatShading: true });
    const capMesh = new THREE.Mesh(capGeometry, capMaterial);
    capMesh.position.set(0, 0.5 + height + 0.15, 0);
    capMesh.castShadow = true;
    this.add(capMesh);
  }
}

export { StoneColumn };
