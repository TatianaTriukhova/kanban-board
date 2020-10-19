import Link from 'next/link';
import styles from './ShortTerm.module.css';
import { initializeApplication } from '../lib/db';
import { GetServerSideProps } from 'next';
import TodoType from '../types/TodoType';
import Dropzone from '../components/Dropzone/Dropzone';
import { ShortTermTodoContextProvider, useShortTodoContext } from '../hooks/useTodoContext';
import SigninControls from '../components/SigninControls/SigninControls';
import { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import { useAuth } from '../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
const ShortTermPage: React.FC = () => {
  const { setShortTermTodos } = useShortTodoContext();
  const socket = useSocket();
  const auth = useAuth();
  const [showNavbar, setShowNavbar] = useState(false);
  useEffect(() => {
    if (socket) {
      socket.on('board-update', (todos) => {
        setShortTermTodos(todos);
      });
    }
  }, [socket]);

  return (
    <div className={styles.container}>
      <div className={styles.signinControls}>
        <button onClick={() => setShowNavbar(!showNavbar)} className={styles.menuBtn}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        {auth.user && <h1>{auth.user.displayName.toUpperCase()}</h1>}
        <SigninControls />
      </div>
      <div className={styles.content}>
        {showNavbar && (
          <div className={styles.navbar}>
            <ul>
              <li>
                <a>My profile</a>
              </li>
              <li>
                <a>My boards</a>
              </li>
            </ul>
          </div>
        )}
        <div className={styles.progressStageArea}>
          <Dropzone zoneName="Backlog" zoneStage="backlog" socket={socket} />
          <Dropzone zoneName="In progress" zoneStage="wip" socket={socket} />
          <Dropzone zoneName="Completed" zoneStage="completed" socket={socket} />
        </div>

        {/* <CreateToDoModal
        modalIsOpen={createModalIsOpen}
        setModalIsOpen={setCreateModalIsOpen}
        setName={setName}
        setStage={setStage}
      /> */}
      </div>
    </div>
  );
};

const ShortTermPageProvider: React.FC<{ shortTermDos: TodoType[] }> = ({ shortTermDos }) => {
  return (
    <ShortTermTodoContextProvider shortTermTodos={shortTermDos}>
      <ShortTermPage />
    </ShortTermTodoContextProvider>
  );
};

export default ShortTermPageProvider;
export const getServerSideProps: GetServerSideProps = async () => {
  //   const res = await fetch('https://api.bitbucket.org/2.0/users/{1766d5cb-1df3-439d-ac6d-81bdcbcaf09d}/repositories')
  //   const data = await res.json()

  const firebase = initializeApplication();
  const db = firebase.firestore();

  const doc = await db.collection('short-term').get();
  const shortTermDos = doc.docs.map((todo) => {
    const data = todo.data();
    const id = todo.id;
    return {
      name: data.name,
      stage: data.stage,
      assignee: data.assignee ?? null,
      id,
    };
  });

  return { props: { shortTermDos } };
};
