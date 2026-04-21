import React, { useLayoutEffect, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiLayers, FiActivity } from "react-icons/fi";
import { listProyekWeb, listProyekUIUX } from '../../data';
import BentoProjectCard from "../../components/BentoProjectCard/BentoProjectCard";

const ShowcaseGallery = () => {
    const navigate = useNavigate();
    const [showBack, setShowBack] = useState(true);

    useEffect(() => {
        const shouldRestore = sessionStorage.getItem("should_restore_showcase_scroll");
        const savedPos = sessionStorage.getItem("showcase_scroll_pos");

        if (shouldRestore === "true" && savedPos) {
            const timer = setTimeout(() => {
                window.scrollTo({
                    top: parseInt(savedPos),
                    behavior: 'instant'
                });
                sessionStorage.removeItem("should_restore_showcase_scroll");
                requestAnimationFrame(() => {
                    window.scrollTo({ top: parseInt(savedPos), behavior: 'instant' });
                });
            }, 100);
            return () => clearTimeout(timer);
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
                    <span className="text-[13px] font-bold text-neutral-700 group-hover:text-black tracking-wide pr-1">Back</span>
                </button>
            </motion.div>

            <div className="max-w-7xl mx-auto px-5 pt-20">
                <div className="mb-12 flex flex-col items-center text-center gap-8">
                    <div className="flex flex-col items-center gap-6">
                        <div>
                            <h1 className="text-[34px] font-extrabold text-neutral-900 tracking-tight">Project Archive</h1>
                            <p className="text-neutral-500 text-[17px] font-medium leading-relaxed max-w-md mt-1 mx-auto">
                                A curated selection of my recent work, experimental prototypes, and digital case studies.
                            </p>
                        </div>

                        <div style={{
                            display: 'flex', width: '100%', minWidth: '320px', maxWidth: '380px', gap: 6, padding: 6, borderRadius: 999,
                            background: 'rgba(235, 235, 240, 0.6)', 
                            backdropFilter: 'blur(24px) saturate(180%)',
                            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                            border: '1px solid rgba(0, 0, 0, 0.06)',
                            boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.03)',
                        }} className="relative z-20">
                            {filters.map((f) => (
                                <button 
                                    key={f}
                                    onClick={() => handleFilterChange(f)}
                                    style={{
                                        position: 'relative', flex: 1, padding: '12px 0', borderRadius: 999,
                                        fontSize: 14, fontWeight: 700, cursor: 'pointer',
                                        color: filter === f ? '#0f172a' : '#64748b',
                                        background: 'transparent', border: 'none',
                                        transition: 'color 0.3s ease',
                                        zIndex: 1,
                                        letterSpacing: '-0.01em',
                                        WebkitTapHighlightColor: 'transparent'
                                    }}
                                >
                                    {filter === f && (
                                        <motion.div
                                            layoutId="active-filter-pill"
                                            style={{
                                                position: 'absolute', inset: 0, borderRadius: 999,
                                                background: '#ffffff', 
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                                                border: '1px solid rgba(0, 0, 0, 0.05)',
                                            }}
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