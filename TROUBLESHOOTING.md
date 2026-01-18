# Troubleshooting Guide

## Common Issues and Solutions

### 1. MongoDB Connection Issues

#### Error: "MongoServerError: bad auth: Authentication failed"

**Problem:** Invalid MongoDB credentials

**Solutions:**
- Verify username and password in MongoDB Atlas
- Check that password doesn't contain special characters that need URL encoding
- URL encode your password: Replace `@` with `%40`, `#` with `%23`, etc.
- Ensure you're using the correct database user (not Atlas account credentials)

#### Error: "MongooseServerSelectionError: Could not connect to any servers"

**Problem:** Cannot reach MongoDB server

**Solutions:**
- Check your internet connection
- Verify MongoDB Atlas cluster is running
- Add your IP to whitelist: MongoDB Atlas → Network Access → Add IP Address
- For development, use `0.0.0.0/0` (allow access from anywhere)
- Check if firewall is blocking MongoDB port (27017)

#### Error: "ENOTFOUND" or "ETIMEOUT"

**Problem:** DNS or network issue

**Solutions:**
- Verify connection string format is correct
- Check cluster name in connection string
- Try using different network (mobile hotspot for testing)
- Restart your router/modem

---

### 2. Google OAuth Issues

#### Error: "redirect_uri_mismatch"

**Problem:** Redirect URI doesn't match Google Console configuration

**Solutions:**
- Go to Google Cloud Console → Credentials
- Edit OAuth 2.0 Client ID
- Add exact redirect URI: `http://localhost:5000/api/auth/google/callback`
- Ensure no trailing slash
- Match protocol (http vs https)
- Wait a few minutes after adding URI

#### Error: "Access blocked: This app's request is invalid"

**Problem:** OAuth consent screen not configured

**Solutions:**
- Go to Google Cloud Console → OAuth consent screen
- Fill in required fields:
  - App name
  - User support email
  - Developer contact email
- Add test users if in development mode
- Save configuration

#### Error: "Google authentication failed"

**Problem:** Invalid Google credentials or API not enabled

**Solutions:**
- Verify GOOGLE_CLIENT_ID in backend .env
- Verify GOOGLE_CLIENT_SECRET in backend .env
- Enable Google+ API in Google Cloud Console
- Check OAuth 2.0 credentials are for "Web application" type
- Ensure credentials match the project

---

### 3. JWT Token Issues

#### Error: "Unauthorized access" or 401 errors

**Problem:** Invalid or expired JWT token

**Solutions:**
- Clear browser localStorage
- Log in again to get new token
- Check JWT_SECRET is set in backend .env
- Verify token is being sent in Authorization header
- Check token format: `Bearer <token>`

#### Error: "jwt malformed"

**Problem:** Token format is incorrect

**Solutions:**
- Ensure token starts with "Bearer " in Authorization header
- Check that entire token is being sent
- Verify no extra spaces or characters
- Clear localStorage and login again

#### Error: "jwt expired"

**Problem:** Token has expired

**Solutions:**
- Increase JWT_EXPIRE in backend .env (e.g., "30d")
- Implement token refresh mechanism
- Log in again to get new token

---

### 4. CORS Errors

#### Error: "Access to fetch at 'http://localhost:5000/api/...' from origin 'http://localhost:3000' has been blocked by CORS policy"

**Problem:** CORS not properly configured

**Solutions:**
- Verify FRONTEND_URL in backend .env is correct
- Ensure it matches exactly (including port)
- Check CORS configuration in server.js:
```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```
- Restart backend server after changes

---

### 5. Port Already in Use

#### Error: "EADDRINUSE: address already in use :::5000"

**Problem:** Port 5000 is already occupied

**Solutions:**

**Windows:**
```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual PID)
taskkill /PID <PID> /F
```

**Or change port:**
- Edit backend/.env
- Change PORT=5000 to PORT=5001
- Update REACT_APP_API_URL in frontend/.env

---

### 6. Frontend Build Issues

#### Error: "Module not found: Can't resolve 'react-router-dom'"

**Problem:** Dependencies not installed

**Solutions:**
```bash
cd frontend
rm -rf node_modules
npm install
```

#### Error: "Cannot find module './components/...' "

**Problem:** Import path incorrect

**Solutions:**
- Check file exists at specified path
- Verify import path is correct (case-sensitive on Linux/Mac)
- Ensure file extension is included if required
- Check for typos in import statement

---

### 7. Backend Startup Issues

#### Error: "Cannot find module 'express'"

**Problem:** Backend dependencies not installed

**Solutions:**
```bash
cd backend
rm -rf node_modules
npm install
```

#### Error: "SyntaxError: Cannot use import statement outside a module"

**Problem:** Module type not set

**Solutions:**
- Verify "type": "module" is in backend/package.json
- If not, add it:
```json
{
  "name": "financial-management-backend",
  "type": "module",
  ...
}
```

---

### 8. Environment Variables Issues

#### Error: "process.env.MONGODB_URI is undefined"

