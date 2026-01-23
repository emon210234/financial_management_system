import Transaction from '../models/Transaction.js';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// @desc    Get all transactions for logged-in user
// @route   GET /api/transactions
// @access  Private
export const getTransactions = async (req, res) => {
  try {
    const { type, category, startDate, endDate, limit = 50 } = req.query;

    const query = { user: req.user.id };

    if (type) query.type = type;
    if (category) query.category = category;
    
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      count: transactions.length,
      data: transactions,
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transactions',
    });
  }
};

// @desc    Get single transaction
// @route   GET /api/transactions/:id
// @access  Private
export const getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    // Make sure user owns this transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this transaction',
      });
    }

    res.json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transaction',
    });
  }
};

// @desc    Create new transaction
// @route   POST /api/transactions
// @access  Private
export const createTransaction = async (req, res) => {
  try {
    const { type, category, amount, description, date, notes } = req.body;

    // Validate required fields
    if (!type || !category || !amount || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    const transaction = await Transaction.create({
      user: req.user.id,
      type,
      category,
      amount,
      description,
      date: date || Date.now(),
      notes,
    });

    res.status(201).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.error('Create transaction error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors).map(err => err.message).join(', '),
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create transaction',
    });
  }
};

// @desc    Update transaction
// @route   PUT /api/transactions/:id
// @access  Private
export const updateTransaction = async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    // Make sure user owns this transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this transaction',
      });
    }

    transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    console.error('Update transaction error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors).map(err => err.message).join(', '),
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update transaction',
    });
  }
};

// @desc    Delete transaction
// @route   DELETE /api/transactions/:id
// @access  Private
export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    // Make sure user owns this transaction
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this transaction',
      });
    }

    await transaction.deleteOne();

    res.json({
      success: true,
      message: 'Transaction deleted successfully',
    });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete transaction',
    });
  }
};

// @desc    Get financial summary
// @route   GET /api/transactions/summary
// @access  Private
export const getSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const totalIncome = await Transaction.getTotalIncome(req.user.id, startDate, endDate);
    const totalExpenses = await Transaction.getTotalExpenses(req.user.id, startDate, endDate);
    const expensesByCategory = await Transaction.getExpensesByCategory(req.user.id, startDate, endDate);

    const balance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(2) : 0;

    res.json({
      success: true,
      data: {
        totalIncome,
        totalExpenses,
        balance,
        savingsRate,
        expensesByCategory,
      },
    });
  } catch (error) {
    console.error('Get summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch financial summary',
    });
  }
};

// @desc    Get AI financial analysis
// @route   GET /api/transactions/analysis
// @access  Private
export const getAIAnalysis = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Get financial data
    const totalIncome = await Transaction.getTotalIncome(req.user.id, startDate, endDate);
    const totalExpenses = await Transaction.getTotalExpenses(req.user.id, startDate, endDate);
    const expensesByCategory = await Transaction.getExpensesByCategory(req.user.id, startDate, endDate);
    
    const balance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(2) : 0;

    // Get recent transactions for context
    const recentTransactions = await Transaction.find({ user: req.user.id })
      .sort({ date: -1 })
      .limit(20);

    if (recentTransactions.length === 0) {
      return res.json({
        success: true,
        data: {
          analysis: 'Start tracking your income and expenses to receive personalized AI insights about your financial habits!',
          recommendations: [
            'Add your income sources to track earnings',
            'Record daily expenses to understand spending patterns',
            'Set financial goals and monitor progress',
          ],
          insights: [],
        },
      });
    }

    // Prepare data for AI analysis
    const financialData = {
      totalIncome: totalIncome.toFixed(2),
      totalExpenses: totalExpenses.toFixed(2),
      balance: balance.toFixed(2),
      savingsRate: `${savingsRate}%`,
      topExpenseCategories: expensesByCategory.slice(0, 5).map(cat => ({
        category: cat._id,
        amount: cat.total.toFixed(2),
        count: cat.count,
      })),
      transactionCount: recentTransactions.length,
    };

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional financial advisor providing personalized insights based on user spending data. Provide constructive, actionable advice in a friendly tone. Focus on savings opportunities, spending patterns, and financial health.',
          },
          {
            role: 'user',
            content: `Analyze this financial data and provide insights:\n\nIncome: $${financialData.totalIncome}\nExpenses: $${financialData.totalExpenses}\nBalance: $${financialData.balance}\nSavings Rate: ${financialData.savingsRate}\n\nTop Expense Categories:\n${financialData.topExpenseCategories.map(c => `- ${c.category}: $${c.amount} (${c.count} transactions)`).join('\n')}\n\nProvide:\n1. A brief overall analysis (2-3 sentences)\n2. Three specific recommendations for improvement\n3. Two positive insights about their financial habits\n\nFormat as JSON with keys: analysis (string), recommendations (array of strings), insights (array of strings)`,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const aiResponse = JSON.parse(completion.choices[0].message.content);

      res.json({
        success: true,
        data: {
          ...aiResponse,
          financialSummary: financialData,
        },
      });
    } catch (aiError) {
      console.error('OpenAI API error:', aiError);

      // Fallback analysis
      const fallbackAnalysis = generateFallbackAnalysis(financialData);
      
      res.json({
        success: true,
        data: fallbackAnalysis,
      });
    }
  } catch (error) {
    console.error('Get AI analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate financial analysis',
    });
  }
};

// Fallback analysis when AI is unavailable
function generateFallbackAnalysis(data) {
  const savingsRate = parseFloat(data.savingsRate);
  const balance = parseFloat(data.balance);
  
  let analysis = '';
  const recommendations = [];
  const insights = [];

  if (savingsRate > 20) {
    analysis = `Excellent work! You're maintaining a ${data.savingsRate} savings rate, which is above the recommended 20%. Your balance of $${data.balance} shows strong financial discipline.`;
    insights.push('Your savings rate exceeds financial expert recommendations');
    insights.push('You\'re building a solid financial foundation');
  } else if (savingsRate > 0) {
    analysis = `You're saving ${data.savingsRate} of your income. While positive, there's room to optimize spending and increase your savings rate toward the 20% target.`;
    recommendations.push('Try to gradually increase your savings rate to 20% or higher');
  } else {
    analysis = `Your expenses currently exceed your income by $${Math.abs(balance).toFixed(2)}. It's important to review spending and find areas to reduce expenses.`;
    recommendations.push('Identify non-essential expenses that can be reduced or eliminated');
    recommendations.push('Look for ways to increase your income through side projects or career advancement');
  }

  if (data.topExpenseCategories.length > 0) {
    const topCategory = data.topExpenseCategories[0];
    recommendations.push(`Your highest expense is ${topCategory.category} at $${topCategory.amount}. Review if this can be optimized`);
  }

  recommendations.push('Set up automatic transfers to savings on payday');
  recommendations.push('Track daily expenses to identify spending patterns');

  if (insights.length === 0) {
    insights.push('You\'re actively tracking your finances, which is the first step to financial success');
    insights.push('Consistent tracking helps identify spending trends and opportunities');
  }

  return {
    analysis,
    recommendations: recommendations.slice(0, 3),
    insights: insights.slice(0, 2),
    financialSummary: data,
  };
}
