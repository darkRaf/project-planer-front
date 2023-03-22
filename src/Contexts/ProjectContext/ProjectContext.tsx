import { createContext } from 'react';
import { ProjectResponseData } from 'types';

export interface ProjectContext extends ProjectResponseData {
  addCard: () => void;
  setTask: (idCard: string, titleTask: string) => void;
}

export const defaultProject: ProjectContext = {
  userId: '',
  id: '',
  title: '',
  cardsId: [],
  cards: [],
  addCard: () => {},
  setTask: () => {},
};

export const ProjectContext = createContext(defaultProject);
