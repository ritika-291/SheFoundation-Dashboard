import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch leaderboard data from backend API
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/leaderboard');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setLeaderboardData(data);
      } catch (err) {
        console.error('Error fetching leaderboard data:', err);
        setError('Error loading leaderboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Get rank badge/emoji with enhanced styling
  const getRankBadge = (index) => {
    switch (index) {
      case 0:
        return { 
          emoji: '🥇', 
          color: 'text-yellow-600', 
          bgColor: 'bg-gradient-to-r from-yellow-100 to-orange-100',
          borderColor: 'border-yellow-300'
        };
      case 1:
        return { 
          emoji: '🥈', 
          color: 'text-gray-600', 
          bgColor: 'bg-gradient-to-r from-gray-100 to-gray-200',
          borderColor: 'border-gray-300'
        };
      case 2:
        return { 
          emoji: '🥉', 
          color: 'text-orange-600', 
          bgColor: 'bg-gradient-to-r from-orange-100 to-red-100',
          borderColor: 'border-orange-300'
        };
      default:
        return { 
          emoji: `${index + 1}`, 
          color: 'text-gray-500', 
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200'
        };
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading leaderboard...
          </p>
        </div>
      </div>
    );
  }

  // Error state with retry functionality
  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Oops!</h2>
          <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const totalRaised = leaderboardData.reduce((sum, intern) => sum + intern.totalDonations, 0);
  const averagePerIntern = leaderboardData.length > 0 ? Math.round(totalRaised / leaderboardData.length) : 0;

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`shadow-sm border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Intern Leaderboard
              </h1>
              <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                See how you rank among your peers
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className={`transition-colors ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                ← Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Summary */}
        <div className={`rounded-2xl shadow-lg p-6 mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">
                {leaderboardData.length}
              </div>
              <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Total Interns</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">
                {formatCurrency(totalRaised)}
              </div>
              <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Total Raised</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">
                {formatCurrency(averagePerIntern)}
              </div>
              <div className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Average per Intern</div>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className={`rounded-2xl shadow-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              🏆 Top Performers
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                <tr>
                  <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    Rank
                  </th>
                  <th className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    Intern Name
                  </th>
                  <th className={`px-6 py-4 text-right text-xs font-medium uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                    Total Donations
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-gray-700 bg-gray-800' : 'divide-gray-200 bg-white'}`}>
                {leaderboardData.map((intern, index) => {
                  const rankBadge = getRankBadge(index);
                  return (
                    <tr 
                      key={index} 
                      className={`transition-colors ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full border-2 ${rankBadge.bgColor} ${rankBadge.borderColor} ${rankBadge.color} font-semibold text-sm`}>
                          {rankBadge.emoji}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {intern.name}
                          </div>
                          {index < 3 && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Top 3
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="text-sm font-semibold text-green-600">
                          {formatCurrency(intern.totalDonations)}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {leaderboardData.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                No data available
              </h3>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                Leaderboard data will appear here once available.
              </p>
            </div>
          )}
        </div>

        {/* Navigation back to Dashboard */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            <span className="mr-2">←</span>
            Back to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard; 