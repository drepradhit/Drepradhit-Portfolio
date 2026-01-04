import { useRef, useEffect } from "react";
import {
    motion,
    useMotionValue,
    useAnimationFrame,
    useTransform,
} from "framer-motion";

const InfiniteMarquee = ({ items, speed = 1.5, direction = "left" }) => {
    // We duplicate items to ensure seamless looping
    // 4 sets is usually safe for wide screens vs narrow content
    const duplicatedItems = [...items, ...items, ...items, ...items];

    const containerRef = useRef(null);

    // The current x position (percentage)
    const baseX = useMotionValue(0);

    // Speed factor - can be adjusted
    const baseVelocity = direction === "left" ? -speed : speed;

    useAnimationFrame((t, delta) => {
        // Delta is time since last frame in ms. 
        // We normalize to ~60fps (16.6ms).
        let moveBy = baseVelocity * (delta / 16);

        baseX.set(baseX.get() + moveBy);
    });

    // The logic to wrap around:
    // We assume 4 repeats. 
    // The content width is 400% of one "set".
    // We loop based on "one set length" which is 25% of the total width.
    // Utilize a robust wrap function that handles negative numbers symmetrically
    const wrap = (min, max, v) => {
        const rangeSize = max - min;
        return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
    };

    const x = useTransform(baseX, (v) => {
        // Wrap between -25% and -50% to ensure smooth infinite scroll
        // This corresponds to showing one full set of items (25% width)
        return `${wrap(-50, -25, v)}%`;
    });

    const handlePan = (_, info) => {
        // Adjust sensitivity as needed
        const sensitivity = 0.005; // Reduced to 0.005 for very heavy/controlled feel
        baseX.set(baseX.get() + info.delta.x * sensitivity);
    };

    return (
        <div
            className="overflow-hidden w-full h-full relative z-10 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] cursor-grab active:cursor-grabbing"
            ref={containerRef}
            // Add touch-action none to prevent browser scrolling while dragging horizontally
            style={{ touchAction: "pan-y" }}
        >
            <motion.div
                className="flex w-max"
                style={{ x }}
                onPan={handlePan}
            >
                {duplicatedItems.map((tool, index) => (
                    <div
                        key={`item-${tool.id}-${index}`}
                        className="group flex flex-col items-center text-center flex-shrink-0 justify-center pr-12 md:pr-24 select-none"
                    >
                        <div className="w-14 h-14 md:w-20 md:h-20 p-3 md:p-4 rounded-full bg-neutral-900/50 border border-neutral-800 group-hover:border-neutral-600 group-hover:bg-neutral-800/50 transition-all duration-300 mb-2 md:mb-4 pointer-events-none">
                            <img
                                src={tool.gambar}
                                alt={tool.nama}
                                className="w-full h-full object-contain transition-all duration-300 transform group-hover:scale-110"
                            />
                        </div>
                        <h3 className="text-xs md:text-sm font-semibold text-neutral-300 group-hover:text-white transition-colors">
                            {tool.nama}
                        </h3>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default InfiniteMarquee;
