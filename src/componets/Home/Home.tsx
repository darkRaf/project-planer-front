import React, { useContext, useEffect, useState } from 'react';
import { Aside } from './Aside/Aside';
import { Container } from './Container/Container';
import { Header } from './Header/Header';
import { ProjectContext } from '../../Contexts/ProjectContext/ProjectContext';
import { UserContext } from '../../Contexts/UserContext/UserContext';
import { Alert, Snackbar } from '@mui/material';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { EditTask } from './Main/EditTask/EditTask';
import { NewProject } from './Main/NewProject/NewProject';
import { Card } from './Main/Card/Card';

import './Home.css';

const Home = () => {
  const { error, setErrorHandle } = useContext(UserContext);
  const { cards, id, title, showModalEditTask, showMenuNewProject, newPosition } = useContext(ProjectContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    error && setOpen(true);
  }, [error]);

  const handleClose = () => {
    setOpen(false);
    setErrorHandle('');
  };

  const onDragEndHandler = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    newPosition(source, destination, draggableId);
  };

  return (
    <Container>
      <Header id={id} title={title} />
      <Aside />

      <DragDropContext onDragEnd={onDragEndHandler}>
        <div className="main-container">
          {showModalEditTask && <EditTask />}
          {showMenuNewProject && <NewProject />}

          {cards.map((card, index) => (
            <Card key={card.id} card={card} />
          ))}

          <Card card={null} />
        </div>
      </DragDropContext>

      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Home;
