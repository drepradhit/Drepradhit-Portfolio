import React, { useState, useEffect } from 'react';
import { FiX, FiGithub } from 'react-icons/fi';

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

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">About the Project</h3>
            <p className="text-neutral-700 text-base md:text-lg leading-relaxed">
              {project.fullDescription}
            </p>
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
