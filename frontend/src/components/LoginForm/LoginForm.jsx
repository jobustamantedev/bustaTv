import { useState } from 'react';
import styles from './LoginForm.module.css';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Error al iniciar sesión');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Error al registrarse');
      }

      const data = await response.json();
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      onLoginSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h1>bustaTv</h1>

        {!showRegister ? (
          <form onSubmit={handleLogin}>
            <h2>Iniciar Sesión</h2>

            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            {error && <div className={styles.error}>{error}</div>}

            <button type="submit" disabled={loading}>
              {loading ? 'Cargando...' : 'Ingresar'}
            </button>

            <p className={styles.toggle}>
              ¿No tienes cuenta?
              <button
                type="button"
                onClick={() => {
                  setShowRegister(true);
                  setError('');
                }}
              >
                Regístrate
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <h2>Crear Cuenta</h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            {error && <div className={styles.error}>{error}</div>}

            <button type="submit" disabled={loading}>
              {loading ? 'Creando...' : 'Registrarse'}
            </button>

            <p className={styles.toggle}>
              ¿Ya tienes cuenta?
              <button
                type="button"
                onClick={() => {
                  setShowRegister(false);
                  setError('');
                }}
              >
                Inicia sesión
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
