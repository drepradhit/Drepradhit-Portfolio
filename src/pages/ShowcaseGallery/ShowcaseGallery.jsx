import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { listProyekWeb, listProyekUIUX, listTools } from '../../data';
import { Link } from 'react-router-dom';

// Import stickers
import StikerHP from "/assets/Stiker/hp.png";
import StikerKuning from "/assets/Stiker/kuning.png";
import StikerPala from "/assets/Stiker/pala.png";
import StikerRadio from "/assets/Stiker/radio.png";

import { useState } from 'react';

function ShowcaseCard({ project, index }) {
    const titleColors = ['#1e293b', '#0277bd', '#0f172a', '#334155', '#475569', '#c62828'];
    const titleColor = titleColors[index % titleColors.length];
    
    // Some are instant photos
    const isInstant = index % 2 === 0;
    
    // Slight random rotation for masonry/flex look
    const initRotation = [-4, -2, 0, 2, 4][index % 5] + (Math.random() * 2 - 1);
    
    // 3D tilt mechanics matching ProjectGrid
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
    
    return (
        <Link to={`/project/${project.slug}`}
              className="block group cursor-pointer w-[46%] sm:w-[45%] md:w-full md:max-w-[280px]"
              onClick={() => {
                  sessionStorage.setItem("home_scroll_pos", window.scrollY.toString());
                  sessionStorage.setItem("should_restore_scroll", "true");
              }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.85, rotate: initRotation }}
                whileInView={{ opacity: 1, scale: 1, rotate: initRotation }}
                viewport={{ once: true }}
                transition={{ 
                    default: { delay: (index % 10) * 0.1, duration: 0.5, ease: 'easeOut' },
                    scale: { type: 'spring', stiffness: 180, damping: 16 },
                    rotate: { type: 'spring', stiffness: 180, damping: 16 },
                    y: { type: 'spring', stiffness: 180, damping: 16 },
                }}
                whileHover={{ 
                    scale: 1.06, 
                    rotate: initRotation * 0.2,
                    y: -8,
                    zIndex: 50
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                className="relative cursor-pointer h-full"
                style={{ perspective: '600px' }}
            >
                <div 
                    className="relative bg-[#faf8f4] flex flex-col justify-between h-full"
                    style={{
                        padding: isInstant ? '4px 4px 28px 4px' : '4px 4px 16px 4px',
                        transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out',
                        transformStyle: 'preserve-3d',
                        boxShadow: isHovered 
                            ? `${-tilt.rotateY * 1.5}px ${tilt.rotateX * 1.5 + 12}px 30px rgba(0,0,0,0.25)` 
                            : '2px 4px 12px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.08)',
                    }}
                >
                    <div>
                        <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-200">
                            <img 
                                src={project.image} 
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out" 
                            />
                            <div className="absolute inset-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.1)] pointer-events-none" />
                            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.08)_100%)] pointer-events-none" />
                        </div>
                    </div>

                    <div className={`flex items-end justify-between flex-1 ${isInstant ? 'mt-2 px-1' : 'mt-1.5 px-0.5'}`}>
                        <div className="min-w-0 flex-1">
                            <span 
                                className="block font-bold truncate leading-tight"
                                style={{ 
                                    fontFamily: "'Permanent Marker', cursive", 
                                    color: titleColor,
                                    fontSize: 'clamp(10px, 2vw, 16px)',
                                    fontWeight: '400',
                                }}
                            >
                                {project.title}
                            </span>
                            {isInstant && (
                                <span className="block text-[8px] md:text-[10px] text-neutral-400 mt-0.5"
                                      style={{ fontFamily: "'Caveat', cursive", lineHeight: 1 }}>
                                    {project.category} • {project.year}
                                </span>
                            )}
                        </div>
                        <div className="flex gap-[2px] shrink-0 ml-1">
                            {project.techstack.slice(0, 2).map((tech, i) => {
                                const tool = listTools.find(t => t.nama.toLowerCase() === tech.toLowerCase());
                                return tool ? (
                                    <img key={i} src={tool.gambar} alt={tech} className="w-3 md:w-4 h-3 md:h-4 object-contain opacity-40 group-hover:opacity-75 transition-opacity" />
                                ) : null;
                            })}
                        </div>
                    </div>
                    <div className="absolute inset-0 pointer-events-none border border-neutral-300/30" />
                </div>
            </motion.div>
        </Link>
    );
}

