# Cassini Sprite Pipeline

This directory contains the sprites for the Cassini vintage map style.

## Directory Structure

```
sprite/
├── icons/          # Individual 1x PNG sprites
├── icons-2x/       # Individual 2x PNG sprites (optional, for retina)
├── svg/            # SVG sprites for spritezero-cli (optional)
├── sprite.png      # Combined 1x sprite sheet
├── sprite.json     # 1x sprite metadata
├── sprite@2x.png   # Combined 2x sprite sheet
├── sprite@2x.json  # 2x sprite metadata
└── scripts...
```

## Workflow

### Extract existing sprites (one-time)

```bash
node extract-sprites.js
```

This splits `sprite.png` into individual PNGs in `./icons/`.

### Add new sprites

1. Create your texture/icon as a PNG
2. Make it **seamlessly tileable** if it's a fill pattern (see tips below)
3. Place it in `./icons/` with a descriptive name
4. For retina support, create a 2x version in `./icons-2x/`

### Rebuild sprite sheet

**Using PNG workflow** (recommended for raster textures):

```bash
node build-sprites-png.js
```

**Using SVG workflow** (for vector icons):

```bash
# Put SVGs in ./svg/ directory first
./build-sprites.sh
```

## Naming Convention

| Sprite Name | Usage |
|-------------|-------|
| `background` | Map background pattern |
| `building` | Generic building fill |
| `building2` | Dense building crosshatch |
| `lake` | Water body fill pattern |
| `place` | Place marker icon |
| `place_big` | Large city marker |
| `highway=primary` | Primary road pattern |
| `landuse=vineyard` | Vineyard/grass pattern |

## Creating Seamless Tiles

For fill patterns, use Photoshop's Offset method:

1. **Filter → Other → Offset**
   - Horizontal: half of width
   - Vertical: half of height
   - Wrap Around: checked
2. **Clone/Heal** the seams in the center
3. **Test** by filling a large canvas with the pattern

## Sprite Size Guidelines

| Type | Recommended Size |
|------|-----------------|
| Background/paper | 256×256 or larger |
| Building patterns | 32×32 to 64×64 |
| Road patterns | 32×8 strip |
| POI icons | 16×16 to 24×24 |
| Place markers | 20×20 to 48×48 |
