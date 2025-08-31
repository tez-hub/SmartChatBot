import React, { useState } from 'react';
import { SmartChatbot } from '../src/index.js';
import './App.css';

function App() {
  const [openaiKey, setOpenaiKey] = useState('');
  const [anthropicKey, setAnthropicKey] = useState('');
  const [geminiKey, setGeminiKey] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <h1>🤖 Smart Chatbot Demo</h1>
        <p>Test the multi-LLM chatbot component with different providers</p>
      </header>

      <div className="chatbots-container">
        {/* OpenAI Chatbot */}
        <div className="chatbot-section">
          <h3>🔵 OpenAI Chatbot</h3>
          <div className="controls">
            <input
              type="password"
              placeholder="Enter OpenAI API Key (sk-...)"
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
            />
          </div>
          {openaiKey && (
            <SmartChatbot
              provider="openai"
              apiKey={openaiKey}
              model="gpt-4o-mini"
              conversationId="demo-openai"
              theme="light"
            />
          )}
        </div>

        {/* Anthropic Chatbot */}
        <div className="chatbot-section">
          <h3>🟠 Anthropic Chatbot</h3>
          <div className="controls">
            <input
              type="password"
              placeholder="Enter Anthropic API Key (sk-ant-...)"
              value={anthropicKey}
              onChange={(e) => setAnthropicKey(e.target.value)}
            />
          </div>
          {anthropicKey && (
            <SmartChatbot
              provider="anthropic"
              apiKey={anthropicKey}
              model="claude-3-sonnet-20240229"
              conversationId="demo-anthropic"
              theme="dark"
            />
          )}
        </div>

        {/* Gemini Chatbot */}
        <div className="chatbot-section">
          <h3>🟡 Google Gemini Chatbot</h3>
          <div className="controls">
            <input
              type="password"
              placeholder="Enter Gemini API Key (AIza...)"
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
            />
          </div>
          {geminiKey && (
            <SmartChatbot
              provider="gemini"
              apiKey={geminiKey}
              model="gemini-1.5-pro"
              conversationId="demo-gemini"
              theme="light"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

