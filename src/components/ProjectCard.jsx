import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { listTools } from "../data";
import { FiArrowUpRight } from "react-icons/fi";

export default function ProjectCard({ project, storageKey = "home_scroll" }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        sessionStorage.setItem(`${storageKey}_pos`, window.scrollY.toString());
        sessionStorage.setItem(`should_restore_${storageKey}`, "true");
        navigate(`/project/${project.slug}`);
    };

    const mainTechIcon = project.techstack?.[0]
        ? listTools.find(t => t.nama.toLowerCase() === project.techstack[0].toLowerCase())?.gambar
        : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="group relative flex flex-col md:flex-row bg-white rounded-[24px] overflow-hidden border border-neutral-200/80 hover:border-neutral-300 transition-all duration-500 shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)] cursor-pointer"
            onClick={handleNavigate}
        >
            {/* Image Section */}
            <div className="relative w-full md:w-[45%] lg:w-[40%] h-[240px] sm:h-[280px] md:h-auto min-h-[300px] overflow-hidden bg-neutral-100 shrink-0">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Year Badge */}
                <div className="absolute top-5 left-5">
                    <span className="px-3.5 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold text-neutral-700 uppercase tracking-widest shadow-sm">
                        {project.year}
                    </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-5 right-5 md:bottom-5 md:top-auto md:left-5 md:right-auto">
                    <span className="px-3.5 py-2 bg-neutral-900/80 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                        {project.category}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center flex-1">

                {/* Title Row */}
                <div className="flex items-start gap-4 mb-4 md:mb-5">
                    {mainTechIcon && (
                        <div className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-[16px] bg-neutral-50 border border-neutral-100 flex items-center justify-center shrink-0">
                            <img
                                src={mainTechIcon}
                                className="w-[55%] h-[55%] object-contain"
                                alt="tech icon"
                            />
                        </div>
                    )}
                    <div className="min-w-0 flex-1">
                        <h3
                            className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-neutral-900 tracking-tight leading-tight truncate mb-1"
                            style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                            {project.title}
                        </h3>
                        <p className="text-[13px] md:text-[14px] text-neutral-400 font-medium">
                            {project.role} · {project.duration}
                        </p>
                    </div>
                </div>

                {/* Description */}
                <p className="text-neutral-600 text-[14px] md:text-[15px] leading-[1.7] mb-6 flex-1">
                    {project.subtitle}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {project.techstack && project.techstack.slice(0, 4).map((tech, i) => (
                        <span
                            key={i}
                            className="text-[10px] md:text-[11px] font-bold text-neutral-500 px-3 py-1.5 rounded-full bg-neutral-50 border border-neutral-100 uppercase tracking-widest"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* View Project Button */}
                <motion.button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleNavigate();
                    }}
                    className="w-full md:w-fit px-8 flex items-center justify-center md:justify-start gap-2.5 bg-neutral-900 hover:bg-neutral-800 text-white py-3.5 rounded-[16px] md:rounded-full text-[13px] font-bold tracking-wide transition-all duration-300 group/btn"
                    whileTap={{ scale: 0.97 }}
                >
                    View Project
                    <FiArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </motion.button>
            </div>
        </motion.div>
    );
}
