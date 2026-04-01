import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { listTools } from "../../data";
import "./ProfileCard.css";

// Explicitly select and prioritize tools for the hover burst as requested
const featuredTools = [
  listTools.find(t => t.nama === "React JS"),
  listTools.find(t => t.nama === "Next JS"),
  listTools.find(t => t.nama === "Javascript"),
  listTools.find(t => t.nama === "TypeScript"),
  listTools.find(t => t.nama === "Tailwind"),
  listTools.find(t => t.nama === "Figma"),
  listTools.find(t => t.nama === "PostgreSQL"),
  listTools.find(t => t.nama === "HTML")
].filter(Boolean); // Ensure no nulls if naming mismatch

const ProfileCardComponent = ({
  avatarUrl = "./assets/andre.jpg",
  className = "",
}) => {
  const [isBurstActive, setIsBurstActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchMode, setIsTouchMode] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const checkTouchMode = () => {
      if (typeof window === "undefined") return false;
      
      // If the browser natively reports having a fine-grained pointer (mouse/trackpad),
      // we ALWAYS treat it as a Desktop without touch-first UI, EVEN on touchscreen laptops.
      const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      if (hasMouse) return false;

      // If no fine pointer is definitively found, fallback to Touch detection (iPads, Phones)
      const hasTouch = ('ontouchstart' in window || navigator.maxTouchPoints > 0);
      return hasTouch || window.innerWidth < 1024;
    };

    setIsTouchMode(checkTouchMode());

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setIsTouchMode(checkTouchMode());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isUltraMobile = windowWidth < 480;
  const isTabletArea = windowWidth >= 480 && windowWidth < 1024;
  const isDesktopArea = windowWidth >= 1024;

  const handleInteraction = (e) => {
    if (isTouchMode) {
      e.stopPropagation();
      setIsBurstActive(!isBurstActive);
    }
  };

  return (
    <motion.div 
      className={`pc-polaroid-wrapper ${className}`.trim()}
      initial="rest"
      whileHover={!isTouchMode ? "hover" : ""}
      animate={isBurstActive ? "hover" : "rest"}
      onClick={handleInteraction}
      onMouseEnter={() => !isTouchMode && setIsHovered(true)}
      onMouseLeave={() => !isTouchMode && setIsHovered(false)}
      style={{ padding: isUltraMobile ? "40px" : "60px" }}
    >
      {/* Floating Tech Stack Icons - Calibrated for PERFECT VISIBILITY */}
      {featuredTools.map((tool, index) => {
        const totalTools = featuredTools.length;
        const angle = (index / (totalTools - 1)) * Math.PI;
        
        let distance = 300; 
        if (isUltraMobile) distance = 160;
        else if (isTabletArea) distance = 200;
        
        distance += (index % 3) * (isUltraMobile ? 12 : 20);
        
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return (
          <motion.div
            key={tool.id}
            className={`absolute z-0 ${isUltraMobile ? 'w-10 h-10' : 'w-14 h-14'} flex items-center justify-center pointer-events-none will-change-transform`}
            variants={{
              rest: { opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 },
              hover: { 
                opacity: 1, 
                scale: 1, 
                x: x, 
                y: y,
                rotate: (index % 2 === 0 ? 12 : -12),
                transition: { type: "spring", stiffness: 150, damping: 15, delay: index * 0.02 }
              }
            }}
          >
            <img 
              src={tool.gambar} 
              alt={tool.nama} 
              className="w-full h-full object-contain" 
              style={{
                filter: "url(#sticker-outline) drop-shadow(0 4px 6px rgba(0,0,0,0.12))",
                WebkitFilter: "url(#sticker-outline) drop-shadow(0 4px 6px rgba(0,0,0,0.12))",
              }}
            />
          </motion.div>
        );
      })}

      <svg width="0" height="0" style={{ position: 'absolute', visibility: 'hidden' }}>
        <defs>
          <filter id="sticker-outline" x="-40%" y="-40%" width="180%" height="180%">
            <feMorphology in="SourceAlpha" result="dilated" operator="dilate" radius="3.5"/>
            <feFlood floodColor="white" result="whiteFill"/>
            <feComposite in="whiteFill" in2="dilated" operator="in" result="stroke"/>
            <feMerge><feMergeNode in="stroke"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
      </svg>

      <motion.div 
        className="pc-polaroid-card relative z-10"
        variants={{
          rest: { rotate: -1, scale: 1, y: 0 },
          hover: { rotate: 0, scale: 1.05, y: -10, transition: { duration: 0.4, ease: "easeOut" } }
        }}
      >
        <div className="pc-grain-overlay" />
        <div className="pc-photo-area">
          <img className="pc-avatar" src={avatarUrl} alt="UI UX Designer" loading="lazy" />
          <div className="pc-film-shine" />
        </div>
        <div className="pc-polaroid-info">
          <h3 className="pc-polaroid-name">Drepradhit's Portfolio</h3>
        </div>
      </motion.div>

      {/* DISCOVERY HINT - SAFELY POSITIONED WITHIN BOUNDS TO PREVENT CROP */}
      {((isTouchMode && !isBurstActive) || (!isTouchMode && !isHovered)) && (
        <div className={`absolute z-30 pointer-events-none flex flex-col items-center 
          ${!isTouchMode 
            ? 'left-[95%] top-1/2 -translate-y-1/2' 
            : 'left-[90%] sm:left-[95%] top-[65%] -translate-y-1/2'
          }`}
        >
          <span 
            className={`text-neutral-700 ${isUltraMobile ? 'text-lg' : 'text-2xl'} font-bold tracking-wide`}
            style={{ fontFamily: "'Caveat', cursive", lineHeight: 1 }}
          >
            {isTouchMode ? "Tap Me!" : "Hover Me!"}
          </span>
          <svg width={isUltraMobile ? "35" : "60"} height={isUltraMobile ? "35" : "60"} viewBox="0 0 45 40" fill="none" xmlns="http://www.w3.org/2000/svg" 
            className={`text-neutral-400 ${isUltraMobile ? '-translate-x-1' : '-translate-x-3'}`}
          >
            <path d="M40 35 C35 25 25 15 10 5 M10 5 L18 6 M10 5 L11 13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}


    </motion.div>
  );
};


const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
