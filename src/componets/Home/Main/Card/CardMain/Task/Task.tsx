import React, { CSSProperties, KeyboardEvent, useEffect, useRef, useState, ChangeEvent } from 'react';
import { TaskEntity } from 'types';
import { Label } from './Label/Label';

import { checkClickOutSide } from '../../../../../../utils/checkClickOutSide';
import { changeHeightTextArea } from '../../../../../../utils/changeHeightTextArea';

import './Task.css';

const penUrl = './images/svg/pen.svg';

export const Task = ({ labels, title, body }: TaskEntity) => {
  const [newTitle, setNewTitle] = useState(title);
  const [changeTitle, setChangeTitle] = useState(false);

  const areaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    changeTitle && areaRef.current?.focus();

    document.addEventListener('mousedown', mousedownHandle);

    return () => {
      document.removeEventListener('mousedown', mousedownHandle);
    };
  });

  const styles: CSSProperties = {
    display: 'none',
  };

  const mousedownHandle = (e: MouseEvent) => {
    setChangeTitle(checkClickOutSide(e, areaRef));
    // TODO: Zapisz zmianę w DB.
  };

  const onKeyUpHandle = (e: KeyboardEvent): void => {
    e.key === 'Enter' && setChangeTitle(false);
    // TODO: Zapisz zmianę w DB.
  };

  const onChangeHandle = (e: ChangeEvent<HTMLTextAreaElement>) => changeHeightTextArea(e, setNewTitle);

  return (
    <div className="task" onClick={() => setChangeTitle(true)}>
      <div className="task-pen">
        <img src={penUrl} alt="Pen" />
      </div>
      <Label labels={labels} />
      <div className="task-main">
        <textarea
          ref={areaRef}
          className="task-input"
          value={newTitle}
          onChange={onChangeHandle}
          onKeyUp={(e) => onKeyUpHandle(e)}
          style={!changeTitle ? styles : undefined}
        />
        <h3 className="task-title" style={changeTitle ? styles : undefined}>
          {newTitle}
        </h3>
      </div>
    </div>
  );
};
