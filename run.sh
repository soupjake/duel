#!/usr/bin/env bash
set -e

# Wait time (seconds) before starting frontend
BACKEND_WAIT_SECONDS="${BACKEND_WAIT_SECONDS:-5}"

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

if [ -f "./output/clean_data.json" ]; then
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

# Wait a fixed amount of time for backend to initialize
echo "Waiting ${BACKEND_WAIT_SECONDS}s for backend to initialize..."
sleep "${BACKEND_WAIT_SECONDS}"

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
