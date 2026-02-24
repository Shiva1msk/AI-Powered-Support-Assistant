const express = require('express');
const router = express.Router();
const { db } = require('../database/db');

// GET /api/sessions - List all sessions
router.get('/sessions', (req, res) => {
  db.all(
    `SELECT id as sessionId, created_at as createdAt, updated_at as lastUpdated 
     FROM sessions 
     ORDER BY updated_at DESC`,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ 
          error: 'Database error', 
          message: err.message 
        });
      }
      res.json({ sessions: rows });
    }
  );
});

// GET /api/conversations/:sessionId - Get conversation history
router.get('/conversations/:sessionId', (req, res) => {
  const { sessionId } = req.params;

  if (!sessionId) {
    return res.status(400).json({ 
      error: 'Missing sessionId parameter' 
    });
  }

  db.all(
    `SELECT id, role, content, created_at as createdAt 
     FROM messages 
     WHERE session_id = ? 
     ORDER BY created_at ASC`,
    [sessionId],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ 
          error: 'Database error', 
          message: err.message 
        });
      }
      res.json({ messages: rows });
    }
  );
});

module.exports = router;
