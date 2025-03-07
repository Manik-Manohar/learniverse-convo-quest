
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Setting up your development environment...');

try {
  // Check if node_modules exists
  if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
    console.log('Installing dependencies...');
    execSync('npm install', { stdio: 'inherit' });
  }

  console.log('\nSetup complete! You can now run the development server with:');
  console.log('npm run dev');
} catch (error) {
  console.error('An error occurred during setup:', error.message);
  process.exit(1);
}
