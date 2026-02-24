# 🚀 Deployment Guide

Your AI Support Assistant can be deployed on multiple platforms. Choose the one that works best for you!

## 🐳 Option 1: Docker (Recommended)

### Prerequisites
- Docker and Docker Compose installed
- Your environment variables ready

### Quick Deploy
```bash
# 1. Create environment file
echo "GEMINI_API_KEY=your_api_key_here" > .env
echo "GEMINI_MODEL=gemini-pro" >> .env

# 2. Build and run
docker-compose up -d

# 3. Access your app
# Frontend: http://localhost
# Backend: http://localhost:3001
```

### Production Deploy
```bash
# Build for production
docker-compose -f docker-compose.yml up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## ☁️ Option 2: Railway (Free Tier)

### Steps:
1. **Sign up**: Go to [railway.app](https://railway.app)
2. **Connect GitHub**: Link your repository
3. **Deploy Backend**:
   - Create new project
   - Connect your repo
   - Set environment variables:
     - `GEMINI_API_KEY`: Your API key
     - `GEMINI_MODEL`: gemini-pro
   - Railway will auto-detect and deploy

4. **Deploy Frontend**:
   - Add new service to same project
   - Set build command: `cd frontend && npm install && npm run build`
   - Set start command: `cd frontend && npx serve -s build -p $PORT`
   - Set environment variable:
     - `REACT_APP_API_URL`: Your backend Railway URL

### Railway Configuration:
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Auto-scaling
- ✅ Free tier: 500 hours/month

## 🎨 Option 3: Render (Free Tier)

### Steps:
1. **Sign up**: Go to [render.com](https://render.com)
2. **Create Web Service** for backend:
   - Connect GitHub repo
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Environment Variables:
     - `GEMINI_API_KEY`: Your API key
     - `GEMINI_MODEL`: gemini-pro

3. **Create Static Site** for frontend:
   - Connect same GitHub repo
   - Build Command: `cd frontend && npm install && npm run build`
   - Publish Directory: `frontend/build`

### Render Features:
- ✅ Free SSL certificates
- ✅ Global CDN
- ✅ Auto-deploy on git push
- ✅ Free tier available

## ⚡ Option 4: Vercel (Frontend) + Railway (Backend)

### Backend on Railway:
1. Deploy backend following Railway steps above
2. Note your backend URL (e.g., `https://your-app.railway.app`)

### Frontend on Vercel:
1. **Sign up**: Go to [vercel.com](https://vercel.com)
2. **Import Project**: Connect your GitHub repo
3. **Configure**:
   - Framework: React
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
4. **Environment Variables**:
   - `REACT_APP_API_URL`: Your Railway backend URL

### Vercel Features:
- ✅ Lightning fast CDN
- ✅ Automatic deployments
- ✅ Preview deployments
- ✅ Custom domains

## 🔧 Option 5: Heroku

### Backend:
```bash
# Install Heroku CLI
# Create Heroku app
heroku create your-app-backend

# Set environment variables
heroku config:set GEMINI_API_KEY=your_api_key_here
heroku config:set GEMINI_MODEL=gemini-pro

# Deploy
git subtree push --prefix backend heroku main
```

### Frontend:
```bash
# Create frontend app
heroku create your-app-frontend

# Set build pack
heroku buildpacks:set mars/create-react-app

# Set environment variables
heroku config:set REACT_APP_API_URL=https://your-app-backend.herokuapp.com

# Deploy
git subtree push --prefix frontend heroku main
```

## 🌐 Option 6: Netlify (Frontend) + Railway (Backend)

### Backend on Railway:
Follow Railway steps above

### Frontend on Netlify:
1. **Sign up**: Go to [netlify.com](https://netlify.com)
2. **New Site**: Connect GitHub repo
3. **Build Settings**:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`
4. **Environment Variables**:
   - `REACT_APP_API_URL`: Your Railway backend URL

## 📋 Pre-Deployment Checklist

### Environment Variables:
- [ ] `GEMINI_API_KEY` - Your Google AI API key
- [ ] `GEMINI_MODEL` - Model name (gemini-pro)
- [ ] `NODE_ENV` - Set to "production"
- [ ] `REACT_APP_API_URL` - Backend URL for frontend

### Code Preparation:
- [ ] Remove any hardcoded localhost URLs
- [ ] Update CORS settings for production domains
- [ ] Test with production environment variables
- [ ] Ensure database directory is writable

### Security:
- [ ] Never commit .env files
- [ ] Use environment variables for all secrets
- [ ] Enable HTTPS in production
- [ ] Set proper CORS origins

## 🧪 Testing Deployment

### Health Checks:
```bash
# Test backend health
curl https://your-backend-url/health

# Test API endpoint
curl -X POST https://your-backend-url/api/chat \
  -H "Content-Type: application/json" \
  -d '{"sessionId":"test","message":"How do I reset my password?"}'
```

### Frontend Testing:
1. Open your deployed frontend URL
2. Test chat functionality
3. Verify session persistence
4. Check all features work

## 🔄 Continuous Deployment

### GitHub Actions (Optional):
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: railway deploy
```

## 💡 Deployment Tips

### Performance:
- Use Docker multi-stage builds
- Enable gzip compression
- Set proper caching headers
- Use CDN for static assets

### Monitoring:
- Set up health checks
- Monitor response times
- Track error rates
- Set up alerts

### Scaling:
- Use horizontal scaling for high traffic
- Consider database optimization
- Implement caching strategies
- Monitor resource usage

## 🆘 Troubleshooting

### Common Issues:

**Build Failures:**
- Check Node.js version compatibility
- Verify all dependencies are listed
- Check build commands are correct

**API Connection Issues:**
- Verify CORS settings
- Check environment variables
- Ensure backend is accessible
- Test API endpoints directly

**Database Issues:**
- Ensure database directory is writable
- Check file permissions
- Verify SQLite is supported on platform

## 🎯 Recommended Setup

For **simplicity**: Docker Compose locally  
For **free hosting**: Railway (backend) + Vercel (frontend)  
For **production**: AWS/GCP with Docker  
For **quick demo**: Railway full-stack  

## 📞 Support

If you encounter issues:
1. Check platform-specific documentation
2. Verify environment variables
3. Test locally first
4. Check deployment logs
5. Ensure all files are committed to git

---

**Choose your deployment method and follow the steps above!** 🚀

Your AI Support Assistant is ready for the world! 🌍