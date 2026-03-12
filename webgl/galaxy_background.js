/**
 * Galaxy Background - WebGL Effect
 */

class GalaxyBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        
        this.stars = null;
        this.nebula = null;
        this.particles = null;
        
        this.init();
    }

    init() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Camera position
        this.camera.position.z = 1000;
        
        // Create galaxy elements
        this.createStars();
        this.createNebula();
        this.createParticles();
        
        // Handle resize
        window.addEventListener('resize', () => this.onResize());
        
        // Mouse interaction
        this.mouseX = 0;
        this.mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX - window.innerWidth / 2) * 0.1;
            this.mouseY = (e.clientY - window.innerHeight / 2) * 0.1;
        });
        
        // Start animation
        this.animate();
    }

    createStars() {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];
        
        for (let i = 0; i < 15000; i++) {
            const x = (Math.random() - 0.5) * 4000;
            const y = (Math.random() - 0.5) * 4000;
            const z = (Math.random() - 0.5) * 4000;
            
            vertices.push(x, y, z);
            
            // Color variation
            const color = new THREE.Color();
            const hue = Math.random() * 0.2 + 0.5; // Blue to cyan
            color.setHSL(hue, 0.8, 0.8);
            colors.push(color.r, color.g, color.b);
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });
        
        this.stars = new THREE.Points(geometry, material);
        this.scene.add(this.stars);
    }

    createNebula() {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];
        
        for (let i = 0; i < 5000; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 500;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            const z = (Math.random() - 0.5) * 500;
            
            vertices.push(x, y, z);
            
            // Nebula colors - purple to cyan
            const color = new THREE.Color();
            const hue = Math.random() * 0.3 + 0.5;
            color.setHSL(hue, 0.8, 0.5);
            colors.push(color.r, color.g, color.b);
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 8,
            vertexColors: true,
            transparent: true,
            opacity: 0.3,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });
        
        this.nebula = new THREE.Points(geometry, material);
        this.scene.add(this.nebula);
    }

    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        
        // Create floating particles
        for (let i = 0; i < 1000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            vertices.push(x, y, z);
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        
        const material = new THREE.PointsMaterial({
            size: 4,
            color: 0x00f0ff,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Rotate stars slowly
        if (this.stars) {
            this.stars.rotation.x += 0.0002;
            this.stars.rotation.y += 0.0001;
        }
        
        // Rotate nebula
        if (this.nebula) {
            this.nebula.rotation.x -= 0.0001;
            this.nebula.rotation.y += 0.0002;
        }
        
        // Animate particles
        if (this.particles) {
            this.particles.rotation.y += 0.001;
            
            // Access positions and animate
            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.1;
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }
        
        // Mouse parallax
        this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.02;
        this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.02;
        this.camera.lookAt(this.scene.position);
        
        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    dispose() {
        this.renderer.dispose();
        window.removeEventListener('resize', () => this.onResize());
    }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('webgl-bg');
    if (canvas && typeof THREE !== 'undefined') {
        new GalaxyBackground('webgl-bg');
    }
});

// Export
window.GalaxyBackground = GalaxyBackground;
