/**
 * LLM API wrapper for OpenAI, Anthropic, and Google Gemini
 */

const OPENAI_BASE_URL = 'https://api.openai.com/v1';
const ANTHROPIC_BASE_URL = 'https://api.anthropic.com/v1';
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta';

/**
 * Convert messages to OpenAI format
 */
function formatMessagesForOpenAI(messages, context = '') {
  const formattedMessages = [];
  
  if (context) {
    formattedMessages.push({
      role: 'system',
      content: context
    });
  }
  
  return formattedMessages.concat(messages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: msg.content
  })));
}

/**
 * Convert messages to Anthropic format
 */
function formatMessagesForAnthropic(messages, context = '') {
  const formattedMessages = [];
  
  if (context) {
    formattedMessages.push({
      role: 'user',
      content: `Context: ${context}\n\nPlease use this context to provide more accurate responses.`
    });
  }
  
  return formattedMessages.concat(messages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'assistant',
    content: msg.content
  })));
}

/**
 * Convert messages to Gemini format
 */
function formatMessagesForGemini(messages, context = '') {
  const formattedMessages = [];
  
  if (context) {
    formattedMessages.push({
      role: 'user',
      parts: [{ text: `Context: ${context}\n\nPlease use this context to provide more accurate responses.` }]
    });
  }
  
  return formattedMessages.concat(messages.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  })));
}

/**
 * Call OpenAI API
 */
async function callOpenAI(apiKey, model, messages, context) {
  const response = await fetch(`${OPENAI_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      messages: formatMessagesForOpenAI(messages, context),
      temperature: 0.7,
      max_tokens: 1000
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * Call Anthropic API
 */
async function callAnthropic(apiKey, model, messages, context) {
  const response = await fetch(`${ANTHROPIC_BASE_URL}/messages`, {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model,
      messages: formatMessagesForAnthropic(messages, context),
      max_tokens: 1000
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Anthropic API error: ${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.content[0].text;
}

/**
 * Call Google Gemini API
 */
async function callGemini(apiKey, model, messages, context) {
  const response = await fetch(`${GEMINI_BASE_URL}/models/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: formatMessagesForGemini(messages, context),
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000
      }
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Gemini API error: ${error.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

/**
 * Main function to call the appropriate LLM API
 */
export async function callLLM(provider, apiKey, model, messages, context = '') {
  try {
    switch (provider) {
      case 'openai':
        return await callOpenAI(apiKey, model, messages, context);
      case 'anthropic':
        return await callAnthropic(apiKey, model, messages, context);
      case 'gemini':
        return await callGemini(apiKey, model, messages, context);
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }
  } catch (error) {
    console.error('LLM API call failed:', error);
    throw error;
  }
}
