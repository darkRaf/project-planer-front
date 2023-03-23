import { createContext } from 'react';
import { ProjectResponseData } from 'types';

export interface ProjectContext extends ProjectResponseData {
  setCard: () => void;
  setTitleCard: (idCard: string, titleTask: string) => void;
  setTask: (idCard: string, titleTask: string) => void;
}

export const defaultProject: ProjectContext = {
  userId: '',
  id: '',
  title: '',
  cardsId: [],
  cards: [],
  setCard: () => {},
  setTitleCard: () => {},
  setTask: () => {},
};

export const ProjectContext = createContext(defaultProject);
