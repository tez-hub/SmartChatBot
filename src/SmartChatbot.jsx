import React, { useState, useRef, useEffect } from 'react';
import { callLLM } from './llm.js';
import './SmartChatbot.css';

const SmartChatbot = ({
  provider = 'openai',
  apiKey,
  model,
  conversationId = 'default',
  context = '',
  theme = 'light'
}) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load conversation from localStorage if conversationId changes
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chatbot-${conversationId}`);
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Failed to load saved messages:', e);
      }
    }
  }, [conversationId]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`chatbot-${conversationId}`, JSON.stringify(messages));
  }, [messages, conversationId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      // Get conversation history for context
      const conversationHistory = [...messages, userMessage];
      
      // Call LLM API
      const response = await callLLM(provider, apiKey, model, conversationHistory, context);
      
      const assistantMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      setError(err.message);
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([]);
    setError(null);
  };

  if (!apiKey || !model) {
    return (
      <div className={`chatbot-container chatbot-${theme}`}>
        <div className="chatbot-error">
          <p>⚠️ Missing required props: apiKey and model are required</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`chatbot-container chatbot-${theme}`}>
      <div className="chatbot-header">
        <h3>Smart Chatbot ({provider})</h3>
        <button 
          onClick={clearConversation}
          className="clear-button"
          title="Clear conversation"
        >
          🗑️
        </button>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat-message ${message.role}`}
          >
            <div className="message-content">
              {message.content}
            </div>
            <div className="message-timestamp">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="chat-message assistant">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {error && (
          <div className="chat-message error">
            <div className="error-content">
              ❌ Error: {error}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          disabled={isLoading}
          className="chat-input"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="send-button"
        >
          {isLoading ? '⏳' : '📤'}
        </button>
      </form>
    </div>
  );
};

export default SmartChatbot;
