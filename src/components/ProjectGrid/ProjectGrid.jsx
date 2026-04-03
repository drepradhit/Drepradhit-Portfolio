import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { listTools } from "../../data";
import StikerHP from "/assets/Stiker/hp.png";
import StikerKuning from "/assets/Stiker/kuning.png";
import StikerPala from "/assets/Stiker/pala.png";
import StikerRadio from "/assets/Stiker/radio.png";

// Binder clip SVG
function BinderClip({ color = '#333', size = 24 }) {
    return (
        <svg width={size} height={size * 1.4} viewBox="0 0 30 42" fill="none">
            <path d="M6 8 C6 3, 10 0, 15 0 C20 0, 24 3, 24 8" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M9 8 C9 5, 11 2, 15 2 C19 2, 21 5, 21 8" stroke={color} strokeWidth="1.5" fill="none" opacity="0.5"/>
            <rect x="4" y="8" width="22" height="14" rx="2" fill={color} />
            <rect x="6" y="10" width="18" height="3" rx="1" fill="white" opacity="0.2" />
            <rect x="10" y="16" width="10" height="1" rx="0.5" fill="white" opacity="0.15" />
            <rect x="10" y="18" width="10" height="1" rx="0.5" fill="white" opacity="0.15" />
            <rect x="6" y="22" width="18" height="6" rx="1" fill={color} opacity="0.85" />
        </svg>
    );
}

// Pushpin SVG
function Pushpin({ color = '#1e293b', size = 18 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="10" r="7" fill={color} />
            <circle cx="10" cy="8" r="2.5" fill="white" opacity="0.3" />
            <line x1="12" y1="17" x2="12" y2="24" stroke="#666" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="10" r="3" fill={color} filter="brightness(0.8)" />
        </svg>
    );
}

