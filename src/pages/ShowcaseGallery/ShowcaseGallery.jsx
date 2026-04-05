import React, { useLayoutEffect, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft } from "react-icons/fi";
import { listProyekWeb, listProyekUIUX } from '../../data';
import ProjectCard from "../../components/ProjectCard";
import GridBackground from "../../components/GridBackground/GridBackground";

const ShowcaseGallery = () => {
    const navigate = useNavigate();
    const [showBack, setShowBack] = useState(true);

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

    useEffect(() => {
        let lastPos = 0;
        const controlNavbar = () => {
            const current = window.scrollY;
            if (current > lastPos && current > 100) {
                setShowBack(false);
            } else {
                setShowBack(true);
            }
            lastPos = current;
        };

        window.addEventListener('scroll', controlNavbar, { passive: true });
        return () => window.removeEventListener('scroll', controlNavbar);
    }, []);

    const [filter, setFilter] = useState(() => {
        return sessionStorage.getItem('active_showcase_tab') || 'web';
    });

    const filters = ['web', 'uiux'];
    const [direction, setDirection] = useState(0);

    const handleFilterChange = (newFilter) => {
        const prevIndex = filters.indexOf(filter);
        const nextIndex = filters.indexOf(newFilter);
        
        setDirection(nextIndex > prevIndex ? 1 : -1);
        setFilter(newFilter);
        sessionStorage.setItem('active_showcase_tab', newFilter);
    };

    const filteredProjects = 
          filter === 'web' ? listProyekWeb 
        : listProyekUIUX;

    const variants = {
        enter: (dir) => ({
            x: dir > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.95
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { type: "spring", stiffness: 400, damping: 30 },
                opacity: { duration: 0.3 },
                staggerChildren: 0.08,
                delayChildren: 0.1
            }
        },
        exit: (dir) => ({
            x: dir > 0 ? -100 : 100,
            opacity: 0,
            scale: 0.95,
            transition: {
                x: { type: "spring", stiffness: 400, damping: 30 },
                opacity: { duration: 0.2 }
            }
        })
    };

    return (
        <div className="w-full py-10 overflow-hidden">
            <GridBackground />

            <motion.div 
                className="fixed top-6 left-6 z-50"
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ 
                    opacity: showBack ? 1 : 0, 
                    y: showBack ? 0 : -100,
                    scale: showBack ? 1 : 0.8,
                    pointerEvents: showBack ? "auto" : "none"
                }}
                transition={{ 
                    duration: 0.4, 
                    ease: [0.16, 1, 0.3, 1] 
                }}
            >
                <button 
                    onClick={() => navigate("/")}
                    className="w-12 h-12 flex items-center justify-center bg-white/10 [backdrop-filter:blur(16px)_saturate(180%)] rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-white/20 hover:bg-white/20 active:scale-90 transition-all duration-300 group relative"
                >
                    <div className="absolute inset-[1px] rounded-full border border-white/10 pointer-events-none" />
                    <FiChevronLeft className="text-2xl text-[#007AFF] transition-transform duration-300 group-hover:-translate-x-0.5" />
                </button>
            </motion.div>

            <div className="max-w-7xl mx-auto px-5 pt-20">
                <div className="mb-12 flex flex-col md:flex-row md:items-start justify-between gap-10">
                    <div className="flex flex-col items-start gap-6">
                        <div>
                            <h1 className="text-[34px] font-extrabold text-neutral-900 tracking-tight">Project Archive</h1>
                            <p className="text-neutral-500 text-[17px] font-medium leading-relaxed max-w-md mt-1">
                                A curated selection of my recent work, experimental prototypes, and digital case studies.
                            </p>
                        </div>

                        <div className="bg-neutral-100/50 backdrop-blur-[12px] p-1 rounded-full flex w-full min-w-[320px] max-w-[380px] relative shadow-inner ring-1 ring-neutral-200/60">
                            {filters.map((f) => (
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
                                        {f === 'web' ? 'Web' : f === 'uiux' ? 'UI UX' : ''}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <AnimatePresence mode="popLayout" custom={direction}>
                        <motion.div
                            key={filter}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="relative w-full md:w-[400px] shrink-0"
                        >
                            <div 
                                className="p-6 md:p-8 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.1)] border-b-4 border-black/10 relative overflow-hidden"
                                style={{ 
                                    backgroundColor: filter === 'web' ? '#fef9c3' : '#dbeafe',
                                    borderRadius: '2px 40px 5px 60px / 5px 5px 40px 5px',
                                    transform: `rotate(${filter === 'web' ? -2 : 2}deg)`
                                }}
                            >
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-sm -rotate-2 border border-black/5" />

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 mb-2 opacity-60">
                                            {filter === 'web' ? 'Technical Stack' : 'Design Deck'}
                                        </h3>
                                        <p className="text-[15px] font-bold text-neutral-800 leading-snug">
                                            {filter === 'web' ? 'Next.js • React • Tailwind • GSAP • Supabase • PostgreSQL' : 'Figma • Illustrator • Photoshop'}
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-black/5">
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral-500 mb-4 opacity-60">
                                            My Workflow
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-y-3">
                                            {(filter === 'web' 
                                                ? ["Plan", "Design", "Code", "Deploy", "Test"] 
                                                : ["User Res", "Define", "Ideate", "Proto", "Test"]
                                            ).map((step, i, arr) => (
                                                <React.Fragment key={i}>
                                                    <span className="text-[13px] font-extrabold text-neutral-700 bg-black/5 px-2 py-1 rounded truncate max-w-fit">
                                                        {step}
                                                    </span>
                                                    {i < arr.length - 1 && (
                                                        <svg className="w-4 h-4 text-neutral-400 mx-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 right-0 w-10 h-10 bg-black/5 rounded-tl-full" />
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="mt-10 relative">
                    <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                        <motion.div 
                            key={filter}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                        >
                            {filteredProjects.map((project) => (
                                <motion.div 
                                    key={project.id}
                                    variants={{
                                        enter: (dir) => ({ y: 20, opacity: 0, scale: 0.9 }),
                                        center: { y: 0, opacity: 1, scale: 1 },
                                        exit: (dir) => ({ y: 10, opacity: 0, scale: 0.9 })
                                    }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <ProjectCard 
                                        project={project} 
                                        scrollKey="showcase_scroll"
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ShowcaseGallery;