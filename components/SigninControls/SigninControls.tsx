import styles from './SigninControls.module.css';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/dist/client/router';

const SigninControls: React.FC = () => {
  const auth = useAuth();
  const router = useRouter();

  return (
    <div className={styles.signinControlsWrapper}>
      {auth.user && <span>{`Signed in as ${auth.user.displayName}`}</span>}
      <a
        className={styles.logBtn}
        onClick={() => {
          if (auth.user) {
            auth.logout();
          } else {
            router.push('/login');
          }
        }}
      >
        {auth.user ? 'Logout' : 'Login'}
      </a>
    </div>
  );
};
export default SigninControls;
