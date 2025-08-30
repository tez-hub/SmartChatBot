# Smart Chatbot

A React component for building smart chatbots with support for OpenAI, Anthropic, and Google Gemini LLM providers.

## Features

- 🤖 **Multi-LLM Support**: OpenAI, Anthropic, and Google Gemini
- 💬 **Real-time Chat**: Interactive chat interface with typing indicators
- 🎨 **Theme Support**: Light and dark themes
- 💾 **Conversation Memory**: Persistent chat history per conversation
- 🔧 **Easy Integration**: Simple props-based configuration
- 📱 **Responsive Design**: Mobile-friendly chat interface

## Installation

```bash
npm install smart-chatbot
```

## Quick Start

```jsx
import { SmartChatbot } from 'smart-chatbot';

function App() {
  return (
    <SmartChatbot
      provider="openai"
      apiKey="your-openai-api-key"
      model="gpt-4o-mini"
      conversationId="user-123"
      theme="light"
    />
  );
}
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `provider` | `"openai" \| "gemini" \| "anthropic"` | ✅ | `"openai"` | LLM provider to use |
| `apiKey` | `string` | ✅ | - | API key for the selected provider |
| `model` | `string` | ✅ | - | Model name (e.g., "gpt-4o-mini", "claude-3-sonnet") |
| `conversationId` | `string` | ❌ | `"default"` | Unique identifier for conversation persistence |
| `context` | `string` | ❌ | `""` | Additional context/domain knowledge for the AI |
| `theme` | `"light" \| "dark"` | ❌ | `"light"` | UI theme |

## LLM Provider Setup

### OpenAI
```jsx
<SmartChatbot
  provider="openai"
  apiKey="sk-..."
  model="gpt-4o-mini"
/>
```

**Supported Models**: `gpt-4o`, `gpt-4o-mini`, `gpt-4-turbo`, `gpt-3.5-turbo`

### Anthropic
```jsx
<SmartChatbot
  provider="anthropic"
  apiKey="sk-ant-..."
  model="claude-3-sonnet-20240229"
/>
```

**Supported Models**: `claude-3-opus`, `claude-3-sonnet`, `claude-3-haiku`

### Google Gemini
```jsx
<SmartChatbot
  provider="gemini"
  apiKey="AIza..."
  model="gemini-1.5-pro"
/>
```

**Supported Models**: `gemini-1.5-pro`, `gemini-1.5-flash`, `gemini-pro`

## Advanced Usage

### With Context
```jsx
<SmartChatbot
  provider="openai"
  apiKey="your-api-key"
  model="gpt-4o-mini"
  context="You are a helpful customer service agent for an e-commerce company. Always be polite and helpful."
/>
```

### Multiple Conversations
```jsx
function App() {
  const [currentUser, setCurrentUser] = useState('user-1');
  
  return (
    <div>
      <button onClick={() => setCurrentUser('user-1')}>User 1</button>
      <button onClick={() => setCurrentUser('user-2')}>User 2</button>
      
      <SmartChatbot
        provider="openai"
        apiKey="your-api-key"
        model="gpt-4o-mini"
        conversationId={currentUser}
      />
    </div>
  );
}
```

### Theme Switching
```jsx
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
      
      <SmartChatbot
        provider="openai"
        apiKey="your-api-key"
        model="gpt-4o-mini"
        theme={theme}
      />
    </div>
  );
}
```

## Styling

The component includes built-in CSS with the following classes:

- `.chatbot-container` - Main container
- `.chat-message.user` - User message styling
- `.chat-message.assistant` - Assistant message styling
- `.chat-input` - Input field styling
- `.send-button` - Send button styling

You can override these styles by importing the CSS file and customizing the classes:

```css
/* Custom styles */
.chatbot-container {
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.chat-message.user {
  background-color: #10b981;
}
```

## API Key Security

⚠️ **Important**: Never expose your API keys in client-side code for production applications. Consider using:

- Environment variables (for development)
- Backend proxy endpoints
- API key management services
- Server-side rendering

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Development

```bash
# Clone the repository
git clone <repository-url>
cd smart-chatbot

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
