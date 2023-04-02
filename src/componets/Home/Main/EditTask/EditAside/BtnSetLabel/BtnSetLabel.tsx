import React, { CSSProperties } from 'react';
import { Priorities, TaskEntity } from 'types';

type BtnSetLabelProps = {
  labelName: string;
  value: Priorities;
  delayNum: number;
  taskData: TaskEntity;
  changeBody: (key: keyof TaskEntity, val: string) => void;
};

export const BtnSetLabel = ({ labelName, value, delayNum, taskData, changeBody }: BtnSetLabelProps) => {
  const delay = (num: number) => ({ '--delay': num } as CSSProperties);

  return (
    <li className="edit-task-btn" style={delay(delayNum)}>
      <label>
        <input
          type="radio"
          name="label"
          value={value}
          checked={value === taskData.labels}
          onChange={(e) => changeBody('labels', e.target.value)}
        />
        {labelName}
      </label>
    </li>
  );
};
