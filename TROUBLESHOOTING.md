# 🔧 Troubleshooting Guide

## ❌ Error: "Proxy error" or "Unexpected token 'P'"

This means the frontend can't connect to the backend.

### Solution:

1. **Check if backend is running:**
   - Look for a terminal with "Server running on port 3001"
   - If not running, start it:
     ```bash
     cd backend
     npm run dev
     ```

2. **Restart the frontend:**
   - Stop frontend (Ctrl+C in terminal)
   - Start again:
     ```bash
     npm start
     ```

3. **Clear browser cache:**
   - Press Ctrl+Shift+R (hard refresh)
   - Or open DevTools (F12) > Network tab > Check "Disable cache"

4. **Check ports:**
   - Backend should be on port 3001
   - Frontend should be on port 3000
   - Make sure nothing else is using these ports

## ❌ Backend Crashes on Start

### Error: "Missing credentials" or "OpenAI error"

**Solution:** Make sure `backend/.env` has your Gemini API key:
```
GEMINI_API_KEY=AIzaSyDFOLi-39bkk-jFIt-xqYpa2TrS3aNc0-Q
GEMINI_MODEL=gemini-1.5-flash
```

### Error: "Cannot find module '@google/generative-ai'"

**Solution:** Install the package:
```bash
cd backend
npm install @google/generative-ai
```

## ❌ Frontend Won't Start

### Error: "Cannot find module 'react'"

**Solution:** Install dependencies:
```bash
cd frontend
npm install
```

### Error: Port 3000 already in use

**Solution:** Kill the process or use a different port:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Or set a different port
set PORT=3002 && npm start
```

## ❌ API Errors in Chat

### Error: "Failed to generate response from Gemini"

**Possible causes:**

1. **Invalid API Key:**
   - Verify at: https://makersuite.google.com/app/apikey
   - Update `backend/.env` with correct key
   - Restart backend

2. **API Quota Exceeded:**
   - Check your Gemini API usage
   - Free tier: 15 requests/minute, 1,500/day
   - Wait a few minutes and try again

3. **Network Issues:**
   - Check your internet connection
   - Try accessing https://generativelanguage.googleapis.com/

## ❌ Database Errors

### Error: "Database error" or "SQLITE_ERROR"

**Solution:** Reset the database:
```bash
cd backend/database
del support_assistant.db
cd ..
npm run dev
```

The database will be recreated automatically.

## ❌ Messages Not Persisting

### Issue: Chat history disappears on refresh

**Check:**
1. Open browser DevTools (F12)
2. Go to Application > Local Storage
3. Look for `sessionId` key
4. If missing, the frontend isn't saving it

**Solution:** Clear browser data and reload

## 🔍 Debugging Steps

### 1. Check Backend Logs
Look at the terminal running the backend for error messages.

### 2. Check Frontend Console
Open browser DevTools (F12) > Console tab for JavaScript errors.

### 3. Check Network Requests
DevTools > Network tab > Look for failed requests to `/api/chat`

### 4. Test Backend Directly
Open a new terminal and test the API:

```bash
# Test health endpoint
curl http://localhost:3001/health

# Test chat endpoint
curl -X POST http://localhost:3001/api/chat ^
  -H "Content-Type: application/json" ^
  -d "{\"sessionId\":\"test123\",\"message\":\"How do I reset my password?\"}"
```

## 🔄 Complete Reset

If nothing works, try a complete reset:

```bash
# 1. Stop all running processes (Ctrl+C in both terminals)

# 2. Clean backend
cd backend
del /f /q node_modules
del /f /q database\*.db
npm install
npm install @google/generative-ai

# 3. Clean frontend
cd ../frontend
del /f /q node_modules
npm install
npm install http-proxy-middleware

# 4. Start backend
cd ../backend
npm run dev

# 5. In new terminal, start frontend
cd frontend
npm start
```

## 📞 Still Having Issues?

Check these files are correct:

1. **backend/.env** - Has your Gemini API key
2. **backend/services/llmService.js** - Uses @google/generative-ai
3. **frontend/src/setupProxy.js** - Exists and configured
4. **frontend/package.json** - Has proxy: "http://localhost:3001"

## ✅ How to Verify Everything Works

1. Backend terminal shows: "Server running on port 3001"
2. Frontend opens at http://localhost:3000
3. You can type a message
4. AI responds within a few seconds
5. Message appears in chat history
6. Refresh page - messages still there
7. Click "New Chat" - starts fresh conversation

## 🎯 Quick Test

Send this message: "How do I reset my password?"

Expected response: Something about "Settings > Security" (from docs.json)

If you get "Sorry, I don't have information about that." - the AI is working but might need the docs updated.
