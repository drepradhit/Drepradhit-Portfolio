import React from "react";
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
  return (
    <motion.div 
      className={`pc-polaroid-wrapper ${className}`.trim()}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Floating Tech Stack Icons - Naked Logos for maximum smoothness */}
      {featuredTools.map((tool, index) => {
        // Precise pre-calculated spread (Sides and Bottom only)
        const totalTools = featuredTools.length;
        const angle = (index / (totalTools - 1)) * Math.PI;
        
        // Clear distance to make sure they are fully visible (Card half-width is 190px)
        const distance = 280 + (index % 3) * 40;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        return (
          <motion.div
            key={tool.id}
            className="absolute z-0 w-14 h-14 flex items-center justify-center pointer-events-none will-change-transform"
            variants={{
              rest: { opacity: 0, scale: 0, x: 0, y: 0, rotate: 0 },
              hover: { 
                opacity: 1, 
                scale: 1, 
                x: x, 
                y: y,
                rotate: (index % 2 === 0 ? 12 : -12),
                transition: { 
                  type: "spring", 
                  stiffness: 150, 
                  damping: 15,
                  delay: index * 0.03 
                }
              }
            }}
          >
            {/* Logo with Bold White Sticker Stroke - Multi-side shadow for depth */}
            <img 
              src={tool.gambar} 
              alt={tool.nama} 
              className="w-full h-full object-contain" 
              style={{
                filter: "url(#sticker-outline) drop-shadow(0 4px 6px rgba(0,0,0,0.12))",
                WebkitFilter: "url(#sticker-outline) drop-shadow(0 4px 6px rgba(0,0,0,0.12))",
              }}
              title={tool.nama} 
            />
          </motion.div>
        );
      })}

      {/* HIDDEN SVG FILTER FOR BOLD STICKER OUTLINE */}
      <svg width="0" height="0" style={{ position: 'absolute', visibility: 'hidden' }}>
        <defs>
          <filter id="sticker-outline" x="-40%" y="-40%" width="180%" height="180%">
            {/* Expand alpha mask significantly for a bold sticker border */}
            <feMorphology in="SourceAlpha" result="dilated" operator="dilate" radius="3.5"/>
            
            {/* Fill expanded area with pure white */}
            <feFlood floodColor="white" result="whiteFill"/>
            <feComposite in="whiteFill" in2="dilated" operator="in" result="stroke"/>
            
            {/* Merge the stroke with the original logo */}
            <feMerge>
              <feMergeNode in="stroke"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
      </svg>

      <motion.div 
        className="pc-polaroid-card relative z-10"
        variants={{
          rest: { rotate: -1, scale: 1, y: 0 },
          hover: { 
            rotate: 0, 
            scale: 1.05, 
            y: -10,
            transition: { duration: 0.4, ease: "easeOut" }
          }
        }}
      >
        {/* Grain overlay */}
        <div className="pc-grain-overlay" />
        
        <div className="pc-photo-area">
          <img
            className="pc-avatar"
            src={avatarUrl}
            alt="UI UX Designer"
            loading="lazy"
          />
          <div className="pc-film-shine" />
        </div>
        
        <div className="pc-polaroid-info">
          {/* Only showing Drepradhit's Portfolio with project card font style */}
          <h3 className="pc-polaroid-name">Drepradhit's Portfolio</h3>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;

