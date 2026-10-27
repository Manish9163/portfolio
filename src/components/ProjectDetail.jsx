import React, { useEffect, useRef, useState, useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { ArrowLeft, ExternalLink, Code2, Layers, Cpu, Globe, BrainCircuit, Shield, Database } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import * as THREE from 'three';
import gsap from 'gsap';

// Map tech names to accent colors
const techColorMap = {
  'C++': '#f34b7d',
  'Arduino': '#00979D',
  'ESP32': '#E7352C',
  'Python': '#3572A5',
  'TensorFlow': '#FF6F00',
  'React': '#61DAFB',
  'Node.js': '#339933',
  'Flask': '#000000',
  'OpenCV': '#5C3EE8',
  'CNN': '#FF6F00',
  'PHP': '#777BB4',
  'MySQL': '#4479A1',
  'JavaScript': '#F7DF1E',
  'Bootstrap': '#7952B3',
  'Angular': '#DD0031',
  'Next.js': '#ffffff',
  'TypeScript': '#3178C6',
  'Tailwind CSS': '#06B6D4',
  'React.js': '#61DAFB',
  'Chrome API': '#4285F4',
  'DOM Parser': '#E34F26',
  'WCAG 2.1 JS Rules': '#005A9C',
  'AI/ML': '#FF6F00',
  'Data Science': '#150458',
  'Python Data Analytics': '#3572A5',
  'Web Dashboards': '#3388ff',
};

// Map project ids to icons and themes
const projectThemes = {
  1: { icon: Cpu, accent: '#00d2ff', shapes: 'tech' },
  2: { icon: BrainCircuit, accent: '#4ade80', shapes: 'organic' },
  3: { icon: Globe, accent: '#a78bfa', shapes: 'geo' },
  4: { icon: Shield, accent: '#38bdf8', shapes: 'tech' },
  5: { icon: Database, accent: '#f97316', shapes: 'geo' },
};

/* ─── 3D Floating Tech-Themed Background ─── */

// Angle bracket < or >
function BracketShape({ color, flip }) {
  const dir = flip ? -1 : 1;
  return (
    <group>
      <mesh position={[0, 0.4, 0]} rotation={[0, 0, dir * -Math.PI / 4]}>
        <boxGeometry args={[0.08, 1, 0.08]} />
        <meshPhysicalMaterial color={color} transparent opacity={0.2} emissive={color} emissiveIntensity={0.4} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.4, 0]} rotation={[0, 0, dir * Math.PI / 4]}>
        <boxGeometry args={[0.08, 1, 0.08]} />
        <meshPhysicalMaterial color={color} transparent opacity={0.2} emissive={color} emissiveIntensity={0.4} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// @ symbol
function AtShape({ color }) {
  return (
    <group>
      <mesh>
        <torusGeometry args={[0.5, 0.05, 8, 32]} />
        <meshPhysicalMaterial color={color} transparent opacity={0.2} emissive={color} emissiveIntensity={0.4} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.25, -0.05, 0]}>
        <torusGeometry args={[0.25, 0.04, 8, 16, Math.PI * 1.5]} />
        <meshPhysicalMaterial color={color} transparent opacity={0.2} emissive={color} emissiveIntensity={0.4} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Terminal/screen icon
function TerminalShape({ color }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[1.4, 1, 0.05]} />
        <meshPhysicalMaterial color={color} transparent opacity={0.12} wireframe emissive={color} emissiveIntensity={0.3} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Prompt > */}
      <mesh position={[-0.35, 0.15, 0.03]}>
        <boxGeometry args={[0.3, 0.04, 0.01]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} toneMapped={false} />
      </mesh>
      <mesh position={[-0.1, -0.05, 0.03]}>
        <boxGeometry args={[0.6, 0.04, 0.01]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} toneMapped={false} />
      </mesh>
    </group>
  );
}

