import React, { useState, useEffect } from 'react';
import { transactionAPI } from '../../services/api';
import './Transactions.css';

const TRANSACTION_CATEGORIES = {
  income: [
    { value: 'salary', label: 'Salary' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'business', label: 'Business' },
    { value: 'investment', label: 'Investment Returns' },
    { value: 'gift', label: 'Gift/Bonus' },
    { value: 'other_income', label: 'Other Income' },
  ],
  expense: [
    { value: 'groceries', label: 'Groceries' },
    { value: 'rent', label: 'Rent/Mortgage' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'dining', label: 'Dining Out' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'education', label: 'Education' },
    { value: 'insurance', label: 'Insurance' },
    { value: 'debt_payment', label: 'Debt Payment' },
    { value: 'savings', label: 'Savings' },
    { value: 'other_expense', label: 'Other Expense' },
  ],
};

const TransactionForm = ({ onSuccess, editTransaction, onCancel }) => {
  const [formData, setFormData] = useState({
    type: 'expense',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editTransaction) {
      setFormData({
        type: editTransaction.type,
        category: editTransaction.category,
        amount: editTransaction.amount,
        description: editTransaction.description,
        date: new Date(editTransaction.date).toISOString().split('T')[0],
        notes: editTransaction.notes || '',
      });
    }
  }, [editTransaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset category when type changes
      ...(name === 'type' ? { category: '' } : {}),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (editTransaction) {
        await transactionAPI.updateTransaction(editTransaction._id, formData);
      } else {
        await transactionAPI.createTransaction(formData);
      }

      // Reset form
      setFormData({
        type: 'expense',
        category: '',
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
      });

      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit}>
      <h3>{editTransaction ? 'Edit Transaction' : 'Add Transaction'}</h3>

      {error && <div className="form-error">{error}</div>}

      <div className="form-row">
        <div className="form-group">
          <label>Type *</label>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="form-group">
          <label>Category *</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {TRANSACTION_CATEGORIES[formData.type].map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Amount ($) *</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            placeholder="0.00"
            required
          />
        </div>

        <div className="form-group">
          <label>Date *</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Description *</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description"
          maxLength="200"
          required
        />
      </div>

      <div className="form-group">
        <label>Notes (Optional)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional details..."
          maxLength="500"
          rows="3"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Saving...' : editTransaction ? 'Update' : 'Add Transaction'}
        </button>
        {editTransaction && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TransactionForm;
