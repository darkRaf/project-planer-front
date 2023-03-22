import React from 'react';
import { TaskEntity } from 'types';
import { Label } from './Label/Label';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';

import './Task.css';

export const Task = ({ id, labels, title }: TaskEntity) => {
  const showModalEditTask = () => {
    console.log('show modal edit task');
  };

  return (
    <div id={id} className="task">
      <div className="task-pen" onClick={showModalEditTask}>
        <DriveFileRenameOutlineRoundedIcon />
      </div>
      <Label labels={labels} />
      <div className="task-main">
        <h3 className="task-title">{title}</h3>
      </div>
    </div>
  );
};
