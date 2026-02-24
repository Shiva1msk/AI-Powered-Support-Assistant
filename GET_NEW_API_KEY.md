# 🔑 Get a New Gemini API Key

## ⚠️ Current Status

Your current API key appears to be invalid or expired. The application is now running with **mock responses** (answers directly from docs.json without AI).

## ✅ Get a Fresh Gemini API Key

### Step 1: Go to Google AI Studio
Visit: **https://makersuite.google.com/app/apikey**

Or: **https://aistudio.google.com/app/apikey**

### Step 2: Sign In
- Use your Google account
- Accept terms if prompted

### Step 3: Create API Key
1. Click **"Create API Key"** button
2. Select **"Create API key in new project"** (recommended)
3. Copy the key immediately (you won't see it again!)

### Step 4: Update Your .env File

Open `backend/.env` and replace the API key:

```env
GEMINI_API_KEY=your_new_api_key_here
GEMINI_MODEL=gemini-pro
```

### Step 5: Restart Backend

```bash
# Stop backend (Ctrl+C)
cd backend
npm run dev
```

## 🧪 Test the New Key

Run this test:

```bash
cd backend
node test-gemini.js
```

Expected output:
```
Testing Gemini API...
API Key: Found
Model: gemini-pro

Sending test prompt...
Success! Response: Hello
```

## 🆓 Gemini Free Tier

- **15 requests per minute**
- **1 million tokens per minute**
- **1,500 requests per day**
- **No credit card required**

Perfect for this assignment!

## 🔄 Current Behavior (Without Valid API Key)

The application is working with **mock responses**:

- ✅ Backend is running
- ✅ Frontend can connect
- ✅ Messages are stored in database
- ✅ Responses come from docs.json directly
- ⚠️  No actual AI processing

### Mock Response Logic:
- Searches for keywords in your question
- Matches against docs.json titles/content
- Returns relevant documentation
- Falls back to "Sorry, I don't have information about that."

## 🎯 Test Without API Key

You can still test the full application:

**Questions that work:**
- "How do I reset my password?" → Returns password reset info
- "What is your refund policy?" → Returns refund policy
- "How do I create an account?" → Returns account creation info
- "What payment methods do you accept?" → Returns payment methods
- "How long does shipping take?" → Returns shipping info
- "How can I contact support?" → Returns contact info

**Questions that don't work:**
- "What's the weather?" → "Sorry, I don't have information about that."
- "Tell me a joke" → "Sorry, I don't have information about that."

## 🚀 Once You Have a Valid API Key

The application will:
- ✅ Use actual Gemini AI
- ✅ Better understand questions
- ✅ Provide more natural responses
- ✅ Handle variations in phrasing
- ✅ Maintain better context

## 🔧 Alternative: Use OpenAI Instead

If you have trouble with Gemini, you can switch to OpenAI:

### 1. Get OpenAI API Key
Visit: https://platform.openai.com/api-keys

### 2. Install OpenAI Package
```bash
cd backend
npm uninstall @google/generative-ai
npm install openai
```

### 3. Update llmService.js
Replace the Gemini code with OpenAI code (I can help with this)

### 4. Update .env
```env
OPENAI_API_KEY=your_openai_key_here
LLM_MODEL=gpt-3.5-turbo
```

## 📝 Summary

**Current state:** Application works with mock responses  
**To get AI:** Get new Gemini API key from Google AI Studio  
**Alternative:** Use OpenAI instead  

The application is fully functional for demonstration purposes even without a valid API key!
