// Fragment Shader for Neural Network Visualization
precision highp float;

varying vec3 vColor;
varying float vDistance;

uniform float uTime;

void main() {
    // Create circular particle
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center);
    
    if (dist > 0.5) {
        discard;
    }
    
    // Soft edge
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    
    // Pulsing effect
    float pulse = sin(uTime * 2.0 + vDistance * 10.0) * 0.2 + 0.8;
    
    // Final color with glow
    vec3 finalColor = vColor * pulse;
    
    gl_FragColor = vec4(finalColor, alpha * 0.8);
}