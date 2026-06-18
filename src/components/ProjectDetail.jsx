import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Code2, Layers, Cpu, Globe, BrainCircuit, Shield, Database, Workflow } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';

// Map tech names to accent colors for visual variety
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

// Map project ids to icons and gradient themes
const projectThemes = {
  1: { icon: Cpu, gradient: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', accent: '#00d2ff' },
  2: { icon: BrainCircuit, gradient: 'linear-gradient(135deg, #0a1628, #1a3a2a, #0f2027)', accent: '#4ade80' },
  3: { icon: Globe, gradient: 'linear-gradient(135deg, #1a0a2e, #2d1b69, #11001c)', accent: '#a78bfa' },
  4: { icon: Shield, gradient: 'linear-gradient(135deg, #0a1628, #162447, #1f4068)', accent: '#38bdf8' },
  5: { icon: Database, gradient: 'linear-gradient(135deg, #1a0a0a, #2d1b1b, #3d2020)', accent: '#f97316' },
};

// Stagger animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
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

const ProjectDetail = ({ project, onClose }) => {
  const scrollRef = useRef(null);
  const theme = projectThemes[project.id] || projectThemes[1];
  const ThemeIcon = theme.icon;
  const [selectedTech, setSelectedTech] = useState(null);

  // Lock body scroll on mount, restore on unmount
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // Scroll the detail container to top
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // ESC key to close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Stop wheel events from reaching Lenis (the smooth-scroll library)
  const handleWheel = (e) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      className="project-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onWheel={handleWheel}
    >
      {/* Translucent tinted overlay — lets 3D scene bleed through */}
      <div className="project-detail-bg" />

      {/* Subtle accent glow (single orb, themed) */}
      <div className="project-detail-orbs">
        <motion.div
          className="project-orb orb-1"
          style={{ background: `radial-gradient(circle, ${theme.accent}20, transparent 70%)` }}
          animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Fixed top bar */}
      <motion.div
        className="project-detail-topbar"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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

      {/* Scrollable content — data-lenis-prevent stops Lenis from intercepting */}
      <div className="project-detail-scroll" ref={scrollRef} data-lenis-prevent>
        <motion.div
          className="project-detail-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero section */}
          <div className="project-detail-hero">
            <motion.div className="project-detail-icon-wrap" variants={itemVariants}>
              <div className="project-detail-icon-ring" style={{ borderColor: `${theme.accent}40` }}>
                <ThemeIcon size={48} style={{ color: theme.accent }} strokeWidth={1.2} />
              </div>
            </motion.div>

            {project.year && (
              <motion.div
                className="project-detail-year"
                variants={itemVariants}
                style={{ color: theme.accent }}
              >
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
              <div className="divider-line" style={{ background: `linear-gradient(90deg, transparent, ${theme.accent}, transparent)` }} />
            </motion.div>
          </div>

          {/* Description section */}
          <motion.div className="project-detail-section" variants={itemVariants}>
            <div className="section-header">
              <Layers size={20} style={{ color: theme.accent }} />
              <h3>Overview</h3>
            </div>
            <p className="project-detail-desc">{project.desc}</p>
          </motion.div>

          {/* Tech stack section */}
          <motion.div className="project-detail-section" variants={itemVariants}>
            <div className="section-header">
              <Code2 size={20} style={{ color: theme.accent }} />
              <h3>Technology Stack</h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem', fontStyle: 'italic' }}>Tap a technology to see where it was used</p>
            <motion.div
              className="skill-ba"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {project.tech.map((t, idx) => {
                const color = techColorMap[t] || theme.accent;
                return (
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
                );
              })}
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

          {/* CTA section */}
          <div style={{height: "2rem", display: "flex", justifyContent: "center", alignItems: "center"}}>Live Preview is not Available Right Now. You can View my repository</div>
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

          {/* Bottom spacer */}
          <div style={{ height: '4rem' }} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
