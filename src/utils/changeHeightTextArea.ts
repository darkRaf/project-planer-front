import { ChangeEvent } from 'react';

export const changeHeightTextArea = (
  e: ChangeEvent<HTMLTextAreaElement>,
) => {
  const area = e.target;

  area.style.height = 'auto';
  area.style.height = `${area.scrollHeight}px`;
}