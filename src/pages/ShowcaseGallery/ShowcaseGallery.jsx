import React, { useLayoutEffect, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiLayers, FiActivity } from "react-icons/fi";
import { listProyekWeb, listProyekUIUX } from '../../data';
import BentoProjectCard from "../../components/BentoProjectCard/BentoProjectCard";

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

    const projectVariants = {
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

    return (
        <div className="w-full py-10 overflow-hidden bg-white min-h-screen">

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
                    className="h-11 px-5 flex items-center gap-2 bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-neutral-200 hover:bg-white hover:border-neutral-300 hover:shadow-md active:scale-95 transition-all duration-300 group"
                >
                    <FiChevronLeft className="text-lg text-neutral-500 group-hover:text-black transition-colors duration-300" />
                    <span className="text-[13px] font-bold text-neutral-700 group-hover:text-black tracking-wide pr-1">Back to Homepage</span>
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

                        <div className="bg-neutral-100/50 backdrop-blur-[12px] p-1 rounded-xl flex w-full sm:min-w-[320px] max-w-[380px] relative shadow-inner ring-1 ring-neutral-200/60">
                            {filters.map((f) => (
                                <button 
                                    key={f}
                                    onClick={() => handleFilterChange(f)}
                                    className={`relative flex-1 py-2.5 text-[14px] font-bold tracking-tight rounded-lg transition-all duration-300 z-10 ${
                                        filter === f ? 'text-black' : 'text-[#86868b] hover:text-neutral-600'
                                    }`}
                                    style={{ WebkitTapHighlightColor: 'transparent' }}
                                >
                                    {filter === f && (
                                        <motion.div
                                            layoutId="active-filter-pill"
                                            className="absolute inset-0 bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.06)] ring-1 ring-black/5"
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
                            variants={projectVariants} // Reuse similar logic but with category specific variants if needed, or keep generic
                            initial="enter"
                            animate="center"
                            exit="exit"
                            className="relative w-full md:w-[400px] shrink-0"
                        >
                            <div className="bg-white rounded-[32px] border border-neutral-200 shadow-sm p-6 md:p-8 w-full flex flex-col gap-6 relative">
                                <div>
                                    <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-4">
                                        <FiLayers size={14} /> {filter === 'web' ? 'Technical Stack' : 'Design Deck'}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {(filter === 'web' 
                                            ? ['Next.js', 'React', 'Tailwind CSS', 'GSAP', 'Supabase', 'PostgreSQL'] 
                                            : ['Figma', 'Illustrator', 'Photoshop']
                                        ).map(tech => (
                                            <span key={tech} className="px-3 py-1.5 bg-neutral-50 border border-neutral-100 text-neutral-600 text-[12px] font-bold rounded-xl shadow-sm">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-neutral-100">
                                    <h3 className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-4">
                                        <FiActivity size={14} /> My Workflow
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-y-3">
                                        {(filter === 'web' 
                                            ? ["Plan", "Design", "Code", "Deploy", "Test"] 
                                            : ["User Res", "Define", "Ideate", "Proto.", "Test"]
                                        ).map((step, i, arr) => (
                                            <React.Fragment key={i}>
                                                <div className="flex items-center justify-center h-8 px-3 rounded-xl bg-neutral-900 border border-black text-white text-[11px] font-bold shadow-md">
                                                    {step}
                                                </div>
                                                {i < arr.length - 1 && (
                                                    <div className="w-3 h-[2px] bg-neutral-200 mx-1 rounded-full" />
                                                )}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="mt-10 relative">
                    <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                        <div 
                            className="flex flex-col gap-16 md:gap-20 w-full pb-24"
                        >
                            {filteredProjects.map((project) => (
                                <div 
                                    key={project.id}
                                >
                                    <BentoProjectCard 
                                        project={project} 
                                        scrollKey="showcase_scroll"
                                    />
                                </div>
                            ))}
                        </div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default ShowcaseGallery;