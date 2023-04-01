import React, { useContext } from 'react';
import { TaskEntity } from 'types';
import { Label } from './Label/Label';
import { ProjectContext } from '../../../../../../Contexts/ProjectContext/ProjectContext';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';

import './Task.css';

export const Task = ({ id, labels, title }: TaskEntity) => {
  const { setShowModalEditTask } = useContext(ProjectContext);

  return (
    <div id={id} className="task">
      <div className="task-pen" onClick={() => setShowModalEditTask(id as string)}>
        <DriveFileRenameOutlineRoundedIcon />
      </div>
      <Label labels={labels} />
      <div className="task-main">
        <h3 className="task-title">{title}</h3>
      </div>
    </div>
  );
};
