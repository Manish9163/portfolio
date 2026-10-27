// src/components/TechWheel.jsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';

export function TechWheel({ wheelRef, ...props }) {
  const bracketL = useRef();
  const bracketR = useRef();
  const cursor = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Floating brackets orbit
    if (bracketL.current) {
      bracketL.current.position.x = Math.sin(t * 0.6) * 5 - 6;
      bracketL.current.position.y = Math.cos(t * 0.4) * 2;
      bracketL.current.rotation.z = Math.sin(t * 0.3) * 0.3;
    }
    if (bracketR.current) {
      bracketR.current.position.x = Math.sin(t * 0.6 + Math.PI) * 5 + 6;
      bracketR.current.position.y = Math.cos(t * 0.4 + Math.PI) * 2;
      bracketR.current.rotation.z = Math.sin(t * 0.3 + Math.PI) * 0.3;
    }
    // Blinking cursor
    if (cursor.current) {
      cursor.current.visible = Math.sin(t * 4) > 0;
    }
  });

  return (
    <group ref={wheelRef} {...props}>
      {/* Monitor Body — rounded box */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[10, 6.5, 0.5]} />
        <meshPhysicalMaterial color="#0a0a14" roughness={0.3} metalness={0.9} clearcoat={1.0} clearcoatRoughness={0.05} />
      </mesh>

      {/* Screen — glass with transmission */}
      <mesh position={[0, 0.2, 0.28]}>
        <boxGeometry args={[9, 5.5, 0.05]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.3}
          chromaticAberration={0.04}
          color="#0c1445"
          anisotropy={0.1}
        />
      </mesh>

      {/* Screen bezel glow */}
      <mesh position={[0, 0.2, 0.31]}>
        <boxGeometry args={[9.2, 5.7, 0.01]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.08} toneMapped={false} />
      </mesh>

      {/* Code lines on screen */}
      {[1.5, 0.7, -0.1, -0.9, -1.7].map((y, i) => (
        <mesh key={i} position={[-1.5 + i * 0.4, y, 0.33]}>
          <boxGeometry args={[2.5 + (i % 3) * 1.2, 0.12, 0.01]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#7c3aed' : '#06b6d4'}
            transparent
            opacity={0.5 - i * 0.06}
            toneMapped={false}
          />
        </mesh>
      ))}

      {/* Blinking cursor */}
      <mesh ref={cursor} position={[1.8, -1.7, 0.33]}>
        <boxGeometry args={[0.1, 0.5, 0.01]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>

      {/* Monitor Stand — neck */}
      <mesh position={[0, -4, 0]} castShadow>
        <boxGeometry args={[0.6, 1.8, 0.4]} />
        <meshPhysicalMaterial color="#0a0a14" roughness={0.3} metalness={0.9} clearcoat={0.5} />
      </mesh>

      {/* Monitor Stand — base */}
      <mesh position={[0, -5, 0]} castShadow>
        <boxGeometry args={[4, 0.25, 2]} />
        <meshPhysicalMaterial color="#111" roughness={0.2} metalness={0.95} clearcoat={1.0} />
      </mesh>

      {/* Floating Left Bracket < */}
      <group ref={bracketL}>
        <mesh position={[0, 0.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.15, 1.6, 0.15]} />
          <meshPhysicalMaterial color="#7c3aed" roughness={0.2} metalness={0.9} emissive="#7c3aed" emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[0, -0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.15, 1.6, 0.15]} />
          <meshPhysicalMaterial color="#7c3aed" roughness={0.2} metalness={0.9} emissive="#7c3aed" emissiveIntensity={0.4} />
        </mesh>
      </group>

      {/* Floating Right Bracket > */}
      <group ref={bracketR}>
        <mesh position={[0, 0.3, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.15, 1.6, 0.15]} />
          <meshPhysicalMaterial color="#06b6d4" roughness={0.2} metalness={0.9} emissive="#06b6d4" emissiveIntensity={0.4} />
        </mesh>
        <mesh position={[0, -0.3, 0]} rotation={[0, 0, -Math.PI / 4]}>
          <boxGeometry args={[0.15, 1.6, 0.15]} />
          <meshPhysicalMaterial color="#06b6d4" roughness={0.2} metalness={0.9} emissive="#06b6d4" emissiveIntensity={0.4} />
        </mesh>
      </group>
    </group>
  );
}
