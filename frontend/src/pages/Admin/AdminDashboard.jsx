import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Admin.module.css';

export default function AdminDashboard() {
  const [apiKey] = useState(() => localStorage.getItem('apiKey'));
  const navigate = useNavigate();

  useEffect(() => {
    if (!apiKey) {
      navigate('/admin');
    }
  }, [apiKey, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('apiKey');
    navigate('/admin');
  };

  if (!apiKey) {
    return null;
  }

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardContent}>
        <h1>Admin Dashboard</h1>
        <p>Bienvenido al panel de administración</p>
        <button onClick={handleLogout} className={styles.button}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
