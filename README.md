# Intern Dashboard – Full Stack Web Application

A responsive, real-time full-stack web application built with **React.js** and **Node.js**, designed for tracking intern performance, leaderboard rankings, and donation metrics. 
The project showcases best practices in full-stack architecture, data visualization, and modern web development.



## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

---

## ✨ Features

### Core Features
-  **Authentication & Authorization** – Secure login with session management
-  **Interactive Dashboard** – Real-time insights into intern activity and progress
-  **Leaderboard** – Live ranking system based on donation statistics
-  **Responsive UI** – Fully optimized for mobile, tablet, and desktop
-  **Dynamic Data** – Real-time updates with seamless data flow

### Technical Highlights
-  **RESTful Architecture** – Clean API separation for scalability
-  **MongoDB Integration** – Efficient NoSQL data modeling with Mongoose
-  **Error Handling** – Robust fallback and error management
-  **CORS Support** – Cross-origin request handling for frontend/backend integration
-  **Environment Configuration** – Easily customizable via `.env` files

---

## 🛠 Tech Stack

### Frontend
- **React.js 18.2.0**
- **React Router DOM 6.8.1**
- **HTML5**, **CSS3**

### Backend
- **Node.js**
- **Express.js 4.18.2**
- **MongoDB**
- **Mongoose 7.5.0**

### Tooling & Utilities
- **Nodemon 3.0.1**
- **dotenv 16.3.1**
- **npm** – Dependency management

---

## 📁 Project Structure
sheFoundation/
├── client/ # React frontend
│ ├── public/ # Static assets
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ │ ├── Dashboard.js
│ │ │ ├── Leaderboard.js
│ │ │ └── LoginPage.js
│ │ ├── App.js
│ │ └── index.js
│ └── package.json
├── server.js # Express server & API routes
├── setup.js # Database seeding script
├── package.json # Backend dependencies
├── .gitignore
├── env.example # Environment variable template


## installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- MongoDB (local or Atlas cloud)

### Step 1: Clone the Repository
```bash
git clone https://github.com/ritika-291/SheFoundation-Dashboard.git
cd SheFoundation
```
### Step 2: Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Step 3: Environment Configuration
```bash
# Copy environment variables template
cp env.example .env

# Edit .env file with your configuration
# MONGODB_URI=mongodb://localhost:27017/intern-dashboard
# PORT=5001\

### Step 4: Database Setup
```bash
# Start MongoDB (if using local instance)
mongod

# Initialize database with sample data
node setup.js
```
## Step 5: Start Development Servers
```bash
# Start backend server (Terminal 1)
npm run dev

# Start frontend development server (Terminal 2)
npm run client
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001
- ##  Usage

### Application Flow
1. **Login Page**: Users start at the authentication page
2. **Dashboard**: After login, users access their personalized dashboard
3. **Leaderboard**: View rankings and compare performance with other interns

### Key Features
- **Real-time Updates**: Dashboard data refreshes automatically
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Intuitive Navigation**: Clean, modern interface with easy navigation


## API Endpoints

### Intern Data
- `GET /api/intern-data` - Retrieve current intern information
- `GET /api/leaderboard` - Get leaderboard rankings
- `POST /api/intern-data` - Update intern data
- ### Response Format
json
{
  "name": "Alex Johnson",
  "referralCode": "alexj2025",
  "totalDonations": 1250
}
## 🗄 Database Schema

### Intern Collection
```javascript
{
  name: String,           // Intern's full name
  referralCode: String,   // Unique referral identifier
  totalDonations: Number  // Total donation amount
}
### Environment Variables for Production
- `MONGODB_URI`: MongoDB Atlas connection string
- `PORT`: Server port (Heroku sets this automatically)
- `NODE_ENV`: Set to 'production'

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
##  Author

**Your Name**
- GitHub: https://github.com/ritika-291
- LinkedIn: https://www.linkedin.com/in/ritika-kumari-b81a88290/
- Email: ritikakumari2910@gmail.com
