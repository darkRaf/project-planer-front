import { v4 as uuid } from 'uuid';
import { TaskEntity } from 'types';

export const createNewTask = (): TaskEntity => {
  return {
    id: uuid(),
    title: '',
    labels: [],
    body: { checkList: [], deadline: '', description: '' },
    addedAt: '',
  };
};
