import { useParams, useNavigate } from "react-router-dom";
import { listProyek, listTools } from "../../data";
import { motion } from "framer-motion";
import Aurora from "../../components/Aurora/Aurora";
import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import { useEffect } from "react";

export default function ProjectDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const project = listProyek.find((p) => p.slug === slug);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) return null;

    // Get tool icons based on techstack names
    const getTechIcon = (techName) => {
        if (!techName) return null;
        const tool = listTools.find(
            (t) => t.nama.toLowerCase() === techName.toLowerCase()
        );
        return tool ? tool.gambar : null;
    };

    return (
        // MOBILE: min-h-screen (scrolling page). DESKTOP: h-screen (fixed split view)
        <div className="relative w-full min-h-screen lg:h-screen bg-white text-neutral-900 selection:bg-neutral-900/30 selection:text-neutral-900 lg:overflow-hidden">

            {/* Background Ambient removed for clean modern light mode look */}

            {/* Back Button - Floating & Smart History */}
            <motion.div
                className="absolute top-6 left-6 z-50 fixed lg:absolute"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
            >
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center justify-center w-12 h-12 lg:w-auto lg:h-auto lg:px-6 lg:py-3 bg-white/50 lg:bg-white backdrop-blur-md border border-neutral-200 rounded-full hover:bg-neutral-50 transition-all duration-300 shadow-sm cursor-pointer"
                >
                    <FaArrowLeft className="text-neutral-900 group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden lg:block ml-3 font-medium text-sm text-neutral-900">Back</span>
                </button>
            </motion.div>

            <div className="relative z-10 w-full h-full flex flex-col lg:flex-row">

                {/* LEFT SIDE: Visual Showcase */}
                {/* Mobile: Standard height. Desktop: Full height fixed */}
                <motion.div
                    className="relative w-full aspect-square lg:h-full lg:w-[60%] flex items-center justify-center p-8 lg:p-24 overflow-hidden bg-neutral-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >


                    {/* Image Container with Decorative Frame */}
                    <div className="relative group z-10 max-w-[85%] max-h-[85%]">

                        {/* Main Image */}
                        <img
                            src={project.image}
                            alt={project.title}
                            className="relative w-full h-full object-contain rounded-xl shadow-xl border border-neutral-200 bg-white z-10"
                        />
                    </div>
                </motion.div>

                {/* RIGHT SIDE: Content */}
                {/* Mobile: Normal block flow. Desktop: Scrollable column */}
                <div className="flex-1 lg:h-full relative z-20 bg-white lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none border-t border-neutral-200 lg:border-t-0 rounded-t-3xl lg:rounded-none -mt-10 lg:mt-0 shadow-2xl lg:shadow-none lg:overflow-hidden flex flex-col">

                    {/* Content Container */}
                    <div className="flex-1 lg:overflow-y-auto px-6 py-12 lg:p-20 lg:flex lg:flex-col lg:justify-center custom-scrollbar">

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="max-w-2xl"
                        >
                            {/* Tags & Year - Monochrome */}
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-4 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-bold tracking-wider uppercase shadow-sm">
                                    {project.category}
                                </span>
                                <span className="text-neutral-500 font-mono text-xs font-semibold">
                                    {project.year}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-none tracking-tight">
                                {project.title}
                            </h1>

                            {/* Subtitle - Gray Border */}
                            <p className="text-lg lg:text-xl text-neutral-600 font-light mb-10 leading-relaxed border-l-2 border-neutral-300 pl-6">
                                {project.subtitle}
                            </p>

                            {/* Tech Stack - Vertical List Style or Pills */}
                            <div className="mb-10">
                                <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Tech Stack</h3>
                                <div className="flex flex-wrap gap-3">
                                    {project.techstack.map((tech, idx) => {
                                        const icon = getTechIcon(tech);
                                        return (
                                            <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white border border-neutral-200 rounded-full hover:border-neutral-400 hover:bg-neutral-50 shadow-sm transition-all cursor-default group">
                                                {icon && <img src={icon} alt={tech} className="w-5 h-5 object-contain opacity-80 group-hover:opacity-100 transition-opacity" />}
                                                <span className="text-sm font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">{tech}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-12 prose prose-lg text-neutral-700 leading-relaxed">
                                <p>{project.fullDescription}</p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pb-10 lg:pb-0">
                                {project.url === "UNDER_MAINTENANCE" || project.url === "COMING_SOON" ? (
                                    <button disabled className="inline-flex justify-center items-center gap-3 px-8 py-4 bg-neutral-100 text-neutral-400 font-bold rounded-full cursor-not-allowed border border-neutral-200">
                                        Under Maintenance
                                    </button>
                                ) : project.url ? (
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex justify-center items-center gap-3 px-8 py-4 bg-neutral-900 text-white font-bold rounded-full hover:scale-105 hover:bg-black transition-all duration-300 shadow-md"
                                    >
                                        Visit Website
                                        <FaExternalLinkAlt className="text-sm" />
                                    </a>
                                ) : null}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 0px;  /* Remove scrollbar space */
                    background: transparent;  /* Optional: just make scrollbar invisible */
                }
            `}</style>
        </div>
    );
}
