
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Starting development environment setup...');

try {
  // Check if node_modules exists
  if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
    console.log('Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
  }

  console.log('\nStarting development server...');
  try {
    // Try using npx vite first
    console.log('Running with npx vite...');
    execSync('npx vite --host 0.0.0.0 --port 8080', { stdio: 'inherit' });
  } catch (error) {
    console.log('\nFailed to start with npx vite. Trying alternate method...');
    try {
      // Try using npm run dev
      console.log('Running with npm run dev...');
      execSync('npm run dev', { stdio: 'inherit' });
    } catch (runError) {
      console.log('\nFailed to start the development server using standard methods.');
      console.log('Attempting to install Vite globally and then start server...');
      
      // Install Vite globally as a last resort
      execSync('npm install -g vite', { stdio: 'inherit' });
      console.log('\nStarting server with global Vite...');
      execSync('vite --host 0.0.0.0 --port 8080', { stdio: 'inherit' });
    }
  }
} catch (error) {
  console.error('\nAn error occurred:', error.message);
  console.log('\nTroubleshooting steps:');
  console.log('1. Make sure you have Node.js v14 or higher installed');
  console.log('2. Try running: npm install -g vite');
  console.log('3. Try running: npx vite --host 0.0.0.0 --port 8080');
  console.log('4. Check if port 8080 is already in use by another application');
  process.exit(1);
}
