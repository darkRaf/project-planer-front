import { v4 as uuid } from 'uuid';
import { CardResponse } from 'types';

export const createNewCard = (): CardResponse => {
  return {
    id: uuid(),
    title: '',
    tasksId: [],
    tasks: [],
  };
};
