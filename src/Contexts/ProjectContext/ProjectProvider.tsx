import { ReactNode, useCallback, useState } from 'react';
import { defaultProject, ProjectContext } from './ProjectContext';
import { ProjectResponseData } from 'types';
import produce from 'immer';
import { createNewTask } from './createNewTask';
import { createNewCard } from './createNewCard';
import { fetchApi } from '../../utils/featchAPI';

import data from '../../data/tablesData.json';

type ProjectProviderProps = {
  children: ReactNode;
};

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [project, setProject] = useState(defaultProject);
  const [getProject, setgetProject] = useState(true);

  const tableData = data as ProjectResponseData;

  const setCard = useCallback((titleCard: string) => {
    setProject(
      produce((draft) => {
        draft.cards.push(createNewCard(titleCard));
      }),
    );
  }, []);

  const setTask = useCallback((idCard: string, titleTask: string) => {
    setProject(
      produce((draft) => {
        const card = draft.cards.find((card) => card.id === idCard);
        card?.tasks.push(createNewTask(titleTask));
      }),
    );

    //TODO: zapisac nowy task w DB

  }, []);

  const setNewTitleCard = useCallback((idCard: string, titleCard: string) => {
    setProject(
      produce((draft) => {
        const card = draft.cards.find((card) => card.id === idCard);
        if (card) card.title = titleCard;
      }),
    );

    //TODO: zapisac nowy tytuł karty w DB

  }, []);

  const getProjectFromDB = () => {
    console.log('data from db');
    setProject((prev) => ({ ...prev, ...tableData }));
  };

  if (getProject) {
    getProjectFromDB();
    setgetProject(false);
  }

  const value = {
    ...project,
    setCard,
    setNewTitleCard,
    setTask,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
