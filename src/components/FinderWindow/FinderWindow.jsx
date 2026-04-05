import React from 'react';
import ProjectGrid from '../ProjectGrid/ProjectGrid';
import { listProyek } from '../../data';

const FinderWindow = () => {
  // Only show the first 6 projects on the home page grid
  // Nance and Type Paper (ids 7 and 8) will be available in the full Showcase Gallery
  const displayProjects = listProyek.slice(0, 6);

  return (
    <div className="w-full font-sans">
      <ProjectGrid projects={displayProjects} />
    </div>
  );
};

export default FinderWindow;
