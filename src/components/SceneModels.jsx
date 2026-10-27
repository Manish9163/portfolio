import React, { forwardRef, useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Premium Material Configurations
const goldMaterialProps = {
  color: '#2c26d3ff',
  roughness: 0.5,
  metalness: 1,
  clearcoat: 0.9,
  clearcoatRoughness: 0.8,
};

const chromeMaterialProps = {
  color: '#7b7e85d3',
  roughness: 0.80,
  metalness: 0.90,
  clearcoat: 1.0,
  clearcoatRoughness: 0.02,
};

const copperMaterialProps = {
  color: '#e4dddbff',
  roughness: 0.2,
  metalness: 0.9,
  clearcoat: 0.8,
};

const gunmetalMaterialProps = {
  color: '#2a2b30',
  roughness: 0.25,
  metalness: 0.9,
  clearcoat: 0.5,
};

// ============================================================
// 01 / PHILOSOPHY MODEL — Open Book with Glowing Lightbulb
// ============================================================
export const PhilosophyModel = forwardRef((props, ref) => {
  const bulbRef = useRef();

  useFrame((state, delta) => {
    if (ref?.current) {
      ref.current.rotation.y += delta * 0.12;
    }
    if (bulbRef.current) {
      // Gentle float
      bulbRef.current.position.y = 2.8 + Math.sin(state.clock.elapsedTime * 1.2) * 0.3;
      bulbRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <group {...props} ref={ref}>
      {/* Book Spine */}
      <mesh castShadow position={[0, -0.5, 0]}>
        <boxGeometry args={[0.3, 3.6, 2.8]} />
        <meshPhysicalMaterial {...gunmetalMaterialProps} />
      </mesh>

      {/* Left Page — angled open */}
      <mesh castShadow receiveShadow position={[-1.6, -0.5, 0]} rotation={[0, 0, -0.25]}>
        <boxGeometry args={[3, 3.4, 2.6]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.4}
          chromaticAberration={0.05}
          color="#e0d5ff"
          anisotropy={0.1}
        />
      </mesh>

      {/* Right Page — angled open */}
      <mesh castShadow receiveShadow position={[1.6, -0.5, 0]} rotation={[0, 0, 0.25]}>
        <boxGeometry args={[3, 3.4, 2.6]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.4}
          chromaticAberration={0.05}
          color="#e0d5ff"
          anisotropy={0.1}
        />
      </mesh>

      {/* Text lines on left page */}
      {[-0.6, -0.2, 0.2, 0.6].map((z, i) => (
        <mesh key={`ltext-${i}`} position={[-1.8, -0.5 + i * 0.15, z]} rotation={[0, 0, -0.25]}>
          <boxGeometry args={[1.8 - i * 0.3, 0.04, 0.08]} />
          <meshBasicMaterial color="#7c3aed" transparent opacity={0.3} toneMapped={false} />
        </mesh>
      ))}

      {/* Floating Lightbulb above book */}
      <group ref={bulbRef} position={[0, 2.8, 0]}>
        {/* Bulb glass */}
        <mesh>
          <sphereGeometry args={[0.7, 32, 32]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            thickness={1.5}
            chromaticAberration={0.08}
            color="#fffae0"
            anisotropy={0.2}
          />
        </mesh>
        {/* Filament glow */}
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#ffd700" toneMapped={false} transparent opacity={0.8} />
        </mesh>
        {/* Bulb base screw */}
        <mesh position={[0, -0.85, 0]}>
          <cylinderGeometry args={[0.3, 0.25, 0.4, 16]} />
          <meshPhysicalMaterial {...copperMaterialProps} />
        </mesh>
      </group>
    </group>
  );
});

// ============================================================
// 02 / EDUCATION MODEL — Graduation Cap + Diploma Scroll
// ============================================================
export const EducationModel = forwardRef((props, ref) => {
  const tasselRef = useRef();

  useFrame((state, delta) => {
    if (ref?.current) {
      ref.current.rotation.y += delta * 0.15;
    }
    // Tassel sway
    if (tasselRef.current) {
      tasselRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <group {...props} ref={ref}>
      {/* Mortarboard top — flat square */}
      <mesh castShadow receiveShadow position={[0, 1.2, 0]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[4, 0.15, 4]} />
        <meshPhysicalMaterial {...gunmetalMaterialProps} />
      </mesh>

      {/* Cap dome */}
      <mesh castShadow position={[0, 0.5, 0]}>
        <sphereGeometry args={[1.6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial {...gunmetalMaterialProps} />
      </mesh>

      {/* Button on top center */}
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.15, 16]} />
        <meshPhysicalMaterial {...goldMaterialProps} />
      </mesh>

      {/* Tassel cord */}
      <group ref={tasselRef} position={[0, 1.35, 0]}>
        <mesh position={[1.2, -0.5, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 1.5, 8]} />
          <meshPhysicalMaterial {...goldMaterialProps} />
        </mesh>
        {/* Tassel end */}
        <mesh position={[1.2, -1.4, 0]}>
          <cylinderGeometry args={[0.15, 0.05, 0.4, 8]} />
          <meshPhysicalMaterial {...goldMaterialProps} />
        </mesh>
      </group>

      {/* Diploma Scroll — beside the cap */}
      <group position={[2.5, -1.2, 0.5]} rotation={[0, 0, 0.3]}>
        {/* Scroll body */}
        <mesh castShadow>
          <cylinderGeometry args={[0.4, 0.4, 2.8, 32]} />
          <MeshTransmissionMaterial
            backside
            samples={8}
            thickness={0.6}
            chromaticAberration={0.04}
            color="#fff8e1"
          />
        </mesh>
        {/* Scroll end caps */}
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.12, 16]} />
          <meshPhysicalMaterial {...copperMaterialProps} />
        </mesh>
        <mesh position={[0, -1.5, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.12, 16]} />
          <meshPhysicalMaterial {...copperMaterialProps} />
        </mesh>
        {/* Ribbon */}
        <mesh position={[0.45, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.5, 0.04, 8, 32, Math.PI]} />
          <meshPhysicalMaterial {...goldMaterialProps} />
        </mesh>
      </group>
    </group>
  );
});

// ============================================================
// 03 / CRAFT MODEL — Interlocking Gears
// ============================================================
export const CraftModel = forwardRef((props, ref) => {
  const gear1 = useRef();
  const gear2 = useRef();
  const gear3 = useRef();

  useFrame((state, delta) => {
    if (ref?.current) {
      ref.current.rotation.y += delta * 0.05;
    }
    if (gear1.current) gear1.current.rotation.z += delta * 0.3;
    if (gear2.current) gear2.current.rotation.z -= delta * 0.42; // Opposite direction, ratio adjusted
    if (gear3.current) gear3.current.rotation.z += delta * 0.25;
  });

  // Create a gear-like shape using a torus + box teeth
  const GearShape = ({ gearRef, radius, teeth, color, materialProps, thickness }) => {
    const toothGeo = useMemo(() => new THREE.BoxGeometry(0.25, 0.4, thickness || 0.5), [thickness]);
    return (
      <group ref={gearRef}>
        {/* Gear ring */}
        <mesh castShadow receiveShadow>
          <torusGeometry args={[radius, 0.2, 16, 64]} />
          <meshPhysicalMaterial {...materialProps} />
        </mesh>
        {/* Teeth */}
        {Array.from({ length: teeth }).map((_, i) => {
          const angle = (i / teeth) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * (radius + 0.25),
                Math.sin(angle) * (radius + 0.25),
                0
              ]}
              rotation={[0, 0, angle]}
              castShadow
            >
              <boxGeometry args={[0.25, 0.4, thickness || 0.5]} />
              <meshPhysicalMaterial {...materialProps} />
            </mesh>
          );
        })}
        {/* Hub */}
        <mesh>
          <cylinderGeometry args={[radius * 0.3, radius * 0.3, thickness || 0.5, 16]} />
          <meshPhysicalMaterial {...materialProps} />
        </mesh>
      </group>
    );
  };

  return (
    <group {...props} ref={ref}>
      {/* Main Large Gear — chrome */}
      <group position={[0, 0, 0]}>
        <GearShape gearRef={gear1} radius={2.2} teeth={16} materialProps={chromeMaterialProps} thickness={0.6} />
      </group>

      {/* Medium Gear — gold — meshed with large */}
      <group position={[3.2, 1.8, 0.3]}>
        <GearShape gearRef={gear2} radius={1.5} teeth={11} materialProps={goldMaterialProps} thickness={0.5} />
      </group>

      {/* Small Gear — copper */}
      <group position={[-2.5, -2.2, -0.2]}>
        <GearShape gearRef={gear3} radius={1.0} teeth={8} materialProps={copperMaterialProps} thickness={0.4} />
      </group>

      {/* Wrench silhouette — floating */}
      <group position={[-3, 2, 1]} rotation={[0.3, 0.5, -0.8]}>
        {/* Handle */}
        <mesh castShadow>
          <boxGeometry args={[0.3, 3, 0.15]} />
          <meshPhysicalMaterial {...gunmetalMaterialProps} />
        </mesh>
        {/* Jaw */}
        <mesh position={[0.3, 1.5, 0]} castShadow>
          <boxGeometry args={[0.9, 0.6, 0.15]} />
          <meshPhysicalMaterial {...gunmetalMaterialProps} />
        </mesh>
        <mesh position={[0.3, 1.9, 0]} castShadow>
          <boxGeometry args={[0.9, 0.2, 0.15]} />
          <meshPhysicalMaterial {...gunmetalMaterialProps} />
        </mesh>
      </group>
    </group>
  );
});

// ============================================================
// 04 / INNOVATION MODEL — Brain with Circuit Traces
// ============================================================
export const InnovationModel = forwardRef((props, ref) => {
  const circuitRef = useRef();
  const pulseRefs = useRef([]);

  useFrame((state, delta) => {
    if (ref?.current) {
      ref.current.rotation.y += delta * 0.1;
    }
    if (circuitRef.current) {
      circuitRef.current.rotation.y -= delta * 0.15;
    }
    // Pulse nodes
    pulseRefs.current.forEach((p, i) => {
      if (p) {
        const t = state.clock.elapsedTime;
        const scale = 0.8 + Math.sin(t * 3 + i * 1.5) * 0.4;
        p.scale.setScalar(scale);
      }
    });
  });

  // Circuit trace positions around the brain
  const circuitPaths = useMemo(() => [
    { start: [2.5, 0, 0], end: [3.8, 1.2, 0.5] },
    { start: [-2.5, 0, 0], end: [-3.5, -1, -0.5] },
    { start: [0, 2.5, 0], end: [1.2, 3.8, 0.8] },
    { start: [0, -2.5, 0], end: [-1, -3.8, -0.3] },
    { start: [1.8, 1.8, 0], end: [3, 3, 0.5] },
    { start: [-1.8, -1.8, 0], end: [-3, -3, -0.5] },
  ], []);

  return (
    <group {...props} ref={ref}>
      {/* Brain — glass sphere with inner glow */}
      <mesh castShadow>
        <sphereGeometry args={[2.2, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={2.0}
          chromaticAberration={0.1}
          anisotropy={0.3}
          distortion={0.15}
          distortionScale={0.3}
          color="#d4f8ffff"
        />
      </mesh>

      {/* Brain folds — bumpy inner sphere */}
      <mesh>
        <sphereGeometry args={[1.8, 16, 16]} />
        <meshPhysicalMaterial
          color="#7c3aed"
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>

      {/* Inner glow core */}
      <mesh>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial color="#7c3aed" toneMapped={false} transparent opacity={0.5} />
      </mesh>

      {/* Circuit traces */}
      <group ref={circuitRef}>
        {circuitPaths.map((path, i) => {
          const [sx, sy, sz] = path.start;
          const [ex, ey, ez] = path.end;
          const mx = (sx + ex) / 2;
          const my = (sy + ey) / 2;
          const mz = (sz + ez) / 2;
          const len = Math.sqrt((ex - sx) ** 2 + (ey - sy) ** 2 + (ez - sz) ** 2);
          const dir = new THREE.Vector3(ex - sx, ey - sy, ez - sz).normalize();
          const quat = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0), dir
          );
          const euler = new THREE.Euler().setFromQuaternion(quat);

          return (
            <group key={i}>
              {/* Trace line */}
              <mesh position={[mx, my, mz]} rotation={euler}>
                <boxGeometry args={[0.06, len, 0.06]} />
                <meshPhysicalMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.6} roughness={0.3} metalness={0.8} />
              </mesh>
              {/* Node at end */}
              <mesh
                ref={(el) => (pulseRefs.current[i] = el)}
                position={[ex, ey, ez]}
              >
                <sphereGeometry args={[0.12, 8, 8]} />
                <meshBasicMaterial color="#06b6d4" toneMapped={false} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
});

// ============================================================
// 05 / PROJECTS MODEL — Stacked Browser Windows
// ============================================================
export const ProjectsModel = forwardRef((props, ref) => {
  useFrame((state, delta) => {
    if (ref?.current) {
      ref.current.rotation.y += delta * 0.12;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
  });

  const windowColors = ['#7c3aed', '#06b6d4', '#f43f5e'];

  return (
    <group {...props} ref={ref}>
      <group rotation={[Math.PI / 8, 0, Math.PI / 12]}>
        {[-1.8, 0, 1.8].map((y, i) => (
          <group key={i} position={[i * 0.3 - 0.3, y, i * -0.5]}>
            {/* Browser window body — glass */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[5, 3.2, 0.1]} />
              <MeshTransmissionMaterial
                backside
                samples={8}
                thickness={0.3}
                chromaticAberration={0.04}
                anisotropy={0.1}
                color={i === 0 ? '#0c1445' : '#111122'}
              />
            </mesh>

            {/* Title bar — chrome */}
            <mesh position={[0, 1.75, 0.06]} castShadow>
              <boxGeometry args={[5, 0.35, 0.08]} />
              <meshPhysicalMaterial {...chromeMaterialProps} />
            </mesh>

            {/* Window dot buttons */}
            {[[-2.1, 1.75, 0.12], [-1.85, 1.75, 0.12], [-1.6, 1.75, 0.12]].map(([x, yy, z], j) => (
              <mesh key={j} position={[x, yy, z]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshBasicMaterial
                  color={j === 0 ? '#ff5f56' : j === 1 ? '#ffbd2e' : '#27c93f'}
                  toneMapped={false}
                />
              </mesh>
            ))}

            {/* Content placeholder lines */}
            {[0.8, 0.3, -0.2, -0.7].map((ly, li) => (
              <mesh key={li} position={[-0.3, ly, 0.06]}>
                <boxGeometry args={[3.2 - li * 0.5, 0.08, 0.01]} />
                <meshBasicMaterial
                  color={windowColors[i]}
                  transparent
                  opacity={0.25 - li * 0.04}
                  toneMapped={false}
                />
              </mesh>
            ))}

            {/* Frame accent */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[5.1, 3.3, 0.08]} />
              <meshPhysicalMaterial {...copperMaterialProps} wireframe />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
});

// ============================================================
// 06 / ACCOLADES MODEL — Trophy with Glass Star
// ============================================================
export const AccoladesModel = forwardRef((props, ref) => {
  const starRef = useRef();

  useFrame((state, delta) => {
    if (ref?.current) {
      ref.current.rotation.y += delta * 0.2;
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
    }
    if (starRef.current) {
      starRef.current.rotation.y += delta * 0.5;
      starRef.current.position.y = 4 + Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
    }
  });

  return (
    <group {...props} ref={ref}>
      {/* Trophy Cup Body — tapered cylinder */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 0.8, 2.5, 32]} />
        <meshPhysicalMaterial {...goldMaterialProps} />
      </mesh>

      {/* Cup interior — glass */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[1.3, 0.6, 2, 32, 1, true]} />
        <MeshTransmissionMaterial
          backside
          samples={8}
          thickness={0.8}
          chromaticAberration={0.06}
          color="#a29b9b"
        />
      </mesh>

      {/* Cup lip ring */}
      <mesh position={[0, 1.25, 0]}>
        <torusGeometry args={[1.5, 0.1, 16, 32]} />
        <meshPhysicalMaterial {...goldMaterialProps} />
      </mesh>

      {/* Handles */}
      {[1, -1].map((side) => (
        <mesh key={side} position={[side * 1.8, 0.3, 0]} rotation={[0, 0, side * -0.3]}>
          <torusGeometry args={[0.5, 0.08, 8, 32, Math.PI]} />
          <meshPhysicalMaterial {...goldMaterialProps} />
        </mesh>
      ))}

      {/* Stem */}
      <mesh position={[0, -1.8, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.15, 1, 16]} />
        <meshPhysicalMaterial {...chromeMaterialProps} />
      </mesh>

      {/* Base */}
      <mesh position={[0, -2.5, 0]} castShadow>
        <cylinderGeometry args={[1.2, 1.4, 0.4, 32]} />
        <meshPhysicalMaterial {...gunmetalMaterialProps} />
      </mesh>
      <mesh position={[0, -2.2, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.15, 16]} />
        <meshPhysicalMaterial {...goldMaterialProps} />
      </mesh>

      {/* Floating Glass Star above trophy */}
      <group ref={starRef} position={[0, 4, 0]}>
        <mesh>
          <octahedronGeometry args={[0.8, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={16}
            thickness={1.5}
            chromaticAberration={0.1}
            color="#ffd700"
          />
        </mesh>
        {/* Inner glow */}
        <mesh>
          <octahedronGeometry args={[0.4, 0]} />
          <meshBasicMaterial color="#ffd700" toneMapped={false} transparent opacity={0.6} />
        </mesh>
      </group>
    </group>
  );
});

// ============================================================
// 07 / CONTACT MODEL — Open Envelope with Emerging Letter
// ============================================================
export const ContactModel = forwardRef((props, ref) => {
  const letterRef = useRef();
  const flapRef = useRef();

  useFrame((state, delta) => {
    if (ref?.current) {
      ref.current.rotation.y += delta * 0.12;
    }
    if (letterRef.current) {
      // Letter floats up and down
      letterRef.current.position.y = 1.5 + Math.sin(state.clock.elapsedTime * 1.2) * 0.4;
    }
    if (flapRef.current) {
      // Flap gently opens/closes
      flapRef.current.rotation.x = -0.8 + Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
    }
  });

  return (
    <group {...props} ref={ref}>
      {/* Envelope Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[5, 2.8, 0.15]} />
        <meshPhysicalMaterial {...chromeMaterialProps} />
      </mesh>

      {/* Envelope opening / top edge accent */}
      <mesh position={[0, 1.4, 0.08]}>
        <boxGeometry args={[5, 0.08, 0.05]} />
        <meshPhysicalMaterial {...copperMaterialProps} />
      </mesh>

      {/* Envelope Flap — triangular (angled box) */}
      <group ref={flapRef} position={[0, 1.4, 0]}>
        <mesh rotation={[-0.8, 0, 0]} position={[0, 0.9, -0.6]} castShadow>
          <boxGeometry args={[4.8, 2.2, 0.08]} />
          <meshPhysicalMaterial
            color="#3a3a50"
            roughness={0.3}
            metalness={0.85}
            clearcoat={0.5}
          />
        </mesh>
        {/* Flap fold accent */}
        <mesh rotation={[-0.8, 0, 0]} position={[0, 0.9, -0.56]}>
          <boxGeometry args={[4.9, 2.25, 0.02]} />
          <meshPhysicalMaterial {...goldMaterialProps} wireframe />
        </mesh>
      </group>

      {/* Letter emerging from envelope */}
      <group ref={letterRef} position={[0, 1.5, 0.1]}>
        <mesh castShadow>
          <boxGeometry args={[3.8, 2.8, 0.06]} />
          <MeshTransmissionMaterial
            backside
            samples={8}
            thickness={0.3}
            chromaticAberration={0.04}
            color="#ffffff"
          />
        </mesh>

        {/* Text lines on letter */}
        {[-0.6, -0.2, 0.2, 0.6].map((y, i) => (
          <mesh key={i} position={[0, y, 0.04]}>
            <boxGeometry args={[2.4 - Math.abs(i) * 0.4, 0.06, 0.01]} />
            <meshBasicMaterial color="#7c3aed" transparent opacity={0.3} toneMapped={false} />
          </mesh>
        ))}

        {/* @ symbol accent — small torus */}
        <mesh position={[0, -0.9, 0.05]}>
          <torusGeometry args={[0.2, 0.04, 8, 32]} />
          <meshPhysicalMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} roughness={0.3} metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
});
