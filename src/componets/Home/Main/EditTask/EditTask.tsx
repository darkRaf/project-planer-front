import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../Contexts/UserContext/UserContext';
import { ProjectContext } from '../../../../Contexts/ProjectContext/ProjectContext';
import { TaskEntity } from '../../../../../../project-planer-back/types/taskEntyti';
import { EditHeader } from './EditHeader/EditHeader';
import { EditBody } from './EditBody/EditBody';
import { EditAside } from './EditAside/EditAside';
import { Loader } from '../../../Commpare/Loader/Loader';
import { fetchApi } from '../../../../utils/featchAPI';

import './EditTask.css';

export const EditTask = () => {
  const { setErrorHandle } = useContext(UserContext);
  const { showModalEditTask, setShowModalEditTask } = useContext(ProjectContext);

  const [showContainer, setShowContainer] = useState(false);
  const [loader, setLoader] = useState(true);
  const [taskData, setTaskData] = useState<TaskEntity>({
    id: '',
    title: '',
    labels: [],
    body: { description: '', checkList: [], deadline: '' },
    addedAt: '',
  });

  useEffect(() => {
    setShowContainer(true);
    getTask();
  }, []);

  const getTask = async () => {
    const task = await fetchApi.get<TaskEntity>(`/task/${showModalEditTask}`);

    if (!task) {
      setErrorHandle('Bład pobierania danych');
      setShowModalEditTask('');
      return;
    }

    setTaskData(task);
    setLoader(false);
  };

  return (
    <>
      <div className="edit-task-bg"></div>
      <div className={`edit-task-container ${showContainer && 'show-edit-task'}`}>
        <EditHeader title={taskData.title} />
        <div className={`edit-task-main ${loader ? 'main-loader' : ''}`}>
          {loader ? (
            <Loader />
          ) : (
            <>
              <EditBody body={taskData.body} />
              <EditAside />
            </>
          )}
        </div>
      </div>
    </>
  );
};
