// WebGL Scene Manager
class AIScene {
    constructor(canvas) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
        this.mouseX = 0;
        this.mouseY = 0;
        this.clock = new THREE.Clock();
        
        this.init();
    }
    
    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.camera.position.z = 1000;
        
        this.createNeuralNetwork();
        this.createFloatingElements();
        this.addLights();
        
        window.addEventListener('resize', () => this.onResize());
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        
        this.animate();
    }
    
    createNeuralNetwork() {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];
        
        // Create neural network nodes
        for (let i = 0; i < 3000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            
            vertices.push(x, y, z);
            
            // Color gradient from cyan to purple
            const color = new THREE.Color();
            color.setHSL(Math.random() * 0.3 + 0.5, 0.8, 0.6);
            colors.push(color.r, color.g, color.b);
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 3,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
        
        // Create connections between particles
        this.createConnections();
    }
    
    createConnections() {
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        
        const particlePositions = this.particles.geometry.attributes.position.array;
        
        for (let i = 0; i < 200; i++) {
            const idx1 = Math.floor(Math.random() * (particlePositions.length / 3)) * 3;
            const idx2 = Math.floor(Math.random() * (particlePositions.length / 3)) * 3;
            
            positions.push(
                particlePositions[idx1], particlePositions[idx1 + 1], particlePositions[idx1 + 2],
                particlePositions[idx2], particlePositions[idx2 + 1], particlePositions[idx2 + 2]
            );
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        
        const material = new THREE.LineBasicMaterial({
            color: 0x00f0ff,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending
        });
        
        this.lines = new THREE.LineSegments(geometry, material);
        this.scene.add(this.lines);
    }
    
    createFloatingElements() {
        // Create floating AI elements
        const geometries = [
            new THREE.IcosahedronGeometry(50, 0),
            new THREE.OctahedronGeometry(40, 0),
            new THREE.TetrahedronGeometry(35, 0),
            new THREE.TorusGeometry(30, 10, 16, 100)
        ];
        
        this.floatingElements = [];
        
        for (let i = 0; i < 5; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? 0x00f0ff : 0x7b2cbf,
                wireframe: true,
                transparent: true,
                opacity: 0.5
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 800,
                (Math.random() - 0.5) * 600,
                (Math.random() - 0.5) * 400
            );
            
            mesh.userData = {
                rotationSpeed: (Math.random() - 0.5) * 0.01,
                floatSpeed: Math.random() * 0.5 + 0.5,
                floatOffset: Math.random() * Math.PI * 2
            };
            
            this.floatingElements.push(mesh);
            this.scene.add(mesh);
        }
    }
    
    addLights() {
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);
        
        const pointLight1 = new THREE.PointLight(0x00f0ff, 1, 1000);
        pointLight1.position.set(200, 200, 200);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0x7b2cbf, 1, 1000);
        pointLight2.position.set(-200, -200, 200);
        this.scene.add(pointLight2);
    }
    
    onMouseMove(event) {
        this.mouseX = event.clientX - window.innerWidth / 2;
        this.mouseY = event.clientY - window.innerHeight / 2;
    }
    
    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const time = this.clock.getElapsedTime();
        
        // Rotate particles
        this.particles.rotation.x += 0.0002;
        this.particles.rotation.y += 0.0003;
        
        // Mouse interaction
        this.particles.rotation.x += (this.mouseY * 0.0001 - this.particles.rotation.x) * 0.05;
        this.particles.rotation.y += (this.mouseX * 0.0001 - this.particles.rotation.y) * 0.05;
        
        // Rotate lines
        this.lines.rotation.x += 0.0001;
        this.lines.rotation.y += 0.0002;
        
        // Animate floating elements
        this.floatingElements.forEach((element, index) => {
            element.rotation.x += element.userData.rotationSpeed;
            element.rotation.y += element.userData.rotationSpeed * 1.5;
            element.position.y += Math.sin(time * element.userData.floatSpeed + element.userData.floatOffset) * 0.3;
        });
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Auto-initialize if canvas exists
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const canvas = document.getElementById('webgl-canvas');
        if (canvas) {
            window.aiScene = new AIScene(canvas);
        }
    });
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIScene;
}