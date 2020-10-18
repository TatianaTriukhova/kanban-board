import SignupForm from '../components/Signup/SignupForm';
import styles from './Signup.module.css';
import globalStyles from '../styles/Home.module.css';
const SignupPage: React.FC = () => {
  return (
    <div className={globalStyles.container}>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
