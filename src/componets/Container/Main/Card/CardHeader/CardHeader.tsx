import React, {
  CSSProperties,
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import { checkClickOutSide } from '../../../../../utils/checkClickOutSide';
import './CardHeader.css';

type Props = {
  title: string;
};

export const CardHeader = (props: Props) => {
  const [newTitle, setNewTitle] = useState(props.title);
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
    <div className='card-header'>
      <input
        ref={inputRef}
        className='card-input'
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        onKeyUp={(e) => onKeyUpHandle(e)}
        style={!changeTitle ? styles : undefined}
      />
      <h2
        className='card-title'
        onClick={() => setChangeTitle(true)}
        style={changeTitle ? styles : undefined}
      >
        {newTitle}
      </h2>

      <div className='card-header-dots'>...</div>
    </div>
  );
};
