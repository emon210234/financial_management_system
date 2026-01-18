# Financial Management System

A full-stack web application for financial management with authentication features including Google OAuth and traditional email/password login.

## 🚀 Features

- **User Authentication**
  - Email/Password registration and login
  - Google OAuth 2.0 authentication
  - JWT-based session management
  - Protected routes and middleware

- **Architecture**
  - MERN Stack (MongoDB, Express, React, Node.js)
  - MVC (Model-View-Controller) pattern
  - RESTful API design
  - Modern React with Hooks and Context API

## 📁 Project Structure

```
financial_management_system/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js       # MongoDB connection
│   │   │   └── passport.js       # Passport strategies (Google OAuth, JWT)
│   │   ├── controllers/
│   │   │   └── authController.js # Authentication logic
│   │   ├── middleware/
│   │   │   └── auth.js          # JWT authentication middleware
│   │   ├── models/
│   │   │   └── User.js          # User schema
│   │   ├── routes/
│   │   │   └── authRoutes.js    # Authentication routes
│   │   ├── utils/
│   │   │   └── jwt.js           # JWT utilities
│   │   └── server.js            # Express server setup
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── auth/
    │   │   │   ├── Login.js         # Login component
    │   │   │   ├── Register.js      # Registration component
    │   │   │   ├── AuthCallback.js  # OAuth callback handler
    │   │   │   └── Auth.css         # Auth styling
    │   │   └── PrivateRoute.js      # Protected route wrapper
    │   ├── context/
    │   │   └── AuthContext.js       # Auth state management
    │   ├── pages/
    │   │   ├── Dashboard.js         # Main dashboard
    │   │   └── Dashboard.css        # Dashboard styling
    │   ├── services/
    │   │   └── api.js              # API service layer
    │   ├── styles/
    │   │   └── App.css             # Global styles
    │   ├── App.js                  # Main app component
    │   └── index.js                # React entry point
    ├── .env.example
    ├── .gitignore
    └── package.json
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Google Cloud Console account (for OAuth)

### 1. MongoDB Atlas Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user with password
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string (replace `<password>` with your actual password)

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen
6. Add authorized redirect URIs:
   - `http://localhost:5000/api/auth/google/callback`
7. Copy your Client ID and Client Secret

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your credentials:
# - Add MongoDB Atlas connection string
# - Add Google OAuth credentials
# - Set JWT secret (any random string)
```

**.env Configuration:**
```env
PORT=5000
NODE_ENV=development

# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/financial_management?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 4. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your configuration
```

**.env Configuration:**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
```

### 5. Running the Application

**Start Backend Server:**
```bash
cd backend
npm start
# Or for development with auto-reload:
npm run dev
```

Backend will run on: `http://localhost:5000`

**Start Frontend Server:**
```bash
cd frontend
npm start
```

Frontend will run on: `http://localhost:3000`

## 🔐 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login with email/password | No |
| GET | `/api/auth/google` | Initiate Google OAuth | No |
| GET | `/api/auth/google/callback` | Google OAuth callback | No |
| GET | `/api/auth/me` | Get current user | Yes |
| POST | `/api/auth/logout` | Logout user | Yes |

### Request/Response Examples

**Register:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "authProvider": "local"
  }
}
```

**Login:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "authProvider": "local"
  }
}
```

## 🎨 Frontend Routes

| Route | Component | Protection | Description |
|-------|-----------|------------|-------------|
| `/login` | Login | Public | Login page |
| `/register` | Register | Public | Registration page |
| `/auth/callback` | AuthCallback | Public | OAuth callback handler |
| `/dashboard` | Dashboard | Protected | Main dashboard |
| `/` | - | - | Redirects to dashboard |

## 🔒 Security Features

- Passwords hashed using bcrypt
- JWT tokens for stateless authentication
- HTTP-only cookies support (optional)
- CORS configuration
- Input validation using express-validator
- Protected routes on both frontend and backend
- Secure password requirements (min 6 characters)

## 📦 Technologies Used

### Backend
- **Express.js** - Web framework
- **MongoDB/Mongoose** - Database and ODM
- **Passport.js** - Authentication middleware
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React** - UI library
- **React Router** - Routing
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling

