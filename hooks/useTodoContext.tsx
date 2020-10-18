import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import TodoType from './../types/TodoType';
import { noop } from 'lodash';

export interface InitialShortTermTodoData {
  shortTermTodos: TodoType[];
}

//(2) create an interface - type of the context
export interface ShortTermTodoContext {
  shortTermTodos: TodoType[];
  setShortTermTodos: Dispatch<SetStateAction<TodoType[]>>;
}

// (1) create context
export const ShortTermTodoContext = createContext<ShortTermTodoContext>({
  shortTermTodos: [],
  setShortTermTodos: noop,
});

// (3) create a function for using this context.

export const useShortTodoContext = (): ShortTermTodoContext => {
  return useContext(ShortTermTodoContext);
};

// (4) create a provider

export const ShortTermTodoContextProvider = (props: {
  shortTermTodos: TodoType[];
  children: React.ReactNode;
}): React.ReactElement => {
  const initialShortTermTodos = props.shortTermTodos ?? [];
  const children = props.children;

  const [shortTermTodos, setShortTermTodos] = useState(
    initialShortTermTodos.sort((a, b) => (a.name < b.name ? -1 : 1)),
  );
  return (
    <ShortTermTodoContext.Provider value={{ shortTermTodos, setShortTermTodos }}>
      {children}
    </ShortTermTodoContext.Provider>
  );
};
