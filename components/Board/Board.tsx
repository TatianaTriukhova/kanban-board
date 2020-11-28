import styles from './Board.module.css';
import Dropzone from '../Dropzone/Dropzone';

const Board: React.FC<{ socket: SocketIOClient.Socket | undefined }> = ({ socket }) => {
  return (
    <div className={styles.progressStageArea}>
      <Dropzone zoneName="Backlog" zoneStage="backlog" socket={socket} />
      <Dropzone zoneName="In progress" zoneStage="wip" socket={socket} />
      <Dropzone zoneName="Completed" zoneStage="completed" socket={socket} />
    </div>
  );
};

export default Board;
