import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Environment, PerspectiveCamera, useProgress, Sphere, useTexture, Float, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Experience } from './components/Experience';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import { ExternalLink, Mail, ArrowRight, Code2, BrainCircuit, Trophy, X, Menu, Download } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa6';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectDetail from './components/ProjectDetail';

gsap.registerPlugin(ScrollTrigger);

const RealisticGlobe = ({ rotationDone, onRotateComplete }) => {
  const globeRef = useRef();
  const { camera } = useThree();

  // Use high-res earth maps from three.js repository
  const colorMap = useTexture('/textures/earth_atmos_2048.jpg');
  const specularMap = useTexture('/textures/earth_specular_2048.jpg');

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.rotation.x = 0;

      const targetY = -Math.PI * 2 - 3.11;
      const targetX = 0.39;

      gsap.to(globeRef.current.rotation, {
        y: targetY,
        x: targetX,
        duration: 4.5, // Graceful dynamic rotation
        ease: "power2.inOut",
        onComplete: onRotateComplete
      });
    }
  }, [onRotateComplete]);

  useEffect(() => {
    if (rotationDone) {
      // Direct camera zoom deep into the surface (West Bengal)
      gsap.to(camera.position, {
        z: 2.12,
        duration: 3.5, // 3.5 seconds to show it clearly entering West Bengal
        ease: "power2.inOut" // smooth start and finish for the dive
      });
    }
  }, [rotationDone, camera]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 3, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-5, -3, -5]} intensity={0.5} color="#3388ff" />
      <Sphere args={[2, 64, 64]} ref={globeRef}>
        <meshStandardMaterial
          map={colorMap}
          roughnessMap={specularMap}
          roughness={0.7}
          metalness={0.2}
        />
      </Sphere>
    </>
  );
};

const GlobeLoader = ({ setStarted }) => {
  const { progress } = useProgress();
  const loaderRef = useRef();
  const [rotationDone, setRotationDone] = useState(false);

  useEffect(() => {
    if (rotationDone && progress >= 100) {
      const tl = gsap.timeline({
        onComplete: () => setStarted(true)
      });

      tl.to('.globe-progress', { opacity: 0, duration: 0.5, ease: 'power2.inOut' })
        // Wait for the realistic 3D camera zoom to finish (3.5 seconds zoom)
        .to(loaderRef.current, { opacity: 0, duration: 1.2 }, "+=3.0")
        .set(loaderRef.current, { display: 'none' });
    }
  }, [rotationDone, progress, setStarted]);

  return (
    <div ref={loaderRef} className="globe-loader">
      <div className="globe-canvas-container">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <Suspense fallback={null}>
            <RealisticGlobe rotationDone={rotationDone} onRotateComplete={() => setRotationDone(true)} />
          </Suspense>
        </Canvas>
      </div>
      <div className="globe-progress">
        {Math.round(progress)}% LOADED
      </div>
    </div>
  );
};

const AbstractEngineeringShape = () => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Base slow rotation
      groupRef.current.rotation.x += delta * 0.1;
      groupRef.current.rotation.y -= delta * 0.2;

      // Slight smooth parallax reacting to the mouse pointer over the canvas
      const targetX = (state.pointer.x * Math.PI) / 6;
      const targetY = (state.pointer.y * Math.PI) / 6;

      groupRef.current.rotation.x += 0.02 * (targetY - groupRef.current.rotation.x);
      groupRef.current.rotation.y += 0.02 * (targetX - groupRef.current.rotation.y);
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.5}>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 10]} intensity={2} />
      <directionalLight position={[-10, -10, -10]} intensity={1} color="#3388ff" />
      <group ref={groupRef}>
      </group>
    </Float>
  );
};



