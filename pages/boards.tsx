import { useAuth } from '../hooks/useAuth';
import { GetServerSideProps } from 'next';
import BoardType from '../types/BoardType';
import Wrapper from '../components/Wrapper/Wrapper';
import styles from './Boards.module.css';
const BoardsPage: React.FC<{ boards: BoardType[] }> = ({ boards }) => {
  const auth = useAuth();
  console.log(boards);
  return (
    <Wrapper>
      {boards.length < 1 ? (
        <div className={styles.newBoardSection}>
          <h3 className={styles.textWhite}>Start by creating a board</h3>
          <button className={styles.addBoardBtn}>+</button>
        </div>
      ) : (
        <div>
          {boards.map((b, key) => {
            return <div key={key}>{b.name}</div>;
          })}
        </div>
      )}
    </Wrapper>
  );
};

// const BoardsPageProvider: React.FC<{ boards: BoardType[] }> = ({ boards }) => {
//   return (
//     <BoardContextProvider boards={boards}>
//       <BoardsPage />
//     </BoardContextProvider>
//   );
// };
// export default BoardsPageProvider;
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/boards');
  const boards = await res.json();

  return { props: { boards } };
};
export default BoardsPage;
