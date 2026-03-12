// Galaxy Visualization for OneHand AI
class GalaxyVisualization {
    constructor(canvas) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
        this.renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
        
        this.init();
    }
    
    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.camera.position.z = 1500;
        
        this.createGalaxy();
        this.createNebula();
        this.createStars();
        
        window.addEventListener('resize', () => this.onResize());
        
        this.animate();
    }
    
    createGalaxy() {
        // Create spiral galaxy
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const colors = [];
        
        const arms = 3;
        const totalStars = 15000;
        
        for (let i = 0; i < totalStars; i++) {
            const arm = i % arms;
            const distance = Math.random() * 800 + 50;
            const angle = (arm * Math.PI * 2 / arms) + (distance * 0.01) + (Math.random() - 0.5) * 0.5;
            
            const x = Math.cos(angle) * distance + (Math.random() - 0.5) * 100;
            const y = (Math.random() - 0.5) * 50 + Math.sin(distance * 0.02) * 20;
            const z = Math.sin(angle) * distance + (Math.random() - 0.5) * 100;
            
            vertices.push(x, y, z);
            
            // Color based on distance from center
            const hue = 0.5 + (distance / 800) * 0.2;
            const color = new THREE.Color();
            color.setHSL(hue, 0.8, 0.6);
            colors.push(color.r, color.g, color.b);
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        
        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });
        
        this.galaxy = new THREE.Points(geometry, material);
        this.scene.add(this.galaxy);
    }
    
    createNebula() {
        // Create nebula clouds
        const nebulaGeometry = new THREE.SphereGeometry(300, 32, 32);
        const nebulaMaterial = new THREE.MeshBasicMaterial({
            color: 0x7b2cbf,
            transparent: true,
            opacity: 0.1,
            side: THREE.BackSide
        });
        
        this.nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
        this.scene.add(this.nebula);
    }
    
    createStars() {
        // Background stars
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        
        for (let i = 0; i < 2000; i++) {
            vertices.push(
                (Math.random() - 0.5) * 4000,
                (Math.random() - 0.5) * 4000,
                (Math.random() - 0.5) * 4000
            );
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        
        const material = new THREE.PointsMaterial({
            size: 1,
            color: 0xffffff,
            transparent: true,
            opacity: 0.6
        });
        
        this.stars = new THREE.Points(geometry, material);
        this.scene.add(this.stars);
    }
    
    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        this.galaxy.rotation.z += 0.0005;
        this.nebula.rotation.y += 0.0002;
        this.stars.rotation.x += 0.0001;
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GalaxyVisualization;
}