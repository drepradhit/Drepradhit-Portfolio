import React from 'react';
import ProjectGrid from '../ProjectGrid/ProjectGrid';
import { listProyek } from '../../data';

const FinderWindow = () => {
  const [displayProjects, setDisplayProjects] = React.useState(listProyek.slice(0, 6));

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        // Filter specifically for the requested 3 projects on mobile
        const mobileProjects = listProyek.filter(p => 
          ["Whoof and Meow", "Rupiah Flow", "ThinkWays"].includes(p.title)
        );
        setDisplayProjects(mobileProjects);
      } else {
        setDisplayProjects(listProyek.slice(0, 6));
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full font-sans">
      <ProjectGrid projects={displayProjects} />
    </div>
  );
};

export default FinderWindow;
