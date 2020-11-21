import TodoType from '../../types/TodoType';
import styles from './Dropzone.module.css';
import Todo from '../Todo';
import { useShortTodoContext } from '../../hooks/useTodoContext';
import { useState } from 'react';
import ZoneHeader from '../ZoneHeader/ZoneHeader';
const Dropzone: React.FC<{
  zoneStage: string;
  zoneName: string;
  socket: SocketIOClient.Socket | undefined;
}> = ({ zoneStage, zoneName, socket }) => {
  const { shortTermTodos, setShortTermTodos } = useShortTodoContext();
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

    await fetch('http://localhost:3000/api/short-term', {
      method: 'PUT',
      body: JSON.stringify({ _id: oldTask._id, stage: newTask.stage }),
    });
    const newTodos = shortTermTodos.map((todo) => {
      if (todo._id === oldTask._id) {
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
      <div className={styles.headerContainer}>
        <ZoneHeader zoneName={zoneName} />
      </div>
      <div className={styles.todoZone}>
        <div className={styles.createBtn}>
          {zoneStage === 'backlog' && (
            <button onClick={() => setShowDefaultTodo(true)}>Create a new todo</button>
          )}
        </div>
        {showDefaultTodo && (
          <div className={styles.todo}>
            <Todo
              todo={{ _id: '', name: '', stage: 'backlog' }}
              isDefault={true}
              setShowDefaultTodo={setShowDefaultTodo}
            />
          </div>
        )}

        {shortTermTodos &&
          shortTermTodos
            .filter((todo) => todo.stage === zoneStage)
            .map((task, index) => {
              return (
                <div
                  className={styles.todoDragContainer}
                  key={task._id + ' ' + index}
                  draggable
                  onDragStart={(e: any) => dragStart(e, task)}
                >
                  <Todo todo={task} isDefault={false} />
                </div>
              );
            })}
      </div>
    </div>
  );
};
export default Dropzone;
