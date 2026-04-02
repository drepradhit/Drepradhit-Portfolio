import React from 'react';
import ProjectGrid from '../ProjectGrid/ProjectGrid';
import { listProyek } from '../../data';

const FinderWindow = () => {
  return (
    <div className="w-full font-sans">
      <ProjectGrid projects={listProyek.slice(0, 6)} />
    </div>
  );
};

export default FinderWindow;
