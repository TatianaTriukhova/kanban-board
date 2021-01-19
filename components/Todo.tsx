import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import styles from './Todo.module.css';
import { useShortTodoContext } from '../hooks/useTodoContext';
import TodoType from '../types/TodoType';
import { useAuth } from '../hooks/useAuth';
import { useSocket } from '../hooks/useSocket';

const Todo: React.FC<{
  todo: TodoType;
  isDefault: boolean;
  setShowDefaultTodo?: Dispatch<SetStateAction<boolean>>;
}> = ({ todo, isDefault, setShowDefaultTodo }) => {
  const [name, setName] = useState('');
  const [stage, setStage] = useState('');
  const [assignee, setAssignee] = useState<TodoType['assignee']>();
  const { shortTermTodos, setShortTermTodos } = useShortTodoContext();
  const [shouldEdit, setShouldEdit] = useState(false);
  const { user } = useAuth();
  const socket = useSocket();

  useEffect(() => {
    if (todo) {
      setName(todo.name);
      setStage(todo.stage);
      setAssignee(todo.assignee);
    }
  }, [todo]);

  const deleteTodo = async (docId: string) => {
    const filtered = shortTermTodos.filter((todo) => {
      return todo._id !== docId;
    });

    setShortTermTodos(filtered);
    socket.emit('board-update', filtered);

    await fetch('http://localhost:3000/api/short-term', {
      method: 'DELETE',
      body: JSON.stringify({ _id: docId }),
    });
  };

  const updateAssignee = (assigneeName: TodoType['assignee']): void => {
    setAssignee(assigneeName);

    editTodo({ ...todo, assignee: assigneeName });
  };

  const editTodo = async (task: TodoType) => {
    const newTodos = shortTermTodos.map((td) => {
      if (td._id === task._id) {
        return task;
      }

      return td;
    });

    setShortTermTodos(newTodos);

    await fetch('http://localhost:3000/api/short-term', {
      method: 'PUT',
      body: JSON.stringify(task),
    });

    socket.emit('board-update', newTodos);
    setShouldEdit(false);
  };

  const createTodo = async () => {
    if (name.length < 1) {
      return;
    }

    const doc = await fetch('http://localhost:3000/api/short-term', {
      method: 'POST',
      body: JSON.stringify({ name, stage: 'backlog' }),
    });

    const result = await doc.json();

    const newTodo = {
      name,
      stage: 'backlog',
      _id: result._id,
    };
    setShortTermTodos([...shortTermTodos, newTodo].sort((a, b) => (a.name < b.name ? -1 : 1)));
    socket.emit('board-update', [...shortTermTodos, newTodo]);
    setShowDefaultTodo(false);
  };

  const editOrCreateTodo = (todo: TodoType) => {
    if (isDefault) {
      createTodo();
    } else {
      const updatedTodo = {
        _id: todo._id,
        name,
        stage,
        assignee,
      };
      editTodo(updatedTodo);
    }
  };
  useEffect(() => {
    if (name && todo.name !== name) {
      setShouldEdit(true);
    }
  }, [name]);

  return (
    <div
      className={
        isDefault ? styles.defaultTodoContainer + ' ' + styles.todoContainer : styles.todoContainer
      }
    >
      <div className={styles.taskName}>
        <input
          placeholder="Enter name of the task..."
          value={name.toUpperCase()}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={styles.assignee}>
        {assignee ? (
          <span>{assignee}</span>
        ) : (
          <a
            onClick={() => {
              if (user && user.displayName) {
                updateAssignee(user.displayName);
              }
            }}
          >
            Assign to me
          </a>
        )}
      </div>
      <div className={styles.actionButtons}>
        {!isDefault && <button onClick={() => deleteTodo(todo._id)}>Delete</button>}
        {shouldEdit && <button onClick={() => editOrCreateTodo(todo)}>Save</button>}
      </div>
    </div>
  );
};

export default Todo;
