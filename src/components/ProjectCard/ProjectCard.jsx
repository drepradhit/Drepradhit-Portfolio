import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { listTools } from "../../data";

/**
 * Shared ProjectCard component used across Homepage and Showcase Gallery
 * to ensure 100% visual consistency and layout parity.
 * 
 * @param {Object} project - The project data
 * @param {string} scrollKey - Key used for scroll restoration (e.g., 'home' or 'showcase')
 */
export default function ProjectCard({ project, scrollKey = "home" }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        sessionStorage.setItem(`${scrollKey}_scroll_pos`, window.scrollY.toString());
        sessionStorage.setItem(`should_restore_${scrollKey}_scroll`, "true");
        navigate(`/project/${project.slug}`);
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.3 }}
            className="group relative flex flex-col md:flex-row bg-white/80 backdrop-blur-xl rounded-[32px] overflow-hidden border border-neutral-100 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.06)] transition-all duration-500 cursor-pointer"
            onClick={handleNavigate}
        >
            {/* Project Cover */}
            <div className="relative w-full md:w-[40%] h-[240px] md:h-auto overflow-hidden bg-neutral-900 border-r border-neutral-100/50">
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover"
                />
                
                {/* Year Badge */}
                <div className="absolute top-5 left-5">
                  <span className="px-3 py-1 bg-black/30 backdrop-blur-lg rounded-full text-[10px] font-black text-white uppercase tracking-widest border border-white/20">
                    {project.year}
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>

            {/* Content Section */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between bg-white/40">
                <div className="space-y-6">
                    {/* App Listing Header */}
                    <div className="flex items-center gap-3 md:gap-4">
                        {/* THE ICON */}
                        <div className="w-[56px] h-[56px] md:w-[72px] md:h-[72px] rounded-[22%] bg-neutral-50 border border-neutral-100 flex items-center justify-center shrink-0 shadow-[0_5px_15px_rgba(0,0,0,0.04)] overflow-hidden relative">
                             {project.techstack && project.techstack[0] ? (
                                <img 
                                    src={listTools.find(t => t.nama.toLowerCase() === project.techstack[0].toLowerCase())?.gambar} 
                                    className="w-[60%] h-[60%] object-contain"
                                    alt="icon"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600" />
                            )}
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[22%]" />
                        </div>

                        <div className="min-w-0 flex-1 space-y-0.5">
                            <h3 className="text-lg md:text-2xl font-extrabold text-neutral-900 tracking-tight line-clamp-1 leading-none" style={{ fontFamily: "'Outfit', sans-serif" }}>
                                {project.title}
                            </h3>
                            <p className="text-[11px] md:text-[12px] text-neutral-400 font-semibold uppercase tracking-wider truncate opacity-70">
                                {project.category}
                            </p>
                            
                            {/* Fake App Stats */}
                            <div className="flex items-center gap-2.5 pt-1 grayscale opacity-50">
                                <div className="flex items-center gap-0.5">
                                    {[1,2,3,4,5].map(s => (
                                        <svg key={s} className="w-2 h-2 text-neutral-900" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    ))}
                                    <span className="text-[9px] font-semibold ml-1">4.9</span>
                                </div>
                                <div className="w-0.5 h-0.5 rounded-full bg-neutral-300" />
                                <span className="text-[9px] font-semibold tracking-tighter">APP STORE FEATURED</span>
                            </div>
                        </div>

                        {/* GET BUTTON */}
                        <div className="shrink-0 relative z-20">
                            <motion.button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNavigate();
                                }}
                                className="bg-[#f0f0f7] text-[#007aff] px-4 md:px-6 py-1.5 rounded-full text-[12px] md:text-[13px] font-bold tracking-tight"
                                whileHover={{ scale: 1.05, backgroundColor: "#007aff", color: "#ffffff" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                GET
                            </motion.button>
                        </div>
                    </div>

                    {/* Description Area */}
                    <div className="border-t border-neutral-100 pt-6">
                        <p className="text-neutral-600 text-[14px] leading-relaxed line-clamp-2 mb-5">
                            {project.subtitle || project.description}
                        </p>
                        
                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-2">
                            {project.techstack && project.techstack.slice(0, 3).map((tech, i) => (
                                <span key={i} className="text-[9px] font-semibold text-neutral-400 border border-neutral-100 px-2.5 py-1 rounded-md uppercase tracking-wider bg-neutral-50/50">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
