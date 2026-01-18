# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

Most endpoints require a valid JWT token. Include it in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### 1. Register User

Create a new user account with email and password.

**Endpoint:** `POST /auth/register`

**Authentication:** Not required

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `name`: Required, string, not empty
- `email`: Required, valid email format
- `password`: Required, minimum 6 characters

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "profilePicture": "",
    "authProvider": "local",
    "isEmailVerified": false
  }
}
```

**Error Responses:**

*400 - Validation Error:*
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Please provide a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

*400 - User Already Exists:*
```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

*500 - Server Error:*
```json
{
  "success": false,
  "message": "Server error during registration",
  "error": "Error details..."
}
```

---

### 2. Login User

Authenticate user with email and password.

**Endpoint:** `POST /auth/login`

**Authentication:** Not required

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Validation Rules:**
- `email`: Required, valid email format
- `password`: Required, not empty

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "profilePicture": "",
    "authProvider": "local",
    "isEmailVerified": false
  }
}
```

**Error Responses:**

*401 - Invalid Credentials:*
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

*400 - Google Account:*
```json
{
  "success": false,
  "message": "This account is registered with Google. Please use Google Sign-In."
}
```

*400 - Validation Error:*
```json
{
  "success": false,
  "errors": [
    {
      "msg": "Please provide a valid email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

*500 - Server Error:*
```json
{
  "success": false,
  "message": "Server error during login",
  "error": "Error details..."
}
```

---

### 3. Google OAuth - Initiate

Redirect user to Google authentication page.

**Endpoint:** `GET /auth/google`

**Authentication:** Not required

**Description:** This endpoint redirects the user to Google's OAuth consent screen.

**Usage:**
```javascript
// Frontend
window.location.href = 'http://localhost:5000/api/auth/google';
```

**No JSON Response:** Redirects to Google OAuth page.

---

### 4. Google OAuth - Callback

Handle Google OAuth callback and authenticate user.

**Endpoint:** `GET /auth/google/callback`

**Authentication:** Not required (handled by Google)

**Description:** Google redirects to this endpoint after authentication. It creates/finds the user and redirects to frontend with JWT token.

**Success Redirect:**
```
http://localhost:3000/auth/callback?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Error Redirect:**
```
http://localhost:3000/login?error=authentication_failed
```

**Note:** This endpoint is called by Google, not directly by your frontend.

---

### 5. Get Current User

Get authenticated user's information.

**Endpoint:** `GET /auth/me`

**Authentication:** Required (JWT)

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "profilePicture": "https://lh3.googleusercontent.com/...",
    "authProvider": "google",
    "isEmailVerified": true
  }
}
```

**Error Responses:**

*401 - Unauthorized:*
```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

*500 - Server Error:*
```json
{
  "success": false,
  "message": "Server error",
  "error": "Error details..."
}
```

---

### 6. Logout User

Logout the authenticated user.

**Endpoint:** `POST /auth/logout`

**Authentication:** Required (JWT)

**Headers:**
```
Authorization: Bearer <your_jwt_token>
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

**Error Responses:**

*401 - Unauthorized:*
```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

*500 - Server Error:*
```json
{
  "success": false,
  "message": "Server error during logout",
  "error": "Error details..."
}
```

**Note:** With JWT, logout is primarily handled client-side by removing the token. This endpoint can be used for additional server-side logout logic (e.g., token blacklisting).

---

### 7. Health Check

Check if the server is running.

**Endpoint:** `GET /health`

**Authentication:** Not required

**Success Response (200):**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-01-17T10:30:00.000Z"
}
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Validation error or invalid input |
| 401 | Unauthorized - Invalid or missing authentication |
| 404 | Not Found - Route not found |
| 500 | Internal Server Error - Server-side error |

---

## Error Response Format

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [/* validation errors if applicable */],
  "error": "Detailed error (development mode only)"
}
```

---

## Authentication Flow Examples

### Email/Password Registration Flow

```javascript
// 1. Register
const response = await fetch('http://localhost:5000/api/auth/register', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  })
});

const data = await response.json();

// 2. Store token
localStorage.setItem('token', data.token);

// 3. Use token for subsequent requests
const userResponse = await fetch('http://localhost:5000/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${data.token}`
  }
});
```

### Email/Password Login Flow

```javascript
// 1. Login
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  })
});

const data = await response.json();

// 2. Store token
localStorage.setItem('token', data.token);
```

### Google OAuth Flow

```javascript
// 1. Redirect to Google OAuth
window.location.href = 'http://localhost:5000/api/auth/google';

// 2. After Google authentication, user is redirected to:
// http://localhost:3000/auth/callback?token=<jwt_token>

// 3. Extract token from URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get('token');

// 4. Store token
localStorage.setItem('token', token);

// 5. Fetch user data
const userResponse = await fetch('http://localhost:5000/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Logout Flow

```javascript
// 1. Call logout endpoint (optional)
await fetch('http://localhost:5000/api/auth/logout', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

// 2. Remove token from storage
localStorage.removeItem('token');
localStorage.removeItem('user');

// 3. Redirect to login
window.location.href = '/login';
```

---

## Axios Example (Frontend)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors automatically
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Usage
const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

const getMe = async () => {
  const response = await api.get('/auth/me');
  return response.data;
};
```

---

## Testing with cURL

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Current User
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <your_jwt_token>"
```

### Logout User
```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -H "Authorization: Bearer <your_jwt_token>"
```

---

## Testing with Postman

1. **Import Collection:**
   - Create a new collection named "Financial Management API"
   - Add environment variables:
     - `base_url`: `http://localhost:5000/api`
     - `token`: (will be set after login)

2. **Test Register:**
   - Method: POST
   - URL: `{{base_url}}/auth/register`
   - Body (JSON):
   ```json
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "password123"
   }
   ```
   - In Tests tab, add:
   ```javascript
   pm.environment.set("token", pm.response.json().token);
   ```

3. **Test Login:**
   - Method: POST
   - URL: `{{base_url}}/auth/login`
   - Body (JSON):
   ```json
   {
     "email": "john@example.com",
     "password": "password123"
   }
   ```
   - In Tests tab, add:
   ```javascript
   pm.environment.set("token", pm.response.json().token);
   ```

4. **Test Get Me:**
   - Method: GET
   - URL: `{{base_url}}/auth/me`
   - Headers:
     - `Authorization`: `Bearer {{token}}`

---

## Rate Limiting (Future Enhancement)

Consider implementing rate limiting to prevent abuse:

```javascript
// Example with express-rate-limit
import rateLimit from 'express-rate-limit';

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later.'
});

app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
```

---

Last Updated: January 17, 2026
