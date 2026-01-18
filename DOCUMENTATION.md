# Project Documentation

## Architecture Overview

This Financial Management System follows the MVC (Model-View-Controller) architecture pattern using the MERN stack.

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database service
- **Mongoose** - MongoDB ODM (Object Data Modeling)
- **Passport.js** - Authentication middleware
  - passport-google-oauth20 - Google OAuth strategy
  - passport-jwt - JWT authentication strategy
- **JWT (jsonwebtoken)** - Token generation and verification
- **bcryptjs** - Password hashing
- **express-validator** - Request validation
- **dotenv** - Environment variable management
- **cors** - Cross-Origin Resource Sharing
- **cookie-parser** - Cookie parsing middleware

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling

## MVC Architecture Breakdown

### Model Layer (backend/src/models/)

**User.js**
- Defines the user data schema
- Contains user-related business logic
- Methods:
  - `comparePassword()` - Password verification
  - `toAuthJSON()` - Sanitized user data response
- Features:
  - Password hashing with bcrypt (pre-save hook)
  - Email validation
  - Support for multiple auth providers (local/google)

### Controller Layer (backend/src/controllers/)

**authController.js**
- Handles authentication business logic
- Functions:
  - `register()` - User registration with email/password
  - `login()` - User login with email/password
  - `googleCallback()` - Handle Google OAuth callback
  - `getMe()` - Get current authenticated user
  - `logout()` - User logout

### View Layer (frontend/src/)

**Components**
- `Login.js` - Login form view
- `Register.js` - Registration form view
- `AuthCallback.js` - OAuth callback handler
- `Dashboard.js` - Main dashboard view
- `PrivateRoute.js` - Protected route wrapper

**Context**
- `AuthContext.js` - Global authentication state management

### Routes Layer (backend/src/routes/)

**authRoutes.js**
- Defines API endpoints
- Applies validation middleware
- Connects routes to controllers

```
POST   /api/auth/register        - Register new user
POST   /api/auth/login           - Login user
GET    /api/auth/google          - Initiate Google OAuth
GET    /api/auth/google/callback - Google OAuth callback
GET    /api/auth/me              - Get current user (protected)
POST   /api/auth/logout          - Logout user (protected)
```

## Authentication Flow

### Email/Password Registration

```
1. User submits registration form (Frontend)
   ↓
2. Form validation (Frontend)
   ↓
3. POST /api/auth/register (Frontend → Backend)
   ↓
4. Request validation (Backend - express-validator)
   ↓
5. Check if user exists (Backend - Controller)
   ↓
6. Hash password (Backend - Model pre-save hook)
   ↓
7. Create user in MongoDB (Backend - Model)
   ↓
8. Generate JWT token (Backend - JWT utility)
   ↓
9. Return token + user data (Backend → Frontend)
   ↓
10. Store token in localStorage (Frontend)
    ↓
11. Update auth context state (Frontend)
    ↓
12. Redirect to dashboard (Frontend)
```

### Email/Password Login

```
1. User submits login form (Frontend)
   ↓
2. Form validation (Frontend)
   ↓
3. POST /api/auth/login (Frontend → Backend)
   ↓
4. Request validation (Backend - express-validator)
   ↓
5. Find user by email (Backend - Controller)
   ↓
6. Verify password (Backend - Model method)
   ↓
7. Generate JWT token (Backend - JWT utility)
   ↓
8. Return token + user data (Backend → Frontend)
   ↓
9. Store token in localStorage (Frontend)
   ↓
10. Update auth context state (Frontend)
    ↓
11. Redirect to dashboard (Frontend)
```

### Google OAuth Flow

