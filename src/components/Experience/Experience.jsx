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
    company: "Dinas Perhubungan · Internship", 
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

      <div className="relative w-full max-w-4xl mx-auto pb-12">
        {/* Clean Vertical Timeline Line */}
        <div className="absolute left-[24px] md:left-[40px] top-6 bottom-0 w-[2px] bg-neutral-100 rounded-full"></div>
        
        <div className="flex flex-col gap-8 md:gap-10">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id}
              className="relative w-full pl-[56px] md:pl-[88px] pr-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Timeline Indicator Dot */}
              <div className="absolute left-[19px] md:left-[35px] top-7 w-[12px] h-[12px] rounded-full bg-neutral-800 border-2 border-white ring-4 ring-neutral-50 z-10 transition-transform duration-300 group-hover:scale-110"></div>
              
              {/* Minimalist Card Setup */}
              <div className="bg-white p-6 sm:p-7 md:p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-neutral-100/60 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:border-neutral-200/60 transition-all duration-300 group relative">
                
                {/* Header: Title and Company/Time */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight leading-snug mb-1">
                      {exp.role}
                    </h3>
                    <p className="text-[13px] sm:text-sm font-bold text-blue-600 uppercase tracking-widest">
                      {exp.company}
                    </p>
                  </div>
                  
                  {/* Subtle Timeline/Location details */}
                  <div className="flex flex-col items-start md:items-end gap-1.5 mt-2 md:mt-0 text-neutral-400">
                    <span className="flex items-center gap-1.5 text-xs font-semibold bg-neutral-50 px-2.5 py-1 rounded-md">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-medium">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Body: Description */}
                <p className="text-neutral-500 text-[14px] leading-relaxed mb-6 max-w-2xl">
                  {exp.description}
                </p>

                {/* Footer: Neatly Stacked Tech Stack */}
                {exp.skills && exp.skills.length > 0 && (
                  <div className="pt-4 border-t border-neutral-100/50">
                    <div className="flex items-center flex-wrap gap-2 group-hover:translate-x-1 transition-transform duration-300">
                      {exp.skills.map((skill, idx) => (
                        <div
                          key={idx}
                          title={skill.name}
                          className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center p-1.5 shadow-sm hover:-translate-y-1 transition-transform duration-300"
                        >
                          <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
