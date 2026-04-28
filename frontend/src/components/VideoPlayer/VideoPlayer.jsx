import { useEffect, useRef, useState } from 'react';
import styles from './VideoPlayer.module.css';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function VideoPlayer({ channel }) {
  const playerRef = useRef(null);
  const clapprRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!channel?.slug) {
      // Sin canal seleccionado
      if (clapprRef.current) {
        try {
          clapprRef.current.destroy();
        } catch (e) {
          console.error('Error destroying player:', e);
        }
        clapprRef.current = null;
      }
      // Limpiar contenido del div
      const playerDiv = document.getElementById('video-player');
      if (playerDiv) {
        playerDiv.innerHTML = '';
      }
      setError(null);
      return;
    }

    // Limpiar instancia anterior completamente
    if (clapprRef.current) {
      try {
        clapprRef.current.destroy();
      } catch (e) {
        console.error('Error destroying previous player:', e);
      }
      clapprRef.current = null;
    }

    // Limpiar el contenido del div antes de crear nuevo player
    const playerDiv = document.getElementById('video-player');
    if (playerDiv) {
      playerDiv.innerHTML = '';
    }

    setLoading(true);
    setError(null);

    // Obtener la URL real del stream desde el backend
    const fetchStreamUrl = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/streams/${channel.slug}`);
        if (!response.ok) {
          throw new Error('Error obteniendo URL del stream');
        }

        const data = await response.json();
        const realStreamUrl = data.url;

        // Crear nueva instancia de Clappr con la URL real del m3u8
        if (window.Clappr) {
          clapprRef.current = new window.Clappr.Player({
            source: realStreamUrl,
            parentId: '#video-player',
            width: '100%',
            height: '100%',
            autoPlay: true,
            mute: false,
            poster: channel.logo_url || '',
            hlsjsConfig: {
              xhrSetup: (xhr, url) => {
                xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
                xhr.setRequestHeader('Referer', 'https://tvtvhd.com/');
              },
            },
          });
          setError(null);
        } else {
          console.error('Clappr no está disponible en window');
          setError('Player no disponible');
        }
      } catch (err) {
        console.error('Error cargando stream:', err);
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchStreamUrl();

    // Cleanup al desmontar o cambiar canal
    return () => {
      if (clapprRef.current) {
        try {
          clapprRef.current.destroy();
        } catch (e) {
          console.error('Error in cleanup:', e);
        }
        clapprRef.current = null;
      }
      const playerDiv = document.getElementById('video-player');
      if (playerDiv) {
        playerDiv.innerHTML = '';
      }
    };
  }, [channel?.slug]); // Solo re-ejecuta cuando cambia el slug del canal

  return (
    <div className={styles.playerWrapper}>
      <div id="video-player" ref={playerRef} className={styles.player} />
      {!channel && (
        <div className={styles.placeholder}>
          <p>Selecciona un canal para ver el stream</p>
        </div>
      )}
      {loading && (
        <div className={styles.overlay}>
          <p>Cargando stream...</p>
        </div>
      )}
      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
