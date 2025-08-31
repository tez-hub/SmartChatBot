# 🤖 Floating Chatbot Widget

A modern, floating chatbot component that appears at the bottom of your web page, similar to the chat widgets you see on modern websites. This component supports multiple LLM providers and can be easily integrated without npm installation.

## ✨ Features

- 💬 **Floating Design**: Chat bubble icon that expands into a full chat interface
- 🎯 **Multiple Positions**: Choose from 4 corner positions (bottom-right, bottom-left, top-right, top-left)
- 🎨 **Theme Support**: Light and dark themes
- 🤖 **Multi-LLM Support**: OpenAI, Anthropic, and Google Gemini
- 📱 **Responsive**: Works perfectly on mobile and desktop
- 💾 **Persistent**: Conversations saved in localStorage
- 🚀 **No Dependencies**: Pure React component, no external packages needed

## 🚀 Quick Start (No NPM Required)

### Option 1: Direct File Copy (Recommended)

1. **Copy the source files** to your project:
   ```
   your-project/
   ├── src/
   │   ├── SmartChatbot.jsx
   │   ├── SmartChatbot.css
   │   └── llm.js
   └── your-component.jsx
   ```

2. **Import and use** in your React component:
   ```jsx
   import SmartChatbot from './src/SmartChatbot.jsx';
   import './src/SmartChatbot.css';
   
   function App() {
     return (
       <div>
         <h1>Your Website</h1>
         
         {/* Floating chatbot at bottom-right */}
         <SmartChatbot
           provider="openai"
           apiKey="your-openai-api-key"
           model="gpt-4o-mini"
           isFloating={true}
           position="bottom-right"
           theme="light"
         />
       </div>
     );
   }
   ```

### Option 2: CDN/Unpkg

If you build and publish your package:

```html
<script type="module">
  import { SmartChatbot } from 'https://unpkg.com/your-package-name@latest/dist/index.js';
</script>
```

## 📋 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `provider` | string | `'openai'` | LLM provider: `'openai'`, `'anthropic'`, or `'gemini'` |
| `apiKey` | string | - | Your API key for the selected provider |
| `model` | string | - | Model name (e.g., `'gpt-4o-mini'`, `'claude-3-sonnet'`) |
| `isFloating` | boolean | `false` | Enable floating widget behavior |
| `position` | string | `'bottom-right'` | Position: `'bottom-right'`, `'bottom-left'`, `'top-right'`, `'top-left'` |
| `theme` | string | `'light'` | Theme: `'light'` or `'dark'` |
| `conversationId` | string | `'default'` | Unique ID for conversation persistence |
| `context` | string | `''` | System context/prompt for the AI |
| `cleanMarkdown` | boolean | `true` | Remove markdown formatting from AI responses |

## 🧹 Markdown Cleaning

The chatbot automatically removes markdown formatting from AI responses to provide clean, readable text:

- **Bold formatting**: `**text**` → `text`
- **Italic formatting**: `*text*` → `text`
- **Headers**: `# Header` → `Header`
- **Code blocks**: `\`\`\`code\`\`\`` → `code`
- **Links**: `[text](url)` → `text`
- **And more...**

You can disable this feature by setting `cleanMarkdown={false}` if you want to preserve markdown formatting.

## 🎯 Position Examples

```jsx
// Bottom right (most common)
<SmartChatbot
  isFloating={true}
  position="bottom-right"
/>

// Bottom left
<SmartChatbot
  isFloating={true}
  position="bottom-left"
/>

// Top right
<SmartChatbot
  isFloating={true}
  position="top-right"
/>

// Top left
<SmartChatbot
  isFloating={true}
  position="top-left"
/>
```

## 🔑 API Key Setup

### OpenAI
1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Use format: `sk-...`

### Anthropic
1. Get your API key from [Anthropic Console](https://console.anthropic.com/)
2. Use format: `sk-ant-...`

### Google Gemini
1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Use format: `AIza...`

## 💡 Usage Examples

### Basic Floating Chatbot
```jsx
<SmartChatbot
  provider="openai"
  apiKey="sk-your-key-here"
  model="gpt-4o-mini"
  isFloating={true}
  position="bottom-right"
/>
```

### Multiple Chatbots
```jsx
function App() {
  return (
    <div>
      {/* OpenAI chatbot */}
      <SmartChatbot
        provider="openai"
        apiKey={openaiKey}
        model="gpt-4o-mini"
        isFloating={true}
        position="bottom-right"
        theme="light"
      />
      
      {/* Anthropic chatbot */}
      <SmartChatbot
        provider="anthropic"
        apiKey={anthropicKey}
        model="claude-3-sonnet"
        isFloating={true}
        position="bottom-left"
        theme="dark"
      />
    </div>
  );
}
```

### With Custom Context
```jsx
<SmartChatbot
  provider="openai"
  apiKey={apiKey}
  model="gpt-4o-mini"
  isFloating={true}
  context="You are a helpful customer support assistant for our e-commerce website."
  conversationId="customer-support"
/>
```

## 🎨 Customization

### CSS Variables
You can customize the appearance by overriding CSS variables:

```css
:root {
  --chatbot-primary-color: #007bff;
  --chatbot-secondary-color: #6c757d;
  --chatbot-border-radius: 12px;
  --chatbot-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}
```

### Custom Styling
```css
/* Custom floating bubble */
.floating-chat-bubble .chat-bubble-icon {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  width: 70px;
  height: 70px;
}

/* Custom chatbot container */
.chatbot-container.floating {
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
}
```

## 📱 Mobile Responsiveness

The floating chatbot automatically adapts to mobile devices:

- **Desktop**: 350px × 500px
- **Mobile**: Full viewport width and height (minus margins)
- **Touch-friendly**: Optimized for touch interactions

## 🔧 Advanced Features

### Conversation Persistence
```jsx
// Each conversationId creates a separate chat history
<SmartChatbot
  conversationId="user-123"
  // ... other props
/>

<SmartChatbot
  conversationId="user-456"
  // ... other props
/>
```

### Error Handling
The component automatically handles API errors and displays user-friendly error messages.

### Loading States
Shows typing indicators and loading states during API calls.

## 🚨 Requirements

- **React 18+** (peer dependency)
- **Modern browser** with ES6+ support
- **Valid API keys** for your chosen LLM provider

## 📁 File Structure

```
src/
├── SmartChatbot.jsx      # Main component
├── SmartChatbot.css      # Styles including floating widget
├── llm.js               # LLM API integration
└── index.js             # Export file
```

## 🌟 Live Demo

Check out the demo in the `demo/` folder or run:

```bash
cd demo
npm run dev
```

## 🤝 Contributing

Feel free to contribute by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests
- Improving documentation

## 📄 License

MIT License - feel free to use in your projects!

---

**💡 Pro Tip**: The floating chatbot is perfect for customer support, FAQ sections, or any website where you want to provide instant AI assistance without cluttering the main interface.
