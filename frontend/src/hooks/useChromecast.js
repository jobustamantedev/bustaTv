import { useEffect, useState, useCallback, useRef } from 'react';

const RECEIVER_APP_ID = 'CC1AD845'; // Default Media Receiver

export const useChromecast = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isCasting, setIsCasting] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    let cleanupFns = [];

    const setupSession = (session) => {
      if (mountedRef.current) {
        console.log('🔗 Sesión Cast establecida');
        setCurrentSession(session);
        setIsCasting(true);

        session.addUpdateListener(() => {
          if (mountedRef.current && !session.isConnected) {
            console.log('❌ Sesión Cast cerrada');
            setIsCasting(false);
            setCurrentSession(null);
          }
        });
      }
    };

    const initCast = () => {
      if (!window.chrome?.cast) {
        console.debug('Cast SDK aún no está disponible');
        return false;
      }

      console.log('🔧 Inicializando Cast Framework...');

      const sessionRequest = new window.chrome.cast.SessionRequest(RECEIVER_APP_ID);

      const onCastApiAvailable = (available) => {
        console.log('onCastApiAvailable called with:', available);
        if (mountedRef.current) {
          if (available) {
            console.log('✅ Cast SDK disponible y listo');
            setIsAvailable(true);
          } else {
            console.warn('❌ Cast API no disponible');
            setIsAvailable(false);
          }
        }
      };

      const onReceiverAvailable = () => {
        console.log('📺 Dispositivos Chromecast detectados');
        if (mountedRef.current) {
          setIsAvailable(true); // Asegurar que isAvailable esté true
        }
      };

      const onSessionJoined = (session) => {
        console.log('onSessionJoined called');
        if (mountedRef.current) {
          setupSession(session);
        }
      };

      const apiConfig = new window.chrome.cast.ApiConfig(
        sessionRequest,
        onSessionJoined,
        onReceiverAvailable,
        window.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
      );

      try {
        window.chrome.cast.initialize(apiConfig, onCastApiAvailable, onReceiverAvailable);
        console.log('✅ initialize() llamado exitosamente');
        return true;
      } catch (e) {
        console.error('Error en initialize():', e);
        return false;
      }
    };

    // Intentar inicializar inmediatamente
    const initialized = initCast();

    if (!initialized) {
      // Si no se inicializó, esperar al SDK
      console.log('⏳ Esperando SDK...');

      // Callback global para cuando el SDK cargue
      const globalCallback = (available) => {
        console.log('🎬 window.__onGCastApiAvailable llamado con:', available);
        if (mountedRef.current) {
          initCast();
        }
      };

      if (!window.__onGCastApiAvailable) {
        window.__onGCastApiAvailable = globalCallback;
      }

      // Polling como fallback
      const checkInterval = setInterval(() => {
        if (window.chrome?.cast && mountedRef.current) {
          console.log('✓ SDK detectado por polling, inicializando...');
          clearInterval(checkInterval);
          initCast();
        }
      }, 300);

      cleanupFns.push(() => clearInterval(checkInterval));
    }

    return () => {
      mountedRef.current = false;
      window.__onGCastApiAvailable = undefined;
      cleanupFns.forEach(fn => fn());
    };
  }, []);

  const startCasting = useCallback((streamUrl, channelName = 'Stream', logoUrl = '', session = null) => {
    const targetSession = session || currentSession;

    if (!targetSession) {
      console.error('❌ No hay sesión de Cast activa');
      return Promise.reject('No Cast session');
    }

    return new Promise((resolve, reject) => {
      try {
        const mediaInfo = new window.chrome.cast.media.MediaInfo(streamUrl);
        mediaInfo.contentType = 'application/x-mpegURL';

        const metadata = new window.chrome.cast.media.GenericMediaMetadata();
        metadata.title = channelName;
        if (logoUrl) {
          metadata.images = [{ url: logoUrl }];
        }
        mediaInfo.metadata = metadata;

        const request = new window.chrome.cast.media.LoadRequest(mediaInfo);
        request.autoplay = true;

        // Si es una sesión nueva, actualizar el estado
        if (session && session !== currentSession && mountedRef.current) {
          console.log('Guardando nueva sesión...');
          setCurrentSession(session);
          setIsCasting(true);

          session.addUpdateListener(() => {
            if (mountedRef.current && !session.isConnected) {
              console.log('❌ Sesión Cast cerrada');
              setIsCasting(false);
              setCurrentSession(null);
            }
          });
        }

        targetSession.loadMedia(
          request,
          () => {
            console.log('✅ Stream enviado a Chromecast');
            resolve();
          },
          (error) => {
            console.error('❌ Error enviando stream:', error);
            reject(error);
          }
        );
      } catch (error) {
        console.error('❌ Error iniciando casting:', error);
        reject(error);
      }
    });
  }, [currentSession]);

  const stopCasting = useCallback(() => {
    if (currentSession) {
      currentSession.stop(
        () => {
          console.log('🛑 Casting detenido');
          if (mountedRef.current) {
            setIsCasting(false);
            setCurrentSession(null);
          }
        },
        (error) => {
          console.error('❌ Error deteniendo casting:', error);
        }
      );
    }
  }, [currentSession]);

  return {
    isAvailable,
    isCasting,
    startCasting,
    stopCasting,
  };
};
