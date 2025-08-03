const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Fallback data when MongoDB is not available
const fallbackInternData = {
  name: "Alex Johnson",
  referralCode: "alexj2025",
  totalDonations: 1250
};

const fallbackLeaderboardData = [
  { name: "Alex Johnson", totalDonations: 1250 },
  { name: "Maria Garcia", totalDonations: 1100 },
  { name: "Ben Carter", totalDonations: 980 },
  { name: "Sarah Kim", totalDonations: 850 },
  { name: "David Chen", totalDonations: 720 },
  { name: "Emma Wilson", totalDonations: 650 },
  { name: "Michael Brown", totalDonations: 580 },
  { name: "Lisa Rodriguez", totalDonations: 420 }
];

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/intern-dashboard';

let isMongoConnected = false;
let Intern = null;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
  isMongoConnected = true;
  
  // Intern Schema
  const internSchema = new mongoose.Schema({
    name: { type: String, required: true },
    referralCode: { type: String, required: true },
    totalDonations: { type: Number, required: true }
  });

  Intern = mongoose.model('Intern', internSchema);

  // Initialize dummy data if collection is empty
  initializeDummyData();
})
.catch(err => {
  console.log('MongoDB connection failed, using fallback data');
  console.log('Error:', err.message);
  isMongoConnected = false;
});

// Initialize dummy data if collection is empty
async function initializeDummyData() {
  if (!isMongoConnected || !Intern) return;
  
  try {
    const count = await Intern.countDocuments();
    if (count === 0) {
      const dummyInterns = [
        { name: "Alex Johnson", referralCode: "alexj2025", totalDonations: 1250 },
        { name: "Maria Garcia", referralCode: "mariag2025", totalDonations: 1100 },
        { name: "Ben Carter", referralCode: "benc2025", totalDonations: 980 },
        { name: "Sarah Kim", referralCode: "sarahk2025", totalDonations: 850 },
        { name: "David Chen", referralCode: "davidc2025", totalDonations: 720 },
        { name: "Emma Wilson", referralCode: "emmaw2025", totalDonations: 650 },
        { name: "Michael Brown", referralCode: "michaelb2025", totalDonations: 580 },
        { name: "Lisa Rodriguez", referralCode: "lisar2025", totalDonations: 420 }
      ];
      
      await Intern.insertMany(dummyInterns);
      console.log('Dummy data initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing dummy data:', error);
  }
}

// API Routes

// GET /api/intern-data - Returns data for a single intern
app.get('/api/intern-data', async (req, res) => {
  try {
    if (isMongoConnected && Intern) {
      const intern = await Intern.findOne().select('name referralCode totalDonations');
      
      if (intern) {
        return res.json({
          name: intern.name,
          referralCode: intern.referralCode,
          totalDonations: intern.totalDonations
        });
      }
    }
    
    // Return fallback data if MongoDB is not available
    res.json(fallbackInternData);
  } catch (error) {
    console.error('Error fetching intern data:', error);
    // Return fallback data on error
    res.json(fallbackInternData);
  }
});

// GET /api/leaderboard - Returns all interns sorted by total donations
app.get('/api/leaderboard', async (req, res) => {
  try {
    if (isMongoConnected && Intern) {
      const interns = await Intern.find()
        .select('name totalDonations')
        .sort({ totalDonations: -1 }); // Sort in descending order
      
      const leaderboardData = interns.map(intern => ({
        name: intern.name,
        totalDonations: intern.totalDonations
      }));
      
      return res.json(leaderboardData);
    }
    
    // Return fallback data if MongoDB is not available
    res.json(fallbackLeaderboardData);
  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    // Return fallback data on error
    res.json(fallbackLeaderboardData);
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    mongoConnected: isMongoConnected
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api/`);
  console.log(`MongoDB Status: ${isMongoConnected ? 'Connected' : 'Not Connected (using fallback data)'}`);
}); 