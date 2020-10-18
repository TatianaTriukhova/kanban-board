import firebase from 'firebase/app';
import 'firebase/auth';
import { createContext, Dispatch, SetStateAction, useContext, useState, useEffect } from 'react';
import { noop } from 'lodash';

export interface Auth {
  user: firebase.User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthProvider: React.FC = ({ children }) => {
  const userCtx = useState<firebase.User | null>(null);
  return <AuthContext.Provider value={{ userCtx }}>{children}</AuthContext.Provider>;
};

const AuthContext = createContext<{
  userCtx: [firebase.User | null, Dispatch<SetStateAction<firebase.User | null>>];
}>({ userCtx: [null, noop] });

export const useAuth = (): Auth => {
  const { userCtx } = useContext(AuthContext);
  const [user, setUser] = userCtx;

  const login = async (email: string, password: string): Promise<void> => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      if (!user) {
        throw new Error('Could not create a user');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const register = async (email: string, password: string, name?: string): Promise<void> => {
    try {
      const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
      if (!user) {
        throw new Error('Could not create a user');
      }
      if (name) {
        await user.updateProfile({
          displayName: name,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logout = async () => {
    await firebase.auth().signOut();
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    // on unmount unsubscribe from authstatechange
    return (): void => unsubscribe();
  }, []);

  return { user, login, register, logout };
};
