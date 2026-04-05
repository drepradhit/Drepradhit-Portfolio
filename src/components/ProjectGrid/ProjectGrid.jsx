import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProjectCard from "../ProjectCard";

export default function ProjectGrid({ projects }) {
    return (
        <div className="w-full pb-20 pt-0">
            <div className="relative max-w-4xl mx-auto px-6 pt-10">
                <div className="flex flex-col gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard 
                            key={`${project.id}-${index}`} 
                            project={project} 
                            storageKey="home_scroll"
                        />
                    ))}
                </div>

                <motion.div className="mt-20 flex justify-center">
                    <Link to="/showcase"
                          className="group inline-flex items-center gap-2 px-10 py-4 bg-[#007aff] text-white rounded-full transition-all duration-300 shadow-xl shadow-blue-500/10 hover:shadow-2xl hover:shadow-blue-500/25"
                          onClick={() => {
                              sessionStorage.setItem("home_scroll_pos", window.scrollY.toString());
                              sessionStorage.setItem("should_restore_home_scroll", "true");
                          }}>
                        <motion.div 
                          className="flex items-center gap-3"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="text-[17px] font-bold tracking-tight">Explore All Works</span>
                          <motion.div
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.div>
                        </motion.div>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}