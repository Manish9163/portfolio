import React, { useState, useEffect, useRef } from 'react';

const phrases = [
  'ENGINEERING & DESIGN',
  'FRONTEND DEVELOPER',
  'AI & MACHINE LEARNING',
  'CREATIVE EXPERIENCES',
  'IOT SOLUTIONS',
];

const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const PAUSE_AFTER_TYPING = 1000;
const PAUSE_AFTER_DELETING = 400;

export default function TypingAnimation() {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const phraseIndex = useRef(0);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex.current];

    let delay;

    if (!isDeleting) {
      if (displayText === currentPhrase) {
        // Finished typing — pause then start deleting
        delay = PAUSE_AFTER_TYPING;
        const timeout = setTimeout(() => setIsDeleting(true), delay);
        return () => clearTimeout(timeout);
      }
      // Still typing
      delay = TYPING_SPEED;
      const timeout = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      if (displayText === '') {
        // Finished deleting — move to next phrase
        delay = PAUSE_AFTER_DELETING;
        const timeout = setTimeout(() => {
          phraseIndex.current = (phraseIndex.current + 1) % phrases.length;
          setIsDeleting(false);
        }, delay);
        return () => clearTimeout(timeout);
      }
      // Still deleting
      delay = DELETING_SPEED;
      const timeout = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length - 1));
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [displayText, isDeleting]);

  return (
    <span className="typing-animation">
      <span className="typing-text">{displayText}</span>
      <span className="typing-cursor" aria-hidden="true">|</span>
    </span>
  );
}