function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const containerRef = useRef();
  const dotRef = useRef();
  const outlineRef = useRef();

  // Detect touch devices on mount to resolve cursor issues
  useEffect(() => {
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouch) {
      document.documentElement.classList.add('touch-device');
    } else {
      document.documentElement.classList.remove('touch-device');
    }
  }, []);

  useGSAP(() => {
    // Cursor Movement
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      gsap.to(dotRef.current, { x: clientX - 4, y: clientY - 4, duration: 0.1 });
      gsap.to(outlineRef.current, { x: clientX - 20, y: clientY - 20, duration: 0.3 });
    };
    window.addEventListener('mousemove', onMouseMove);

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    function update(time) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Reveal animations for text content as user scrolls
    const textEls = gsap.utils.toArray('.anim-text');
    textEls.forEach((el) => {
      gsap.from(el, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    // Update active side progress marker based on section in view
    const sections = document.querySelectorAll('.section:not(.hero-section)');
    sections.forEach((sec, i) => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => setActiveSection(i + 1), // 1-indexed for content sections
        onEnterBack: () => setActiveSection(i + 1),
      });
    });

    // special trigger for hero
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
    };
  }, { scope: containerRef });

  useGSAP(() => {
    if (isStarted) {
      const tl = gsap.timeline();
      tl.from('.hero-top-text', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' })
        .from('.hero-title-anim', { y: 40, opacity: 0, duration: 1.2, ease: 'power4.out' }, "-=0.6")
        .from('.hero-subtitle-anim', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' }, "-=0.8")
        .from('.scroll-indicator', { opacity: 0, duration: 1 }, "-=0.5");
    }
  }, [isStarted]);

  // Project details data array
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
      desc: "A comprehensive monolithic platform designed to transform the travel experience. Users can securely log in, build personalized daily trip itineraries, find budget-friendly activities, and track travel expenses in real-time. Designed with a priority on safety, the system integrates robust guide communication channels, booking tools, and full-featured vendor management dashboards.",
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
      desc: "A browser-based auditing engine that validates DOM trees against modern Web Content Accessibility Guidelines (WCAG). It parses active code logic deeply to spotlight contrast violations, missing aria-labels, and improper interactive elements to export comprehensive compliance audits.",
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
      desc: "A comprehensive AI-driven ecosystem aiming to revolutionize the agricultural sector. It leverages machine learning to provide actionable insights for crop management and integrates specialized financial tooling to help farmers secure fair loans and manage investments.",
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

  return (
    <div ref={containerRef}>
      {/* Cinematic Overlays */}
      <div className="grain" />
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-outline" ref={ref => outlineRef.current = ref} />

      {/* Structural Minimalist Crosshairs (UI Aesthetics) */}
      <div className="crosshair ch-tl" />
      <div className="crosshair ch-tr" />
      <div className="crosshair ch-bl" />
      <div className="crosshair ch-br" />

      {/* Screen Vignette Glow (Tech border) */}
      <div className="vignette-overlay" />

      {/* Modern Top Header */}
      <header className="header">
        <div className="brand">Manish Das</div>
        
        {/* Desktop Nav */}
        <nav className="nav-links desktop-nav">
          <a href="#philosophy">Philosophy</a>
          <a href="#experience">Experience</a>
          <a href="#craft">Craft</a>
          <a href="#innovation">Innovation</a>
          <a href="#projects">Projects</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Navigation Drawer */}
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
              <a href="#philosophy" onClick={() => setMobileMenuOpen(false)}>Philosophy</a>
              <a href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</a>
              <a href="#craft" onClick={() => setMobileMenuOpen(false)}>Craft</a>
              <a href="#innovation" onClick={() => setMobileMenuOpen(false)}>Innovation</a>
              <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vertical Tracker (Progress) */}
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

      {/* 3D Background - fixed behind content */}
      <div className="canvas-container">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 0, 25]} fov={45} />
          <color attach="background" args={['#010101']} />

          <ambientLight intensity={0.5} color="#ffffff" />
          <spotLight position={[20, 20, 10]} intensity={2.5} angle={0.5} penumbra={1} color="#3388ff" castShadow />
          <directionalLight position={[-20, -10, -10]} intensity={1.5} color="#444444" />

          <Suspense fallback={null}>
            <Environment preset="studio" />
            <Experience />

            <EffectComposer>
              <Bloom luminanceThreshold={0.1} mipmapBlur intensity={0.8} />
            </EffectComposer>
          </Suspense>
        </Canvas>
      </div>

      {/* Front HTML Content (Scrollable layers on top of 3D) */}
      <div className="scroll-area content-layer">

        {/* HERO */}
        <section className="section hero-section">
          <div className="hero-text-content">
            <p className="hero-top-text">ELEVATE DIGITAL EXPERIENCES</p>
            <div style={{ overflow: 'hidden' }}>
              <h1 className="hero-title hero-title-anim">Manish Das</h1>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <h3 className="hero-subtitle hero-subtitle-anim">ENGINEERING & DESIGN</h3>
            </div>
            <button className="hero-btn" onClick={() => {
              document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
            }}>
              View Projects
            </button>
          </div>

          <div className="hero-image-content">
            <div className="webgl-image-container">
              <Canvas camera={{ position: [0, 0, 8] }} style={{ pointerEvents: 'auto' }}>
                <Suspense fallback={null}>
                  <AbstractEngineeringShape />
                </Suspense>
              </Canvas>
            </div>
          </div>

          <div className="scroll-indicator">
            <div className="mouse-icon"></div>
            <span className="scroll-indicator-label">Scroll</span>
          </div>
        </section>

        {/* 01 */}
        <section id="philosophy" className="section content-section">
          <div className="content-block anim-text">
            <p className="content-label">01 / PHILOSOPHY</p>
            <h2 className="content-title">Growth Mindset.</h2>
            <p className="content-p">I believe in continuous evolution. Blending a creative arts background with core computer science principles allows me to approach technical challenges with unique problem-solving perspectives, ensuring builds are both architecturally sound and user-centric.</p>
          </div>
        </section>

        {/* 02 */}
        <section id="experience" className="section content-section">
          <div className="content-block right anim-text">
            <p className="content-label">02 / EXPERIENCE & EDUCATION</p>
            <h2 className="content-title">Journey So Far.</h2>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot" style={{ background: '#4ade80' }}></div>
                <div className="timeline-content">
                  <h4>ML Intern — FreshoSoft</h4>
                  <p className="timeline-date">Machine Learning & Computer Vision</p>
                  <p>Worked on <strong>CNN-based plant disease recognition</strong> models, training image classifiers for real-world agricultural diagnostics. Gained hands-on experience in data preprocessing, model optimization, and deploying ML pipelines.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Bachelor of Computer Applications</h4>
                  <p className="timeline-date">Brainware University (2024 - 2027)</p>
                  <p>Current CGPA: <strong>8.4</strong>. Focused on core computer science foundations, data structures, and modern software engineering.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h4>Higher Secondary (Arts)</h4>
                  <p className="timeline-date">Bora Madhu Sudan High School (2022)</p>
                  <p>Graduated with 79%. Developed strong analytical, communication, and creative thinking skills.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 */}
        <section id="craft" className="section content-section">
          <div className="content-block anim-text">
            <p className="content-label">03 / CRAFT</p>
            <h2 className="content-title">Frontend & Logic.</h2>
            <p className="content-p">Specialized in modern web tech: <strong>React.js, TypeScript, and Tailwind CSS</strong>. Deep knowledge of system programming in <strong>C and Python</strong> for automation and data analysis. Experienced in Git-based collaboration.</p>
            
            <div className="skills-grid">
              <div className="skill-badge">React.js</div>
              <div className="skill-badge">TypeScript</div>
              <div className="skill-badge">Tailwind CSS</div>
              <div className="skill-badge">Three.js</div>
              <div className="skill-badge">GSAP</div>
              <div className="skill-badge">Python</div>
              <div className="skill-badge">TensorFlow</div>
              <div className="skill-badge">Git</div>
              <div className="skill-badge">Lenis</div>
              <div className="skill-badge">Context API</div>
              <div className="skill-badge">MySQL</div>
              <div className="skill-badge">CNN</div>
              <div className="skill-badge">PHP</div>

            </div>
          </div>
        </section>

        {/* 04 */}
        <section id="innovation" className="section content-section">
          <div className="content-block right anim-text">
            <p className="content-label">04 / INNOVATION</p>
            <h2 className="content-title">AI & IoT Integration.</h2>
            <p className="content-p">Bridging the physical systems with intelligent computing. Specialized in deploying machine learning models for predictive analytics and developing end-to-end IoT network architectures for real-time monitoring.</p>
            
          </div>
        </section>

        {/* 05 */}
        <section id="projects" className="section content-section">
          <div className="content-block anim-text">
            <p className="content-label">05 / PROJECTS</p>
            <h2 className="content-title">Deployed Systems.</h2>
            
            <div className="project-grid">
              {projectsData.map(proj => (
                <div className="project-card" key={proj.id}>
                  <h3>{proj.title}</h3>
                  <p>{proj.short}</p>
                  <button className="project-link" onClick={() => setSelectedProject(proj)}>
                    View Details <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 06 */}
        <section id="about" className="section content-section">
          <div className="content-block right anim-text">
            <p className="content-label">06 / ABOUT ME</p>
            <h2 className="content-title">Beyond the Code.</h2>

                  
                  <p className="content-p" style={{ marginTop: '0.3rem', fontSize: '0.9rem' }}><strong>ML Internship — FreshoSoft</strong> trained CNN models for plant disease recognition under industry mentorship.</p>

            <p className="content-p" style={{ marginTop: '2rem' }}><strong>Interests:</strong> Machine Learning research, cycling, and acoustic guitar.</p>
            <p className="content-p" style={{ marginTop: '1rem' }}><strong>Languages:</strong> Multilingual fluency in English, Bengali, and Hindi.</p>
          </div>
        </section>

        {/* 07 */}
        <section id="contact" className="section content-section">
          <div className="content-block anim-text" style={{ marginTop: '10vh' }}>
            <p className="content-label">07 / CONTACT</p>
            <h2 className="content-title">Get In Touch.</h2>
            <p className="content-p" style={{ marginBottom: '3rem' }}>If you're looking for a passionate developer bridging frontend technologies and intelligent systems, feel free to reach out.</p>


            <div className="contact-links">
              <a href="../public/Manish_Das_Resume_updated.pdf" download className="social-btn resume-btn">
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

      </div>
      <GlobeLoader setStarted={setIsStarted} />

      {/* Full-Page Project Detail View */}
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
