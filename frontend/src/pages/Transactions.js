import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { transactionAPI } from '../services/api';
import TransactionForm from '../components/transactions/TransactionForm';
import TransactionList from '../components/transactions/TransactionList';
import FinancialSummary from '../components/transactions/FinancialSummary';
import AIInsights from '../components/transactions/AIInsights';
import './Transactions.css';

const Transactions = () => {
  const { user, logout } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState(null);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch transactions based on active tab
      const filters = {};
      if (activeTab !== 'all') {
        filters.type = activeTab;
      }

      const [transactionsRes, summaryRes] = await Promise.all([
        transactionAPI.getTransactions(filters),
        transactionAPI.getSummary(),
      ]);

      setTransactions(transactionsRes.data);
      setSummary(summaryRes.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const fetchAIAnalysis = async () => {
    setAiLoading(true);
    try {
      const response = await transactionAPI.getAIAnalysis();
      setAiAnalysis(response.data);
    } catch (err) {
      console.error('AI analysis error:', err);
      setAiAnalysis({
        analysis: 'Unable to generate AI insights at this time. Please try again later.',
        recommendations: [],
        insights: [],
      });
    } finally {
      setAiLoading(false);
    }
  };

  const handleTransactionSuccess = () => {
    setShowForm(false);
    setEditingTransaction(null);
    fetchData();
    // Refresh AI analysis if it was previously loaded
    if (aiAnalysis) {
      fetchAIAnalysis();
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingTransaction(null);
    setShowForm(false);
  };

  return (
    <div className="transactions-page">
      <nav className="dashboard-nav">
        <h1>💼 Financial Tracker</h1>
        <div className="nav-actions">
          <span className="user-greeting">Hello, {user?.email?.split('@')[0]}!</span>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <div className="transactions-content">
        <div className="main-section">
          {/* Financial Summary */}
          {!loading && summary && <FinancialSummary summary={summary} />}

          {/* Add Transaction Button */}
          <div className="section-header">
            <h2>💳 Transactions</h2>
            <button
              className="btn-add"
              onClick={() => {
                setShowForm(!showForm);
                setEditingTransaction(null);
              }}
            >
              {showForm ? '❌ Cancel' : '➕ Add Transaction'}
            </button>
          </div>

          {/* Transaction Form */}
          {showForm && (
            <TransactionForm
              onSuccess={handleTransactionSuccess}
              editTransaction={editingTransaction}
              onCancel={handleCancelEdit}
            />
          )}

          {/* Filter Tabs */}
          <div className="transaction-tabs">
            <button
              className={`tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button
              className={`tab ${activeTab === 'income' ? 'active' : ''}`}
              onClick={() => setActiveTab('income')}
            >
              💰 Income
            </button>
            <button
              className={`tab ${activeTab === 'expense' ? 'active' : ''}`}
              onClick={() => setActiveTab('expense')}
            >
              💸 Expenses
            </button>
          </div>

          {/* Transaction List */}
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading transactions...</p>
            </div>
          ) : error ? (
            <div className="error-state">
              <p>😕 {error}</p>
              <button onClick={fetchData} className="btn-retry">
                Try Again
              </button>
            </div>
          ) : (
            <TransactionList
              transactions={transactions}
              onUpdate={handleEdit}
              onDelete={fetchData}
            />
          )}
        </div>

        {/* AI Insights Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-sticky">
            {!aiAnalysis ? (
              <div className="ai-prompt">
                <h3>🤖 Get AI Insights</h3>
                <p>Get personalized financial advice based on your spending patterns</p>
                <button
                  className="btn-ai"
                  onClick={fetchAIAnalysis}
                  disabled={aiLoading || transactions.length === 0}
                >
                  {aiLoading ? 'Analyzing...' : 'Analyze My Finances'}
                </button>
                {transactions.length === 0 && (
                  <p className="ai-hint">Add some transactions to get started</p>
                )}
              </div>
            ) : (
              <>
                <AIInsights
                  analysis={aiAnalysis}
                  loading={aiLoading}
                  error={null}
                />
                <button
                  className="btn-refresh-ai"
                  onClick={fetchAIAnalysis}
                  disabled={aiLoading}
                >
                  🔄 Refresh Analysis
                </button>
              </>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Transactions;
