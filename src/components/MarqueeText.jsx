import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MarqueeText({ text = 'DEVELOPER • DESIGNER • ENGINEER • INNOVATOR', speed = 40, direction = 'left' }) {
  const trackRef = useRef();

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Wait for layout
    requestAnimationFrame(() => {
      const firstSpan = track.querySelector('.marquee-span');
      if (!firstSpan) return;
      const width = firstSpan.offsetWidth;

      gsap.set(track, { x: direction === 'left' ? 0 : -width });
      gsap.to(track, {
        x: direction === 'left' ? -width : 0,
        duration: speed,
        ease: 'none',
        repeat: -1,
      });
    });
  }, [speed, direction]);

  const content = `${text} • `;

  return (
    <div className="marquee">
      <div className="marquee-track" ref={trackRef}>
        <span className="marquee-span">{content}</span>
        <span className="marquee-span">{content}</span>
        <span className="marquee-span">{content}</span>
        <span className="marquee-span">{content}</span>
      </div>
    </div>
  );
}
