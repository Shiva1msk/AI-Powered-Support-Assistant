@echo off
echo Testing Backend Connection...
echo.

echo 1. Testing Health Endpoint...
curl -s http://localhost:3001/health
echo.
echo.

echo 2. Testing Chat Endpoint...
curl -s -X POST http://localhost:3001/api/chat -H "Content-Type: application/json" -d "{\"sessionId\":\"test123\",\"message\":\"How do I reset my password?\"}"
echo.
echo.

echo 3. Testing Sessions Endpoint...
curl -s http://localhost:3001/api/sessions
echo.
echo.

echo If you see JSON responses above, the backend is working!
echo If you see errors, make sure backend is running: cd backend && npm run dev
pause
