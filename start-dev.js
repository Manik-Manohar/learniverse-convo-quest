
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Starting development environment setup...');

try {
  // Check if node_modules exists
  if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
    console.log('Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
  }

  console.log('\nStarting development server...');
  try {
    // Try using npx vite with host flag to expose network
    console.log('Running with npx vite --host...');
    execSync('npx vite --host', { stdio: 'inherit' });
  } catch (error) {
    console.log('\nFailed to start with npx vite. Trying alternate method...');
    try {
      // Try installing vite locally and using npx
      console.log('Installing vite locally and trying again...');
      execSync('npm install --save-dev vite', { stdio: 'inherit' });
      execSync('npx vite --host', { stdio: 'inherit' });
    } catch (runError) {
      console.log('\nFailed to start the development server using standard methods.');
      console.log('Attempting to install Vite globally and then start server...');
      
      // Install Vite globally as a last resort
      execSync('npm install -g vite', { stdio: 'inherit' });
      console.log('\nStarting server with global Vite...');
      execSync('vite --host', { stdio: 'inherit' });
    }
  }
} catch (error) {
  console.error('\nAn error occurred:', error.message);
  console.log('\nTroubleshooting steps:');
  console.log('1. Make sure you have Node.js v14 or higher installed');
  console.log('2. Try running: npx vite --host');
  console.log('3. Try running: npm install -g vite');
  console.log('4. Try running: vite --host');
  process.exit(1);
}
