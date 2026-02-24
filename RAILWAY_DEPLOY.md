# 🚂 Railway Free Deployment (5 Minutes)

## Step-by-Step Guide

### 1. Prepare Your Repository
Make sure your code is pushed to GitHub with all the files I created.

### 2. Sign Up for Railway
1. Go to [railway.app](https://railway.app)
2. Click **"Login"**
3. Choose **"Login with GitHub"**
4. Authorize Railway to access your repositories

### 3. Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your AI Support Assistant repository
4. Railway will automatically detect it's a Node.js app

### 4. Configure Environment Variables
1. Go to your project dashboard
2. Click on your service
3. Go to **"Variables"** tab
4. Add these variables:
   ```
   GEMINI_API_KEY = AIzaSyDFOLi-39bkk-jFIt-xqYpa2TrS3aNc0-Q
   GEMINI_MODEL = gemini-pro
   NODE_ENV = production
   ```

### 5. Deploy!
1. Railway will automatically start building
2. Wait 2-3 minutes for deployment
3. You'll get a live URL like: `https://your-app.railway.app`

### 6. Test Your Deployment
1. Open your Railway URL
2. You should see your AI Support Assistant!
3. Test with: "How do I reset my password?"

## 🎉 You're Live!

Your app is now:
- ✅ **Live on the internet**
- ✅ **Accessible from anywhere**
- ✅ **Automatically secured with HTTPS**
- ✅ **Auto-deploys when you push to GitHub**

## 📊 Railway Free Tier

- **500 hours/month** (enough for 24/7 for 20+ days)
- **Automatic scaling**
- **Custom domains**
- **SSL certificates**
- **GitHub integration**

## 🔧 Managing Your App

### View Logs:
1. Go to Railway dashboard
2. Click your service
3. Go to **"Deployments"** tab
4. Click on latest deployment to see logs

### Update Your App:
1. Make changes to your code
2. Push to GitHub
3. Railway automatically redeploys!

### Custom Domain (Optional):
1. Go to **"Settings"** tab
2. Click **"Domains"**
3. Add your custom domain

## 🆘 Troubleshooting

### If deployment fails:
1. Check the build logs in Railway dashboard
2. Ensure all files are committed to GitHub
3. Verify environment variables are set correctly

### If app doesn't respond:
1. Check if `GEMINI_API_KEY` is set
2. Look at runtime logs for errors
3. Ensure port is set correctly (Railway handles this automatically)

## 💡 Pro Tips

- Railway gives you a **free PostgreSQL database** if you need it later
- You can connect multiple services (frontend + backend separately)
- Railway has excellent **monitoring and metrics**
- **Zero configuration** needed - it just works!

---

**Your AI Support Assistant will be live in 5 minutes!** 🚀

Go to [railway.app](https://railway.app) and start deploying!