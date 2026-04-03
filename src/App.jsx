import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";

import { listTools, listProyek, listProyekWeb, listProyekUIUX, listExperience } from "./data";

import ProjectModal from "./components/ProjectModal/ProjectModal";
import Aurora from "./components/Aurora/Aurora";
import TerminalRoles from "./components/TerminalRoles/TerminalRoles";

import AOS from 'aos';
import ProjectGrid from "./components/ProjectGrid/ProjectGrid";
import InfiniteMarquee from "./components/InfiniteMarquee/InfiniteMarquee";
import GithubDashboard from "./components/GithubContribution/GithubDashboard";
import FinderWindow from "./components/FinderWindow/FinderWindow";
import ToolsExplorer from "./components/ToolsExplorer/ToolsExplorer";
import WorkExperience from "./components/WorkExperience/WorkExperience";

import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import 'aos/dist/aos.css';
AOS.init();

function App() {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Check if user has visited before in this session to prevent re-animation on back nav
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    const visited = sessionStorage.getItem("hasVisited");
    if (visited) {
      setIsFirstVisit(false);
    } else {
      sessionStorage.setItem("hasVisited", "true");
    }
  }, []);

  // Manual Scroll Restoration Logic
  useEffect(() => {
    const shouldRestore = sessionStorage.getItem("should_restore_scroll");
    const savedPos = sessionStorage.getItem("home_scroll_pos");

    if (shouldRestore === "true" && savedPos) {
      // Small timeout to allow DOM to settle if needed, though instant is better if content is ready
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedPos));
      }, 0);

      // Clear the flag so future refreshes start at top (standard behavior)
      sessionStorage.removeItem("should_restore_scroll");
    }
  }, []);

  const [selectedProject, setSelectedProject] = useState(null); // null = modal tertutup

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };
  // -------------------------




  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-x-hidden relative w-full min-h-screen">
      <style>{`
        body {
          background-color: #f8fafc;
          background-image: 
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        <style>{`
@keyframes gradient-flow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.hero-name-anim {
  display: inline-block;
  color: #1a1a1a;
  font-weight: 700; 
}

@media (max-width: 767px) {
  .hero-name-anim {
    animation: none;
    background: none;
    -webkit-background-clip: unset;
    background-clip: unset;
    -webkit-text-fill-color: #1a1a1a;
    color: #1a1a1a;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-name-anim {
    animation: none;
    background: #ffffff;
    -webkit-text-fill-color: #ffffff;
    background-clip: unset;
  }
}

`}</style>

        <div className="hero grid lg:grid-cols-2 items-center pt-12 gap-12 lg:gap-20 grid-cols-1 max-w-6xl mx-auto">
          <motion.div
            className="order-1 lg:order-2 w-full flex justify-center px-4 lg:px-0"
            initial={isFirstVisit ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={isFirstVisit ? { delay: 0.3, duration: 0.7, ease: "easeOut" } : { duration: 0 }}
          >
            <div className="w-full flex justify-center">
              <ProfileCard
                avatarUrl="./assets/andre.png"
              />
            </div>
          </motion.div>

          <div className="order-2 lg:order-1 px-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl md:text-7xl leading-[1.1] mb-6 uppercase tracking-tight"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 900,
              }}
              initial={isFirstVisit ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={isFirstVisit ? { duration: 0.6, ease: "easeOut" } : { duration: 0 }}
            >
              <span style={{ color: '#1a1a1a' }}>Hi, I'm </span>
              <motion.span
                className="inline"
                style={{ color: '#1e293b' }}
                initial={isFirstVisit ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={isFirstVisit ? { delay: 0.4, duration: 0.6, ease: "easeOut" } : { duration: 0 }}
              >
                Andre<br />
                <span style={{ color: '#1e293b' }}>Pradhit</span>
              </motion.span>
            </motion.h1>

            {/* Consolidated TerminalRoles with consistent responsive alignment */}
            <motion.div
              className="text-lg text-neutral-600 mb-8 leading-relaxed w-full flex justify-center lg:justify-start"
              initial={isFirstVisit ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={isFirstVisit ? { delay: 0.6, duration: 0.5, ease: "easeOut" } : { duration: 0 }}
            >
              <div className="w-full max-w-[340px] lg:max-w-none">
                <TerminalRoles roles={["UI UX Designer", "Mobile Developer", "Web Developer", "Graphic Designer"]} />
              </div>
            </motion.div>

            <motion.div
              className="flex flex-row items-center gap-3 justify-center lg:justify-start w-full"
              initial={isFirstVisit ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={isFirstVisit ? { delay: 0.8, duration: 0.5, ease: "easeOut" } : { duration: 0 }}
            >
              <motion.a
                href="./assets/proyek/Resume - Andre Pradhit.pdf"
                download="Resume - Andre Pradhit.pdf"
                className="flex-1 sm:flex-none flex items-center justify-center relative font-medium bg-white border border-neutral-200 text-neutral-900 px-6 sm:px-8 py-3 rounded-full overflow-hidden transition-all duration-300 group hover:border-neutral-900 hover:bg-neutral-50 shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                  My Resume
                  <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 transform" />
              </motion.a>

              <div className="flex flex-row gap-2.5">
                <motion.a
                  href="https://www.linkedin.com/in/andrepradhit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative bg-white border border-neutral-200 text-neutral-900 p-3 rounded-full overflow-hidden transition-all duration-300 group hover:border-neutral-900 hover:bg-neutral-50 shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <FaLinkedin className="w-5 h-5" />
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 transform" />
                </motion.a>

                <motion.a
                  href="https://instagram.com/aaaaanddrre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative bg-white border border-neutral-200 text-neutral-900 p-3 rounded-full overflow-hidden transition-all duration-300 group hover:border-neutral-900 hover:bg-neutral-50 shadow-sm"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <FaInstagram className="w-5 h-5" />
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 transform" />
                </motion.a>
              </div>
            </motion.div>
          </div>

        </div>
        {/* About & Work Experience Grid */}
        <div className="mt-20 md:mt-32 w-full max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start" id="about">

          {/* tentang Section with Refined Tactile Paper */}
          <div className="flex justify-center w-full">
            <motion.div
              className="w-full flex justify-center"
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              {/* Realistic Notebook Paper Column */}
              <motion.div
                className="relative w-full max-w-2xl bg-[#ffffff] py-8 pr-6 md:py-16 md:pr-14 overflow-hidden mx-auto rounded-[3px] border border-[#e2e8f0] cursor-default"
                variants={{
                  rest: {
                    rotate: -1,
                    scale: 1,
                    y: 0,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.04)"
                  },
                  hover: {
                    rotate: 0,
                    scale: 1.03,
                    y: -15,
                    boxShadow: "0 30px 60px rgba(0,0,0,0.08)",
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 25
                    }
                  }
                }}
                style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}
              >

                {/* Torn Tape - Clean straighten */}
                <motion.div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-10 bg-[#94a3b8] shadow-[0_1px_3px_rgba(0,0,0,0.1)] z-20 backdrop-blur-sm"
                  variants={{
                    rest: { rotate: 2, y: 0, opacity: 0.9 },
                    hover: {
                      rotate: 0,
                      y: -2,
                      opacity: 1,
                      transition: { duration: 0.4 }
                    }
                  }}
                  style={{
                    mixBlendMode: 'multiply',
                    clipPath: 'polygon(3% 0%, 97% 2%, 99% 100%, 1% 98%)'
                  }}
                />
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-10 bg-white/30 rotate-[2deg] z-20 pointer-events-none"
                  style={{ clipPath: 'polygon(3% 0%, 97% 2%, 99% 100%, 1% 98%)' }}
                />

                {/* Binder Holes (Loose Leaf) - Left Edge */}
                {[20, 50, 80].map((top) => (
                  <div
                    key={top}
                    className="hidden md:block absolute w-5 h-5 rounded-full bg-neutral-900/[0.04] shadow-[inset_1px_2px_4px_rgba(0,0,0,0.15),0_1px_1px_rgba(255,255,255,0.8)] border border-neutral-900/[0.02]"
                    style={{ top: `${top}%`, left: '25px', transform: 'translateY(-50%)' }}
                  />
                ))}

                {/* Paperclip - Subtle Adjustment */}
                <motion.div
                  className="absolute top-4 right-4 md:right-8 z-30 opacity-70"
                  variants={{
                    rest: { rotate: 15, x: 0 },
                    hover: {
                      rotate: 10,
                      x: 3,
                      transition: { type: "spring", stiffness: 300, damping: 15 }
                    }
                  }}
                >
                  <svg width="24" height="48" viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-12">
                    <path d="M12 2C8.68629 2 6 4.68629 6 8V38C6 42.4183 9.58172 46 14 46C18.4183 46 22 42.4183 22 38V12C22 9.79086 20.2091 8 18 8C15.7909 8 14 9.79086 14 12V36C14 37.1046 13.1046 38 12 38C10.8954 38 10 37.1046 10 36V8C10 6.89543 10.8954 6 12 6C13.1046 6 14 6.89543 14 8V32" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </motion.div>

                {/* Slate Line Margin (Standardized for masculine look) */}
                <div className="absolute top-0 bottom-0 left-[60px] md:left-[80px] w-[2px] bg-slate-400/50 z-10" />
                <div className="absolute top-0 bottom-0 left-[64px] md:left-[84px] w-[0.5px] bg-slate-400/20 z-10" />

                {/* Marginalia - Handwritten Arrow note */}
                <div
                  className="hidden lg:block absolute left-[10px] top-[40%] -rotate-90 origin-center text-neutral-400/40 text-[10px] uppercase tracking-widest whitespace-nowrap"
                  style={{ fontFamily: "'Rock Salt', cursive", fontSize: '8px' }}
                >
                  ← handwritten note
                </div>

                {/* Ruled Lines Background */}
                <div
                  className="absolute inset-0 pointer-events-none z-0 mt-[14px]"
                  style={{
                    background: 'repeating-linear-gradient(transparent, transparent 31px, rgba(59, 130, 246, 0.15) 31px, rgba(59, 130, 246, 0.15) 32px)',
                    backgroundPosition: '0 0px'
                  }}
                />

                {/* Dog-ear fold */}
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-neutral-200 to-transparent pointer-events-none"
                  style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }} />

                {/* Text Container aligned properly offset from margins */}
                <div className="relative z-10 pl-[75px] md:pl-[120px] pt-0 md:pt-4">
                  <motion.h2
                    className="text-3xl md:text-5xl text-[#1e293b] font-black mb-4 md:mb-10 uppercase"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    variants={{
                      rest: { scale: 1, x: 0 },
                      hover: {
                        scale: 1.05,
                        x: 8,
                        transition: { type: "spring", stiffness: 400, damping: 20 }
                      }
                    }}
                  >
                    Hi! I'm Andre
                  </motion.h2>

                  <div className="text-[14px] md:text-base leading-[28px] md:leading-[32px] text-neutral-700 font-medium pb-2">
                    <p className="mb-4 md:mb-8">
                      I'm a <strong className="text-neutral-900 relative z-10">Computer Science</strong> student at <strong className="text-neutral-900">BINUS University</strong>, passionate about <strong className="text-neutral-900">Web Development</strong> and UI/UX. I build <strong className="text-neutral-900">web apps, interactive platforms, and digital experiences</strong> that feel meaningful.
                    </p>

                    <p className="mb-0">
                      Currently open to <strong className="text-neutral-900">internships & freelance projects</strong>.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Work Experience Section - Scrapbook Style */}
          <div className="w-full flex justify-center lg:justify-start">
            <WorkExperience experience={listExperience} />
          </div>

        </div>

        {/* Tools Section - Updated to Finder Window */}
        <div className="tools mt-20 md:mt-32 w-full mx-auto px-4" id="skills">
          <ToolsExplorer tools={listTools} />
        </div>
        {/* tentang */}

        {/* Proyek */}
        <div className="proyek mt-20 md:mt-32 w-full max-w-6xl mx-auto px-4" id="project">
          <FinderWindow />
        </div>
        {/* End Proyek */}

        <GithubDashboard />


        {/* Kontak section removed by user request */}

      </main>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </div>
  )
}

export default App
