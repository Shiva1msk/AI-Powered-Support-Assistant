# 🚀 START HERE - Complete Setup Guide

## 📋 Current Status

✅ Backend code configured for Gemini API  
✅ Frontend code ready  
✅ Gemini API key configured  
✅ Database setup ready  

## 🎯 3-Step Setup

### Step 1: Start Backend

Open a terminal and run:

```bash
cd backend
npm run dev
```

**Expected output:**
```
Server running on port 3001
Database initialized successfully
```

**If you see errors**, check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

⚠️ **KEEP THIS TERMINAL OPEN!** Don't close it.

---

### Step 2: Start Frontend

Open a **NEW terminal** (keep backend running) and run:

```bash
cd frontend
npm start
```

**Expected output:**
```
Compiled successfully!
You can now view frontend in the browser.
Local: http://localhost:3000
```

Browser should automatically open to http://localhost:3000

⚠️ **KEEP THIS TERMINAL OPEN TOO!**

---

### Step 3: Test the Application

Once the browser opens:

1. **Type a message:** "How do I reset my password?"
2. **Click send** (➤ button)
3. **Wait 2-3 seconds** for AI response
4. **You should see:** Information about resetting password from Settings > Security

## ✅ Success Checklist

- [ ] Backend terminal shows "Server running on port 3001"
- [ ] Frontend opens in browser at localhost:3000
- [ ] You can type and send messages
- [ ] AI responds to your questions
- [ ] Messages show timestamps
- [ ] "New Chat" button works
- [ ] "View Sessions" button works
- [ ] Messages persist after page refresh

## 🧪 Test Questions

### Should Work (from documentation):
- "How do I reset my password?"
- "What is your refund policy?"
- "How do I create an account?"
- "What payment methods do you accept?"
- "How long does shipping take?"
- "How can I contact support?"

### Should Return "Sorry, I don't have information about that.":
- "What's the weather today?"
- "Tell me a joke"
- "What is Python?"
- "Who won the World Cup?"

## 🎨 Features to Explore

1. **Chat Interface**
   - Type messages in the input box
   - See user messages on the right (purple)
   - See AI responses on the left (gray)
   - Timestamps on each message

2. **New Chat**
   - Click "New Chat" button
   - Starts a fresh conversation
   - Old chat is saved

3. **View Sessions**
   - Click "View Sessions" button
   - See all your past conversations
   - Click any session to continue it

4. **Persistence**
   - Refresh the page
   - Your current chat remains
   - All messages are saved in SQLite

## 🔧 If Something Goes Wrong

### Backend won't start?
```bash
cd backend
npm install @google/generative-ai
npm run dev
```

### Frontend won't start?
```bash
cd frontend
npm install
npm start
```

### Getting "Proxy error"?
1. Make sure backend is running first
2. Restart frontend (Ctrl+C, then `npm start`)
3. Hard refresh browser (Ctrl+Shift+R)

### Still stuck?
See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for detailed solutions.

## 📁 Project Structure

```
.
├── backend/                    # Node.js + Express server
│   ├── database/              # SQLite database
│   ├── routes/                # API endpoints
│   ├── services/              # Gemini AI integration
│   ├── docs.json              # Product documentation
│   ├── server.js              # Main server file
│   └── .env                   # Your API key (DO NOT COMMIT!)
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── App.js             # Main app
│   │   └── setupProxy.js      # Proxy configuration
│   └── package.json
│
├── readme.md                   # Full documentation
├── START_HERE.md              # This file
├── QUICK_START.md             # Quick reference
├── TROUBLESHOOTING.md         # Problem solutions
└── test_backend.bat           # Backend test script
```

## 🎓 How It Works

1. **User types message** in React frontend
2. **Frontend sends** message to backend via `/api/chat`
3. **Backend:**
   - Saves message to SQLite
   - Gets last 5 message pairs for context
   - Sends to Gemini API with documentation
   - Gets AI response
   - Saves response to SQLite
   - Returns to frontend
4. **Frontend displays** the response
5. **Everything is saved** - refresh works!

## 🔑 Your Configuration

- **LLM Provider:** Google Gemini
- **Model:** gemini-1.5-flash (fast & free!)
- **Backend Port:** 3001
- **Frontend Port:** 3000
- **Database:** SQLite (auto-created)
- **API Key:** Configured in backend/.env

## 📊 API Endpoints

- `POST /api/chat` - Send message, get AI response
- `GET /api/conversations/:sessionId` - Get chat history
- `GET /api/sessions` - List all sessions
- `GET /health` - Check if backend is running

## 🎯 Assignment Requirements Met

✅ Frontend: React.js  
✅ Backend: Node.js with Express  
✅ Database: SQLite with proper schema  
✅ LLM: Gemini API integration  
✅ Document-based answering only  
✅ Session management with localStorage  
✅ Context maintenance (last 5 pairs)  
✅ Rate limiting (100 req/15min)  
✅ Error handling  
✅ Conversation persistence  
✅ Timestamps  
✅ Token usage tracking  

## 🚀 Ready to Start?

1. Open terminal → `cd backend && npm run dev`
2. Open new terminal → `cd frontend && npm start`
3. Browser opens → Start chatting!

**Need help?** Check [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

**Good luck with your assignment! 🎉**
