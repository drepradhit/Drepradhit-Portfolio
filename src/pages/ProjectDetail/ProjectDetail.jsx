import { useParams, useNavigate } from "react-router-dom";
import { listProyek, listTools } from "../../data";
import { motion } from "framer-motion";
import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import { FiMessageSquare, FiMapPin, FiMap, FiLayout, FiStar, FiSearch, FiCode, FiDatabase, FiServer, FiCheckCircle, FiGlobe, FiLayers, FiCpu, FiActivity, FiTarget, FiPenTool, FiChevronLeft } from "react-icons/fi";
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
        <div className="relative w-full min-h-screen bg-[#f8fafc] text-neutral-800 selection:bg-blue-100/50 font-inter">

            <style>{`
                .washi-slate {
                    background-color: #94a3b8;
                    background-image: linear-gradient(90deg, transparent 50%, rgba(255,255,255,.15) 50%);
                    background-size: 8px 8px;
                    opacity: 0.7;
                    mix-blend-mode: multiply;
                }
                .washi-green {
                    background-color: #a8e6cf;
                    opacity: 0.7;
                    mix-blend-mode: multiply;
                }
                .washi-yellow {
                    background-color: #ffd3a3;
                    background-image: linear-gradient(90deg, transparent 50%, rgba(255,255,255,.15) 50%);
                    background-size: 6px 6px;
                    opacity: 0.85;
                    mix-blend-mode: multiply;
                }
                .paper-lined {
                    background-image: repeating-linear-gradient(transparent, transparent 25px, rgba(59, 130, 246, 0.12) 25px, rgba(59, 130, 246, 0.12) 26px);
                }
            `}</style>

            {/* Back Button */}
            <motion.div 
                className="fixed top-6 left-6 z-50"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <button 
                    onClick={() => navigate(-1)}
                    aria-label="Go back to previous page"
                    className="group flex items-center gap-1.5 px-0 py-2 text-[#007AFF] cursor-pointer"
                >
                    <FiChevronLeft className="text-2xl active:opacity-50 transition-opacity" />
                    <span className="font-medium text-[17px] tracking-tight active:opacity-50 transition-opacity">Back</span>
                </button>
            </motion.div>

            <div className="detail-root relative z-10 w-full flex flex-col lg:flex-row max-w-[1600px] mx-auto min-h-screen lg:min-h-[900px] pb-24 lg:pb-20">

                {/* LEFT SIDE: Polaroid + Title */}
                <div className="lg:w-[45%] flex items-start justify-center p-8 pt-24 lg:p-12 xl:p-16 h-fit">
                    <motion.div
                        className="flex flex-col items-center gap-8 max-w-md w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        {/* Polaroid */}
                        <motion.div
                            initial={{ rotate: 0, scale: 1 }}
                            animate={{ rotate: 0, scale: 1 }}
                        >
                            <div className="relative bg-white p-4 pb-4 sm:p-5 sm:pb-5 shadow-[4px_8px_24px_rgba(0,0,0,0.1)] border border-neutral-100 transition-all duration-500 w-[320px] sm:w-[380px]">
                                
                                {/* Header Accent */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-neutral-900/5" />

                                <div className="relative w-full aspect-[4/3] bg-neutral-100 overflow-hidden">
                                    <img 
                                        src={project.image} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover" 
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Title + Subtitle */}
                        <div className="text-center">
                            <h1 className="text-4xl sm:text-6xl font-black text-neutral-900 mb-3 tracking-tighter leading-[1.1]">
                                {project.title}
                            </h1>
                            <p className="text-neutral-500 font-medium leading-relaxed max-w-sm mx-auto text-[15px] tracking-tight">
                                {project.subtitle}
                            </p>
                        </div>

                        {/* Meta Labels */}
                        <div className="flex flex-wrap gap-2.5 items-center justify-center">
                            {project.role && (
                                <div className="px-4 py-2 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-[0.15em] rounded-lg shadow-sm">
                                    {project.role}
                                </div>
                            )}
                            {project.duration && (
                                <div className="px-4 py-2 bg-white border border-neutral-200 text-neutral-600 text-[10px] font-bold uppercase tracking-[0.1em] rounded-lg shadow-sm flex items-center gap-1.5">
                                    <FiActivity className="text-[12px] text-blue-500" />
                                    {project.duration}
                                </div>
                            )}
                            {project.year && (
                                <div className="px-4 py-2 bg-blue-50 border border-blue-100 text-[#007aff] text-[10px] font-bold uppercase tracking-[0.1em] rounded-lg shadow-sm">
                                    {project.year}
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col items-center gap-6 mt-4">
                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 items-center justify-center">
                                {project.techstack.map((tech, idx) => {
                                    const icon = getTechIcon(tech);
                                    return (
                                        <div key={idx}
                                            className="flex items-center gap-2 px-3 py-1.5 bg-white shadow-[1px_2px_6px_rgba(0,0,0,0.08)] border border-neutral-100"
                                            style={{ borderRadius: '3px' }}>
                                            {icon && <img src={icon} alt={tech} className={`w-4 h-4 object-contain ${tech.toLowerCase() === "gsap" ? "scale-[3]" : ""}`} /> }
                                            <span className="text-[11px] font-bold text-neutral-600 tracking-wide uppercase">{tech}</span>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Mobile-only Visit Website (above keep scrolling) */}
                            <div className="lg:hidden flex justify-center w-full">
                                {project.url === "UNDER_MAINTENANCE" || project.url === "COMING_SOON" ? (
                                    <div className="relative px-8 py-3 bg-white text-neutral-400 font-bold text-xs border border-neutral-200 shadow-sm cursor-not-allowed uppercase tracking-widest rounded-lg">
                                        currently offline
                                    </div>
                                ) : project.url ? (
                                    <a 
                                        href={project.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="relative inline-flex items-center gap-2.5 px-8 py-3 bg-neutral-900 border border-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.2)] text-white font-bold text-sm rounded-full transition-all"
                                    >
                                        Visit Website <FaExternalLinkAlt className="text-[10px]" />
                                    </a>
                                ) : null}
                            </div>

                            {/* Integrated Scroll Hint */}
                            <motion.div 
                                className="flex flex-col items-center gap-1.5 opacity-60"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 0.6, y: 0 }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                            >
                                <span className="text-[11px] font-extrabold text-neutral-500 uppercase tracking-[0.2em]">
                                    keep scrolling
                                </span>
                                <motion.div
                                    animate={{ y: [0, 5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
                                        <path d="M7 13l5 5 5-5" />
                                    </svg>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT SIDE: Concept & Impact */}
                <div className="lg:w-[55%] px-6 lg:px-10 xl:px-14 py-16 lg:py-24 xl:py-28 flex flex-col gap-12 lg:items-start text-left items-center pt-10">

                    {/* Visit Website CTA (Desktop only — mobile version is in left column) */}
                    <div className="hidden lg:flex justify-start w-full">
                        {project.url === "UNDER_MAINTENANCE" || project.url === "COMING_SOON" ? (
                            <div className="relative px-8 py-3 bg-white text-neutral-400 font-bold text-xs border border-neutral-200 shadow-sm cursor-not-allowed uppercase tracking-widest rounded-lg">
                                currently offline
                            </div>
                        ) : project.url ? (
                            <a 
                                href={project.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="relative inline-flex items-center gap-2.5 px-8 py-3 bg-neutral-900 border border-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.2)] text-white font-bold text-sm rounded-full transition-all"
                            >
                                Visit Website <FaExternalLinkAlt className="text-[10px]" />
                            </a>
                        ) : null}
                    </div>

                    {/* Features - iOS Notes Style */}
                    {project.features && project.features.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="w-full max-w-xl"
                        >
                            <div className="relative bg-white rounded-[32px] p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-neutral-100 overflow-hidden">
                                <div className="flex flex-col gap-0 mb-8 border-b border-neutral-50 pb-4 text-center sm:text-left">
                                    <span className="text-neutral-400 text-[13px] font-medium tracking-tight">Today, 11:24 PM</span>
                                    <h3 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight mt-2">
                                        What I Did
                                    </h3>
                                </div>
                                
                                <ul className="space-y-5">
                                    {project.features.map((feature, idx) => (
                                        <motion.li key={idx}
                                            className="flex items-start gap-4 text-neutral-800 leading-[1.6] text-[15px] md:text-[16px]"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.6 + idx * 0.1 }}>
                                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-[#ff9500] shrink-0" />
                                            <span className="font-medium tracking-tight text-left">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    )}

                    {/* Impact & Outcome - iOS Notes Style */}
                    {project.impact && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="w-full max-w-xl"
                        >
                            <div className="relative bg-white rounded-[32px] p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.05)] border border-neutral-100 overflow-hidden">
                                <div className="flex flex-col gap-0 mb-6 border-b border-neutral-50 pb-4 text-center sm:text-left">
                                    <span className="text-neutral-400 text-[13px] font-medium tracking-tight">Project Summary • Key Outcomes</span>
                                    <h3 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight mt-2">
                                        Impact & Outcome
                                    </h3>
                                </div>

                                <div className="text-neutral-800 leading-[1.6] text-[15px] md:text-[16px] font-medium tracking-tight text-left">
                                    {project.impact}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

            </div>

            {/* FULL WIDTH SPANNED SECTIONS BOTTOM */}
            <div className="w-full flex flex-col items-center mt-12 pb-32 gap-32">

                {/* Process Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="w-full max-w-[1200px] flex flex-col items-center px-4"
                >
                    {(() => {
                        const iconMap = {
                            FiMessageSquare, FiMapPin, FiMap, FiLayout, FiStar, FiSearch, FiCode, FiDatabase, FiServer, FiCheckCircle, FiGlobe, FiLayers, FiCpu, FiActivity, FiTarget, FiPenTool
                        };

                        let title = "Project Process";
                        let processSteps = [];

                        if (project.processSteps) {
                            title = project.category === "Game" ? "Game Development Workflow" : 
                                    project.category === "Fullstack" ? "Technical Architecture" : 
                                    project.category === "Website" ? "Production Lifecycle" : "Design Process";
                                    
                            const positions = [
                                { top: "35%", left: "15%", labelPos: "top" },
                                { top: "65%", left: "32.5%", labelPos: "bottom" },
                                { top: "35%", left: "50%", labelPos: "top" },
                                { top: "65%", left: "67.5%", labelPos: "bottom" },
                                { top: "35%", left: "85%", labelPos: "top" },
                            ];
                            processSteps = project.processSteps.map((step, idx) => ({
                                ...step,
                                icon: iconMap[step.icon] || FiStar,
                                ...positions[idx]
                            }));
                        } else if (project.category === "Game") {
                            title = "Game Mechanics Workflow";
                            processSteps = [
                                { title: "Mechanics Design", icon: FiTarget, color: "bg-orange-600", top: "35%", left: "15%", labelPos: "top" },
                                { title: "Asset Pipeline", icon: FiPenTool, color: "bg-rose-500", top: "65%", left: "32.5%", labelPos: "bottom" },
                                { title: "Logic & Physics", icon: FiCode, color: "bg-blue-600", top: "35%", left: "50%", labelPos: "top" },
                                { title: "Playtesting", icon: FiActivity, color: "bg-emerald-500", top: "65%", left: "67.5%", labelPos: "bottom" },
                                { title: "Build Release", icon: FiGlobe, color: "bg-amber-500", top: "35%", left: "85%", labelPos: "top" },
                            ];
                        } else if (project.category === "Fullstack") {
                            title = "System Architecture";
                            processSteps = [
                                { title: "DB Schematics", icon: FiDatabase, color: "bg-indigo-600", top: "35%", left: "15%", labelPos: "top" },
                                { title: "API Infrastructure", icon: FiServer, color: "bg-slate-700", top: "65%", left: "32.5%", labelPos: "bottom" },
                                { title: "Backend Logic", icon: FiCpu, color: "bg-sky-600", top: "35%", left: "50%", labelPos: "top" },
                                { title: "Frontend Sync", icon: FiLayout, color: "bg-blue-500", top: "65%", left: "67.5%", labelPos: "bottom" },
                                { title: "Cloud Deployment", icon: FiGlobe, color: "bg-amber-500", top: "35%", left: "85%", labelPos: "top" },
                            ];
                        } else if (project.category === "Website") {
                            title = "Web Production Cycle";
                            processSteps = [
                                { title: "Audit & Analysis", icon: FiSearch, color: "bg-purple-500", top: "35%", left: "15%", labelPos: "top" },
                                { title: "Component Arch", icon: FiLayers, color: "bg-slate-600", top: "65%", left: "32.5%", labelPos: "bottom" },
                                { title: "Interface Build", icon: FiLayout, color: "bg-emerald-500", top: "35%", left: "50%", labelPos: "top" },
                                { title: "Client Side Logic", icon: FiCode, color: "bg-sky-500", top: "65%", left: "67.5%", labelPos: "bottom" },
                                { title: "Vercel Edge", icon: FiGlobe, color: "bg-amber-500", top: "35%", left: "85%", labelPos: "top" },
                            ];
                        } else {
                            title = "Design Methodology";
                            processSteps = [
                                { title: "User Research", icon: FiMessageSquare, color: "bg-blue-500", top: "35%", left: "15%", labelPos: "top" },
                                { title: "Journey Flow", icon: FiMapPin, color: "bg-[#0ea5e9]", top: "65%", left: "32.5%", labelPos: "bottom" },
                                { title: "Info Architecture", icon: FiMap, color: "bg-[#22c55e]", top: "35%", left: "50%", labelPos: "top" },
                                { title: "Wireframing", icon: FiLayout, color: "bg-lime-500", top: "65%", left: "67.5%", labelPos: "bottom" },
                                { title: "Hi-Fi Prototyping", icon: FiStar, color: "bg-[#f59e0b]", top: "35%", left: "85%", labelPos: "top" },
                            ];
                        }

                        return (
                            <div className="relative w-full py-12 flex flex-col items-center">
                                <div className="text-center mb-24 relative w-fit mx-auto">
                                    <h3 className="text-2xl md:text-[32px] font-black relative z-10 tracking-tight text-neutral-900">
                                        {title}
                                    </h3>
                                </div>

                                <div className="hidden 2xl:block relative w-full h-[320px] mx-auto">
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 400">
                                        <line 
                                            x1="50" y1="200" x2="950" y2="200" 
                                            stroke="#e2e8f0" strokeWidth="2" strokeDasharray="8, 8" strokeLinecap="round"
                                        />
                                    </svg>

                                    {processSteps.map((step, idx) => (
                                        <div key={idx} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10" style={{ top: step.top, left: step.left }}>
                                            {step.labelPos === 'top' && (
                                                <div className="absolute -top-12 flex flex-col items-center">
                                                    <span className="text-neutral-900 font-bold text-[13px] whitespace-nowrap tracking-wide leading-none">
                                                        {step.title}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center relative shadow-sm border border-neutral-200">
                                                <div className="absolute inset-1.5 rounded-full border-[1.5px] border-dashed border-neutral-400 animate-[spin_30s_linear_infinite]"></div>
                                                <div className={`w-[52px] h-[52px] rounded-full ${step.color} flex items-center justify-center text-white relative z-10 shadow-[0_4px_12px_rgba(0,0,0,0.1)]`}>
                                                    <step.icon size={22} />
                                                </div>
                                            </div>
                                            {step.labelPos === 'bottom' && (
                                                <div className="absolute -bottom-14 flex flex-col items-center">
                                                    <span className="text-neutral-900 font-bold text-[13px] whitespace-nowrap tracking-wide leading-tight">
                                                        {step.title}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="2xl:hidden relative flex flex-col gap-12 pl-6 w-full max-w-sm mx-auto">
                                    <div className="absolute left-[3.5rem] top-10 bottom-10 w-[2px] border-l-[2px] border-dashed border-neutral-300"></div>
                                    {processSteps.map((step, idx) => (
                                        <div key={idx} className="relative flex items-center gap-8 z-10">
                                            <div className="w-[72px] h-[72px] bg-white rounded-full flex items-center justify-center relative shrink-0 border border-neutral-200 shadow-sm">
                                                <div className="absolute inset-1.5 rounded-full border-[1.5px] border-dashed border-neutral-300 animate-[spin_30s_linear_infinite]"></div>
                                                <div className={`w-[48px] h-[48px] rounded-full ${step.color} flex items-center justify-center text-white relative z-10 shadow-sm`}>
                                                    <step.icon size={20} />
                                                </div>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-1">Phase 0{idx+1}</span>
                                                <span className="text-neutral-900 font-extrabold text-[16px] leading-tight">
                                                    {step.title}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })()}
                </motion.div>

                {project.pageImages && project.pageImages.length > 0 && (
                    <div className="w-full flex flex-col items-center gap-24 mt-20">
                        <div className="text-center relative w-fit flex flex-col items-center mx-auto">
                            <h3 className="text-[10px] font-black text-neutral-400 tracking-[0.4em] uppercase opacity-50">
                                Page Breakdown
                            </h3>
                            <div className="w-8 h-[2px] bg-neutral-200 mt-4 rounded-full"></div>
                        </div>

                        <div className="flex flex-col gap-32 lg:gap-40 w-full items-center max-w-[1400px] px-4">
                            {project.pageImages.map((img, i) => {
                                const isMobile = project.slug === "thinkways" || project.slug === "certix" || project.slug === "nance" || project.slug === "whoof-meow";
                                const isEven = i % 2 === 0;

                                return (
                                    <div key={i} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center lg:items-center justify-center gap-8 lg:gap-16 w-full group overflow-hidden lg:overflow-visible transition-all duration-300
                                        bg-white lg:bg-transparent p-6 md:p-8 lg:p-0 relative
                                        mb-8 lg:mb-0
                                    `}>

                                        <div className={`w-full lg:w-[40%] flex flex-col ${isEven ? 'lg:items-start lg:text-left' : 'lg:items-end lg:text-right'} items-start relative z-20`}>
                                            <div className="lg:hidden bg-[#1a1a1a] text-white px-5 py-2 mt-2 mb-6 shadow-md self-start ml-2 lg:ml-0 rounded">
                                                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase">
                                                    SECTION 0{i + 1}
                                                </h4>
                                            </div>

                                            <div className="hidden lg:flex items-center gap-2 mb-2 w-full">
                                                <h4 className="text-[11px] font-bold text-neutral-400 tracking-[0.2em] uppercase w-full">
                                                    SECTION 0{i + 1}
                                                </h4>
                                            </div>
                                            
                                            <div className="relative inline-block mb-3 w-full">
                                                <h5 className="text-2xl md:text-4xl font-black text-neutral-900 tracking-tight z-10 relative w-full">
                                                    {img.title}
                                                </h5>
                                            </div>

                                            <p className={`text-neutral-600 text-sm md:text-base leading-relaxed z-10 relative w-full text-left ${!isEven ? 'lg:text-right' : 'lg:text-left'}`}>
                                                {img.desc || `Detailed breakdown of the ${img.title.toLowerCase()} flow, highlighting user journey, accessibility, and clean interface information architecture.`}
                                            </p>
                                        </div>

                                        <div className={`w-full lg:w-[60%] flex ${isEven ? 'lg:justify-start' : 'lg:justify-end'} justify-center relative mt-8 lg:mt-0`}>
                                            <div className={`relative z-10 w-full flex justify-center ${isEven ? 'lg:justify-start' : 'lg:justify-end'} ${isMobile ? 'max-w-[200px] md:max-w-[240px]' : 'max-w-[800px] md:max-w-[900px]'}`}>
                                                <img 
                                                    src={img.src} 
                                                    alt={img.title} 
                                                    loading="lazy"
                                                    className={`w-full h-auto object-contain relative z-20 ${isMobile ? 'shadow-[0_20px_40px_rgba(0,0,0,0.12)] rounded-[1.5rem] md:rounded-[1.8rem] border-[5px] border-[#1a1a1a] bg-white' : 'shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)]'}`} 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
