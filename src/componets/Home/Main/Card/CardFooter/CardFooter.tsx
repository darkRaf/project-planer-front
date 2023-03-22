import React, { ChangeEvent, KeyboardEvent, useState, useRef, useEffect, useCallback, useContext } from 'react';
import { checkClickOutSide } from '../../../../../utils/checkClickOutSide';
import { changeHeightTextArea } from '../../../../../utils/changeHeightTextArea';
import { ProjectContext } from '../../../../../Contexts/ProjectContext/ProjectContext';
import { MAX_TASK_LENGTH } from '../../../../../settings/settings';

import './CardFooter.css';

type CardFooterProps = {
  isTask: boolean;
  idCard: string;
};

export const CardFooter = ({ isTask, idCard }: CardFooterProps) => {
  const { setTask } = useContext(ProjectContext);

  const [showForm, setShowForm] = useState(false);
  const [textForm, setTextForm] = useState('');
  const [error, setError] = useState(false);

  const areaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (showForm) {
      areaRef.current?.focus();
      document.addEventListener('mousedown', onClickHandle);
    }

    return () => {
      document.removeEventListener('mousedown', onClickHandle);
    };
  });

  const showError = useCallback((msg: string) => {
    console.log(msg);
  }, [error]);

  const addTask = () => {
    setTask(idCard, textForm)
    setTextForm('');
    setShowForm(false);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = e.target;
    if (value.length > MAX_TASK_LENGTH) {
      if (!error) {
        setError(true);
        showError(`Przekroczono ${MAX_TASK_LENGTH} znaków!`);
      }
    } else {
      setTextForm(value);
      changeHeightTextArea(e);
    }
  };

  const onKeyDownHandle = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Escape') {
      setShowForm(false);
      setTextForm('');
      return
    }

    if (['Enter', 'NumpadEnter'].includes(e.code)) {
      if (textForm.length) {
        addTask();
        return;
      }

      setShowForm(false);
    }
  };

  const onClickHandle = (e: globalThis.MouseEvent) => {
    if (!checkClickOutSide(e, areaRef)) {
      if (textForm.length) {
        addTask();
        return;
      }

      setShowForm(false);
    }
  };

  const btnAddTask = (
    <button type="button" className="card-btn-add" onClick={() => setShowForm(true)}>
      &#43; Dodaj zadanie
    </button>
  );

  const btnAddCard = (
    <button type="button" className="card-btn-add" onClick={() => {}}>
      &#43; Dodaj karte
    </button>
  );

  return (
    <>
      {showForm ? (
        <div className="card-footer">
          <textarea
            ref={areaRef}
            className="textarea-add-task"
            placeholder="Wprowadź zadanie."
            value={textForm}
            onChange={onChangeHandler}
            onKeyDown={onKeyDownHandle}
            rows={3}
          />
        </div>
      ) : (
        <div className="card-footer">{isTask ? btnAddTask : btnAddCard}</div>
      )}
    </>
  );
};
