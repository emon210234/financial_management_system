import express from 'express';
import { getDailyQuote, refreshQuote } from '../controllers/quoteController.js';
import { authenticateJWT } from '../middleware/auth.js';

const router = express.Router();

// Public route - anyone can get the daily quote
router.get('/daily', getDailyQuote);

// Protected route - only authenticated users can force refresh
router.post('/refresh', authenticateJWT, refreshQuote);

export default router;
