// Detectar URL del backend dinámicamente
const BASE_URL = (() => {
  // Si hay variable de entorno, usarla
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // Si estamos en localhost (desarrollo), usar localhost:8000
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8000';
  }
  // Si estamos en Docker, usar el mismo host
  return `http://${window.location.hostname}:8000`;
})();

export const api = {
  // Canales (públicos)
  getChannels: async () => {
    const res = await fetch(`${BASE_URL}/api/channels/`);
    if (!res.ok) throw new Error('Error fetching channels');
    return res.json();
  },

  getChannel: async (id) => {
    const res = await fetch(`${BASE_URL}/api/channels/${id}`);
    if (!res.ok) throw new Error('Error fetching channel');
    return res.json();
  },

  // Categorías (públicas)
  getCategories: async () => {
    const res = await fetch(`${BASE_URL}/api/categories/`);
    if (!res.ok) throw new Error('Error fetching categories');
    return res.json();
  },

  // Admin (requiere API key)
  validateApiKey: async (apiKey) => {
    const res = await fetch(`${BASE_URL}/api/channels`, {
      headers: { 'X-API-Key': apiKey },
    });
    if (res.status === 401) {
      throw new Error('API Key inválida');
    }
    if (!res.ok) throw new Error('Error validating API Key');
    return res.json();
  },

  createChannel: async (data, apiKey) => {
    const res = await fetch(`${BASE_URL}/api/channels`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error creating channel');
    return res.json();
  },

  updateChannel: async (id, data, apiKey) => {
    const res = await fetch(`${BASE_URL}/api/channels/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Error updating channel');
    return res.json();
  },

  deleteChannel: async (id, apiKey) => {
    const res = await fetch(`${BASE_URL}/api/channels/${id}`, {
      method: 'DELETE',
      headers: { 'X-API-Key': apiKey },
    });
    if (!res.ok) throw new Error('Error deleting channel');
  },
};
