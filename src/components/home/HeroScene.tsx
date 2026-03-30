"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Particles() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      const r = 2.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={200}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#6366f1"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const { pointer } = state;

    // Auto-rotate
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      pointer.x * 0.3 + state.clock.elapsedTime * 0.1,
      0.05
    );
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      -pointer.y * 0.3,
      0.05
    );

    // Suppress unused variable warning
    void delta;
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} color="#6366f1" intensity={1} />
      <pointLight position={[-10, -5, 10]} color="#a855f7" intensity={0.8} />

      {/* Main mesh group */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <group ref={meshRef}>
          {/* Wireframe icosahedron */}
          <mesh>
            <icosahedronGeometry args={[1.5, 1]} />
            <meshBasicMaterial
              color="#6366f1"
              wireframe
              transparent
              opacity={0.3}
            />
          </mesh>

          {/* Inner solid distort mesh */}
          <mesh>
            <icosahedronGeometry args={[1.2, 1]} />
            <MeshDistortMaterial
              color="#6366f1"
              distort={0.3}
              speed={2}
              transparent
              opacity={0.15}
            />
          </mesh>
        </group>
      </Float>

      {/* Floating particles */}
      <Particles />
    </>
  );
}

export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ alpha: true, antialias: true }}
    >
      <Scene />
    </Canvas>
  );
}
