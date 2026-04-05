import { useRef, useState, useEffect, useLayoutEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import { listTools, listProyek, listExperience } from "./data";

import ProjectModal from "./components/ProjectModal/ProjectModal";
import TerminalRoles from "./components/TerminalRoles/TerminalRoles";

import AOS from 'aos';
import FinderWindow from "./components/FinderWindow/FinderWindow";
import WorkExperience from "./components/WorkExperience/WorkExperience";
import GithubDashboard from "./components/GithubContribution/GithubDashboard";

import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import GridBackground from "./components/GridBackground/GridBackground";

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    const visited = sessionStorage.getItem("hasVisited");
    if (visited) {
      setIsFirstVisit(false);
    } else {
      sessionStorage.setItem("hasVisited", "true");
    }
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    const shouldRestore = sessionStorage.getItem("should_restore_home_scroll");
    const savedPos = sessionStorage.getItem("home_scroll_pos");

    if (shouldRestore === "true" && savedPos) {
      window.scrollTo({
        top: parseInt(savedPos),
        behavior: 'instant'
      });
      sessionStorage.removeItem("should_restore_home_scroll");
    }
  }, []);

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 20 }
    },
  };

  return (
    <div className="overflow-x-hidden relative w-full min-h-screen">
      <style>{`
        body {
          background-color: transparent;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          overflow-x: hidden;
        }
      `}</style>

      <GridBackground />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        <motion.div 
          className="hero grid lg:grid-cols-2 items-center pt-12 gap-12 lg:gap-20 grid-cols-1 max-w-6xl mx-auto min-h-[500px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="order-1 lg:order-2 w-full flex justify-center px-4 lg:px-0"
            variants={itemVariants}
          >
            <div className="w-full flex justify-center">
              <ProfileCard avatarUrl="./assets/andre.jpg" />
            </div>
          </motion.div>

          <div className="order-2 lg:order-1 px-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl leading-[1.1] mb-6 font-bold tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
              variants={itemVariants}
            >
              <span style={{ color: '#1a1a1a' }}>Hi, I'm </span>
              <span style={{ color: '#1e293b' }}>Andre<br />Pradhit</span>
            </motion.h1>

            <motion.div 
              className="text-lg text-neutral-600 mb-8 leading-relaxed w-full flex justify-center lg:justify-start"
              variants={itemVariants}
            >
              <div className="w-full max-w-[340px] lg:max-w-none">
                <TerminalRoles roles={["UI UX Designer", "Mobile Developer", "Web Developer", "Graphic Designer"]} />
              </div>
            </motion.div>

            <motion.div 
              className="flex flex-row items-center gap-3 justify-center lg:justify-start w-full"
              variants={itemVariants}
            >
              <motion.a
                href="https://drive.google.com/file/d/1je3WZmUi7OidlNM-QsVvqG-CNeG1YXp2/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center relative font-bold bg-white/80 backdrop-blur-sm border border-neutral-200 text-neutral-900 px-6 py-3 rounded-full group hover:border-neutral-900 hover:bg-neutral-50 shadow-lg shadow-black/5 overflow-hidden"
                whileHover="hover"
                initial="initial"
                variants={itemVariants}
              >
                <div className="flex items-center gap-0 h-5">
                  <span className="whitespace-nowrap">Resume</span>
                  <motion.div 
                    className="flex overflow-hidden whitespace-nowrap"
                    variants={{
                      initial: { width: 0, opacity: 0 },
                      hover: { width: "auto", opacity: 1 }
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  >
                    <span>&nbsp;Download</span>
                  </motion.div>
                  <svg className="ml-1.5 w-4 h-4 group-hover:translate-y-1 transition-transform shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                </div>
              </motion.a>

              <div className="flex flex-row gap-2.5">
                {[
                  { icon: FaLinkedin, url: "https://www.linkedin.com/in/andrepradhit/", label: "LinkedIn", username: "Andre Pradhit" },
                  { icon: FaGithub, url: "https://github.com/drepradhit", label: "GitHub", username: "drepradhit" },
                  { icon: FaInstagram, url: "https://instagram.com/aaaaanddrre", label: "Instagram", username: "aaaaanddrre" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-white/80 backdrop-blur-sm border border-neutral-200 text-neutral-900 p-3 rounded-full hover:border-neutral-900 hover:bg-neutral-50 shadow-lg shadow-black/5 group overflow-hidden"
                    aria-label={social.label}
                    initial="initial"
                    whileHover="hover"
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-5 h-5 shrink-0" />
                    <motion.span 
                      className="overflow-hidden whitespace-nowrap text-[13px] font-bold"
                      variants={{
                        initial: { width: 0, opacity: 0, marginLeft: 0 },
                        hover: { width: "auto", opacity: 1, marginLeft: 12 }
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      {social.username}
                    </motion.span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-20 md:mt-32 w-full max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start" id="about">
          
          <div className="flex flex-col w-full min-h-[400px] items-center lg:items-start pt-0">
            <motion.div
              className="relative w-full bg-white/95 backdrop-blur-md overflow-hidden rounded-[32px] border border-neutral-200 cursor-default shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
              initial={{ opacity: 0, y: 20, rotate: -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
              whileHover={{ 
                y: -10, 
                rotate: -3,
                shadow: "0 25px 60px rgba(0,0,0,0.12)" 
              }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between px-8 pt-8 pb-6 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
                <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-[#ff5f57]" /><div className="w-3 h-3 rounded-full bg-[#ffbd2e]" /><div className="w-3 h-3 rounded-full bg-[#28c840]" /></div>
                <div className="flex items-center gap-6">
                  <span className="text-[#eab308] font-semibold text-[17px] cursor-pointer hover:opacity-70">Done</span>
                </div>
              </div>

              <div className="px-8 md:px-12 pt-0 pb-10">
                <div className="flex flex-col gap-0 mb-6 border-b border-neutral-50/50 pb-4 text-center">
                  <span className="text-neutral-400 text-[13px] font-medium">Today, 11:56 PM</span>
                  <h2 className="text-2xl md:text-3xl text-black font-extrabold tracking-tight mt-2">Hi! I'm Andre</h2>
                </div>

                <div className="text-[15px] md:text-[16px] leading-[1.5] text-neutral-800 font-normal space-y-4 mb-10">
                  <p>I'm a <strong className="text-neutral-900 font-semibold">Computer Science</strong> student at <strong className="text-neutral-900 font-semibold">BINUS University</strong>, passionate about <strong className="text-neutral-900 font-semibold">Web Development</strong> and UI/UX.</p>
                  <p>I build <strong className="text-neutral-900 font-semibold">web apps, interactive platforms, and digital experiences</strong> that feel meaningful and clean.</p>
                  <div className="pt-4 italic text-neutral-500 text-sm">Currently open to <span className="text-neutral-900 font-medium not-italic">internships & freelance projects</span>.</div>
                </div>

                <div className="pt-8 border-t border-neutral-100/80">
                   <h3 className="text-xs font-bold text-neutral-400 opacity-60 uppercase tracking-widest mb-6 px-1 text-center sm:text-left">TechStack</h3>
                   
                   <div className="relative flex flex-col gap-0 overflow-hidden group -mt-4">
                     <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/95 to-transparent z-10 pointer-events-none" />
                     <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white/95 to-transparent z-10 pointer-events-none" />
                     
                    {(() => {
                      const filteredTools = listTools.filter(t => t.nama.toLowerCase() !== "gsap");
                      const midPoint = Math.ceil(filteredTools.length / 2);
                      const topRowTools = filteredTools.slice(0, midPoint);
                      const bottomRowTools = filteredTools.slice(midPoint);

                      return (
                        <>
                          <motion.div 
                            className="flex gap-10 py-3 w-max"
                            animate={{ x: [0, -1000] }}
                            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                          >
                            {[...topRowTools, ...topRowTools, ...topRowTools, ...topRowTools, ...topRowTools].map((tool, index) => (
                              <div key={`${tool.id}-r1-${index}`} className="shrink-0">
                                <img src={tool.gambar} alt={tool.nama} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
                              </div>
                            ))}
                          </motion.div>

                          <motion.div 
                            className="flex gap-10 py-3 w-max"
                            animate={{ x: [-1000, 0] }}
                            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                          >
                            {[...bottomRowTools, ...bottomRowTools, ...bottomRowTools, ...bottomRowTools, ...bottomRowTools].map((tool, index) => (
                              <div key={`${tool.id}-r2-${index}`} className="shrink-0">
                                <img src={tool.gambar} alt={tool.nama} className="w-8 h-8 sm:w-9 sm:h-9 object-contain" />
                              </div>
                            ))}
                          </motion.div>
                        </>
                      );
                    })()}
                   </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="w-full min-h-[400px] flex justify-center lg:justify-start pt-0" 
            id="experience"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <WorkExperience experience={listExperience} />
          </motion.div>
        </div>

        <div className="proyek mt-20 md:mt-32 w-full" id="projects">
          <FinderWindow />
        </div>

        <div className="mt-20">
          <GithubDashboard />
        </div>

      </main>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </div>
  );
}

export default App;
