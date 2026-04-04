import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { listTools } from "../../data";

function ProjectCard({ project, index }) {
    const titleColors = ['#1e293b', '#334155', '#334155', '#7c2d12', '#1e293b', '#451a03'];
    
    const isInstant = index % 2 === 0;

    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
        const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 6;
        setTilt({ rotateX, rotateY });
    };

    const handleMouseLeave = () => {
        setTilt({ rotateX: 0, rotateY: 0 });
        setIsHovered(false);
    };

    const rotationValues = [-2, 1, -1, 2, -1.5, 1.5];
    const baseRotation = rotationValues[index % rotationValues.length];

    return (
        <div className="block group">
            <motion.div
                className="cursor-pointer"
                style={{ perspective: '1000px' }}
                initial={{ opacity: 0, y: 20, rotate: baseRotation }}
                whileInView={{ opacity: 1, y: 0, rotate: baseRotation }}
                whileHover={{ 
                    scale: 1.05, 
                    rotate: 0,
                    y: -10,
                    zIndex: 50
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                    default: { duration: 0.5, ease: 'easeOut' },
                    scale: { type: 'spring', stiffness: 200, damping: 15 },
                    y: { type: 'spring', stiffness: 200, damping: 15 }
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
            >
                <div 
                    className="relative bg-white"
                    style={{
                        transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
                        transformStyle: 'preserve-3d',
                        boxShadow: isHovered 
                            ? `${-tilt.rotateY * 1.5}px ${tilt.rotateX * 1.5 + 15}px 35px rgba(0,0,0,0.15)` 
                            : '0 4px 15px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.03)',
                        padding: isInstant ? '6px 6px 40px 6px' : '6px 6px 28px 6px',
                        border: '1px solid #f1f5f9'
                    }}
                >
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-50 mb-3">
                        <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out" 
                        />
                        <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.03)] pointer-events-none" />
                    </div>

                    <div className="flex items-center justify-between px-1">
                        <div className="min-w-0 flex-1">
                            <span 
                                className="block font-bold truncate leading-tight mb-1"
                                style={{ 
                                    fontFamily: "'Space Grotesk', sans-serif", 
                                    color: titleColors[index % titleColors.length],
                                    fontSize: '15px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}
                            >
                                {project.title}
                            </span>
                            <span className="block text-[11px] text-neutral-400 font-medium uppercase tracking-wider"
                                  style={{ fontFamily: "'Inter', sans-serif" }}>
                                {project.category} • {project.year}
                            </span>
                        </div>
                        <div className="flex gap-1 shrink-0 ml-2">
                            {project.techstack.slice(0, 2).map((tech, i) => {
                                const tool = listTools.find(t => t.nama.toLowerCase() === tech.toLowerCase());
                                return tool ? (
                                    <img key={i} src={tool.gambar} alt={tech} className="w-4 h-4 object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
                                ) : null;
                            })}
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className="flex justify-center mt-1">
                <Link 
                    to={`/project/${project.slug}`}
                    className="relative inline-flex items-center gap-2 px-6 py-2 bg-[#fefcf5] border border-[#e5ddd0] shadow-[2px_3px_6px_rgba(0,0,0,0.06)] text-[#7c2d12] font-bold text-[15px] rotate-[-1deg] hover:rotate-0 hover:shadow-[3px_5px_10px_rgba(0,0,0,0.1)] transition-all"
                    style={{ fontFamily: "'Caveat', cursive" }}
                    onClick={() => {
                        sessionStorage.setItem("home_scroll_pos", window.scrollY.toString());
                        sessionStorage.setItem("should_restore_home_scroll", "true");
                    }}
                >
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-3 bg-[#7c2d12]/15 rotate-[2deg] mix-blend-multiply pointer-events-none"
                         style={{ clipPath: 'polygon(3% 0%, 97% 5%, 95% 100%, 5% 95%)' }}></div>
                    view project →
                </Link>
            </div>
        </div>
    );
}

export default function ProjectGrid({ projects }) {
    const mobileFeatured = ['whoof-meow', 'rupiah-flow', 'thinkways'];

    return (
        <div className="w-full py-20">
            <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-6xl mx-auto px-6">
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

                <div className="mt-24 flex justify-center">
                    <Link to="/showcase"
                          className="group relative inline-flex items-center gap-6 px-10 py-4 bg-white border border-[#e2e8f0] shadow-[4px_6px_0_rgba(0,0,0,0.05)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all rotate-[-1.5deg] hover:rotate-0"
                          style={{ borderRadius: '2px' }}
                          onClick={() => {
                              sessionStorage.setItem("home_scroll_pos", window.scrollY.toString());
                              sessionStorage.setItem("should_restore_home_scroll", "true");
                          }}>
                        <div className="flex flex-col items-start leading-none">
                            <span className="text-neutral-400 text-[10px] uppercase tracking-widest mb-1 font-bold" style={{ fontFamily: "'Space Mono', monospace" }}>
                                Archive
                            </span>
                            <span className="text-2xl md:text-3xl font-bold text-neutral-800" style={{ fontFamily: "'Caveat', cursive" }}>
                                view more projects —
                            </span>
                        </div>
                        <div className="w-10 h-10 bg-neutral-900 text-white flex items-center justify-center rounded-sm transition-transform group-hover:translate-x-2">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                        <div className="absolute -top-3 -left-4 w-12 h-5 bg-[#7c2d12]/20 rotate-[-15deg] mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
