import TodoType from './TodoType';

interface BoardType {
  _id: string;
  name: string;
  todos: TodoType[];
  users: firebase.User[];
}
export default BoardType;
