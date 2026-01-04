import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";

import { listTools, listProyek } from "./data";

import ProjectModal from "./components/ProjectModal/ProjectModal";
import Aurora from "./components/Aurora/Aurora";
import TrueFocus from "./components/TrueFocus/TrueFocus";
import RotatingRoles from "./components/RotatingRoles/RotatingRoles";
import AOS from 'aos';
import ScrollStack from "./components/ScrollStack/ScrollStack";
import InfiniteMarquee from "./components/InfiniteMarquee/InfiniteMarquee";


import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import 'aos/dist/aos.css';
AOS.init();

function App() {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#000000]">
        <Aurora
          colorStops={["#000000", "#1a1a1a", "#262626"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
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
  background: linear-gradient(
    -45deg,
    #ffffff,
    #a3a3a3,
    #ffffff,
    #737373
  );
  background-size: 300% 300%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-flow 6s ease infinite;
  font-weight: 800; 
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

        <div className="hero grid md:grid-cols-2 items-center pt-12 xl:gap-0 gap-8 grid-cols-1">
          <div className="order-2 md:order-1 px-4 md:px-0 flex flex-col items-center md:items-start text-center md:text-left">

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.span
                className="hidden md:inline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Hi, I'm{" "}
              </motion.span>
              <motion.span
                className="text-white md:text-neutral-400 hero-name-anim"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              >
                Andre Pradhit
              </motion.span>
            </motion.h1>

            {/* Mobile: Simple RotatingRoles */}
            <motion.div
              className="block md:hidden text-lg text-neutral-400 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
            >
              <RotatingRoles className="text-xl font-semibold text-neutral-300" />
            </motion.div>

            {/* Desktop: TrueFocus */}
            <motion.div
              className="hidden md:block text-lg text-neutral-400 text-left mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
            >
              <TrueFocus
                sentence="UI UX Designer|Frontend Developer|Web Developer"
                separator="|"
                manualMode={false}
                blurAmount={4}
                borderColor="#ffffff"
                glowColor="rgba(255, 255, 255, 0.5)"
                animationDuration={0.5}
                pauseBetweenAnimations={2}
              />
            </motion.div>

            <motion.div
              className="flex flex-col md:flex-row items-center gap-6 md:gap-4 justify-center md:justify-start w-full md:w-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
            >
              <motion.a
                href="./assets/proyek/Resume - Andre Pradhit.pdf"
                download="Resume - Andre Pradhit.pdf"
                className="relative font-medium bg-neutral-900 border border-neutral-700 text-white px-8 py-3 rounded-full overflow-hidden transition-all duration-300 group hover:border-white hover:bg-neutral-800"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  My Resume
                  <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 transform" />
              </motion.a>


              {/* ... previous code ... */}


            </motion.div>
          </div>

          <motion.div
            className="order-1 md:order-2 w-full flex justify-center px-4 md:px-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
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
          <div className="relative md:rounded-[2.5rem] bg-transparent md:bg-neutral-950 md:border md:border-neutral-800 p-8 md:p-12 overflow-hidden md:shadow-2xl md:shadow-neutral-900/50">
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900/50 border border-neutral-800 rounded-full backdrop-blur-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-sm text-neutral-300">Available for projects</span>
                    </div>

                    {/* Name & Title */}
                    <div>
                      <h2 className="text-5xl md:text-6xl font-bold text-white mb-3 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                        Andre
                      </h2>
                      <p className="text-xl md:text-2xl text-neutral-400 font-light">
                        UI/UX Designer & Web Developer
                      </p>
                    </div>

                    {/* Education Badge */}
                    <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      </svg>
                      <div className="text-left">
                        <p className="text-xs text-neutral-500">Currently studying at</p>
                        <p className="text-sm font-medium text-white">BINUS University - 5th Semester</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Description & Skills */}
                  <div className="space-y-6 text-center md:text-left md:translate-y-12">
                    {/* Description */}
                    <div className="space-y-4">
                      <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
                        I am a <span className="text-white font-medium">Computer Science student</span> with a strong passion for <span className="text-white font-medium">UI/UX Design</span>.
                        My academic background has shaped my problem-solving mindset and analytical thinking.
                      </p>
                    </div>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Problem Solving'].map((skill) => (
                        <div key={skill} className="px-3 py-1.5 md:px-4 md:py-2 bg-white/5 border border-white/10 rounded-full flex items-center gap-1.5 md:gap-2 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group cursor-default backdrop-blur-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-500 group-hover:bg-white transition-colors"></div>
                          <span className="text-xs md:text-sm text-neutral-400 group-hover:text-white font-medium transition-colors">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mt-10">
                  <a href="#project" className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-neutral-100 transition-colors group">
                    <span>View Projects</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a href="#contact" className="inline-flex items-center justify-center gap-2 border border-neutral-700 text-neutral-300 px-6 py-3 rounded-xl hover:border-neutral-600 hover:text-white transition-colors">
                    <span>Get in Touch</span>
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

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Skills and Tools
            </h1>
            <p className="text-neutral-400 max-w-xl mx-auto text-lg leading-relaxed">
              The essential toolkit I use for my work.
            </p>
          </motion.div>

          <div className="flex flex-col gap-10 relative w-screen left-1/2 -translate-x-1/2 md:static md:w-full md:left-auto md:translate-x-0">
            <InfiniteMarquee items={listTools.slice(0, Math.ceil(listTools.length / 2))} speed={0.01} direction="left" />
            <InfiniteMarquee items={listTools.slice(Math.ceil(listTools.length / 2))} speed={0.01} direction="right" />
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

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Featured Projects
          </h1>
          <p className="text-neutral-500 max-w-md mx-auto">
            A selection of projects I've worked on
          </p>
        </motion.div>

        {/* Scroll Stack Projects */}
        <ScrollStack projects={listProyek} onProjectClick={handleProjectClick} />
        {/* Proyek */}


        {/* Kontak */}
        {/* Kontak */}
        <div className="kontak mt-24 md:mt-20 w-full max-w-4xl mx-auto p-4 sm:p-0 mb-20" id="contact">
          <div
            className="flex flex-col items-center justify-center relative"
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 to-transparent blur-3xl -z-10 rounded-full opacity-50" />

            {/* Content */}
            <div className="w-full flex flex-col justify-center items-center text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white tracking-tighter">
                Let's Connect
              </h1>
              <p className="text-neutral-400 mb-12 max-w-lg mx-auto text-lg leading-relaxed">
                Follow me on social media to see my latest work and design inspiration. Let's create something amazing together!
              </p>

              <div className="flex flex-wrap justify-center gap-6 w-full">

                <a
                  href="https://instagram.com/aaaaanddrre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-3 px-8 py-4 bg-neutral-900/30 backdrop-blur-md border border-neutral-800 rounded-full hover:border-purple-500/50 hover:bg-neutral-800/50 transition-all duration-300 md:w-auto w-full justify-center"
                >
                  <FaInstagram className="text-2xl text-neutral-400 group-hover:text-purple-400 transition-colors" />
                  <span className="text-base font-medium text-neutral-300 group-hover:text-white transition-colors">Instagram</span>
                  <div className="absolute inset-0 rounded-full ring-2 ring-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>

                <a
                  href="https://linkedin.com/in/andre-pradhit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-3 px-8 py-4 bg-neutral-900/30 backdrop-blur-md border border-neutral-800 rounded-full hover:border-blue-500/50 hover:bg-neutral-800/50 transition-all duration-300 md:w-auto w-full justify-center"
                >
                  <FaLinkedin className="text-2xl text-neutral-400 group-hover:text-blue-400 transition-colors" />
                  <span className="text-base font-medium text-neutral-300 group-hover:text-white transition-colors">LinkedIn</span>
                  <div className="absolute inset-0 rounded-full ring-2 ring-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>

                <a
                  href="https://github.com/drepradhit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center gap-3 px-8 py-4 bg-neutral-900/30 backdrop-blur-md border border-neutral-800 rounded-full hover:border-white/50 hover:bg-neutral-800/50 transition-all duration-300 md:w-auto w-full justify-center"
                >
                  <FaGithub className="text-2xl text-neutral-400 group-hover:text-white transition-colors" />
                  <span className="text-base font-medium text-neutral-300 group-hover:text-white transition-colors">GitHub</span>
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
