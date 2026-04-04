import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { listProyekWeb, listProyekUIUX, listProyekGame, listTools } from '../../data';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa";

function ShowcaseCard({ project, index }) {
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const rotationValues = [-2, 1.5, -1, 2.5, -1.5, 1, -2.5, 2];
    const baseRotation = rotationValues[index % rotationValues.length];
    const isInstant = index % 2 === 0;

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
        const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 6;
        setTilt({ rotateX, rotateY });
    };

    return (
        <div className="block group">
            <motion.div
                className="cursor-pointer"
                style={{ perspective: '1000px' }}
                initial={{ opacity: 0, y: 20, rotate: baseRotation }}
                whileInView={{ opacity: 1, y: 0, rotate: baseRotation }}
                whileHover={{ scale: 1.05, rotate: 0, y: -10, zIndex: 50 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                    default: { duration: 0.5, ease: 'easeOut' },
                    scale: { type: 'spring', stiffness: 200, damping: 15 },
                    y: { type: 'spring', stiffness: 200, damping: 15 }
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => { setTilt({ rotateX: 0, rotateY: 0 }); setIsHovered(false); }}
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
                    {/* Photo */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-50 mb-3">
                        <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out" 
                        />
                        <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.03)] pointer-events-none" />
                    </div>

                    {/* Caption */}
                    <div className="flex items-center justify-between px-1">
                        <div className="min-w-0 flex-1">
                            <span className="block font-bold truncate leading-tight mb-1"
                                style={{ 
                                    fontFamily: "'Space Grotesk', sans-serif", 
                                    color: '#1e293b',
                                    fontSize: '15px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.05em'
                                }}>
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
                        sessionStorage.setItem("should_restore_scroll", "true");
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

const ShowcaseGallery = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [filter, setFilter] = useState('web');

    const filteredProjects = 
          filter === 'web' ? listProyekWeb 
        : filter === 'uiux' ? listProyekUIUX
        : listProyekGame;

    return (
        <div className="w-full min-h-screen bg-[#f8fafc] py-16 px-4 md:px-12 relative overflow-hidden"
             style={{ 
                 backgroundImage: `
                     linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
                 `,
                 backgroundSize: '40px 40px'
             }}>

            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex items-center justify-between mb-20 pt-8">
                    <motion.button 
                        onClick={() => navigate("/")}
                        className="group flex items-center gap-2 px-5 py-2.5 bg-[#fefcf5] border border-[#e5ddd0] shadow-[2px_3px_8px_rgba(0,0,0,0.08)] hover:shadow-[3px_5px_12px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer rotate-[-2deg] hover:rotate-0"
                        style={{ borderRadius: '3px' }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <FaArrowLeft className="text-neutral-500 text-xs group-hover:-translate-x-1 transition-transform" />
                        <span className="font-bold text-sm text-neutral-600" style={{ fontFamily: "'Caveat', cursive" }}>go back</span>
                    </motion.button>

                    <nav className="flex items-center gap-3">
                        {[
                            { id: 'web', label: 'Web', rot: 'rotate-[-2deg]' },
                            { id: 'uiux', label: 'UI UX', rot: 'rotate-[1deg]' },
                            { id: 'game', label: 'Game', rot: 'rotate-[-1deg]' }
                        ].map((f) => (
                            <button 
                                key={f.id}
                                onClick={() => setFilter(f.id)}
                                className={`relative px-6 py-2.5 text-[14px] font-bold tracking-wide transition-all cursor-pointer ${f.rot} hover:rotate-0 ${
                                    filter === f.id 
                                    ? 'bg-[#7c2d12] text-white shadow-md scale-105 z-20' 
                                    : 'bg-[#fefcf5] text-neutral-400 border border-[#e5ddd0] shadow-sm hover:text-neutral-600'
                                }`}
                                style={{ fontFamily: "'Caveat', cursive" }}
                            >
                                {filter === f.id && (
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4 bg-[#7c2d12]/20 rotate-[3deg] mix-blend-multiply pointer-events-none"
                                         style={{ clipPath: 'polygon(3% 0%, 97% 5%, 95% 100%, 5% 95%)' }}></div>
                                )}
                                {f.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="text-center mb-20">
                    <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-3"
                        style={{ fontFamily: "'Caveat', cursive" }}>
                        project archive
                    </h1>
                    <div className="w-20 h-[2px] bg-neutral-200 mx-auto"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-32">
                    {filteredProjects.map((project, index) => (
                        <ShowcaseCard key={`${project.id}-${index}`} project={project} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShowcaseGallery;
