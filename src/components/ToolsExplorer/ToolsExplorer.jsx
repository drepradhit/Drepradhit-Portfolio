import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Pseudo-random rotations for organic feel
const rotations = [-3, 2, -1, 3, -2, 1, -3, 2, -1, 3, -2, 1];

export default function ToolsExplorer({ tools }) {
  const [activeTab, setActiveTab] = useState('All');

  const getFilteredTools = () => {
    return tools;
  };

  const filteredTools = getFilteredTools();

  return (
    <div className="w-full max-w-5xl mx-auto pt-10 px-4 md:px-0">
      <div className="relative min-h-[400px]">
        
        {/* Retro Header - Now in normal flow to prevent collisions */}
        <div className="flex flex-col items-center md:items-start mb-16 md:mb-20">
          <div className="group cursor-default relative">
            <div className="flex items-center">
               <h3 
                className="text-4xl md:text-5xl text-neutral-800/80 -rotate-2 whitespace-nowrap"
                style={{ fontFamily: "'Caveat', cursive" }}
               >
                # tools
               </h3>
            </div>
            <div className="w-32 h-[2px] bg-amber-400/40 mt-1 -ml-2 -rotate-1" />
          </div>
        </div>

        {/* Retro Starburst Doodle - Still floating but moved slightly */}
        <div className="absolute top-0 right-10 pointer-events-none opacity-20 hidden md:block rotate-12">
          <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor" className="text-neutral-900">
            <path d="M50 0 L55 40 L95 45 L55 50 L50 90 L45 50 L5 45 L45 40 Z" />
          </svg>
        </div>

        {/* Hand-drawn Arrow SVG - Still floating far left */}
        <div className="absolute top-40 -left-16 text-neutral-300/40 pointer-events-none hidden xl:block rotate-12">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 12h18m0 0l-7-7m7 7l-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-1 ml-1 opacity-50" style={{ fontFamily: "'Caveat', cursive" }}>
            my digital stack
          </p>
        </div>

        {/* Tools Grid - Flowing naturally after the header */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-x-4 gap-y-12 sm:gap-x-6 sm:gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool, index) => {
              const rotation = rotations[index % rotations.length];
              
              return (
                <motion.div
                  key={tool.id}
                  layout
                  initial={{ opacity: 0, scale: 0.7, rotate: rotation * 2 }}
                  animate={{ opacity: 1, scale: 1, rotate: rotation }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25, delay: index * 0.03 }}
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: 0, 
                    y: -10,
                    zIndex: 20,
                    transition: { duration: 0.2 } 
                  }}
                  className="flex flex-col items-center group cursor-pointer relative"
                >
                  <div className="relative transition-all duration-300">
                    {/* Icon with Sticker Effect */}
                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center mb-3">
                      <img 
                        src={tool.gambar} 
                        alt={tool.nama} 
                        className="w-full h-full object-contain transition-transform duration-300"
                        style={{
                          filter: "url(#tools-sticker-outline) drop-shadow(0 4px 6px rgba(0,0,0,0.12))",
                          WebkitFilter: "url(#tools-sticker-outline) drop-shadow(0 4px 6px rgba(0,0,0,0.12))",
                        }} 
                      />
                    </div>

                    {/* Name - handwritten style floating */}
                    <p 
                      className="text-[10px] sm:text-xs md:text-sm text-center text-neutral-500 font-medium tracking-wide group-hover:text-neutral-900 transition-colors"
                      style={{ fontFamily: "'Caveat', cursive" }}
                    >
                      {tool.nama}
                    </p>
                    
                    {/* Subtle sketch underline on hover */}
                    <motion.div 
                      className="w-0 h-[1px] bg-amber-400 group-hover:w-full mx-auto mt-0.5 transition-all duration-300" 
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* HIDDEN SVG FILTER FOR BOLD STICKER OUTLINE (MATCHING HERO SECTION) */}
        <svg width="0" height="0" style={{ position: 'absolute', visibility: 'hidden' }}>
          <defs>
            <filter id="tools-sticker-outline" x="-40%" y="-40%" width="180%" height="180%">
              {/* Expand alpha mask for a bold white border */}
              <feMorphology in="SourceAlpha" result="dilated" operator="dilate" radius="3.5"/>
              
              {/* Fill the area with pure white */}
              <feFlood floodColor="white" result="whiteFill"/>
              <feComposite in="whiteFill" in2="dilated" operator="in" result="stroke"/>
              
              {/* Merge original logo on top of the stroke */}
              <feMerge>
                <feMergeNode in="stroke"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}
