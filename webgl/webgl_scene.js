/**
 * WebGL Scene - Main Three.js Scene
 */

class WebGLScene {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.objects = [];
        
        this.init();
    }

    init() {
        // Scene
        this.scene = new THREE.Scene();
        
        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 50;
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0x00f0ff, 1, 100);
        pointLight.position.set(10, 10, 10);
        this.scene.add(pointLight);
        
        // Create objects
        this.createFloatingGeometry();
        
        // Handle resize
        window.addEventListener('resize', () => this.onResize());
        
        // Start animation
        this.animate();
    }

    createFloatingGeometry() {
        // Create various geometric shapes
        const geometries = [
            new THREE.TorusGeometry(5, 1, 16, 100),
            new THREE.IcosahedronGeometry(5, 0),
            new THREE.OctahedronGeometry(5, 0),
            new THREE.TetrahedronGeometry(5, 0),
            new THREE.BoxGeometry(6, 6, 6)
        ];
        
        const materials = [
            new THREE.MeshBasicMaterial({ 
                color: 0x00f0ff, 
                wireframe: true,
                transparent: true,
                opacity: 0.3
            }),
            new THREE.MeshBasicMaterial({ 
                color: 0x7b2cbf, 
                wireframe: true,
                transparent: true,
                opacity: 0.3
            }),
            new THREE.MeshBasicMaterial({ 
                color: 0xff006e, 
                wireframe: true,
                transparent: true,
                opacity: 0.3
            })
        ];
        
        // Add floating objects
        for (let i = 0; i < 15; i++) {
            const geometry = geometries[Math.floor(Math.random() * geometries.length)];
            const material = materials[Math.floor(Math.random() * materials.length)];
            
            const mesh = new THREE.Mesh(geometry, material);
            
            mesh.position.x = (Math.random() - 0.5) * 100;
            mesh.position.y = (Math.random() - 0.5) * 100;
            mesh.position.z = (Math.random() - 0.5) * 50;
            
            mesh.rotation.x = Math.random() * Math.PI;
            mesh.rotation.y = Math.random() * Math.PI;
            
            this.objects.push({
                mesh,
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.01,
                    y: (Math.random() - 0.5) * 0.01
                },
                floatSpeed: Math.random() * 0.5 + 0.1,
                floatOffset: Math.random() * Math.PI * 2
            });
            
            this.scene.add(mesh);
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        const time = Date.now() * 0.001;
        
        // Animate objects
        this.objects.forEach(obj => {
            obj.mesh.rotation.x += obj.rotationSpeed.x;
            obj.mesh.rotation.y += obj.rotationSpeed.y;
            
            // Floating motion
            obj.mesh.position.y += Math.sin(time * obj.floatSpeed + obj.floatOffset) * 0.02;
        });
        
        // Mouse parallax
        this.camera.position.x += (mouseX * 0.1 - this.camera.position.x) * 0.05;
        this.camera.position.y += (mouseY * 0.1 - this.camera.position.y) * 0.05;
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

// Mouse tracking
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.1;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.1;
});

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('webgl-bg');
    if (canvas && typeof THREE !== 'undefined') {
        new WebGLScene('webgl-bg');
    }
});

window.WebGLScene = WebGLScene;