// Hash # symbol
function HashShape({ color }) {
  return (
    <group>
      {/* Vertical bars */}
      <mesh position={[-0.2, 0, 0]}><boxGeometry args={[0.06, 1, 0.06]} /><meshPhysicalMaterial color={color} transparent opacity={0.2} emissive={color} emissiveIntensity={0.4} metalness={0.8} roughness={0.2} /></mesh>
      <mesh position={[0.2, 0, 0]}><boxGeometry args={[0.06, 1, 0.06]} /><meshPhysicalMaterial color={color} transparent opacity={0.2} emissive={color} emissiveIntensity={0.4} metalness={0.8} roughness={0.2} /></mesh>
      {/* Horizontal bars */}
      <mesh position={[0, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}><boxGeometry args={[0.06, 1, 0.06]} /><meshPhysicalMaterial color={color} transparent opacity={0.2} emissive={color} emissiveIntensity={0.4} metalness={0.8} roughness={0.2} /></mesh>
      <mesh position={[0, -0.2, 0]} rotation={[0, 0, Math.PI / 2]}><boxGeometry args={[0.06, 1, 0.06]} /><meshPhysicalMaterial color={color} transparent opacity={0.2} emissive={color} emissiveIntensity={0.4} metalness={0.8} roughness={0.2} /></mesh>
    </group>
  );
}

// Cursor arrow
function CursorShape({ color }) {
  return (
    <group>
      <mesh rotation={[0, 0, Math.PI / 6]}>
        <coneGeometry args={[0.3, 0.9, 3]} />
        <meshPhysicalMaterial color={color} transparent opacity={0.2} emissive={color} emissiveIntensity={0.4} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.15, -0.5, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshPhysicalMaterial color={color} transparent opacity={0.2} emissive={color} emissiveIntensity={0.4} metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function FloatingTechShape({ position, rotation, scale, color, shape }) {
  const ref = useRef();
  const speed = useMemo(() => 0.3 + Math.random() * 0.5, []);
  const axis = useMemo(() => new THREE.Vector3(
    Math.random() - 0.5,
    Math.random() - 0.5,
    Math.random() - 0.5
  ).normalize(), []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += axis.x * delta * speed;
      ref.current.rotation.y += axis.y * delta * speed;
      ref.current.rotation.z += axis.z * delta * speed;
    }
  });

  const shapeComponent = useMemo(() => {
    switch (shape) {
      case 'bracketL': return <BracketShape color={color} flip={false} />;
      case 'bracketR': return <BracketShape color={color} flip={true} />;
      case 'at': return <AtShape color={color} />;
      case 'terminal': return <TerminalShape color={color} />;
      case 'hash': return <HashShape color={color} />;
      case 'cursor': return <CursorShape color={color} />;
      default: return <BracketShape color={color} flip={false} />;
    }
  }, [shape, color]);

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <group ref={ref} position={position} rotation={rotation} scale={scale}>
        {shapeComponent}
      </group>
    </Float>
  );
}

function DetailScene({ accent }) {
  const shapes = useMemo(() => {
    const shapeTypes = ['bracketL', 'bracketR', 'at', 'terminal', 'hash', 'cursor'];
    return Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 - 2,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      scale: 0.5 + Math.random() * 0.8,
      shape: shapeTypes[i % shapeTypes.length],
    }));
  }, []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.5} color={accent} />
      <directionalLight position={[-5, -3, -5]} intensity={0.3} color="#ffffff" />
      {shapes.map((s, i) => (
        <FloatingTechShape key={i} {...s} color={accent} />
      ))}
    </>
  );
}

/* ─── Transition Overlay ─── */
function TransitionOverlay({ accent, onTransitionDone }) {
  const overlayRef = useRef();
  const barsRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: onTransitionDone,
    });

    // Bars slide in from left staggered
    tl.fromTo(
      barsRef.current,
      { xPercent: -100 },
      {
        xPercent: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power4.inOut',
      }
    );

    // Hold briefly
    tl.to({}, { duration: 0.3 });

    // Bars slide out to right staggered
    tl.to(barsRef.current, {
      xPercent: 100,
      duration: 0.5,
      stagger: 0.06,
      ease: 'power4.inOut',
    });

    // Fade out overlay
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      onComplete: () => {
        if (overlayRef.current) overlayRef.current.style.display = 'none';
      },
    });
  }, [onTransitionDone]);

  return (
    <div ref={overlayRef} className="detail-transition-overlay">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          ref={(el) => (barsRef.current[i] = el)}
          className="detail-transition-bar"
          style={{
            background: i % 2 === 0
              ? `linear-gradient(90deg, ${accent}dd, ${accent}44)`
              : '#05050f',
          }}
        />
      ))}
    </div>
  );
}

