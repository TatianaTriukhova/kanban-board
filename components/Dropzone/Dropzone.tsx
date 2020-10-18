import TodoType from '../../types/TodoType';
import styles from './Dropzone.module.css';
import Todo from '../Todo';
import { useShortTodoContext } from '../../hooks/useTodoContext';
import { useDB } from '../../hooks/useDB';
import { useState } from 'react';
const Dropzone: React.FC<{
  zoneStage: string;
  zoneName: string;
  socket: SocketIOClient.Socket | undefined;
}> = ({ zoneStage, zoneName, socket }) => {
  const { shortTermTodos, setShortTermTodos } = useShortTodoContext();
  const { shortTermsDosCollection } = useDB();
  const [showDefaultTodo, setShowDefaultTodo] = useState(false);
  const dragOver = (e) => {
    e.preventDefault();
  };
  const dragStart = (e: any, todo: TodoType) => {
    e.dataTransfer.setData('todo', JSON.stringify(todo));
  };

  const taskDrop = async (e) => {
    e.preventDefault();

    const oldTask = JSON.parse(e.dataTransfer.getData('todo'));
    const newTask = { ...oldTask, stage: zoneStage };

    await shortTermsDosCollection.doc(oldTask.id).update({
      stage: newTask.stage,
    });
    const newTodos = shortTermTodos.map((todo) => {
      if (todo.id === oldTask.id) {
        return { ...todo, stage: newTask.stage };
      } else {
        return todo;
      }
    });
    setShortTermTodos(newTodos);
    socket.emit('board-update', newTodos);
  };
  return (
    <div className={styles.dropzone} onDragOver={dragOver} onDrop={taskDrop}>
      <h3>{zoneName}</h3>

      <div className={styles.todoZone}>
        {shortTermTodos &&
          shortTermTodos
            .filter((todo) => todo.stage === zoneStage)
            .map((task, index) => {
              return (
                <div
                  className={styles.todo}
                  key={task.id + ' ' + index}
                  draggable
                  onDragStart={(e: any) => dragStart(e, task)}
                >
                  <Todo todo={task} isDefault={false} />
                </div>
              );
            })}
        {showDefaultTodo && (
          <div className={styles.todo}>
            <Todo
              todo={{ id: '', name: '', stage: 'backlog' }}
              isDefault={true}
              setShowDefaultTodo={setShowDefaultTodo}
            />
          </div>
        )}
      </div>

      <div>
        {zoneStage === 'backlog' && (
          <button onClick={() => setShowDefaultTodo(true)}>Create a new todo</button>
        )}
      </div>
    </div>
  );
};
export default Dropzone;