## 🚧 Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm start  # React dev server with hot reload
```

## 🧪 Testing

After setup, test the following:

1. **Email Registration**
   - Go to `/register`
   - Fill in name, email, password
   - Should redirect to dashboard

2. **Email Login**
   - Go to `/login`
   - Enter email and password
   - Should redirect to dashboard

3. **Google OAuth**
   - Click "Continue with Google" button
   - Complete Google authentication
   - Should redirect to dashboard

4. **Protected Routes**
   - Try accessing `/dashboard` without logging in
   - Should redirect to `/login`

5. **Logout**
   - Click logout button in dashboard
   - Should redirect to login page

## 📝 Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - Secret key for JWT signing
- `JWT_EXPIRE` - JWT expiration time
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `GOOGLE_CALLBACK_URL` - Google OAuth callback URL
- `FRONTEND_URL` - Frontend application URL

### Frontend (.env)
- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_GOOGLE_CLIENT_ID` - Google OAuth client ID

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check your MongoDB Atlas connection string
   - Ensure IP is whitelisted
   - Verify username/password

2. **Google OAuth Not Working**
   - Verify Google Client ID and Secret
   - Check authorized redirect URIs in Google Console
   - Ensure callback URL matches exactly

3. **CORS Errors**
   - Check FRONTEND_URL in backend .env
   - Verify CORS configuration in server.js

4. **JWT Token Issues**
   - Clear localStorage in browser
   - Check JWT_SECRET is set
   - Verify token expiration

## 📚 Future Enhancements

- Email verification
- Password reset functionality
- Two-factor authentication (2FA)
- Profile management
- Financial transactions CRUD
- Budget planning features
- Reports and analytics
- Export data functionality

## 👥 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📚 Learning Git & GitHub Collaboration

New to collaborative development with Git and GitHub? We've got you covered!

### 🚀 **[START HERE - Learning Roadmap](./START_HERE.md)**

Begin your journey with our comprehensive learning roadmap that guides you through all the resources!

### Comprehensive Learning Resources

This repository includes extensive guides to help you master Git and GitHub for seamless collaboration:

1. **[Git Collaboration Guide](./GIT_COLLABORATION_GUIDE.md)** - Complete guide covering everything from basic Git concepts to advanced collaborative workflows
   - Understanding Git basics and remote repositories
   - Branching strategies and workflows
   - Pull requests and code reviews
   - Handling merge conflicts
   - Best practices and tips

2. **[Git Quick Reference](./GIT_QUICK_REFERENCE.md)** - Quick lookup for common Git commands and scenarios
   - Daily workflow commands
   - Branch management
   - Undo operations
   - Troubleshooting common issues
   - Emergency fixes

3. **[Git Exercises](./GIT_EXERCISES.md)** - Hands-on practical exercises to practice Git skills
   - 10 progressive exercises
   - Branch creation and navigation
   - Pull request workflow
   - Conflict resolution practice
   - Real-world scenarios

4. **[Collaboration Workflow](./COLLABORATION_WORKFLOW.md)** - Team workflow standards and best practices
   - Daily routines and processes
   - Branching strategy
   - Communication protocols
   - Code review guidelines
   - Project management

5. **[Git Visual Guide](./GIT_VISUAL_GUIDE.md)** - Visual diagrams to understand Git concepts
   - ASCII diagrams of Git operations
   - Branch visualization
   - Merge and rebase explained
   - Conflict resolution visuals

### Getting Started with Collaboration

**New to Git collaboration? Follow these steps:**

1. **Start with [START_HERE.md](./START_HERE.md)** - Your complete learning roadmap
2. **Read the [Git Collaboration Guide](./GIT_COLLABORATION_GUIDE.md)** for comprehensive learning
3. **Use the [Quick Reference](./GIT_QUICK_REFERENCE.md)** as you work
4. **Complete the [Exercises](./GIT_EXERCISES.md)** with your teammate
5. **Follow the [Collaboration Workflow](./COLLABORATION_WORKFLOW.md)** for your team
6. **Refer to the [Visual Guide](./GIT_VISUAL_GUIDE.md)** when concepts are unclear

These guides are designed to be:
- ✅ Beginner-friendly with step-by-step instructions
- ✅ Practical with real-world examples
- ✅ Comprehensive covering all essential topics
- ✅ Self-sufficient for teaching others

**Total learning material: 1,600+ lines covering everything from basics to advanced collaboration!**

## 📄 License

This project is licensed under the ISC License.

## 🤝 Support

For issues and questions, please create an issue in the repository.

---

Built with ❤️ using MERN Stack