// OneHand AI - WebGL Scene for Interactive Background

class WebGLScene {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.targetX = 0;
        this.targetY = 0;
        
        this.init();
    }
    
    init() {
        this.setupRenderer();
        this.createParticles();
        this.createConnections();
        this.createFloatingElements();
        this.addEventListeners();
        this.animate();
    }
    
    setupRenderer() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.camera.position.z = 1000;
    }
    
    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];
        
        const particleCount = 2500;
        
        for (let i = 0; i < particleCount; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            
            vertices.push(x, y, z);
            
            // Gradient colors from cyan to purple
            const color = new THREE.Color();
            const hue = 0.5 + Math.random() * 0.2; // cyan to blue range
            color.setHSL(hue, 0.8, 0.6);
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
    }
    
    createConnections() {
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        
        const particlePositions = this.particles.geometry.attributes.position.array;
        
        for (let i = 0; i < 150; i++) {
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
            opacity: 0.15,
            blending: THREE.AdditiveBlending
        });
        
        this.lines = new THREE.LineSegments(geometry, material);
        this.scene.add(this.lines);
    }
    
    createFloatingElements() {
        const geometries = [
            new THREE.IcosahedronGeometry(50, 0),
            new THREE.OctahedronGeometry(40, 0),
            new THREE.TetrahedronGeometry(35, 0),
            new THREE.TorusGeometry(30, 8, 16, 50)
        ];
        
        this.floatingElements = [];
        
        for (let i = 0; i < 4; i++) {
            const geometry = geometries[i % geometries.length];
            const material = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? 0x00f0ff : 0x7b2cbf,
                wireframe: true,
                transparent: true,
                opacity: 0.4
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(
                (Math.random() - 0.5) * 600,
                (Math.random() - 0.5) * 400,
                (Math.random() - 0.5) * 300
            );
            
            mesh.userData = {
                rotationSpeed: (Math.random() - 0.5) * 0.01,
                floatSpeed: Math.random() * 0.3 + 0.3,
                floatOffset: Math.random() * Math.PI * 2,
                initialY: mesh.position.y
            };
            
            this.floatingElements.push(mesh);
            this.scene.add(mesh);
        }
    }
    
    addEventListeners() {
        window.addEventListener('resize', () => this.onResize());
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    }
    
    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    onMouseMove(event) {
        this.mouseX = event.clientX - window.innerWidth / 2;
        this.mouseY = event.clientY - window.innerHeight / 2;
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const time = Date.now() * 0.001;
        
        // Smooth mouse following
        this.targetX += (this.mouseX - this.targetX) * 0.02;
        this.targetY += (this.mouseY - this.targetY) * 0.02;
        
        // Rotate particles based on mouse position
        this.particles.rotation.x += 0.0002 + this.targetY * 0.0001;
        this.particles.rotation.y += 0.0003 + this.targetX * 0.0001;
        
        // Rotate connections
        this.lines.rotation.x += 0.0001;
        this.lines.rotation.y += 0.0002;
        
        // Animate floating elements
        this.floatingElements.forEach((element) => {
            const data = element.userData;
            element.rotation.x += data.rotationSpeed;
            element.rotation.y += data.rotationSpeed * 1.5;
            element.position.y = data.initialY + Math.sin(time * data.floatSpeed + data.floatOffset) * 30;
        });
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('webgl-canvas')) {
        window.webglScene = new WebGLScene('webgl-canvas');
    }
});

// Export
window.WebGLScene = WebGLScene;