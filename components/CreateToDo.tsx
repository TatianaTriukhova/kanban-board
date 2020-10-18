import Modal from 'react-modal';
import { Dispatch, SetStateAction, useState } from 'react';

const modalStyle = {
  content: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
interface CreateToDoModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  setName: Dispatch<SetStateAction<string>>;
  setStage: Dispatch<SetStateAction<string>>;
}
export const CreateToDoModal: React.FC<CreateToDoModalProps> = ({
  modalIsOpen = false,
  setModalIsOpen,
  setName,
  setStage,
}) => {
  const [todoName, setTodoName] = useState('');
  const [todoStage, setTodoStage] = useState('');

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const submitTodo = () => {
    setName(todoName);
    setStage(todoStage);
    setModalIsOpen(false);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      style={modalStyle as any}
      shouldCloseOnOverlayClick={true}
      onRequestClose={(): void => {
        closeModal();
      }}
    >
      <input
        type="text"
        placeholder="Name..."
        value={todoName}
        onChange={(e): void => setTodoName(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Stage..."
        value={todoStage}
        onChange={(e): void => setTodoStage(e.target.value)}
      ></input>
      <button onClick={submitTodo}>Submit</button>
    </Modal>
  );
};
