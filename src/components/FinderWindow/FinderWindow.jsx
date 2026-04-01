import React from 'react';
import ProjectGrid from '../ProjectGrid/ProjectGrid';
import { listProyek } from '../../data';

const FinderWindow = () => {
  return (
    <div className="w-full font-sans">
      <ProjectGrid projects={listProyek} />
    </div>
  );
};

export default FinderWindow;
