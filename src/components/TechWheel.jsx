// src/components/TechWheel.jsx
import React from 'react';

export function TechWheel({ wheelRef, ...props }) {
  return (
    <group ref={wheelRef} {...props}>
      {/* Outer Carbon Rim */}
      <mesh receiveShadow castShadow>
        <torusGeometry args={[8, 0.6, 64, 128]} />
        <meshPhysicalMaterial color="#020202" roughness={0.2} metalness={0.9} clearcoat={1.0} clearcoatRoughness={0.1} />
      </mesh>

      {/* Inner Metallic Accent */}
      <mesh>
        <torusGeometry args={[7.4, 0.05, 16, 128]} />
        <meshPhysicalMaterial color="#1a1a1a" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Center Hub */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 2.5, 32]} />
        <meshPhysicalMaterial color="#050505" metalness={0.9} clearcoat={1} />
      </mesh>

      {/* Hub Cap Details */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 1.26]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 16]} />
        <meshPhysicalMaterial color="#333" metalness={1.0} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -1.26]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 16]} />
        <meshPhysicalMaterial color="#333" metalness={1.0} />
      </mesh>

      {/* Aerodynamic Carbon Spokes */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        // Alternate spoke placement slightly forward/backward to mimic true wheel lacing
        const offsetZ = i % 2 === 0 ? 0.3 : -0.3;

        return (
          <group key={i} rotation={[0, 0, angle]}>
            <mesh position={[0, 4.3, offsetZ]} rotation={[offsetZ > 0 ? 0.05 : -0.05, 0, 0]}>
              <boxGeometry args={[0.1, 8.6, 0.02]} /> {/* Flat aero spokes */}
              <meshPhysicalMaterial color="#111" metalness={0.7} roughness={0.3} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
