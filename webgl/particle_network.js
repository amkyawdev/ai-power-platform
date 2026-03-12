/**
 * Particle Network - Neural Network Background
 */

class ParticleNetwork {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.options = {
            particleCount: options.particleCount || 80,
            connectionDistance: options.connectionDistance || 150,
            particleSize: options.particleSize || 3,
            speed: options.speed || 0.5,
            color: options.color || 0x00f0ff,
            ...options
        };
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true });
        
        this.particles = null;
        this.lines = null;
        this.particlePositions = [];
        this.velocities = [];
        
        this.init();
    }

    init() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Camera position
        this.camera.position.z = 600;
        
        // Create particles
        this.createParticles();
        
        // Create neural connections
        this.createConnections();
        
        // Handle resize
        window.addEventListener('resize', () => this.onResize());
        
        // Mouse interaction
        this.mouse = new THREE.Vector2(-1000, -1000);
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        });
        
        // Start animation
        this.animate();
    }

    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        
        for (let i = 0; i < this.options.particleCount; i++) {
            const x = (Math.random() - 0.5) * 800;
            const y = (Math.random() - 0.5) * 800;
            const z = (Math.random() - 0.5) * 800;
            
            positions.push(x, y, z);
            this.particlePositions.push(new THREE.Vector3(x, y, z));
            
            // Random velocity
            this.velocities.push({
                x: (Math.random() - 0.5) * this.options.speed,
                y: (Math.random() - 0.5) * this.options.speed,
                z: (Math.random() - 0.5) * this.options.speed
            });
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        
        const material = new THREE.PointsMaterial({
            size: this.options.particleSize,
            color: this.options.color,
            transparent: true,
            opacity: 0.8,
            sizeAttenuation: true
        });
        
        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createConnections() {
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        
        const material = new THREE.LineBasicMaterial({
            color: this.options.color,
            transparent: true,
            opacity: 0.15,
            blending: THREE.AdditiveBlending
        });
        
        this.lines = new THREE.LineSegments(geometry, material);
        this.scene.add(this.lines);
    }

    updateConnections() {
        const positions = [];
        
        for (let i = 0; i < this.particlePositions.length; i++) {
            for (let j = i + 1; j < this.particlePositions.length; j++) {
                const distance = this.particlePositions[i].distanceTo(this.particlePositions[j]);
                
                if (distance < this.options.connectionDistance) {
                    const opacity = 1 - (distance / this.options.connectionDistance);
                    
                    positions.push(
                        this.particlePositions[i].x,
                        this.particlePositions[i].y,
                        this.particlePositions[i].z,
                        this.particlePositions[j].x,
                        this.particlePositions[j].y,
                        this.particlePositions[j].z
                    );
                }
            }
        }
        
        this.lines.geometry.setAttribute('position',
            new THREE.Float32BufferAttribute(positions, 3));
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Update particle positions
        for (let i = 0; i < this.particlePositions.length; i++) {
            const pos = this.particlePositions[i];
            const vel = this.velocities[i];
            
            // Update position
            pos.x += vel.x;
            pos.y += vel.y;
            pos.z += vel.z;
            
            // Bounce off boundaries
            if (Math.abs(pos.x) > 400) vel.x *= -1;
            if (Math.abs(pos.y) > 400) vel.y *= -1;
            if (Math.abs(pos.z) > 400) vel.z *= -1;
            
            // Mouse interaction - particles move away from mouse
            const mouseVec = new THREE.Vector3(
                this.mouse.x * 400,
                this.mouse.y * 400,
                0
            );
            
            const distToMouse = pos.distanceTo(mouseVec);
            if (distToMouse < 150) {
                const force = (150 - distToMouse) / 150;
                const direction = pos.clone().sub(mouseVec).normalize();
                pos.add(direction.multiplyScalar(force * 2));
            }
        }
        
        // Update geometry
        const posArray = [];
        this.particlePositions.forEach(p => {
            posArray.push(p.x, p.y, p.z);
        });
        this.particles.geometry.setAttribute('position',
            new THREE.Float32BufferAttribute(posArray, 3));
        
        // Update connections
        this.updateConnections();
        
        // Slowly rotate entire scene
        this.scene.rotation.y += 0.0002;
        
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
        new ParticleNetwork('webgl-bg');
    }
});

// Export
window.ParticleNetwork = ParticleNetwork;
