# 🚀 Quick Start Guide

## ✅ Backend is Running!

Your backend is successfully running on port 3001 with Gemini API!

## 📋 Next Steps

### 1. Keep Backend Running
The backend is already running. Keep that terminal open.

### 2. Start Frontend

Open a **NEW terminal** and run:

```bash
cd frontend
npm install
npm start
```

The React app will open at `http://localhost:3000`

## 🧪 Test the Application

Once the frontend loads, try these questions:

### ✅ Questions that SHOULD work (from docs.json):
- "How do I reset my password?"
- "What is your refund policy?"
- "How do I create an account?"
- "What payment methods do you accept?"
- "How long does shipping take?"
- "How can I contact support?"

### ❌ Questions that should return "Sorry, I don't have information about that.":
- "What's the weather today?"
- "Tell me a joke"
- "What is Python?"
- "Who is the president?"

## 🎯 Features to Test

1. **Send Messages**: Type and send questions
2. **View Responses**: AI responds based on documentation
3. **New Chat**: Click "New Chat" button to start fresh session
4. **View Sessions**: Click "View Sessions" to see all conversations
5. **Session Persistence**: Refresh page - your chat should remain
6. **Timestamps**: Each message shows when it was sent
7. **Token Count**: Assistant messages show tokens used

## 🔧 If Frontend Won't Start

If you get errors, try:

```bash
cd frontend
npm install react react-dom react-scripts uuid
npm start
```

## 📊 What's Happening Behind the Scenes

1. **Frontend** (React) sends your message to backend
2. **Backend** (Express) receives message and:
   - Stores it in SQLite database
   - Retrieves last 5 message pairs for context
   - Sends to Gemini API with documentation
   - Stores AI response in database
   - Returns response to frontend
3. **Frontend** displays the response

## 🎉 Success Indicators

You'll know it's working when:
- ✅ Backend shows: "Server running on port 3001"
- ✅ Frontend opens in browser at localhost:3000
- ✅ You can type and send messages
- ✅ AI responds to your questions
- ✅ Messages persist after page refresh

## ⚠️ Common Issues

### "Cannot connect to backend"
- Make sure backend terminal is still running
- Check backend shows "Server running on port 3001"

### "Network Error"
- Backend might have crashed
- Restart backend: `cd backend && npm run dev`

### "API Error"
- Check your Gemini API key in `backend/.env`
- Verify at: https://makersuite.google.com/app/apikey

## 📝 Your Configuration

- **Backend**: Port 3001 ✅ Running
- **Frontend**: Port 3000 (will start next)
- **Database**: SQLite (auto-created)
- **LLM**: Google Gemini (gemini-1.5-flash)
- **API Key**: Configured ✅

Ready to start the frontend? Run:
```bash
cd frontend
npm install
npm start
```
