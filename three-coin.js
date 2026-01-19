// === THREE.JS + GSAP COIN SCROLL ===

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 4;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById("coin3d"),
  alpha: true,
  antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Texture
const textureLoader = new THREE.TextureLoader();
const coinTexture = textureLoader.load("assets/coin-texture.png");

// Coin Geometry
const geometry = new THREE.CylinderGeometry(1, 1, 0.15, 64);

// Coin Material
const material = new THREE.MeshStandardMaterial({
  map: coinTexture,
  metalness: 0.8,
  roughness: 0.3
});

// Coin Mesh
const coin = new THREE.Mesh(geometry, material);
coin.rotation.x = Math.PI / 2;
scene.add(coin);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// === GSAP SCROLL ANIMATION ===
gsap.registerPlugin(ScrollTrigger);

gsap.to(coin.rotation, {
  y: Math.PI * 4,
  scrollTrigger: {
    trigger: ".coin-scroll",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});

// Subtle floating animation
gsap.to(coin.position, {
  y: 0.3,
  duration: 2,
  ease: "sine.inOut",
  yoyo: true,
  repeat: -1
});

// Resize Handling
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
