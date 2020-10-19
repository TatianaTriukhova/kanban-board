import styles from './SigninControls.module.css';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';

const SigninControls: React.FC = () => {
  const auth = useAuth();
  const router = useRouter();

  return (
    <div className={styles.signinControlsWrapper}>
      <Link href={'/'}>
        <button>Home</button>
      </Link>
      <button
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
      </button>
    </div>
  );
};
export default SigninControls;
