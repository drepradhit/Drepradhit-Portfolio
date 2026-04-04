import React, { useState, useEffect } from 'react';
import { FiX, FiMessageSquare, FiMapPin, FiMap, FiLayout, FiStar } from 'react-icons/fi';

const ProjectModal = ({ isOpen, onClose, project }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white border border-neutral-200 rounded-3xl shadow-2xl w-full max-w-3xl transform transition-transform duration-300 ${isClosing ? 'animate-out' : 'animate-in'} max-h-[90vh] md:max-h-[80vh] overflow-y-auto`}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-50 text-neutral-600 hover:text-neutral-900 transition-colors p-2 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-sm"
          aria-label="Close project modal"
        >
          <FiX size={24} />
        </button>

        <div className="relative h-48 md:h-80 overflow-hidden rounded-t-3xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
        </div>

        <div className="p-8 md:p-10 -mt-20 relative z-10">
          <div className="space-y-4 mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 border border-neutral-200 rounded-full shadow-sm backdrop-blur-sm">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span className="text-xs text-neutral-600 uppercase tracking-wider font-medium">{project.category || 'Featured Work'}</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900">
              {project.title}
            </h2>
          </div>

          <p className="text-lg text-neutral-600 mb-6 italic">
            {project.subtitle}
          </p>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent mb-6"></div>

          <div className="space-y-6">
            {project.features && project.features.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-3">Key Features</h3>
                <ul className="space-y-2">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-3 text-neutral-700 leading-relaxed">
                      <span className="mt-2 min-w-[6px] h-[6px] bg-blue-500 rounded-full shrink-0"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {project.impact && (
              <div>
                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-2">Impact</h3>
                <p className="text-neutral-700 leading-relaxed italic bg-neutral-50 p-4 rounded-xl border border-neutral-100">
                  {project.impact}
                </p>
              </div>
            )}
          </div>

          <div className="mt-16 bg-[#1a1a1a] rounded-[2rem] py-14 md:py-20 px-4 md:px-6 text-white overflow-hidden relative shadow-inner">
            
            <div className="text-center mb-16 relative w-fit mx-auto">
              <h3 className="text-2xl md:text-[34px] font-bold relative z-10 tracking-wide" style={{ fontFamily: "'Inter', sans-serif" }}>
                Process for the project
              </h3>
              <svg className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)] text-white/90 pointer-events-none drop-shadow-md" viewBox="0 0 200 60" preserveAspectRatio="none">
                <path d="M 100,5 C 150,2 195,15 190,30 C 185,50 120,58 80,55 C 30,50 5,35 15,20 C 25,5 80,8 110,10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>

            <div className="hidden md:block relative w-full h-[350px] max-w-5xl mx-auto">
              
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 400" preserveAspectRatio="none">
                {/* 
                    Math logic coordinates: 
                    Amplitude toggles from Y=140 to Y=260. 
                    X gaps = 175. Node X = 150, 325, 500, 675, 850 
                */}
                <path 
                    d="M 50,300 
                       C 50,140 150,140 237.5,140
                       C 325,140 325,260 412.5,260
                       C 500,260 500,140 587.5,140
                       C 675,140 675,260 762.5,260
                       C 850,260 900,140 980,240" 
                    fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="10, 10" 
                />
                <circle cx="50" cy="300" r="4" fill="#fff" />
                <path d="M 972,232 L 980,240 L 972,248" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </svg>

              {[
                { title: "User Interview", icon: FiMessageSquare, color: "bg-blue-500", top: "35%", left: "15%", labelPos: "top" },
                { title: "Understanding Touchpoints", icon: FiMapPin, color: "bg-[#0ea5e9]", top: "65%", left: "32.5%", labelPos: "bottom" },
                { title: "Journey Mapping", icon: FiMap, color: "bg-[#22c55e]", top: "35%", left: "50%", labelPos: "top" },
                { title: "Wireframing", icon: FiLayout, color: "bg-[#84cc16]", top: "65%", left: "67.5%", labelPos: "bottom" },
                { title: "Final Design", icon: FiStar, color: "bg-[#eab308]", top: "35%", left: "85%", labelPos: "top" },
              ].map((step, idx) => (
                <div key={idx} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10" style={{ top: step.top, left: step.left }}>
                  
                  {/* Label Above */}
                  {step.labelPos === 'top' && (
                    <span className="absolute -top-10 text-white font-semibold text-[15px] whitespace-nowrap drop-shadow-md">
                      {step.title}
                    </span>
                  )}

                  {/* Mask & Dotted Ring Circle */}
                  <div className="w-[88px] h-[88px] bg-[#1a1a1a] rounded-full flex items-center justify-center relative group hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-1.5 rounded-full border-[1.5px] border-dashed border-white/90 animate-[spin_15s_linear_infinite]"></div>
                    <div className={`w-[60px] h-[60px] rounded-full ${step.color} flex items-center justify-center text-white relative z-10 shadow-[0_4px_15px_rgba(0,0,0,0.3)]`}>
                      <step.icon size={28} />
                    </div>
                  </div>

                  {/* Label Below */}
                  {step.labelPos === 'bottom' && (
                    <span className="absolute -bottom-14 max-w-[120px] text-center leading-tight text-white font-semibold text-[15px] drop-shadow-md">
                      {step.title}
                    </span>
                  )}

                  {/* Removed hand-drawn burst */}
                </div>
              ))}
            </div>

            <div className="md:hidden relative flex flex-col gap-10 pl-6 w-full max-w-sm mx-auto">
              {/* Vertical Dashed Line */}
              <div className="absolute left-[3.35rem] top-6 bottom-6 w-[2px] border-l-[2px] border-dashed border-white/60"></div>
              
              {[
                { title: "User Interview", icon: FiMessageSquare, color: "bg-blue-500" },
                { title: "Understanding Touchpoints", icon: FiMapPin, color: "bg-[#0ea5e9]" },
                { title: "Journey Mapping", icon: FiMap, color: "bg-[#22c55e]" },
                { title: "Wireframing", icon: FiLayout, color: "bg-[#84cc16]" },
                { title: "Final Design", icon: FiStar, color: "bg-[#eab308]" },
              ].map((step, idx) => (
                <div key={idx} className="relative flex items-center gap-6 z-10">
                  <div className="w-[70px] h-[70px] bg-[#1a1a1a] rounded-full flex items-center justify-center relative shrink-0">
                    <div className="absolute inset-1.5 rounded-full border-[1.5px] border-dashed border-white/90 animate-[spin_15s_linear_infinite]"></div>
                    <div className={`w-[46px] h-[46px] rounded-full ${step.color} flex items-center justify-center text-white relative z-10`}>
                      <step.icon size={22} />
                    </div>
                  </div>
                  <span className="text-white font-medium text-[16px] leading-tight flex-1">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        @keyframes scaleOut {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.95); opacity: 0; }
        }
        .animate-out {
          animation: scaleOut 0.3s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;
