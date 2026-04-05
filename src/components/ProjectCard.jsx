import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { listTools } from "../data";

/**
 * High-fidelity App Store Portrait Card.
 * Refined absolute sizes for mobile to prevent layout constraints and overlap ("berantakan").
 */
export default function ProjectCard({ project, storageKey = "home_scroll" }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        sessionStorage.setItem(`${storageKey}_pos`, window.scrollY.toString());
        sessionStorage.setItem(`should_restore_${storageKey}`, "true");
        navigate(`/project/${project.slug}`);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.4 }}
            className="group relative flex flex-col bg-[#131316] rounded-[24px] md:rounded-[28px] overflow-hidden transition-all duration-500 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] cursor-pointer"
            onClick={handleNavigate}
        >
            {/* 1. CINEMATIC IMAGE - Adjusted height for grid proportions */}
            <div className="relative w-full h-[220px] sm:h-[240px] md:h-[260px] lg:h-[280px] overflow-hidden bg-neutral-900">
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-md text-[9px] font-black text-white/90 uppercase tracking-widest">
                    {project.year}
                  </span>
                </div>
            </div>

            {/* 2. DETAIL SECTION - Tightened padding for grid layout */}
            <div className="p-5 md:p-6 lg:p-7 flex flex-col">
                
                {/* Header: Icon | Title Block | GET Button */}
                <div className="flex items-center gap-3 w-full">
                    {/* Icon Container - Reduced for Grid */}
                    <div className="w-[52px] h-[52px] md:w-[56px] md:h-[56px] rounded-[20%] bg-white/5 flex items-center justify-center shrink-0 overflow-hidden relative shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
                         {project.techstack && project.techstack[0] ? (
                            <img 
                                src={listTools.find(t => t.nama.toLowerCase() === project.techstack[0].toLowerCase())?.gambar} 
                                className="w-[55%] h-[55%] object-contain"
                                alt="icon"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600" />
                        )}
                    </div>

                    {/* Meta Detail column */}
                    <div className="min-w-0 flex-1 flex flex-col justify-center mt-1.5">
                        <h3 className="text-[17px] sm:text-[18px] md:text-[20px] font-bold text-white tracking-tight leading-none mb-1 md:mb-1.5 truncate" style={{ fontFamily: "'Outfit', sans-serif" }}>
                            {project.title}
                        </h3>
                        <p className="text-[10px] md:text-[11px] text-white/40 font-semibold uppercase tracking-widest leading-tight mb-1 md:mb-1.5 truncate">
                            {project.category}
                        </p>
                        
                        {/* Rating Row */}
                        <div className="flex items-center gap-1.5 opacity-40">
                            <div className="flex items-center gap-0.5">
                                {[1,2,3,4,5].map(s => (
                                    <svg key={s} className="w-[8px] h-[8px] md:w-[9px] md:h-[9px] text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                                ))}
                                <span className="text-[9px] md:text-[10px] font-bold ml-0.5 text-white">4.9</span>
                            </div>
                            <div className="w-0.5 h-0.5 rounded-full bg-white/20" />
                            <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-tighter text-white/60">FEATURED</span>
                        </div>
                    </div>

                    {/* GET Button */}
                    <div className="shrink-0 flex items-center">
                        <motion.button 
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNavigate();
                            }}
                            className="bg-white/10 text-[#007aff] hover:bg-[#007aff] hover:text-white px-4 md:px-5 py-1.5 rounded-full text-[12px] md:text-[13px] font-bold tracking-tight transition-all duration-300"
                            whileTap={{ scale: 0.92 }}
                        >
                            GET
                        </motion.button>
                    </div>
                </div>

                {/* Subtitle / Descriptive Area */}
                <div className="mt-4 md:mt-5 pt-4 md:pt-5">
                    <p className="text-white/50 text-[13px] md:text-[14px] leading-relaxed line-clamp-2 md:line-clamp-3 font-medium">
                        {project.subtitle || project.description}
                    </p>
                </div>

                {/* Dynamic Rounded Pill Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                    {project.techstack && project.techstack.slice(0, 4).map((tech, i) => (
                        <span key={i} className="text-[9px] font-medium text-white/40 px-2.5 py-1 rounded-lg uppercase tracking-widest bg-transparent">
                            {tech}
                        </span>
                    ))}
                </div>

            </div>
        </motion.div>
    );
}
