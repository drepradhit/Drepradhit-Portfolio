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

    return (
        <Link
            to={`/project/${project.slug}`}
            className="h-full block"
            onClick={() => {
                sessionStorage.setItem("home_scroll_pos", window.scrollY.toString());
                sessionStorage.setItem("should_restore_scroll", "true");
            }}
        >
            <motion.div
                className="group relative flex flex-col h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500"
                initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: isMobile ? "-20px" : "-50px" }}
                transition={{
                    duration: 0.5,
                    // On mobile, items are vertical, so we don't want accumulated delay from index.
                    // On desktop, we stagger based on column position (approx modulo 3).
                    delay: isMobile ? 0 : (index % 3) * 0.1
                }}
                whileHover={isMobile ? {} : { y: -5 }}
            >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
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
                <div className="flex flex-col flex-grow p-5 lg:p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neutral-200 transition-colors">
                        {project.title}
                    </h3>

                    <p className="text-neutral-400 text-sm leading-relaxed line-clamp-2 mb-4 flex-grow">
                        {project.subtitle}
                    </p>

                    {/* Footer / Action */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">

                        {/* Tech Stack Icons - Stacked */}
                        <div className="flex items-center pl-2">
                            {project.techstack && project.techstack.slice(0, 4).map((tech, idx) => {
                                const icon = getTechIcon(tech);
                                return icon ? (
                                    <div key={idx}
                                        className={`w-8 h-8 rounded-full bg-neutral-900 p-1.5 border border-white/10 flex items-center justify-center relative -ml-3 first:ml-0 transition-transform hover:-translate-y-2 hover:scale-110 hover:z-10 shadow-lg`}
                                        title={tech}
                                    >
                                        <img src={icon} alt={tech} className="w-full h-full object-contain" />
                                    </div>
                                ) : null;
                            })}
                        </div>

                        <div className="flex items-center gap-2 text-xs font-medium text-white group-hover:translate-x-1 transition-transform duration-300">
                            <span>Details</span>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </div>
                    </div>
                </div>
            </motion.div>
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

