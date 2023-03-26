import React, { CSSProperties, useEffect, useState } from 'react';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import './EditAside.css';

export const EditAside = () => {
  const [showBtn, setShowBtn] = useState(false);

  const delay = (num: number) => ({ '--delay': num } as CSSProperties);

  useEffect(() => {
    setShowBtn(true);
  }, []);

  return (
    <div className="edit-task-aside">
      <div className={`edit-buttons ${showBtn && 'visible-btn'}`}>
        <ul>
          <li className="name-section" style={delay(1)}>
            <KeyboardArrowDownRoundedIcon />
            <span>Priorytety</span>
          </li>
          <li className="edit-task-btn" style={delay(2)}>
            <label>
              <input type="radio" value="dddd" name="label" />
              Wysoki
            </label>
          </li>
          <li className="edit-task-btn" style={delay(3)}>
            <label>
              <input type="radio" value="" name="label" />
              Średni
            </label>
          </li>
          <li className="edit-task-btn" style={delay(4)}>
            <label>
              <input type="radio" value="" name="label" />
              Niski
            </label>
          </li>
          <li className="edit-task-btn" style={delay(5)}>
            <label>
              <input type="radio" value="" name="label" />
              Standardowy
            </label>
          </li>
          <li className="edit-task-btn delete-task" style={delay(6)}>
            <DeleteForeverRoundedIcon />
            Usuń
          </li>
        </ul>
      </div>
    </div>
  );
};
