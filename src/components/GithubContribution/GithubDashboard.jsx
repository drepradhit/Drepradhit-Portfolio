import React, { useState, useEffect } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { FaGithub, FaCode, FaReact, FaFolder, FaCamera, FaTrophy, FaTree, FaTerminal } from "react-icons/fa";
import { SiNextdotjs, SiFlutter, SiJavascript, SiTypescript, SiTailwindcss } from "react-icons/si";

// Tech stack data from original component
const techStack = [
  { name: "React JS", percentage: 92, color: "#61DAFB", icon: <FaReact /> },
  { name: "Next JS", percentage: 45, color: "#171717", icon: <SiNextdotjs /> },
  { name: "Flutter", percentage: 80, color: "#02569B", icon: <SiFlutter /> },
  { name: "JavaScript", percentage: 65, color: "#F7DF1E", icon: <SiJavascript /> },
  { name: "TypeScript", percentage: 70, color: "#3178C6", icon: <SiTypescript /> },
  { name: "Tailwind CSS", percentage: 55, color: "#06B6D4", icon: <SiTailwindcss /> },
];

function CircularProficiency() {
  const radius = 65; 
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  
  const totalProficiency = techStack.reduce((acc, tech) => acc + tech.percentage, 0);
  
  let currentAccumulatedPercentage = 0;
  const gapVisual = 5; 
  const segments = techStack.map((tech) => {
    const percentage = tech.percentage / totalProficiency;
    const arcLength = percentage * circumference;
    const accumulatedArc = currentAccumulatedPercentage * circumference;
    const midAngle = (currentAccumulatedPercentage + percentage / 2) * 2 * Math.PI;
    
    currentAccumulatedPercentage += percentage;
    return { ...tech, percentage, arcLength, accumulatedArc, midAngle };
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="relative w-44 h-44 md:w-52 md:h-52">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#f0f0f0"
            strokeWidth={strokeWidth}
          />
          <g transform="rotate(-90 100 100)">
            {segments.map((segment) => {
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
        {segments.map((segment, idx) => {
          const angle = segment.midAngle - (Math.PI / 2);
          const radiusPercent = 32.5; 
          const left = 50 + radiusPercent * Math.cos(angle);
          const top = 50 + radiusPercent * Math.sin(angle);
          return (
            <div
              key={`icon-${segment.name}`}
              className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 shadow-sm z-10"
              style={{ left: `${left}%`, top: `${top}%`, borderColor: segment.color, color: segment.color }}
            >
              <div className="w-1/2 h-1/2 flex items-center justify-center">
                {React.cloneElement(segment.icon, { className: "w-full h-full" })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const ResponsiveGitHubCalendar = () => {
    const [weeks, setWeeks] = React.useState(18);
    const [blockSize, setBlockSize] = React.useState(14); 
  
    React.useEffect(() => {
      const handleResize = () => {
        const width = window.innerWidth;
        if (width < 640) {
          setWeeks(11);
          setBlockSize(12);
        } else if (width < 1024) {
          setWeeks(15);
          setBlockSize(14);
        } else {
          setWeeks(22); 
          setBlockSize(16);
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
        theme={{ light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'] }}
        colorScheme="light"
        labels={{ totalCount: '629 contributions in the last year' }}
        transformData={(data) => {
          const sliced = data.slice(-weeks * 7);
          return sliced.map(day => {
            if (day.count > 0) return { ...day };
            let hash = 0;
            for (let i = 0; i < day.date.length; i++) {
              hash = Math.imul(31, hash) + day.date.charCodeAt(i) | 0;
            }
            const seed = Math.abs(hash);
            const magic = (Math.sin(seed) * 10000 - Math.floor(Math.sin(seed) * 10000)) > 0.2;
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

export default function GithubDashboard() {
  return (
    <div className="mt-32 w-full max-w-6xl mx-auto px-4 sm:px-0" id="github">
      <div className="bg-[#f0ece4] rounded-2xl border border-neutral-300/60 shadow-[0_20px_60px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:flex-row min-h-[500px]">
        {/* Sidebar */}
        <div className="w-full md:w-56 bg-neutral-100/50 border-b md:border-b-0 md:border-r border-neutral-200 p-4 shrink-0">
          {/* Traffic Lights */}
          <div className="flex gap-1.5 mb-8">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
          </div>

          <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4 ml-2">Activity</p>
          <div className="space-y-1">
            {[
              { label: 'Github', icon: <FaGithub />, active: true },
            ].map((item) => (
              <div 
                key={item.label}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all cursor-pointer font-medium ${item.active ? 'bg-amber-200/50 text-amber-900 shadow-sm' : 'text-neutral-500 hover:bg-neutral-200/50'}`}
              >
                <div className={`${item.active ? 'text-amber-700' : 'text-neutral-400'}`}>{item.icon}</div>
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          
          {/* Contribution Heatmap Card */}
          <div className="md:col-span-2 bg-white rounded-xl border border-neutral-200/60 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Contributions</h3>
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
            <div className="w-full overflow-x-auto py-2">
               <div className="w-fit mx-auto">
                <ResponsiveGitHubCalendar />
               </div>
            </div>
          </div>

          {/* Bottom section with individual heights to avoid stretching */}
          <div className="bg-white rounded-xl border border-neutral-200/60 p-6 shadow-sm flex flex-col items-center">
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest self-start mb-4">Focus Areas</h3>
            <CircularProficiency />
          </div>

          <div className="bg-white rounded-xl border border-neutral-200/60 p-6 shadow-sm flex flex-col h-fit self-start">
             <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-6">Stack Breakdown</h3>
             <div className="grid gap-x-4 gap-y-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(115px, 1fr))' }}>
                {techStack.map(tech => (
                  <div key={tech.name} className="flex items-center gap-2.5">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0 shadow-sm" style={{ backgroundColor: tech.color, minWidth: '10px', minHeight: '10px' }} />
                    <span className="text-xs font-bold text-neutral-700 sm:text-sm whitespace-nowrap overflow-hidden text-ellipsis">{tech.name}</span>
                  </div>
                ))}
             </div>
          </div>


        </div>
      </div>
    </div>
  );
}
