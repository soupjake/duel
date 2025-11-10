#!/usr/bin/env bash
set -e  # Exit on first error

DATA_DIR="./data/raw"
CLEAN_FILE="./data/cleaned_data.json"
SCRIPT_PATH="./src/scripts/etl.ts"

# -----------------------------
# 1. Install dependencies
# -----------------------------
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
  echo "⬇️ Installing dependencies..."
  npm install
else
  echo "✅ Dependencies already installed."
fi

# -----------------------------
# 2. Verify TypeScript setup
# -----------------------------
if [ ! -f "tsconfig.json" ]; then
  echo "⚙️ No tsconfig.json found — creating a default one..."
  npx tsc --init --rootDir src --outDir dist --esModuleInterop --resolveJsonModule --module commonjs --target ES2020
fi

# -----------------------------
# 3. Check data directory
# -----------------------------
if [ ! -d "$DATA_DIR" ]; then
  echo "❌ Data directory not found at: $DATA_DIR"
  echo "Please place your raw JSON files in $DATA_DIR"
  exit 1
fi

# -----------------------------
# 4. Run ETL script
# -----------------------------
echo "🚀 Running ETL script..."
if [ -f "$CLEAN_FILE" ]; then
  echo "✅ Found existing cleaned_data.json"
  read -p "Would you like to regenerate it? (y/N): " answer
  if [[ "$answer" =~ ^[Yy]$ ]]; then
    echo "♻️ Regenerating cleaned data..."
    npx ts-node "$SCRIPT_PATH"
  else
    echo "🛑 Skipping ETL process. Using existing $CLEAN_FILE"
  fi
else
  echo "⚙️ No cleaned data found. Generating now..."
  npx ts-node "$SCRIPT_PATH"
fi

echo "✅ Done!"
