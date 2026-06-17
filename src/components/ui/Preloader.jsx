import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const [showTagline, setShowTagline] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 1. Tagline delay
    const taglineTimer = setTimeout(() => setShowTagline(true), 800);
    
    // 2. Hide preloader timer
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2800);

    // 3. Callback on complete
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3200);

    // Canvas particle animation
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particles array
    const particles = [];
    const particleCount = 60;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = -Math.random() * 0.8 - 0.2; // Move upwards
        
        // Randomly choose between Gold and Crimson color for particles
        const isGold = Math.random() > 0.4;
        if (isGold) {
          this.color = `rgba(181, 142, 61, ${Math.random() * 0.35 + 0.15})`; // Soft Gold
        } else {
          this.color = `rgba(162, 28, 38, ${Math.random() * 0.3 + 0.1})`; // Soft Crimson Red
        }
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reset particle if it leaves the screen
        if (this.y < 0) {
          this.y = canvas.height;
          this.x = Math.random() * canvas.width;
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(250, 246, 238, 0.05)'; // Ivory background trail
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      clearTimeout(taglineTimer);
      clearTimeout(hideTimer);
      clearTimeout(completeTimer);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 w-full h-full bg-[#FAF6EE] z-[9999] flex flex-col items-center justify-center overflow-hidden"
          exit={{ 
            y: '-100vh',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Particles Background */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

          {/* Logo & Text container */}
          <div className="relative z-10 flex flex-col items-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="flex flex-col items-center mb-6"
            >
              <span className="text-[12px] md:text-sm uppercase tracking-[0.45em] text-[#B58E3D] font-bold mb-2 font-telugu">
                పరిచయం
              </span>
              <h1 className="font-playfair text-4xl md:text-6xl font-bold tracking-[0.25em] text-[#2A1A12]">
                CROSS ROADS
              </h1>
              <div className="w-24 h-[1px] bg-[#B58E3D]/50 my-3" />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#2A1A12]/60 font-semibold">
                Vijayawada
              </span>
            </motion.div>

            {/* Tagline */}
            <div className="h-12 flex items-center justify-center">
              <AnimatePresence>
                {showTagline && (
                  <motion.p
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 0.9, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="font-playfair italic text-sm md:text-lg text-[#A21C26] font-light tracking-wide max-w-sm"
                  >
                    "Not just a stop. It's a destination for flavour."
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Vignette effect */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#FAF6EE]/20 via-transparent to-[#FAF6EE]/20 opacity-80" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
