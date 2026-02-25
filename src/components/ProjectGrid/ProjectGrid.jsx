import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { listTools } from "../../data";

function ProjectCard({ project, index }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Helper to find tool icon
    const getTechIcon = (techName) => {
        if (!techName) return null;
        // Case insensitive match
        const tool = listTools.find(t => t.nama.toLowerCase() === techName.toLowerCase());
        return tool ? tool.gambar : null;
    };

    // Card content (shared between mobile and desktop)
    const cardContent = (
        <>
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-60" />

                {/* Category Badge - Floating on Image */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 text-[10px] font-bold tracking-widest text-white uppercase bg-black/50 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
                        {project.category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow p-5 lg:p-6 bg-white">
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    {project.title}
                </h3>

                <p className="text-neutral-600 text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
                    {project.subtitle}
                </p>

                {/* Footer / Action */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100 mt-auto">

                    {/* Tech Stack Icons - Stacked */}
                    <div className="flex items-center pl-2">
                        {project.techstack && project.techstack.slice(0, 4).map((tech, idx) => {
                            const icon = getTechIcon(tech);
                            return icon ? (
                                <div key={idx}
                                    className={`w-8 h-8 rounded-full bg-white p-1.5 border border-neutral-200 flex items-center justify-center relative -ml-3 first:ml-0 shadow-sm`}
                                    title={tech}
                                >
                                    <img src={icon} alt={tech} className="w-full h-full object-contain" />
                                </div>
                            ) : null;
                        })}
                    </div>

                    <div className="flex items-center gap-2 text-xs font-medium text-neutral-900">
                        <span>Details</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    );

    return (
        <Link
            to={`/project/${project.slug}`}
            className="h-full block"
            onClick={() => {
                sessionStorage.setItem("home_scroll_pos", window.scrollY.toString());
                sessionStorage.setItem("should_restore_scroll", "true");
            }}
        >
            {/* On mobile: no animations, just static card */}
            {isMobile ? (
                <div className="group relative flex flex-col h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
                    {cardContent}
                </div>
            ) : (
                /* On desktop: keep animations */
                <motion.div
                    className="group relative flex flex-col h-full bg-white border border-neutral-200 rounded-3xl overflow-hidden hover:border-neutral-300 hover:shadow-xl hover:shadow-neutral-200/50 transition-all duration-200"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                    {cardContent}
                </motion.div>
            )}
        </Link>
    );
}

export default function ProjectGrid({ projects }) {
    return (
        <div className="w-full">
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-7xl mx-auto">
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.34rem)]" // Calculated for gap-8 (2rem)
                    >
                        <ProjectCard
                            project={project}
                            index={index}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

