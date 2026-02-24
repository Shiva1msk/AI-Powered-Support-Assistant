# 🔧 Fix: "Proxy error" / "Unexpected token 'P'"

## What's Happening?

The error "Unexpected token 'P', 'Proxy erro'... is not valid JSON" means:
- Frontend is trying to connect to backend
- Backend is not responding (not running or crashed)
- Frontend gets an HTML error page instead of JSON
- JavaScript tries to parse HTML as JSON → Error!

## ✅ Solution (Follow in Order)

### 1. Make Sure Backend is Running

**Check your terminals:**
- Do you have a terminal showing "Server running on port 3001"?
- If NO → Backend is not running!

**Start the backend:**
```bash
cd backend
npm run dev
```

**Wait for:**
```
Server running on port 3001
Database initialized successfully
```

✅ **KEEP THIS TERMINAL OPEN!**

---

### 2. Restart Frontend

**In the frontend terminal:**
- Press `Ctrl+C` to stop
- Run again:
```bash
npm start
```

---

### 3. Hard Refresh Browser

Once frontend starts:
- Press `Ctrl+Shift+R` (Windows/Linux)
- Or `Cmd+Shift+R` (Mac)
- This clears cache and reloads

---

### 4. Test Again

Type: "How do I reset my password?"

**Expected:** AI responds with password reset instructions

**If still error:** Continue below ⬇️

---

## 🔍 Advanced Debugging

### Check if Backend is Actually Running

Open a NEW terminal and run:

```bash
curl http://localhost:3001/health
```

**Expected output:**
```json
{"status":"ok"}
```

**If you get an error:**
- Backend is not running
- Go back to Step 1

---

### Check Backend Logs

Look at the backend terminal for errors like:

❌ **"Missing credentials"**
- Fix: Check `backend/.env` has `GEMINI_API_KEY`

❌ **"Cannot find module '@google/generative-ai'"**
- Fix: Run `cd backend && npm install @google/generative-ai`

❌ **"Port 3001 is already in use"**
- Fix: Kill the process or change port in `backend/.env`

---

### Check Frontend Proxy Setup

1. **Verify setupProxy.js exists:**
   - File: `frontend/src/setupProxy.js`
   - Should exist (I created it)

2. **Verify package.json has proxy:**
   - File: `frontend/package.json`
   - Should have: `"proxy": "http://localhost:3001"`

3. **Reinstall if needed:**
```bash
cd frontend
npm install http-proxy-middleware
```

---

## 🎯 Complete Reset (If Nothing Works)

Stop everything and start fresh:

```bash
# Stop all terminals (Ctrl+C)

# Terminal 1 - Backend
cd backend
npm install @google/generative-ai
npm run dev

# Wait for "Server running on port 3001"

# Terminal 2 - Frontend  
cd frontend
npm install http-proxy-middleware
npm start

# Wait for browser to open
```

---

## 🧪 Test Backend Manually

Run this script to test backend:

**Windows:**
```bash
test_backend.bat
```

**Or manually:**
```bash
# Test 1: Health check
curl http://localhost:3001/health

# Test 2: Chat endpoint
curl -X POST http://localhost:3001/api/chat ^
  -H "Content-Type: application/json" ^
  -d "{\"sessionId\":\"test123\",\"message\":\"How do I reset my password?\"}"
```

If these work, backend is fine. Problem is frontend connection.

---

## 📱 Check Browser Console

1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors
4. Common issues:
   - "Failed to fetch" → Backend not running
   - "CORS error" → Backend CORS not configured (should be fine)
   - "Network error" → Check backend terminal

---

## 🔄 Typical Workflow

**Every time you work on this project:**

1. **Start backend first:**
   ```bash
   cd backend
   npm run dev
   ```
   Wait for "Server running on port 3001"

2. **Then start frontend:**
   ```bash
   cd frontend
   npm start
   ```
   Browser opens automatically

3. **Test with a message**

4. **When done:**
   - Ctrl+C in both terminals
   - Next time, repeat steps 1-3

---

## ✅ Success Indicators

You'll know it's working when:

1. ✅ Backend terminal: "Server running on port 3001"
2. ✅ Frontend terminal: "Compiled successfully!"
3. ✅ Browser opens to localhost:3000
4. ✅ You can type and send messages
5. ✅ AI responds within 2-3 seconds
6. ✅ No errors in browser console (F12)

---

## 🆘 Still Not Working?

1. **Check both terminals are running**
2. **Check backend/.env has your API key**
3. **Try the complete reset above**
4. **Check TROUBLESHOOTING.md for more solutions**

---

## 💡 Pro Tip

Keep both terminals visible side-by-side so you can see:
- Left: Backend logs
- Right: Frontend logs

This helps you spot errors immediately!

---

**The proxy error should be fixed now! Try starting both servers again.** 🚀
