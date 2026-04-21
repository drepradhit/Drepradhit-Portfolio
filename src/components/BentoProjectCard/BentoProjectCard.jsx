import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { listTools } from '../../data';
import { FiArrowRight, FiExternalLink } from 'react-icons/fi';

export default function BentoProjectCard({ project, scrollKey = "home_scroll", index = 0 }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigate = () => {
    sessionStorage.setItem(`${scrollKey}_pos`, window.scrollY.toString());
    sessionStorage.setItem(`should_restore_${scrollKey}`, "true");
    navigate(`/project/${project.slug}`);
  };

  const projectTools = project.techstack
    ? project.techstack.map(name => listTools.find(t => t.nama.toLowerCase() === name.toLowerCase())).filter(Boolean)
    : [];

  /* ─── Mobile ─── */
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onClick={handleNavigate}
        whileTap={{ scale: 0.98 }}
        style={{ cursor: 'pointer' }}
      >
        <div style={{
          position: 'relative', aspectRatio: '16/10', overflow: 'hidden',
          borderRadius: '16px 16px 0 0', background: '#f0f0f0',
        }}>
          <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent 60%)' }} />
          <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {project.category} · {project.year}
            </span>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 22, fontWeight: 800, color: '#fff', margin: '4px 0 0', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              {project.title}
            </h3>
          </div>
        </div>
        <div style={{
          padding: '16px 18px', background: '#fff', borderRadius: '0 0 16px 16px',
          border: '1px solid #eaeaea', borderTop: 'none',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {projectTools.slice(0, 4).map((t, i) => (
              <img key={i} src={t.gambar} alt={t.nama} style={{ width: 22, height: 22, objectFit: 'contain' }} />
            ))}
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: 4 }}>
            View <FiArrowRight size={13} />
          </span>
        </div>
      </motion.div>
    );
  }

  /* ─── Desktop: Horizontal Case Study Card ─── */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleNavigate}
      style={{
        width: '100%',
        maxWidth: 880,
        margin: '0 auto 32px',
        display: 'flex',
        flexDirection: index % 2 !== 0 ? 'row-reverse' : 'row',
        gap: 0,
        cursor: 'pointer',
        borderRadius: 20,
        overflow: 'hidden',
        background: '#fff',
        border: '1px solid #eaeaea',
        transition: 'box-shadow 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1)',
        boxShadow: isHovered ? '0 20px 60px rgba(0,0,0,0.1)' : '0 2px 12px rgba(0,0,0,0.04)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {/* ── Image Side ── */}
      <div style={{
        width: '55%', position: 'relative', overflow: 'hidden',
        background: '#f5f5f5', minHeight: 320,
      }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
          }}
        />
        {/* Soft vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(0,0,0,0.03) 0%, transparent 50%, rgba(0,0,0,0.08) 100%)',
        }} />
      </div>

      {/* ── Info Side ── */}
      <div style={{
        width: '45%', padding: '28px 32px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      }}>
        {/* Top section */}
        <div>
          {/* Category + Year */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <span style={{
              fontSize: 10, fontWeight: 800, color: '#999', textTransform: 'uppercase',
              letterSpacing: '0.12em',
            }}>{project.category}</span>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#ccc', display: 'inline-block' }} />
            <span style={{
              fontSize: 10, fontWeight: 800, color: '#999', textTransform: 'uppercase',
              letterSpacing: '0.12em',
            }}>{project.year}</span>
            {project.duration && (
              <>
                <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#ccc', display: 'inline-block' }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{project.duration}</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 26, fontWeight: 800, color: '#1a1a1a',
            margin: 0, lineHeight: 1.15, letterSpacing: '-0.025em',
          }}>{project.title}</h3>

          {/* Role */}
          {project.role && (
            <p style={{ fontSize: 12, fontWeight: 600, color: '#aaa', marginTop: 6, marginBottom: 0 }}>{project.role}</p>
          )}

          {/* Divider */}
          <div style={{ width: 32, height: 2, background: '#eee', margin: '16px 0', borderRadius: 1 }} />

          {/* Description */}
          <p style={{
            fontSize: 14, lineHeight: 1.7, color: '#666', margin: 0, fontWeight: 450,
            display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>{project.subtitle}</p>
        </div>

        {/* Bottom section */}
        <div>
          {/* Tech stack — clean row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, marginTop: 20 }}>
            {projectTools.slice(0, 5).map((tool, i) => (
              <motion.div
                key={i}
                title={tool.nama}
                whileHover={{ y: -2 }}
                style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: '#f7f7f7', border: '1px solid #eee',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: tool.nama.toLowerCase() === 'gsap' ? 2 : 6,
                }}
              >
                <img src={tool.gambar} alt={tool.nama} style={{
                  width: '100%', height: '100%', objectFit: 'contain',
                  transform: tool.nama.toLowerCase() === 'gsap' ? 'scale(1.4)' : 'none',
                }} />
              </motion.div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <motion.span
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontSize: 14, fontWeight: 700, color: '#1a1a1a',
                fontFamily: "'Outfit', sans-serif",
              }}
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              Explore Project
              <motion.span
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
              >
                <FiArrowRight size={16} strokeWidth={2.5} />
              </motion.span>
            </motion.span>

            {project.url && project.url !== "UNDER_MAINTENANCE" && project.url !== "COMING_SOON" && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontSize: 12, fontWeight: 600, color: '#aaa', textDecoration: 'none',
                  marginLeft: 8,
                }}
              >
                Live site <FiExternalLink size={11} />
              </a>
            )}

            {(project.url === "UNDER_MAINTENANCE" || project.url === "COMING_SOON") && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontSize: 11, fontWeight: 600, color: '#ccc', marginLeft: 8,
              }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
                Offline
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
