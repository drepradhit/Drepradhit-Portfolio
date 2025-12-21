import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";

function Card({ i, project, progress, range, targetScale, onProjectClick, total }) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "start start"],
    });

    const scale = useTransform(progress, range, [1, targetScale]);

    // Mouse move effect for spotlight
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            ref={container}
            className="h-screen flex items-start justify-center sticky top-0 pt-20 md:pt-24"
        >
            <motion.div
                style={{
                    scale,
                    top: `calc(-10vh + ${i * 35}px)`, // Increased spacing for better stacking visibility
                }}
                className="flex flex-col relative -top-[25%] h-[550px] w-full max-w-6xl rounded-[3rem] p-1 border border-white/10 shadow-2xl overflow-hidden cursor-pointer bg-neutral-900"
                onClick={() => onProjectClick(project)}
                onMouseMove={handleMouseMove}
            >
                {/* Spotlight Effect */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-[3rem] opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                650px circle at ${mouseX}px ${mouseY}px,
                                rgba(255, 255, 255, 0.15),
                                transparent 80%
                            )
                        `,
                    }}
                />

                <div className="relative h-full w-full bg-neutral-950 rounded-[2.9rem] overflow-hidden flex flex-col md:flex-row">

                    {/* Background Gradient Blob specific to card */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none mix-blend-overlay"></div>

                    {/* Left: Content */}
                    <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col justify-between relative z-10 order-2 md:order-1">

                        <div>
                            {/* Index Number */}
                            <div className="mb-6 flex items-center gap-4">
                                <span className="text-6xl font-black text-neutral-800/50 select-none">
                                    {(i + 1).toString().padStart(2, '0')}
                                </span>
                                <div className="h-px bg-neutral-800 flex-1"></div>
                                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                                    {project.category}
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[0.9] tracking-tight mb-6">
                                {project.title}
                            </h2>

                            <p className="text-neutral-400 text-sm md:text-base leading-relaxed line-clamp-3 mb-8">
                                {project.subtitle}
                            </p>
                        </div>

                        {/* Custom Button */}
                        <div className="flex items-center gap-4 group/btn w-fit">
                            <div className="h-12 w-12 rounded-full border border-neutral-700 flex items-center justify-center bg-neutral-900 group-hover/btn:bg-white group-hover/btn:border-white transition-all duration-300">
                                <svg
                                    className="w-5 h-5 text-white group-hover/btn:text-black transition-colors duration-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </div>
                            <span className="text-sm font-medium text-neutral-400 group-hover/btn:text-white transition-colors duration-300">
                                Explore Project
                            </span>
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="w-full md:w-[55%] h-72 md:h-full relative overflow-hidden order-1 md:order-2 group bg-neutral-900/50">
                        <motion.div
                            className="w-full h-full"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-contain bg-neutral-900 group-hover:scale-105 transition-transform duration-700"
                            />
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80 md:opacity-40"></div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function ScrollStack({ projects, onProjectClick }) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start start", "end end"],
    });

    return (
        <div ref={container} className="relative mb-0 px-4">
            {/* Section Header could go here if managed internally, but keeping it external as per App.jsx */}

            <div className="max-w-6xl mx-auto">
                {projects.map((project, i) => {
                    const targetScale = 1 - (projects.length - i) * 0.05;
                    return (
                        <Card
                            key={project.id}
                            i={i}
                            project={project}
                            progress={scrollYProgress}
                            range={[i * 0.25, 1]}
                            targetScale={targetScale}
                            onProjectClick={onProjectClick}
                            total={projects.length}
                        />
                    );
                })}
            </div>
        </div>
    );
}
