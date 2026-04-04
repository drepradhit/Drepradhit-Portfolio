import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { listTools } from "../../data";

function ProjectCard({ project, index }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        sessionStorage.setItem("home_scroll_pos", window.scrollY.toString());
        sessionStorage.setItem("should_restore_home_scroll", "true");
        navigate(`/project/${project.slug}`);
    };

    return (
        <div
            onClick={handleNavigate}
            className="group block cursor-pointer"
        >
            <motion.div
                className="bg-white rounded-[24px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-neutral-100 flex flex-col h-full transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
            >
                {/* Visual Section */}
                <div className="relative h-[280px] overflow-hidden">
                    <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                    <div className="absolute top-4 left-4 px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white text-[10px] font-bold uppercase tracking-wider">
                        {project.year}
                    </div>

                    {/* Text Overlay */}
                    <div className="absolute bottom-5 left-6 right-6">
                        <span className="text-[10px] font-bold text-white/70 uppercase tracking-[0.2em] mb-1 block">
                            {project.category}
                        </span>
                        <h3 className="text-[26px] font-bold text-white leading-tight tracking-tight">
                            {project.title}
                        </h3>
                    </div>
                </div>

                {/* Info Section */}
                <div className="p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                        {/* App Icon */}
                        <div className="w-12 h-12 rounded-[12px] bg-neutral-50 border border-neutral-100 flex items-center justify-center shrink-0 shadow-sm overflow-hidden text-white">
                             {project.techstack[0] ? (
                                <img 
                                    src={listTools.find(t => t.nama.toLowerCase() === project.techstack[0].toLowerCase())?.gambar} 
                                    className="w-8 h-8 object-contain"
                                    alt="icon"
                                />
                            ) : (
                                <div className="w-8 h-8 bg-[#007aff] rounded-md" />
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="text-[15px] font-semibold text-neutral-900 truncate tracking-tight">{project.title}</h3>
                            <p className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider truncate">
                                {project.techstack.length > 2 
                                    ? `${project.techstack.slice(0, 2).join(' • ')} • +${project.techstack.length - 2}`
                                    : project.techstack.join(' • ')
                                }
                            </p>
                        </div>
                    </div>
                    
                    {/* GET Button */}
                    <div className="bg-[#f0f0f7] text-[#007aff] px-5 py-1.5 rounded-full text-[13px] font-bold shrink-0 ml-auto transition-all duration-300 group-hover:bg-[#007aff] group-hover:text-white active:scale-95">
                        GET
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function ProjectGrid({ projects }) {
    const mobileFeatured = ['whoof-meow', 'rupiah-flow', 'thinkways'];

    return (
        <div className="w-full py-20 pb-0">
            <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
                    {projects.map((project, index) => (
                        <div 
                            key={project.id} 
                            className={!mobileFeatured.includes(project.slug) ? "hidden sm:block" : "block"}
                        >
                            <ProjectCard 
                                project={project} 
                                index={index} 
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-20 flex justify-center">
                    <Link to="/showcase"
                          className="group inline-flex items-center gap-2 px-10 py-4 bg-[#f0f0f7] text-[#007aff] rounded-full transition-all duration-300 hover:bg-[#007aff] hover:text-white"
                          onClick={() => {
                              sessionStorage.setItem("home_scroll_pos", window.scrollY.toString());
                              sessionStorage.setItem("should_restore_home_scroll", "true");
                          }}>
                        <span className="text-[17px] font-bold">Explore All Works</span>
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
