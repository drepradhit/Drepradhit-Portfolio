import React, { useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft } from "react-icons/fi";
import { listProyekWeb, listProyekUIUX, listProyekGame } from '../../data';
import ProjectCard from "../../components/ProjectCard";
import GridBackground from "../../components/GridBackground/GridBackground";

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
        <div className="w-full py-10">
            {/* Background Component synchronized with Home & Detail */}
            <GridBackground />

            <div className="max-w-7xl mx-auto px-5">
                {/* Header Navigation */}
                <div className="flex items-center justify-between mb-8">
                    <button 
                        onClick={() => navigate("/")}
                        className="flex items-center gap-1 text-[#007aff] font-medium text-[17px] hover:opacity-70 transition-opacity"
                    >
                        <FiChevronLeft size={24} className="stroke-[2.5]" />
                        Back
                    </button>
                    <div className="text-[17px] font-bold text-neutral-900 absolute left-1/2 -translate-x-1/2">
                        Library
                    </div>
                    <div className="w-10" />
                </div>

                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-[34px] font-extrabold text-neutral-900 tracking-tight">Project Archive</h1>
                </div>

                {/* Premium Segmented Control - Animated */}
                <div className="flex justify-center">
                    <div className="bg-[#f2f2f7] p-1 rounded-full flex w-full max-w-[380px] relative shadow-inner ring-1 ring-inset ring-neutral-200/50">
                        {['web', 'uiux', 'game'].map((f) => (
                            <button 
                                key={f}
                                onClick={() => handleFilterChange(f)}
                                className={`relative flex-1 py-2.5 text-[14px] font-bold tracking-tight rounded-full transition-all duration-300 z-10 ${
                                    filter === f ? 'text-black' : 'text-[#86868b] hover:text-neutral-600'
                                }`}
                                style={{ WebkitTapHighlightColor: 'transparent' }}
                            >
                                {filter === f && (
                                    <motion.div
                                        layoutId="active-filter-pill"
                                        className="absolute inset-0 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-black/5"
                                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                    />
                                )}
                                <span className="relative z-20">
                                    {f === 'web' ? 'Web' : f === 'uiux' ? 'UI UX' : 'Game'}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Card List - CSS Grid layout for proper Desktop proportions */}
                <div className="mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard 
                                key={`${project.id}-${index}`} 
                                project={project} 
                                storageKey="showcase_scroll"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowcaseGallery;