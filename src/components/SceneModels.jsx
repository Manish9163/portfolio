import React, { forwardRef } from 'react';
import { useFrame } from '@react-three/fiber';

export const PhilosophyModel = forwardRef((props, ref) => {
  useFrame((state, delta) => {
    if (ref && ref.current) {
      ref.current.rotation.x += delta * 0.2;
      ref.current.rotation.y += delta * 0.3;
    }
  });
  return (
    <group {...props} ref={ref}>
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[3, 0.8, 128, 32]} />
        <meshPhysicalMaterial color="#020202" roughness={0.1} metalness={0.9} clearcoat={1.0} clearcoatRoughness={0.1} />
      </mesh>
    </group>
  );
});

export const CraftModel = forwardRef((props, ref) => {
  // React Logo / Skill Base
  useFrame((state, delta) => {
    if (ref && ref.current) {
      ref.current.rotation.z -= delta * 0.5;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });
  const material = <meshPhysicalMaterial color="#3388ff" roughness={0.2} metalness={0.8} clearcoat={1} />;
  return (
    <group {...props} ref={ref}>
      <mesh castShadow receiveShadow rotation={[0, 0, 0]}>
        <torusGeometry args={[3, 0.2, 16, 100]} />
        {material}
      </mesh>
      <mesh castShadow receiveShadow rotation={[0, 0, Math.PI / 3]}>
        <torusGeometry args={[3, 0.2, 16, 100]} />
        {material}
      </mesh>
      <mesh castShadow receiveShadow rotation={[0, 0, -Math.PI / 3]}>
        <torusGeometry args={[3, 0.2, 16, 100]} />
        {material}
      </mesh>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#3388ff" emissive="#114488" emissiveIntensity={2} />
      </mesh>
    </group>
  );
});

export const InnovationModel = forwardRef((props, ref) => {
  // Neural Net / Polyhedron
  useFrame((state, delta) => {
    if (ref && ref.current) {
      ref.current.rotation.x += delta * 0.1;
      ref.current.rotation.y -= delta * 0.15;
    }
  });
  return (
    <group {...props} ref={ref}>
      <mesh castShadow receiveShadow>
        <icosahedronGeometry args={[3, 0]} />
        <meshPhysicalMaterial color="#050505" roughness={0.4} metalness={0.8} wireframe={true} wireframeLinewidth={2} />
      </mesh>
      {/* Glow inner */}
      <mesh>
        <icosahedronGeometry args={[2.8, 0]} />
        <meshStandardMaterial color="#3388ff" emissive="#1144aa" emissiveIntensity={1} toneMapped={false} />
      </mesh>
    </group>
  );
});

export const ProjectsModel = forwardRef((props, ref) => {
  // Stacked Server Blades or Cards
  useFrame((state, delta) => {
    if (ref && ref.current) {
      ref.current.rotation.y += delta * 0.2;
    }
  });
  return (
    <group {...props} ref={ref}>
      <group rotation={[Math.PI / 6, 0, Math.PI / 8]}>
        {[-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((y, i) => (
          <mesh key={i} position={[0, y, 0]} castShadow receiveShadow>
            <boxGeometry args={[4, 0.2, 4]} />
            <meshPhysicalMaterial color="#111" roughness={0.1} metalness={0.9} clearcoat={1.0} emissive={i % 2 === 0 ? "#002255" : "#000"} />
          </mesh>
        ))}
      </group>
    </group>
  );
});

export const ContactModel = forwardRef((props, ref) => {
  // Interlocking Rings
  useFrame((state, delta) => {
    if (ref && ref.current) {
      ref.current.rotation.x += delta * 0.3;
      ref.current.rotation.y -= delta * 0.2;
    }
  });
  return (
    <group {...props} ref={ref}>
      <mesh position={[-1, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[2, 0.4, 32, 64]} />
        <meshPhysicalMaterial color="#111" roughness={0.2} metalness={0.9} clearcoat={1.0} />
      </mesh>
      <mesh position={[1, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[2, 0.4, 32, 64]} />
        <meshPhysicalMaterial color="#3388ff" roughness={0.2} metalness={0.8} />
      </mesh>
    </group>
  );
});
export const AccoladesModel = forwardRef((props, ref) => {
  // Rotating Crystal / Award
  useFrame((state, delta) => {
    if (ref && ref.current) {
      ref.current.rotation.y += delta * 0.5;
      ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });
  return (
    <group {...props} ref={ref}>
      <mesh castShadow receiveShadow>
        <octahedronGeometry args={[2.5, 0]} />
        <meshPhysicalMaterial color="#3388ff" roughness={0} metalness={1} transmission={0.5} thickness={2} />
      </mesh>
      <mesh rotation={[0, Math.PI / 4, 0]}>
        <octahedronGeometry args={[3, 0]} />
        <meshPhysicalMaterial color="#ffffff" wireframe={true} opacity={0.1} transparent />
      </mesh>
    </group>
  );
});

export const EducationModel = forwardRef((props, ref) => {
  // Layered Geometric Pillars
  useFrame((state, delta) => {
    if (ref && ref.current) {
      ref.current.rotation.y -= delta * 0.2;
    }
  });
  return (
    <group {...props} ref={ref}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, (i - 1) * 2, 0]} rotation={[0, (i * Math.PI) / 3, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2 - i * 0.5, 2 - i * 0.5, 0.5, 6]} />
          <meshPhysicalMaterial color={i === 1 ? "#3388ff" : "#050505"} roughness={0.3} metalness={0.8} />
        </mesh>
      ))}
    </group>
  );
});
