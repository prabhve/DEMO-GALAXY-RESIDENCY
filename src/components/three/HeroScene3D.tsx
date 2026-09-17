import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroScene3DProps {
  particleIntensity?: 'low' | 'medium' | 'high' | 'off';
  reducedMotion?: boolean;
}

export const HeroScene3D: React.FC<HeroScene3DProps> = ({ 
  particleIntensity = 'low', 
  reducedMotion = false 
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current || particleIntensity === 'off') return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 25;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch {
      // WebGL fallback: fail gracefully without crashing
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Particle Count based on intensity
    let particleCount = 45;
    if (particleIntensity === 'medium') particleCount = 80;
    if (particleIntensity === 'high') particleCount = 130;
    if (reducedMotion) particleCount = 20;

    // Ambient floating particles
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      scales[i] = Math.random() * 0.8 + 0.3;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle Material
    const material = new THREE.PointsMaterial({
      color: 0xc8a97e, // champagne gold
      size: 0.25,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle 3D architectural wireframe grid representing structural modern design
    const gridGeometry = new THREE.IcosahedronGeometry(12, 1);
    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x3a4253,
      wireframe: true,
      transparent: true,
      opacity: 0.12
    });
    const architecturalMesh = new THREE.Mesh(gridGeometry, gridMaterial);
    scene.add(architecturalMesh);

    // Mouse tracking with lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / width - 0.5;
      const y = (event.clientY - rect.top) / height - 0.5;
      targetX = x * 3;
      targetY = -y * 3;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera mouse parallax
      if (!reducedMotion) {
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;

        camera.position.x = mouseX;
        camera.position.y = mouseY;
        camera.lookAt(scene.position);

        architecturalMesh.rotation.y = elapsedTime * 0.04;
        architecturalMesh.rotation.x = elapsedTime * 0.02;

        particles.rotation.y = elapsedTime * 0.02;
        particles.rotation.x = elapsedTime * 0.01;
      }

      renderer.render(scene, camera);
    };

    animate();

    const onResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);

      geometry.dispose();
      material.dispose();
      gridGeometry.dispose();
      gridMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [particleIntensity, reducedMotion]);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden" 
      aria-hidden="true" 
    />
  );
};
