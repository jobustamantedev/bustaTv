const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = {
  // Canales (públicos)
  getChannels: async () => {
    const res = await fetch(`${BASE_URL}/api/channels`);
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
    const res = await fetch(`${BASE_URL}/api/categories`);
    if (!res.ok) throw new Error('Error fetching categories');
    return res.json();
  },

  // Admin (requiere API key)
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
