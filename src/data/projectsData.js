export const projectsData = [
  {
    id: 1,
    title: "IoT Traffic Control & Smart Lighting",
    badge: "Award: Best Project — Brainware University 2024",
    year: "2024",
    short: "Real-time microcontroller sensor network with automated speed threshold enforcement and solar lighting.",
    desc: "An advanced hardware-software integration designed to monitor and manage traffic speed in real-time. By utilizing custom embedded sensors and microcontrollers, it analyzes traffic flow and dynamically adjusts signals to prevent congestion. Developed and demonstrated at the Brainware University Tech Showcase.",
    detailedDescription: [
      "Urban roadway management and municipal street lighting frequently suffer from dual inefficiencies: undetected vehicle speeding causing severe intersection hazards, and continuous full-wattage grid lighting wasting vast amounts of electrical energy. This project was developed as a cohesive hardware-software solution to solve both challenges simultaneously.",
      "At its core, the system coordinates a 10-sensor array spanning dual-checkpoint radar sensors, infrared proximity gates, and ambient photodetectors across Arduino Uno and ESP32 microcontrollers. As vehicles approach, precision hardware timers calculate instantaneous velocities against a strict 60 km/h calibrated threshold.",
      "When a speed violation is detected, the system immediately actuates physical warning gate barriers, snaps a camera-based violation record, and dispatches automated telemetry alerts to local monitoring stations in under 200 milliseconds. Concurrently, solar-powered LED arrays utilize PWM dimming logic to illuminate road sectors only when oncoming traffic is present, cutting street lighting energy consumption by 80–85% compared to conventional grid infrastructure."
    ],
    metrics: [
      { value: "10 Sensors", label: "Sensor Array", sub: "Ultrasonic, IR & Optical" },
      { value: "60 km/h", label: "Speed Threshold", sub: "Calibrated velocity gate" },
      { value: "80-85%", label: "Energy Cut", sub: "Solar adaptive street lamps" },
      { value: "<200ms", label: "Alert Dispatch", sub: "Instantaneous enforcement" }
    ],
    architecture: [
      {
        step: "01",
        title: "Sensory Ingestion",
        desc: "10-sensor checkpoint array measuring vehicle entry/exit microsecond deltas, ambient lux, and roadway occupancy."
      },
      {
        step: "02",
        title: "Microcontroller Firmware",
        desc: "Arduino Uno running C++ interrupt-driven timers for velocity calculation and hardware debounce filtering."
      },
      {
        step: "03",
        title: "Edge Gateway Telemetry",
        desc: "Wi-Fi enabled ESP32 broadcasting real-time JSON payloads over secure HTTP/WebSocket channels to central servers."
      },
      {
        step: "04",
        title: "Analytics & Actuation",
        desc: "Servo-actuated gate barrier locking, camera capture triggers, and Python-powered live traffic dashboard visualizations."
      }
    ],
    features: [
      {
        title: "Microsecond Precision Velocity Traps",
        desc: "Dual-checkpoint sensors trigger hardware interrupts in Arduino firmware, calculating speeds with sub-millisecond precision."
      },
      {
        title: "Solar-Powered Adaptive PWM Dimming",
        desc: "Intelligently elevates lighting levels from a 15% ambient glow to 100% full illumination as vehicles approach, maximizing solar battery life."
      },
      {
        title: "Automated Violation Interlock & Alerting",
        desc: "Over-speed infractions automatically trigger barrier arm movement, timestamped incident logging, and camera-based notifications."
      },
      {
        title: "Live Dashboard & Traffic Density Analytics",
        desc: "Browser-based dashboard visualizes live vehicle throughput, velocity frequency histograms, and peak-congestion trends."
      }
    ],
    challenges: [
      {
        challenge: "Sensor noise and environmental false triggers caused by rain, airborne debris, and vehicle suspension bounce.",
        solution: "Engineered hardware RC debounce filtering paired with a circular-buffer moving-average smoothing algorithm in C++ firmware, eliminating transient false-positive speed triggers."
      },
      {
        challenge: "Maintaining reliable real-time telemetry streaming from roadside microcontrollers across fluctuating Wi-Fi signals.",
        solution: "Implemented an offline ring-buffer queue on the ESP32 with automatic exponential-backoff retries, ensuring zero packet loss during network drops."
      }
    ],
    tech: ["C++", "Arduino", "ESP32", "Python Data Analytics", "Web Dashboards"],
    techUsage: {
      "C++": "Core firmware logic for Arduino Uno and ESP32 microcontrollers, handling hardware timers, sensor reads, and signal control.",
      "Arduino": "Hardware prototyping and sensor integration for real-time traffic monitoring nodes and servo actuator control.",
      "ESP32": "Wi-Fi enabled microcontroller transmitting live traffic telemetry and violation alerts to the central dashboard.",
      "Python Data Analytics": "Processing traffic flow streams, generating velocity distribution reports, and forecasting congestion windows.",
      "Web Dashboards": "Real-time browser-based visualization of traffic patterns, signal statuses, and emergency enforcement logs."
    },
    link: "#"
  },
  {
    id: 2,
    title: "Plant Disease Detection",
    badge: "Freshosoft ML Internship Project",
    year: "2025",
    short: "Full-stack AI system for image-based disease diagnosis with deep CNNs and dosage suggestions.",
    desc: "A machine learning oriented application that takes images of plant leaves from farmers via a web portal, processes them through a Convolutional Neural Network (CNN), and swiftly identifies possible diseases. It also suggests actionable treatments and organic chemical ratios.",
    detailedDescription: [
      "Early-stage detection of botanical pathogens is vital for global agricultural stability. Traditional diagnostics require agricultural field officers, which entails multi-day delays during which foliar fungal, bacterial, or viral blights can wipe out entire crop fields. This project delivers an automated, laboratory-grade vision classifier directly to farmers' mobile browsers.",
      "Developed during Manish's Machine Learning Internship at Freshosoft (October – December 2025), the application features a custom Convolutional Neural Network (CNN) trained and evaluated using TensorFlow, Keras, and Python. The model takes leaf photographs, applies OpenCV normalization, and evaluates multi-class probability distributions to identify specific crop diseases.",
      "Going beyond simple prediction, the system acts as an interactive agricultural advisor: it computes tailored chemical-to-organic remediation ratios and recommends precise treatment intervals to stop disease transmission without causing chemical leaf burn."
    ],
    metrics: [
      { value: "94.2%", label: "Test Accuracy", sub: "Production classification" },
      { value: "92.8%", label: "Precision Rate", sub: "Minimal false positives" },
      { value: "91.5%", label: "Recall Rate", sub: "High disease sensitivity" },
      { value: "1.2s", label: "Inference Latency", sub: "End-to-end diagnosis" }
    ],
    architecture: [
      {
        step: "01",
        title: "Image Upload & Normalization",
        desc: "Farmer submits a foliar photograph; OpenCV applies Gaussian denoising, aspect-ratio preservation, and tensor rescaling."
      },
      {
        step: "02",
        title: "Deep CNN Feature Extraction",
        desc: "Deep convolutional layers extract hierarchical features (edges, color distortions, necrosis patterns, and lesions)."
      },
      {
        step: "03",
        title: "Softmax Classification",
        desc: "Dense classification layers evaluate confidence scores across healthy vs. diseased plant pathogen categories."
      },
      {
        step: "04",
        title: "Remediation Synthesis",
        desc: "Flask API returns the verified diagnosis along with tailored chemical/organic treatment ratios and prevention steps."
      }
    ],
    features: [
      {
        title: "High-Accuracy Deep CNN Classifier",
        desc: "Trained on thousands of foliar pathology samples, achieving 94.2% accuracy in production environments."
      },
      {
        title: "OpenCV Computer Vision Pipeline",
        desc: "Automated preprocessing corrects uneven ambient sunlight, shadows, and angle skew before feeding tensors into the model."
      },
      {
        title: "Integrated Chemical & Organic Dosage Advisor",
        desc: "Provides calibrated treatment recipes (e.g. copper fungicide vs. neem oil extracts) based on the severity of leaf blight."
      },
      {
        title: "Zero-Setup Farmer Web Portal",
        desc: "Lightweight React web interface allowing farmers to drag-and-drop or take live camera photos with instantaneous feedback."
      }
    ],
    challenges: [
      {
        challenge: "Model overfitting on pristine laboratory photographs that failed when tested on dirty, shadowed real-world farm conditions.",
        solution: "Introduced an aggressive data augmentation pipeline (affine transformations, brightness jitter, Gaussian blur, and perspective warps) plus 30% dropout layers, boosting real-world generalization by 14%."
      },
      {
        challenge: "Serving large TensorFlow deep learning models with responsive sub-2s latency on low-cost server hardware.",
        solution: "Optimized model graph execution using Flask REST microservices, tensor batching, and lightweight inference workers, achieving a 1.2s round-trip response time."
      }
    ],
    tech: ["Python", "TensorFlow", "React", "Node.js", "Flask", "OpenCV", "CNN"],
    techUsage: {
      "Python": "Core language for ML model training scripts, data preprocessing pipelines, and Flask inference endpoints.",
      "TensorFlow": "Building, optimizing, and evaluating the deep Convolutional Neural Network (CNN) architecture.",
      "React": "Frontend user interface where farmers upload leaf photos and inspect visual diagnosis cards.",
      "Node.js": "API gateway handling user sessions, image file uploads, and diagnostic history tracking.",
      "Flask": "Lightweight Python microservice serving model weights with low-overhead inference endpoints.",
      "OpenCV": "Computer vision library utilized for Gaussian filtering, color-space normalization, and image augmentation.",
      "CNN": "Convolutional Neural Network architecture specialized in image classification and spatial lesion pattern recognition."
    },
    link: "https://github.com/Manish9163/PlantDiseaseSystem"
  },
  {
    id: 3,
    title: "Indian Wanderer",
    badge: "Enterprise Multi-Module Architecture",
    year: "2023 - 2024",
    short: "Platform for personalized itinerary planning, real-time GPS tracking, and multi-portal travel booking.",
    desc: "A comprehensive monolithic platform designed to transform the travel experience. Users can securely log in, build personalized daily trip itineraries, find budget-friendly activities, and track travel expenses in real-time.",
    detailedDescription: [
      "Indian Wanderer is an enterprise-scale travel and tour booking ecosystem engineered to service travelers, tour operators, and regional travel guides across 12 premier Indian destinations. Tackling the fragmented nature of traditional tour operators, it centralizes ticket reservations, personalized itinerary building, live GPS guide tracking, and budget accounting under one umbrella.",
      "The platform is architected across 6 independent codebases: a traveler portal built with React 18 and TypeScript, an administrative operations dashboard powered by Angular and Express, an on-ground tour guide companion app built with Next.js, and a centralized PHP/MySQL backend core with 12+ normalized relational tables enforcing 3NF integrity.",
      "Every step of the travel experience is addressed: travelers can compare ticket dates across a flexible 3-day window, pick specific seat types on an interactive cabin layout, apply pre-loaded promo codes with auto-discount suggestions, purchase tiered travel insurance, and accrue loyalty points across a 4-tier reward hierarchy."
    ],
    metrics: [
      { value: "6 Codebases", label: "Modular Systems", sub: "React, Angular, Next, PHP" },
      { value: "12+ Dest.", label: "Destinations Covered", sub: "Live tour tracking" },
      { value: "12+ Tables", label: "Normalized Schema", sub: "3NF relational integrity" },
      { value: "4 Tiers", label: "Loyalty Program", sub: "Silver to Diamond rewards" }
    ],
    architecture: [
      {
        step: "01",
        title: "Traveler Frontend (React + TS)",
        desc: "Parametric search engine with 6+ filters, visual seat map picker, and interactive 3-day fare comparison matrix."
      },
      {
        step: "02",
        title: "Admin Operations (Angular + Express)",
        desc: "Administrative portal managing tour operator verification, guide licensing, dispute handling, and revenue analytics."
      },
      {
        step: "03",
        title: "Guide Companion (Next.js)",
        desc: "SSR application utilizing HTML5 Geolocation API to stream real-time tour progress and itinerary check-ins."
      },
      {
        step: "04",
        title: "Relational Core (PHP + MySQL)",
        desc: "12+ normalized tables handling ACID booking transactions, promo validations, and 3-tier travel insurance."
      }
    ],
    features: [
      {
        title: "Advanced Parametric Search Engine",
        desc: "Filter trips by price range, departure time brackets, seat class, and operator ratings with instant clientside feedback."
      },
      {
        title: "Interactive Real-Time Seat Map",
        desc: "Visual vehicle seating chart illustrating real-time window, aisle, and middle seat availability with dynamic per-seat rate cards."
      },
      {
        title: "End-to-End Booking Lifecycle",
        desc: "Includes 5 pre-loaded promo codes, auto-discount suggestions, 3-tier travel insurance (Basic/Comprehensive/Premium), and dynamic cancellation refunds."
      },
      {
        title: "4-Tier Loyalty & Verified Reviews",
        desc: "Earn 1 point per ₹100 spent across Silver, Gold, Platinum, and Diamond tiers, paired with verified-purchase review scorecards."
      }
    ],
    challenges: [
      {
        challenge: "Maintaining synchronized data integrity and consistent state across 6 independent codebases and 3 distinct user roles.",
        solution: "Designed a centralized REST contract with strict JSON schema definitions and JWT role validation, decoupling frontend clients from database storage layers."
      },
      {
        challenge: "Seat allocation concurrency when multiple travelers attempt to checkout the same seat simultaneously.",
        solution: "Engineered temporary 5-minute optimistic reservation leases in MySQL with automatic expiration timers, preventing double-booking while giving users time to complete payment."
      }
    ],
    tech: ["PHP", "MySQL", "JavaScript", "React", "Bootstrap", "Angular", "Node.js", "Tailwind CSS", "Next.js", "TypeScript"],
    techUsage: {
      "PHP": "Server-side scripting handling business logic, payment verifications, and relational database queries.",
      "MySQL": "Relational database with 12+ normalized tables enforcing foreign keys and ACID transactional integrity.",
      "JavaScript": "Core language powering client-side interactivity, dynamic DOM updates, and custom filters.",
      "React": "Component-driven frontend architecture for the traveler booking portal and interactive seat layout.",
      "Bootstrap": "Responsive layout primitives and standardized UI components for rapid admin screen prototyping.",
      "Angular": "Robust framework powering the administrative back-office and vendor management console.",
      "Node.js": "Lightweight API microservice managing real-time guide location tracking and alert broadcasts.",
      "Tailwind CSS": "Utility-first design system ensuring modern typography, spacing, and responsive breakpoints.",
      "Next.js": "Server-side rendered guide portal delivering fast loading times and offline-ready trip itineraries.",
      "TypeScript": "Static typing across travel search, seat maps, and booking engines to prevent runtime errors."
    },
    link: "https://github.com/Manish9163/Indian-Wonderer-Website"
  },
  {
    id: 4,
    title: "Accessibility Checker",
    badge: "Chrome Extension & Web Auditing Tool",
    year: "2024",
    short: "Specialized browser auditing engine validating 50+ WCAG 2.1 compliance rules with visual overlays.",
    desc: "A browser-based auditing engine that validates DOM trees against modern Web Content Accessibility Guidelines (WCAG). It parses active code logic deeply to spotlight contrast violations, missing aria-labels, and improper interactive elements.",
    detailedDescription: [
      "Digital accessibility is a fundamental human right, yet over 95% of the world's top one million homepages fail basic Web Content Accessibility Guidelines (WCAG). Traditional enterprise auditing suites are cumbersome, expensive, and run asynchronously in the cloud. The Accessibility Checker was created as a zero-latency, privacy-first Chrome Extension and web engine that audits live DOM trees directly inside the user's browser.",
      "Built with React, TypeScript, and Chrome Extension APIs, the tool executes depth-first traversal of the active DOM tree. It inspects computed CSS styles, evaluates foreground-to-background contrast ratios (4.5:1 for normal text, 3:1 for large text), validates ARIA semantics, checks form label associations, and inspects interactive button tab sequences.",
      "Violations are categorized into four severity tiers (Critical, Serious, Moderate, Minor) and displayed with pinpoint visual highlight overlays directly on top of the live web page, complete with one-click copyable HTML remediation snippets."
    ],
    metrics: [
      { value: "50+ Rules", label: "WCAG 2.1 Checks", sub: "Level A, AA & AAA standards" },
      { value: "100%", label: "Client-Side Privacy", sub: "Zero DOM data sent to servers" },
      { value: "<150ms", label: "Audit Latency", sub: "Fast recursive DOM parsing" },
      { value: "4 Tiers", label: "Severity Sorting", sub: "Critical to Minor violations" }
    ],
    architecture: [
      {
        step: "01",
        title: "Content Script Injection",
        desc: "Non-destructive Chrome extension script safely attaching to active browser tabs without altering host page styles."
      },
      {
        step: "02",
        title: "Recursive Tree Inspection",
        desc: "Depth-first DOM traversal inspecting computed styles, element bounding rects, and semantic node hierarchies."
      },
      {
        step: "03",
        title: "WCAG Rule Evaluation",
        desc: "TypeScript rule engine executing 50+ algorithmic checks covering color contrast, ARIA landmarks, and focus order."
      },
      {
        step: "04",
        title: "Interactive Overlay & Reports",
        desc: "React dashboard providing visual element bounding boxes, code fix suggestions, and exportable audit reports."
      }
    ],
    features: [
      {
        title: "Real-Time Color Contrast Engine",
        desc: "Calculates WCAG 2.1 relative luminance ratios against solid colors, semi-transparent layers, and CSS background colors."
      },
      {
        title: "ARIA Semantics & Hierarchy Auditing",
        desc: "Spotlights invalid ARIA role combinations, orphan labels, unlabelled icon buttons, and non-sequential heading tags."
      },
      {
        title: "Keyboard Navigation & Focus Trap Detection",
        desc: "Identifies elements with negative tabindex traps, missing keyboard focus rings, and non-accessible click handlers."
      },
      {
        title: "Inline Remediation Snippets",
        desc: "Generates recommended code replacements in real-time, allowing developers to patch accessibility bugs immediately."
      }
    ],
    challenges: [
      {
        challenge: "Accurately calculating color contrast for text positioned over complex multi-layer CSS gradients or semi-transparent backdrops.",
        solution: "Engineered an optical background crawler that walks ancestor trees and blends computed RGBA values using alpha-compositing formulas to determine true perceived contrast."
      },
      {
        challenge: "Auditing massive modern single-page applications without blocking the browser main thread or causing UI jank.",
        solution: "Divided DOM traversal into chunked microtasks scheduled via requestIdleCallback and MutationObserver debouncing, ensuring 60 FPS page fluidity."
      }
    ],
    tech: ["React.js", "Chrome API", "DOM Parser", "WCAG 2.1 JS Rules", "TypeScript"],
    techUsage: {
      "React.js": "Frontend overlay panel rendering audit statistics, issue filters, and copyable code snippets.",
      "Chrome API": "Chrome Extension architecture for injecting content scripts, inspecting active tabs, and managing permissions.",
      "DOM Parser": "Recursive DOM tree traversal analyzing element attributes, bounding boxes, and computed styles.",
      "WCAG 2.1 JS Rules": "Custom TypeScript rule evaluation engine implementing 50+ WCAG Level A, AA, and AAA rules.",
      "TypeScript": "Type-safe definitions for audit violation schemas, DOM node metadata, and rule engine interfaces."
    },
    link: "https://github.com/Manish9163/accessbility-checker"
  },
  {
    id: 5,
    title: "FarmFi — AI Agri-Tech Ecosystem",
    badge: "Production-Shipped PWA",
    year: "2024 - 2025",
    short: "Full-stack AI agri-tech ecosystem with CNN disease diagnosis, XAI saliency maps, and ACID micro-marketplace.",
    desc: "A comprehensive AI-driven ecosystem aiming to revolutionize the agricultural sector. It leverages machine learning to provide actionable insights for crop management and integrates specialized financial tooling.",
    detailedDescription: [
      "FarmFi is an end-to-end agricultural technology ecosystem engineered to bridge smallholder farmers with artificial intelligence and digital financial tooling. Recognizing that undetected crop diseases cause up to 20-30% of annual harvest losses in regional farms, FarmFi delivers near real-time, browser-based leaf diagnostics coupled with an integrated marketplace for organic remedies, micro-loans, and fair-wage agricultural labor.",
      "Engineered as a Progressive Web Application (PWA) across 50+ React 18 components, the platform features JWT-secured authentication, a marketplace with ACID-compliant checkout flows, and a backend powered by Waitress WSGI with parallel worker threads and a normalized MySQL database enforcing SELECT FOR UPDATE row-level locks.",
      "The diagnostic core features a TensorFlow/Keras Convolutional Neural Network trained to classify 38 crop disease classes, achieving 93.2% accuracy on the test set. It features OpenCV-based Explainable AI (XAI) saliency maps to visually annotate which leaf regions triggered each prediction, fostering trust and active learning among farmers."
    ],
    metrics: [
      { value: "93.2%", label: "Model Accuracy", sub: "38 crop disease classes" },
      { value: "50+", label: "React Components", sub: "Modular PWA architecture" },
      { value: "38", label: "Disease Classes", sub: "CNN image classification" },
      { value: "XAI", label: "Explainability", sub: "OpenCV saliency maps" }
    ],
    architecture: [
      {
        step: "01",
        title: "PWA Client Layer (React 18 + Vite)",
        desc: "50+ modular components utilizing React Router v6, Tailwind CSS, and Context API delivering fast mobile-first interactions."
      },
      {
        step: "02",
        title: "Waitress WSGI Services (Flask)",
        desc: "8 parallel WSGI workers handling multi-part image ingestion, JWT authentication, and DoS-protected REST APIs."
      },
      {
        step: "03",
        title: "TensorFlow & XAI Engine",
        desc: "CNN model inference across 38 crop disease classes with OpenCV saliency heatmaps highlighting leaf disease vectors."
      },
      {
        step: "04",
        title: "ACID Transactional Persistence",
        desc: "Normalized MySQL schema executing SELECT FOR UPDATE row-level locks and Razorpay payment webhooks to prevent double-spending."
      }
    ],
    features: [
      {
        title: "AI Crop Disease Classification (38 Classes)",
        desc: "Achieves 93.2% accuracy, 92.8% precision, and 91.5% recall across 38 crop disease categories, outputting organic remediation ratios."
      },
      {
        title: "Explainable AI (XAI) Saliency Maps",
        desc: "Utilizes OpenCV to visually highlight leaf regions that triggered the AI diagnosis, building transparency and farmer confidence."
      },
      {
        title: "ACID Microcredit & Inventory Locking",
        desc: "Custom inventory management utilizing SELECT FOR UPDATE row-level database locks, preventing race conditions during concurrent checkouts."
      },
      {
        title: "Razorpay & Multi-Factor Authentication",
        desc: "Full Razorpay B2C/B2B payment processing with dual-channel MFA via Twilio SMS OTP and SMTP email verification."
      }
    ],
    challenges: [
      {
        challenge: "Preventing inventory double-spending and race conditions under concurrent agricultural seasonal demand.",
        solution: "Implemented strict ACID-compliant database transactions backed by MySQL row-level locking (SELECT FOR UPDATE) and connection pooling via Waitress WSGI to handle concurrent users reliably."
      },
      {
        challenge: "Building trust among rural farmers who are skeptical of opaque 'black-box' machine learning predictions.",
        solution: "Engineered an Explainable AI (XAI) pipeline using OpenCV to generate saliency maps that highlight the exact leaf pixel regions responsible for the disease classification."
      }
    ],
    tech: ["AI/ML", "React", "Python", "Data Science", "Flask", "TensorFlow", "MySQL"],
    techUsage: {
      "AI/ML": "Predictive models for crop disease classification, yield risk assessment, and regional market price analysis.",
      "React": "50+ component PWA dashboard featuring real-time diagnostic upload tools, inventory carts, and financial dashboards.",
      "Python": "Backend server logic, Waitress WSGI application runtime, and data processing pipelines.",
      "Data Science": "Statistical analysis of agricultural crop blights, rainfall correlation, and risk modeling.",
      "Flask": "REST API framework connecting trained ML models, authentication middleware, and database services.",
      "TensorFlow": "Building, fine-tuning, and evaluating the 38-class leaf disease classifier using CNN architectures.",
      "MySQL": "Relational database managing user credentials, farmer profiles, order ledgers, and inventory locks."
    },
    link: "https://github.com/Manish9163/FarmFi-an_AI_ecosytem"
  }
];
