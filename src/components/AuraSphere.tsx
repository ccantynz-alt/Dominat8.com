"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";

function AuraSphereInner({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<Mesh>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    targetRotation.current.x = mouse.y * 0.3;
    targetRotation.current.y = mouse.x * 0.3;

    currentRotation.current.x +=
      (targetRotation.current.x - currentRotation.current.x) * 5 * delta;
    currentRotation.current.y +=
      (targetRotation.current.y - currentRotation.current.y) * 5 * delta;

    meshRef.current.rotation.x = currentRotation.current.x;
    meshRef.current.rotation.y = currentRotation.current.y;
    meshRef.current.rotation.z += 0.002;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <MeshDistortMaterial
        color="#7c3aed"
        distort={0.15}
        speed={0.8}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.85}
        clearcoat={1}
        clearcoatRoughness={0.2}
        emissive="#4f46e5"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

function AuraSphere({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        className="pointer-events-none"
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#a78bfa" />
        <pointLight position={[-10, -10, 5]} intensity={0.5} color="#6366f1" />
        <pointLight position={[0, 5, -5]} intensity={0.3} color="#8b5cf6" />
        <AuraSphereInner mouse={mouse} />
      </Canvas>
    </div>
  );
}

export default AuraSphere;
