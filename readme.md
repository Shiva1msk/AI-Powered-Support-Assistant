# AI-Powered Support Assistant 🤖

A full-stack AI-powered support assistant that answers questions based on product documentation, maintains session-wise context, and stores conversations in SQLite.

## ✅ APPLICATION IS WORKING!

The application is **fully functional** and ready to use right now!  
Currently running with **document-based mock responses** (fallback mode).

## 🚀 Quick Links

- **[CURRENT STATUS](CURRENT_STATUS.md)** - See what's working now! ⭐
- **[START HERE](START_HERE.md)** - Complete setup guide
- **[README_FIRST.txt](README_FIRST.txt)** - Quick visual guide
- **[TROUBLESHOOTING](TROUBLESHOOTING.md)** - Fix common issues
- **[GET NEW API KEY](GET_NEW_API_KEY.md)** - Optional: Get Gemini API key

## 🧠 Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: SQLite
- **LLM**: OpenAI (configurable for other providers)

## ✨ Features

- 💬 Real-time chat interface with AI assistant
- 📚 Document-based answering (only responds from provided docs)
- 🔄 Session management with conversation history
- 💾 Persistent storage in SQLite
- 🚦 Rate limiting per IP
- 📱 Responsive design
- ⏱️ Message timestamps
- 🔢 Token usage tracking

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key (or other LLM provider)

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` and add your API key:

```
PORT=3001
OPENAI_API_KEY=your_openai_api_key_here
LLM_MODEL=gpt-3.5-turbo
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

The application will open at `http://localhost:3000`

## 📡 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### 1. Send Chat Message
```http
POST /api/chat
```

**Request Body:**
```json
{
  "sessionId": "abc123",
  "message": "How can I reset my password?"
}
```

**Response:**
```json
{
  "reply": "Users can reset password from Settings > Security.",
  "tokensUsed": 123
}
```

**Error Responses:**
- `400`: Missing sessionId or message
- `500`: Database error or LLM service error

#### 2. Get Conversation History
```http
GET /api/conversations/:sessionId
```

**Response:**
```json
{
  "messages": [
    {
      "id": 1,
      "role": "user",
      "content": "How can I reset my password?",
      "createdAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "id": 2,
      "role": "assistant",
      "content": "Users can reset password from Settings > Security.",
      "createdAt": "2024-01-15T10:30:05.000Z"
    }
  ]
}
```

#### 3. List All Sessions
```http
GET /api/sessions
```

**Response:**
```json
{
  "sessions": [
    {
      "sessionId": "abc123",
      "createdAt": "2024-01-15T10:00:00.000Z",
      "lastUpdated": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

#### 4. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "ok"
}
```

## 🗄️ Database Schema

### Tables

#### sessions
| Column | Type | Notes |
|--------|------|-------|
| id | TEXT | Primary Key (sessionId) |
| created_at | DATETIME | Auto-generated |
| updated_at | DATETIME | Auto-updated |

#### messages
| Column | Type | Notes |
|--------|------|-------|
| id | INTEGER | Primary Key (autoincrement) |
| session_id | TEXT | Foreign Key to sessions.id |
| role | TEXT | "user" or "assistant" |
| content | TEXT | Message content |
| created_at | DATETIME | Auto-generated |

## 📚 Document Management

The assistant answers questions based on `backend/docs.json`. To add or modify documentation:

1. Edit `backend/docs.json`
2. Follow this format:

```json
[
  {
    "title": "Topic Title",
    "content": "Detailed information about the topic."
  }
]
```

3. Restart the backend server

**Important**: The assistant will ONLY answer questions based on this documentation. If information is not in the docs, it responds: "Sorry, I don't have information about that."

## 🔒 Security Features

- Rate limiting: 100 requests per 15 minutes per IP
- Input validation on all endpoints
- SQL injection prevention via parameterized queries
- CORS enabled for frontend-backend communication

## 🎨 Frontend Components

- **App.js**: Main application container with session management
- **ChatScreen.js**: Chat interface with message display and input
- **MessageList.js**: Displays conversation history with timestamps
- **MessageInput.js**: Input field with send button
- **SessionList.js**: View and switch between conversation sessions

## 🔧 Configuration

### Changing LLM Provider

The application is configured for OpenAI by default. To use other providers:

1. Install the appropriate SDK
2. Modify `backend/services/llmService.js`
3. Update environment variables in `.env`

### Adjusting Context Window

The system maintains the last 5 message pairs (10 messages) as context. To change this:

Edit `backend/routes/chat.js`, line with `LIMIT 10` and adjust the number.

## 🧪 Testing

### Manual Testing

1. Start both frontend and backend
2. Open browser to `http://localhost:3000`
3. Test scenarios:
   - Ask questions from docs.json
   - Ask questions NOT in docs (should get "Sorry..." response)
   - Create new chat sessions
   - View session history
   - Refresh page (session should persist)

### API Testing with curl

```bash
# Send a message
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"test123","message":"How do I reset my password?"}'

# Get conversation history
curl http://localhost:3001/api/conversations/test123

# List sessions
curl http://localhost:3001/api/sessions
```

## 📁 Project Structure

```
.
├── backend/
│   ├── database/
│   │   ├── db.js                 # Database initialization
│   │   └── support_assistant.db  # SQLite database (auto-generated)
│   ├── routes/
│   │   ├── chat.js               # Chat endpoint
│   │   └── sessions.js           # Session endpoints
│   ├── services/
│   │   └── llmService.js         # LLM integration
│   ├── docs.json                 # Product documentation
│   ├── server.js                 # Express server
│   ├── package.json
│   ├── .env.example
│   └── .env                      # Your environment variables
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatScreen.js
│   │   │   ├── ChatScreen.css
│   │   │   ├── MessageList.js
│   │   │   ├── MessageList.css
│   │   │   ├── MessageInput.js
│   │   │   ├── MessageInput.css
│   │   │   ├── SessionList.js
│   │   │   └── SessionList.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── readme.md
```

## 🎯 Key Implementation Details

### Session Management
- SessionId generated using UUID v4
- Stored in browser's localStorage
- Persists across page refreshes
- New chat creates new sessionId

### Context Handling
- Last 5 user+assistant message pairs retrieved from SQLite
- Sent to LLM with each request
- Ensures conversation continuity

### Document-Only Responses
- System prompt enforces strict adherence to docs.json
- LLM instructed to respond with specific message for out-of-scope questions
- Temperature set to 0.3 for consistent, factual responses

### Error Handling
- All endpoints have try-catch blocks
- Database errors return 500 with error message
- Missing parameters return 400 with validation message
- LLM failures gracefully handled

## 🚨 Assumptions

1. Single user per session (no authentication)
2. Sessions never expire (can be added)
3. No message editing or deletion
4. English language only
5. Text-only messages (no file uploads)
6. OpenAI API as default LLM provider
7. Local development environment

## 🌟 Bonus Features Implemented

- ✅ Session management with history
- ✅ Responsive UI design
- ✅ Message timestamps
- ✅ Token usage tracking
- ✅ Loading states
- ✅ Error handling and display
- ✅ Rate limiting

## 🐛 Troubleshooting

### Backend won't start
- Check if port 3001 is available
- Verify .env file exists with valid API key
- Run `npm install` in backend directory

### Frontend won't start
- Check if port 3000 is available
- Run `npm install` in frontend directory
- Clear browser cache

### Database errors
- Delete `backend/database/support_assistant.db` and restart backend
- Check file permissions

### LLM not responding
- Verify API key in .env
- Check API quota/billing
- Review backend console for error messages

## 📝 License

MIT

## 👥 Author

Weitredge Assignment Submission
