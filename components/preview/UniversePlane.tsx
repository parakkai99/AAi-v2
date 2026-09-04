import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface UniversePlaneProps {
  activeColor?: string;
  isOrbiting?: boolean;
}

export const UniversePlane: React.FC<UniversePlaneProps> = ({
  activeColor = '#00e3fd',
  isOrbiting = true,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeColorRef = useRef(activeColor);
  const isOrbitingRef = useRef(isOrbiting);

  useEffect(() => {
    activeColorRef.current = activeColor;
  }, [activeColor]);

  useEffect(() => {
    isOrbitingRef.current = isOrbiting;
  }, [isOrbiting]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 11.5, 18);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x0f1c2e, 3.0);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00e3fd, 9, 35);
    pointLight.position.set(0, 2.5, 0);
    scene.add(pointLight);

    // Ellipse Orbit Lines in 3D (expanded height and width for spacious galaxy gap)
    // Primary Outer Ellipse
    const outerCurve = new THREE.EllipseCurve(0, 0, 14.2, 8.4, 0, 2 * Math.PI, false, 0);
    const outerPoints = outerCurve.getPoints(180);
    const outerGeo = new THREE.BufferGeometry().setFromPoints(
      outerPoints.map((p) => new THREE.Vector3(p.x, 0, p.y))
    );
    const outerMat = new THREE.LineBasicMaterial({
      color: 0x00e3fd,
      transparent: true,
      opacity: 0.35,
    });
    const outerLine = new THREE.Line(outerGeo, outerMat);
    scene.add(outerLine);

    // Secondary Inner Ellipse
    const innerCurve = new THREE.EllipseCurve(0, 0, 10.4, 5.8, 0, 2 * Math.PI, false, 0);
    const innerPoints = innerCurve.getPoints(140);
    const innerGeo = new THREE.BufferGeometry().setFromPoints(
      innerPoints.map((p) => new THREE.Vector3(p.x, 0, p.y))
    );
    const innerMat = new THREE.LineDashedMaterial({
      color: 0xbdf4ff,
      transparent: true,
      opacity: 0.25,
      dashSize: 0.35,
      gapSize: 0.2,
    });
    const innerLine = new THREE.Line(innerGeo, innerMat);
    innerLine.computeLineDistances();
    scene.add(innerLine);

    // 3D Spiral Galaxy Particle System (Galaxy Arms + Bulge + Halo Dust)
    const galaxyParticleCount = 700;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(galaxyParticleCount * 3);
    const colors = new Float32Array(galaxyParticleCount * 3);

    const colorCore = new THREE.Color(0x00e3fd);
    const colorMid = new THREE.Color(0x76b6ff);
    const colorOuter = new THREE.Color(0xddb7ff);

    // Generate two logarithmic spiral arms + core galactic disc
    for (let i = 0; i < galaxyParticleCount; i++) {
      const isBulge = i < 150;
      if (isBulge) {
        // Galactic Bulge Core
        const r = Math.random() * 2.8;
        const theta = Math.random() * Math.PI * 2;
        positions[i * 3] = Math.cos(theta) * r * 1.3;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 1.2 * (1 - r / 3);
        positions[i * 3 + 2] = Math.sin(theta) * r * 0.7;

        colors[i * 3] = colorCore.r;
        colors[i * 3 + 1] = colorCore.g;
        colors[i * 3 + 2] = colorCore.b;
      } else {
        // Spiral Arms
        const armIndex = i % 2; // 2 spiral arms
        const armOffset = armIndex * Math.PI;
        const distance = 3.0 + Math.random() * 11.5;
        const spinAngle = distance * 0.65;
        const angle = spinAngle + armOffset + (Math.random() - 0.5) * 0.45;

        // Elliptical galaxy projection (1.4x width, 0.78x depth)
        const spreadX = (Math.random() - 0.5) * (distance * 0.16);
        const spreadZ = (Math.random() - 0.5) * (distance * 0.14);

        positions[i * 3] = Math.cos(angle) * distance * 1.38 + spreadX;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 1.4 * Math.exp(-distance * 0.15);
        positions[i * 3 + 2] = Math.sin(angle) * distance * 0.78 + spreadZ;

        // Gradient color from cyan to violet
        const t = Math.min(1, distance / 14);
        const col = t < 0.5 ? colorCore.clone().lerp(colorMid, t * 2) : colorMid.clone().lerp(colorOuter, (t - 0.5) * 2);
        colors[i * 3] = col.r;
        colors[i * 3 + 1] = col.g;
        colors[i * 3 + 2] = col.b;
      }
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const galaxyParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(galaxyParticles);

    // Center Core Glowing Disc
    const coreDiscGeo = new THREE.RingGeometry(0.8, 1.6, 48);
    const coreDiscMat = new THREE.MeshBasicMaterial({
      color: 0x00e3fd,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
    });
    const coreDisc = new THREE.Mesh(coreDiscGeo, coreDiscMat);
    coreDisc.rotation.x = Math.PI / 2;
    scene.add(coreDisc);

    // Outer faint galaxy perimeter ring
    const haloRingGeo = new THREE.RingGeometry(13.8, 14.4, 64);
    const haloRingMat = new THREE.MeshBasicMaterial({
      color: 0x00e3fd,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide,
    });
    const haloRing = new THREE.Mesh(haloRingGeo, haloRingMat);
    haloRing.rotation.x = Math.PI / 2;
    scene.add(haloRing);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let galaxyRotation = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Galaxy rotation animation
      if (isOrbitingRef.current) {
        galaxyRotation += delta * 0.08;
      } else {
        galaxyRotation += delta * 0.015; // Slow ambient drift when paused
      }

      galaxyParticles.rotation.y = galaxyRotation;
      coreDisc.rotation.z = -galaxyRotation * 0.5;
      outerLine.rotation.y = Math.sin(elapsedTime * 0.1) * 0.015;

      // Pulse Core
      const pulseScale = 1 + Math.sin(elapsedTime * 2.0) * 0.05;
      coreDisc.scale.set(pulseScale, pulseScale, pulseScale);

      // Light color transition
      try {
        pointLight.color.set(activeColorRef.current);
      } catch (e) {
        // Safe fallback
      }

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      coreDiscGeo.dispose();
      coreDiscMat.dispose();
      haloRingGeo.dispose();
      haloRingMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

