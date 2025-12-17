import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import { listTools, listProyek } from "./data";
import ProjectModal from "./components/ProjectModal/ProjectModal";
import Aurora from "./components/Aurora/Aurora";
import RotatingRoles from "./components/RotatingRoles/RotatingRoles";
import AOS from 'aos';
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { HiArrowDown } from "react-icons/hi";
import { motion } from "framer-motion";
import 'aos/dist/aos.css';
AOS.init();

function App() {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

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
@keyframes shine {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.hero-name-anim {
  display: inline-block;
  background: linear-gradient(
    90deg,
    #ffffff 0%,
    #ffffff 10%,
    rgba(255, 255, 255, 0.4) 20%,
    #ffffff 30%,
    #ffffff 100%
  );
  background-size: 1000px 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 4s ease-in-out infinite;
  will-change: background-position;
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
          <div className="order-2 md:order-1 px-4 md:px-0">

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
                className="text-neutral-400 hero-name-anim"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
              >
                Andre Pradhit
              </motion.span>
            </motion.h1>

            <motion.div
              className="text-base md:text-lg text-neutral-400 max-w-3xl mb-4 md:mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
            >
              <RotatingRoles className="text-lg md:text-xl lg:text-2xl font-semibold text-neutral-300" />
            </motion.div>

            <motion.div
              className="flex items-center gap-4 justify-start md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
            >
              <motion.a
                href="./assets/proyek/Resume - Andre Pradhit.pdf"
                download="Resume - Andre Pradhit.pdf"
                className="font-medium bg-white px-6 py-3 rounded-full hover:bg-neutral-200 transition-shadow shadow-md text-black"
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume
              </motion.a>
              <motion.a
                href="#about"
                className="md:hidden text-neutral-400 hover:text-white transition-colors"
                aria-label="Scroll down"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <HiArrowDown className="text-2xl slow-bounce" />
              </motion.a>
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

        <div className="mt-32 w-full max-w-6xl mx-auto" id="about">
          <div className="relative md:rounded-[2.5rem] bg-transparent md:bg-neutral-950 md:border md:border-neutral-800 p-8 md:p-12 overflow-hidden md:shadow-2xl md:shadow-neutral-900/50">
            <div className="hidden md:block absolute top-0 right-0 w-96 h-96 bg-stone-800/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10 pointer-events-none"></div>
            <div className="hidden md:block absolute bottom-0 left-0 w-64 h-64 bg-neutral-800/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 -z-10 pointer-events-none"></div>

            <div className="flex flex-col items-center text-center gap-10" data-aos="fade-up" data-aos-duration="1000">
              <div className="w-full relative z-10">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                  <div className="text-center md:text-left space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900/50 border border-neutral-800 rounded-full backdrop-blur-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                      <span className="text-sm text-neutral-300">Available for projects</span>
                    </div>

                    <div>
                      <h2 className="text-5xl md:text-6xl font-bold text-white mb-3 bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent">
                        Andre
                      </h2>
                      <p className="text-xl md:text-2xl text-neutral-400 font-light">
                        UI/UX Designer & Web Developer
                      </p>
                    </div>

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

                  <div className="space-y-6 text-center md:text-left">
                    <div className="space-y-4">
                      <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
                        I am a <span className="text-white font-medium">Computer Science student</span> with a strong passion for <span className="text-white font-medium">UI/UX Design</span>.
                        My academic background has shaped my problem-solving mindset and analytical thinking.
                      </p>
                      <p className="text-base md:text-lg text-neutral-400 leading-relaxed">
                        I combine <span className="text-white font-medium">design skills</span> with <span className="text-white font-medium">technical knowledge</span> to create
                        intuitive, user-centered digital experiences through research, wireframing, and prototyping.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                      {['User Research', 'Wireframing', 'Prototyping', 'Visual Design', 'Problem Solving'].map((skill) => (
                        <span key={skill} className="px-3 py-1.5 text-xs font-medium text-neutral-300 bg-neutral-900/50 border border-neutral-800 rounded-lg hover:border-neutral-700 transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

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
            <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-widest text-neutral-400 uppercase bg-neutral-900/50 border border-neutral-800 rounded-full">
              My Stack
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Tools & Technologies
            </h1>
            <p className="mt-3 text-neutral-500 max-w-md mx-auto">
              Technologies I use to bring ideas to life
            </p>
          </motion.div>

          <div className="tools-box grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {listTools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                  ease: "easeOut"
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 mb-4 p-4 rounded-full bg-neutral-900/50 border border-neutral-800 group-hover:border-neutral-600 group-hover:bg-neutral-800/50 transition-all duration-300">
                  <img
                    src={tool.gambar}
                    alt={tool.nama}
                    className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="text-sm font-semibold text-neutral-300 group-hover:text-white transition-colors mb-1">{tool.nama}</h3>
                <span className="text-xs text-neutral-600 group-hover:text-neutral-500 transition-colors">{tool.ket}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="proyek mt-32 py-10" id="project"></div>

        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-widest text-neutral-400 uppercase bg-neutral-900/50 border border-neutral-800 rounded-full">
            Portfolio
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Featured Projects
          </h1>
          <p className="text-neutral-500 max-w-md mx-auto">
            A selection of projects I've worked on
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:grid-rows-[180px_180px_180px]">
          {listProyek.map((project, index) => {
            let gridClass = "";
            let isTall = false;

            if (index === 0) {
              gridClass = "md:col-span-1 md:row-span-1";
            }
            if (index === 1) {
              gridClass = "md:col-span-1 md:row-span-1";
            }
            if (index === 2) {
              gridClass = "sm:col-span-2 md:col-span-2 md:row-span-2";
              isTall = true;
            }
            if (index === 3) {
              gridClass = "sm:col-span-2 md:col-span-2 md:row-span-2";
              isTall = true;
            }
            if (index === 4) {
              gridClass = "md:col-span-1 md:row-span-1";
            }
            if (index === 5) {
              gridClass = "md:col-span-1 md:row-span-1";
            }

            const heightClass = isTall ? "min-h-[280px] sm:min-h-[200px] md:min-h-0" : "min-h-[200px] sm:min-h-[180px] md:min-h-0";

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 50
                }}
                className={`${gridClass} ${heightClass} group relative overflow-hidden rounded-2xl bg-neutral-950 border border-neutral-800/50 cursor-pointer hover:border-neutral-700 transition-all duration-300 project-card-hologram`}
                onClick={() => handleProjectClick(project)}
              >
                <div className="md:hidden project-card-shine"></div>

                <div className="absolute inset-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-80 transition-all duration-500 group-hover:scale-110 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                </div>

                <div className="relative z-10 h-full flex flex-col justify-between p-4 sm:p-5">
                  <span className="text-[10px] sm:text-xs font-medium text-neutral-400 uppercase tracking-wider">
                    {project.category}
                  </span>

                  <div>
                    <h3 className={`font-semibold text-white mb-1 ${isTall ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>
                      {project.title}
                    </h3>
                    <p className={`text-xs sm:text-sm text-neutral-400 ${isTall ? 'line-clamp-2' : 'line-clamp-1'}`}>
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="kontak mt-32 w-full max-w-6xl mx-auto p-4 sm:p-0" id="contact">
          <div
            className="flex flex-col md:flex-row bg-black border border-neutral-800 rounded-3xl overflow-hidden backdrop-blur-sm shadow-2xl shadow-neutral-900/50"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Connect With Me</h1>
              <p className="text-neutral-400 mb-8 max-w-md leading-relaxed">
                Feel free to reach out or follow my work on social media. I'm always open to new opportunities and collaborations.
              </p>

              <div className="flex flex-col gap-4">
                <a
                  href="https://instagram.com/aaaaanddrre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-neutral-900 hover:bg-neutral-800 p-4 px-6 rounded-2xl border border-neutral-800 hover:border-white transition-all duration-300 w-full sm:w-80 group shadow-sm"
                >
                  <div className="p-2 bg-neutral-800 rounded-full group-hover:bg-neutral-700 transition-colors">
                    <FaInstagram className="text-xl text-neutral-400 group-hover:text-white transition-all" />
                  </div>
                  <span className="text-base font-medium text-neutral-300 group-hover:text-white transition-colors">Instagram</span>
                </a>

                <a
                  href="https://linkedin.com/in/andre-pradhit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-neutral-900 hover:bg-neutral-800 p-4 px-6 rounded-2xl border border-neutral-800 hover:border-white transition-all duration-300 w-full sm:w-80 group shadow-sm"
                >
                  <div className="p-2 bg-neutral-800 rounded-full group-hover:bg-neutral-700 transition-colors">
                    <FaLinkedin className="text-xl text-neutral-400 group-hover:text-white transition-all" />
                  </div>
                  <span className="text-base font-medium text-neutral-300 group-hover:text-white transition-colors">LinkedIn</span>
                </a>

                <a
                  href="https://github.com/drepradhit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-neutral-900 hover:bg-neutral-800 p-4 px-6 rounded-2xl border border-neutral-800 hover:border-white transition-all duration-300 w-full sm:w-80 group shadow-sm"
                >
                  <div className="p-2 bg-neutral-800 rounded-full group-hover:bg-neutral-700 transition-colors">
                    <FaGithub className="text-xl text-neutral-400 group-hover:text-white transition-all" />
                  </div>
                  <span className="text-base font-medium text-neutral-300 group-hover:text-white transition-colors">GitHub</span>
                </a>
              </div>
            </div>

            <div className="flex-1 p-8 md:p-12 flex items-center justify-center bg-black">
              <div className="max-w-sm text-center">
                <h2 className="text-2xl font-bold mb-2 text-white">Let's Connect</h2>
                <p className="text-neutral-400">Follow me on Instagram to see my latest work and design inspiration. Let's create something amazing together!</p>
              </div>
            </div>
          </div>
        </div>

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
