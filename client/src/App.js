import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <Routes>
          {/* Login/Signup Page - Default route */}
          <Route path="/" element={<LoginPage />} />
          
          {/* Dashboard Page */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Leaderboard Page */}
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 