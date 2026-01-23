import React from 'react';

const AIInsights = ({ analysis, loading, error }) => {
  if (loading) {
    return (
      <div className="ai-insights loading">
        <div className="spinner"></div>
        <p>Analyzing your financial data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ai-insights error">
        <p>😕 {error}</p>
      </div>
    );
  }

  if (!analysis) return null;

  const { analysis: mainAnalysis, recommendations, insights } = analysis;

  return (
    <div className="ai-insights">
      <div className="insights-header">
        <h3>🤖 AI Financial Insights</h3>
        <span className="insights-badge">Powered by AI</span>
      </div>

      {mainAnalysis && (
        <div className="insights-section analysis">
          <h4>📊 Overall Analysis</h4>
          <p className="analysis-text">{mainAnalysis}</p>
        </div>
      )}

      {recommendations && recommendations.length > 0 && (
        <div className="insights-section recommendations">
          <h4>💡 Recommendations</h4>
          <ul className="recommendation-list">
            {recommendations.map((rec, index) => (
              <li key={index} className="recommendation-item">
                <span className="rec-icon">→</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {insights && insights.length > 0 && (
        <div className="insights-section positives">
          <h4>✨ Positive Insights</h4>
          <ul className="insight-list">
            {insights.map((insight, index) => (
              <li key={index} className="insight-item">
                <span className="insight-icon">✓</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AIInsights;
