#!/usr/bin/env bash
set -e

# Run backend
cd backend

echo "Running backend..."

echo "Checking dependencies..."
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
else
  echo "Dependencies already installed."
fi

if [ -f "./data/clean_data.json" ]; then
  echo "Found existing clean_data.json."
else
  echo "No clean data found. Generating now..."
  cd scripts
  npx ts-node processData.ts
  cd ..
fi

# Start backend in background
echo "Starting backend server..."
npm run start &

# Save PID so you can stop it later if needed
BACKEND_PID=$!

# Move to frontend
cd ../frontend

echo "Running frontend..."

echo "Checking dependencies..."
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
else
  echo "Dependencies already installed."
fi

# Run frontend
npm run dev

# When frontend stops (Ctrl+C), kill backend
kill $BACKEND_PID
