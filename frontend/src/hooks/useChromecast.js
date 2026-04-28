import { useEffect, useState, useCallback } from 'react';

const RECEIVER_APP_ID = 'CC1AD845'; // Default Media Receiver

export const useChromecast = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [isCasting, setIsCasting] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);

  // Inicializar Cast Framework cuando el SDK carga
  useEffect(() => {
    const initCast = () => {
      if (!window.chrome?.cast) {
        console.warn('Cast SDK no disponible');
        return;
      }

      const sessionRequest = new window.chrome.cast.SessionRequest(RECEIVER_APP_ID);
      const apiConfig = new window.chrome.cast.ApiConfig(
        sessionRequest,
        onSessionJoined,
        onReceiverAvailable,
        window.chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
      );

      window.chrome.cast.initialize(apiConfig, onCastApiAvailable, onCastApiUnavailable);
    };

    const onCastApiAvailable = (isAvailable) => {
      if (isAvailable) {
        setIsAvailable(true);
      }
    };

    const onCastApiUnavailable = () => {
      setIsAvailable(false);
    };

    const onReceiverAvailable = () => {
      // El Cast Framework detectó dispositivos disponibles
    };

    const onSessionJoined = (session) => {
      setCurrentSession(session);
      setIsCasting(true);

      // Escuchar cuando se cierre la sesión
      session.addUpdateListener(() => {
        if (session.isConnected === false) {
          setIsCasting(false);
          setCurrentSession(null);
        }
      });
    };

    // Esperar a que el SDK esté disponible
    if (window.chrome?.cast?.isAvailable) {
      initCast();
    } else {
      // Registrar callback global para cuando el SDK cargue
      window.__onGCastApiAvailable = (isAvailable) => {
        if (isAvailable) {
          initCast();
        }
      };
    }

    return () => {
      // Cleanup no es estrictamente necesario, pero buena práctica
      window.__onGCastApiAvailable = undefined;
    };
  }, []);

  const startCasting = useCallback((streamUrl, channelName = 'Stream', logoUrl = '') => {
    if (!currentSession) {
      console.error('No hay sesión de Cast activa');
      return;
    }

    try {
      const mediaInfo = new window.chrome.cast.media.MediaInfo(streamUrl);
      mediaInfo.contentType = 'application/x-mpegURL'; // HLS
      mediaInfo.customData = { title: channelName, logo: logoUrl };

      const request = new window.chrome.cast.media.LoadRequest(mediaInfo);
      request.autoplay = true;

      currentSession.sendMediaMessage(request, () => {
        console.log('Stream enviado a Chromecast');
      }, (error) => {
        console.error('Error enviando stream:', error);
      });
    } catch (error) {
      console.error('Error iniciando casting:', error);
    }
  }, [currentSession]);

  const stopCasting = useCallback(() => {
    if (currentSession) {
      currentSession.stop(() => {
        setIsCasting(false);
        setCurrentSession(null);
      }, (error) => {
        console.error('Error deteniendo casting:', error);
      });
    }
  }, [currentSession]);

  return {
    isAvailable,
    isCasting,
    startCasting,
    stopCasting,
  };
};
