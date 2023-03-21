import { createContext } from 'react';
import { ProjectResponseData } from 'types';

export interface ProjectContext extends ProjectResponseData {
  onAddTask: (id: string | null) => void,
  onAddCard: (id: string | null) => void,
};

export const defaultProject:ProjectContext = {
  userId: '',
  id: '',
  title: '',
  cardsId: [],
  cards: [],
  onAddCard: () => {},
  onAddTask: () => {},
};

export const ProjectContext = createContext(defaultProject);
