// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? window.location.origin 
    : 'http://localhost:3001');

export const API_ENDPOINTS = {
  CHAT: `${API_BASE_URL}/api/chat`,
  CONVERSATIONS: (sessionId) => `${API_BASE_URL}/api/conversations/${sessionId}`,
  SESSIONS: `${API_BASE_URL}/api/sessions`,
  HEALTH: `${API_BASE_URL}/health`
};

export default API_BASE_URL;
