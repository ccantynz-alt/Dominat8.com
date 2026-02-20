"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial } from "@react-three/drei";
import type { Mesh } from "three";

function TorusInner({ mouse }: { mouse: { x: number; y: number } }) {
  const meshRef = useRef<Mesh>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    targetRotation.current.x = mouse.y * 0.4;
    targetRotation.current.y = mouse.x * 0.4;

    currentRotation.current.x +=
      (targetRotation.current.x - currentRotation.current.x) * 5 * delta;
    currentRotation.current.y +=
      (targetRotation.current.y - currentRotation.current.y) * 5 * delta;

    meshRef.current.rotation.x = currentRotation.current.x;
    meshRef.current.rotation.y = currentRotation.current.y;
    meshRef.current.rotation.z += 0.003;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <torusGeometry args={[1.2, 0.4, 32, 64]} />
      <MeshTransmissionMaterial
        backside
        samples={16}
        thickness={0.5}
        chromaticAberration={0.1}
        anisotropy={0.3}
        distortion={0.2}
        distortionScale={0.5}
        temporalDistortion={0.1}
        clearcoat={1}
        clearcoatRoughness={0.2}
        transmission={0.95}
        ior={1.5}
        color="#8B5CF6"
      />
    </mesh>
  );
}

function GridFloor() {
  return (
    <group position={[0, -3, -2]} rotation={[-Math.PI / 2.5, 0, 0]}>
      <mesh>
        <planeGeometry args={[20, 20, 20, 20]} />
        <meshBasicMaterial
          color="#8B5CF6"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  );
}

function StarField() {
  const stars = Array.from({ length: 100 }, () => ({
    x: (Math.random() - 0.5) * 20,
    y: (Math.random() - 0.5) * 20,
    z: (Math.random() - 0.5) * 10,
    size: Math.random() * 0.02 + 0.01,
  }));

  return (
    <group>
      {stars.map((star, i) => (
        <mesh key={i} position={[star.x, star.y, star.z]}>
          <sphereGeometry args={[star.size, 8, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export default function AuraTorus({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        className="pointer-events-none"
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
        <pointLight position={[-10, -10, 5]} intensity={0.5} color="#06B6D4" />
        <pointLight position={[0, 5, -5]} intensity={0.3} color="#8B5CF6" />
        <StarField />
        <GridFloor />
        <TorusInner mouse={mouse} />
      </Canvas>
    </div>
  );
}
