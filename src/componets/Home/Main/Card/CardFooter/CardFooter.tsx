import React, {
  ChangeEvent,
  KeyboardEvent,
  useState,
  useRef,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { checkClickOutSide } from '../../../../../utils/checkClickOutSide';
import { changeHeightTextArea } from '../../../../../utils/changeHeightTextArea';
import { UserContext } from '../../../../../Contexts/UserContext/UserContext';
import { ProjectContext } from '../../../../../Contexts/ProjectContext/ProjectContext';
import { MAX_TASK_LENGTH } from '../../../../../settings/settings';

import './CardFooter.css';

type CardFooterProps = {
  isTask: boolean;
  idCard: string;
  onClickNewCard?: Dispatch<SetStateAction<boolean>>;
};

export const CardFooter = ({ isTask, idCard, onClickNewCard }: CardFooterProps) => {
  const { setErrorHandle } = useContext(UserContext);
  const { setTask } = useContext(ProjectContext);

  const [showForm, setShowForm] = useState(false);
  const [textForm, setTextForm] = useState('');

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

  const addTask = () => {
    setTask(idCard, textForm);
    setTextForm('');
    setShowForm(false);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (value.length > MAX_TASK_LENGTH) {
      setErrorHandle(`Przekroczono ${MAX_TASK_LENGTH} znaków!`);
    } else {
      setTextForm(value);
      changeHeightTextArea(e);
    }
  };

  const onKeyDownHandle = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Escape') {
      setShowForm(false);
      setTextForm('');
      return;
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
    if (checkClickOutSide(e, areaRef)) return;

    if (textForm.length) {
      addTask();
      return;
    }

    setShowForm(false);
  };

  const onClickBtnAddCardHandle = () => {
    if (typeof onClickNewCard === 'undefined') return;

    onClickNewCard(true);
  };

  const btnAddTask = (
    <button type="button" className="card-btn-add" onClick={() => setShowForm(true)}>
      &#43; Dodaj zadanie
    </button>
  );

  const btnAddCard = (
    <button type="button" className="card-btn-add" onClick={onClickBtnAddCardHandle}>
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