function BoardCard({ project, index, pos }) {
    const clipColors = ['#1e293b', '#334155', '#475569', '#64748b', '#94a3b8', '#cbd5e1'];
    const clipColor = clipColors[index % clipColors.length];
    const pinColors = ['#1e293b', '#0f172a', '#334155', '#3498db', '#2980b9', '#0284c7'];
    const titleColors = ['#1e293b', '#334155', '#0f172a', '#0369a1', '#1e293b', '#075985'];

    // Alternate between clips and pins
    const usePin = index % 3 === 0;

    const clipPositions = [
        { top: '-18px', left: '50%', transform: 'translateX(-50%)' },
        { top: '-18px', left: '35%', transform: 'rotate(-5deg)' },
        { top: '-18px', right: '30%', transform: 'rotate(3deg)' },
        { top: '-18px', left: '45%', transform: 'translateX(-50%) rotate(-2deg)' },
        { top: '-18px', right: '25%', transform: 'rotate(5deg)' },
        { top: '-18px', left: '40%', transform: 'rotate(-3deg)' },
    ];
    const clipPos = clipPositions[index % clipPositions.length];

    const pinPos = { top: '-8px', left: '50%', transform: 'translateX(-50%)' };

    // 3D tilt
    const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
        const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 6;
        setTilt({ rotateX, rotateY });
    };

    const handleMouseLeave = () => {
        setTilt({ rotateX: 0, rotateY: 0 });
        setIsHovered(false);
    };

    // Some cards are "instant photo" style (thicker bottom), some are simple prints
    const isInstant = index % 2 === 0;

    return (
        <Link
            to={`/project/${project.slug}`}
            className="block group"
            onClick={() => {
                sessionStorage.setItem("home_scroll_pos", window.scrollY.toString());
                sessionStorage.setItem("should_restore_scroll", "true");
            }}
        >
            <motion.div
                className="absolute cursor-pointer"
                style={{
                    top: pos.top,
                    left: pos.left,
                    width: pos.width,
                    zIndex: isHovered ? 50 : pos.zIndex,
                    perspective: '600px',
                }}
                initial={{ opacity: 0, scale: 0.85, rotate: pos.rotate }}
                whileInView={{ opacity: 1, scale: 1, rotate: pos.rotate }}
                whileHover={{ 
                    scale: 1.06, 
                    rotate: pos.rotate * 0.2,
                    y: -8,
                }}
                viewport={{ once: true }}
                transition={{ 
                    default: { delay: index * 0.1, duration: 0.5, ease: 'easeOut' },
                    scale: { type: 'spring', stiffness: 180, damping: 16 },
                    rotate: { type: 'spring', stiffness: 180, damping: 16 },
                    y: { type: 'spring', stiffness: 180, damping: 16 },
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
            >
                <div 
                    className="relative"
                    style={{
                        transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
                        transformStyle: 'preserve-3d',
                        boxShadow: isHovered 
                            ? `${-tilt.rotateY * 1.5}px ${tilt.rotateX * 1.5 + 12}px 30px rgba(0,0,0,0.25)` 
                            : '2px 4px 12px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.08)',
                    }}
                >


                    {/* Card body */}
                    <div className={`bg-[#faf8f4] ${isInstant ? 'p-[5px] pb-10' : 'p-[5px] pb-7'}`}>
                        {/* Photo */}
                        <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-200">
                            <img 
                                src={project.image} 
                                alt={project.title}
                                width="400"
                                height="300"
                                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" 
                            />
                            <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] pointer-events-none" />
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.08)_100%)] pointer-events-none" />
                        </div>

                        {/* Caption area */}
                        <div className={`flex items-end justify-between ${isInstant ? 'mt-1.5 px-1' : 'mt-1 px-0.5'}`}>
                            <div className="min-w-0 flex-1">
                                <span 
                                    className="block font-bold truncate leading-tight"
                                    style={{ 
                                        fontFamily: "'Permanent Marker', cursive", 
                                        color: titleColors[index % titleColors.length],
                                        fontSize: 'clamp(9px, 0.9vw, 14px)',
                                        fontWeight: '400',
                                    }}
                                >
                                    {project.title}
                                </span>
                                {isInstant && (
                                    <span className="block text-[8px] text-neutral-400 mt-0.5"
                                          style={{ fontFamily: "'Caveat', cursive" }}>
                                        {project.category} • {project.year}
                                    </span>
                                )}
                            </div>
                            <div className="flex gap-[2px] shrink-0 ml-1">
                                {project.techstack.slice(0, 2).map((tech, i) => {
                                    const tool = listTools.find(t => t.nama.toLowerCase() === tech.toLowerCase());
                                    return tool ? (
                                        <img key={i} src={tool.gambar} alt={tech} className="w-3 h-3 object-contain opacity-40 group-hover:opacity-75 transition-opacity" />
                                    ) : null;
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Aged paper edge */}
                    <div className="absolute inset-0 pointer-events-none border border-neutral-300/30" />
                </div>
            </motion.div>
        </Link>
    );
}

// Spread across full board — cards fill left AND right
const boardPositions = [
    // Top row — staggered heights, pushed down from edge
    { top: '8%',  left: '2%',   rotate: -3,  width: '20%', zIndex: 14 },
    { top: '6%',  left: '25%',  rotate: 2,   width: '19%', zIndex: 20 },
    { top: '10%', left: '50%',  rotate: -1.5,width: '21%', zIndex: 18 },
    // Bottom row — staggered, spread wide
    { top: '54%', left: '4%',   rotate: 2.5, width: '18%', zIndex: 16 },
    { top: '50%', left: '27%',  rotate: -2,  width: '21%', zIndex: 22 },
    { top: '52%', left: '55%',  rotate: 1.5, width: '20%', zIndex: 15 },
];

