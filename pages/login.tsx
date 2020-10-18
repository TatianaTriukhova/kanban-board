import LoginForm from '../components/Login/LoginForm';
import styles from './Login.module.css';
import globalStyles from '../styles/Home.module.css';
const LoginPage: React.FC = () => {
  return (
    <div className={globalStyles.container}>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