**Problem:** .env file not loaded or missing

**Solutions:**
- Ensure .env file exists in backend directory
- Check dotenv is configured in server.js:
```javascript
import dotenv from 'dotenv';
dotenv.config();
```
- Verify .env file is not named .env.txt or .env.example
- Restart backend server after creating/editing .env

#### Frontend environment variables not working

**Problem:** React environment variables must start with REACT_APP_

**Solutions:**
- Verify all variables start with REACT_APP_
- Example: REACT_APP_API_URL (not API_URL)
- Restart frontend server after changes to .env
- Clear cache: `npm start` or delete .cache folder

---

### 9. Login/Registration Not Working

#### Issue: "User already exists" but I can't login

**Problem:** User created but password not set correctly

**Solutions:**
- Register a new account with different email
- Or connect to MongoDB and delete the user document
- Ensure password meets minimum requirements (6 characters)

#### Issue: Can login but immediately logged out

**Problem:** Token not being stored or retrieved correctly

**Solutions:**
- Check browser localStorage in DevTools
- Verify token is being saved after login
- Check for localStorage.setItem errors in console
- Test in different browser or incognito mode

---

### 10. Dashboard Not Loading

#### Issue: Stuck on "Loading..." screen

**Problem:** Token validation failing

**Solutions:**
- Check browser console for errors
- Verify backend is running (http://localhost:5000/api/health)
- Clear localStorage and login again
- Check Network tab in DevTools for failed requests

#### Issue: Redirects to login page immediately

**Problem:** Authentication check failing

**Solutions:**
- Verify token exists in localStorage
- Check that /api/auth/me endpoint works
- Ensure Authorization header is being sent
- Check for CORS errors in console

---

### 11. Debugging Tips

#### Enable detailed error logging

**Backend (server.js):**
```javascript
app.use((err, req, res, next) => {
  console.error('Error details:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});
```

#### Check API responses

**Use browser DevTools:**
1. Open DevTools (F12)
2. Go to Network tab
3. Perform action (login, register, etc.)
4. Check request/response details
5. Look for errors in Console tab

#### Test backend directly

**Use cURL or Postman:**
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'
```

---

### 12. Fresh Start Checklist

If nothing works, try a complete reset:

1. **Stop all servers**
   - Close all terminal windows
   - Kill any running Node processes

2. **Clear dependencies**
   ```bash
   # Backend
   cd backend
   rm -rf node_modules
   rm package-lock.json
   npm install

   # Frontend
   cd ../frontend
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

3. **Reset environment files**
   ```bash
   # Backend
   cd backend
   rm .env
   cp .env.example .env
   # Edit .env with correct values

   # Frontend
   cd ../frontend
   rm .env
   cp .env.example .env
   # Edit .env with correct values
   ```

4. **Clear browser data**
   - Open browser DevTools (F12)
   - Application tab → Local Storage → Clear All
   - Clear browser cache
   - Try in incognito/private mode

5. **Restart servers**
   ```bash
   # Backend
   cd backend
   npm start

   # Frontend (new terminal)
   cd frontend
   npm start
   ```

---

### 13. Getting Help

If you're still stuck:

1. **Check logs**
   - Backend terminal for server errors
   - Browser console for frontend errors
   - MongoDB Atlas logs

2. **Search for specific error messages**
   - Copy exact error message
   - Search on Stack Overflow, GitHub Issues

3. **Verify setup**
   - Review README.md setup instructions
   - Check DOCUMENTATION.md for architecture details
   - Review API_DOCUMENTATION.md for endpoint details

4. **Test step by step**
   - Test backend health endpoint
   - Test user registration with cURL
   - Test login with cURL
   - Then test frontend

---

## Quick Diagnostic Commands

### Check if ports are available
```bash
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :3000
```

### Check if servers are running
```bash
# Test backend
curl http://localhost:5000/api/health

# Test frontend
curl http://localhost:3000
```

### Check Node.js version
```bash
node --version
# Should be v14 or higher
```

### Check npm version
```bash
npm --version
```

### View backend logs
```bash
cd backend
npm start
# Watch for any errors
```

### View frontend logs
```bash
cd frontend
npm start
# Watch for any errors
```

---

## Environment Checklist

Before reporting an issue, verify:

- [ ] Node.js v14+ installed
- [ ] MongoDB Atlas cluster created and running
- [ ] MongoDB user created with correct permissions
- [ ] IP address whitelisted in MongoDB Atlas
- [ ] Google OAuth credentials obtained
- [ ] Google OAuth redirect URI configured
- [ ] Backend dependencies installed (node_modules exists)
- [ ] Frontend dependencies installed (node_modules exists)
- [ ] Backend .env file exists and configured
- [ ] Frontend .env file exists and configured
- [ ] Backend server starts without errors
- [ ] Frontend server starts without errors
- [ ] Can access http://localhost:5000/api/health
- [ ] Can access http://localhost:3000

---

Last Updated: January 17, 2026
