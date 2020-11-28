import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <div className={styles.navbar}>
      <ul>
        <li>
          <a>My profile</a>
        </li>
        <li>
          <a>My boards</a>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
