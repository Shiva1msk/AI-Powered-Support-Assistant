import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config';
import './SessionList.css';

function SessionList({ currentSessionId, onSelectSession }) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.SESSIONS);
      if (!response.ok) throw new Error('Failed to fetch sessions');
      const data = await response.json();
      setSessions(data.sessions || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching sessions:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    
    return date.toLocaleDateString();
  };

  if (loading) {
    return <div className="session-list loading">Loading sessions...</div>;
  }

  if (error) {
    return <div className="session-list error">Error: {error}</div>;
  }

  return (
    <div className="session-list">
      <h2>Your Conversations</h2>
      {sessions.length === 0 ? (
        <div className="empty-sessions">
          <p>No conversations yet. Start a new chat!</p>
        </div>
      ) : (
        <div className="sessions-grid">
          {sessions.map((session) => (
            <div
              key={session.sessionId}
              className={`session-card ${session.sessionId === currentSessionId ? 'active' : ''}`}
              onClick={() => onSelectSession(session.sessionId)}
            >
              <div className="session-icon">💬</div>
              <div className="session-info">
                <div className="session-id">
                  {session.sessionId.substring(0, 8)}...
                </div>
                <div className="session-time">
                  {formatDate(session.lastUpdated)}
                </div>
              </div>
              {session.sessionId === currentSessionId && (
                <div className="active-badge">Active</div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SessionList;
