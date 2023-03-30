import { createContext, Dispatch } from 'react';
import { AllProjectsResponse, ProjectEntityResponse, ProjectResponseData } from 'types';

export interface ProjectContext extends ProjectResponseData {
  setNewProject: (title: string, background: string) => Promise<void>;
  setCard: (titleCard: string) => void;
  setNewTitleCard: (idCard: string, titleTask: string) => void;
  setTask: (idCard: string, titleTask: string) => void;
  showModalEditTask: string;
  setShowModalEditTask: Dispatch<React.SetStateAction<string>>;
  showMenuNewProject: boolean;
  setShowMenuNewProject: Dispatch<React.SetStateAction<boolean>>;
  getAllProjects: () => Promise<void>;
  myProjectsList: AllProjectsResponse[];
  getProject: (id: string) => Promise<void>;
}

export const defaultProject: ProjectContext = {
  myProjectsList: [],
  userId: '',
  id: '',
  title: '',
  cardsId: [],
  cards: [],
  background: '',
  setNewProject: async () => {},
  setCard: () => {},
  setNewTitleCard: () => {},
  setTask: () => {},
  showModalEditTask: '',
  setShowModalEditTask: () => {},
  showMenuNewProject: false,
  setShowMenuNewProject: () => {},
  getAllProjects: async () => {},
  getProject: async () => {},
};

export const ProjectContext = createContext(defaultProject);
