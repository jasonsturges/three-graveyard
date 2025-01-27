import * as THREE from "three";

// Candle Class with Flickering Point Light
class Candle extends THREE.Group {
  constructor(height = 1, radius = 0.2) {
    super();
    this.height = height;
    this.radius = radius;
    this.createCandle();
    this.animateFlicker();
  }

  createCandle() {
    // Candle Geometry
    const candleGeometry = new THREE.CylinderGeometry(this.radius, this.radius, this.height, 32);
    const candleMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    this.candle = new THREE.Mesh(candleGeometry, candleMaterial);
    this.candle.position.set(0, this.height / 2, 0);
    this.add(this.candle);

    // Flame Geometry
    const flameGeometry = new THREE.SphereGeometry(0.05, 16, 16);
    const flameMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 });
    this.flame = new THREE.Mesh(flameGeometry, flameMaterial);
    this.flame.position.set(0, this.height + 0.05, 0);
    this.add(this.flame);

    // Candle Light
    this.candleLight = new THREE.PointLight(0xffa500, 1, 5);
    this.candleLight.position.set(0, this.height + 0.05, 0);
    this.candleLight.castShadow = true;
    this.add(this.candleLight);
  }

  animateFlicker() {
    const flicker = () => {
      // Random flicker intensity between 0.8 and 1.2
      this.candleLight.intensity = 1 + (Math.random() * 0.4 - 0.2);

      // Optional: slight random movement to simulate a flickering flame
      this.candleLight.position.x = 0 + (Math.random() * 0.02 - 0.01);
      this.candleLight.position.z = 0 + (Math.random() * 0.02 - 0.01);

      requestAnimationFrame(flicker);
    };
    flicker();
  }
}

export { Candle };
