import React, { useEffect, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { listProyekWeb, listProyekUIUX, listProyekGame, listTools } from '../../data';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FiChevronLeft } from "react-icons/fi";

function ShowcaseCard({ project, index }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        sessionStorage.setItem("showcase_scroll_pos", window.scrollY.toString());
        sessionStorage.setItem("should_restore_showcase_scroll", "true");
        navigate(`/project/${project.slug}`);
    };

    return (
        <div 
            onClick={handleNavigate}
            className="group block cursor-pointer"
        >
            <motion.div
                className="bg-white rounded-[24px] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-neutral-100 flex flex-col h-full transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
            >
                {/* Visual Section */}
                <div className="relative h-[280px] overflow-hidden">
                    <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />
                    
                    {/* Year Tag */}
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
                    <div className="flex items-center gap-3 min-w-0">
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
                        <div className="flex flex-col min-w-0 flex-1">
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

const ShowcaseGallery = () => {
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const shouldRestore = sessionStorage.getItem("should_restore_showcase_scroll");
        const savedPos = sessionStorage.getItem("showcase_scroll_pos");

        if (shouldRestore === "true" && savedPos) {
            window.scrollTo({
                top: parseInt(savedPos),
                behavior: 'instant'
            });
            sessionStorage.removeItem("should_restore_showcase_scroll");
        } else {
            window.scrollTo(0, 0);
        }
    }, []);

    const [filter, setFilter] = useState(() => {
        return sessionStorage.getItem('active_showcase_tab') || 'web';
    });

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        sessionStorage.setItem('active_showcase_tab', newFilter);
    };

    const filteredProjects = 
          filter === 'web' ? listProyekWeb 
        : filter === 'uiux' ? listProyekUIUX
        : listProyekGame;

    return (
        <div className="w-full min-h-screen bg-[#f2f2f7] py-10 pb-20">
            <style>{`
                body {
                  background-color: #f2f2f7;
                }
            `}</style>

            <div className="max-w-6xl mx-auto px-6">
                {/* Header Navigation */}
                <div className="flex items-center justify-between mb-8">
                    <button 
                        onClick={() => navigate("/")}
                        className="flex items-center gap-1 text-[#007aff] font-medium text-[17px] hover:opacity-70 transition-opacity"
                    >
                        <FiChevronLeft size={24} className="stroke-[2.5]" />
                        Explore
                    </button>
                    <div className="text-[17px] font-bold text-neutral-900 absolute left-1/2 -translate-x-1/2">
                        Library
                    </div>
                    <div className="w-10" /> {/* Spacer */}
                </div>

                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-[34px] font-extrabold text-neutral-900 tracking-tight">Project Archive</h1>
                </div>

                {/* iOS Segmented Control (Pill Style) */}
                <div className="flex justify-center mb-12">
                    <div className="bg-neutral-200/50 p-1 rounded-full flex w-full max-w-[340px] relative">
                        {['web', 'uiux', 'game'].map((f) => (
                            <button 
                                key={f}
                                onClick={() => handleFilterChange(f)}
                                className={`relative flex-1 py-1.5 text-[13px] font-bold tracking-tight rounded-full transition-all z-10 ${
                                    filter === f ? 'text-neutral-900' : 'text-neutral-500'
                                }`}
                            >
                                {filter === f && (
                                    <motion.div 
                                        layoutId="segmented-bg"
                                        className="absolute inset-0 bg-white shadow-sm rounded-full z-[-1]"
                                        transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
                                    />
                                )}
                                {f === 'web' ? 'Web' : f === 'uiux' ? 'UI UX' : 'Game'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <ShowcaseCard key={`${project.id}-${index}`} project={project} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShowcaseGallery;
