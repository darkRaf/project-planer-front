import { v4 as uuid } from 'uuid';
import { CardResponse } from 'types';

export const createNewCard = (title: string): CardResponse => ({
  id: uuid(),
  title,
  tasksId: [],
  tasks: [],
});
