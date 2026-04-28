import { useState, useEffect, useRef } from 'react';

const FAVORITES_KEY = 'bustaTv_favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const isInitialized = useRef(false);

  // Cargar favoritos desde localStorage en el mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
      isInitialized.current = true;
    } catch (error) {
      console.error('Error loading favorites:', error);
      isInitialized.current = true;
    }
  }, []);

  // Guardar favoritos a localStorage cuando cambian (pero no en la carga inicial)
  useEffect(() => {
    if (isInitialized.current) {
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
        console.log('Favoritos guardados:', favorites);
      } catch (error) {
        console.error('Error saving favorites:', error);
      }
    }
  }, [favorites]);

  const toggleFavorite = (channelId) => {
    setFavorites(prev => {
      if (prev.includes(channelId)) {
        return prev.filter(id => id !== channelId);
      } else {
        return [...prev, channelId];
      }
    });
  };

  const isFavorite = (channelId) => favorites.includes(channelId);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}
