import { createContext, Dispatch, SetStateAction, SetStateAction } from 'react';
import BoardType from '../types/BoardType';
import { noop } from 'lodash';

export interface BoardsContextInterface {
  boards: BoardType[];
  setBoards: Dispatch<SetStateAction<BoardType[]>>;
}

export const BoardsContext = createContext<BoardsContextInterface>({
  boards: [],
  setBoards: noop,
});
