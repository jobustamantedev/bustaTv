import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Admin.module.css';

export default function AdminLogin() {
  const [apiKey, setApiKey] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (apiKey) {
      localStorage.setItem('apiKey', apiKey);
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h1>Admin Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}
