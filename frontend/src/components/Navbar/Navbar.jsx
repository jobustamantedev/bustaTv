import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          bustaTv
        </Link>
        <div className={styles.menu}>
          <Link to="/" className={styles.link}>Inicio</Link>
          <Link to="/" className={styles.link}>Canales</Link>
          <Link to="/admin" className={styles.link}>Admin</Link>
        </div>
      </div>
    </nav>
  );
}
