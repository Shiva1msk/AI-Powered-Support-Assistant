const { GoogleGenerativeAI } = require('@google/generative-ai');
const docs = require('../docs.json');

// Initialize Gemini AI
let genAI = null;
let useGemini = true;

try {
  if (process.env.GEMINI_API_KEY) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  } else {
    console.warn('⚠️  GEMINI_API_KEY not found. Using mock responses.');
    useGemini = false;
  }
} catch (error) {
  console.error('Error initializing Gemini:', error.message);
  useGemini = false;
}

const buildPrompt = (userMessage, chatHistory) => {
  const docsContext = docs.map(doc => 
    `Title: ${doc.title}\nContent: ${doc.content}`
  ).join('\n\n');

  const historyContext = chatHistory.length > 0
    ? chatHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')
    : 'No previous conversation';

  return `You are a support assistant. You must ONLY answer questions based on the provided documentation below. If the user asks about something not covered in the documentation, respond with: "Sorry, I don't have information about that."

DOCUMENTATION:
${docsContext}

CONVERSATION HISTORY:
${historyContext}

USER QUESTION: ${userMessage}

Remember: Only use information from the documentation above. Do not make up or infer information.`;
};

// Mock response function for testing without API
const generateMockResponse = (userMessage) => {
  const lowerMessage = userMessage.toLowerCase();
  
  // Search docs for relevant content
  for (const doc of docs) {
    const titleLower = doc.title.toLowerCase();
    const contentLower = doc.content.toLowerCase();
    
    if (lowerMessage.includes('password') || lowerMessage.includes('reset')) {
      if (titleLower.includes('password') || titleLower.includes('reset')) {
        return doc.content;
      }
    }
    if (lowerMessage.includes('refund') || lowerMessage.includes('return')) {
      if (titleLower.includes('refund')) {
        return doc.content;
      }
    }
    if (lowerMessage.includes('account') || lowerMessage.includes('sign up') || lowerMessage.includes('create')) {
      if (titleLower.includes('account') || titleLower.includes('creation')) {
        return doc.content;
      }
    }
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      if (titleLower.includes('payment')) {
        return doc.content;
      }
    }
    if (lowerMessage.includes('ship') || lowerMessage.includes('delivery')) {
      if (titleLower.includes('ship')) {
        return doc.content;
      }
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('support') || lowerMessage.includes('help')) {
      if (titleLower.includes('contact') || titleLower.includes('support')) {
        return doc.content;
      }
    }
  }
  
  return "Sorry, I don't have information about that.";
};

const generateResponse = async (userMessage, chatHistory) => {
  try {
    // If Gemini is not available, use mock responses
    if (!useGemini || !genAI) {
      console.log('Using mock response (Gemini not available)');
      const reply = generateMockResponse(userMessage);
      const estimatedTokens = Math.ceil((userMessage.length + reply.length) / 4);
      return { reply, tokensUsed: estimatedTokens };
    }

    // Try to use Gemini
    const model = genAI.getGenerativeModel({ 
      model: process.env.GEMINI_MODEL || 'gemini-pro'
    });

    const prompt = buildPrompt(userMessage, chatHistory);
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Estimate tokens
    const estimatedTokens = Math.ceil((prompt.length + text.length) / 4);

    return {
      reply: text,
      tokensUsed: estimatedTokens
    };
  } catch (error) {
    console.error('LLM API Error:', error.message);
    
    // Fallback to mock response if Gemini fails
    console.log('Falling back to mock response');
    const reply = generateMockResponse(userMessage);
    const estimatedTokens = Math.ceil((userMessage.length + reply.length) / 4);
    return { reply, tokensUsed: estimatedTokens };
  }
};

module.exports = { generateResponse };
