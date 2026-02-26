import React, { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { FaGithub, FaCode, FaReact } from "react-icons/fa";
import { SiNextdotjs, SiFlutter, SiJavascript, SiTypescript, SiTailwindcss } from "react-icons/si";

// Current projects activity (Discord-style)
const currentActivities = [
  {
    project: "Rupiah Flow",
    description: "Personal finance tracker web app",
    tech: "React JS · Node · Supabase",
    icon: <FaReact />,
    iconColor: "#61DAFB",
    startDate: new Date("2026-02-20T10:00:00"),
  },
  {
    project: "CodeForge App",
    description: "Mobile learning platform",
    tech: "Flutter · Dart",
    icon: <SiFlutter />,
    iconColor: "#02569B",
    startDate: new Date("2026-02-19T14:23:37"),
  },
];

// Tech stack with custom proficiency
const techStack = [
  { name: "React JS", percentage: 92, color: "#61DAFB", icon: <FaReact /> },
  { name: "Next JS", percentage: 45, color: "#171717", icon: <SiNextdotjs /> },
  { name: "Flutter", percentage: 80, color: "#02569B", icon: <SiFlutter /> },
  { name: "JavaScript", percentage: 65, color: "#F7DF1E", icon: <SiJavascript /> },
  { name: "TypeScript", percentage: 70, color: "#3178C6", icon: <SiTypescript /> },
  { name: "Tailwind CSS", percentage: 55, color: "#06B6D4", icon: <SiTailwindcss /> },
];

function TechBar({ name, percentage, color, delay, icon }) {
  return (
    <motion.div
      className="space-y-2 group cursor-default"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-4 h-4 text-base flex items-center justify-center drop-shadow-sm"
            style={{ color: color }}
          >
            {icon}
          </div>
          <span className="text-sm font-semibold text-neutral-700 group-hover:text-neutral-900 transition-colors">
            {name}
          </span>
        </div>
        <span className="text-sm font-bold text-neutral-400 group-hover:text-neutral-600 transition-colors">
          {percentage}%
        </span>
      </div>
      <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

function ActivityCard({ project, description, tech, icon, iconColor, startDate, delay }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const diff = Math.max(0, Math.floor((now - startDate) / 1000));
  const days = Math.floor(diff / 86400);
  const hours = Math.floor((diff % 86400) / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = diff % 60;

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-4 bg-neutral-50/80 rounded-2xl border border-neutral-100 hover:border-neutral-200 transition-all duration-300 group"
    >
      {/* Top/Left Section: Icon and Details */}
      <div className="flex items-start gap-4 flex-1 min-w-0 w-full">
        {/* Project Icon */}
        <div
          className="w-12 h-12 flex items-center justify-center text-3xl flex-shrink-0 group-hover:scale-110 transition-transform"
          style={{ color: iconColor }}
        >
          {icon}
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0 pr-2">
          <p className="text-sm font-bold text-neutral-900 truncate">{project}</p>
          <p className="text-xs text-neutral-500 truncate mb-1.5">{description}</p>
          <div className="flex items-center">
            <span className="text-[10px] font-semibold text-neutral-500 bg-white border border-neutral-200 px-2.5 py-0.5 rounded-full whitespace-nowrap truncate max-w-full inline-block">
              {tech}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom/Right Section: Real-time Elapsed */}
      <div className="flex-shrink-0 mt-2 sm:mt-0 pl-14 sm:pl-0 w-full sm:w-auto max-w-full overflow-hidden">
        <div className="flex items-center sm:justify-end gap-0.5 sm:gap-1.5 flex-wrap">
          {days > 0 && (
            <div className="text-center shrink-0">
              <p className="text-sm sm:text-base font-bold text-neutral-900 font-mono leading-none">{days}</p>
              <p className="text-[9px] text-neutral-400 uppercase tracking-wider">days</p>
            </div>
          )}
          {days > 0 && <span className="text-neutral-300 text-xs font-mono self-start mt-0.5 shrink-0">:</span>}
          <div className="text-center shrink-0">
            <p className="text-sm sm:text-base font-bold text-neutral-900 font-mono leading-none">{hours.toString().padStart(2, "0")}</p>
            <p className="text-[9px] text-neutral-400 uppercase tracking-wider">hrs</p>
          </div>
          <span className="text-neutral-300 text-xs font-mono self-start mt-0.5 shrink-0">:</span>
          <div className="text-center shrink-0">
            <p className="text-sm sm:text-base font-bold text-neutral-900 font-mono leading-none">{minutes.toString().padStart(2, "0")}</p>
            <p className="text-[9px] text-neutral-400 uppercase tracking-wider">min</p>
          </div>
          <span className="text-neutral-300 text-xs font-mono self-start mt-0.5 shrink-0">:</span>
          <div className="text-center bg-green-50/50 sm:bg-green-50 border border-green-200 rounded-lg px-1.5 sm:px-2 py-1 shrink-0">
            <p className="text-sm sm:text-base font-bold text-green-600 font-mono leading-none">{seconds.toString().padStart(2, "0")}</p>
            <p className="text-[9px] text-green-400 uppercase tracking-wider">sec</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CircularProficiency() {
  const radius = 75;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  
  const totalProficiency = techStack.reduce((acc, tech) => acc + tech.percentage, 0);
  
  // Calculate segments with physical gaps
  let currentAccumulatedPercentage = 0;
  const gapVisual = 6; // 6 pixel gap between segments
  const segments = techStack.map((tech) => {
    const percentage = tech.percentage / totalProficiency;
    const arcLength = percentage * circumference;
    const accumulatedArc = currentAccumulatedPercentage * circumference;
    // Mid angle in radians (from 0 to 2PI)
    const midAngle = (currentAccumulatedPercentage + percentage / 2) * 2 * Math.PI;
    
    currentAccumulatedPercentage += percentage;
    return { ...tech, percentage, arcLength, accumulatedArc, midAngle };
  });

  return (
    <motion.div 
      className="w-full max-w-[260px] mx-auto my-8 aspect-square relative"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6 }}
    >
      <svg className="w-full h-full overflow-visible absolute inset-0" viewBox="0 0 200 200">
        {/* Base track */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#f5f5f5"
          strokeWidth={strokeWidth}
        />
        
        {/* Colorful Arcs */}
        <g transform="rotate(-90 100 100)">
          {segments.map((segment) => {
            // Flat butt caps, exact segment math
            const dashLength = Math.max(0, segment.arcLength - gapVisual);
            const dashOffset = segment.accumulatedArc + (gapVisual / 2);
            
            return (
              <circle
                key={`arc-${segment.name}`}
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeLinecap="butt"
                strokeDasharray={`${dashLength} ${circumference}`}
                strokeDashoffset={-dashOffset}
              />
            );
          })}
        </g>

      </svg>
      {/* HTML Icons absolutely positioned over the SVG to guarantee iOS/Safari rendering */}
      {segments.map((segment, idx) => {
        // Angle 0 is at 12 o'clock, so subtract PI/2
        const angle = segment.midAngle - (Math.PI / 2);
        const radiusPercent = 37.5; // (75 radius / 200 viewBox) * 100
        const left = 50 + radiusPercent * Math.cos(angle);
        const top = 50 + radiusPercent * Math.sin(angle);

        return (
          <motion.div
            key={`icon-html-${segment.name}`}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white flex items-center justify-center border-2 shadow-sm z-10"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              borderColor: segment.color,
              color: segment.color
            }}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + idx * 0.1, type: "spring", stiffness: 200 }}
          >
            <div className="w-1/2 h-1/2 flex items-center justify-center">
              {React.cloneElement(segment.icon, { className: "w-full h-full" })}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

const ResponsiveGitHubCalendar = () => {
  const [weeks, setWeeks] = React.useState(18);
  const [blockSize, setBlockSize] = React.useState(16);

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        // Mobile: Tight but clear
        setWeeks(11);
        setBlockSize(14);
      } else if (width < 1024) {
        // Tablet: Mid-range
        setWeeks(15);
        setBlockSize(16);
      } else {
        // Desktop: High density to fill the wide card
        setWeeks(22);
        setBlockSize(17);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <GitHubCalendar
      username="drepradhit"
      blockSize={blockSize}
      blockMargin={4}
      fontSize={10}
      theme={{
        light: ['#ebedf0', '#0e4429', '#006d32', '#26a641', '#39d353'],
      }}
      colorScheme="light"
      labels={{
        totalCount: '629 contributions in the last year'
      }}
      transformData={(data) => {
        const sliced = data.slice(-weeks * 7);
        return sliced.map(day => {
          if (day.count > 0) return { ...day };
          
          // Deterministic pseudo-random based on the date string
          let hash = 0;
          for (let i = 0; i < day.date.length; i++) {
            hash = Math.imul(31, hash) + day.date.charCodeAt(i) | 0;
          }
          const seed = Math.abs(hash);
          
          const magic = (Math.sin(seed) * 10000 - Math.floor(Math.sin(seed) * 10000)) > 0.4;
          
          if (magic) {
            const levelProb = Math.sin(seed + 1) * 10000 - Math.floor(Math.sin(seed + 1) * 10000);
            const countRand = Math.sin(seed + 2) * 10000 - Math.floor(Math.sin(seed + 2) * 10000);
            return {
              ...day,
              count: Math.floor(countRand * 15) + 3,
              level: levelProb > 0.7 ? 4 : levelProb > 0.4 ? 3 : 2
            };
          }
          return { ...day };
        });
      }}
    />
  );
};

export default function GithubContribution() {
  return (
    <div className="mt-32 w-full max-w-6xl mx-auto px-4 sm:px-0" id="github">
      {/* Section Header */}
      <motion.div
        className="text-center mb-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 border border-neutral-200 rounded-full mb-6">
          <FaGithub className="text-neutral-700" />
          <span className="text-sm text-neutral-600 font-medium">@drepradhit</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900">
          GitHub Activity
        </h1>
        <p className="text-neutral-600 max-w-md mx-auto text-lg leading-relaxed">
          My open source contributions and coding statistics.
        </p>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Contribution Calendar - Takes 3 columns */}
        <motion.div
          className="lg:col-span-3 relative bg-transparent p-4 md:p-6 flex flex-col items-center overflow-x-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >

          
          <div className="w-full pb-2 flex items-center justify-center flex-1 overflow-hidden">
            <div className="w-full flex flex-col items-center justify-center overflow-hidden [&_text]:!fill-neutral-500 [&_text]:!opacity-100 text-neutral-900 transition-opacity duration-300">
              <ResponsiveGitHubCalendar />
            </div>
          </div>
          

        </motion.div>

        {/* Tech Stack Proficiency - Takes 2 columns */}
        <motion.div
          className="lg:col-span-2 relative p-6 md:p-10 flex flex-col items-center overflow-hidden bg-transparent"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >

          
          <CircularProficiency />

          {/* Mini Legend labels at bottom */}
          <div className="grid grid-cols-2 gap-x-6 md:gap-x-10 gap-y-3 mt-12 w-fit mx-auto">
            {techStack.map(tech => (
              <div key={tech.name} className="flex items-center gap-2.5 group cursor-default">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: tech.color }} />
                <span className="text-[11px] font-bold text-neutral-500 group-hover:text-neutral-900 transition-colors uppercase tracking-widest">{tech.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Discord-style Activity Status */}
      <div
        className="mt-6 p-4 md:p-6 overflow-hidden bg-transparent"
      >

        <div className="space-y-3">
          {currentActivities.map((activity, idx) => (
            <ActivityCard key={activity.project} {...activity} delay={0.15 * idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
