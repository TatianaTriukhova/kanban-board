import { useState, ChangeEvent } from 'react';
import styles from './SignupForm.module.css';
import Link from 'next/link';
import { useAuth } from '../../hooks/useAuth';
const SignupForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
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
      <Link href="/short-term">
        <a onClick={(): Promise<void> => auth.register(email, password, name)}>Submit</a>
      </Link>
    </div>
  );
};

export default SignupForm;
