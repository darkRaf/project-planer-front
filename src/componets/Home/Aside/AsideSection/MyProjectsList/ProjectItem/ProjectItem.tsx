import React, { useContext } from 'react';
import { UserContext } from '../../../../../../Contexts/UserContext/UserContext';
import { ProjectContext } from '../../../../../../Contexts/ProjectContext/ProjectContext';

import './ProjectItem.css';

type ProjectItemProps = {
  id: string;
  title: string;
  background: string;
};

export const ProjectItem = ({ id, title, background }: ProjectItemProps) => {
  const {
    settings: { activeIdProject },
  } = useContext(UserContext);
  const { getProject } = useContext(ProjectContext);

  const active = id === activeIdProject ? 'active' : '';

  return (
    <div className={`aside-row ${active}`} onClick={() => getProject(id)}>
      <div className="aside-ico">
        <img src={`./images/backgrounds/${background}`} alt="" className="aside-img" />
      </div>
      <span className="aside-text w-400">{title}</span>
    </div>
  );
};
