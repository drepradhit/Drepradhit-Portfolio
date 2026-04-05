import { motion, useMotionValue, useTransform } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProjectCard from "../ProjectCard";

const SlideToExploreButton = () => {
    const navigate = useNavigate();
    const [isComplete, setIsComplete] = useState(false);
    const dragX = useMotionValue(0);
    
    // Physical dimensions for exactly 1:1 sliding physics
    const buttonWidth = 320;
    const thumbWidth = 72;
    const padding = 4;
    const dragLimit = buttonWidth - thumbWidth - (padding * 2);

    // Interactive fading based on precise pixel drag position
    const textOpacity = useTransform(dragX, [0, dragLimit / 1.5], [1, 0]);
    const bgOpacity = useTransform(dragX, [0, dragLimit], [0, 1]);
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
            className="relative flex items-center bg-[#E5E5EA] rounded-full h-[80px] overflow-hidden select-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.05)] border border-[#D1D1D6]/50" 
            style={{ width: buttonWidth }}
        >
            {/* The sliding confirmed background (Changed from Green to Blue) */}
            <motion.div 
                className="absolute left-0 top-0 bottom-0 bg-[#007aff] rounded-full shadow-[0_0_20px_rgba(0,122,255,0.3)]"
                style={{ 
                    width: isComplete ? buttonWidth : fillWidth,
                    opacity: isComplete ? 1 : bgOpacity 
                }}
            />

            {/* Default Text (Cleaned up) */}
            <motion.div 
                className="absolute w-full text-center pointer-events-none flex justify-center pl-10 text-[15px] font-bold text-neutral-500/80" 
                style={{ opacity: isComplete ? 0 : textOpacity }}
            >
                Slide to view more projects
            </motion.div>

            {/* Confirmed Text (Reduced font weight) */}
            <div className={`absolute w-full text-center pointer-events-none transition-opacity duration-300 flex justify-center pr-8 ${isComplete ? 'opacity-100 delay-100' : 'opacity-0'}`}>
                <span className="text-[16px] font-bold text-white tracking-wide drop-shadow-sm">Confirmed!</span>
            </div>

            {/* Draggable Circle Thumb with breathing glow and strong shadow */}
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
                        "0 8px 25px rgba(0,0,0,0.15), 0 0 0 rgba(0,122,255,0)",
                        "0 12px 30px rgba(0,0,0,0.2), 0 0 15px rgba(0,122,255,0.2)",
                        "0 8px 25px rgba(0,0,0,0.15), 0 0 0 rgba(0,122,255,0)"
                    ]
                }}
                transition={isComplete ? { type: "spring", stiffness: 500, damping: 40 } : {
                    boxShadow: {
                        repeat: Infinity,
                        duration: 3,
                        ease: "easeInOut"
                    }
                }}
                className={`w-[72px] h-[72px] bg-white rounded-full flex items-center justify-center z-10 relative shadow-[0_8px_20px_-4px_rgba(0,0,0,0.15),0_4px_10px_-2px_rgba(0,0,0,0.1)] ${isComplete ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
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
                    <svg className="w-6 h-6 text-neutral-800 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                )}
            </motion.div>
        </div>
    );
};

export default function ProjectGrid({ projects }) {
    return (
        <div className="w-full py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard 
                            key={`${project.id}-${index}`} 
                            project={project} 
                            storageKey="home_scroll"
                        />
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <SlideToExploreButton />
                </div>
            </div>
        </div>
    );
}