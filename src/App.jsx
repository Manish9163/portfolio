import React, { Suspense, useState, useRef, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { Experience } from './components/Experience';
import Preloader from './components/Preloader';
import MarqueeText from './components/MarqueeText';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { ExternalLink, Mail, ArrowRight, Code2, BrainCircuit, Trophy, X, Menu, Download, Sparkles, Zap } from 'lucide-react';
import { FaGithub, FaLinkedin, FaReact, FaPython, FaGitAlt, FaPhp } from 'react-icons/fa6';
import { SiTypescript, SiTailwindcss, SiThreedotjs, SiGreensock, SiTensorflow, SiMysql } from 'react-icons/si';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectDetail from './components/ProjectDetail';
import MaskHoverReveal from './components/MaskHoverReveal';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef();
  const dotRef = useRef();
  const outlineRef = useRef();

  // Detect touch devices on mount
  useEffect(() => {
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouch) {
      document.documentElement.classList.add('touch-device');
    } else {
      document.documentElement.classList.remove('touch-device');
    }
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setIsStarted(true);
  }, []);

  useGSAP(() => {
    // Magnetic Cursor
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      gsap.to(dotRef.current, { x: clientX - 4, y: clientY - 4, duration: 0.08 });
      gsap.to(outlineRef.current, { x: clientX - 20, y: clientY - 20, duration: 0.25 });
    };

    // Cursor scaling on interactive elements
    const onMouseEnter = () => {
      gsap.to(outlineRef.current, { scale: 2.5, opacity: 0.3, duration: 0.3 });
      gsap.to(dotRef.current, { scale: 0.5, duration: 0.3 });
    };
    const onMouseLeave = () => {
      gsap.to(outlineRef.current, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Add hover effect to interactive elements
    const interactives = document.querySelectorAll('a, button, .project-card, .skill-badge');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    // Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });
    window.lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    function update(time) { lenis.raf(time * 1000); }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Scroll-reveal animations
    const textEls = gsap.utils.toArray('.anim-text');
    textEls.forEach((el) => {
      gsap.from(el, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Parallax effects for labels
    gsap.utils.toArray('.content-label').forEach(el => {
      gsap.to(el, {
        y: -30,
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
    });

    // Section tracking
    const sections = document.querySelectorAll('.section:not(.hero-section)');
    sections.forEach((sec, i) => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveSection(i + 1),
        onEnterBack: () => setActiveSection(i + 1),
      });
    });

    ScrollTrigger.create({
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom 50%',
      onEnter: () => setActiveSection(0),
      onEnterBack: () => setActiveSection(0),
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(update);
      window.removeEventListener('mousemove', onMouseMove);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, { scope: containerRef });

  // Hero entrance animation
  useGSAP(() => {
    if (isStarted) {
      const tl = gsap.timeline();
      tl.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from('.hero-name-char', { y: 100, opacity: 0, rotateX: 90, stagger: 0.04, duration: 1, ease: 'power4.out' }, '-=0.4')
        .from('.hero-subtitle-word', { y: 30, opacity: 0, stagger: 0.06, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .from('.hero-cta-group', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .from('.scroll-indicator', { opacity: 0, duration: 1 }, '-=0.2');
    }
  }, [isStarted]);

  const projectsData = [
    {
      id: 1,
      title: "IoT Traffic Control",
      short: "Real-time monitoring and automation system.",
      desc: "An advanced hardware-software integration designed to monitor and manage traffic speed in real-time. By utilizing custom embedded sensors and microcontrollers, it analyzes traffic flow and dynamically adjusts signals to prevent congestion. Developed and demonstrated at the Brainware University Tech Showcase.",
      tech: ["C++", "Arduino", "ESP32", "Python Data Analytics", "Web Dashboards"],
      techUsage: {
        "C++": "Core firmware logic for Arduino and ESP32 microcontrollers, handling sensor reads and signal control.",
        "Arduino": "Hardware prototyping and sensor integration for real-time traffic monitoring nodes.",
        "ESP32": "Wi-Fi enabled microcontroller transmitting live traffic data to the central dashboard.",
        "Python Data Analytics": "Processing traffic flow data, generating trend reports, and forecasting congestion.",
        "Web Dashboards": "Real-time browser-based visualization of traffic patterns, signal status, and alerts.",
      },
      link: "#"
    },
    {
      id: 2,
      title: "Plant Disease Detection",
      short: "Full-stack AI system for image-based disease diagnosis.",
      desc: "A machine learning oriented application that takes images of plant leaves from farmers via a web portal, processes them through a Convolutional Neural Network (CNN), and swiftly identifies possible diseases. It also suggests actionable treatments and organic chemical ratios.",
      tech: ["Python", "TensorFlow", "React", "Node.js", "Flask", "OpenCV", "CNN"],
      techUsage: {
        "Python": "Backend server logic, ML model training pipeline, and data preprocessing scripts.",
        "TensorFlow": "Building and training the CNN model for multi-class leaf disease classification.",
        "React": "Frontend web portal where farmers upload leaf images and view diagnosis results.",
        "Node.js": "Backend API server handling image uploads, user auth, and prediction requests.",
        "Flask": "Python microservice serving the trained ML model via REST endpoints.",
        "OpenCV": "Image preprocessing — resizing, augmentation, and feature extraction before model inference.",
        "CNN": "Convolutional Neural Network architecture achieving 95%+ accuracy on disease classification.",
      },
      link: "https://github.com/Manish9163/PlantDiseaseSystem"
    },
    {
      id: 3,
      title: "Indian Wanderer",
      short: "Platform for personalized itinerary planning and scheduling.",
      desc: "A comprehensive monolithic platform designed to transform the travel experience. Users can securely log in, build personalized daily trip itineraries, find budget-friendly activities, and track travel expenses in real-time.",
      tech: ["PHP", "MySQL", "JavaScript", "React", "Bootstrap", "Angular", "Node.js", "Tailwind CSS", "Next.js", "TypeScript"],
      techUsage: {
        "PHP": "Server-side scripting for vendor management, booking logic, and session handling.",
        "MySQL": "Relational database storing user profiles, itineraries, bookings, and expense records.",
        "JavaScript": "Client-side interactivity, DOM manipulation, and dynamic content rendering.",
        "React": "Component-based UI for the itinerary builder, expense tracker, and trip planner.",
        "Bootstrap": "Responsive grid layout and pre-built UI components for rapid prototyping.",
        "Angular": "Admin dashboard for vendor management and booking analytics.",
        "Node.js": "RESTful API server for real-time data operations and guide communication.",
        "Tailwind CSS": "Utility-first styling for the travel planning interface and responsive design.",
        "Next.js": "Server-side rendering for SEO-optimized public-facing travel pages.",
        "TypeScript": "Type-safe codebase for the booking engine and payment processing modules.",
      },
      link: "https://github.com/Manish9163/Indian-Wonderer-Website"
    },
    {
      id: 4,
      title: "Accessibility Checker",
      short: "Specialized web auditing tool ensuring inclusive standards.",
      desc: "A browser-based auditing engine that validates DOM trees against modern Web Content Accessibility Guidelines (WCAG). It parses active code logic deeply to spotlight contrast violations, missing aria-labels, and improper interactive elements.",
      tech: ["React.js", "Chrome API", "DOM Parser", "WCAG 2.1 JS Rules", "TypeScript"],
      techUsage: {
        "React.js": "Frontend interface for the auditing dashboard displaying violations and compliance scores.",
        "Chrome API": "Browser extension integration for accessing and inspecting active page DOM trees.",
        "DOM Parser": "Parsing and traversing webpage DOM structures to identify accessibility violations.",
        "WCAG 2.1 JS Rules": "Custom rule engine validating against 50+ WCAG accessibility standards.",
        "TypeScript": "Type-safe implementation of audit rules, report generation, and extension logic.",
      },
      link: "https://github.com/Manish9163/accessbility-checker"
    },
    {
      id: 5,
      title: "FarmFi",
      short: "An AI ecosystem for smart farming and agricultural financing.",
      desc: "A comprehensive AI-driven ecosystem aiming to revolutionize the agricultural sector. It leverages machine learning to provide actionable insights for crop management and integrates specialized financial tooling.",
      tech: ["AI/ML", "React", "Python", "Data Science", "Flask", "TensorFlow", "MySQL"],
      techUsage: {
        "AI/ML": "Predictive models for crop yield forecasting, disease detection, and market price analysis.",
        "React": "Frontend dashboard for farmers to view analytics, financial tools, and AI predictions.",
        "Python": "Backend logic, data processing pipelines, and model training infrastructure.",
        "Data Science": "Statistical analysis of agricultural data, market trends, and financial modeling.",
        "Flask": "API server connecting trained ML models to the React frontend via REST endpoints.",
        "TensorFlow": "Training deep learning models for crop disease detection and yield optimization.",
        "MySQL": "Relational database for farmer profiles, loan records, and agricultural data storage.",
      },
      link: "https://github.com/Manish9163/FarmFi-an_AI_ecosytem"
    }
  ];

  const navItems = ['philosophy', 'experience', 'craft', 'innovation', 'projects', 'about', 'contact'];

  return (
    <div ref={containerRef}>
      {/* Preloader */}
      {!isStarted && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Cinematic Overlays */}
      <div className="grain" />
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-outline" ref={ref => outlineRef.current = ref} />

      {/* Structural Crosshairs */}
      <div className="crosshair ch-tl" />
      <div className="crosshair ch-tr" />
      <div className="crosshair ch-bl" />
      <div className="crosshair ch-br" />

      {/* Vignette */}
      <div className="vignette-overlay" />

      {/* Header */}
      <header className="header">
        <div className="brand">
          <span className="brand-name">Manish Das</span>
          <span className="brand-dot" />
        </div>

        <nav className="nav-links desktop-nav">
          {navItems.map(item => (
            <a key={item} href={`#${item}`}>{item}</a>
          ))}
        </nav>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="mobile-nav-overlay"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <nav className="mobile-nav-links">
              {navItems.map(item => (
                <a key={item} href={`#${item}`} onClick={() => setMobileMenuOpen(false)}>{item}</a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Side Progress */}
      <div className="side-progress">
        {[
          { num: '01', label: 'PHILOSOPHY' },
          { num: '02', label: 'EXPERIENCE' },
          { num: '03', label: 'CRAFT' },
          { num: '04', label: 'INNOVATION' },
          { num: '05', label: 'PROJECTS' },
          { num: '06', label: 'ABOUT' },
          { num: '07', label: 'CONTACT' },
        ].map((item, index) => (
          <div key={item.num} className={`progress-item ${activeSection === index + 1 ? 'active' : ''}`}>
            <a href={item.href}><span className="progress-num">{item.num}</span></a>
            {activeSection === index + 1 && <span className="progress-label">{item.label}</span>}
          </div>
        ))}
      </div>

      {/* 3D Background */}
      <div className="canvas-container">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 0, 25]} fov={45} />
          <color attach="background" args={['#03030b']} />

          <ambientLight intensity={0.5} color="#b0b0ff" />
          <spotLight position={[20, 20, 10]} intensity={4} angle={0.5} penumbra={1} color="#7c3aed" castShadow />
          <directionalLight position={[-20, -10, -10]} intensity={2.0} color="#06b6d4" />
          <pointLight position={[0, 10, 20]} intensity={1.5} color="#f43f5e" />

          <Suspense fallback={null}>
            <Environment preset="city" />
            <Experience />
            <EffectComposer>
              <Bloom luminanceThreshold={0.08} mipmapBlur intensity={1.2} radius={0.4} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      {/* Scrollable Content */}
      <div className="scroll-area content-layer">

        {/* HERO */}
        <section className="section hero-section">
          <div className="hero-inner">
            <div className="hero-text-content">
              <p className="hero-eyebrow">
              </p>
              <div className="hero-name-wrap">
                {'MANISH'.split('').map((char, i) => (
                  <span key={`n1-${i}`} className="hero-name-char">{char}</span>
                ))}
              </div>
              <div className="hero-name-wrap hero-name-outline">
                {'DAS'.split('').map((char, i) => (
                  <span key={`n2-${i}`} className="hero-name-char">{char}</span>
                ))}
              </div>
              <div className="hero-subtitle-wrap">
                {['ENGINEERING', '&', 'DESIGN'].map((word, i) => (
                  <span key={i} className="hero-subtitle-word">{word}</span>
                ))}
              </div>
              <div className="hero-cta-group">
                <button className="hero-btn-primary" onClick={() => {
                  document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
                }}>
                  <span>View Projects</span>
                  <ArrowRight size={18} />
                </button>
                <a href="mailto:manishdas20987@gmail.com" className="hero-btn-secondary">
                  <Mail size={16} />
                  <span>Get in Touch</span>
                </a>
              </div>
            </div>

            <div className="hero-image-column">
              <MaskHoverReveal
                imageSrc="/manish.png"
                revealSrc="/manish.png"
                alt="Manish Das"
              />
            </div>
          </div>

          <div className="scroll-indicator">
            <div className="mouse-icon" />
            <span className="scroll-indicator-label">Scroll</span>
          </div>
        </section>

        {/* MARQUEE BAND */}
        <div className="marquee-section">
          <MarqueeText text="DEVELOPER • DESIGNER • ENGINEER • INNOVATOR • ML SPECIALIST" speed={35} />
        </div>

        {/* 01 PHILOSOPHY */}
        <section id="philosophy" className="section content-section">
          <div className="content-block anim-text">
            <p className="content-label">01 / PHILOSOPHY</p>
            <h2 className="content-title">Growth <br /><span className="gradient-text">Mindset.</span></h2>
            <p className="content-p">I believe in continuous evolution. Blending a creative arts background with core computer science principles allows me to approach technical challenges with unique problem-solving perspectives, ensuring builds are both architecturally sound and user-centric.</p>
            <div className="content-accent-line" />
          </div>
        </section>

        {/* 02 EXPERIENCE */}
        <section id="experience" className="section content-section">
          <div className="content-block right anim-text">
            <p className="content-label">02 / EXPERIENCE & EDUCATION</p>
            <h2 className="content-title">Journey <br /><span className="gradient-text">So Far.</span></h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot active-dot" />
                <div className="timeline-content">
                  <h4>ML Intern — FreshoSoft</h4>
                  <p className="timeline-date">Machine Learning & Computer Vision</p>
                  <p>Worked on <strong>CNN-based plant disease recognition</strong> models, training image classifiers for real-world agricultural diagnostics. Gained hands-on experience in data preprocessing, model optimization, and deploying ML pipelines.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <h4>Bachelor of Computer Applications</h4>
                  <p className="timeline-date">Brainware University (2024 - 2027)</p>
                  <p>Current CGPA: <strong>8.4</strong>. Focused on core computer science foundations, data structures, and modern software engineering.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <h4>Higher Secondary (Arts)</h4>
                  <p className="timeline-date">Bora Madhu Sudan High School (2022)</p>
                  <p>Graduated with 79%. Developed strong analytical, communication, and creative thinking skills.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 CRAFT */}
        <section id="craft" className="section content-section">
          <div className="content-block anim-text" style={{ maxWidth: '550px' }}>
            <p className="content-label">03 / CRAFT</p>
            <h2 className="content-title">Frontend <br /><span className="gradient-text">& Logic.</span></h2>
            <p className="content-p">Specialized in modern web tech: <strong>React.js, TypeScript, and Tailwind CSS</strong>. Deep knowledge of system programming in <strong>C and Python</strong> for automation and data analysis. Experienced in Git-based collaboration.</p>

            <div className="skills-grid">
              {[
                { name: 'React.js', icon: <FaReact />, color: '#61DAFB' },
                { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
                { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06B6D4' },
                { name: 'Three.js', icon: <SiThreedotjs />, color: '#ffffff' },
                { name: 'GSAP', icon: <SiGreensock />, color: '#88CE02' },
                { name: 'Python', icon: <FaPython />, color: '#3776AB' },
                { name: 'TensorFlow', icon: <SiTensorflow />, color: '#FF6F00' },
                { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
                { name: 'Lenis', icon: <Sparkles />, color: '#c084fc' },
                { name: 'Context API', icon: <FaReact />, color: '#61DAFB' },
                { name: 'MySQL', icon: <SiMysql />, color: '#4479A1' },
                { name: 'CNN', icon: <BrainCircuit />, color: '#f472b6' },
                { name: 'PHP', icon: <FaPhp />, color: '#777BB4' },
              ].map((skill, i) => (
                <div
                  key={i}
                  className="skill-badge"
                  style={{ '--skill-accent': skill.color, animationDelay: `${i * 0.05}s` }}
                >
                  <div className="skill-badge-inner">
                    <div className="skill-icon-face">
                      {skill.icon}
                    </div>
                    <div className="skill-name-face">
                      <span>{skill.name}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 04 INNOVATION */}
        <section id="innovation" className="section content-section">
          <div className="content-block right anim-text">
            <p className="content-label">04 / INNOVATION</p>
            <h2 className="content-title">AI & IoT <br /><span className="gradient-text">Integration.</span></h2>
            <p className="content-p">Bridging physical systems with intelligent computing. Specialized in deploying machine learning models for predictive analytics and developing end-to-end IoT network architectures for real-time monitoring.</p>
            <div className="innovation-stats">
              <div className="stat-card">
                <span className="stat-number">5+</span>
                <span className="stat-label">Projects Built</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">95%</span>
                <span className="stat-label">ML Accuracy</span>
              </div>
              <div className="stat-card">
                <span className="stat-number">8.4</span>
                <span className="stat-label">CGPA</span>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE BAND 2 */}
        <div className="marquee-section marquee-reverse">
          <MarqueeText text="REACT • THREE.JS • TENSORFLOW • PYTHON • GSAP • NODE.JS • MYSQL" speed={30} direction="right" />
        </div>

        {/* 05 PROJECTS */}
        <section id="projects" className="section content-section">
          <div className="content-block anim-text" style={{ maxWidth: '100%' }}>
            <p className="content-label">05 / PROJECTS</p>
            <h2 className="content-title">Deployed <br /><span className="gradient-text">Systems.</span></h2>

            <div className="project-grid">
              {projectsData.map(proj => (
                <div className="project-card" key={proj.id}>
                  <div className="project-card-number">{String(proj.id).padStart(2, '0')}</div>
                  <h3>{proj.title}</h3>
                  <p>{proj.short}</p>
                  <div className="project-card-tags">
                    {proj.tech.slice(0, 3).map((t, i) => (
                      <span key={i} className="project-tag">{t}</span>
                    ))}
                  </div>
                  <button className="project-link" onClick={() => setSelectedProject(proj)}>
                    View Details <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 06 ABOUT */}
        <section id="about" className="section content-section">
          <div className="content-block anim-text">
            <p className="content-label">06 / ABOUT ME</p>
            <h2 className="content-title">Beyond <br /><span className="gradient-text">The Code.</span></h2>
            <p className="content-p" style={{ marginTop: '0.3rem', fontSize: '0.9rem' }}><strong>ML Internship — FreshoSoft</strong> trained CNN models for plant disease recognition under industry mentorship.</p>
            <p className="content-p" style={{ marginTop: '2rem' }}><strong>Interests:</strong> Machine Learning research, cycling, and acoustic guitar.</p>
            <p className="content-p" style={{ marginTop: '1rem' }}><strong>Languages:</strong> Multilingual fluency in English, Bengali, and Hindi.</p>
          </div>
        </section>

        {/* 07 CONTACT */}
        <section id="contact" className="section content-section contact-section">
          <div className="content-block anim-text" style={{ marginTop: '10vh', maxWidth: '600px' }}>
            <p className="content-label">07 / CONTACT</p>
            <h2 className="content-title">Let's <span className="gradient-text">Connect.</span></h2>
            <p className="content-p" style={{ marginBottom: '3rem' }}>If you're looking for a passionate developer bridging frontend technologies and intelligent systems, feel free to reach out.</p>

            <div className="contact-links">
              <a href="/Manish_Das_Resume_updated.pdf" download className="social-btn resume-btn">
                <Download size={20} />
                <span>Download Resume</span>
              </a>
              <a href="mailto:manishdas20987@gmail.com" className="social-btn">
                <Mail size={20} />
                <span>manishdas20987@gmail.com</span>
              </a>
              <a href="https://github.com/Manish9163" target="_blank" rel="noreferrer" className="social-btn">
                <FaGithub size={20} />
                <span>GitHub</span>
              </a>
              <a href="https://linkedin.com/in/manish9163" target="_blank" rel="noreferrer" className="social-btn">
                <FaLinkedin size={20} />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>© 2026 Manish Das — Crafted with passion</p>
        </footer>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
