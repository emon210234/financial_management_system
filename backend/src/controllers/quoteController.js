import OpenAI from 'openai';
import Quote from '../models/Quote.js';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// @desc    Get daily quote
// @route   GET /api/quotes/daily
// @access  Public
export const getDailyQuote = async (req, res) => {
  try {
    // Check if there's an active quote that hasn't expired
    const existingQuote = await Quote.findOne({
      isActive: true,
      expiresAt: { $gt: new Date() },
    }).sort({ createdAt: -1 });

    if (existingQuote) {
      return res.status(200).json({
        success: true,
        quote: {
          text: existingQuote.text,
          generatedAt: existingQuote.generatedAt,
          expiresAt: existingQuote.expiresAt,
        },
      });
    }

    // No active quote found, generate a new one
    const newQuote = await generateNewQuote();

    res.status(200).json({
      success: true,
      quote: {
        text: newQuote.text,
        generatedAt: newQuote.generatedAt,
        expiresAt: newQuote.expiresAt,
      },
    });
  } catch (error) {
    console.error('Get daily quote error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch daily quote',
      error: error.message,
    });
  }
};

// @desc    Generate new quote using AI
// @route   POST /api/quotes/generate (Admin only in future)
// @access  Private
export const generateNewQuote = async () => {
  try {
    // Deactivate all previous quotes
    await Quote.updateMany({ isActive: true }, { isActive: false });

    // Generate quote using OpenAI
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a financial wisdom expert. Generate an inspiring, motivational quote about financial management, saving money, budgeting, or building wealth. The quote should be:
- Between 15-40 words
- Inspiring and actionable
- Related to personal finance, saving, budgeting, or wealth building
- Encourage smart financial decisions
- Motivate people to save and spend wisely
Only return the quote text, nothing else.`,
        },
        {
          role: 'user',
          content: 'Generate an inspiring financial wisdom quote for today.',
        },
      ],
      max_tokens: 100,
      temperature: 0.9,
    });

    const quoteText = completion.choices[0].message.content.trim();

    // Remove quotes if AI added them
    const cleanedQuote = quoteText.replace(/^["']|["']$/g, '');

    // Create new quote with 24-hour expiration
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24);

    const newQuote = await Quote.create({
      text: cleanedQuote,
      generatedAt: new Date(),
      expiresAt: expirationDate,
      isActive: true,
    });

    return newQuote;
  } catch (error) {
    console.error('Generate quote error:', error);
    
    // Fallback quotes in case OpenAI fails
    const fallbackQuotes = [
      "Every dollar saved today is a step toward financial freedom tomorrow.",
      "A budget is telling your money where to go instead of wondering where it went.",
      "Wealth is not about having a lot of money; it's about having a lot of options.",
      "The habit of saving is itself an education; it fosters every virtue, teaches self-denial.",
      "Don't save what is left after spending; spend what is left after saving.",
      "Financial freedom is available to those who learn about it and work for it.",
      "The best time to plant a tree was 20 years ago. The second best time is now. Same goes for saving.",
    ];

    const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24);

    const fallbackQuoteDoc = await Quote.create({
      text: randomQuote,
      generatedAt: new Date(),
      expiresAt: expirationDate,
      isActive: true,
    });

    return fallbackQuoteDoc;
  }
};

// @desc    Force regenerate quote (for testing or manual refresh)
// @route   POST /api/quotes/refresh
// @access  Private (requires authentication)
export const refreshQuote = async (req, res) => {
  try {
    const newQuote = await generateNewQuote();

    res.status(200).json({
      success: true,
      message: 'Quote refreshed successfully',
      quote: {
        text: newQuote.text,
        generatedAt: newQuote.generatedAt,
        expiresAt: newQuote.expiresAt,
      },
    });
  } catch (error) {
    console.error('Refresh quote error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to refresh quote',
      error: error.message,
    });
  }
};
