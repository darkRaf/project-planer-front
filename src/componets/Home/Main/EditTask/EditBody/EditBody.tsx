import React, { ChangeEvent, useCallback, useContext, useState } from 'react';
import { UserContext } from '../../../../../Contexts/UserContext/UserContext';
// import { ProjectContext } from '../../../../../Contexts/ProjectContext/ProjectContext';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import { TaskBodyEntity, TaskEntity } from 'types';
import { MAX_TASK_DESCRIPTION_LENGTH } from '../../../../../settings/settings';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

import './EditBody.css';

type EditBodyProps = {
  taskData: TaskEntity;
  changeData: (key: keyof TaskEntity, val: string) => void;
  changeBody: (key: keyof TaskBodyEntity, val: string) => void;
  sendData: () => void;
};

export const EditBody = ({ taskData, changeData, changeBody, sendData }: EditBodyProps) => {
  const { setMessage } = useContext(UserContext);

  const [description, setDescription] = useState(taskData.body.description);

  const onChangeHandle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    if (value.length > MAX_TASK_DESCRIPTION_LENGTH) {
      setMessage('warning', `Przekroczono ${MAX_TASK_DESCRIPTION_LENGTH} znaków!`);
      return;
    }

    setDescription(value);
    changeBody('description', value);
  };

  return (
    <div className="edit-task-body">
      <div className="edit-task-section">
        <div className="section-header">
          <BookRoundedIcon />
          <h4 className="section-title">Priorytet</h4>
          <div className={`task-label label-${taskData.labels}`}></div>
        </div>
      </div>

      <div className="edit-task-section">
        <div className="section-header">
          <ArticleRoundedIcon />
          <h4 className="section-title">Opis</h4>
        </div>
        <div className="section-body">
          <textarea
            className="task-description"
            rows={6}
            placeholder="Wprowadź opis zadania..."
            value={description}
            onChange={onChangeHandle}
          />
        </div>
        <div className="description-count">
          {description.length}/{MAX_TASK_DESCRIPTION_LENGTH}
        </div>
      </div>
      <div className="edit-task-section for-right">
        <button className="edit-task-save" onClick={sendData}>
          <SaveRoundedIcon />
          Zapisz
        </button>
      </div>
    </div>
  );
};
