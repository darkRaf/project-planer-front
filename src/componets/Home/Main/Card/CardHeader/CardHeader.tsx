import React, { KeyboardEvent, useEffect, useRef, useState, ChangeEvent, useCallback } from 'react';
import { checkClickOutSide } from '../../../../../utils/checkClickOutSide';
import { changeHeightTextArea } from '../../../../../utils/changeHeightTextArea';
import { MAX_CARD_TITLE_LENGTH } from '../../../../../settings/settings';

import './CardHeader.css';

type Props = {
  title: string;
};

export const CardHeader = (props: Props) => {
  const [titleCard, setTitleCard] = useState(props.title);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(false);

  const areaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (showForm) {
      areaRef.current?.focus();
      document.addEventListener('mousedown', mousedownHandle);
    }

    return () => {
      document.removeEventListener('mousedown', mousedownHandle);
    };
  });

  const showError = useCallback((msg: string) => {
    console.log(msg);
  }, [error]);

  const addTitleCard = () => {
    // setTask(idCard, textForm)
    setShowForm(false);
  };

  const onChangeHandle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = e.target;
    if (value.length > MAX_CARD_TITLE_LENGTH) {
      if (!error) {
        setError(true);
        showError(`Przekroczono ${MAX_CARD_TITLE_LENGTH} znaków!`);
      }
    } else {
      setTitleCard(value);
      changeHeightTextArea(e);
    }
  };

  const mousedownHandle = (e: MouseEvent) => {
    if (!checkClickOutSide(e, areaRef)) {
      if (titleCard.length) {
        addTitleCard();
        return;
      }

      setShowForm(false);
    }
  };

  const onKeyDownHandle = (e: KeyboardEvent): void => {
    if (e.code === 'Escape') {
      setShowForm(false);
      setTitleCard('');
      return;
    }

    if (['Enter', 'NumpadEnter'].includes(e.code)) {
      if (titleCard.length) {
        addTitleCard();
        return;
      }

      setShowForm(false);
    }
  };

  return (
    <div className="card-header" onClick={() => setShowForm(true)}>
      {showForm ? (
        <textarea
          ref={areaRef}
          className="card-input"
          value={titleCard}
          onChange={onChangeHandle}
          onKeyDown={onKeyDownHandle}
        />
      ) : (
        <h2 className="card-title">{titleCard}</h2>
      )}
      <div className="card-header-dots">...</div>
    </div>
  );
};
