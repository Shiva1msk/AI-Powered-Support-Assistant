import React, { useState, useEffect, useRef } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { API_ENDPOINTS } from '../config';
import './ChatScreen.css';

function ChatScreen({ sessionId }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Fetch conversation history when sessionId changes
    fetchConversation();
  }, [sessionId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversation = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.CONVERSATIONS(sessionId));
      if (!response.ok) throw new Error('Failed to fetch conversation');
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (err) {
      console.error('Error fetching conversation:', err);
      setMessages([]);
    }
  };

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    setError(null);
    setLoading(true);

    // Add user message to UI immediately
    const userMessage = {
      role: 'user',
      content: message,
      createdAt: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await fetch(API_ENDPOINTS.CHAT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          message
        })
      });

      if (!response.ok) {
        let errorMessage = 'Failed to send message';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();

      // Add assistant message to UI
      const assistantMessage = {
        role: 'assistant',
        content: data.reply,
        createdAt: new Date().toISOString(),
        tokensUsed: data.tokensUsed
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err.message);
      console.error('Error sending message:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-screen">
      <div className="chat-container">
        <MessageList 
          messages={messages} 
          loading={loading}
        />
        <div ref={messagesEndRef} />
      </div>
      
      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}
      
      <MessageInput 
        onSendMessage={handleSendMessage}
        disabled={loading}
      />
    </div>
  );
}

export default ChatScreen;
