import { ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { defaultProject, ModalTypes, ProjectContext } from './ProjectContext';
import {
  AllProjectsResponse,
  CardResponse,
  ProjectEntityResponse,
  TaskEntity,
  UserSettingsEntity,
  UserSettingsRequest,
} from 'types';
import produce from 'immer';
import { fetchApi } from '../../utils/featchAPI';
import { UserContext } from '../UserContext/UserContext';
import { DraggableLocation } from 'react-beautiful-dnd';

type ProjectProviderProps = {
  children: ReactNode;
};

export const ProjectProvider = ({ children }: ProjectProviderProps) => {
  const { updateUserSettings, settings, setMessage } = useContext(UserContext);

  const [project, setProject] = useState(defaultProject);
  const [isReady, setIsReady] = useState(true);
  const [IdEditTask, setIdEditTask] = useState('');
  const [showMenuNewProject, setShowMenuNewProject] = useState(false);
  const [showModal, setShowModal] = useState(ModalTypes.None);

  useEffect(() => {
    if (isReady) {
      getAllProjects();
      getProject(settings.activeIdProject);
      setIsReady(false);
    }
  }, []);

  // Create new Project
  const setNewProject = useCallback(async (title: string, background: string) => {
    try {
      const settingsRes = await fetchApi.post<UserSettingsEntity>('/project', { title, background });

      if (!settingsRes) return;

      updateUserSettings(settingsRes);
      await getAllProjects();
      await getProject(settingsRes.activeIdProject);
    } catch (err) {
      setMessage('error', err);
    }
  }, []);

  // Delete Project
  const deleteProject = useCallback(async (projectId: string) => {
    if (!projectId) return;

    console.log('usuń projekt', projectId);
    const result = await fetchApi.delete<{ status: string }>(`/project/${projectId}`);

    if (!result) return;

    setMessage('success', 'Projekt usunięty.');
    getAllProjects();
    getProject(settings.activeIdProject);
  }, []);

  // Create new Card
  const setCard = useCallback(async (title: string, projectId: string) => {
    try {
      const cartRes = await fetchApi.post<CardResponse>('/card', { title, projectId });
      console.log('setCard', cartRes);

      if (!cartRes) return;
      setMessage('success', 'Nowa karta zapisana.');

      setProject(
        produce((draft) => {
          draft.cards.push({ ...cartRes, tasks: [] });
        }),
      );
    } catch (err) {
      setMessage('error', err);
    }
  }, []);

  // Create new Task
  const setTask = useCallback(async (cardId: string, title: string) => {
    try {
      const taskRes = await fetchApi.post<TaskEntity>('/task', { title, cardId });
      console.log('setTask', taskRes);

      if (!taskRes) return;
      setMessage('success', 'Nowe zadanie zapisane.');

      setProject(
        produce((draft) => {
          const card = draft.cards.find((card) => card.id === cardId);
          card?.tasks.push(taskRes);
          taskRes.id && card?.tasksId.push(taskRes.id);
        }),
      );
    } catch (err) {
      setMessage('error', err);
    }
  }, []);

  // Change title of Card
  const changeCardTitle = useCallback(async (idCard: string, title: string) => {
    try {
      const res = await fetchApi.put<{ status: string }>(`/card/${idCard}`, { title });
      console.log('changeCardTitle:', res);

      if (!res) return;
      setMessage('success', 'Nazwa karty zmieniona.');

      setProject(
        produce((draft) => {
          const card = draft.cards.find((card) => card.id === idCard);
          if (card) card.title = title;
        }),
      );
    } catch (err) {
      setMessage('error', err);
    }
  }, []);

  // Change body of Task
  const changeTaskBody = useCallback(async (taskObj: TaskEntity) => {
    try {
      if (!taskObj.id) return;

      const res = await fetchApi.put<{ status: string }>(`/task/${taskObj.id}`, taskObj);

      if (!res) return;
      setMessage('success', 'Nowe dane zapisane.');
      console.log('changeTaskBody:', res);

      setProject(
        produce((draft) => {
          let serchedIdCard = '';

          for (const card of draft.cards) {
            if (!taskObj.id) return;
            if (card.tasksId.includes(taskObj.id)) serchedIdCard = card.id;
          }

          const card = draft.cards.find((card) => card.id === serchedIdCard);

          if (card) {
            let task = card.tasks.find((task) => task.id === taskObj.id);
            if (task) {
              task.id = taskObj.id;
              task.title = taskObj.title;
              task.labels = taskObj.labels;
              task.body = taskObj.body;
              task.addedAt = taskObj.addedAt;
            }
          }
        }),
      );

      setIdEditTask('');
      setShowModal(ModalTypes.None);
    } catch (err) {
      setMessage('error', err);
    }
  }, []);

  // Delete Task
  const deleteTask = useCallback(async (idCart: string, idTask: string) => {
    try {
      const res = await fetchApi.delete<{ status: string }>(`/task/${idCart}/${idTask}`);
      console.log('changeTaskBody:', res);

      if (res) setMessage('success', 'Zadanie usunięto.');

      await getProject(settings.activeIdProject);

      setIdEditTask('');
      setShowModal(ModalTypes.None);
    } catch (err) {
      setMessage('error', err);
    }
  }, []);

  // Get list Projects
  const getAllProjects = useCallback(async () => {
    try {
      const myProjectsList = await fetchApi.get<AllProjectsResponse[]>('/project');
      console.log('2.1 getAllProjects:', myProjectsList);

      myProjectsList && setProject((prev) => ({ ...prev, myProjectsList }));
    } catch (err) {
      setMessage('error', err);
    }
  }, []);

  // Get one Project
  const getProject = useCallback(async (id: string) => {
    try {
      if (!id) throw new Error('Nie pobrano projektu.');

      const projectRes = await fetchApi.get<ProjectEntityResponse>(`/project/${id}`);
      console.log('3.1 getProject:', projectRes);

      projectRes &&
        setProject(
          produce((draft) => {
            draft.title = projectRes.title;
            draft.background = projectRes.background;
            draft.id = projectRes.id;
            draft.cardsId = projectRes.cardsId;
            draft.cards = projectRes.cards;
          }),
        );

      const settings: UserSettingsRequest = {
        settings: {
          activeIdProject: id,
        },
      };

      await fetchApi.put(`/user`, settings);
      const settingsRes = await fetchApi.get<UserSettingsEntity>(`/user`);

      settingsRes && updateUserSettings(settingsRes);
    } catch (err) {
      setMessage('error', err);
    }
  }, []);

  // Move the Task to another Card or change the position of the Task
  const newPosition = async (source: DraggableLocation, destination: DraggableLocation, draggableId: string) => {
    let newStartTaskList;
    let newFinisTaskList;

    setProject(
      produce((draft) => {
        const startCard = draft.cards.find((card) => card.id === source.droppableId);
        const finishCard = draft.cards.find((card) => card.id === destination.droppableId);

        const task = startCard?.tasks.find((task) => task.id === draggableId);
        const newTask = JSON.parse(JSON.stringify(task));
        if (startCard === finishCard) {
          startCard?.tasks.splice(source.index, 1);
          startCard?.tasks.splice(destination.index, 0, newTask);

          startCard?.tasksId.splice(source.index, 1);
          startCard?.tasksId.splice(destination.index, 0, draggableId);
          newStartTaskList = JSON.parse(JSON.stringify(startCard?.tasksId));
        } else {
          startCard?.tasks.splice(source.index, 1);
          startCard?.tasksId.splice(source.index, 1);
          newStartTaskList = JSON.parse(JSON.stringify(startCard?.tasksId));

          finishCard?.tasks.splice(destination.index, 0, newTask);
          finishCard?.tasksId.splice(destination.index, 0, draggableId);
          newFinisTaskList = JSON.parse(JSON.stringify(finishCard?.tasksId));
        }
      }),
    );

    try {
      if (newStartTaskList) {
        await fetchApi.put(`/card/${source.droppableId}`, { tasksId: newStartTaskList });
      }

      if (newFinisTaskList) {
        await fetchApi.put(`/card/${destination.droppableId}`, { tasksId: newFinisTaskList });
      }
    } catch (err) {
      setMessage('error', err);
    }
  };

  const value = {
    ...project,
    setNewProject,
    deleteProject,
    setCard,
    changeCardTitle,
    setTask,
    changeTaskBody,
    IdEditTask,
    setIdEditTask,
    showMenuNewProject,
    setShowMenuNewProject,
    deleteTask,
    getAllProjects,
    getProject,
    newPosition,
    showModal,
    setShowModal,
  };

  return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};
