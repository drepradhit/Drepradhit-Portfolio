import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";

import { listTools, listProyek, listProyekWeb, listProyekUIUX } from "./data";

import ProjectModal from "./components/ProjectModal/ProjectModal";
import Aurora from "./components/Aurora/Aurora";
import TerminalRoles from "./components/TerminalRoles/TerminalRoles";

import AOS from 'aos';
import ProjectGrid from "./components/ProjectGrid/ProjectGrid";
import InfiniteMarquee from "./components/InfiniteMarquee/InfiniteMarquee";



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
    <>
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#fdfbf7]">
      </div>
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

        <div className="hero grid md:grid-cols-2 items-center pt-12 gap-12 md:gap-20 grid-cols-1 max-w-6xl mx-auto">
          <div className="order-2 md:order-1 px-4 md:px-0 flex flex-col items-center md:items-start text-center md:text-left">

            <motion.h1
              className="text-4xl sm:text-5xl md:text-5xl font-bold leading-tight text-neutral-900 mb-4"
              initial={isFirstVisit ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={isFirstVisit ? { duration: 0.6, ease: "easeOut" } : { duration: 0 }}
            >
              <motion.span
                className="hidden md:inline"
                initial={isFirstVisit ? { opacity: 0 } : { opacity: 1 }}
                animate={{ opacity: 1 }}
                transition={isFirstVisit ? { delay: 0.2, duration: 0.5 } : { duration: 0 }}
              >
                Hi, I'm{" "}
              </motion.span>
              <motion.span
                className="text-neutral-900 md:text-neutral-600 hero-name-anim"
                initial={isFirstVisit ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                transition={isFirstVisit ? { delay: 0.4, duration: 0.6, ease: "easeOut" } : { duration: 0 }}
              >
                Andre Pradhit
              </motion.span>
            </motion.h1>

            <motion.div
              className="block md:hidden text-lg text-neutral-600 mb-8 leading-relaxed w-full max-w-[320px]"
              initial={isFirstVisit ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={isFirstVisit ? { delay: 0.6, duration: 0.5, ease: "easeOut" } : { duration: 0 }}
            >
              <TerminalRoles roles={["UI UX Designer", "Frontend Developer", "Web Developer"]} />
            </motion.div>

            <motion.div
              className="hidden md:block text-lg text-neutral-600 text-left mb-8 leading-relaxed w-full"
              initial={isFirstVisit ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={isFirstVisit ? { delay: 0.6, duration: 0.5, ease: "easeOut" } : { duration: 0 }}
            >
              <TerminalRoles roles={["UI UX Designer", "Frontend Developer", "Web Developer"]} />
            </motion.div>

            <motion.div
              className="flex flex-row items-center gap-4 justify-center md:justify-start w-full md:w-auto"
              initial={isFirstVisit ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={isFirstVisit ? { delay: 0.8, duration: 0.5, ease: "easeOut" } : { duration: 0 }}
            >
              <motion.a
                href="./assets/proyek/Resume - Andre Pradhit.pdf"
                download="Resume - Andre Pradhit.pdf"
                className="relative font-medium bg-white border border-neutral-200 text-neutral-900 px-8 py-3 rounded-full overflow-hidden transition-all duration-300 group hover:border-neutral-900 hover:bg-neutral-50 shadow-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  My Resume
                  <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 transform" />
              </motion.a>

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

            </motion.div>
          </div>

          <motion.div
            className="order-1 md:order-2 w-full flex justify-center px-4 md:px-0"
            initial={isFirstVisit ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={isFirstVisit ? { delay: 0.3, duration: 0.7, ease: "easeOut" } : { duration: 0 }}
          >
            <div className="w-full max-w-md">
              <ProfileCard
                name="Andre Pradhit"
                title="UI/UX Designer"
                handle="drepradhit"
                status="Online"
                contactText="Connect"
                avatarUrl="./assets/andre.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              />
            </div>
          </motion.div>
        </div>
        {/* tentang */}
        <div className="mt-32 w-full max-w-6xl mx-auto" id="about">
          <div className="relative md:rounded-[2.5rem] bg-transparent md:bg-white md:border md:border-neutral-200 p-8 md:p-12 overflow-hidden md:shadow-xl md:shadow-neutral-200/50">
            {/* Background Gradient Blob */}
            <div className="hidden md:block absolute top-0 right-0 w-96 h-96 bg-stone-800/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10 pointer-events-none"></div>
            <div className="hidden md:block absolute bottom-0 left-0 w-64 h-64 bg-neutral-800/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 -z-10 pointer-events-none"></div>

            <div className="flex flex-col items-center text-center gap-10" data-aos="fade-up" data-aos-duration="1000">

              {/* About Section - Redesigned */}
              <div className="w-full relative z-10">

                {/* Main Content Grid */}
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

                  {/* Left Column - Identity & Bio */}
                  <div className="text-center md:text-left space-y-6">
                    {/* Name Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 border border-neutral-200 rounded-full backdrop-blur-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-sm text-neutral-600">Available for projects</span>
                    </div>

                    {/* Name & Title */}
                    <div>
                      <h2 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-3">
                        Andre
                      </h2>
                      <p className="text-xl md:text-2xl text-neutral-600 font-light">
                        UI/UX Designer & Web Developer
                      </p>
                    </div>

                    {/* Education Badge */}
                    <div className="inline-flex items-center gap-3 px-5 py-3 bg-white border border-neutral-200 rounded-2xl shadow-sm">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                      <div className="text-left">
                        <p className="text-xs text-neutral-500">Currently studying at</p>
                        <p className="text-sm font-medium text-neutral-900">BINUS University - 6th Semester</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Description & Skills */}
                  <div className="space-y-6 text-center md:text-left md:translate-y-12">
                    {/* Description */}
                    <div className="space-y-4">
                      <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
                        I am a <span className="text-neutral-950 font-medium">Computer Science student</span> with a strong passion for <span className="text-neutral-950 font-medium">UI/UX Design</span>.
                        My academic background has shaped my problem-solving mindset and analytical thinking.
                      </p>
                    </div>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Problem Solving'].map((skill) => (
                        <div key={skill} className="px-3 py-1.5 md:px-4 md:py-2 bg-white border border-neutral-200 rounded-full flex items-center gap-1.5 md:gap-2 hover:border-neutral-900 transition-all duration-300 group cursor-default shadow-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-300 group-hover:bg-neutral-900 transition-colors"></div>
                          <span className="text-xs md:text-sm text-neutral-600 group-hover:text-neutral-900 font-medium transition-colors">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mt-10">
                  <a href="#project" className="inline-flex items-center justify-center gap-2 bg-neutral-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-neutral-800 transition-colors group">
                    <span>View Projects</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>

                </div>
              </div>

              {/* Feature cards removed */}

            </div>
          </div>
        </div>
        <div className="tools mt-32">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >

            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
              Skills and Tools
            </h1>
            <p className="text-neutral-600 max-w-xl mx-auto text-lg leading-relaxed">
              The essential toolkit I use for my work.
            </p>
          </motion.div>

          <div className="flex flex-col gap-10 relative w-screen left-1/2 -translate-x-1/2 md:static md:w-full md:left-auto md:translate-x-0">
            {/* Top Row: Coding Tools (First 9 items) */}
            <InfiniteMarquee items={listTools.slice(0, 9)} speed={0.01} direction="left" />
            {/* Bottom Row: Design Tools (Remaining items) */}
            <InfiniteMarquee items={listTools.slice(9)} speed={0.01} direction="right" />
          </div>
        </div>
        {/* tentang */}


        {/* Proyek */}
        <div className="proyek mt-12 md:mt-20 py-10" id="project"></div>

        {/* Project Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900">
            Featured Projects
          </h1>
          <p className="text-neutral-600 max-w-md mx-auto">
            A selection of projects I've worked on
          </p>
        </motion.div>

        {/* Scroll Stack Projects */}
        <ProjectGrid projects={listProyek} />

        {/* Proyek */}


        {/* Kontak */}
        {/* Kontak */}
        <div className="kontak mt-24 md:mt-20 w-full max-w-4xl mx-auto p-4 sm:p-0 mb-20" id="contact">
          <div
            className="flex flex-col items-center justify-center relative"
          >
            {/* Background Glow Removed */}

            {/* Content */}
            <div className="w-full flex flex-col justify-center items-center text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-neutral-900 tracking-tighter">
                Let's Connect
              </h1>
              <p className="text-neutral-600 mb-12 max-w-lg mx-auto text-lg leading-relaxed">
                Follow me on social media to see my latest work and design inspiration. Let's create something amazing together!
              </p>

              <div className="flex flex-wrap justify-center gap-6 w-full">

                <a
                  href="https://instagram.com/aaaaanddrre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-3 px-8 py-4 bg-white border border-neutral-200 rounded-full hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-300 md:w-auto w-full justify-center shadow-sm"
                >
                  <FaInstagram className="text-2xl text-neutral-500 group-hover:text-purple-600 transition-colors" />
                  <span className="text-base font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">Instagram</span>
                  <div className="absolute inset-0 rounded-full ring-2 ring-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>

                <a
                  href="https://www.linkedin.com/in/andrepradhit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-3 px-8 py-4 bg-white border border-neutral-200 rounded-full hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-300 md:w-auto w-full justify-center shadow-sm"
                >
                  <FaLinkedin className="text-2xl text-neutral-500 group-hover:text-blue-600 transition-colors" />
                  <span className="text-base font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">LinkedIn</span>
                  <div className="absolute inset-0 rounded-full ring-2 ring-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>

                <a
                  href="https://github.com/drepradhit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-3 px-8 py-4 bg-white border border-neutral-200 rounded-full hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-300 md:w-auto w-full justify-center shadow-sm"
                >
                  <FaGithub className="text-2xl text-neutral-500 group-hover:text-neutral-900 transition-colors" />
                  <span className="text-base font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">GitHub</span>
                  <div className="absolute inset-0 rounded-full ring-2 ring-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>

              </div>
            </div>
          </div>
        </div>
        {/* Kontak */}

      </main>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  )
}

export default App
