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
        <div className="relative w-full min-h-screen lg:h-screen bg-black text-white selection:bg-white/30 selection:text-white lg:overflow-hidden">

            {/* Background Ambient */}
            <div className="absolute inset-0 z-0 opacity-60 fixed lg:absolute">
                <Aurora
                    colorStops={["#000000", "#1a1a1a", "#050505"]}
                    blend={0.5}
                    amplitude={1.0}
                    speed={0.3}
                />
            </div>

            {/* Back Button - Floating & Smart History */}
            <motion.div
                className="absolute top-6 left-6 z-50 fixed lg:absolute"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
            >
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center justify-center w-12 h-12 lg:w-auto lg:h-auto lg:px-6 lg:py-3 bg-black/50 lg:bg-white/10 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/20 transition-all duration-300 shadow-xl cursor-pointer"
                >
                    <FaArrowLeft className="text-white group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden lg:block ml-3 font-medium text-sm">Back</span>
                </button>
            </motion.div>

            <div className="relative z-10 w-full h-full flex flex-col lg:flex-row">

                {/* LEFT SIDE: Visual Showcase */}
                {/* Mobile: Standard height. Desktop: Full height fixed */}
                <motion.div
                    className="relative w-full aspect-square lg:h-full lg:w-[60%] flex items-center justify-center p-8 lg:p-24 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >


                    {/* Image Container with Decorative Frame */}
                    <div className="relative group z-10 max-w-[85%] max-h-[85%]">

                        {/* Decorative Offset Border (The "Frame") */}
                        <div className="absolute -inset-4 border border-white/20 rounded-2xl z-0" />

                        {/* Second Decorative Element - Corner Accents */}
                        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-white rounded-tl-lg z-20" />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-white rounded-br-lg z-20" />

                        {/* Main Image */}
                        <img
                            src={project.image}
                            alt={project.title}
                            className="relative w-full h-full object-contain rounded-xl shadow-2xl border border-white/10 bg-neutral-900 z-10"
                        />
                    </div>
                </motion.div>

                {/* RIGHT SIDE: Content */}
                {/* Mobile: Normal block flow. Desktop: Scrollable column */}
                <div className="flex-1 lg:h-full relative z-20 bg-black/50 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none border-t border-white/10 lg:border-t-0 rounded-t-3xl lg:rounded-none -mt-10 lg:mt-0 shadow-2xl lg:shadow-none lg:overflow-hidden flex flex-col">

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
                                <span className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-extrabold tracking-wider uppercase shadow-lg shadow-white/10">
                                    {project.category}
                                </span>
                                <span className="text-neutral-500 font-mono text-xs">
                                    {project.year}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl lg:text-7xl font-bold text-white mb-6 leading-none tracking-tight">
                                {project.title}
                            </h1>

                            {/* Subtitle - White Border */}
                            <p className="text-lg lg:text-xl text-neutral-400 font-light mb-10 leading-relaxed border-l-2 border-white pl-6">
                                {project.subtitle}
                            </p>

                            {/* Tech Stack - Vertical List Style or Pills */}
                            <div className="mb-10">
                                <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-4">Tech Stack</h3>
                                <div className="flex flex-wrap gap-3">
                                    {project.techstack.map((tech, idx) => {
                                        const icon = getTechIcon(tech);
                                        return (
                                            <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/5 rounded-full hover:bg-white/10 hover:border-white/20 transition-all cursor-default group">
                                                {icon && <img src={icon} alt={tech} className="w-5 h-5 object-contain" />}
                                                <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">{tech}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mb-12 prose prose-invert prose-lg text-neutral-400">
                                <p>{project.fullDescription}</p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pb-10 lg:pb-0">
                                {project.url === "COMING_SOON" ? (
                                    <button disabled className="inline-flex justify-center items-center gap-3 px-8 py-4 bg-neutral-800 text-neutral-500 font-bold rounded-full cursor-not-allowed opacity-75">
                                        Coming Soon
                                    </button>
                                ) : project.url ? (
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex justify-center items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 hover:shadow-lg hover:shadow-white/20 transition-all duration-300"
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
