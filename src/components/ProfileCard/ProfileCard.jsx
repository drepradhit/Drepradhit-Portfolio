import React from "react";
import { motion } from "framer-motion";

const ProfileCard = ({ avatarUrl = "./assets/andre.png", className = "" }) => {
  return (
    <div className={`relative flex items-center justify-center py-10 sm:py-20 ${className}`.trim()}>
      <div className="relative w-full max-w-[420px] aspect-[4/5]">
        
        {/* Bottom Stack Polaroid */}
        <div 
          className="absolute inset-0 bg-white p-5 pb-16 shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-neutral-100 rotate-[-6deg] -translate-x-3 -translate-y-2 z-10"
        >
          <div className="w-full h-full bg-neutral-50 shadow-inner overflow-hidden">
             <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-50 opacity-40" />
          </div>
        </div>

        {/* Middle Stack Polaroid */}
        <div 
          className="absolute inset-0 bg-white p-5 pb-16 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-neutral-100 rotate-[3deg] translate-x-4 translate-y-2 z-20"
        >
          <div className="w-full h-full bg-neutral-100 shadow-inner overflow-hidden">
             <div className="w-full h-full bg-gradient-to-tl from-neutral-200 to-neutral-100 opacity-30" />
          </div>
        </div>

        {/* Top/Primary Polaroid */}
        <motion.div 
          className="relative bg-white p-5 pb-14 shadow-[0_20px_70px_rgba(0,0,0,0.12)] border border-neutral-100 z-30 transform-gpu rotate-[-1deg]"
        >
          {/* Main Photo Area */}
          <div className="relative aspect-square w-full overflow-hidden bg-neutral-50 shadow-inner border border-neutral-100/30">
            <img 
              className="w-full h-full object-cover" 
              src={avatarUrl} 
              alt="Andre Pradhit" 
              loading="eager" 
            />
            {/* Inner frame shadow */}
            <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.03)] pointer-events-none" />
          </div>

          {/* Authentic Paper Texture Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/paper.png')]" />
        </motion.div>
      </div>
    </div>
  );
};

export default ProfileCard;
