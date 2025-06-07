// Simple deploy script for GitHub Pages
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

try {
  console.log(`${colors.bright}${colors.cyan}Building for production...${colors.reset}`);
  // Clean the dist folder
  try {
    fs.rmSync('dist', { recursive: true, force: true });
    console.log(`${colors.green}Cleaned previous build${colors.reset}`);
  } catch (e) {
    console.log(`${colors.yellow}No previous build to clean${colors.reset}`);
  }

  // Build the project
  execSync('npm run build', { stdio: 'inherit' });
  console.log(`${colors.green}Build complete!${colors.reset}`);

  // Create a .nojekyll file to prevent GitHub Pages from ignoring files that begin with an underscore
  fs.writeFileSync(path.join('dist', '.nojekyll'), '');
  console.log(`${colors.green}Created .nojekyll file${colors.reset}`);

  // Deploy to GitHub Pages
  console.log(`${colors.bright}${colors.cyan}Deploying to GitHub Pages...${colors.reset}`);
  execSync('npm run deploy', { stdio: 'inherit' });
  console.log(`${colors.green}${colors.bright}Deployment complete! Your site should be live shortly.${colors.reset}`);
} catch (error) {
  console.error(`${colors.red}Deployment failed:${colors.reset}`, error);
  process.exit(1);
}
