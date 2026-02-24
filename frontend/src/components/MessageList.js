import React from 'react';
import './MessageList.css';

function MessageList({ messages, loading }) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="message-list">
      {messages.length === 0 && !loading && (
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <h3>Start a conversation</h3>
          <p>Ask me anything about our products and services!</p>
        </div>
      )}

      {messages.map((msg, index) => (
        <div 
          key={index} 
          className={`message ${msg.role}`}
        >
          <div className="message-content">
            <div className="message-text">{msg.content}</div>
            <div className="message-meta">
              <span className="message-time">
                {formatTime(msg.createdAt)}
              </span>
              {msg.tokensUsed && (
                <span className="message-tokens">
                  {msg.tokensUsed} tokens
                </span>
              )}
            </div>
          </div>
        </div>
      ))}

      {loading && (
        <div className="message assistant">
          <div className="message-content">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MessageList;
