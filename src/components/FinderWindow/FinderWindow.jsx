import React, { useState, useEffect } from 'react';
import ProjectGrid from '../ProjectGrid/ProjectGrid';
import { listProyek } from '../../data';

const FinderWindow = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Initial check properly on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Base list for home is first 6
  const homeProjects = listProyek.slice(0, 6);
  
  // Specific mobile filtering as requested
  const displayProjects = isMobile 
    ? homeProjects.filter(p => !["Damianos Production", "Certix", "Drevelopment"].includes(p.title))
    : homeProjects;

  return (
    <div className="w-full font-sans">
      <ProjectGrid projects={displayProjects} />
    </div>
  );
};

export default FinderWindow;
