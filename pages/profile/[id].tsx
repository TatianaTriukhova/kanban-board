import SigninControls from '../../components/SigninControls/SigninControls';
import styles from '../../styles/Home.module.css';
const ProfilePage: React.FC = () => {
  return (
    <PageWrapper>
      <div className={styles.container}>
        <SigninControls />
        <h1>Privet</h1>
      </div>
    </PageWrapper>
  );
};

export default ProfilePage;
