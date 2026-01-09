#!/bin/bash
#
# Build sprite sheet from individual SVG icons using spritezero-cli
#
# Prerequisites:
#   pnpm add -g @mapbox/spritezero-cli
#
# Usage:
#   ./build-sprites.sh
#
# This will generate:
#   - sprite.png + sprite.json (1x)
#   - sprite@2x.png + sprite@2x.json (2x retina)
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ICONS_DIR="$SCRIPT_DIR/svg"

# Check if svg directory exists
if [ ! -d "$ICONS_DIR" ]; then
    echo "❌ Error: $ICONS_DIR directory not found"
    echo ""
    echo "Please create an 'svg' directory with your SVG sprite files."
    echo "Each SVG file should be named like: sprite-name.svg"
    echo ""
    exit 1
fi

# Check if spritezero is installed
if ! command -v spritezero &> /dev/null; then
    echo "❌ Error: spritezero-cli not found"
    echo "Install with: pnpm add -g @mapbox/spritezero-cli"
    exit 1
fi

echo "🔨 Building sprites from $ICONS_DIR..."

# Generate 1x sprite
echo "  → Generating 1x sprites..."
spritezero --ratio=1 "$SCRIPT_DIR/sprite" "$ICONS_DIR"

# Generate 2x sprite (for retina displays)
echo "  → Generating 2x sprites..."
spritezero --ratio=2 "$SCRIPT_DIR/sprite@2x" "$ICONS_DIR"

echo ""
echo "✅ Sprite sheets generated:"
echo "   - sprite.png + sprite.json"
echo "   - sprite@2x.png + sprite@2x.json"
echo ""
echo "📊 Stats:"
ls -lh "$SCRIPT_DIR/sprite.png" "$SCRIPT_DIR/sprite@2x.png" 2>/dev/null | awk '{print "   " $9 ": " $5}'
