import React, { CSSProperties, KeyboardEvent, useEffect, useRef, useState, ChangeEvent } from 'react';
import { checkClickOutSide } from '../../../../../utils/checkClickOutSide';
import { changeHeightTextArea } from '../../../../../utils/changeHeightTextArea';

import './CardHeader.css';

type Props = {
  title: string;
};

export const CardHeader = (props: Props) => {
  const [newTitle, setNewTitle] = useState(props.title);
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
    <div className="card-header">
      <textarea
        ref={areaRef}
        className="card-input"
        value={newTitle}
        onChange={onChangeHandle}
        onKeyUp={(e) => onKeyUpHandle(e)}
        style={!changeTitle ? styles : undefined}
      />
      <h2 className="card-title" onClick={() => setChangeTitle(true)} style={changeTitle ? styles : undefined}>
        {newTitle}
      </h2>

      <div className="card-header-dots">...</div>
    </div>
  );
};
