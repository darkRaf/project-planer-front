import React, { useContext} from 'react';
import { ProjectContext } from '../../../../../Contexts/ProjectContext/ProjectContext';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import './EditHeader.css';

type EditHeaderProps = {
  title: string;
};

export const EditHeader = ({ title }: EditHeaderProps) => {
  const { setShowModalEditTask } = useContext(ProjectContext);

  return (
    <div className="edit-task-header">
      <h2 className="edit-title">{title}</h2>
      <div className="edit-task-clouse-box" onClick={() => setShowModalEditTask('')}>
        <CloseRoundedIcon />
      </div>
    </div>
  );
};
