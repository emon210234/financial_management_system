import React from 'react';

const FinancialSummary = ({ summary }) => {
  if (!summary) return null;

  const { totalIncome, totalExpenses, balance, savingsRate, expensesByCategory } = summary;

  const getSavingsColor = (rate) => {
    if (rate >= 20) return 'excellent';
    if (rate >= 10) return 'good';
    if (rate >= 0) return 'fair';
    return 'poor';
  };

  const formatCategory = (category) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="financial-summary">
      <h3>📈 Financial Overview</h3>
      
      <div className="summary-cards">
        <div className="summary-card income">
          <div className="card-icon">💰</div>
          <div className="card-content">
            <p className="card-label">Total Income</p>
            <p className="card-value">${totalIncome.toFixed(2)}</p>
          </div>
        </div>

        <div className="summary-card expense">
          <div className="card-icon">💸</div>
          <div className="card-content">
            <p className="card-label">Total Expenses</p>
            <p className="card-value">${totalExpenses.toFixed(2)}</p>
          </div>
        </div>

        <div className={`summary-card balance ${balance >= 0 ? 'positive' : 'negative'}`}>
          <div className="card-icon">{balance >= 0 ? '✅' : '⚠️'}</div>
          <div className="card-content">
            <p className="card-label">Balance</p>
            <p className="card-value">${balance.toFixed(2)}</p>
          </div>
        </div>

        <div className={`summary-card savings ${getSavingsColor(savingsRate)}`}>
          <div className="card-icon">🎯</div>
          <div className="card-content">
            <p className="card-label">Savings Rate</p>
            <p className="card-value">{savingsRate}%</p>
          </div>
        </div>
      </div>

      {expensesByCategory && expensesByCategory.length > 0 && (
        <div className="expense-breakdown">
          <h4>Top Expense Categories</h4>
          <div className="category-list">
            {expensesByCategory.slice(0, 5).map((cat, index) => (
              <div key={cat._id} className="category-item">
                <div className="category-info">
                  <span className="category-rank">#{index + 1}</span>
                  <span className="category-name">{formatCategory(cat._id)}</span>
                </div>
                <div className="category-stats">
                  <span className="category-amount">${cat.total.toFixed(2)}</span>
                  <span className="category-count">{cat.count} transactions</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialSummary;
