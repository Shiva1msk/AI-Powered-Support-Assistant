# 🚀 Quick Deploy Guide

## 🐳 Docker (Easiest - 2 Minutes)

### Prerequisites:
- Docker and Docker Compose installed
- Your Gemini API key

### Steps:
```bash
# 1. Make deploy script executable
chmod +x deploy.sh

# 2. Run deployment
./deploy.sh

# 3. Follow prompts to add your API key
# 4. Your app will be running at http://localhost
```

## ☁️ Railway (Free Cloud - 5 Minutes)

### Steps:
1. **Sign up**: [railway.app](https://railway.app)
2. **New Project** → **Deploy from GitHub repo**
3. **Add Environment Variables**:
   - `GEMINI_API_KEY`: Your API key
   - `GEMINI_MODEL`: gemini-pro
4. **Deploy** → Railway handles everything!

### Result:
- ✅ Live URL (e.g., `https://your-app.railway.app`)
- ✅ Automatic HTTPS
- ✅ Auto-deploy on git push

## ⚡ Vercel (Frontend) + Railway (Backend)

### Backend on Railway:
1. Deploy backend following Railway steps above
2. Copy your backend URL

### Frontend on Vercel:
1. **Sign up**: [vercel.com](https://vercel.com)
2. **Import Project** → Connect GitHub
3. **Settings**:
   - Root Directory: `frontend`
   - Environment Variable: `REACT_APP_API_URL` = Your Railway backend URL
4. **Deploy**!

## 🎨 Render (Free Tier)

### Steps:
1. **Sign up**: [render.com](https://render.com)
2. **New Web Service**:
   - Repository: Your GitHub repo
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Environment Variables: Add your `GEMINI_API_KEY`
3. **New Static Site**:
   - Same repository
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/build`

## 📋 Environment Variables Needed

For all deployments, you need:

```env
GEMINI_API_KEY=your_actual_api_key_here
GEMINI_MODEL=gemini-pro
NODE_ENV=production
```

## 🧪 Test Your Deployment

Once deployed, test these URLs:

```bash
# Health check
curl https://your-app-url/health

# API test
curl -X POST https://your-app-url/api/chat \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"test","message":"How do I reset my password?"}'
```

## 🎯 Recommended for Beginners

1. **Local testing**: Docker (`./deploy.sh`)
2. **Free hosting**: Railway (easiest)
3. **Production**: Railway or Render

## 🆘 Need Help?

- Check [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed instructions
- Ensure your API key is valid
- Verify all environment variables are set
- Check deployment logs for errors

---

**Choose your method and deploy in minutes!** 🚀