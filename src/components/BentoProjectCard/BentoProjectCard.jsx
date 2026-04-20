import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { listTools } from '../../data';
import { FiArrowUpRight, FiGithub, FiExternalLink, FiCode, FiLayers } from 'react-icons/fi';

const TypingCode = ({ code }) => {
  const [displayedCode, setDisplayedCode] = useState("");
  const [index, setIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && index < code.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode(prev => prev + code[index]);
        setIndex(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [index, code, isInView]);

  return (
    <pre ref={ref} className="text-[10px] md:text-[11px] font-mono text-blue-400/80 leading-relaxed overflow-hidden">
      <code>{displayedCode}<span className="animate-pulse">_</span></code>
    </pre>
  );
};

export default function BentoProjectCard({ project, scrollKey = "home_scroll" }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigate = () => {
    sessionStorage.setItem(`${scrollKey}_pos`, window.scrollY.toString());
    sessionStorage.setItem(`should_restore_${scrollKey}`, "true");
    navigate(`/project/${project.slug}`);
  };

  const projectTools = project.techstack
    ? project.techstack.map(name => listTools.find(t => t.nama.toLowerCase() === name.toLowerCase())).filter(Boolean)
    : [];

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onClick={handleNavigate}
        className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm active:scale-[0.98] transition-all"
      >
        <div className="aspect-video overflow-hidden bg-neutral-100">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-xl font-bold text-neutral-900 leading-tight">{project.title}</h3>
              <p className="text-sm text-neutral-500 font-medium">{project.category} · {project.year}</p>
            </div>
            <div className="p-2 bg-neutral-900 rounded-lg text-white">
              <FiArrowUpRight size={18} />
            </div>
          </div>
          <p className="text-neutral-600 text-sm leading-relaxed line-clamp-2">{project.subtitle}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-[1000px] mx-auto mb-20 group">
      <div className="grid grid-cols-12 gap-4 auto-rows-[160px]">
        
        {/* Main Preview Tile */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           onClick={handleNavigate}
           className="col-span-12 md:col-span-7 row-span-2 relative bg-neutral-100 rounded-2xl overflow-hidden border border-neutral-200 cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500"
        >
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-8 left-8 text-white">
             <div className="flex items-center gap-2 mb-2">
               <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-md text-[10px] font-bold uppercase tracking-widest">{project.category}</span>
               <span className="px-3 py-1 bg-blue-500/80 backdrop-blur-sm rounded-md text-[10px] font-bold uppercase tracking-widest">{project.year}</span>
             </div>
             <h3 className="text-3xl font-black tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>{project.title}</h3>
          </div>
        </motion.div>

        {/* Info Tile */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
           className="col-span-12 md:col-span-5 row-span-1 bg-white rounded-2xl p-6 border border-neutral-200 shadow-sm flex flex-col justify-center"
        >
           <h4 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Project Brief</h4>
           <div className="overflow-hidden">
               <p className="text-neutral-600 text-[13px] leading-relaxed font-medium line-clamp-3">
                 {project.subtitle}
               </p>
           </div>
        </motion.div>

        {/* Code Preview Tile */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
           className="col-span-12 md:col-span-5 row-span-1 bg-[#0d0d0d] rounded-2xl p-5 border border-white/5 relative overflow-hidden group/terminal"
        >
           <div className="flex items-center gap-1.5 mb-3 opacity-30">
               <div className="w-2 h-2 rounded-md bg-[#ff5f57]" />
               <div className="w-2 h-2 rounded-md bg-[#ffbd2e]" />
               <div className="w-2 h-2 rounded-md bg-[#28c840]" />
               <span className="ml-2 text-[9px] font-mono text-white/30 uppercase tracking-widest">Logic.js</span>
               <FiCode className="ml-auto text-white" size={14} />
           </div>
           <div className="overflow-hidden h-[90px]">
               <TypingCode code={project.codeSnippet || "// Code unavailable"} />
           </div>
           <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        </motion.div>

        {/* Tech Stack Tile */}
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
           className="col-span-12 md:col-span-4 row-span-1 bg-neutral-900 rounded-2xl p-6 border border-white/5 shadow-2xl flex flex-col relative overflow-hidden"
        >
           {/* Decorative Background Glow */}
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 blur-[50px] rounded-md pointer-events-none" />
           
           <div className="flex items-center justify-between mb-5 relative z-10">
             <div className="flex items-center gap-2">
                <FiLayers className="text-blue-400" size={14} />
                <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Stack</h4>
             </div>
             <span className="text-[9px] font-bold text-white/20 uppercase tracking-tighter">Tools I Use</span>
           </div>

           <div className="grid grid-cols-4 gap-3 relative z-10">
             {projectTools.slice(0, 4).map((tool, index) => (
                <div 
                  key={index} 
                  title={tool.nama} 
                  className={`aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all group/icon cursor-default ${
                    tool.nama.toLowerCase() === 'gsap' ? 'p-1.5' : 'p-2.5'
                  }`}
                >
                   <img 
                     src={tool.gambar} 
                     alt={tool.nama} 
                     className={`w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] transition-transform duration-300 group-hover:rotate-3 ${
                       tool.nama.toLowerCase() === 'gsap' ? 'scale-110 group-hover:scale-125' : 'group-hover:scale-110'
                     }`} 
                   />
                </div>
             ))}
           </div>
           
           <div className="mt-auto pt-4 relative z-10">
              <div className="h-[2px] w-full bg-white/5 rounded-md overflow-hidden">
                 <motion.div 
                   initial={{ width: 0 }}
                   whileInView={{ width: "100%" }}
                   transition={{ duration: 1.5, delay: 0.5 }}
                   className="h-full bg-gradient-to-r from-blue-500/50 to-blue-400" 
                 />
              </div>
           </div>
        </motion.div>

        {/* Action Tile */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
           className="col-span-12 md:col-span-8 row-span-1 flex items-center justify-start"
        >
           <button 
             onClick={handleNavigate}
             className="w-full sm:w-auto px-8 py-4 bg-neutral-900 text-white rounded-lg text-[14px] font-bold flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-xl"
           >
             View Project
             <FiArrowUpRight size={18} />
           </button>
        </motion.div>

      </div>
    </div>
  );
}
