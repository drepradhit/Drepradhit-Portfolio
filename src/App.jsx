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
import { motion } from "framer-motion";
import 'aos/dist/aos.css';

AOS.init();

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

  return (
    <div className="overflow-x-hidden relative w-full min-h-screen">
      <style>{`
        body {
          background-color: #f2f2f7;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }
      `}</style>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* HERO SECTION */}
        <div className="hero grid lg:grid-cols-2 items-center pt-12 gap-12 lg:gap-20 grid-cols-1 max-w-6xl mx-auto">
          <motion.div
            className="order-1 lg:order-2 w-full flex justify-center px-4 lg:px-0"
            initial={isFirstVisit ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={isFirstVisit ? { delay: 0.3, duration: 0.7, ease: "easeOut" } : { duration: 0 }}
          >
            <div className="w-full flex justify-center">
              <ProfileCard avatarUrl="./assets/andre.png" />
            </div>
          </motion.div>

          <div className="order-2 lg:order-1 px-4 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl leading-[1.1] mb-6 font-bold tracking-tight"
              style={{ fontFamily: "'Outfit', sans-serif" }}
              initial={isFirstVisit ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span style={{ color: '#1a1a1a' }}>Hi, I'm </span>
              <span style={{ color: '#1e293b' }}>Andre<br />Pradhit</span>
            </motion.h1>

            <div className="text-lg text-neutral-600 mb-8 leading-relaxed w-full flex justify-center lg:justify-start">
              <div className="w-full max-w-[340px] lg:max-w-none">
                <TerminalRoles roles={["UI UX Designer", "Mobile Developer", "Web Developer", "Graphic Designer"]} />
              </div>
            </div>

            <div className="flex flex-row items-center gap-3 justify-center lg:justify-start w-full">
              <motion.a
                href="https://drive.google.com/file/d/1je3WZmUi7OidlNM-QsVvqG-CNeG1YXp2/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center relative font-medium bg-white border border-neutral-200 text-neutral-900 px-8 py-3 rounded-full transition-all duration-300 group hover:border-neutral-900 hover:bg-neutral-50 shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Resume
                <svg className="ml-2 w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              </motion.a>

              <div className="flex flex-row gap-2.5">
                {[
                  { icon: FaLinkedin, url: "https://www.linkedin.com/in/andrepradhit/", label: "LinkedIn" },
                  { icon: FaGithub, url: "https://github.com/drepradhit", label: "GitHub" },
                  { icon: FaInstagram, url: "https://instagram.com/aaaaanddrre", label: "Instagram" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border border-neutral-200 text-neutral-900 p-3 rounded-full transition-all duration-300 hover:border-neutral-900 hover:bg-neutral-50 shadow-sm"
                    aria-label={social.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ABOUT & EXPERIENCE SECTION (Aligned Horizontally) */}
        <div className="mt-20 md:mt-32 w-full max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start" id="about">
          
          {/* Column 1: About Card */}
          <div className="flex flex-col w-full h-full items-center lg:items-start pt-0">
            <motion.div
              className="relative w-full bg-white overflow-hidden rounded-[32px] border border-neutral-200 cursor-default shadow-[0_10px_40px_rgba(0,0,0,0.04)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              {/* iOS Notes Header Bar */}
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

                {/* INTEGRATED TECH STACK */}
                <div className="pt-8 border-t border-neutral-100/80">
                   <h3 className="text-xs font-bold text-neutral-400 opacity-60 uppercase tracking-widest mb-6 px-1 text-center sm:text-left">Tech Ecosystem</h3>
                   <div className="flex flex-wrap gap-x-8 gap-y-8 justify-center sm:justify-start pl-1">
                      {listTools.filter(t => t.nama !== "GSAP").map((tool) => (
                        <div key={tool.id} className="group relative">
                          <img 
                            src={tool.gambar} 
                            alt={tool.nama} 
                            className="w-8 h-8 sm:w-9 sm:h-9 object-contain opacity-90 grayscale-[0.2] group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" 
                          />
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
                             {tool.nama}
                          </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Column 2: Work Experience (Aligned with About) */}
          <div className="w-full flex justify-center lg:justify-start pt-0" id="experience">
            <WorkExperience experience={listExperience} />
          </div>
        </div>

        {/* PROJECTS SECTION */}
        <div className="proyek mt-20 md:mt-32 w-full max-w-6xl mx-auto px-4" id="projects">
          <FinderWindow />
        </div>

        {/* FOOTER SECTION (GITHUB) */}
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
