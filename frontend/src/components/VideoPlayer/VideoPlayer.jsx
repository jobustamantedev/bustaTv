import { useEffect, useRef } from 'react';
import styles from './VideoPlayer.module.css';

export default function VideoPlayer({ channel }) {
  const playerRef = useRef(null);
  const clapprRef = useRef(null);

  useEffect(() => {
    if (!channel?.stream_url) {
      // Sin canal seleccionado
      if (clapprRef.current) {
        clapprRef.current.destroy();
        clapprRef.current = null;
      }
      return;
    }

    // Limpiar instancia anterior
    if (clapprRef.current) {
      clapprRef.current.destroy();
      clapprRef.current = null;
    }

    // Crear nueva instancia de Clappr
    // IMPORTANTE: Clappr debe estar disponible como window.Clappr
    // (cargado via <script> en index.html)
    if (window.Clappr) {
      clapprRef.current = new window.Clappr.Player({
        source: channel.stream_url,
        parentId: '#video-player',
        width: '100%',
        height: '100%',
        autoPlay: true,
        mute: false,
        poster: channel.logo_url || '',
      });
    } else {
      console.error('Clappr no está disponible en window');
    }

    // Cleanup al desmontar o cambiar canal
    return () => {
      if (clapprRef.current) {
        clapprRef.current.destroy();
        clapprRef.current = null;
      }
    };
  }, [channel?.stream_url]); // Solo re-ejecuta cuando cambia la URL del stream

  return (
    <div className={styles.playerWrapper}>
      <div id="video-player" ref={playerRef} className={styles.player} />
      {!channel && (
        <div className={styles.placeholder}>
          <p>Selecciona un canal para ver el stream</p>
        </div>
      )}
    </div>
  );
}
