import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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
          <div className="feature-card">
            <h3>📊 Financial Overview</h3>
            <p>View your financial summary and analytics</p>
          </div>
          
          <div className="feature-card">
            <h3>💰 Transactions</h3>
            <p>Track your income and expenses</p>
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
          <h3>🎉 Authentication System Active</h3>
          <p>You have successfully logged in to the Financial Management System!</p>
          <ul>
            <li>✅ Email/Password authentication working</li>
            <li>✅ Google OAuth authentication working</li>
            <li>✅ JWT-based session management active</li>
            <li>✅ Protected routes secured</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
