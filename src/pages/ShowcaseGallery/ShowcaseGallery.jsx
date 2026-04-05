import React, { useLayoutEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft } from "react-icons/fi";
import { listProyekWeb, listProyekUIUX, listProyekGame } from '../../data';
import GridBackground from "../../components/GridBackground/GridBackground";
import ProjectCard from "../../components/ProjectCard";

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
        <div className="w-full min-h-screen py-10 pb-20 relative">
            <GridBackground />

            <div className="max-w-4xl mx-auto px-6">
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

                {/* iOS Segmented Control */}
                <div className="flex justify-center">
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

                {/* List Layout - Normalized spacing Matching Homepage */}
                <div className="pt-10">
                    <div className="flex flex-col gap-8">
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