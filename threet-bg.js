const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("bg3d"),
  alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// LIGHT
const light = new THREE.PointLight(0x8a2be2, 1);
light.position.set(20, 20, 20);
scene.add(light);

// PARTICLES (MATHEMATICAL SPACE)
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1500;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
  posArray[i] = (Math.random() - 0.5) * 200;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(posArray, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.6,
  color: 0x9b6cff,
});

const particlesMesh = new THREE.Points(
  particlesGeometry,
  particlesMaterial
);
scene.add(particlesMesh);

// ANIMATE
function animate() {
  requestAnimationFrame(animate);

  particlesMesh.rotation.y += 0.0008;
  particlesMesh.rotation.x += 0.0003;

  renderer.render(scene, camera);
}
animate();

// RESPONSIVE
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
