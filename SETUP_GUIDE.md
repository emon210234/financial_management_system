# Quick Setup Guide

## 🚀 Quick Start in 5 Minutes

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Configure Environment Variables

**Backend (.env):**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=any_random_secret_string_here
JWT_EXPIRE=7d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env):**
```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
```

### Step 3: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Step 4: Test the Application

1. Open browser: `http://localhost:3000`
2. Try registering with email/password
3. Try logging in
4. Test Google OAuth login

---

## 📋 Checklist

- [ ] Node.js installed (v14+)
- [ ] MongoDB Atlas account created
- [ ] Google OAuth credentials obtained
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend .env configured
- [ ] Frontend .env configured
- [ ] Backend server running (port 5000)
- [ ] Frontend server running (port 3000)
- [ ] Can register with email
- [ ] Can login with email
- [ ] Google OAuth working

---

## 🔑 Getting MongoDB Atlas Connection String

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up/Login
3. Create a new cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy connection string
6. Replace `<password>` with your database user password

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/financial_management?retryWrites=true&w=majority
```

---

## 🔑 Getting Google OAuth Credentials

1. Go to https://console.cloud.google.com/
2. Create new project
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Application type: "Web application"
6. Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
7. Copy Client ID and Client Secret

---

## 🐛 Common Issues & Solutions

### Issue: Cannot connect to MongoDB
**Solution:** 
- Check connection string format
- Verify password doesn't have special characters
- Whitelist IP: 0.0.0.0/0 in MongoDB Atlas

### Issue: Google OAuth not working
**Solution:**
- Verify redirect URI exactly matches
- Check Client ID and Secret are correct
- Enable Google+ API in Google Console

### Issue: Port already in use
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Change port in backend/.env
PORT=5001
```

### Issue: CORS errors
**Solution:**
- Ensure FRONTEND_URL in backend/.env is correct
- Check REACT_APP_API_URL in frontend/.env

---

## 📞 Need Help?

Check the main README.md for detailed documentation and troubleshooting.
