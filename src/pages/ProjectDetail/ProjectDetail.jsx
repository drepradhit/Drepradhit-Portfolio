import { useParams, useNavigate } from "react-router-dom";
import { listProyek, listTools } from "../../data";
import { motion } from "framer-motion";
import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import { useEffect } from "react";

export default function ProjectDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const project = listProyek.find((p) => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) return null;

    const getTechIcon = (techName) => {
        if (!techName) return null;
        const tool = listTools.find(
            (t) => t.nama.toLowerCase() === techName.toLowerCase()
        );
        return tool ? tool.gambar : null;
    };

    return (
        <div className="relative w-full min-h-screen lg:h-screen bg-[#fdfbf7] text-neutral-800 lg:overflow-hidden selection:bg-blue-500/20"
             style={{ 
                 backgroundImage: `
                     linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
                 `,
                 backgroundSize: '40px 40px'
             }}>

            {/* Subtle retro noise texture overlay - matching main site feel */}
            <div 
                className="absolute inset-0 pointer-events-none opacity-[0.2] z-0 mix-blend-multiply" 
                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}
            />

            {/* Clean Back Button */}
            <motion.div
                className="absolute top-6 left-6 z-50 fixed lg:absolute"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
            >
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center justify-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md border border-neutral-200/60 shadow-sm hover:shadow-md hover:bg-white transition-all duration-300 rounded-full cursor-pointer"
                >
                    <FaArrowLeft className="text-neutral-600 text-sm group-hover:-translate-x-1 transition-transform" />
                    <span className="hidden lg:block font-semibold text-sm text-neutral-600">Back</span>
                </button>
            </motion.div>

            <div className="relative z-10 w-full h-full flex flex-col lg:flex-row max-w-7xl mx-auto">

                {/* LEFT SIDE: Clean Polaroid */}
                <motion.div
                    className="relative w-full min-h-[45vh] lg:h-full lg:w-1/2 flex items-center justify-center p-8 pt-24 lg:p-20 overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* The Polaroid Card */}
                    <div className="relative bg-[#ffffff] p-4 pb-16 sm:p-5 sm:pb-20 lg:p-5 lg:pb-24 shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-neutral-100 rotate-[-2deg] transition-all duration-500 hover:rotate-[-1deg] hover:scale-[1.02] hover:shadow-[0_25px_50px_rgba(0,0,0,0.12)] max-w-[95%] lg:max-w-[85%] z-20 will-change-transform">
                        
                        {/* Soft Tape */}
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-[#ebdfc8]/80 shadow-sm rotate-[3deg] z-30 backdrop-blur-md mix-blend-multiply rounded-sm" 
                             style={{ clipPath: 'polygon(3% 0%, 98% 2%, 99% 100%, 1% 97%)' }} 
                        />
                        
                        {/* Project Image Box */}
                        <div className="relative w-full aspect-[4/3] bg-neutral-100 overflow-hidden rounded-[2px]">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Minimalist Handwritten Title */}
                        <div className="absolute bottom-[4%] left-0 right-0 flex justify-center opacity-80 rotate-[-1deg]">
                            <span 
                                style={{ fontFamily: "'Caveat', 'Kalam', cursive" }} 
                                className="text-3xl lg:text-4xl text-neutral-800 tracking-wide font-bold"
                            >
                                {project.title}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* RIGHT SIDE: Modern Clean Content */}
                <div className="flex-1 lg:h-full relative z-20 flex flex-col justify-center">

                    <div className="flex-1 lg:overflow-y-auto px-6 py-10 lg:pl-10 lg:pr-16 lg:pt-32 lg:pb-32 lg:flex lg:flex-col lg:justify-center custom-scrollbar">

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="max-w-xl mx-auto lg:mx-0 w-full"
                        >


                            {/* Clean Modern Title */}
                            <h1 className="text-4xl lg:text-6xl font-extrabold text-neutral-900 mb-6 tracking-tight leading-tight">
                                {project.title}
                            </h1>

                            {/* Crisp Subtitle */}
                            <p className="text-lg lg:text-xl text-neutral-500 mb-10 leading-relaxed font-medium">
                                {project.subtitle}
                            </p>

                            {/* Soft Pill Tech Stack */}
                            <div className="mb-10">
                                <h3 className="text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-4">Crafted With</h3>
                                <div className="flex flex-wrap gap-2.5">
                                    {project.techstack.map((tech, idx) => {
                                        const icon = getTechIcon(tech);
                                        return (
                                            <div key={idx} className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-full shadow-sm border border-neutral-200 hover:shadow-md transition-shadow">
                                                {icon && <img src={icon} alt={tech} className="w-4 h-4 object-contain" />}
                                                <span className="text-[12px] font-bold text-neutral-600 tracking-wide">
                                                    {tech}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Minimalist Description */}
                            <div className="mb-12 text-neutral-600 leading-[1.8] font-medium text-[15px] sm:text-base">
                                <p>{project.fullDescription}</p>
                            </div>

                            {/* Soft Modern CTA Action */}
                            <div className="flex flex-col sm:flex-row gap-4 pb-12 lg:pb-0">
                                {project.url === "UNDER_MAINTENANCE" || project.url === "COMING_SOON" ? (
                                    <button disabled className="inline-flex justify-center items-center gap-2 px-8 py-3.5 bg-neutral-100 text-neutral-400 font-bold uppercase tracking-wide text-xs rounded-full cursor-not-allowed border border-neutral-200">
                                        Offline
                                    </button>
                                ) : project.url ? (
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex justify-center items-center gap-2 px-8 py-3.5 bg-neutral-900 text-white font-bold uppercase tracking-wide text-xs rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        Visit Website
                                        <FaExternalLinkAlt className="text-[10px]" />
                                    </a>
                                ) : null}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 0px;
                    background: transparent;
                }
            `}</style>
        </div>
    );
}
