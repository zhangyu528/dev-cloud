import { useEffect, useRef } from 'react';

const BinaryFlow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const binaryChars = '01';
    const columns = Math.floor(width / 20);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      if (!ctx) return;
      
      // Semi-transparent overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);
      
      // Set text style
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#6366f1'); // indigo-500
      gradient.addColorStop(1, '#9333ea'); // purple-600
      ctx.fillStyle = gradient;
      ctx.font = '16px monospace';

      // Draw binary characters
      for (let i = 0; i < drops.length; i++) {
        const text = binaryChars[Math.floor(Math.random() * binaryChars.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);
        
        // Reset drops
        if (drops[i] * 20 > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default BinaryFlow;
