import styles from './Wrapper.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SigninControls from '../SigninControls/SigninControls';
import Navbar from '../Navbar/Navbar';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();
  const [showNavbar, setShowNavbar] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.signinControls}>
        <button onClick={() => setShowNavbar(!showNavbar)} className={styles.menuBtn}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        {auth.user && <h1>{auth.user.displayName.toUpperCase()}</h1>}
        <SigninControls />
      </div>
      <div className={styles.content}>
        <div className={styles.navContainer}>{showNavbar && <Navbar />}</div>
        <div className={styles.childrenContainer}>{children}</div>
      </div>
    </div>
  );
};

export default Wrapper;
