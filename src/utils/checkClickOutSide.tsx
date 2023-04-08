import { RefObject } from 'react';

export const checkClickOutSide = (e: MouseEvent, ref: RefObject<HTMLElement>): boolean => {
  const { target } = e;

  return target instanceof HTMLElement && !!ref.current?.contains(target);
};
