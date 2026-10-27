import React, { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Sphere, useTexture, useProgress } from '@react-three/drei';
import gsap from 'gsap';

const RealisticGlobe = ({ rotationDone, onRotateComplete }) => {
  const globeRef = useRef();
  const { camera } = useThree();

  const colorMap = useTexture('/textures/earth_atmos_2048.jpg');
  const specularMap = useTexture('/textures/earth_specular_2048.jpg');

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.rotation.x = 0;

      // Rotate around the globe
      const targetY = -Math.PI * 2 - 3.11;
      const targetX = 0.39;

      gsap.to(globeRef.current.rotation, {
        y: targetY,
        x: targetX,
        duration: 4.5, // Elegant dynamic rotation
        ease: "power2.inOut",
        onComplete: onRotateComplete
      });
    }
  }, [onRotateComplete]);

  useEffect(() => {
    if (rotationDone) {
      // Zoom into West Bengal
      gsap.to(camera.position, {
        z: 2.12,
        duration: 3.5,
        ease: "power2.inOut"
      });
    }
  }, [rotationDone, camera]);

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 3, 5]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-5, -3, -5]} intensity={0.8} color="#3388ff" />
      <Sphere args={[2, 64, 64]} ref={globeRef}>
        <meshStandardMaterial
          map={colorMap}
          roughnessMap={specularMap}
          roughness={0.6}
          metalness={0.3}
        />
      </Sphere>
    </>
  );
};

export default function Preloader({ onComplete }) {
  const { progress } = useProgress();
  const [count, setCount] = useState(0);
  const [rotationDone, setRotationDone] = useState(false);
  const preloaderRef = useRef();
  const hasTriggeredTransition = useRef(false);

  // Counter logic matching assets loading progress
  useEffect(() => {
    const targetValue = Math.min(Math.round(progress), 100);
    const obj = { val: count };
    gsap.to(obj, {
      val: targetValue,
      duration: 0.5,
      ease: 'power1.out',
      onUpdate: () => setCount(Math.round(obj.val))
    });
  }, [progress]);

  // Transition trigger when rotation is complete AND loading is finished
  useEffect(() => {
    if (rotationDone && progress >= 100 && !hasTriggeredTransition.current) {
      hasTriggeredTransition.current = true;
      
      const tl = gsap.timeline({
        onComplete: onComplete
      });

      // Fade out bottom content
      tl.to('.preloader-bottom-content', { opacity: 0, duration: 0.6, ease: 'power2.inOut' })
        // Wait for Globe camera zoom transition (3.5s duration)
        .to('.preloader-globe-container', { scale: 1.1, opacity: 0, duration: 1.2, ease: 'power2.in' }, '+=2.5')
        // Open curtains
        .to('.preloader-curtain-left', { xPercent: -100, duration: 1.2, ease: 'power4.inOut' }, '-=0.4')
        .to('.preloader-curtain-right', { xPercent: 100, duration: 1.2, ease: 'power4.inOut' }, '<')
        // Hide loader completely
        .set(preloaderRef.current, { display: 'none' });
    }
  }, [rotationDone, progress, onComplete]);

  // Animate text split reveal on mount
  useEffect(() => {
    gsap.from('.preloader-word', {
      y: 80,
      opacity: 0,
      stagger: 0.04,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.3
    });
    gsap.from('.preloader-sub', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.8
    });
  }, []);

  return (
    <div ref={preloaderRef} className="preloader">
      <div className="preloader-curtain-left" />
      <div className="preloader-curtain-right" />
      
      {/* Upper/Center Globe View */}
      <div className="preloader-globe-container">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <Suspense fallback={null}>
            <RealisticGlobe
              rotationDone={rotationDone}
              onRotateComplete={() => setRotationDone(true)}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Bottom Counter & Information */}
      <div className="preloader-bottom-content">
        <div className="preloader-words">
          {'MANISH DAS'.split('').map((char, i) => (
            <span key={i} className="preloader-word">
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
        <div className="preloader-sub">SYSTEM INITIALIZING...</div>
        
        <div className="preloader-bottom">
          <div className="preloader-counter">{String(count).padStart(3, '0')}%</div>
          <div className="preloader-line">
            <div className="preloader-line-fill" style={{ width: `${count}%` }} />
          </div>
        </div>
      </div>

      {/* Decorative Tech Grid */}
      <div className="preloader-grid">
        <div className="preloader-grid-line" />
        <div className="preloader-grid-line" />
        <div className="preloader-grid-line" />
      </div>
    </div>
  );
}
