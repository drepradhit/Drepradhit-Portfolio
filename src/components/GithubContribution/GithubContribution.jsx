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
    <motion.div
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-4 bg-neutral-50/80 rounded-2xl border border-neutral-100 hover:border-neutral-200 transition-all duration-300 group"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      {/* Top/Left Section: Icon and Details */}
      <div className="flex items-start gap-4 flex-1 min-w-0 w-full">
        {/* Project Icon */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 shadow-sm border border-neutral-200 bg-white group-hover:scale-105 transition-transform"
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
      <div className="flex-shrink-0 mt-2 sm:mt-0 pl-[64px] sm:pl-0 w-full sm:w-auto">
        <div className="flex items-center sm:justify-end gap-1.5">
          {days > 0 && (
            <div className="text-center">
              <p className="text-sm sm:text-base font-bold text-neutral-900 font-mono leading-none">{days}</p>
              <p className="text-[9px] text-neutral-400 uppercase tracking-wider">days</p>
            </div>
          )}
          {days > 0 && <span className="text-neutral-300 text-xs font-mono self-start mt-0.5">:</span>}
          <div className="text-center">
            <p className="text-sm sm:text-base font-bold text-neutral-900 font-mono leading-none">{hours.toString().padStart(2, "0")}</p>
            <p className="text-[9px] text-neutral-400 uppercase tracking-wider">hrs</p>
          </div>
          <span className="text-neutral-300 text-xs font-mono self-start mt-0.5">:</span>
          <div className="text-center">
            <p className="text-sm sm:text-base font-bold text-neutral-900 font-mono leading-none">{minutes.toString().padStart(2, "0")}</p>
            <p className="text-[9px] text-neutral-400 uppercase tracking-wider">min</p>
          </div>
          <span className="text-neutral-300 text-xs font-mono self-start mt-0.5">:</span>
          <div className="text-center bg-green-50/50 sm:bg-green-50 border border-green-200 rounded-lg px-2 py-1">
            <p className="text-sm sm:text-base font-bold text-green-600 font-mono leading-none">{seconds.toString().padStart(2, "0")}</p>
            <p className="text-[9px] text-green-400 uppercase tracking-wider">sec</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CircularProficiency() {
  const radius = 75;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius;
  
  const totalProficiency = techStack.reduce((acc, tech) => acc + tech.percentage, 0);
  
  // Calculate segments with gaps
  let currentAccumulatedPercentage = 0;
  const segments = techStack.map((tech) => {
    const percentage = tech.percentage / totalProficiency;
    const arcLength = percentage * circumference;
    const accumulatedArc = currentAccumulatedPercentage * circumference;
    // Mid angle in radians (from 0 to 2PI)
    const midAngle = (currentAccumulatedPercentage + percentage / 2) * 2 * Math.PI;
    
    currentAccumulatedPercentage += percentage;
    return { ...tech, percentage, arcLength, accumulatedArc, midAngle };
  });

  const gapVisual = 8; // The physical visual gap in units

  return (
    <div className="relative w-full aspect-square max-w-[240px] mx-auto flex items-center justify-center my-8">
      {/* Base track */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 transform overflow-visible" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="#f5f5f5"
          strokeWidth={strokeWidth}
        />
        {segments.map((segment, idx) => {
          // Math to calculate actual visible line segment length
          // dashLength + strokeWidth = segment.arcLength - gapVisual
          const dashLength = Math.max(0, segment.arcLength - gapVisual - strokeWidth);
          // Math to calculate start offset
          const dashOffset = segment.accumulatedArc + (gapVisual / 2) + (strokeWidth / 2);
          
          return (
            <motion.circle
              key={`arc-${segment.name}`}
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={`${dashLength} ${circumference}`}
              strokeDashoffset={-dashOffset}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + idx * 0.1, duration: 0.8 }}
            />
          );
        })}

        {segments.map((segment, idx) => {
          // Map to absolute SVG coordinates
          const x = 100 + radius * Math.cos(segment.midAngle);
          const y = 100 + radius * Math.sin(segment.midAngle);

          return (
            <foreignObject
              key={`icon-${segment.name}`}
              x={x - 16}
              y={y - 16}
              width="32"
              height="32"
              className="overflow-visible"
            >
              <motion.div
                className="w-full h-full rounded-full bg-white border-2 shadow-sm flex items-center justify-center rotate-90"
                style={{
                  borderColor: segment.color,
                  color: segment.color
                }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + idx * 0.1, type: "spring", stiffness: 200 }}
              >
                <div className="text-sm">
                  {segment.icon}
                </div>
              </motion.div>
            </foreignObject>
          );
        })}
      </svg>
    </div>
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
        dark: ['#1d2128', '#0e4429', '#006d32', '#26a641', '#39d353'],
      }}
      colorScheme="dark"
      transformData={(data) => {
        const sliced = data.slice(-weeks * 7);
        return sliced.map(day => {
          if (day.count > 0) return day;
          // 60% chance for a busier look, but with varying intensities
          const magic = Math.random() > 0.4;
          if (magic) {
            const levelProb = Math.random();
            return {
              ...day,
              count: Math.floor(Math.random() * 15) + 3,
              level: levelProb > 0.7 ? 4 : levelProb > 0.4 ? 3 : 2
            };
          }
          return day;
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
        className="text-center mb-14"
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
          className="lg:col-span-3 relative bg-neutral-900 border border-neutral-800 p-6 md:p-10 rounded-[2.5rem] shadow-2xl flex flex-col"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-white flex items-center gap-3">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
              Contribution Graph
            </h3>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-3 h-3 rounded-sm bg-green-500 opacity-20 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>
          </div>
          
          <div className="w-full pb-2 flex items-center justify-center flex-1 overflow-hidden">
            <div className="w-full flex justify-center overflow-hidden">
              <ResponsiveGitHubCalendar />
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between text-[11px] text-neutral-500 font-bold uppercase tracking-widest">
            <span>Less</span>
            <div className="flex gap-1.5 grayscale opacity-80">
              <div className="w-3 h-3 bg-[#1d2128] rounded-sm" />
              <div className="w-3 h-3 bg-[#0e4429] rounded-sm" />
              <div className="w-3 h-3 bg-[#006d32] rounded-sm" />
              <div className="w-3 h-3 bg-[#26a641] rounded-sm" />
              <div className="w-3 h-3 bg-[#39d353] rounded-sm shadow-[0_0_8px_rgba(57,211,83,0.4)]" />
            </div>
            <span>More</span>
          </div>
        </motion.div>

        {/* Tech Stack Proficiency - Takes 2 columns */}
        <motion.div
          className="lg:col-span-2 relative bg-white border border-neutral-200 p-6 md:p-10 rounded-[2.5rem] shadow-sm flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <h3 className="text-xl font-bold text-neutral-900 mb-6 flex items-center gap-3 self-start w-full">
            <FaCode className="text-neutral-500" />
            Tech Proficiency
          </h3>
          
          <CircularProficiency />

          {/* Mini Legend labels at bottom */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-8 w-full">
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
      <motion.div
        className="mt-6 bg-white border border-neutral-200 p-6 md:p-8 rounded-3xl shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="relative">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block animate-pulse" />
          </div>
          <h3 className="text-lg font-bold text-neutral-900">Currently Working On</h3>
        </div>
        <div className="space-y-3">
          {currentActivities.map((activity, idx) => (
            <ActivityCard key={activity.project} {...activity} delay={0.15 * idx} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