function SectionHeader({ title, color, rotateClass, alignClass }) {
    return (
        <div className={`w-full flex ${alignClass} mb-12 px-8 md:px-16 relative z-30`}>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${rotateClass}`}
                style={{ 
                    fontFamily: "'Caveat', cursive", 
                    color: color, 
                    textShadow: '2px 3px 6px rgba(0,0,0,0.15), 0 1px 2px rgba(255,255,255,0.2)' 
                }}>
                {title}
            </h2>
        </div>
    );
}

const ShowcaseGallery = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full min-h-screen bg-[#f8fafc] py-12 px-4 md:px-8">
            <style>{`
                body {
                  background-color: #f8fafc;
                  background-image: 
                    linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
                  background-size: 40px 40px;
                }
            `}</style>
            
            <div className="max-w-[1400px] mx-auto mt-4 md:mt-0">
                <div className="mb-16 md:mb-20 z-50 relative">
                    <Link to="/" className="inline-flex items-center gap-2 text-[#4a3728] hover:text-[#2c2118] font-medium transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-neutral-200">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                        Back to Portfolio
                    </Link>
                </div>

                <div className="relative w-full rounded-2xl"
                     style={{
                         border: '12px solid #8b6f47',
                         borderImage: 'linear-gradient(135deg, #a07850 0%, #c4a068 25%, #8b6f47 50%, #a07850 75%, #c4a068 100%) 1',
                         boxShadow: '0 24px 64px rgba(0,0,0,0.25), inset 0 4px 24px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.1)',
                         backgroundColor: '#b5885a',
                         backgroundImage: `
                             url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E"),
                             radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)
                         `,
                         backgroundSize: '300px 300px, 16px 16px',
                         minHeight: '80vh'
                     }}>
                    
                    {/* Cork textures & inner shadows */}
                    <div className="absolute inset-0 opacity-[0.35] pointer-events-none mix-blend-multiply rounded-xl overflow-hidden"
                         style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cork-wallet.png")' }} />
                    <div className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-multiply rounded-xl overflow-hidden"
                         style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/sandpaper.png")' }} />
                    <div className="absolute inset-0 shadow-[inset_0_8px_32px_rgba(0,0,0,0.2)] pointer-events-none z-10 rounded-xl" />
                    
                    {/* Header Pinned Note */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex justify-center z-40 pointer-events-none">
                        <div className="relative bg-[#fffde7] px-4 md:px-8 py-2 md:py-3 shadow-[2px_6px_14px_rgba(0,0,0,0.15)] rotate-[-2deg]">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 text-[#e74c3c]">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="10" r="7" fill="currentColor" />
                                    <circle cx="10" cy="8" r="2.5" fill="white" opacity="0.3" />
                                    <line x1="12" y1="17" x2="12" y2="24" stroke="#666" strokeWidth="2" strokeLinecap="round" />
                                    <circle cx="12" cy="10" r="3" fill="currentColor" filter="brightness(0.8)" />
                                </svg>
                            </div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl text-neutral-800 font-bold uppercase tracking-wide whitespace-nowrap" 
                                style={{ fontFamily: "'Permanent Marker', cursive" }}>
                                ALL PROJECT SHOWCASE
                            </h1>
                        </div>
                    </div>

                    {/* Content Area with bounded overflow for stickers */}
                    <div className="relative z-20 w-full h-full overflow-hidden rounded-xl pt-16 md:pt-20 pb-20">
                        
                        {/* Washi tapes mapping logic for decoration */}
                        <div className="absolute top-[8%] left-[-1%] z-10 w-[8%] h-[20px] rotate-[-15deg] opacity-60 pointer-events-none"
                             style={{ background: 'repeating-linear-gradient(90deg, #94a3b8 0px, #94a3b8 4px, #cbd5e1 4px, #cbd5e1 8px)', mixBlendMode: 'multiply' }} />
                        <div className="absolute top-[25%] right-[2%] z-10 w-[10%] h-[15px] rotate-[20deg] opacity-50 pointer-events-none"
                             style={{ background: 'repeating-linear-gradient(90deg, #90caf9 0px, #90caf9 3px, #bbdefb 3px, #bbdefb 6px)', mixBlendMode: 'multiply' }} />
                        <div className="absolute bottom-[10%] left-[8%] z-10 w-[5%] h-[35px] rotate-[88deg] opacity-50 pointer-events-none"
                            style={{ background: 'repeating-linear-gradient(0deg, #94a3b8 0px, #94a3b8 4px, #cbd5e1 4px, #cbd5e1 8px)', mixBlendMode: 'multiply' }} />

                        {/* STICKER 1: Far top left near the main board pin */}
                        <div className="absolute top-[48px] left-2 md:top-6 md:left-12 z-20 pointer-events-none drop-shadow-xl rotate-[-8deg]">
                            <img src={StikerRadio} alt="Radio Sticker" className="w-[72px] md:w-48 h-auto" />
                        </div>

                        {/* STICKER 4: Far bottom right of the entire board */}
                        <div className="absolute bottom-6 right-4 md:bottom-8 md:right-16 z-20 pointer-events-none drop-shadow-md rotate-[-12deg]">
                            <img src={StikerHP} alt="HP Sticker" className="w-[60px] md:w-36 h-auto" />
                        </div>

                        {/* Main Grid Wrapper */}
                        <div className="px-2 md:px-12 relative z-30 pt-10 md:pt-16">
                            
                            {/* SECTION 1: WEBSITE PROJECTS */}
                            <div className="mb-20 md:mb-32 relative w-full pt-4 md:pt-12">
                                {/* STICKER 2: Top right of Website header line */}
                                <div className="absolute -top-4 right-4 md:top-0 md:right-16 z-20 pointer-events-none drop-shadow-xl rotate-[8deg]">
                                    <img src={StikerKuning} alt="Kuning Sticker" className="w-[56px] md:w-36 h-auto" />
                                </div>

                                <SectionHeader 
                                    title="Website Project's" 
                                    color="#0284c7" 
                                    rotateClass="rotate-[-4deg]" 
                                    alignClass="justify-center md:justify-start" 
                                />
                                <div className="flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-12 mt-4 md:mt-12">
                                    {listProyekWeb.map((project, index) => (
                                        <ShowcaseCard key={`web-${project.id}-${index}`} project={project} index={index + 2} />
                                    ))}
                                </div>
                            </div>

                            {/* SECTION 2: UI/UX PROJECTS */}
                            <div className="mb-16 md:mb-24 mt-6 md:mt-12 relative w-full pt-4 md:pt-16">
                                {/* STICKER 3: Top left of UI/UX header line */}
                                <div className="absolute -top-4 left-4 md:top-0 md:left-12 z-20 pointer-events-none drop-shadow-md rotate-[-12deg]">
                                    <img src={StikerPala} alt="Pala Sticker" className="w-[56px] md:w-32 h-auto" />
                                </div>

                                <SectionHeader 
                                    title="UI/UX Project's" 
                                    color="#fbc02d" 
                                    rotateClass="rotate-[3deg]" 
                                    alignClass="justify-center md:justify-end" 
                                />
                                <div className="flex flex-wrap justify-center gap-3 sm:gap-6 md:gap-12 mt-4 md:mt-12">
                                    {listProyekUIUX.map((project, index) => (
                                        <ShowcaseCard key={`uiux-${project.id}-${index}`} project={project} index={index + 5} />
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShowcaseGallery;
