import { useParams, useNavigate } from "react-router-dom";
import { listProyek, listTools } from "../../data";
import { motion } from "framer-motion";
import { FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
import { FiMessageSquare, FiMapPin, FiMap, FiLayout, FiStar, FiSearch, FiCode, FiDatabase, FiServer, FiCheckCircle, FiGlobe, FiLayers } from "react-icons/fi";
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
        <div className="relative w-full min-h-screen bg-[#f8fafc] text-neutral-800 selection:bg-blue-100/50"
             style={{ 
                 backgroundImage: `
                     linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)
                 `,
                 backgroundSize: '40px 40px'
             }}>

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
                    className="group flex items-center gap-2 px-5 py-2.5 bg-[#fefcf5] border border-[#e5ddd0] shadow-[2px_3px_8px_rgba(0,0,0,0.08)] hover:shadow-[3px_5px_12px_rgba(0,0,0,0.12)] transition-all duration-300 cursor-pointer rotate-[-2deg] hover:rotate-0"
                    style={{ borderRadius: '3px' }}
                >
                    <FaArrowLeft className="text-neutral-500 text-xs group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold text-sm text-neutral-600" style={{ fontFamily: "'Caveat', cursive" }}>go back</span>
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
                            initial={{ rotate: -5, scale: 0.9 }}
                            animate={{ rotate: -2, scale: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="relative bg-white p-4 pb-16 sm:p-5 sm:pb-20 shadow-[4px_8px_24px_rgba(0,0,0,0.1)] border border-neutral-100 rotate-[-2deg] hover:rotate-[-1deg] hover:scale-[1.02] transition-all duration-500 w-[320px] sm:w-[380px]">
                                
                                {/* Tape */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-7 washi-yellow rotate-[3deg] z-30"
                                     style={{ clipPath: 'polygon(2% 0%, 98% 3%, 96% 100%, 4% 97%)' }} />

                                <div className="relative w-full aspect-[4/3] bg-neutral-100 overflow-hidden">
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                </div>

                                <div className="absolute bottom-[4%] left-0 right-0 flex justify-center">
                                    <span style={{ fontFamily: "'Caveat', 'Kalam', cursive" }} className="text-2xl sm:text-3xl text-neutral-700 tracking-wide font-bold rotate-[-1deg]">
                                        {project.title}
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Title + Subtitle */}
                        <div className="text-center">
                            <h1 className="text-4xl sm:text-5xl font-bold text-[#2e1805] mb-3 leading-tight"
                                style={{ fontFamily: "'Playfair Display', serif" }}>
                                {project.title}
                            </h1>
                            <p className="text-neutral-500 italic leading-relaxed max-w-sm mx-auto text-base">
                                "{project.subtitle}"
                            </p>
                        </div>

                        {/* Meta Labels */}
                        <div className="flex flex-wrap gap-2.5 items-center justify-center">
                            {project.role && (
                                <motion.div className="px-4 py-2 bg-[#1f2937] text-white text-xs font-bold uppercase tracking-wider shadow-md rotate-[-1deg]"
                                    style={{ borderRadius: '2px', fontFamily: "'Space Mono', monospace" }}
                                    whileHover={{ rotate: 0, scale: 1.05 }}>
                                    {project.role}
                                </motion.div>
                            )}
                            {project.duration && (
                                <motion.div className="px-3 py-1.5 bg-white border border-neutral-200 text-neutral-600 text-xs font-bold uppercase tracking-wider shadow-sm rotate-[2deg]"
                                    style={{ borderRadius: '2px', fontFamily: "'Space Mono', monospace" }}
                                    whileHover={{ rotate: 0, scale: 1.05 }}>
                                    ⏱ {project.duration}
                                </motion.div>
                            )}
                            {project.year && (
                                <motion.div className="px-3 py-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wider shadow-sm rotate-[-1deg]"
                                    style={{ borderRadius: '2px', fontFamily: "'Space Mono', monospace" }}
                                    whileHover={{ rotate: 0, scale: 1.05 }}>
                                    {project.year}
                                </motion.div>
                            )}
                        </div>

                        <div className="flex flex-col items-center gap-6 mt-4">
                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 items-center justify-center">
                                {project.techstack.map((tech, idx) => {
                                    const icon = getTechIcon(tech);
                                    const rotations = ['rotate-[-2deg]', 'rotate-[1deg]', 'rotate-[-1deg]', 'rotate-[2deg]', 'rotate-0'];
                                    return (
                                        <motion.div key={idx}
                                            className={`flex items-center gap-2 px-3 py-1.5 bg-white shadow-[1px_2px_6px_rgba(0,0,0,0.08)] border border-neutral-100 ${rotations[idx % rotations.length]}`}
                                            style={{ borderRadius: '3px' }}
                                            whileHover={{ rotate: 0, scale: 1.1, zIndex: 10 }}>
                                            {icon && <img src={icon} alt={tech} className={`w-4 h-4 object-contain ${tech.toLowerCase() === "gsap" ? "scale-[3]" : ""}`} /> }
                                            <span className="text-[11px] font-bold text-neutral-600 tracking-wide uppercase">{tech}</span>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* Integrated Scroll Hint */}
                            <motion.div 
                                className="flex flex-col items-center gap-1.5 opacity-60"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 0.6, y: 0 }}
                                transition={{ delay: 1.2, duration: 0.8 }}
                            >
                                <span className="text-lg font-bold text-neutral-500 rotate-[-1deg]" style={{ fontFamily: "'Caveat', cursive" }}>
                                    keep scrolling!
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

                    {/* Features - Lined Paper Note */}
                    {project.features && project.features.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 30, rotate: 1 }}
                            animate={{ opacity: 1, y: 0, rotate: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="w-full max-w-xl"
                        >
                            <div className="relative p-7 md:p-10 bg-[#fdfdf5] shadow-[6px_10px_30px_rgba(0,0,0,0.1)] border border-[#e5ddd0] paper-lined overflow-visible" 
                                 style={{ borderRadius: '2px 3px 3px 2px' }}>

                                {/* Red margin line */}
                                <div className="absolute top-0 bottom-0 left-[50px] md:left-[60px] w-[2px] bg-red-400/40 z-10" />

                                {/* Paperclip */}
                                <div className="absolute -top-4 right-8 z-30 opacity-60" style={{ transform: 'rotate(15deg)' }}>
                                    <svg width="20" height="40" viewBox="0 0 24 48" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" className="w-5 h-10">
                                        <path d="M12 2C8.68629 2 6 4.68629 6 8V38C6 42.4183 9.58172 46 14 46C18.4183 46 22 42.4183 22 38V12C22 9.79086 20.2091 8 18 8C15.7909 8 14 9.79086 14 12V36C14 37.1046 13.1046 38 12 38C10.8954 38 10 37.1046 10 36V8C10 6.89543 10.8954 6 12 6C13.1046 6 14 6.89543 14 8V32" />
                                    </svg>
                                </div>

                                {/* Content */}
                                <div className="pl-[40px] md:pl-[50px]">
                                    <h3 className="text-2xl md:text-3xl font-bold text-[#854d0e] mb-5"
                                        style={{ fontFamily: "'Caveat', cursive" }}>
                                        What I Did
                                    </h3>
                                    <ul className="space-y-3.5">
                                        {project.features.map((feature, idx) => (
                                            <motion.li key={idx}
                                                className="flex items-start gap-3 text-neutral-700 leading-[1.8] font-medium text-[14px] md:text-[15px]"
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.6 + idx * 0.1 }}>
                                                <span className="mt-1.5 text-amber-500 text-lg leading-none">•</span>
                                                <span>{feature}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Dog-ear */}
                                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-neutral-200/80 to-transparent" 
                                     style={{ clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)' }} />
                            </div>
                        </motion.div>
                    )}

                    {/* Impact - Kraft Paper */}
                    {project.impact && (
                        <motion.div
                            initial={{ opacity: 0, y: 30, rotate: -2 }}
                            animate={{ opacity: 1, y: 0, rotate: -2 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="w-full max-w-xl"
                        >
                            <div className="relative p-6 md:p-8 shadow-[3px_6px_20px_rgba(0,0,0,0.1)] border border-[#c9b99a]"
                                 style={{
                                     borderRadius: '2px',
                                     backgroundColor: '#d1bfae',
                                     backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E\")",
                                 }}>

                                {/* Washi tape */}
                                <div className="absolute -top-2 left-6 w-16 h-5 washi-slate rotate-[-8deg] z-20"
                                     style={{ clipPath: 'polygon(0% 5%, 100% 0%, 98% 100%, 2% 95%)' }} />

                                <h3 className="text-2xl md:text-3xl font-bold text-[#3d2b1a] mb-4"
                                    style={{ fontFamily: "'Caveat', cursive" }}>
                                    Impact & Outcome
                                  </h3>

                                <p className="text-[#4a3520] leading-[1.9] font-medium text-[14px] md:text-[15px]">
                                    {project.impact}
                                </p>
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
                        let title = "Design Process";
                        let processSteps = [];

                        if (project.category === "Fullstack") {
                            title = "Technical Architecture";
                            processSteps = [
                                { title: "DB Modeling", icon: FiDatabase, color: "bg-indigo-600", top: "35%", left: "15%", labelPos: "top" },
                                { title: "API Development", icon: FiServer, color: "bg-slate-700", top: "65%", left: "32.5%", labelPos: "bottom" },
                                { title: "Logic & Logic", icon: FiCode, color: "bg-sky-500", top: "35%", left: "50%", labelPos: "top" },
                                { title: "QA Testing", icon: FiCheckCircle, color: "bg-emerald-600", top: "65%", left: "67.5%", labelPos: "bottom" },
                                { title: "Cloud Launch", icon: FiGlobe, color: "bg-amber-500", top: "35%", left: "85%", labelPos: "top" },
                            ];
                        } else if (project.category === "Web Development") {
                            title = "Development Lifecycle";
                            processSteps = [
                                { title: "Requirement", icon: FiSearch, color: "bg-purple-500", top: "35%", left: "15%", labelPos: "top" },
                                { title: "Architecture", icon: FiLayers, color: "bg-slate-600", top: "65%", left: "32.5%", labelPos: "bottom" },
                                { title: "UI/UX Build", icon: FiLayout, color: "bg-emerald-500", top: "35%", left: "50%", labelPos: "top" },
                                { title: "Coding & Integration", icon: FiCode, color: "bg-sky-500", top: "65%", left: "67.5%", labelPos: "bottom" },
                                { title: "Vercel Launch", icon: FiGlobe, color: "bg-amber-500", top: "35%", left: "85%", labelPos: "top" },
                            ];
                        } else {
                            title = "Design Process";
                            processSteps = [
                                { title: "User Interview", icon: FiMessageSquare, color: "bg-blue-500", top: "35%", left: "15%", labelPos: "top" },
                                { title: "Journey Mapping", icon: FiMapPin, color: "bg-[#0ea5e9]", top: "65%", left: "32.5%", labelPos: "bottom" },
                                { title: "Information Arch", icon: FiMap, color: "bg-[#22c55e]", top: "35%", left: "50%", labelPos: "top" },
                                { title: "Wireframing", icon: FiLayout, color: "bg-lime-500", top: "65%", left: "67.5%", labelPos: "bottom" },
                                { title: "Hi-Fi Prototype", icon: FiStar, color: "bg-[#f59e0b]", top: "35%", left: "85%", labelPos: "top" },
                            ];
                        }

                        return (
                            <div className="relative w-full py-12 flex flex-col items-center">
                                {/* Hand-drawn Circular Title */}
                                <div className="text-center mb-24 relative w-fit mx-auto">
                                    <h3 className="text-2xl md:text-[28px] font-bold relative z-10 tracking-tight text-neutral-800" style={{ fontFamily: "'Inter', sans-serif" }}>
                                        {title}
                                    </h3>
                                    <svg className="absolute -inset-x-8 -inset-y-4 w-[calc(100%+64px)] h-[calc(100%+32px)] text-neutral-800 pointer-events-none opacity-20" viewBox="0 0 240 60" preserveAspectRatio="none">
                                        <path d="M 5,30 C 5,5 235,5 235,30 C 235,55 5,55 5,30" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6, 4" />
                                    </svg>
                                </div>

                                {/* Desktop Snake Timeline */}
                                <div className="hidden 2xl:block relative w-full h-[320px] mx-auto">
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 1000 400" preserveAspectRatio="none">
                                        <path 
                                            d="M 50,200 C 50,140 100,140 150,140 C 200,140 275,260 325,260 C 375,260 450,140 500,140 C 550,140 625,260 675,260 C 725,260 800,140 850,140" 
                                            fill="none" stroke="#4a4a4a" strokeWidth="2.5" strokeDasharray="10, 10" strokeLinecap="round"
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
                                            <div className="w-[80px] h-[80px] bg-white rounded-full flex items-center justify-center relative group hover:scale-110 transition-transform duration-300 shadow-sm border border-neutral-200">
                                                <div className="absolute inset-1.5 rounded-full border-[1.5px] border-dashed border-neutral-400 animate-[spin_30s_linear_infinite]"></div>
                                                <div className={`w-[52px] h-[52px] rounded-full ${step.color} flex items-center justify-center text-white relative z-10 shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-105`}>
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

                                {/* Mobile Vertical Timeline */}
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
                    {/* Gallery Section */}
                {project.pageImages && project.pageImages.length > 0 && (
                    <div className="w-full flex flex-col items-center gap-24">
                        <div className="text-center relative w-fit flex flex-col items-center mx-auto">
                            <h3 className="text-xl md:text-2xl font-bold text-neutral-800 tracking-[0.2em] uppercase" style={{ fontFamily: "'Space Mono', monospace" }}>
                                Page Detail
                            </h3>
                            <div className="w-16 h-[2px] bg-neutral-300 mt-4 rounded-full"></div>
                        </div>

                        <div className="flex flex-col gap-32 lg:gap-40 w-full items-center max-w-[1400px] px-4">
                                {project.pageImages.map((img, i) => {
                                const isMobile = project.slug === "thinkways" || project.slug === "certix" || project.slug === "nance";
                                const isEven = i % 2 === 0;

                                return (
                                    <div key={i} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center lg:items-center justify-center gap-8 lg:gap-16 w-full group overflow-hidden lg:overflow-visible transition-all duration-300
                                        bg-white lg:bg-transparent p-6 md:p-8 lg:p-0 shadow-[0_4px_24px_rgba(0,0,0,0.06)] lg:shadow-none border border-[#e8dfd1] lg:border-none relative
                                        ${isEven ? 'rotate-[-1deg]' : 'rotate-[1deg]'} lg:rotate-0 mb-8 lg:mb-0
                                    `}>

                                        {/* Mobile Grid Paper Texture */}
                                        <div className="absolute inset-0 paper-lined opacity-40 lg:hidden pointer-events-none"></div>
                                        
                                        {/* Decorative Tape (Mobile Only) */}
                                        <div className={`absolute -top-3 ${isEven ? 'right-8 rotate-[4deg]' : 'left-8 rotate-[-3deg]'} lg:hidden ${['washi-slate', 'washi-green', 'washi-yellow'][i % 3]} w-20 h-8 z-20 mix-blend-multiply opacity-90 shadow-sm`}></div>

                                        {/* Text Annotation Area */}
                                        <div className={`w-full lg:w-[40%] flex flex-col ${isEven ? 'lg:items-start lg:text-left' : 'lg:items-end lg:text-right'} items-start relative z-20`}>
                                            
                                            {/* Black Label for PAGE #X (Mobile) */}
                                            <div className="lg:hidden bg-[#1a1a1a] text-white px-5 py-2 mt-2 mb-6 rotate-[-2deg] shadow-md self-start ml-2 lg:ml-0">
                                                <h4 className="text-xs font-bold tracking-[0.2em] uppercase" style={{ fontFamily: "'Space Mono', monospace" }}>
                                                    PAGE #{i + 1}
                                                </h4>
                                            </div>

                                            {/* Desktop Default Label */}
                                            <div className="hidden lg:flex items-center gap-2 mb-2 w-full">
                                                <h4 className={`text-[12px] md:text-sm font-bold text-neutral-400 tracking-[0.2em] uppercase w-full`} style={{ fontFamily: "'Space Mono', monospace" }}>
                                                    PAGE #{i + 1}
                                                </h4>
                                            </div>
                                            
                                            {/* Image Title with Marker Highlight (Mobile mimicking Screenshot) */}
                                            <div className="relative inline-block mb-5 w-full">
                                                <h5 className={`text-3xl md:text-3xl font-extrabold text-neutral-900 z-10 relative w-full`} style={{ fontFamily: "'Playfair Display', serif" }}>
                                                    {img.title}
                                                </h5>
                                                {/* Blue highlight swoosh (Mobile only) */}
                                                <div className="absolute bottom-1 -left-2 w-[105%] h-3 bg-sky-200/60 mix-blend-multiply -rotate-1 z-0 lg:hidden rounded-sm"></div>
                                            </div>

                                            {/* Description Text */}
                                            <p className={`text-neutral-600 text-sm md:text-base leading-relaxed z-10 relative w-full text-left ${!isEven ? 'lg:text-right' : 'lg:text-left'}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                                                {img.desc || `Detailed breakdown of the ${img.title.toLowerCase()} flow, highlighting user journey, accessibility, and clean interface information architecture.`}
                                            </p>

                                            {/* Clean Sweeping Arrow SVG (Desktop Only) */}
                                            <div className={`hidden lg:flex w-full ${isEven ? 'justify-end' : 'justify-start'} mt-6`}>
                                                <svg width="140" height="60" viewBox="0 0 140 60" fill="none" className={`text-neutral-400 opacity-80 ${!isEven ? 'scale-x-[-1]' : ''}`}>
                                                    <path d="M10 40 Q 60 15 125 30" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                                                    <path d="M105 20 L126 30 L110 45" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                        </div>

                                        {/* Smart Sizing Image Area */}
                                        <div className={`w-full lg:w-[60%] flex ${isEven ? 'lg:justify-start' : 'lg:justify-end'} justify-center relative mt-8 lg:mt-0`}>
                                            <div className={`relative z-10 w-full flex justify-center ${isEven ? 'lg:justify-start' : 'lg:justify-end'} ${isMobile ? 'max-w-[200px] md:max-w-[240px]' : 'max-w-[800px] md:max-w-[900px]'}`}>
                                                <img 
                                                    src={img.src} 
                                                    alt={img.title} 
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

                {/* CTA Button */}
                <div className="flex justify-center w-full pt-10">
                    {project.url === "UNDER_MAINTENANCE" || project.url === "COMING_SOON" ? (
                        <button disabled className="px-8 py-3 bg-[#fefcf5] text-neutral-400 font-bold uppercase tracking-wider text-xs border border-[#e5ddd0] shadow-sm cursor-not-allowed">
                            Currently Offline
                        </button>
                    ) : project.url ? (
                        <motion.a 
                            href={project.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2.5 px-8 py-3 bg-[#1f2937] text-white font-bold uppercase tracking-wider text-xs shadow-md"
                            whileHover={{ scale: 1.05 }}
                        >
                            Visit Website <FaExternalLinkAlt className="text-[10px]" />
                        </motion.a>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
