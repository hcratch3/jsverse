// Helper function to load TOML files
async function loadTOML(filePath) {
    const response = await fetch(filePath);
    const text = await response.text();
    return toml.parse(text);
}

// Helper function to load JSON files
async function loadJSON(filePath) {
    const response = await fetch(filePath);
    return response.json();
}

// Initialize Three.js scene
function init() {
    const container = document.getElementById('container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Load 3D models based on JSON and TOML configurations
    async function loadModels() {
        const modelData = await loadJSON('3d_data.json');
        const keys = Object.keys(modelData);

        for (const key of keys) {
            const config = await loadTOML(`blocks/${key}.toml`);
            const geometry = new THREE.BoxGeometry(); // Example geometry
            const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Example material
            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.set(config.x, config.y, config.z);
            scene.add(mesh);
        }

        animate();
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    camera.position.z = 50;
    loadModels();
}

init();
