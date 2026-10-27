import React, { useRef, useState, useEffect, useCallback } from 'react';

/**
 * MaskHoverReveal — Interactive cursor-tracking mask reveal effect.
 *
 * Layers:
 * - Base Layer: Dark, moody, high-contrast monochrome with subtle neon tint
 * - Reveal Layer: Full vibrant color portrait revealed dynamically through a radial gradient mask
 * - Cursor Spotlight: Glowing cyan/violet lens ring tracking mouse position with fluid spring physics
 */
export default function MaskHoverReveal({
  imageSrc = '/manish.png',
  revealSrc = '/manish.png',
  alt = 'Manish Das — Portrait',
  className = '',
  spotlightRadius = 180,
}) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [smoothCoords, setSmoothCoords] = useState({ x: 0, y: 0 });
  const animFrameRef = useRef(null);

  // Smooth lerp for fluid spotlight trailing
  useEffect(() => {
    let currentX = smoothCoords.x;
    let currentY = smoothCoords.y;

    const lerp = () => {
      const targetX = coords.x;
      const targetY = coords.y;

      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;

      setSmoothCoords({ x: currentX, y: currentY });
      animFrameRef.current = requestAnimationFrame(lerp);
    };

    animFrameRef.current = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [coords]);

  const handlePointerMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCoords({ x, y });
  }, []);

  const handlePointerEnter = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
    setSmoothCoords({ x, y });
    setIsHovered(true);
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const currentRadius = isHovered ? spotlightRadius : 0;

  // Mask styles for reveal layer
  const maskStyle = {
    WebkitMaskImage: `radial-gradient(circle ${currentRadius}px at ${smoothCoords.x}px ${smoothCoords.y}px, black 35%, transparent 100%)`,
    maskImage: `radial-gradient(circle ${currentRadius}px at ${smoothCoords.x}px ${smoothCoords.y}px, black 35%, transparent 100%)`,
    transition: isHovered
      ? 'none'
      : '-webkit-mask-image 0.5s ease-out, mask-image 0.5s ease-out',
  };

  return (
    <div
      ref={containerRef}
      className={`mask-reveal-wrapper ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {/* Outer ambient glow */}
      <div className="mask-reveal-glow" />

      {/* Decorative cyber corner brackets */}
      <div className="card-bracket br-tl" />
      <div className="card-bracket br-tr" />
      <div className="card-bracket br-bl" />
      <div className="card-bracket br-br" />

      {/* Frame container */}
      <div className="mask-reveal-frame">
        {/* 1. Base Layer: Monochrome / Cinematic dark duotone */}
        <div className="mask-reveal-layer layer-base">
          <img
            src={imageSrc}
            alt={alt}
            className="portrait-img base-img"
            loading="eager"
          />
          <div className="base-gradient-overlay" />
          <div className="scanline-overlay" />
        </div>

        {/* 2. Reveal Layer: Full vibrant color revealed through cursor mask */}
        <div
          className="mask-reveal-layer layer-reveal"
          style={maskStyle}
          aria-hidden="true"
        >
          <img
            src={revealSrc}
            alt=""
            className="portrait-img reveal-img"
            loading="eager"
          />
          <div className="reveal-vibrance-overlay" />
        </div>

        {/* 3. Cursor Lens Spotlight Ring */}
        <div
          className="mask-spotlight-lens"
          style={{
            left: `${smoothCoords.x}px`,
            top: `${smoothCoords.y}px`,
            width: `${currentRadius * 2}px`,
            height: `${currentRadius * 2}px`,
            opacity: isHovered ? 1 : 0,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="lens-crosshair" />
        </div>
      </div>
    </div>
  );
}
