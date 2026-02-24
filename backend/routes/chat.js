const express = require('express');
const router = express.Router();
const { db } = require('../database/db');
const { generateResponse } = require('../services/llmService');

// POST /api/chat
router.post('/chat', async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    // Validation
    if (!sessionId || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: sessionId and message are required' 
      });
    }

    if (typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Message must be a non-empty string' 
      });
    }

    // Check if session exists, create if not
    db.get('SELECT id FROM sessions WHERE id = ?', [sessionId], (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error', message: err.message });
      }

      if (!row) {
        // Create new session
        db.run('INSERT INTO sessions (id) VALUES (?)', [sessionId], (err) => {
          if (err) {
            return res.status(500).json({ error: 'Failed to create session', message: err.message });
          }
        });
      }
    });

    // Store user message
    db.run(
      'INSERT INTO messages (session_id, role, content) VALUES (?, ?, ?)',
      [sessionId, 'user', message],
      async (err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to store message', message: err.message });
        }

        try {
          // Get last 5 message pairs (10 messages total)
          db.all(
            `SELECT role, content FROM messages 
             WHERE session_id = ? 
             ORDER BY created_at DESC 
             LIMIT 10`,
            [sessionId],
            async (err, rows) => {
              if (err) {
                return res.status(500).json({ error: 'Failed to fetch history', message: err.message });
              }

              const chatHistory = rows.reverse();

              // Generate AI response
              const { reply, tokensUsed } = await generateResponse(message, chatHistory);

              // Store assistant message
              db.run(
                'INSERT INTO messages (session_id, role, content) VALUES (?, ?, ?)',
                [sessionId, 'assistant', reply],
                (err) => {
                  if (err) {
                    return res.status(500).json({ error: 'Failed to store response', message: err.message });
                  }

                  // Update session timestamp
                  db.run(
                    'UPDATE sessions SET updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                    [sessionId]
                  );

                  res.json({ reply, tokensUsed });
                }
              );
            }
          );
        } catch (error) {
          res.status(500).json({ 
            error: 'LLM service error', 
            message: error.message 
          });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error', 
      message: error.message 
    });
  }
});

module.exports = router;
