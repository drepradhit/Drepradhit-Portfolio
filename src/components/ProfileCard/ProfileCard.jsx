import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const ProfileCard = ({ avatarUrl = "./assets/andre.jpg", className = "" }) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse mapping for 3D tilt effect on the whole stack (Primary hover)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e) => {
    if (!containerRef.current || window.innerWidth < 768) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <div 
      className={`relative w-[280px] sm:w-[350px] aspect-[4/6] flex items-center justify-center ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
      style={{ perspective: "1500px" }}
    >
      <motion.div 
        style={{ 
          rotateX, 
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
          backfaceVisibility: "hidden"
        }}
        className="relative w-[240px] sm:w-[300px] aspect-[4/5] cursor-default pointer-events-none"
      >
        {/* Layer 1: Bottom Photo (Offset & Rotated) */}
        <motion.div 
           className="absolute inset-0 bg-white shadow-xl rounded-sm border border-neutral-100 flex items-center justify-center overflow-hidden"
           animate={{ 
             rotate: isHovered ? -12 : -8,
             x: isHovered ? -25 : -15,
             y: isHovered ? 15 : 10,
             opacity: isHovered ? 0.8 : 0.6,
             scale: isHovered ? 1.05 : 1
           }}
           transition={{ type: "spring", stiffness: 100, damping: 15 }}
           style={{ 
             transform: "translateZ(-60px)",
             willChange: "transform, opacity",
             backfaceVisibility: "hidden"
           }}
        >
           <img src={avatarUrl} alt="bg-1" className="w-full h-full object-cover grayscale-[0.5]" />
        </motion.div>

        {/* Layer 2: Grid/Doc Paper (Offset & Rotated opposite) */}
        <motion.div 
           className="absolute inset-0 bg-[#f9f9f9] shadow-lg rounded-sm border border-neutral-100 flex flex-col p-4"
           animate={{ 
             rotate: isHovered ? 10 : 6,
             x: isHovered ? 25 : 15,
             y: isHovered ? -10 : -5,
             scale: isHovered ? 1.02 : 1
           }}
           transition={{ type: "spring", stiffness: 110, damping: 16 }}
           style={{ 
             transform: "translateZ(-30px)",
             willChange: "transform",
             backfaceVisibility: "hidden"
           }}
        >
           <div className="w-full h-full border border-neutral-200/50 relative overflow-hidden" style={{ backgroundImage: "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)", backgroundSize: "15px 15px" }}>
              <span className="absolute top-2 left-2 text-[10px] font-black text-neutral-300 uppercase tracking-tighter opacity-50">Viz. 04</span>
           </div>
        </motion.div>

        {/* Layer 3: Main Polaroid Photo */}
        <motion.div 
          animate={{ 
             scale: isHovered ? 1.08 : 1,
             z: isHovered ? 40 : 1 // Keep 1 instead of 0 to prevent z-fighting flicker
          }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          style={{ 
            willChange: "transform",
            backfaceVisibility: "hidden"
          }}
          className="absolute inset-0 bg-white p-3 shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-neutral-100 flex flex-col"
        >
          {/* Internal Photo Frame */}
          <div className="relative h-full overflow-hidden rounded-[2px]" style={{ backfaceVisibility: "hidden" }}>
            <img 
              className="w-full h-full object-cover transition-all duration-700" 
              src={avatarUrl} 
              alt="Andre Pradhit" 
            />
            {/* Soft inner shadow on the photo */}
            <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.1)]" />
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default ProfileCard;
