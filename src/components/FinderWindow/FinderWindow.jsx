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

  // Pass all projects — ProjectGrid handles category filtering
  const displayProjects = isMobile 
    ? listProyek.filter(p => !["Damianos Production", "Nance", "Drevelopment"].includes(p.title))
    : listProyek;

  return (
    <div className="w-full font-sans">
      <ProjectGrid projects={displayProjects} />
    </div>
  );
};

export default FinderWindow;
