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
    <div 
      className={`pc-polaroid-wrapper ${className}`.trim()}
      style={{ padding: isUltraMobile ? "40px" : "60px" }}
    >


      <div 
        className="pc-polaroid-card relative z-10"
        style={{ transform: "rotate(-1deg)" }}
      >
        <div className="pc-grain-overlay" />
        <div className="pc-photo-area">
          <img className="pc-avatar" src={avatarUrl} alt="UI UX Designer" loading="lazy" />
          <div className="pc-film-shine" />
        </div>
        <div className="pc-polaroid-info">
          <h3 className="pc-polaroid-name">Open to Work!</h3>
        </div>
      </div>
    </div>
  );
};


const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
