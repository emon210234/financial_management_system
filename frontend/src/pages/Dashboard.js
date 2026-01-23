import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { quoteAPI } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [quote, setQuote] = useState(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [quoteError, setQuoteError] = useState(null);

  // Fetch daily quote on component mount
  useEffect(() => {
    fetchDailyQuote();
  }, []);

  const fetchDailyQuote = async () => {
    try {
      setQuoteLoading(true);
      setQuoteError(null);
      const data = await quoteAPI.getDailyQuote();
      setQuote(data.quote);
    } catch (error) {
      console.error('Failed to fetch quote:', error);
      setQuoteError('Failed to load daily inspiration');
    } finally {
      setQuoteLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <h1>Financial Management System</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </nav>

      <div className="dashboard-content">
        {/* Daily Quote Section */}
        <div className="quote-section">
          {quoteLoading ? (
            <div className="quote-loading">
              <div className="spinner"></div>
              <p>Loading your daily inspiration...</p>
            </div>
          ) : quoteError ? (
            <div className="quote-error">
              <span>💡</span>
              <p>{quoteError}</p>
            </div>
          ) : quote ? (
            <div className="quote-card">
              <div className="quote-icon">💰</div>
              <blockquote className="quote-text">"{quote.text}"</blockquote>
              <div className="quote-footer">
                <span className="quote-label">Daily Financial Wisdom</span>
                <span className="quote-refresh" title="Refreshes automatically every 24 hours">
                  🔄 Refreshes daily
                </span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="welcome-card">
          <div className="user-info">
            {user?.profilePicture && (
              <img 
                src={user.profilePicture} 
                alt="Profile" 
                className="profile-picture"
              />
            )}
            <div>
              <h2>Welcome, {user?.name}!</h2>
              <p className="user-email">{user?.email}</p>
              <p className="auth-method">
                Logged in via: <strong>{user?.authProvider === 'google' ? 'Google' : 'Email/Password'}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card" onClick={() => navigate('/transactions')} style={{ cursor: 'pointer' }}>
            <h3>💰 Transactions</h3>
            <p>Track your income and expenses in real-time</p>
          </div>
          
          <div className="feature-card">
            <h3>📊 Financial Overview</h3>
            <p>View your financial summary and analytics</p>
          </div>
          
          <div className="feature-card">
            <h3>📈 Reports</h3>
            <p>Generate detailed financial reports</p>
          </div>
          
          <div className="feature-card">
            <h3>⚙️ Settings</h3>
            <p>Manage your account settings</p>
          </div>
        </div>

        <div className="info-card">
          <h3>🚀 Start Managing Your Finances</h3>
          <p>Click on the <strong>Transactions</strong> card above to start tracking your income and expenses!</p>
          <ul>
            <li>✅ Add income and expense transactions</li>
            <li>✅ Get AI-powered financial insights</li>
            <li>✅ Track spending by category</li>
            <li>✅ Monitor your savings rate</li>
            <li>✅ All data saved automatically</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
