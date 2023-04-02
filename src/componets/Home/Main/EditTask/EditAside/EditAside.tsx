import React, { CSSProperties, useEffect, useState } from 'react';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { Priorities, TaskEntity } from 'types';

import './EditAside.css';
import { BtnSetLabel } from './BtnSetLabel/BtnSetLabel';

type EditButtonEntity = {
  name: string;
  value: Priorities;
};

const editTaskButtonsList: EditButtonEntity[] = [
  {
    name: 'Wysoki',
    value: Priorities.High,
  },
  {
    name: 'Średni',
    value: Priorities.Medium,
  },
  {
    name: 'Niski',
    value: Priorities.Low,
  },
  {
    name: 'Nie zdefiniowany',
    value: Priorities.Undefined,
  },
];

type EditAsideProps = {
  taskData: TaskEntity;
  changeBody: (key: keyof TaskEntity, val: string) => void;
};

export const EditAside = ({ taskData, changeBody }: EditAsideProps) => {
  const [showBtn, setShowBtn] = useState(false);

  const delay = (num: number) => ({ '--delay': num } as CSSProperties);

  useEffect(() => {
    setShowBtn(true);
  }, []);

  // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   changeBody('labels', e.target.value)
  // }

  return (
    <div className="edit-task-aside">
      <div className={`edit-buttons ${showBtn && 'visible-btn'}`}>
        <ul>
          <li className="name-section" style={delay(1)}>
            <KeyboardArrowDownRoundedIcon />
            <span>Priorytety</span>
          </li>
          {editTaskButtonsList.map((btn, index) => (
            <BtnSetLabel
              key={btn.name}
              labelName={btn.name}
              value={btn.value}
              delayNum={index + 1}
              taskData={taskData}
              changeBody={changeBody}
            />
          ))}
          <li className="edit-task-btn delete-task" style={delay(editTaskButtonsList.length + 2)}>
            <DeleteForeverRoundedIcon />
            Usuń
          </li>
        </ul>
      </div>
    </div>
  );
};
