# AI-Powered Support Assistant 🤖

A full-stack AI-powered support assistant that answers questions based on product documentation, maintains session-wise context, and stores conversations in SQLite.
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![SQLite](https://img.shields.io/badge/Database-SQLite-lightgrey)
![Status](https://img.shields.io/badge/Status-Live-success)
## 🌐 Live Deployment

- 🔴 **Frontend (Vercel):** https://ai-powered-support-assistant-lyart.vercel.app  
- 🔴 **Backend (Railway):** https://support-assistant-backend-production.up.railway.app  
- 🔴 **Health Check:** https://support-assistant-backend-production.up.railway.app/health  

✅ The application is fully deployed and publicly accessible.

---

## ✅ APPLICATION IS WORKING!

The application is **fully functional** and ready to use right now!  
Currently running with deterministic document-based responses with LLM fallback support.

---

## 🏗️ Architecture Overview

```
User (React UI)
      ↓
Vercel Frontend
      ↓
Express Backend (Railway)
      ↓
SQLite Database
      ↓
LLM / Document Fallback
```

### 🔄 Flow

1. User sends message from React UI  
2. Backend retrieves last 5 message pairs from SQLite  
3. Relevant documentation is selected from `docs.json`  
4. Prompt is constructed and sent to LLM  
5. If answer not found → fixed fallback response  
6. Conversation stored in SQLite  

🎯 This design guarantees **zero hallucination**.

---

## 🚀 Quick Links

- **[CURRENT STATUS](CURRENT_STATUS.md)** - See what's working now! ⭐
- **[START HERE](START_HERE.md)** - Complete setup guide
- **[README_FIRST.txt](README_FIRST.txt)** - Quick visual guide
- **[TROUBLESHOOTING](TROUBLESHOOTING.md)** - Fix common issues
- **[GET NEW API KEY](GET_NEW_API_KEY.md)** - Optional: Get Gemini API key

---

## 🧠 Tech Stack

- **Frontend**: React.js  
- **Backend**: Node.js with Express  
- **Database**: SQLite  
- **LLM**: Gemini / Mock fallback  
- **Deployment**: Vercel + Railway  

---

## ✨ Features

- 💬 Real-time chat interface with AI assistant  
- 📚 Document-based answering (only responds from provided docs)  
- 🔄 Session management with conversation history  
- 💾 Persistent storage in SQLite  
- 🚦 Rate limiting per IP  
- 📱 Responsive design  
- ⏱️ Message timestamps  
- 🔢 Token usage tracking  
- 🛡️ Graceful fallback for unknown queries  

---

## 📋 Prerequisites

- Node.js (v14 or higher)  
- npm or yarn  
- Gemini/OpenAI API key (optional — mock mode works)  

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Shiva1msk/AI-Powered-Support-Assistant.git
cd AI-Powered-Support-Assistant
```

---

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

The application will open at:

```
http://localhost:3000
```

---

## 📡 API Documentation

### Base URL

```
http://localhost:3001/api
```

---

### ✅ Send Chat Message

**POST** `/api/chat`

**Request**

```json
{
  "sessionId": "abc123",
  "message": "How can I reset my password?"
}
```

**Response**

```json
{
  "reply": "Users can reset password from Settings > Security.",
  "tokensUsed": 35
}
```

---

### ✅ Get Conversation History

**GET** `/api/conversations/:sessionId`

---

### ✅ List Sessions

**GET** `/api/sessions`

---

### ✅ Health Check

**GET** `/health`

---

## 🗄️ Database Schema

### sessions

| Column | Type | Notes |
|--------|------|-------|
| id | TEXT | Primary Key (sessionId) |
| created_at | DATETIME | Auto-generated |
| updated_at | DATETIME | Auto-updated |

### messages

| Column | Type | Notes |
|--------|------|-------|
| id | INTEGER | Primary Key (autoincrement) |
| session_id | TEXT | Foreign Key |
| role | TEXT | user / assistant |
| content | TEXT | Message text |
| created_at | DATETIME | Auto-generated |

---

## 📚 Document Rule (IMPORTANT)

The assistant **ONLY** answers from `backend/docs.json`.

If information is missing, it responds:

> ❌ "Sorry, I don't have information about that."

✅ This guarantees **zero hallucination**.

---

## 🔒 Security Features

- Rate limiting (100 req / 15 min per IP)  
- Input validation  
- Parameterized SQL queries  
- CORS enabled  
- Graceful LLM fallback  

---

## 🚀 Deployment Notes

The project is deployed using:

- **Frontend:** Vercel  
- **Backend:** Railway  
- **Database:** SQLite  

### Important

- Backend binds to `process.env.PORT`  
- CORS enabled for cross-origin requests  
- Environment variables secured  
- CI warnings disabled for Vercel build  

---

## ⚠️ Known Limitations

- No authentication  
- SQLite not horizontally scalable  
- Basic keyword document matching  
- No streaming responses  
- No message editing  

🔮 These can be improved in future iterations.

---

## 🔮 Future Improvements

- 🔍 Embedding-based semantic search  
- 👥 Multi-user authentication  
- 🧠 Vector database integration  
- ⚡ Streaming responses  
- 📊 Admin analytics dashboard  
- 🌍 Multi-language support  
- 🐳 Full Docker production setup  

---

## 🧪 Testing

### Manual

- Ask questions from docs  
- Ask out-of-scope questions  
- Create new sessions  
- Refresh page  

---

## 🌟 Bonus Features Implemented

- ✅ Session management  
- ✅ Responsive UI  
- ✅ Message timestamps  
- ✅ Token tracking  
- ✅ Loading states  
- ✅ Error handling  
- ✅ Rate limiting  

---

## 👨‍💻 Author

**Weiteredge Technologies Assignment Submission**

---

## 🏁 Status

✅ Fully functional  
✅ End-to-end deployed  
✅ Meets all mandatory requirements  
