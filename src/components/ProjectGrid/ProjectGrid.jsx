import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProjectCard from "../ProjectCard";

const SlideToExploreButton = () => {
    const navigate = useNavigate();
    const [isComplete, setIsComplete] = useState(false);
    const dragX = useMotionValue(0);
    
    // Physical dimensions for responsive sliding physics
    const [buttonWidth, setButtonWidth] = useState(window.innerWidth < 400 ? 280 : 320);
    
    useEffect(() => {
        const handleResize = () => {
            setButtonWidth(window.innerWidth < 400 ? 280 : 320);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const thumbWidth = 72;
    const padding = 4;
    const paddingRight = 12; // Increased padding for more space at the end
    const dragLimit = buttonWidth - thumbWidth - padding - paddingRight;

    // Interactive fading based on precise pixel drag position
    const textOpacity = useTransform(dragX, [0, dragLimit / 1.5], [1, 0]);
    const bgOpacity = useTransform(dragX, [0, dragLimit], [0, 1]);
    const confirmedOpacity = useTransform(dragX, [dragLimit * 0.5, dragLimit * 0.95], [0, 0.9]); // Spoiler starts earlier and clearer
    const fillWidth = useTransform(dragX, [0, dragLimit], [thumbWidth + padding * 2, buttonWidth]);

    const handleDrag = () => {
        if (dragX.get() >= dragLimit - 5 && !isComplete) {
            setIsComplete(true);
            sessionStorage.setItem("home_scroll_pos", window.scrollY.toString());
            sessionStorage.setItem("should_restore_home_scroll", "true");
            setTimeout(() => {
                navigate('/showcase');
            }, 600); // Wait for checkmark animation and success read
        }
    };

    return (
        <div 
            className="relative flex items-center bg-neutral-900 rounded-full h-[80px] overflow-hidden select-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)] border border-white/5 transition-all duration-300" 
            style={{ width: buttonWidth }}
        >
            {/* The sliding confirmed background (White for High Contrast) */}
            <motion.div 
                className="absolute left-0 top-0 bottom-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                style={{ 
                    width: isComplete ? buttonWidth : fillWidth,
                    opacity: isComplete ? 1 : bgOpacity 
                }}
            />

            {/* Default Text (Cleaned up) */}
            <motion.div 
                className="absolute w-full text-center pointer-events-none flex justify-center pl-10 text-[14px] sm:text-[15px] font-bold text-neutral-400/90 px-4" 
                style={{ opacity: isComplete ? 0 : textOpacity }}
            >
                Slide to view more projects
            </motion.div>

            {/* Confirmed Text Spoiler (Black on White background reveal) */}
            <motion.div 
                className="absolute w-full text-center pointer-events-none flex justify-center pr-8 z-30"
                style={{ opacity: isComplete ? 1 : confirmedOpacity }}
            >
                <span className="text-[16px] font-bold tracking-wide text-black opacity-90">
                    Confirmed!
                </span>
            </motion.div>

            {/* Draggable Circle Thumb with strong shadow (Blue glow removed) */}
            <motion.div 
                drag={!isComplete ? "x" : false}
                dragConstraints={{ left: 0, right: dragLimit }}
                dragElastic={0.01}
                dragMomentum={false}
                dragSnapToOrigin={!isComplete}
                onDrag={handleDrag}
                animate={isComplete ? { x: dragLimit } : {
                    x: dragX.get(),
                    boxShadow: [
                        "0 8px 25px rgba(0,0,0,0.3)",
                        "0 12px 30px rgba(0,0,0,0.45)",
                        "0 8px 25px rgba(0,0,0,0.3)"
                    ]
                }}
                transition={isComplete ? { type: "spring", stiffness: 500, damping: 40 } : {
                    boxShadow: {
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut"
                    }
                }}
                className={`w-[72px] h-[72px] bg-neutral-800 border border-white/10 rounded-full flex items-center justify-center z-10 relative ${isComplete ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
                style={{ x: dragX, marginLeft: padding }}
                whileHover={!isComplete ? { scale: 1.05 } : {}}
                whileTap={!isComplete ? { scale: 0.96 } : {}}
            >
                {isComplete ? (
                    <motion.svg 
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="w-7 h-7 text-[#007aff]" 
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </motion.svg>
                ) : (
                    <svg className="w-6 h-6 text-white ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                )}
            </motion.div>
        </div>
    );
};

export default function ProjectGrid({ projects }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { 
                type: "spring", 
                stiffness: 260, 
                damping: 20 
            }
        }
    };

    return (
        <div className="w-full py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {projects.map((project) => (
                        <div key={project.id}>
                            <ProjectCard 
                                project={project} 
                                scrollKey="home_scroll"
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <SlideToExploreButton />
                </div>
            </div>
        </div>
    );
}