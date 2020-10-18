import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import styles from './Todo.module.css';
import { useShortTodoContext } from '../hooks/useTodoContext';
import { useDB } from '../hooks/useDB';
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
  const [assignee, setAssignee] = useState('');
  const { shortTermTodos, setShortTermTodos } = useShortTodoContext();
  const { shortTermsDosCollection } = useDB();
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
      return todo.id !== docId;
    });

    setShortTermTodos(filtered);
    socket.emit('board-update', filtered);
    await shortTermsDosCollection
      .doc(docId)
      .delete()
      .then()
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    if (assignee) {
      editTodo(todo);
    }
  }, [assignee]);

  const editTodo = async (todo: TodoType) => {
    const newTodos = shortTermTodos.map((td) => {
      if (td === todo) {
        return { ...td, name: name, stage: stage, assignee: assignee };
      }

      return td;
    });
    setShortTermTodos(newTodos);

    await shortTermsDosCollection.doc(todo.id).update({
      name: name,
      stage: stage,
      assignee: assignee,
    });

    socket.emit('board-update', newTodos);
    setShouldEdit(false);
  };

  const createTodo = async () => {
    if (name.length < 1) {
      return;
    }
    const doc = await shortTermsDosCollection.add({ name, stage });
    const newTodo = {
      name,
      stage: 'backlog',
      id: doc.id,
    };
    setShortTermTodos([...shortTermTodos, newTodo].sort((a, b) => (a.name < b.name ? -1 : 1)));
    socket.emit('board-update', [...shortTermTodos, newTodo]);
    setShowDefaultTodo(false);
  };

  const editOrCreateTodo = (todo: TodoType) => {
    if (isDefault) {
      createTodo();
    } else {
      editTodo(todo);
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
      <input
        placeholder="Enter name of the task..."
        value={name}
        type="text"
        onChange={(e) => setName(e.target.value)}
      />
      <div className={styles.assignee}>
        {assignee ? (
          <h3>{assignee}</h3>
        ) : (
          <a
            onClick={() => {
              if (user && user.displayName) {
                setAssignee(user.displayName);
              }
            }}
          >
            Assign to me
          </a>
        )}
      </div>

      {/* {!isDefault && <button onClick={() => deleteTodo(todo.id)}>Delete</button>}
      {shouldEdit && <button onClick={() => editOrCreateTodo(todo)}>Save</button>} */}
    </div>
  );
};

export default Todo;
