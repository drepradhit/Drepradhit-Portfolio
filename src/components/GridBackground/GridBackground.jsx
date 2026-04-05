import React, { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const GridBackground = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for the spotlight
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] bg-[#fdfdfd] overflow-hidden">
      
      {/* 1. LAYER: MAIN GRID (Large) */}
      <div 
        className="absolute inset-0 opacity-[0.06] pattern-grid"
        style={{
          backgroundImage: `
            linear-gradient(#1a1a1a 1px, transparent 1px),
            linear-gradient(90deg, #1a1a1a 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* 2. LAYER: SUB-GRID (Smaller) */}
      <div 
        className="absolute inset-0 opacity-[0.03] pattern-grid-sub"
        style={{
          backgroundImage: `
            linear-gradient(#1a1a1a 1px, transparent 1px),
            linear-gradient(90deg, #1a1a1a 1px, transparent 1px)
          `,
          backgroundSize: '15px 15px'
        }}
      />

      {/* 3. LAYER: INTERACTIVE SPOTLIGHT */}
      <motion.div 
         className="absolute inset-0 z-[2] opacity-60"
         style={{
            background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.05), transparent 85%)`,
            '--mouse-x': `${smoothX}px`, 
            '--mouse-y': `${smoothY}px`,
         }}
      />

      {/* 4. LAYER: BASE GRADIENTS for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/20 via-transparent to-purple-50/20" />
      
      {/* 5. LAYER: VIGNETTE (Focus center) */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.02)]" />
      
      <style>{`
        .pattern-grid {
          mask-image: radial-gradient(circle 800px at center, black, transparent);
        }
      `}</style>
    </div>
  );
};

export default GridBackground;
