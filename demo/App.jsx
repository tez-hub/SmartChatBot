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

      <div className="demo-sections">
        {/* Floating Chatbot Section */}
        <div className="demo-section">
          <h2>🚀 Floating Chatbot Widget</h2>
          <p>This chatbot appears as a floating widget at the bottom of the page</p>
          
          <div className="api-key-inputs">
            <div className="input-group">
              <label>OpenAI API Key:</label>
              <input
                type="password"
                placeholder="Enter OpenAI API Key (sk-...)"
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Anthropic API Key:</label>
              <input
                type="password"
                placeholder="Enter Anthropic API Key (sk-ant-...)"
                value={anthropicKey}
                onChange={(e) => setAnthropicKey(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label>Gemini API Key:</label>
              <input
                type="password"
                placeholder="Enter Gemini API Key (AIza...)"
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
              />
            </div>
          </div>

          {/* Floating Chatbot - will appear at bottom-right */}
          {openaiKey && (
            <SmartChatbot
              provider="openai"
              apiKey={openaiKey}
              model="gpt-4o-mini"
              conversationId="floating-openai"
              theme="light"
              isFloating={true}
              position="bottom-right"
            />
          )}
        </div>

        {/* Embedded Chatbots Section */}
        <div className="demo-section">
          <h2>📱 Embedded Chatbots</h2>
          <p>Traditional embedded chatbots for comparison</p>
          
          <div className="chatbots-container">
            {/* OpenAI Chatbot */}
            <div className="chatbot-section">
              <h3>🔵 OpenAI Chatbot</h3>
              {openaiKey && (
                <SmartChatbot
                  provider="openai"
                  apiKey={openaiKey}
                  model="gpt-4o-mini"
                  conversationId="demo-openai"
                  theme="light"
                  isFloating={false}
                />
              )}
            </div>

            {/* Anthropic Chatbot */}
            <div className="chatbot-section">
              <h3>🟠 Anthropic Chatbot</h3>
              {anthropicKey && (
                <SmartChatbot
                  provider="anthropic"
                  apiKey={anthropicKey}
                  model="claude-3-sonnet-20240229"
                  conversationId="demo-anthropic"
                  theme="dark"
                  isFloating={false}
                />
              )}
            </div>

            {/* Gemini Chatbot */}
            <div className="chatbot-section">
              <h3>🟡 Google Gemini Chatbot</h3>
              {geminiKey && (
                <SmartChatbot
                  provider="gemini"
                  apiKey={geminiKey}
                  model="gemini-1.5-pro"
                  conversationId="demo-gemini"
                  theme="light"
                  isFloating={false}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Additional floating chatbot examples with different positions */}
      {anthropicKey && (
        <SmartChatbot
          provider="anthropic"
          apiKey={anthropicKey}
          model="claude-3-sonnet-20240229"
          conversationId="floating-anthropic"
          theme="dark"
          isFloating={true}
          position="bottom-left"
        />
      )}

      {geminiKey && (
        <SmartChatbot
          provider="gemini"
          apiKey={geminiKey}
          model="gemini-1.5-pro"
          conversationId="floating-gemini"
          theme="light"
          isFloating={true}
          position="top-right"
        />
      )}
    </div>
  );
}

export default App;

