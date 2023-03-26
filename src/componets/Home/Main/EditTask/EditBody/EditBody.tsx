import React, { ChangeEvent, useCallback, useState } from 'react';
import { ProjectContext } from '../../../../../Contexts/ProjectContext/ProjectContext';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import { TaskBodyEntity } from 'types';
import { MAX_TASK_DESCRIPTION_LENGTH } from '../../../../../settings/settings';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';

import './EditBody.css';

type EditBodyProps = {
  body: TaskBodyEntity;
};

export const EditBody = ({ body }: EditBodyProps) => {
  const [description, setDescription] = useState(body.description);
  const [error, setError] = useState(false);

  const showError = useCallback(
    (msg: string) => {
      console.log(msg);
    },
    [error],
  );

  const onChangeHandle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    if (value.length > MAX_TASK_DESCRIPTION_LENGTH) {
      if (!error) {
        setError(true);
        showError(`Przekroczono ${MAX_TASK_DESCRIPTION_LENGTH} znaków!`);
      }
    } else {
      setDescription(value);
    }
  };

  return (
    <div className="edit-task-body">
      <div className="edit-task-section">
        <div className="section-header">
          <BookRoundedIcon />
          <h4 className="section-title">Priorytet</h4>
          <div className="task-label">Wysoki</div>
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
        <div className="description-count">{description.length}/{MAX_TASK_DESCRIPTION_LENGTH}</div>
      </div>
      <div className="edit-task-section for-right">
        <button className='edit-task-save'><SaveRoundedIcon />Zapisz</button>
      </div>
    </div>
  );
};
