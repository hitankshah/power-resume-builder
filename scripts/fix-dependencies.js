#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

console.log('🔍 Checking project for dependency issues...');

// Read package.json
const packagePath = path.join(process.cwd(), 'package.json');
const packageLockPath = path.join(process.cwd(), 'package-lock.json');
const nodeModulesPath = path.join(process.cwd(), 'node_modules');

if (!fs.existsSync(packagePath)) {
  console.error('❌ package.json not found!');
  process.exit(1);
}

// Parse package.json
const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

// Essential React dependencies
const essentialDeps = {
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-scripts": "5.0.1",
  "web-vitals": "^2.1.4"
};

let needsUpdate = false;

// Check for missing essential dependencies
for (const [dep, version] of Object.entries(essentialDeps)) {
  if (!packageJson.dependencies || !packageJson.dependencies[dep]) {
    console.log(`⚠️ Missing essential dependency: ${dep}`);
    packageJson.dependencies = packageJson.dependencies || {};
    packageJson.dependencies[dep] = version;
    needsUpdate = true;
  }
}

// Add dependencies fixes if needed
if (needsUpdate) {
  console.log('✍️ Updating package.json with required dependencies...');
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
}

// Clean installation
console.log('🧹 Cleaning up installation...');

// Check if node_modules exists
if (fs.existsSync(nodeModulesPath)) {
  console.log('📦 Removing node_modules directory...');
  try {
    fs.rmSync(nodeModulesPath, { recursive: true, force: true });
  } catch (err) {
    console.warn(`⚠️ Could not remove node_modules: ${err.message}`);
  }
}

// Check if package-lock.json exists
if (fs.existsSync(packageLockPath)) {
  console.log('🔒 Removing package-lock.json...');
  try {
    fs.unlinkSync(packageLockPath);
  } catch (err) {
    console.warn(`⚠️ Could not remove package-lock.json: ${err.message}`);
  }
}

// Install dependencies
console.log('📦 Reinstalling dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies reinstalled successfully!');
} catch (err) {
  console.error(`❌ Failed to install dependencies: ${err.message}`);
  process.exit(1);
}

console.log('🚀 Project dependencies fixed. Try running the app now!');
