import { createContext, Dispatch } from 'react';
import { DraggableLocation } from 'react-beautiful-dnd';
import { AllProjectsResponse, ProjectEntityResponse, ProjectResponseData, TaskEntity } from 'types';

export enum ModalTypes {
  None,
  UserMenu,
  MenuSettings,
  NewProject,
  EditTask,
}

export interface ProjectContext extends ProjectResponseData {
  setNewProject: (title: string, background: string) => Promise<void>;
  setCard: (titleCard: string, id: string) => void;
  changeCardTitle: (idCard: string, titleTask: string) => void;
  setTask: (idCard: string, titleTask: string) => void;
  changeTaskBody: (taskObj: TaskEntity) => Promise<void>;
  IdEditTask: string;
  setIdEditTask: Dispatch<React.SetStateAction<string>>;
  showMenuNewProject: boolean;
  setShowMenuNewProject: Dispatch<React.SetStateAction<boolean>>;
  deleteTask: (idCart: string, idTask: string) => Promise<void>;
  getAllProjects: () => Promise<void>;
  myProjectsList: AllProjectsResponse[];
  getProject: (id: string) => Promise<void>;
  newPosition: (source: DraggableLocation, destination: DraggableLocation, draggableId: string) => Promise<void>;
  showModal: ModalTypes;
  setShowModal: Dispatch<React.SetStateAction<ModalTypes>>;
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
  changeCardTitle: () => {},
  setTask: () => {},
  changeTaskBody: async () => {},
  IdEditTask: '',
  setIdEditTask: () => {},
  showMenuNewProject: false,
  setShowMenuNewProject: () => {},
  deleteTask: async () => {},
  getAllProjects: async () => {},
  getProject: async () => {},
  newPosition: async () => {},
  showModal: ModalTypes.None,
  setShowModal: () => {},
};

export const ProjectContext = createContext(defaultProject);
