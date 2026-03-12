// Vertex Shader for Neural Network Visualization
precision highp float;

uniform float uTime;
uniform float uPixelRatio;

attribute vec3 position;
attribute vec3 color;

varying vec3 vColor;
varying float vDistance;

void main() {
    vColor = color;
    
    vec3 pos = position;
    
    // Add wave effect
    float wave = sin(pos.x * 0.01 + uTime) * cos(pos.y * 0.01 + uTime * 0.5) * 20.0;
    pos.z += wave;
    
    // Calculate distance from center for varying effects
    vDistance = length(pos.xy) / 1000.0;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size based on distance
    gl_PointSize = (3.0 * uPixelRatio) * (1.0 - vDistance * 0.5);
}