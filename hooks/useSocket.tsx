import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import io from 'socket.io-client';

export const SocketContext = createContext(undefined);

export const useSocket = (): SocketIOClient.Socket | undefined => {
  return useContext(SocketContext);
};

export const SocketContextProvider = (props: { children: React.ReactNode }): React.ReactElement => {
  const { user } = useAuth();
  const [socket, setSocket] = useState<SocketIOClient.Socket | undefined>();
  const { children } = props;
  useEffect(() => {
    if (user && user.email) {
      const soc = io();
      setSocket(soc);
    }
  }, [user]);
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
