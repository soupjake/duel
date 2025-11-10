#!/usr/bin/env bash
set -e

cd backend

if [ -f "./data/cleaned_data.json" ]; then
  echo "Found existing cleaned_data.json."
else
  echo "No cleaned data found. Generating now..."

  cd scripts

  echo "Checking dependencies..."
  if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
  else
    echo "Dependencies already installed."
  fi

  npx ts-node cleanData.ts
  
  cd ..
fi
s
echo "Running backend..."

echo "Checking dependencies..."
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
else
  echo "Dependencies already installed."
fi

npm run start

echo "Running frontend..."

cd frontend

echo "Checking dependencies..."
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
else
  echo "Dependencies already installed."
fi

npm run dev