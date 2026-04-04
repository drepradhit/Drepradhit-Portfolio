import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ToolsExplorer({ tools }) {
  const [currentPage, setCurrentPage] = useState(0);
  
  const itemsPerPage = 9;
  const totalPages = Math.ceil(tools.length / itemsPerPage);
  const currentTools = tools.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const paginate = (direction) => {
    const next = (currentPage + direction + totalPages) % totalPages;
    setCurrentPage(next);
  };

  return (
    <div className="w-full flex flex-col items-center max-w-[360px] mx-auto lg:mx-0 mt-12 group select-none">
      
      {/* Container with a subtle "Wallpaper" glow to make white text pop */}
      <div className="relative w-full p-10 flex flex-col items-center rounded-[60px] overflow-hidden">
        {/* Dynamic Wallpaper Glow (Like an iOS wallpaper) */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 via-[#e5e5ea] to-neutral-300 opacity-80" />
        <div className="absolute top-[-10%] right-[-10%] w-60 h-60 bg-blue-400/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-60 h-60 bg-yellow-400/20 blur-[100px] rounded-full" />

        {/* iOS Folder Heading - Bold & Centered (White) */}
        <h3 className="relative z-10 text-[32px] font-bold text-white mb-8 tracking-tight text-center w-full drop-shadow-sm">
          Tech Stack
        </h3>

        {/* iOS Folder - Extreme Frosted Glass */}
        <div className="relative z-10 w-full aspect-square bg-white/10 backdrop-blur-[60px] rounded-[52px] border border-white/20 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.1)] flex flex-col items-center">
          
          {/* Glass Gloss (Top highlight) */}
          <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-[52px] pointer-events-none" />

          {/* 3x3 Exact Icons Grid */}
          <div className="w-full h-full relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, scale: 0.85, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="grid grid-cols-3 gap-x-2 gap-y-12 h-full w-full content-start pt-2"
              >
                {currentTools.map((tool) => (
                  <div key={tool.id} className="flex flex-col items-center gap-2">
                    {/* iOS App Square */}
                    <motion.div 
                      className="w-[66px] h-[66px] sm:w-[74px] sm:h-[74px] bg-white rounded-[18px] shadow-[0_10px_25px_rgba(0,0,0,0.08)] flex items-center justify-center p-3 relative overflow-hidden active:scale-90 transition-transform"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img 
                        src={tool.gambar} 
                        alt={tool.nama} 
                        className="w-full h-full object-contain pointer-events-none drop-shadow-sm" 
                      />
                      {/* Subtle gloss on icon */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
                    </motion.div>
                    
                    {/* iOS White Label */}
                    <span className="text-[12px] font-medium text-white tracking-tight text-center w-full truncate px-1 drop-shadow-sm">
                      {tool.nama}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination Interaction Mask */}
          {totalPages > 1 && (
            <div className="absolute inset-0 z-20 flex">
              <div className="w-1/3 h-full cursor-pointer" onClick={() => paginate(-1)} />
              <div className="w-1/3 h-full pointer-events-none" />
              <div className="w-1/3 h-full cursor-pointer" onClick={() => paginate(1)} />
            </div>
          )}

          {/* iOS White Pagination Dots */}
          <div className="absolute bottom-6 left-0 w-full flex justify-center gap-2 z-30">
            {[...Array(totalPages)].map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentPage ? 'bg-white scale-125' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