```
1. User clicks "Continue with Google" (Frontend)
   ↓
2. Redirect to /api/auth/google (Frontend → Backend)
   ↓
3. Passport Google Strategy initiates OAuth (Backend)
   ↓
4. Redirect to Google login page (Backend → Google)
   ↓
5. User authenticates with Google (Google)
   ↓
6. Google redirects to callback URL (Google → Backend)
   ↓
7. Passport verifies OAuth response (Backend)
   ↓
8. Find or create user (Backend - Passport strategy)
   ↓
9. Generate JWT token (Backend - Controller)
   ↓
10. Redirect to frontend with token (Backend → Frontend)
    ↓
11. Extract token from URL (Frontend - AuthCallback)
    ↓
12. Store token and fetch user data (Frontend)
    ↓
13. Update auth context state (Frontend)
    ↓
14. Redirect to dashboard (Frontend)
```

### Protected Route Access

```
1. User navigates to protected route (Frontend)
   ↓
2. PrivateRoute checks auth state (Frontend)
   ↓
3. If not authenticated → redirect to login
   ↓
4. If authenticated → render component
   ↓
5. Component makes API request (Frontend → Backend)
   ↓
6. Axios interceptor adds JWT to headers (Frontend)
   ↓
7. authenticateJWT middleware verifies token (Backend)
   ↓
8. Passport JWT strategy validates token (Backend)
   ↓
9. User object attached to request (Backend)
   ↓
10. Controller processes request (Backend)
    ↓
11. Return response (Backend → Frontend)
```

## Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique, lowercase),
  password: String (hashed, optional for Google users),
  googleId: String (unique, sparse),
  authProvider: String (enum: ['local', 'google']),
  profilePicture: String,
  isEmailVerified: Boolean,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Indexes
- email: unique
- googleId: unique, sparse

## API Request/Response Format

### Standard Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {},
  "token": "jwt_token" // if applicable
}
```

### Standard Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [] // validation errors if applicable
}
```

## Security Measures

### Password Security
- Minimum 6 characters requirement
- Hashed using bcrypt with salt rounds (10)
- Never returned in API responses (select: false)

### JWT Security
- Signed with secret key
- 7-day expiration
- Stored in localStorage (client-side)
- Validated on every protected route request

### Input Validation
- Email format validation
- Required field validation
- Password strength validation
- XSS prevention through input sanitization

### CORS Configuration
- Whitelist specific origins (frontend URL)
- Credentials enabled for cookie support

### Error Handling
- Generic error messages for security
- Detailed errors only in development mode
- 401 for unauthorized access
- 400 for validation errors
- 500 for server errors

## Environment Configuration

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development/production |
| MONGODB_URI | MongoDB connection string | mongodb+srv://... |
| JWT_SECRET | JWT signing secret | random_secret_string |
| JWT_EXPIRE | JWT expiration time | 7d |
| GOOGLE_CLIENT_ID | Google OAuth client ID | xxx.apps.googleusercontent.com |
| GOOGLE_CLIENT_SECRET | Google OAuth secret | GOCSPX-xxx |
| GOOGLE_CALLBACK_URL | OAuth callback URL | http://localhost:5000/api/auth/google/callback |
| FRONTEND_URL | Frontend application URL | http://localhost:3000 |

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| REACT_APP_API_URL | Backend API base URL | http://localhost:5000/api |
| REACT_APP_GOOGLE_CLIENT_ID | Google OAuth client ID | xxx.apps.googleusercontent.com |

## Frontend State Management

### AuthContext Structure

```javascript
{
  user: {
    id: String,
    name: String,
    email: String,
    profilePicture: String,
    authProvider: String,
    isEmailVerified: Boolean
  },
  loading: Boolean,
  error: String,
  isAuthenticated: Boolean,
  register: Function,
  login: Function,
  logout: Function,
  handleGoogleCallback: Function
}
```

## File Organization

### Backend Structure
```
backend/
├── src/
│   ├── config/          # Configuration files
│   │   ├── database.js  # MongoDB connection
│   │   └── passport.js  # Passport strategies
│   ├── controllers/     # Business logic
│   │   └── authController.js
│   ├── middleware/      # Custom middleware
│   │   └── auth.js      # JWT authentication
│   ├── models/          # Data models
│   │   └── User.js      # User schema
│   ├── routes/          # API routes
│   │   └── authRoutes.js
│   ├── utils/           # Utility functions
│   │   └── jwt.js       # JWT helpers
│   └── server.js        # Express app entry point
├── .env                 # Environment variables
├── .env.example         # Environment template
├── .gitignore
└── package.json
```

