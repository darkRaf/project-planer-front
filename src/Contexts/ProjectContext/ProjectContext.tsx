import { createContext, Dispatch } from 'react';
import { ProjectResponseData } from 'types';

export interface ProjectContext extends ProjectResponseData {
  setCard: (titleCard: string) => void;
  setNewTitleCard: (idCard: string, titleTask: string) => void;
  setTask: (idCard: string, titleTask: string) => void;
  showModalEditTask: string;
  setShowModalEditTask: Dispatch<React.SetStateAction<string>>;
}

export const defaultProject: ProjectContext = {
  userId: '',
  id: '',
  title: '',
  cardsId: [],
  cards: [],
  setCard: () => {},
  setNewTitleCard: () => {},
  setTask: () => {},
  showModalEditTask: '',
  setShowModalEditTask: () => {},
};

export const ProjectContext = createContext(defaultProject);
