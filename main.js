import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.min.js";

// 🌌 Scene, Camera, Renderer सेट करें
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// ✨ Particle Geometry बनाएँ
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 7000; // ज्यादा Particles जोड़ें
const positions = new Float32Array(particlesCount * 3);
const colors = new Float32Array(particlesCount * 3);

// 🎨 Particles के लिए Random Position और Colors सेट करें
for (let i = 0; i < particlesCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
    colors[i] = Math.random(); // RGB के लिए Random Colors
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// 🌟 Glow Effect के लिए Texture लोड करें
const loader = new THREE.TextureLoader();
const glowTexture = loader.load("https://threejs.org/examples/textures/sprites/circle.png");

// 🎨 Particles Material बनाएँ (Gradient Color Effect)
const particlesMaterial = new THREE.PointsMaterial({
    map: glowTexture,
    transparent: true, 
    blending: THREE.AdditiveBlending,
    vertexColors: true, // Color को Enable करें
    size: 0.15,
    depthWrite: false
});

// 💫 Particles को Scene में जोड़ें
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

// 🔄 Animation Function
function animate() {
    requestAnimationFrame(animate);

    // ✨ Slow Rotation Effect
    particles.rotation.y += 0.0005;
    particles.rotation.x += 0.0003;

    renderer.render(scene, camera);
}

animate();

// 📏 Resize Event (Responsive बनाएं)
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
