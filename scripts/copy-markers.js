import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync, copyFileSync } from 'fs';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Source files from node_modules
const sourceDir = join(__dirname, '../node_modules/leaflet/dist/images');
const targetDir = join(__dirname, '../public');

// Files to copy
const files = [
  'marker-icon.png',
  'marker-icon-2x.png',
  'marker-shadow.png'
];

// Ensure target directory exists
if (!existsSync(targetDir)) {
  mkdirSync(targetDir, { recursive: true });
}

// Copy each file
files.forEach(file => {
  const sourcePath = join(sourceDir, file);
  const targetPath = join(targetDir, file);
  
  if (existsSync(sourcePath)) {
    copyFileSync(sourcePath, targetPath);
    console.log(`Copied ${file} to public directory`);
  } else {
    console.error(`Source file not found: ${sourcePath}`);
  }
}); 