// Decorative elements scattered on the board (Now STATIC for premium look)
function BoardDecorations({ isShowcase = false, isMobile = false }) {
    return (
        <>
            {/* Post-it note - View All (Desktop only) */}
            {!isShowcase && !isMobile && (
                <Link to="/showcase" className="absolute top-[8%] left-[74%] z-50 w-[20%] rotate-[4deg] group cursor-pointer"
                      onClick={() => {
                          sessionStorage.setItem("home_scroll_pos", window.scrollY.toString());
                          sessionStorage.setItem("should_restore_scroll", "true");
                      }}>
                    <motion.div 
                        className="bg-[#fff176] p-3 shadow-[2px_3px_6px_rgba(0,0,0,0.12)] border border-[#f5e656] group-hover:bg-[#ffea4c] transition-colors" 
                        style={{ clipPath: 'polygon(0% 0%, 100% 2%, 98% 100%, 2% 97%)' }}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                    >
                        <p className="text-[14px] text-neutral-800 leading-tight font-bold text-center underline decoration-wavy decoration-slate-400" style={{ fontFamily: "'Caveat', cursive" }}>
                            View All Projects!
                        </p>
                    </motion.div>
                </Link>
            )}

            {/* Desktop only stickers - hid on mobile because mobile uses tailored small stickers */}
            {!isMobile && (
                <>
                    {/* Radio Sticker */}
                    <div className="absolute top-[48%] left-[85%] z-20 rotate-[15deg] w-48 h-auto opacity-100 drop-shadow-lg scale-110">
                        <img src={StikerRadio} alt="Radio Sticker" className="w-full h-auto pointer-events-none" />
                    </div>

                    {/* Kuning Sticker */}
                    <div className="absolute top-[22%] left-[78%] z-20 rotate-[8deg] w-56 h-auto drop-shadow-xl scale-105">
                        <img src={StikerKuning} alt="Circle Sticker" className="w-full h-auto pointer-events-none" />
                    </div>

                    {/* Pala Sticker */}
                    {/* Removed pink face sticker */}

                    {/* HP Sticker */}
                    <div className="absolute top-[75%] left-[82%] z-20 rotate-[-8deg] w-36 h-auto opacity-100 drop-shadow-md">
                        <img src={StikerHP} alt="Phone Sticker" className="w-full h-auto pointer-events-none" />
                    </div>
                </>
            )}

            {/* Washi tape strip - coral */}
            <div className="absolute top-[93%] left-[12%] z-5 w-[14%] h-[10px] rotate-[-2deg] opacity-60 pointer-events-none"
                 style={{ 
                     background: 'repeating-linear-gradient(90deg, #94a3b8 0px, #94a3b8 4px, #cbd5e1 4px, #cbd5e1 8px)',
                     clipPath: 'polygon(0% 10%, 100% 0%, 98% 100%, 2% 90%)',
                     mixBlendMode: 'multiply',
                 }} />

            {/* Washi tape strip - blue */}
            <div className="absolute top-[92%] left-[55%] z-5 w-[10%] h-[8px] rotate-[2deg] opacity-45 pointer-events-none"
                 style={{ 
                     background: 'repeating-linear-gradient(90deg, #90caf9 0px, #90caf9 3px, #bbdefb 3px, #bbdefb 6px)',
                     clipPath: 'polygon(1% 5%, 99% 0%, 100% 100%, 0% 95%)',
                     mixBlendMode: 'multiply',
                 }} />

            {/* Vintage stamp */}
            <div className="absolute top-[85%] left-[4%] z-10 rotate-[8deg]">
                <div className="px-2 py-1 border-2 border-slate-400/50 rounded-sm opacity-50" style={{ borderStyle: 'double' }}>
                    <span className="text-[7px] font-black text-slate-400/60 tracking-widest uppercase">Portfolio</span>
                </div>
            </div>

            {/* Washi tape - slate vertical right side */}
            <div className="absolute top-[28%] left-[93%] z-5 w-[5%] h-[35px] rotate-[88deg] opacity-50"
                 style={{ 
                     background: 'repeating-linear-gradient(0deg, #94a3b8 0px, #94a3b8 4px, #cbd5e1 4px, #cbd5e1 8px)',
                     clipPath: 'polygon(0% 5%, 100% 0%, 98% 100%, 2% 95%)',
                     mixBlendMode: 'multiply',
                 }} />
        </>
    );
}


