import React from "react";
import { motion } from "framer-motion";
import { MoveUpRight, Code2, Layers, Cpu, Globe } from "lucide-react";

const roadmapData = [
  {
    year: "2022",
    label: "01 / FOUNDATION",
    title: "The Architecture of Web",
    desc: "Implementing semantic structures and core data logic. Establishing the foundational protocols of modern web development.",
    code: "const project = { \n  base: 'HTML5',\n  logic: 'Vanilla JS',\n  style: 'CSS3'\n};",
    icon: <Globe className="w-4 h-4" />
  },
  {
    year: "2023",
    label: "02 / STRATEGY",
    title: "Visual Systems & UX",
    desc: "Academic immersion in user psychology and design systems at BINUS University. Bridging the gap between design and code.",
    code: "module.exports = { \n  theme: 'Design Systems',\n  focus: 'User Experience',\n  tools: ['Figma', 'UI']\n};",
    icon: <Layers className="w-4 h-4" />
  },
  {
    year: "2024",
    label: "03 / INTERACTION",
    title: "Engineered Experiences",
    desc: "Mastering the physics of motion and reactive ecosystems. Building high-performance, animated digital products.",
    code: "import { motion } from 'framer-motion';\n\nexport const Experience = () => (\n  <Interactive content={highEnd} />\n);",
    icon: <Code2 className="w-4 h-4" />
  },
  {
    year: "2025",
    label: "04 / ENGINEERING",
    title: "Next-Gen Scalability",
    desc: "Scaling full-stack capabilities with Next.js 15 and AI integration. Focusing on design engineering at scale.",
    code: "async function deploy() {\n  await syncWithNextJS15();\n  await initializeAI();\n  return 'SUCCESS';\n}",
    icon: <Cpu className="w-4 h-4" />
  }
];

export default function LearningRoadmap() {
  return (
    <div className="w-full max-w-7xl mx-auto py-32 px-6 font-sans select-none">
      <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200 pb-16 gap-10">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-neutral-900" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">Technical Log</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-bold tracking-tighter text-neutral-900 leading-[0.85]">
            Evolution <br /> <span className="text-neutral-300">of Practice</span>
          </h2>
        </div>
        <div className="max-w-xs">
          <p className="text-neutral-500 text-sm leading-relaxed mb-6 font-medium">
            Documenting the transition from static layout building to advanced design engineering and system architecture.
          </p>
          <div className="flex items-center gap-4">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded-full border-2 border-[#fdfbf7] bg-neutral-100" />)}
             </div>
             <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Continuous Sync</span>
          </div>
        </div>
      </div>

      <div className="space-y-px bg-neutral-200 border-y border-neutral-200">
        {roadmapData.map((item, index) => (
          <RoadmapRow key={index} item={item} index={index} />
        ))}
      </div>

      <div className="mt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-4">
         <div className="flex items-center gap-8">
            <div className="flex flex-col">
               <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-1">Status</span>
               <span className="text-xs font-bold text-neutral-900 uppercase">Operational v3.0</span>
            </div>
            <div className="w-px h-8 bg-neutral-200" />
            <div className="flex flex-col">
               <span className="text-[9px] font-black text-neutral-400 uppercase tracking-widest mb-1">Stack</span>
               <span className="text-xs font-bold text-neutral-900 uppercase">Design Engineering</span>
            </div>
         </div>
         <div className="text-[11px] font-medium text-neutral-400 max-w-[200px] md:text-right">
            Curated selection of professional breakthroughs 2022–2025.
         </div>
      </div>
    </div>
  );
}

function RoadmapRow({ item, index }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-[#fdfbf7] hover:bg-white transition-colors duration-500 p-8 md:p-16 flex flex-col md:grid md:grid-cols-12 gap-12 items-start relative overflow-hidden"
    >
      <div className="absolute top-1/2 -translate-y-1/2 right-20 text-[20vw] font-black text-neutral-100/30 leading-none pointer-events-none group-hover:text-black/[0.02] transition-colors duration-700 italic select-none">
        {item.year}
      </div>

      <div className="md:col-span-5 relative z-10">
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[11px] font-black tracking-[0.2em] text-neutral-900 py-1.5 px-3 bg-neutral-100 rounded-lg">
            {item.year}
          </span>
          <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">
            {item.label}
          </span>
        </div>
        <h3 className="text-4xl md:text-5xl font-bold tracking-tighter text-neutral-900 mb-6 group-hover:translate-x-2 transition-transform duration-500">
          {item.title}
        </h3>
        <p className="text-neutral-500 text-lg leading-relaxed max-w-md font-medium">
          {item.desc}
        </p>
      </div>

      <div className="md:col-span-1 hidden md:flex items-center justify-center">
         <div className="w-[1px] h-32 bg-neutral-200" />
      </div>

      <div className="md:col-span-6 w-full relative z-10">
        <div className="bg-white border border-neutral-200 rounded-3xl p-8 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500">
           <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-50">
              <div className="flex items-center gap-2">
                 <div className="p-2 bg-neutral-900 rounded-xl text-white">
                    {item.icon}
                 </div>
                 <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Protocol.log</span>
              </div>
              <MoveUpRight className="w-4 h-4 text-neutral-200 group-hover:text-neutral-900" />
           </div>
           
           <div className="font-mono text-sm leading-relaxed">
              <pre className="text-neutral-800 bg-neutral-50/50 p-4 rounded-xl border border-neutral-100 overflow-x-auto scrollbar-hide">
                 <code>
                   {item.code.split('\n').map((line, i) => (
                     <div key={i} className="flex gap-4">
                        <span className="text-neutral-300 w-4 text-right inline-block text-[10px]">{i+1}</span>
                        <span className="opacity-80">{line}</span>
                     </div>
                   ))}
                 </code>
              </pre>
           </div>
        </div>
      </div>
    </motion.div>
  );
}
