import { useEffect, useState, useCallback, useRef } from 'react';

const RECEIVER_APP_ID = 'CC1AD845'; // Default Media Receiver

export const useChromecast = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isCasting, setIsCasting] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    const initCast = () => {
      if (!window.chrome?.cast) {
        console.debug('Cast SDK aún no está disponible');
        return;
      }

      const sessionRequest = new window.chrome.cast.SessionRequest(RECEIVER_APP_ID);

      const onCastApiAvailable = (available) => {
        if (mountedRef.current && available) {
          console.log('✅ Cast SDK disponible y listo');
          setIsAvailable(true);
        }
      };

      const onCastApiUnavailable = () => {
        if (mountedRef.current) {
          console.warn('❌ Cast API no disponible en este navegador');
          setIsAvailable(false);
        }
      };

      const onReceiverAvailable = () => {
        console.log('📺 Dispositivos de recepción detectados');
      };

      const onSessionJoined = (session) => {
        if (mountedRef.current) {
          console.log('🔗 Sesión Cast establecida automáticamente');
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
        window.chrome.cast.initialize(apiConfig, onCastApiAvailable, onCastApiUnavailable);
      } catch (e) {
        console.error('Error inicializando Cast:', e);
      }
    };

    const setupSession = (session) => {
      if (mountedRef.current) {
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

    // Esperar a que el SDK esté disponible
    if (window.chrome?.cast) {
      initCast();
    } else {
      const globalCallback = (available) => {
        console.log('🎬 Callback global Cast API: disponible =', available);
        if (mountedRef.current && available) {
          initCast();
        }
      };

      window.__onGCastApiAvailable = globalCallback;

      // Fallback: polling
      const checkInterval = setInterval(() => {
        if (window.chrome?.cast) {
          console.log('🎬 SDK detectado por polling');
          clearInterval(checkInterval);
          initCast();
        }
      }, 500);

      const timeout = setTimeout(() => {
        clearInterval(checkInterval);
      }, 10000);

      return () => {
        clearInterval(checkInterval);
        clearTimeout(timeout);
        window.__onGCastApiAvailable = undefined;
        mountedRef.current = false;
      };
    }

    return () => {
      mountedRef.current = false;
      window.__onGCastApiAvailable = undefined;
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
