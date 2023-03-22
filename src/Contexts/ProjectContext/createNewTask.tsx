import { v4 as uuid } from 'uuid';
import { TaskEntity } from 'types';

export const createNewTask = (title: string): TaskEntity => {
  return {
    id: uuid(),
    title: title,
    labels: [],
    body: { checkList: [], deadline: '', description: '' },
    addedAt: '',
  };
};
