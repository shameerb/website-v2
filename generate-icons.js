const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Source SVG file
const sourceIcon = path.join(__dirname, 'public', 'icon.svg');

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Define the icon sizes to generate
const iconSizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
];

async function generateIcons() {
  try {
    // Generate PNG files
    for (const icon of iconSizes) {
      // Small icons go in the public root
      const outputPath = icon.size <= 48 
        ? path.join(__dirname, 'public', icon.name)
        : path.join(iconsDir, icon.name);
      
      await sharp(sourceIcon)
        .resize(icon.size, icon.size)
        .png()
        .toFile(outputPath);
      
      console.log(`Generated: ${outputPath}`);
    }

    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons(); 