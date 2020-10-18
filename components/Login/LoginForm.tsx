import { useState, ChangeEvent } from 'react';
import styles from './LoginForm.module.css';
import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/dist/client/router';

const LoginForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const router = useRouter();

  return (
    <div className={styles.formWrapper}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          setName(e.target.value);
        }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          setPassword(e.target.value);
        }}
      />

      <button
        onClick={() => {
          auth.login(email, password);
          router.push('/short-term');
        }}
      >
        Login
      </button>
    </div>
  );
};

export default LoginForm;
