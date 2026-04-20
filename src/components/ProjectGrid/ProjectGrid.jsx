import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import BentoProjectCard from "../BentoProjectCard/BentoProjectCard";

const ViewMoreButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        sessionStorage.setItem("home_scroll_pos", window.scrollY.toString());
        sessionStorage.setItem("should_restore_home_scroll", "true");
        navigate('/showcase');
    };

    return (
        <motion.button 
            onClick={handleClick}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-3 bg-neutral-900 text-white px-8 py-3.5 rounded-xl font-bold text-[14px] shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)] transition-all duration-300 border border-neutral-800 group"
        >
            View All Projects
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
        </motion.button>
    );
};

export default function ProjectGrid({ projects }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const handleProjectChange = (idx) => {
        setDirection(idx > activeIndex ? 1 : -1);
        setActiveIndex(idx);
    };

    const variants = {
        enter: (dir) => ({
            x: dir > 0 ? 200 : -200,
            opacity: 0,
            filter: "blur(4px)"
        }),
        center: {
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                filter: { duration: 0.4 }
            }
        },
        exit: (dir) => ({
            x: dir > 0 ? -200 : 200,
            opacity: 0,
            filter: "blur(4px)",
            transition: {
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                filter: { duration: 0.3 }
            }
        })
    };

    const currentProject = projects[activeIndex];

    return (
        <div className="w-full py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <motion.div
                    className="mb-12 text-center"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >

                    <h2
                        className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                        Featured Projects
                    </h2>
                    <p className="text-neutral-500 text-[15px] mt-3 max-w-lg mx-auto leading-relaxed">
                        A curated selection of projects I've built — from full-stack web apps to UI/UX case studies.
                    </p>
                </motion.div>

                {/* Project Navigation (Box Style - Hidden on Mobile) */}
                <div className="hidden md:flex mb-12 justify-center w-full">
                    <div className="bg-neutral-900/90 backdrop-blur-xl p-1.5 rounded-xl flex gap-1 shadow-2xl border border-white/5 overflow-x-auto no-scrollbar max-w-[90vw]">
                        {projects.map((p, idx) => (
                            <button
                                key={p.id}
                                onClick={() => handleProjectChange(idx)}
                                className={`px-5 py-2.5 rounded-lg text-[13px] font-bold transition-all duration-300 relative whitespace-nowrap ${
                                    activeIndex === idx ? 'text-white' : 'text-neutral-500 hover:text-white'
                                }`}
                            >
                                {activeIndex === idx && (
                                    <motion.div
                                        layoutId="home-project-pill"
                                        className="absolute inset-0 bg-blue-500 rounded-lg shadow-lg shadow-blue-500/20"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{p.title}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Project List (Carousel - Visible on Desktop/Tablet) */}
                <div className="hidden md:block relative min-h-[600px] w-full">
                    <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                        <motion.div
                            key={activeIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="w-full"
                        >
                            {currentProject && (
                                <BentoProjectCard 
                                    project={currentProject} 
                                    scrollKey="home_scroll"
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Project List (Vertical - Visible on Mobile Only) */}
                <div className="block md:hidden flex flex-col gap-10 w-full">
                    {projects.map((project) => (
                        <div key={project.id}>
                            <BentoProjectCard 
                                project={project} 
                                scrollKey="mobile_home_scroll"
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <ViewMoreButton />
                </div>
            </div>
        </div>
    );
}