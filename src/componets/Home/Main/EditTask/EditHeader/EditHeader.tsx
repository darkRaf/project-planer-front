import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../../../Contexts/UserContext/UserContext';
import { ProjectContext, ModalTypes } from '../../../../../Contexts/ProjectContext/ProjectContext';
import { MAX_TASK_LENGTH } from '../../../../../settings/settings';
import { changeHeightTextArea } from '../../../../../utils/changeHeightTextArea';
import { checkClickOutSide } from '../../../../../utils/checkClickOutSide';
import { TaskEntity } from 'types';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import './EditHeader.css';

type EditHeaderProps = {
  title: string;
  changeData: (key: keyof TaskEntity, val: string) => void;
};

export const EditHeader = ({ title, changeData }: EditHeaderProps) => {
  const { setMessage } = useContext(UserContext);
  const { setShowModal } = useContext(ProjectContext);

  const [titleTask, setTitleTask] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isSelect, setIsSelect] = useState(true);

  const areaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (showForm) {
      areaRef.current?.focus();
      isSelect && areaRef.current?.select();
      document.addEventListener('mousedown', mousedownHandle);
      setIsSelect(false);
    }

    return () => {
      document.removeEventListener('mousedown', mousedownHandle);
    };
  });

  useEffect(() => {
    setTitleTask(title);
  }, [title]);

  const addTitleTask = () => {
    changeData('title', titleTask);
    setShowForm(false);
    setIsSelect(true);
  };

  const onChangeHandle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    if (value.length > MAX_TASK_LENGTH) {
      setMessage('warning', `Przekroczono ${MAX_TASK_LENGTH} znaków!`);
      return;
    }

    setTitleTask(value);
    changeHeightTextArea(e);
  };

  const mousedownHandle = (e: MouseEvent) => {
    if (checkClickOutSide(e, areaRef)) return;

    if (titleTask.length) {
      addTitleTask();
      return;
    }

    setShowForm(false);
  };

  return (
    <div className="edit-task-header" onClick={() => setShowForm(true)}>
      <div className="edit-task-clouse-box" onClick={() => setShowModal(ModalTypes.None)}>
        <CloseRoundedIcon />
      </div>
      {showForm ? (
        <textarea ref={areaRef} className="card-input" value={titleTask} onChange={onChangeHandle} />
      ) : (
        <h2 className="edit-title">{titleTask}</h2>
      )}
    </div>
  );
};
