import React, { useContext } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { ProjectContext } from '../../../../../Contexts/ProjectContext/ProjectContext';

import './MyProjectsList.css';
import { ProjectItem } from './ProjectItem/ProjectItem';

export const MyProjectsList = () => {
  const { myProjectsList, setShowMenuNewProject } = useContext(ProjectContext);

  return (
    <>
      {myProjectsList.map((table) => (
        <ProjectItem key={table.id} id={table.id} title={table.title} background={table.background} />
      ))}
      <div className={`aside-row`} onClick={() => setShowMenuNewProject(true)}>
        <div className="aside-ico">
          <AddRoundedIcon sx={{ fontSize: 30 }} />
        </div>
        <span className="aside-text w-400">Dodaj nowy projekt</span>
      </div>
    </>
  );
};
