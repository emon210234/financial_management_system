import express from 'express';
import passport from 'passport';
import { body } from 'express-validator';
import {
  register,
  login,
  googleCallback,
  getMe,
  logout,
} from '../controllers/authController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

// Validation middleware
const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

const loginValidation = [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
];

// Email/Password Authentication Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

// Google OAuth Routes
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: false,
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=authentication_failed`,
  }),
  googleCallback
);

// Protected Routes
router.get('/me', authenticateJWT, getMe);
router.post('/logout', authenticateJWT, logout);

export default router;
