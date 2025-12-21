import { motion } from "framer-motion";

const InfiniteMarquee = ({ items, speed = 30, direction = "left" }) => {
    return (
        <div className="overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <style>{`
                @keyframes scroll-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-25%); }
                }
                @keyframes scroll-right {
                    0% { transform: translateX(-25%); }
                    100% { transform: translateX(0); }
                }
                .marquee-left {
                    display: flex;
                    width: max-content;
                    animation: scroll-left ${speed}s linear infinite;
                }
                .marquee-right {
                    display: flex;
                    width: max-content;
                    animation: scroll-right ${speed}s linear infinite;
                }
            `}</style>

            <div className="flex w-full overflow-hidden">
                <div className={direction === "left" ? "marquee-left" : "marquee-right"}>
                    {/* First set */}
                    {items.map((tool, index) => (
                        <div
                            key={`set1-${tool.id}-${index}`}
                            className="group flex flex-col items-center text-center flex-shrink-0 justify-center pr-12 md:pr-24"
                        >
                            <div className="w-14 h-14 md:w-20 md:h-20 p-3 md:p-4 rounded-full bg-neutral-900/50 border border-neutral-800 group-hover:border-neutral-600 group-hover:bg-neutral-800/50 transition-all duration-300 mb-2 md:mb-4">
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
                    {/* Second set */}
                    {items.map((tool, index) => (
                        <div
                            key={`set2-${tool.id}-${index}`}
                            className="group flex flex-col items-center text-center flex-shrink-0 justify-center pr-12 md:pr-24"
                        >
                            <div className="w-14 h-14 md:w-20 md:h-20 p-3 md:p-4 rounded-full bg-neutral-900/50 border border-neutral-800 group-hover:border-neutral-600 group-hover:bg-neutral-800/50 transition-all duration-300 mb-2 md:mb-4">
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
                    {/* Third set */}
                    {items.map((tool, index) => (
                        <div
                            key={`set3-${tool.id}-${index}`}
                            className="group flex flex-col items-center text-center flex-shrink-0 justify-center pr-12 md:pr-24"
                        >
                            <div className="w-14 h-14 md:w-20 md:h-20 p-3 md:p-4 rounded-full bg-neutral-900/50 border border-neutral-800 group-hover:border-neutral-600 group-hover:bg-neutral-800/50 transition-all duration-300 mb-2 md:mb-4">
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
                    {/* Fourth set */}
                    {items.map((tool, index) => (
                        <div
                            key={`set4-${tool.id}-${index}`}
                            className="group flex flex-col items-center text-center flex-shrink-0 justify-center pr-12 md:pr-24"
                        >
                            <div className="w-14 h-14 md:w-20 md:h-20 p-3 md:p-4 rounded-full bg-neutral-900/50 border border-neutral-800 group-hover:border-neutral-600 group-hover:bg-neutral-800/50 transition-all duration-300 mb-2 md:mb-4">
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
                </div>
            </div>
        </div>
    );
};

export default InfiniteMarquee;
