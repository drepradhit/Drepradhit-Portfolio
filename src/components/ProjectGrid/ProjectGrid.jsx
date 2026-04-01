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

    // Generate a pseudo-random rotation between -3deg and 3deg based on index
    const randomRotation = (index % 5 - 2) * 2; // e.g. -4, -2, 0, 2, 4 degrees

    // Different tape & title colors per card
    const tapeColors = [
        { bg: 'from-pink-300/50 via-pink-200/40 to-pink-300/50', title: '#db2777' },
        { bg: 'from-sky-300/50 via-sky-200/40 to-sky-300/50', title: '#0284c7' },
        { bg: 'from-amber-300/50 via-amber-200/40 to-amber-300/50', title: '#d97706' },
        { bg: 'from-emerald-300/50 via-emerald-200/40 to-emerald-300/50', title: '#059669' },
        { bg: 'from-violet-300/50 via-violet-200/40 to-violet-300/50', title: '#7c3aed' },
        { bg: 'from-rose-300/50 via-rose-200/40 to-rose-300/50', title: '#e11d48' },
    ];
    const colors = tapeColors[index % tapeColors.length];

    const cardContent = (
        <div className="w-full flex flex-col cursor-pointer">
            {/* Polaroid Container */}
            <div 
                className="relative bg-[#fcfbf9] p-3 pb-10 sm:p-4 sm:pb-14 shadow-[2px_8px_20px_rgba(0,0,0,0.06)] border border-neutral-200/80 group-hover:shadow-[4px_24px_48px_rgba(0,0,0,0.15)] transition-shadow duration-500"
            >
                {/* Tape Strip - Straight, centered */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 w-14 sm:w-16 h-6 sm:h-7">
                    {/* Tape body */}
                    <div className={`w-full h-full bg-gradient-to-b ${colors.bg} backdrop-blur-[1px] shadow-[0_1px_2px_rgba(0,0,0,0.06)]`}
                         style={{ clipPath: 'polygon(0% 0%, 100% 0%, 99% 100%, 1% 100%)' }}
                    />
                    {/* Tape shine */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/35 via-transparent to-white/15 pointer-events-none"
                         style={{ clipPath: 'polygon(0% 0%, 100% 0%, 99% 100%, 1% 100%)' }}
                    />
                </div>

                {/* Image Area */}
                <div className="relative w-full aspect-[4/3] bg-neutral-100 overflow-hidden mb-3 md:mb-5">
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
                    />
                    
                    {/* Inner shadow to mimic physical photo depths */}
                    <div className="absolute inset-0 shadow-[inset_0_0_8px_rgba(0,0,0,0.1)] pointer-events-none" />
                    

                </div>

                {/* Polaroid Text Area */}
                <div className="flex flex-col items-center px-1">
                    <h3 
                        className="text-lg md:text-2xl tracking-wide text-center"
                        style={{ 
                            fontFamily: "'Caveat', 'Kalam', 'Segoe Print', 'Bradley Hand', cursive", 
                            color: project.title === 'Type Paper' ? '#000000' : colors.title 
                        }}
                    >
                        {project.title}
                    </h3>
                </div>

                {/* Handwritten Year */}
                <div 
                    className="absolute bottom-2 right-3 opacity-40"
                    style={{ fontFamily: "'Caveat', cursive" }}
                >
                    <span className="text-xs sm:text-sm text-neutral-500">{project.year || ''}</span>
                </div>
            </div>
        </div>
    );

    return (
        <Link
            to={`/project/${project.slug}`}
            className="h-full block group relative z-10 hover:z-50 focus:z-50"
            onClick={() => {
                sessionStorage.setItem("home_scroll_pos", window.scrollY.toString());
                sessionStorage.setItem("should_restore_scroll", "true");
            }}
        >
            <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={{ 
                    rotate: randomRotation,
                    x: isMobile ? (index % 2 === 0 ? -8 : 8) : 0
                }}
                whileHover={isMobile ? { y: -5, scale: 1.02 } : { 
                    y: -20, 
                    scale: 1.05,
                    rotate: randomRotation * 0.5,
                    transition: { duration: 0.3, ease: "easeOut" }
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20,
                    mass: 0.8
                }}
            >
                {cardContent}
            </motion.div>
        </Link>
    );
}

export default function ProjectGrid({ projects }) {
    return (
        <div className="w-full py-8 md:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {projects.map((project, index) => (
                    <div key={project.id} className="w-full max-w-[320px] mx-auto relative hover:z-50">
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


