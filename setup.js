const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Intern Dashboard Application...\n');

function runCommand(command, description) {
  try {
    console.log(`📦 ${description}...`);
    execSync(command, { stdio: 'inherit' });
    console.log(`✅ ${description} completed successfully!\n`);
  } catch (error) {
    console.error(`❌ Error during ${description}:`, error.message);
    process.exit(1);
  }
}

try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' });
  console.log(`✅ Node.js version: ${nodeVersion.trim()}`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js first.');
  process.exit(1);
}

runCommand('npm install', 'Installing backend dependencies');

if (!fs.existsSync(path.join(__dirname, 'client'))) {
  console.error('❌ Client directory not found. Please ensure the project structure is correct.');
  process.exit(1);
}

runCommand('cd client && npm install', 'Installing frontend dependencies');

const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, 'env.example');

if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
  console.log('📝 Creating .env file from template...');
  fs.copyFileSync(envExamplePath, envPath);
  console.log('✅ .env file created successfully!\n');
}

console.log('🎉 Setup completed successfully!');
console.log('\n📋 Next steps:');
console.log('1. Edit the .env file with your MongoDB connection string');
console.log('2. Start MongoDB (local or Atlas)');
console.log('3. Run the application:');
console.log('   - Backend: npm run dev');
console.log('   - Frontend: cd client && npm start');
console.log('\n🌐 Access the application at:');
console.log('   - Frontend: http://localhost:3000');
console.log('   - Backend API: http://localhost:5000');
console.log('\n📖 For more information, see README.md'); 