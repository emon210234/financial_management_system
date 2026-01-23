import React, { useState } from 'react';
import { transactionAPI } from '../../services/api';

const TransactionList = ({ transactions, onUpdate, onDelete }) => {
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setLoading(true);
      setDeleteId(id);
      try {
        await transactionAPI.deleteTransaction(id);
        if (onDelete) onDelete();
      } catch (error) {
        console.error('Delete error:', error);
        alert('Failed to delete transaction');
      } finally {
        setLoading(false);
        setDeleteId(null);
      }
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatCategory = (category) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="empty-state">
        <p>📊 No transactions yet</p>
        <p className="empty-subtitle">Start tracking your income and expenses above</p>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      {transactions.map((transaction) => (
        <div
          key={transaction._id}
          className={`transaction-item ${transaction.type}`}
        >
          <div className="transaction-icon">
            {transaction.type === 'income' ? '💰' : '💸'}
          </div>

          <div className="transaction-details">
            <div className="transaction-header">
              <h4>{transaction.description}</h4>
              <span className={`transaction-amount ${transaction.type}`}>
                {transaction.type === 'income' ? '+' : '-'}
                ${transaction.amount.toFixed(2)}
              </span>
            </div>
            <div className="transaction-meta">
              <span className="transaction-category">
                {formatCategory(transaction.category)}
              </span>
              <span className="transaction-date">
                {formatDate(transaction.date)}
              </span>
            </div>
            {transaction.notes && (
              <p className="transaction-notes">{transaction.notes}</p>
            )}
          </div>

          <div className="transaction-actions">
            <button
              className="btn-icon edit"
              onClick={() => onUpdate(transaction)}
              title="Edit"
            >
              ✏️
            </button>
            <button
              className="btn-icon delete"
              onClick={() => handleDelete(transaction._id)}
              disabled={loading && deleteId === transaction._id}
              title="Delete"
            >
              {loading && deleteId === transaction._id ? '⏳' : '🗑️'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
