import { useChromecast } from '../../hooks/useChromecast';
import styles from './CastButton.module.css';

export default function CastButton({ streamUrl, channelName, logoUrl, loading = false }) {
  const { isAvailable, isCasting, startCasting, stopCasting } = useChromecast();

  const handleClick = async () => {
    if (isCasting) {
      stopCasting();
    } else if (streamUrl && window.chrome?.cast) {
      try {
        // Mostrar device picker
        window.chrome.cast.requestSession(
          async (session) => {
            console.log('📺 Dispositivo seleccionado, iniciando transmisión...');
            try {
              await startCasting(streamUrl, channelName, logoUrl, session);
            } catch (error) {
              console.error('Error en casting:', error);
            }
          },
          (error) => {
            if (error.code !== 'SESSION_ERROR') {
              console.error('❌ Error seleccionando dispositivo:', error);
            }
          }
        );
      } catch (e) {
        console.error('❌ Error abriendo device picker:', e);
      }
    }
  };

  if (!isAvailable) {
    return null; // Cast no disponible, no mostrar botón
  }

  return (
    <button
      className={`${styles.castButton} ${isCasting ? styles.active : ''}`}
      onClick={handleClick}
      disabled={loading || !streamUrl}
      title={isCasting ? 'Detener transmisión' : 'Transmitir a TV'}
      aria-label={isCasting ? 'Detener transmisión' : 'Transmitir a TV'}
    >
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Google Cast icon */}
        <path d="M1 18v2h14v-2H1zm0-5v2h11V13H1zM1 8V6h8v2H1zm20-2v8.18C21 15.6 19.6 17 17.95 17c-1.65 0-3-1.35-3-3s1.35-3 3-3c.96 0 1.81.48 2.33 1.21V6h2z" />
      </svg>
      {isCasting && <span className={styles.dot} />}
    </button>
  );
}
