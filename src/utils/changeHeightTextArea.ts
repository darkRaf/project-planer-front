import { Dispatch, SetStateAction, ChangeEvent } from 'react';

export const changeHeightTextArea = (
  e: ChangeEvent<HTMLTextAreaElement>,
  clb: Dispatch<SetStateAction<string>>
) => {
  const area = e.target;

  clb(area.value);

  area.style.height = 'auto';
  area.style.height = `${area.scrollHeight}px`;
}