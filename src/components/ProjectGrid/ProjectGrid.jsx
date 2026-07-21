import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import BentoProjectCard from "../BentoProjectCard/BentoProjectCard";

const ViewMoreButton = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        sessionStorage.setItem("home_scroll_pos", window.scrollY.toString());
        sessionStorage.setItem("should_restore_home_scroll", "true");
        navigate('/showcase');
    };

    return (
        <button 
            onClick={handleClick}
            className="h-11 px-6 flex items-center justify-center gap-2 bg-[#111] hover:bg-[#222] border border-neutral-800 text-white rounded-full font-bold text-[13px] tracking-wide shadow-sm hover:shadow-md transition-all active:scale-95 mx-auto group"
        >
            <span>View All Projects</span>
            <svg className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
        </button>
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
                    <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-4" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Selected Work
                    </h2>
                    <p className="text-neutral-500 text-[15px] md:text-[17px] font-medium leading-relaxed">
                        A collection of digital experiences, crafted with purpose.
                    </p>
                </motion.div>

                {/* Category Tabs */}
                <div className="flex justify-center mb-10 relative z-20">
                    <div style={{
                        display: 'inline-flex', gap: 4, padding: 4, borderRadius: 999,
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
                                    position: 'relative', padding: '8px 24px', borderRadius: 999,
                                    fontSize: 13, fontWeight: 700, cursor: 'pointer',
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
                        {filteredProjects.map((project, index) => (
                            <BentoProjectCard 
                                key={project.id}
                                project={project} 
                                scrollKey="home_scroll"
                                index={index}
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
