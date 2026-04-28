import { createContext, useState, useEffect, useRef } from 'react';

export const FavoritesContext = createContext();

const FAVORITES_KEY = 'bustaTv_favorites';

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const isInitialized = useRef(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      console.log('Cargando favoritos desde localStorage:', stored);
      if (stored) {
        const parsed = JSON.parse(stored);
        setFavorites(parsed);
        console.log('Favoritos cargados:', parsed);
      }
      isInitialized.current = true;
    } catch (error) {
      console.error('Error loading favorites:', error);
      isInitialized.current = true;
    }
  }, []);

  // Save favorites to localStorage when they change (but not on initial load)
  useEffect(() => {
    if (isInitialized.current) {
      try {
        const json = JSON.stringify(favorites);
        localStorage.setItem(FAVORITES_KEY, json);
        console.log('✅ Favoritos guardados en localStorage:', favorites);
        console.log('Contenido localStorage:', localStorage.getItem(FAVORITES_KEY));
      } catch (error) {
        console.error('❌ Error guardando favoritos:', error);
      }
    } else {
      console.log('⏳ Esperando inicialización...');
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

  const value = {
    favorites,
    toggleFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
