import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../Contexts/UserContext/UserContext';
import { ProjectContext } from '../../../../Contexts/ProjectContext/ProjectContext';
import { TaskEntity, TaskBodyEntity, Priorities } from 'types';
import { EditHeader } from './EditHeader/EditHeader';
import { EditBody } from './EditBody/EditBody';
import { EditAside } from './EditAside/EditAside';
import { Loader } from '../../../Commpare/Loader/Loader';
import { fetchApi } from '../../../../utils/featchAPI';

import './EditTask.css';

export const EditTask = () => {
  const { setMessage } = useContext(UserContext);
  const { IdEditTask, setIdEditTask, changeTaskBody } = useContext(ProjectContext);

  const [showContainer, setShowContainer] = useState(false);
  const [loader, setLoader] = useState(true);
  const [taskData, setTaskData] = useState<TaskEntity>({
    id: '',
    title: '',
    labels: Priorities.Undefined,
    body: { description: '', checkList: [], deadline: '' },
    addedAt: '',
  });

  useEffect(() => {
    setShowContainer(true);
    getTask();
  }, []);

  const getTask = async () => {
    const task = await fetchApi.get<TaskEntity>(`/task/${IdEditTask}`);

    if (!task) {
      setMessage('error', 'Błąd pobierania danych.');
      setIdEditTask('');
      return;
    }

    setTaskData(task);
    setLoader(false);
  };

  const changeTaskData = (key: keyof TaskEntity, val: string) => {
    setTaskData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const changeTaskBodyHandle = (key: keyof TaskBodyEntity, val: string) => {
    setTaskData((prev) => ({
      ...prev,
      body: {
        ...prev.body,
        [key]: val,
      },
    }));
  };

  const saveChangedToTask = () => {
    changeTaskBody(taskData);
  };

  return (
    <>
      <div className="edit-task-bg"></div>
      <div className={`edit-task-container ${showContainer && 'show-edit-task'}`}>
        <EditHeader title={taskData.title} changeData={changeTaskData} />
        <div className={`edit-task-main ${loader ? 'main-loader' : ''}`}>
          {loader ? (
            <Loader />
          ) : (
            <>
              <EditBody
                taskData={taskData}
                changeData={changeTaskData}
                changeBody={changeTaskBodyHandle}
                sendData={saveChangedToTask}
              />
              <EditAside taskData={taskData} changeBody={changeTaskData} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
