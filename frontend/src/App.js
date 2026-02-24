import React, { useState, useEffect } from 'react';
import ChatScreen from './components/ChatScreen';
import SessionList from './components/SessionList';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const [sessionId, setSessionId] = useState('');
  const [showSessions, setShowSessions] = useState(false);

  useEffect(() => {
    // Get or create sessionId
    let storedSessionId = localStorage.getItem('sessionId');
    if (!storedSessionId) {
      storedSessionId = uuidv4();
      localStorage.setItem('sessionId', storedSessionId);
    }
    setSessionId(storedSessionId);
  }, []);

  const handleNewChat = () => {
    const newSessionId = uuidv4();
    localStorage.setItem('sessionId', newSessionId);
    setSessionId(newSessionId);
    setShowSessions(false);
  };

  const handleSelectSession = (selectedSessionId) => {
    localStorage.setItem('sessionId', selectedSessionId);
    setSessionId(selectedSessionId);
    setShowSessions(false);
  };

  if (!sessionId) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>🤖 Support Assistant</h1>
        <div className="header-actions">
          <button 
            className="btn-secondary"
            onClick={() => setShowSessions(!showSessions)}
          >
            {showSessions ? 'Hide Sessions' : 'View Sessions'}
          </button>
          <button 
            className="btn-primary"
            onClick={handleNewChat}
          >
            + New Chat
          </button>
        </div>
      </header>
      
      <main className="app-main">
        {showSessions ? (
          <SessionList 
            currentSessionId={sessionId}
            onSelectSession={handleSelectSession}
          />
        ) : (
          <ChatScreen sessionId={sessionId} />
        )}
      </main>
    </div>
  );
}

export default App;
