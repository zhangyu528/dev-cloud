import React, { useState, useEffect } from 'react';

export function InteractiveGradientOverlay() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        background: `radial-gradient(
          600px circle at ${mousePosition.x}px ${mousePosition.y}px, 
          rgba(29, 78, 216, 0.15), 
          transparent 80%
        )`
      }}
    >
      <div className="absolute inset-0 opacity-20 bg-grid-white/[0.04] dark:bg-grid-black/[0.04]"></div>
    </div>
  );
}