/* ─── Animation Variants ─── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const techItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

/* ─── Main Component ─── */
const ProjectDetail = ({ project, onClose }) => {
  const pageRef = useRef(null);
  const scrollRef = useRef(null);
  const theme = projectThemes[project.id] || projectThemes[1];
  const ThemeIcon = theme.icon;
  const [selectedTech, setSelectedTech] = useState(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    if (scrollRef.current) scrollRef.current.scrollTop = 0;

    // Completely stop global Lenis scrolling while modal is open
    if (window.lenis) {
      window.lenis.stop();
    }

    // Stop native event propagation as a fallback
    const stopPropagation = (e) => e.stopPropagation();
    const el = pageRef.current;
    if (el) {
      el.addEventListener('wheel', stopPropagation, { passive: false });
      el.addEventListener('touchmove', stopPropagation, { passive: false });
    }

    return () => {
      document.body.style.overflow = '';
      if (window.lenis) {
        window.lenis.start();
      }
      if (el) {
        el.removeEventListener('wheel', stopPropagation);
        el.removeEventListener('touchmove', stopPropagation);
      }
    };
  }, []);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <motion.div
      ref={pageRef}
      className="project-detail-page"
      data-lenis-prevent="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Cinematic Bar Transition */}
      <TransitionOverlay
        accent={theme.accent}
        onTransitionDone={() => setShowContent(true)}
      />

      {/* 3D Floating Geometry Background */}
      <div className="detail-3d-bg">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <Suspense fallback={null}>
            <DetailScene accent={theme.accent} />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient Background */}
      <div className="project-detail-bg" />

      {/* Accent Orb */}
      <div className="project-detail-orbs">
        <motion.div
          className="project-orb"
          style={{
            width: 400, height: 400, top: '-10%', right: '-5%',
            background: `radial-gradient(circle, ${theme.accent}18, transparent 70%)`
          }}
          animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="project-orb"
          style={{
            width: 300, height: 300, bottom: '5%', left: '-3%',
            background: `radial-gradient(circle, ${theme.accent}10, transparent 70%)`
          }}
          animate={{ x: [0, -20, 30, 0], y: [0, 20, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Content — appears after transition animation */}
      {showContent && (
        <>
          {/* Top Bar */}
          <motion.div
            className="project-detail-topbar"
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="project-detail-back" onClick={onClose}>
              <ArrowLeft size={20} />
              <span>Back to Projects</span>
            </button>
            <div className="project-detail-topbar-right">
              {project.link && project.link !== '#' && (
                <a href={project.link} target="_blank" rel="noreferrer" className="project-detail-github-btn">
                  <FaGithub size={18} />
                  <span>Repository</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* Scrollable Content */}
          <div className="project-detail-scroll" ref={scrollRef} data-lenis-prevent>
            <motion.div
              className="project-detail-content"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Hero */}
              <div className="project-detail-hero">
                <motion.div className="project-detail-icon-wrap" variants={itemVariants}>
                  <div className="project-detail-icon-ring" style={{ borderColor: `${theme.accent}40` }}>
                    <ThemeIcon size={48} style={{ color: theme.accent }} strokeWidth={1.2} />
                  </div>
                </motion.div>

                {project.year && (
                  <motion.div className="project-detail-year" variants={itemVariants} style={{ color: theme.accent }}>
                    {project.year}
                  </motion.div>
                )}

                <motion.h1 className="project-detail-title" variants={itemVariants}>
                  {project.title}
                </motion.h1>

                <motion.p className="project-detail-tagline" variants={itemVariants}>
                  {project.short}
                </motion.p>

                <motion.div className="project-detail-divider" variants={itemVariants}>
                  <div className="divider-line" style={{ background: `linear-gradient(180deg, ${theme.accent}60, transparent)` }} />
                </motion.div>
              </div>

              {/* Description */}
              <motion.div className="project-detail-section" variants={itemVariants}>
                <div className="section-header">
                  <Layers size={20} style={{ color: theme.accent }} />
                  <h3>Overview</h3>
                </div>
                <p className="project-detail-desc">{project.desc}</p>
              </motion.div>

              {/* Tech Stack */}
              <motion.div className="project-detail-section" variants={itemVariants}>
                <div className="section-header">
                  <Code2 size={20} style={{ color: theme.accent }} />
                  <h3>Technology Stack</h3>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', fontStyle: 'italic' }}>
                  Tap a technology to see where it was used
                </p>
                <motion.div
                  className="skills-grid"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {project.tech.map((t, idx) => (
                    <motion.div
                      key={idx}
                      className="skill-badge tech-badge-clickable"
                      variants={techItemVariants}
                      whileHover={{ scale: 1.08, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedTech(t)}
                      style={{ cursor: 'pointer' }}
                    >
                      {t}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Tech Usage Popup */}
              <AnimatePresence>
                {selectedTech && project.techUsage && project.techUsage[selectedTech] && (
                  <motion.div
                    className="tech-popup-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => setSelectedTech(null)}
                  >
                    <motion.div
                      className="tech-popup-card"
                      initial={{ opacity: 0, scale: 0.85, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.85, y: 30 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="tech-popup-header">
                        <div className="tech-popup-dot" style={{ background: techColorMap[selectedTech] || theme.accent }} />
                        <h4 className="tech-popup-title">{selectedTech}</h4>
                      </div>
                      <p className="tech-popup-desc">{project.techUsage[selectedTech]}</p>
                      <button className="tech-popup-close" onClick={() => setSelectedTech(null)}>Got it</button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CTA */}
              <div style={{ height: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>
                Live Preview is not Available Right Now. You can View my repository
              </div>
              <motion.div className="project-detail-cta" variants={itemVariants}>
                {project.link && project.link !== '#' ? (
                  <a href={project.link} target="_blank" rel="noreferrer" className="project-cta-btn" style={{ background: theme.accent }}>
                    <FaGithub size={20} />
                    <span>View Source Code</span>
                    <ExternalLink size={16} />
                  </a>
                ) : (
                  <div className="project-cta-private">
                    <Shield size={18} />
                    <span>This project's source code is private</span>
                  </div>
                )}
              </motion.div>

              <div style={{ height: '4rem' }} />
            </motion.div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ProjectDetail;
