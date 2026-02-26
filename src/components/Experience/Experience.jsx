import { motion } from "framer-motion";
import { FaBriefcase } from "react-icons/fa";

// Data Experience (Placeholder)
// Mengingat sistem keamanan/proteksi LinkedIn, saya tidak bisa melakukan "scrape" otomatis secara langsung,
// jadi saya sudah membuatkan komponen dengan desain UI Premium khusus yang kamu buat.
// Silakan sesuaikan data company, url logo, dan deskripsi di bawah ini dengan pengalaman LinkedIn aslimu!
const experiences = [
  {
    id: 1,
    role: "Full-stack Developer",
    company: "Dinas Perhubungan Kabupaten Bandung · Internship", 
    location: "Bandung, West Java, Indonesia", 
    duration: "Feb 2026 - Present",
    logo: "/assets/Career/Dishub.png",
    description: "Developing and maintaining web applications for the transportation department.",
    skills: [
      { name: "React JS", icon: "/assets/tools/reactjs.png" },
      { name: "PostgreSQL", icon: "/assets/tools/postgre.png" },
      { name: "Next JS", icon: "/assets/tools/nextjs.png" },
      { name: "Tailwind CSS", icon: "/assets/tools/tailwind logo.png" },
      { name: "Node JS", icon: "/assets/tools/node logo.png" }
    ]
  },
  {
    id: 2,
    role: "Web Maintenance",
    company: "Dunia Sandang · Freelance", 
    location: "Bandung, West Java, Indonesia",
    duration: "Oct 2024 - Oct 2024",
    logo: "/assets/Career/Dunia Sandang.jpeg",
    description: "Maintained and updated the company's WordPress website.",
    skills: [
      { name: "WordPress", icon: "/assets/tools/wordpress.png" }
    ]
  },
  {
    id: 4,
    role: "Creative Designer",
    company: "Linestag Indonesia · Internship", 
    location: "Bandung, West Java, Indonesia · On-site",
    duration: "Apr 2022 - Sep 2022",
    logo: "/assets/Career/Linestag.webp",
    description: "Worked as a Creative Designer, Script Writer for Tiktok Live, and Event Organizer for Baret Milenial.",
    skills: [
      { name: "Adobe Illustrator", icon: "/assets/tools/ai.png" },
      { name: "Adobe Photoshop", icon: "/assets/tools/ps.png" },
      { name: "Premiere Pro", icon: "/assets/tools/pr.png" }
    ]
  }
];

export default function Experience() {
  return (
    <div className="mt-32 w-full max-w-5xl mx-auto px-4 sm:px-0" id="experience">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900">
          Professional Journey
        </h2>
        <p className="text-neutral-600 max-w-md mx-auto">
          A timeline of my roles, the organizations I've collaborated with, and the skills I've honed along the way.
        </p>
      </motion.div>

      <div className="relative w-full">
        {/* Minimalist Thin Vertical Line */}
        <div className="absolute left-7 md:left-1/2 top-4 bottom-4 w-[1px] bg-neutral-200 -translate-x-1/2 z-0"></div>
        
        <div className="space-y-10 md:space-y-0 w-full pb-10">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                key={exp.id}
                className={`relative flex flex-col md:flex-row items-center justify-between w-full md:mb-16 ${isEven ? 'md:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Timeline Hollow Dot */}
                <div className="absolute left-7 md:left-1/2 w-4 h-4 rounded-full bg-white border-[3px] border-neutral-600 -translate-x-1/2 translate-y-8 md:translate-y-0 z-10 transition-colors duration-300"></div>
                
                {/* Space for the other side on desktop */}
                <div className="hidden md:block w-[42%]"></div>

                {/* Content Card with pure white floating aesthetic */}
                <div className="w-full md:w-[45%] pl-14 md:pl-0 pt-0 relative">
                  
                  <div className="bg-white p-5 sm:p-6 md:p-7 rounded-[24px] md:rounded-[28px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-neutral-100/50 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group relative">
                    
                    <div className="flex flex-row items-start gap-3 sm:gap-4 mb-4">
                      {/* Logo Wrapper - Fixed Uniform Width without forcing height crop */}
                      <div className="w-12 sm:w-14 md:w-[56px] flex-shrink-0 relative z-10 flex items-center justify-center bg-transparent mt-0">
                        <img 
                          src={exp.logo} 
                          alt={exp.company} 
                          className="w-full h-auto object-contain mix-blend-multiply" 
                        />
                      </div>
                      
                      {/* Title & Company */}
                      <div className="flex-1 mt-0">
                        <h3 className="text-base sm:text-[17px] font-black text-neutral-900 tracking-tight leading-snug">
                          {exp.role}
                        </h3>
                        <p className="text-xs sm:text-[13px] font-bold text-neutral-500 mt-1">{exp.company}</p>
                      </div>
                    </div>

                    {/* Metadata Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-5 mt-4">
                      <span className="inline-flex items-center gap-1.5 bg-neutral-900 text-white px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest leading-none">
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        {exp.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-neutral-100/80 text-neutral-500 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest border border-neutral-200/60 leading-none">
                        <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {exp.location}
                      </span>
                    </div>
                    
                    {/* Description */}
                    <p className="text-neutral-500 text-[13px] leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    {/* Stacked Techstack Logos Wrapper - Thin line division */}
                    <div className="pt-4 border-t border-neutral-100">
                      <p className="text-[9px] uppercase tracking-widest font-black text-neutral-400 mb-2.5">Tech & Tools</p>
                      <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                        {exp.skills.map((skill, idx) => (
                          <div
                            key={idx}
                            title={skill.name}
                            className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center p-1.5 shadow-sm relative hover:-translate-y-1 hover:z-20 transition-all duration-300"
                            style={{ marginLeft: idx === 0 ? 0 : '-10px', zIndex: exp.skills.length - idx }}
                          >
                            <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
