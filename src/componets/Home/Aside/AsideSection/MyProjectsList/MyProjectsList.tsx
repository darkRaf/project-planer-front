import React, { useContext } from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { ModalTypes, ProjectContext } from '../../../../../Contexts/ProjectContext/ProjectContext';
import { ProjectItem } from './ProjectItem/ProjectItem';

import './MyProjectsList.css';

export const MyProjectsList = () => {
  const { myProjectsList, setShowModal } = useContext(ProjectContext);

  return (
    <>
      {myProjectsList.map((table) => (
        <ProjectItem key={table.id} id={table.id} title={table.title} background={table.background} />
      ))}
      <div className={`aside-row`} onClick={() =>  setShowModal(ModalTypes.NewProject)}>
        <div className="aside-ico">
          <AddRoundedIcon sx={{ fontSize: 30 }} />
        </div>
        <span className="aside-text w-400">Dodaj nowy projekt</span>
      </div>
    </>
  );
};
