import React from "react";
import { motion } from "framer-motion";

const WorkExperience = ({ experience }) => {
  return (
    <div className="w-full relative py-6 flex flex-col items-center z-10">
      <style>{`
        .washi-tape-1 {
          background-color: #94a3b8;
          background-image: linear-gradient(90deg, transparent 50%, rgba(255,255,255,.2) 50%);
          background-size: 10px 10px;
          opacity: 0.85;
          mix-blend-mode: multiply;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        .washi-tape-2 {
          background-color: #cbd5e1;
          opacity: 0.8;
          mix-blend-mode: multiply;
          box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        .paper-grid {
          background-color: #ffffff;
          background-image: 
            linear-gradient(#f1f5f9 1.5px, transparent 1.5px),
            linear-gradient(90deg, #f1f5f9 1.5px, transparent 1.5px);
          background-size: 24px 24px;
        }
      `}</style>

      {/* Wrapper */}
      <div className="relative w-full max-w-2xl px-4 md:px-0 mx-auto pb-12 mt-6">
        <motion.div 
          initial={{ opacity: 0, y: 30, rotate: -2 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative group"
        >
          {/* Single Huge Grid Paper */}
          <div className="relative px-6 py-8 md:px-10 md:py-10 paper-grid border border-neutral-200 shadow-[4px_12px_44px_rgba(0,0,0,0.08)] bg-white transition-transform duration-500 hover:scale-[1.01]"
               style={{ borderRadius: '3px 8px 4px 6px' }}>
            
            {/* Washi Tape top-left */}
            <div className="absolute -top-4 left-6 w-24 h-6 washi-tape-2 rotate-3 z-40 hidden sm:block"
                 style={{ clipPath: 'polygon(2% 10%, 98% 0%, 100% 85%, 0% 100%)' }} />
                 
            {/* Washi Tape bottom-right */}
            <div className="absolute -bottom-3 right-6 w-20 h-5 washi-tape-1 -rotate-2 z-40 hidden sm:block"
                 style={{ clipPath: 'polygon(1% 0%, 96% 2%, 100% 90%, 5% 100%)' }} />

            {/* Title INSIDE the paper */}
            <div className="relative mb-10 w-full flex justify-start z-30">
              <div 
                className="relative inline-block bg-[#171717] text-[#f8fafc] px-6 py-2.5 shadow-[2px_4px_8px_rgba(23,23,23,0.3)] -rotate-1"
                style={{ 
                  clipPath: 'polygon(1% 0%, 99% 2%, 100% 98%, 0% 100%)',
                }}
              >
                {/* Tape on title */}
                <div className="absolute -top-3 left-6 w-16 h-4 washi-tape-2 -rotate-2 z-30" style={{ clipPath: 'polygon(2% 10%, 98% 0%, 100% 90%, 0% 100%)' }}></div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-[0.15em] uppercase" style={{ fontFamily: "'Space Mono', monospace" }}>
                  Experience
                </h2>
              </div>
            </div>

            {/* Content List inside single paper */}
            <div className="relative z-10 flex flex-col gap-10 md:gap-12">
              
              {experience.map((item, index) => {
                // Neutral and masculine highlighter colors (Blue & Yellow)
                const highlightColor = index % 2 === 0 ? "bg-[#38bdf8]/30" : "bg-[#fde047]/50";
                const stickyRotate = index % 2 === 0 ? "rotate-4" : "-rotate-3";

                return (
                  <div key={item.id} className="relative flex flex-col items-start border-b-[2px] border-neutral-900/5 pb-10 md:pb-10 last:border-0 last:pb-0">
                    
                    {/* Header Flex Container to prevent text & date overlap */}
                    <div className="flex flex-row justify-between items-start w-full gap-4">
                      
                      {/* Company Name */}
                      <h3 className="text-2xl md:text-[34px] font-black leading-tight drop-shadow-sm text-neutral-900"
                          style={{ fontFamily: "'Space Grotesk', sans-serif", textTransform: 'uppercase' }}>
                        {item.company}
                      </h3>
                      
                      {/* Date Stamp / Sticky Note (No Overlap) */}
                      <div className="shrink-0 pt-1">
                        <div className={`bg-[#f1f5f9] px-3 py-1 md:py-1.5 border border-neutral-200 shadow-[2px_3px_8px_rgba(0,0,0,0.08)] ${stickyRotate}`}>
                          <span className="text-[9px] md:text-[11px] font-black tracking-widest text-[#1e293b] uppercase whitespace-nowrap"
                                style={{ fontFamily: "'Space Mono', monospace" }}>
                            {item.period}
                          </span>
                        </div>
                      </div>
                      
                    </div>
                    
                    {/* Job Role Typography with Highlighter Effect */}
                    <div className="relative inline-block mt-1 mb-5 md:mb-6">
                      <span className="relative z-10 text-[16px] md:text-[20px] font-bold tracking-wide text-neutral-700"
                            style={{ fontFamily: "'Caveat', cursive" }}>
                        {item.role}
                      </span>
                      {/* Hand-drawn style highlighter stroke */}
                      <div className={`absolute bottom-[2px] left-[-2%] w-[104%] h-[10px] opacity-90 ${highlightColor} -rotate-1 z-0`}></div>
                    </div>
                    
                    {/* Description Paragraph */}
                    <div className="relative w-full">
                      <span className="absolute -top-4 -left-4 text-5xl opacity-5 font-serif select-none pointer-events-none">"</span>
                      <p className="text-[14px] md:text-[15px] leading-relaxed max-w-[90%] md:max-w-[88%] text-neutral-600 font-medium relative z-10"
                         style={{ fontFamily: "'Inter', sans-serif" }}>
                        {item.description}
                      </p>
                    </div>

                    {/* Removed decorative star doodle */}
                  </div>
                );
              })}
            </div>

          </div>
        </motion.div>
      </div>

    </div>
  );
};

export default WorkExperience;
