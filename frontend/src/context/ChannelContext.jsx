import { createContext, useState, useEffect } from 'react';
import { api } from '../services/api';

export const ChannelContext = createContext();

export function ChannelProvider({ children }) {
  const [channels, setChannels] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch inicial
  useEffect(() => {
    Promise.all([
      api.getChannels(),
      api.getCategories(),
    ])
      .then(([channelsData, categoriesData]) => {
        setChannels(channelsData);
        setCategories(categoriesData);
        // Auto-seleccionar primer canal activo
        if (channelsData.length > 0) {
          setCurrentChannel(channelsData[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filtrar canales por categoría
  const filteredChannels = activeCategory === 'all'
    ? channels.filter(ch => ch.is_active)
    : channels.filter(ch =>
        ch.category_id === activeCategory && ch.is_active
      );

  const value = {
    channels,
    categories,
    currentChannel,
    setCurrentChannel,
    activeCategory,
    setActiveCategory,
    filteredChannels,
    loading,
    error,
  };

  return (
    <ChannelContext.Provider value={value}>
      {children}
    </ChannelContext.Provider>
  );
}
