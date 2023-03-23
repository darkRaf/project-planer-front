import React, {
  KeyboardEvent,
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  useCallback,
  useContext,
  Dispatch,
} from 'react';
import { checkClickOutSide } from '../../../../../utils/checkClickOutSide';
import { changeHeightTextArea } from '../../../../../utils/changeHeightTextArea';
import { MAX_CARD_TITLE_LENGTH } from '../../../../../settings/settings';
import { ProjectContext } from '../../../../../Contexts/ProjectContext/ProjectContext';

import './CardHeader.css';

type Props = {
  idCard: string;
  title: string;
  newCard?: boolean;
  addCard?: (title: string) => void;
  notAddCard?: Dispatch<React.SetStateAction<boolean>>;
};

export const CardHeader = ({ idCard, title, newCard = false, addCard, notAddCard }: Props) => {
  const { setNewTitleCard } = useContext(ProjectContext);

  const [titleCard, setTitleCard] = useState(title);
  const [prevTitleCard, setPrevTitleCard] = useState(title);
  const [showForm, setShowForm] = useState(newCard);
  const [isSelect, setIsSelect] = useState(true);
  const [error, setError] = useState(false);

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

  const showError = useCallback(
    (msg: string) => {
      console.log(msg);
    },
    [error],
  );

  const addTitleCard = () => {
    if (showForm) {
      setPrevTitleCard(titleCard);
      if (typeof addCard !== 'undefined') addCard(titleCard);
    }

    setNewTitleCard(idCard, titleCard);
    setShowForm(false);
    setIsSelect(true);
  };

  const onChangeHandle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

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
    if (checkClickOutSide(e, areaRef)) return;

    if (titleCard.length) {
      addTitleCard();
      setShowForm(false);
      setIsSelect(true);
      return;
    }

    setShowForm(false);
    if (typeof notAddCard === 'undefined') return;
    notAddCard(false);
  };

  const onKeyDownHandle = (e: KeyboardEvent): void => {
    if (e.code === 'Escape') {
      setShowForm(false);
      setIsSelect(true);
      setTitleCard(prevTitleCard);

      if (typeof notAddCard === 'undefined') return;
      notAddCard(false);
      return;
    }

    if (['Enter', 'NumpadEnter'].includes(e.code)) {
      if (titleCard.length) {
        addTitleCard();
      } else {
        if (typeof notAddCard === 'undefined') return;
        notAddCard(false);
      }
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
