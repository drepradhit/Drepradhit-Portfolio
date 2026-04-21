import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import React, { useState, useMemo } from "react";
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

const categories = [
    { key: "Website", label: "Web Development" },
    { key: "UI/UX", label: "UI/UX Design" },
];

export default function ProjectGrid({ projects }) {
    const [activeCategory, setActiveCategory] = useState(() => {
        return sessionStorage.getItem("project_grid_category") || "Website";
    });

    const filteredProjects = useMemo(() => {
        return projects.filter(p => p.category === activeCategory);
    }, [projects, activeCategory]);

    const handleCategoryChange = (cat) => {
        if (cat === activeCategory) return;
        setActiveCategory(cat);
        sessionStorage.setItem("project_grid_category", cat);
    };

    return (
        <div className="w-full py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <motion.div
                    className="mb-10 text-center"
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

                {/* Category Tabs */}
                <div className="flex justify-center mb-10 relative z-20">
                    <div style={{
                        display: 'inline-flex', gap: 6, padding: 6, borderRadius: 999,
                        background: 'rgba(235, 235, 240, 0.6)', 
                        backdropFilter: 'blur(24px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                        border: '1px solid rgba(0, 0, 0, 0.06)',
                        boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.03)',
                    }}>
                        {categories.map((cat) => (
                            <button
                                key={cat.key}
                                onClick={() => handleCategoryChange(cat.key)}
                                style={{
                                    position: 'relative', padding: '12px 28px', borderRadius: 999,
                                    fontSize: 14, fontWeight: 700, cursor: 'pointer',
                                    color: activeCategory === cat.key ? '#0f172a' : '#64748b',
                                    background: 'transparent', border: 'none',
                                    transition: 'color 0.3s ease',
                                    zIndex: 1,
                                    letterSpacing: '-0.01em',
                                }}
                            >
                                {activeCategory === cat.key && (
                                    <motion.div
                                        layoutId="category-pill"
                                        style={{
                                            position: 'absolute', inset: 0, borderRadius: 999,
                                            background: '#ffffff', 
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
                                            border: '1px solid rgba(0, 0, 0, 0.05)',
                                        }}
                                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                                    />
                                )}
                                <span style={{ position: 'relative', zIndex: 2 }}>{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Project Cards — All visible, vertical list */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -16 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-6 md:gap-8 w-full"
                    >
                        {filteredProjects.map((project) => (
                            <BentoProjectCard 
                                key={project.id}
                                project={project} 
                                scrollKey="home_scroll"
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>

                <div className="mt-16 flex justify-center">
                    <ViewMoreButton />
                </div>
            </div>
        </div>
    );
}