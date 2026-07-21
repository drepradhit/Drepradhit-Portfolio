import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import { listTools } from "../../data";

const unavailable = new Set(["UNDER_MAINTENANCE", "COMING_SOON"]);

export default function BentoProjectCard({ project, scrollKey = "home_scroll", index = 0 }) {
  const navigate = useNavigate();
  const tools = (project.techstack || [])
    .map((name) => listTools.find((tool) => tool.nama.toLowerCase() === name.toLowerCase()))
    .filter(Boolean)
    .slice(0, 5);

  const openProject = () => {
    sessionStorage.setItem(`${scrollKey}_pos`, String(window.scrollY));
    sessionStorage.setItem(`should_restore_${scrollKey}`, "true");
    navigate(`/project/${project.slug}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject();
    }
  };

  const liveUrl = project.url && !unavailable.has(project.url) ? project.url : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      onClick={openProject}
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex={0}
      aria-label={`View ${project.title} project`}
      className={`group mx-auto mb-5 grid w-full max-w-[880px] cursor-pointer overflow-hidden rounded-[24px] border border-neutral-200/70 bg-white p-2 shadow-[0_8px_30px_rgba(15,23,42,0.05)] transition-shadow duration-500 hover:shadow-[0_18px_50px_rgba(15,23,42,0.10)] lg:grid-cols-[1.08fr_.92fr] ${
        index % 2 ? "lg:[&>.project-media]:order-2" : ""
      }`}
    >
      <div className="project-media relative min-h-[220px] overflow-hidden rounded-[18px] bg-neutral-100 sm:min-h-[280px] lg:min-h-[330px]">
        <img
          src={project.image}
          alt={`${project.title} project preview`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5" />
        <span className="absolute bottom-4 left-4 rounded-full border border-white/45 bg-white/75 px-3 py-1.5 text-[11px] font-semibold text-neutral-800 shadow-sm backdrop-blur-md sm:hidden">
          {project.category} / {project.year}
        </span>
      </div>

      <div className="flex min-h-[290px] flex-col justify-between p-5 sm:p-6 lg:min-h-0 lg:p-7">
        <div>
          <p className="hidden text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400 sm:block">
            {[project.category, project.year, project.duration].filter(Boolean).join(" / ")}
          </p>

          <h3 className="mt-1 text-[1.8rem] font-extrabold leading-[1.05] tracking-[-0.04em] text-neutral-950 sm:mt-5 sm:text-[2rem]">
            {project.title}
          </h3>

          {project.role && (
            <p className="mt-1.5 text-[13px] font-semibold text-neutral-400">{project.role}</p>
          )}

          <p className="mt-4 line-clamp-3 max-w-[36ch] text-sm leading-6 text-neutral-600">
            {project.subtitle}
          </p>
        </div>

        <div className="mt-6">
          <div className="mb-5 flex flex-wrap gap-1.5" aria-label="Technology stack">
            {tools.map((tool) => (
              <span
                key={tool.id}
                title={tool.nama}
                className="grid size-8 place-items-center rounded-lg border border-neutral-200 bg-neutral-50 p-1.5 transition-transform duration-200 group-hover:-translate-y-0.5"
              >
                <img src={tool.gambar} alt={tool.nama} className="h-full w-full object-contain" loading="lazy" />
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 border-t border-neutral-100 pt-4">
            <span className="inline-flex items-center gap-2.5 text-[13px] font-bold text-neutral-950">
              Explore project
              <span className="grid size-8 place-items-center rounded-full bg-neutral-950 text-white transition-transform duration-300 group-hover:translate-x-1">
                <FiArrowRight size={14} strokeWidth={2.4} />
              </span>
            </span>

            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 transition-colors hover:text-neutral-900"
              >
                Live site <FiExternalLink size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
