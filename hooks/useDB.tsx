import { initializeApplication } from '../lib/db';
import { createContext, useContext } from 'react';

export const firebase = initializeApplication();
const db = firebase.firestore();

export const DBContext = createContext<firebase.firestore.Firestore>(db);

export const DBContextProvider = (props: { children: React.ReactNode }): React.ReactElement => {
  const children = props.children;

  return <DBContext.Provider value={db}>{children}</DBContext.Provider>;
};

export const useDB = (): {
  db: firebase.firestore.Firestore;
  shortTermsDosCollection: firebase.firestore.CollectionReference<firebase.firestore.DocumentData>;
} => {
  const db = useContext(DBContext);
  const shortTermsDosCollection = db.collection('short-term');
  return { db, shortTermsDosCollection };
};