### Frontend Structure
```
frontend/
├── public/
│   └── index.html       # HTML template
├── src/
│   ├── components/      # Reusable components
│   │   ├── auth/        # Auth-related components
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── AuthCallback.js
│   │   │   └── Auth.css
│   │   └── PrivateRoute.js
│   ├── context/         # React Context
│   │   └── AuthContext.js
│   ├── pages/           # Page components
│   │   ├── Dashboard.js
│   │   └── Dashboard.css
│   ├── services/        # API services
│   │   └── api.js
│   ├── styles/          # Global styles
│   │   └── App.css
│   ├── App.js           # Main component
│   └── index.js         # React entry point
├── .env                 # Environment variables
├── .env.example         # Environment template
├── .gitignore
└── package.json
```

## Code Standards

### Backend
- ES6+ module syntax (import/export)
- Async/await for asynchronous operations
- Error handling in try-catch blocks
- Consistent error response format
- JSDoc comments for complex functions

### Frontend
- Functional components with Hooks
- React Context for global state
- CSS modules or styled components
- Consistent naming conventions
- PropTypes or TypeScript for type checking

## Testing Checklist

- [ ] User registration with email/password
- [ ] User login with email/password
- [ ] Google OAuth registration
- [ ] Google OAuth login
- [ ] JWT token generation
- [ ] JWT token validation
- [ ] Protected route access
- [ ] Unauthorized access handling
- [ ] Logout functionality
- [ ] Password hashing
- [ ] Email validation
- [ ] Form validation
- [ ] Error handling
- [ ] CORS configuration
- [ ] MongoDB connection

## Deployment Considerations

### Backend
1. Use environment-specific .env files
2. Enable HTTPS in production
3. Set secure JWT secret
4. Configure MongoDB Atlas IP whitelist
5. Enable MongoDB connection pooling
6. Add rate limiting middleware
7. Implement logging (Winston, Morgan)
8. Set up error monitoring (Sentry)

### Frontend
1. Build optimized production bundle
2. Configure environment variables
3. Enable HTTPS
4. Add service worker for PWA
5. Optimize images and assets
6. Implement code splitting
7. Add analytics (Google Analytics)
8. Set up error monitoring

### Infrastructure
1. Use SSL certificates
2. Set up reverse proxy (Nginx)
3. Enable gzip compression
4. Configure CDN for static assets
5. Set up CI/CD pipeline
6. Implement backup strategy
7. Monitor server metrics
8. Set up auto-scaling

## Performance Optimization

### Backend
- Database indexing on frequently queried fields
- Connection pooling for MongoDB
- Caching with Redis (future enhancement)
- Compression middleware
- Query optimization

### Frontend
- Code splitting with React.lazy()
- Memoization with useMemo/useCallback
- Lazy loading images
- Minimize bundle size
- Use production build

## Future Enhancements

### Authentication
- [ ] Email verification
- [ ] Password reset via email
- [ ] Two-factor authentication (2FA)
- [ ] OAuth for other providers (Facebook, GitHub)
- [ ] Remember me functionality
- [ ] Session management

### Features
- [ ] User profile management
- [ ] Account settings
- [ ] Financial transactions CRUD
- [ ] Budget management
- [ ] Income/expense tracking
- [ ] Reports and analytics
- [ ] Data export (CSV, PDF)
- [ ] Dark mode

### Technical
- [ ] Unit tests (Jest)
- [ ] Integration tests
- [ ] E2E tests (Cypress)
- [ ] API documentation (Swagger)
- [ ] TypeScript migration
- [ ] GraphQL API
- [ ] WebSocket for real-time updates
- [ ] Mobile app (React Native)

---

Last Updated: January 17, 2026
