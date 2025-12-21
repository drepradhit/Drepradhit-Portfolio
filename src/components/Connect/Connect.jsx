import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaInstagram, FaLinkedin, FaGithub, FaEnvelope, FaCopy, FaCheck } from "react-icons/fa";

export default function Connect() {
    return (
        <section className="py-32 px-4 mt-20 flex justify-center items-center perspective-1000" id="contact">
            <HolographicCard />
        </section>
    );
}

const HolographicCard = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spring physics for smooth tilt
    const mouseX = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    // Glare effect movement
    const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

    function handleMouseMove(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXFromCenter = event.clientX - rect.left - width / 2;
        const mouseYFromCenter = event.clientY - rect.top - height / 2;

        x.set(mouseXFromCenter / width);
        y.set(mouseYFromCenter / height);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    // Copy Logic
    const [copied, setCopied] = useState(false);
    const email = "andrepradhit@gmail.com";
    const handleCopy = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full max-w-[600px] h-[350px] md:h-[400px] rounded-[30px] bg-black border border-white/10 group cursor-pointer"
        >
            {/* --- Card Surface --- */}
            <div className="absolute inset-0 rounded-[30px] bg-[#050505] overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_50%)]"></div>

                {/* Holographic Glare */}
                <motion.div
                    style={{
                        background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.15), transparent 40%)`
                    }}
                    className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
            </div>

            {/* --- 3D Floating Content --- */}
            <div
                className="relative z-30 h-full flex flex-col justify-between p-10 md:p-14"
                style={{ transform: "translateZ(50px)" }}
            >
                {/* Top Row: Status + Avatar (Abstract) */}
                <div className="flex justify-between items-start">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Open to Work</span>
                        </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                    </div>
                </div>

                {/* Middle: CTA & Email */}
                <div>
                    <p className="text-neutral-500 font-medium mb-2 pl-1">Get in touch</p>
                    <div
                        onClick={handleCopy}
                        className="group/email flex items-center gap-4 hover:gap-6 transition-all duration-300"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight group-hover/email:text-neutral-200 transition-colors">
                            Let's Talk
                        </h2>
                        <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center transform scale-0 group-hover/email:scale-100 transition-transform duration-300 origin-left">
                            {copied ? <FaCheck /> : <FaCopy />}
                        </div>
                    </div>
                    <p className="text-neutral-500 text-sm mt-2 pl-1 font-mono">{email}</p>
                </div>

                {/* Bottom: Social Icons floating */}
                <div className="flex gap-6 mt-4">
                    <SocialIcon Icon={FaInstagram} link="https://instagram.com/aaaaanddrre" />
                    <SocialIcon Icon={FaLinkedin} link="https://linkedin.com/in/andre-pradhit" />
                    <SocialIcon Icon={FaGithub} link="https://github.com/drepradhit" />
                </div>
            </div>
        </motion.div>
    );
};

const SocialIcon = ({ Icon, link }) => (
    <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-neutral-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
        onMouseDown={(e) => e.stopPropagation()}
    >
        <Icon className="text-2xl" />
    </a>
);
