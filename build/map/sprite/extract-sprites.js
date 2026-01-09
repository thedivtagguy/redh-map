#!/usr/bin/env node
/**
 * Extract individual sprites from a sprite sheet.
 *
 * Usage: node extract-sprites.js
 *
 * This reads sprite.json and sprite.png, then extracts each sprite
 * into the ./icons/ directory as separate PNG files.
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function extractSprites() {
  const spriteJsonPath = path.join(__dirname, 'sprite.json');
  const spritePngPath = path.join(__dirname, 'sprite.png');
  const outputDir = path.join(__dirname, 'icons');

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Load sprite data
  const spriteData = JSON.parse(fs.readFileSync(spriteJsonPath, 'utf8'));

  // Get sprite sheet metadata
  const metadata = await sharp(spritePngPath).metadata();
  console.log(`Loaded sprite sheet: ${metadata.width}x${metadata.height}`);
  console.log(`Found ${Object.keys(spriteData).length} sprites to extract\n`);

  // Extract each sprite
  for (const [name, data] of Object.entries(spriteData)) {
    const { x, y, width, height, pixelRatio = 1 } = data;

    // Sanitize filename
    const safeName = name.replace(/[^a-zA-Z0-9_-]/g, '_');
    const outputPath = path.join(outputDir, `${safeName}.png`);

    // Extract the region
    await sharp(spritePngPath)
      .extract({ left: x, top: y, width, height })
      .toFile(outputPath);

    console.log(`✓ Extracted: ${safeName}.png (${width}x${height})`);
  }

  console.log(`\n✅ Done! Extracted ${Object.keys(spriteData).length} sprites to ./icons/`);
  console.log('\n📋 Sprite name mapping:');

  // Show name mapping for reference
  for (const name of Object.keys(spriteData)) {
    const safeName = name.replace(/[^a-zA-Z0-9_-]/g, '_');
    if (name !== safeName) {
      console.log(`   ${name} → ${safeName}.png`);
    }
  }

  console.log('\n📦 Next steps:');
  console.log('   1. Create SVG versions in ./svg/ directory for spritezero');
  console.log('   2. Run ./build-sprites.sh to rebuild the sprite sheet');
}

extractSprites().catch(console.error);
