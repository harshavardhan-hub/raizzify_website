'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useInView } from 'framer-motion';

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;

varying vec2 vUv;
varying float vElevation;

// classic 3d perlin noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) { 
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i); 
  vec4 p = permute( permute( permute( 
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );

  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );

  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  vUv = uv;
  vec3 pos = position;
  
  // Base noise running continuously for organic breathing
  float noise = snoise(vec3(pos.x * 1.5, pos.y * 1.5, uTime * 0.15)) * 0.3;
  
  // Mouse ripple effect
  float dist = distance(vUv, uMouse);
  float mouseEffect = smoothstep(0.4, 0.0, dist) * 0.6; // ripple near mouse
  
  pos.z += noise;
  pos.z += mouseEffect;
  
  // Scroll warping effect - pull mesh upwards
  pos.y += uScroll * 0.002 * (pos.x + 0.5); 
  pos.z -= uScroll * 0.001;

  vElevation = pos.z;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const fragmentShader = `
uniform vec3 uColorBase;
uniform vec3 uColorAccent;
uniform vec2 uMouse;

varying vec2 vUv;
varying float vElevation;

void main() {
  // Base color is white/surface
  vec3 color = uColorBase;
  
  // Mix in accent color based on elevation and mouse proximity
  float dist = distance(vUv, uMouse);
  float mouseGlow = smoothstep(0.35, 0.0, dist) * 0.8;
  
  float mixStrength = (vElevation * 0.4) + mouseGlow;
  color = mix(uColorBase, uColorAccent, mixStrength);
  
  gl_FragColor = vec4(color, 1.0);
}
`;

export default function WebGLBackground() {
  const mountRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(mountRef);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check for mobile gracefully
    const checkMobile = () => window.innerWidth < 768;
    setIsMobile(checkMobile());
    
    if (checkMobile() || !mountRef.current) return;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    // Use an orthographic-like setup by moving camera back
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 1.2;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // PLANE GEOMETRY (density dictates the mesh smoothness)
    const geometry = new THREE.PlaneGeometry(5, 5, 128, 128);
    
    // MATERIAL
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uScroll: { value: 0 },
        uColorBase: { value: new THREE.Color('#FFFFFF') },
        uColorAccent: { value: new THREE.Color('#E3EBFF') } // Very subtle blue, perfectly premium
      }
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // INTERACTIVITY
    let targetMouse = new THREE.Vector2(0.5, 0.5);
    
    const onMouseMove = (event: MouseEvent) => {
        // Normalized coordinates (0 to 1) for shader
        targetMouse.x = event.clientX / window.innerWidth;
        targetMouse.y = 1.0 - (event.clientY / window.innerHeight);
    };
    
    const onScroll = () => {
        material.uniforms.uScroll.value = window.scrollY;
    };
    
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // ANIMATION LOOP
    const clock = new THREE.Clock();
    let frameId: number;

    const tick = () => {
        if (isInView) {
            // Smooth mouse interpolation for liquid feel
            material.uniforms.uMouse.value.lerp(targetMouse, 0.05);
            material.uniforms.uTime.value = clock.getElapsedTime();
            
            renderer.render(scene, camera);
        }
        frameId = requestAnimationFrame(tick);
    };

    tick();

    // RESIZE HANDLER
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // If device rotated to mobile size, it might cause issues but we won't hot-swap
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(frameId);
        if (mountRef.current && renderer.domElement === mountRef.current.firstChild) {
            mountRef.current.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        renderer.dispose();
    };
  }, [isInView]);

  if (isMobile) {
    return (
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-80" 
        style={{
          background: 'radial-gradient(circle at 50% 50%, #ffffff 0%, #E3EBFF 100%)',
          animation: 'pulse 10s infinite alternate'
        }}
      />
    );
  }

  return <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-none" />;
}
