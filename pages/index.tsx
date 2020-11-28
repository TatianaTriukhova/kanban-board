import Link from 'next/link';
import styles from '../styles/Home.module.css';
import SigninControls from '../components/SigninControls/SigninControls';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';

const Home: React.FC = () => {
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    console.log(auth.user);
    if (auth.user) {
      router.replace(`/profile/${auth.user.uid}`);
    }
  });
  return (
    <div className={styles.container}>
      <SigninControls />
      <div className={styles.logo}>
        <img src="assets/logo.png" alt="Logo" height="100px"></img>
      </div>
      <h3>Some inspirational slogan</h3>
      <div className={styles.links}>
        <Link href={'/login'}>
          <a>Login</a>
        </Link>
        <Link href={'/sign-up'}>
          <a>Sign up</a>
        </Link>
      </div>
    </div>
  );
};
export default Home;
