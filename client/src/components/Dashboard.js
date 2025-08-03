import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [internData, setInternData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch intern data from backend API
  useEffect(() => {
    const fetchInternData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/intern-data');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setInternData(data);
      } catch (err) {
        console.error('Error fetching intern data:', err);
        setError('Error loading data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInternData();
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

  // Calculate progress percentage
  const calculateProgress = (current, target = 2000) => {
    return Math.min((current / target) * 100, 100);
  };

  // Get achievement level
  const getAchievementLevel = (donations) => {
    if (donations >= 2000) return { level: 'Diamond', color: 'from-purple-500 to-pink-500', icon: '💎' };
    if (donations >= 1500) return { level: 'Platinum', color: 'from-gray-500 to-gray-700', icon: '🥇' };
    if (donations >= 1000) return { level: 'Gold', color: 'from-yellow-500 to-orange-500', icon: '🥇' };
    if (donations >= 500) return { level: 'Silver', color: 'from-gray-400 to-gray-600', icon: '🥈' };
    if (donations >= 250) return { level: 'Bronze', color: 'from-orange-500 to-red-500', icon: '🥉' };
    return { level: 'Rookie', color: 'from-green-500 to-blue-500', icon: '🌱' };
  };

  // Loading state with enhanced animation
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading your dashboard...
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

  const achievement = getAchievementLevel(internData?.totalDonations || 0);
  const progress = calculateProgress(internData?.totalDonations || 0);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <header className={`shadow-sm border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Intern Dashboard
              </h1>
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
                onClick={() => navigate('/')}
                className={`transition-colors ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Welcome Section */}
          <div className="lg:col-span-2">
            <div className={`rounded-2xl shadow-lg p-8 mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Hello, {internData?.name || 'Intern'}! 👋
                </h2>
                <div className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${achievement.color} text-white`}>
                  {achievement.icon} {achievement.level}
                </div>
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Welcome to your personalized dashboard. Track your progress and see your achievements!
              </p>
            </div>

            {/* Progress Section */}
            <div className={`rounded-2xl shadow-lg p-6 mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Progress to Next Level
              </h3>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {formatCurrency(internData?.totalDonations || 0)} / $2,000
                  </span>
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Referral Code Card */}
              <div className={`rounded-2xl shadow-lg p-6 hover-shadow transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Your Referral Code
                    </h3>
                    <p className="text-3xl font-bold text-blue-600 font-mono">
                      {internData?.referralCode || 'N/A'}
                    </p>
                  </div>
                  <div className="text-4xl">🎫</div>
                </div>
              </div>

              {/* Total Donations Card */}
              <div className={`rounded-2xl shadow-lg p-6 hover-shadow transition-all ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Total Donations Raised
                    </h3>
                    <p className="text-3xl font-bold text-green-600">
                      {formatCurrency(internData?.totalDonations || 0)}
                    </p>
                  </div>
                  <div className="text-4xl">💰</div>
                </div>
              </div>
            </div>
          </div>

          {/* Rewards Section */}
          <div className="lg:col-span-1">
            <div className={`rounded-2xl shadow-lg p-6 sticky top-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Your Rewards & Unlockables
              </h3>
              
              <div className="space-y-4">
                {/* Achievement Badge */}
                <div className={`flex items-center p-4 bg-gradient-to-r ${achievement.color} rounded-lg border border-opacity-20`}>
                  <div className="text-2xl mr-3">{achievement.icon}</div>
                  <div>
                    <h4 className="font-semibold text-white">{achievement.level} Level</h4>
                    <p className="text-sm text-white text-opacity-80">Current achievement</p>
                  </div>
                </div>

                {/* Reward Items */}
                <div className={`flex items-center p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'}`}>
                  <div className="text-2xl mr-3">🏅</div>
                  <div>
                    <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>First 10 Donations!</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Badge unlocked</p>
                  </div>
                </div>

                <div className={`flex items-center p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'}`}>
                  <div className="text-2xl mr-3">📜</div>
                  <div>
                    <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Certificate of Excellence</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Bronze Tier</p>
                  </div>
                </div>

                <div className={`flex items-center p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'}`}>
                  <div className="text-2xl mr-3">⭐</div>
                  <div>
                    <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Top Performer</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Monthly recognition</p>
                  </div>
                </div>

                <div className={`flex items-center p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200'}`}>
                  <div className="text-2xl mr-3">🎯</div>
                  <div>
                    <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Goal Crusher</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Exceeded targets</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation to Leaderboard */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/leaderboard')}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            <span className="mr-2">🏆</span>
            View Leaderboard
            <span className="ml-2">→</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 