export default function ProjectGrid({ projects }) {
    const [isMobile, setIsMobile] = useState(false);
    const desktopBoardRef = useRef(null);
    const mobileBoardRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isMobile) {
        const titleColors = ['#1e293b', '#0277bd', '#0f172a', '#334155', '#475569', '#c62828'];
        const pinColors = ['#475569', '#3498db', '#94a3b8', '#1e293b', '#334155', '#0f172a'];
        const rotations = [-2, 1.5, -1.5, 2, -1, 2.5];

        return (
            <div className="w-full py-8">
                <div className="relative rounded-xl"
                     ref={mobileBoardRef}
                     style={{
                         border: '4px solid #a08060',
                         backgroundColor: '#b5885a',
                         backgroundImage: `
                             url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E"),
                             radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)
                         `,
                         backgroundSize: '200px 200px, 12px 12px',
                         boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.15), 0 6px 20px rgba(0,0,0,0.2)',
                         padding: '16px',
                     }}>
                    
                    {/* Post-it title sticking out of top-left */}
                    <div className="absolute -top-4 -left-2 z-30 pointer-events-none rotate-[-5deg]">
                        <div className="relative bg-[#fffde7] px-4 py-1.5 shadow-[2px_3px_8px_rgba(0,0,0,0.15)]">
                            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 z-10">
                                <Pushpin color="#1e293b" size={12} />
                            </div>
                            <h2 className="text-base text-neutral-700 font-normal uppercase tracking-tight" 
                                style={{ fontFamily: "'Permanent Marker', cursive" }}>
                                recent projects
                            </h2>
                        </div>
                    </div>

                    {/* Mobile Stickers — Outside overflow-hidden so they can stick out */}
                    {/* Pala Sticker — between row 1 & 2, center */}
                    {/* Removed pink face sticker */}

                    {/* Radio Sticker — between row 2 & 3, right */}
                    <div className="absolute top-[64%] right-[-8px] z-30 rotate-[12deg] w-14 h-auto pointer-events-none">
                        <img src={StikerRadio} alt="Radio Sticker" className="w-full h-auto" />
                    </div>

                    {/* Kuning Sticker — top right corner sticking out */}
                    <div className="absolute top-[-24px] right-[-12px] z-30 rotate-[6deg] w-16 h-auto pointer-events-none">
                        <img src={StikerKuning} alt="Circle Sticker" className="w-full h-auto" />
                    </div>

                    {/* Decorative elements — Back inside for clean static look */}
                    <BoardDecorations isMobile={true} />

                    {/* Inner clip container to preserve board boundaries for cards ONLY */}
                    <div className="relative w-full h-full overflow-hidden rounded-lg p-4 pt-10">
                        {/* Cork texture overlays */}
                        <div className="absolute inset-0 opacity-[0.25] pointer-events-none mix-blend-multiply z-0"
                             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cork-wallet.png")' }} />
                        <div className="absolute inset-0 opacity-[0.1] pointer-events-none mix-blend-multiply z-0"
                             style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/sandpaper.png")' }} />

                        {/* Inner shadow */}
                        <div className="absolute inset-0 shadow-[inset_0_4px_16px_rgba(0,0,0,0.12)] pointer-events-none z-10 rounded-lg" />
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#c9975f]/15 via-transparent to-[#8b6f47]/20 pointer-events-none z-10" />

                        <div className="relative grid grid-cols-2 gap-4 z-20">
                        {projects.map((project, index) => (
                            <Link key={project.id} to={`/project/${project.slug}`}
                                onClick={() => {
                                    sessionStorage.setItem("home_scroll_pos", window.scrollY.toString());
                                    sessionStorage.setItem("should_restore_scroll", "true");
                                }}>
                                <motion.div
                                    className="relative bg-[#faf8f4]"
                                    style={{ 
                                        transform: `rotate(${rotations[index % rotations.length]}deg)`,
                                        boxShadow: '2px 4px 12px rgba(0,0,0,0.2)',
                                    }}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    <div className="p-[4px] pb-0">
                                        <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-100">
                                            <img 
                                                src={project.image} 
                                                alt={project.title} 
                                                width="300"
                                                height="225"
                                                className="w-full h-full object-cover" 
                                            />
                                            <div className="absolute inset-0 shadow-[inset_0_0_8px_rgba(0,0,0,0.08)] pointer-events-none" />
                                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.06)_100%)] pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="px-1.5 pt-1 pb-2">
                                        <span className="block text-[11px] truncate uppercase tracking-tighter"
                                              style={{ fontFamily: "'Permanent Marker', cursive", color: titleColors[index % titleColors.length] }}>
                                            {project.title}
                                        </span>
                                        <span className="block text-[8px] text-neutral-400"
                                              style={{ fontFamily: "'Caveat', cursive" }}>
                                            {project.category} • {project.year}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 pointer-events-none border border-neutral-300/30" />
                                </motion.div>
                            </Link>
                        ))}
                        </div>

                        {/* Safe Mobile Bottom "View All Projects" Call to Action */}
                        <div className="flex justify-center mt-8 w-full pb-2 relative z-30">
                            <Link to="/showcase" className="block group cursor-pointer"
                                  onClick={() => {
                                      sessionStorage.setItem("home_scroll_pos", window.scrollY.toString());
                                      sessionStorage.setItem("should_restore_scroll", "true");
                                  }}>
                                <motion.div 
                                    className="bg-[#fff176] px-6 py-2.5 shadow-[2px_3px_6px_rgba(0,0,0,0.12)] border border-[#f5e656] rotate-[2deg] group-hover:bg-[#ffea4c] transition-colors"
                                    style={{ clipPath: 'polygon(0% 0%, 100% 2%, 98% 100%, 2% 97%)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <p className="text-lg text-neutral-800 leading-tight font-bold text-center underline decoration-wavy decoration-slate-400" style={{ fontFamily: "'Caveat', cursive" }}>
                                        View All Projects!
                                    </p>
                                </motion.div>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    // Desktop: Realistic Cork Board
    return (
        <div className="w-full">
            {/* Outer wrapper — allows post-it to stick out */}
            <div className="relative w-full rounded-xl"
                 style={{
                     border: '10px solid #8b6f47',
                     borderImage: 'linear-gradient(135deg, #a07850 0%, #c4a068 25%, #8b6f47 50%, #a07850 75%, #c4a068 100%) 1',
                     boxShadow: '0 16px 56px rgba(0,0,0,0.2), inset 0 2px 16px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.1)',
                 }}>

                {/* Title pinned — lives outside overflow-hidden so it can stick out */}
                <motion.div 
                    className="absolute -top-6 -right-4 z-50 pointer-events-none"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: 'spring' }}
                >
                    <div className="relative bg-[#fffde7] px-5 py-2.5 shadow-[2px_4px_10px_rgba(0,0,0,0.15)] rotate-[-6deg]">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                            <Pushpin color="#1e293b" size={16} />
                        </div>
                        <h2 className="text-xl xl:text-2xl text-neutral-700 font-normal uppercase tracking-tight" 
                            style={{ fontFamily: "'Permanent Marker', cursive" }}>
                            recent projects
                        </h2>
                    </div>
                </motion.div>

                {/* Inner board — overflow hidden so cards don't bleed out */}
                <div className="relative w-full overflow-hidden rounded-sm"
                     ref={desktopBoardRef}
                     style={{
                         backgroundColor: '#b5885a',
                         backgroundImage: `
                             url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E"),
                             radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)
                         `,
                         backgroundSize: '300px 300px, 16px 16px',
                         aspectRatio: '16 / 9',
                     }}>
                    
                    {/* Cork texture overlays */}
                    <div className="absolute inset-0 opacity-[0.35] pointer-events-none mix-blend-multiply"
                         style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cork-wallet.png")' }} />
                    <div className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-multiply"
                         style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/sandpaper.png")' }} />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#c9975f]/20 via-transparent to-[#8b6f47]/30 pointer-events-none" />
                    
                    {/* Inner shadow */}
                    <div className="absolute inset-0 shadow-[inset_0_6px_24px_rgba(0,0,0,0.15)] pointer-events-none z-30 rounded-sm" />

                    {/* Decorative elements — Back inside for clean static look */}
                    <BoardDecorations />

                    {/* Project cards */}
                    {projects.map((project, index) => {
                        const pos = boardPositions[index % boardPositions.length];
                        return (
                            <BoardCard 
                                key={project.id} 
                                project={project} 
                                index={index} 
                                pos={pos} 
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
