#!/usr/bin/env node
/**
 * Build sprite sheet from PNG images (alternative to spritezero for raster sprites)
 *
 * Usage: node build-sprites-png.js
 *
 * This reads all PNGs from ./icons/ and creates:
 *   - sprite.png + sprite.json (1x)
 *   - sprite@2x.png + sprite@2x.json (2x - assumes 2x source files in icons-2x/)
 *
 * For MapLibre/Mapbox GL compatibility.
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function buildSprites(inputDir, outputPrefix, pixelRatio = 1) {
  const icons = fs.readdirSync(inputDir)
    .filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'))
    .sort();

  if (icons.length === 0) {
    console.log(`No image files found in ${inputDir}`);
    return;
  }

  console.log(`\n📦 Building ${pixelRatio}x sprites from ${icons.length} images...`);

  // Get dimensions of all images
  const imageData = [];
  for (const file of icons) {
    const filePath = path.join(inputDir, file);
    const metadata = await sharp(filePath).metadata();
    const name = file.replace(/\.(png|jpg|jpeg)$/i, '').replace(/_/g, '='); // Restore original names

    // Fix common name patterns
    let spriteName = name;
    if (spriteName.startsWith('highway=')) spriteName = spriteName; // keep as is
    else if (spriteName.startsWith('landuse=')) spriteName = spriteName;
    else spriteName = name.replace(/=/g, '_'); // safety fallback

    imageData.push({
      name: spriteName,
      file,
      path: filePath,
      width: metadata.width,
      height: metadata.height
    });
  }

  // Simple vertical stacking (single column layout)
  let currentY = 0;
  const spriteJson = {};
  const composites = [];

  for (const img of imageData) {
    spriteJson[img.name] = {
      width: img.width,
      height: img.height,
      x: 0,
      y: currentY,
      pixelRatio: pixelRatio
    };

    composites.push({
      input: img.path,
      top: currentY,
      left: 0
    });

    console.log(`  ✓ ${img.name} (${img.width}x${img.height}) @ y=${currentY}`);
    currentY += img.height;
  }

  // Calculate total dimensions
  const maxWidth = Math.max(...imageData.map(i => i.width));
  const totalHeight = currentY;

  // Create the sprite sheet
  const spriteBuffer = await sharp({
    create: {
      width: maxWidth,
      height: totalHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    }
  })
    .composite(composites)
    .png()
    .toBuffer();

  // Write outputs
  const pngPath = `${outputPrefix}.png`;
  const jsonPath = `${outputPrefix}.json`;

  await sharp(spriteBuffer).toFile(pngPath);
  fs.writeFileSync(jsonPath, JSON.stringify(spriteJson));

  console.log(`\n  → ${pngPath} (${maxWidth}x${totalHeight})`);
  console.log(`  → ${jsonPath} (${Object.keys(spriteJson).length} sprites)`);
}

async function main() {
  const iconsDir = path.join(__dirname, 'icons');
  const icons2xDir = path.join(__dirname, 'icons-2x');
  const outputPrefix = path.join(__dirname, 'sprite');

  // Check if icons directory exists
  if (!fs.existsSync(iconsDir)) {
    console.error('❌ Error: ./icons/ directory not found');
    console.log('Run extract-sprites.js first or add your image sprites (PNG/JPG) to ./icons/');
    process.exit(1);
  }

  // Build 1x sprites
  await buildSprites(iconsDir, outputPrefix, 1);

  // Build 2x sprites if directory exists
  if (fs.existsSync(icons2xDir)) {
    await buildSprites(icons2xDir, `${outputPrefix}@2x`, 2);
  } else {
    console.log('\n⚠️  No icons-2x/ directory found. Creating 2x from 1x (upscaled)...');

    // Create 2x by upscaling 1x (not ideal but functional)
    const sprite1x = path.join(__dirname, 'sprite.png');
    const json1x = JSON.parse(fs.readFileSync(path.join(__dirname, 'sprite.json'), 'utf8'));

    // Update JSON for 2x
    const json2x = {};
    for (const [name, data] of Object.entries(json1x)) {
      json2x[name] = {
        ...data,
        width: data.width * 2,
        height: data.height * 2,
        x: data.x * 2,
        y: data.y * 2,
        pixelRatio: 2
      };
    }

    // Upscale the image
    const metadata = await sharp(sprite1x).metadata();
    await sharp(sprite1x)
      .resize(metadata.width * 2, metadata.height * 2, { kernel: 'nearest' })
      .toFile(path.join(__dirname, 'sprite@2x.png'));

    fs.writeFileSync(
      path.join(__dirname, 'sprite@2x.json'),
      JSON.stringify(json2x)
    );

    console.log('  → sprite@2x.png (upscaled from 1x)');
    console.log('  → sprite@2x.json');
  }

  console.log('\n✅ Sprite build complete!');
}

main().catch(console.error);
