import Link from 'next/link';
import styles from '../styles/Home.module.css';
import SigninControls from '../components/SigninControls/SigninControls';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <SigninControls />

      <Link href={'/sign-up'}>
        <a>Sign up</a>
      </Link>
      <Link href={'/short-term'}>
        <a>To short-term todos</a>
      </Link>
    </div>
  );
};
export default Home;
