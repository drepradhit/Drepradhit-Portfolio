import React from "react";
import { motion } from "framer-motion";

const WorkExperience = ({ experience }) => {
  return (
    <div className="w-full relative flex flex-col items-center z-10 pt-0">
      <div className="relative w-full max-w-2xl mx-auto pb-12 pt-0">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative group pt-0"
        >
          <div className="relative bg-white border border-neutral-200 shadow-[0_10px_40px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-300"
               style={{ borderRadius: '32px' }}>
            
            {/* iOS Notes Header Bar */}
            <div className="flex items-center justify-between px-8 pt-8 pb-6 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
              <div className="flex items-center gap-6">
                <button className="text-[#eab308] hover:opacity-70 transition-opacity">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
              </div>
              <div className="flex items-center gap-6">
                <button className="text-[#eab308] hover:opacity-70 transition-opacity">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                </button>
                <span className="text-[#eab308] font-semibold text-[17px] ml-2 cursor-pointer hover:opacity-70 transition-opacity">Done</span>
              </div>
            </div>

            <div className="px-8 md:px-12 pt-2 pb-12">
              <div className="relative mb-10 w-full flex justify-start z-30">
                <h2 className="text-3xl md:text-5xl font-bold text-[#1e293b]" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Experience
                </h2>
              </div>

              <div className="relative z-10 flex flex-col gap-6">
                {experience.map((item, index) => {
                  return (
                    <div key={item.id} className="relative border-b border-neutral-100 pb-6 last:border-0 last:pb-0">
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="text-[17px] font-bold text-black tracking-tight">
                          {item.company}
                        </h3>
                        <span className="text-[13px] font-medium text-neutral-400 uppercase tracking-tight">
                          {item.period}
                        </span>
                      </div>
                      
                      <div className="mb-2">
                        <span className="text-[15px] font-medium text-neutral-600">
                          {item.role}
                        </span>
                      </div>
                      
                      <p className="text-[14px] leading-[1.4] text-neutral-500 font-normal">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default WorkExperience;
