import React, {
  CSSProperties,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TaskEntity } from 'src/types/taskEntyti';
import { Label } from './Label/Label';

import { checkClickOutSide } from '../../../../../../utils/checkClickOutSide';
import './Task.css';

const penUrl = './images/svg/pen.svg';

export const Task = ({ labels, title, body }: TaskEntity) => {
  const [newTitle, setNewTitle] = useState(title);
  const [changeTitle, setChangeTitle] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const mousedownHandle = (e: MouseEvent) => {
    setChangeTitle(checkClickOutSide(e, inputRef));
    // TODO: Zapisz zmianę w DB.
  };

  const onKeyUpHandle = (e: KeyboardEvent): void => {
    e.key === 'Enter' && setChangeTitle(false);
    // TODO: Zapisz zmianę w DB.
  };

  useEffect(() => {
    changeTitle && inputRef.current?.focus();

    document.addEventListener('mousedown', mousedownHandle);

    return () => {
      document.removeEventListener('mousedown', mousedownHandle);
    };
  });

  const styles: CSSProperties = {
    display: 'none',
  };

  return (
    <div className='task' onClick={() => setChangeTitle(true)}>
      <div className='task-pen'>
        <img src={penUrl} alt='Pen' />
      </div>
      <Label labels={labels} />
      <div className='task-main'>
        <input
          ref={inputRef}
          className='task-input'
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyUp={(e) => onKeyUpHandle(e)}
          style={!changeTitle ? styles : undefined}
        />
        <h3 className='task-title' style={changeTitle ? styles : undefined}>
          {newTitle}
        </h3>
      </div>
    </div>
  );
};
