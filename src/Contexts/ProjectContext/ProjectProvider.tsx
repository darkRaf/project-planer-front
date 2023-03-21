import { ReactNode, useCallback, useState } from 'react';
import { defaultProject, ProjectContext } from './ProjectContext';
import { ProjectResponseData } from 'types';
import produce from 'immer';
import { createNewTask } from './createNewTask';
import { fetchApi } from '../../utils/featchAPI';

import data from '../../data/tablesData.json';
import { createNewCard } from './createNewCard';

type ProjectProviderProps = {
  children: ReactNode;
};

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const [project, setProject] = useState(defaultProject);
  const [getProject, setgetProject] = useState(true);

  const tableData = data as ProjectResponseData;

  const onAddCard = useCallback((id: string | null) => {
    setProject(
      produce((draft) => {
        draft.cards.push(createNewCard());
      }),
    );
  }, []);

  const onAddTask = useCallback((id: string | null) => {
    setProject(
      produce((draft) => {
        const card = draft.cards.find((card) => card.id === id);
        card?.tasks.push(createNewTask());
      }),
    );
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
    onAddTask,
    onAddCard,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
