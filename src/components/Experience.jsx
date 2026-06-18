import React, { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { TechWheel } from './TechWheel';
import { PhilosophyModel, EducationModel, CraftModel, InnovationModel, ProjectsModel, AccoladesModel, ContactModel } from './SceneModels';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

export function Experience() {
  const { camera } = useThree();
  const wheelRef = useRef();
  const philosophyRef = useRef();
  const educationRef = useRef();
  const craftRef = useRef();
  const innovationRef = useRef();
  const projectsRef = useRef();
  const accoladesRef = useRef();
  const contactRef = useRef();
  const container = useRef();

  useGSAP(() => {
    // Initial Camera
    camera.position.set(0, 0, 25);
    camera.lookAt(0, 0, 0);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-area',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, 
      }
    });

    // Make sure wheel is initialized at bottom of screen for Hero Section
    gsap.set(wheelRef.current.position, { y: -10, z: -5, x: 0 });
    gsap.set(wheelRef.current.rotation, { x: -0.1, y: 0.1 });

    const subsequentModels = [
        philosophyRef.current, 
        educationRef.current, 
        craftRef.current, 
        innovationRef.current, 
        projectsRef.current, 
        accoladesRef.current,
        contactRef.current
    ];
    
    // Hide all other models initially
    subsequentModels.forEach(m => {
        gsap.set(m.position, { y: -30 });
        gsap.set(m.scale, { x: 0, y: 0, z: 0 });
    });

    // Hero -> 01 PHILOSOPHY
    tl.to(wheelRef.current.position, { y: 20, z: -20, ease: 'none' }, 's1')
      .to(wheelRef.current.scale, { x: 0, y: 0, z: 0, ease: 'none' }, 's1')
      .to(philosophyRef.current.position, { x: 10, y: -4, z: -10, ease: 'none' }, 's1')
      .to(philosophyRef.current.scale, { x: 1, y: 1, z: 1, ease: 'none' }, 's1');

    // 01 PHILOSOPHY -> 02 EDUCATION
    tl.to(philosophyRef.current.position, { y: 20, x: -10, ease: 'none' }, 's2')
      .to(philosophyRef.current.scale, { x: 0, y: 0, z: 0, ease: 'none' }, 's2')
      .to(educationRef.current.position, { x: -10, y: -2, z: -5, ease: 'none' }, 's2')
      .to(educationRef.current.scale, { x: 1, y: 1, z: 1, ease: 'none' }, 's2');

    // 02 EDUCATION -> 03 CRAFT
    tl.to(educationRef.current.position, { y: 20, x: 8, ease: 'none' }, 's3')
      .to(educationRef.current.scale, { x: 0, y: 0, z: 0, ease: 'none' }, 's3')
      .to(craftRef.current.position, { x: 8, y: 0, z: 0, ease: 'none' }, 's3')
      .to(craftRef.current.scale, { x: 1, y: 1, z: 1, ease: 'none' }, 's3');

    // 03 CRAFT -> 04 INNOVATION
    tl.to(craftRef.current.position, { y: 20, x: -10, ease: 'none' }, 's4')
      .to(craftRef.current.scale, { x: 0, y: 0, z: 0, ease: 'none' }, 's4')
      .to(innovationRef.current.position, { x: -10, y: 3, z: -5, ease: 'none' }, 's4')
      .to(innovationRef.current.scale, { x: 1, y: 1, z: 1, ease: 'none' }, 's4');

    // 04 INNOVATION -> 05 PROJECTS
    tl.to(innovationRef.current.position, { y: 20, x: 10, ease: 'none' }, 's5')
      .to(innovationRef.current.scale, { x: 0, y: 0, z: 0, ease: 'none' }, 's5')
      .to(projectsRef.current.position, { x: 10, y: -3, z: -10, ease: 'none' }, 's5')
      .to(projectsRef.current.scale, { x: 1, y: 1, z: 1, ease: 'none' }, 's5');

    // 05 PROJECTS -> 06 ACCOLADES
    tl.to(projectsRef.current.position, { y: 20, x: -8, ease: 'none' }, 's6')
      .to(projectsRef.current.scale, { x: 0, y: 0, z: 0, ease: 'none' }, 's6')
      .to(accoladesRef.current.position, { x: -8, y: 1, z: 2, ease: 'none' }, 's6')
      .to(accoladesRef.current.scale, { x: 1, y: 1, z: 1, ease: 'none' }, 's6');

    // 06 ACCOLADES -> 07 CONTACT
    tl.to(accoladesRef.current.position, { y: 20, x: 0, ease: 'none' }, 's7')
      .to(accoladesRef.current.scale, { x: 0, y: 0, z: 0, ease: 'none' }, 's7')
      .to(contactRef.current.position, { x: 0, y: 0, z: 8, ease: 'none' }, 's7')
      .to(contactRef.current.scale, { x: 1, y: 1, z: 1, ease: 'none' }, 's7');

  }, { dependencies: [camera] });

  // Constant slow rotation for TechWheel (others self-rotate in SceneModels)
  useFrame((state, delta) => {
      if(wheelRef.current) {
          wheelRef.current.rotation.z += delta * 0.15;
      }
  });

  return (
    <group ref={container}>
      <TechWheel wheelRef={wheelRef} />
      <PhilosophyModel ref={philosophyRef} />
      <EducationModel ref={educationRef} />
      <CraftModel ref={craftRef} />
      <InnovationModel ref={innovationRef} />
      <ProjectsModel ref={projectsRef} />
      <AccoladesModel ref={accoladesRef} />
      <ContactModel ref={contactRef} />
      
      {/* Subtle floating tech dust/particles in background */}
      <points>
        <bufferGeometry>
           <bufferAttribute 
              attach="attributes-position" 
              count={200}
              array={new Float32Array(600).map(() => (Math.random() - 0.5) * 80)} 
              itemSize={3}
           />
        </bufferGeometry>
        <pointsMaterial size={0.1} color="#5599ff" transparent opacity={0.3} />
      </points>
    </group>
  );
}
