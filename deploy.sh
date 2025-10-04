#!/bin/bash
set -e

echo "🚀 Deploying production version..."

# ===============================
# LOAD ENVIRONMENT VARIABLES
# ===============================
if [ -f .env ]; then
  echo "🔧 Loading environment variables from .env"
  export $(grep -v '^#' .env | xargs)
else
  echo "⚠️  No .env file found!"
fi

# ===============================
# PRODUCTION DEPLOYMENT
# ===============================
git fetch origin
git reset --hard
git checkout master
git pull origin master

echo "📦 Installing dependencies..."
npm install --production

echo "⚙️ Restarting PM2 app..."
pm2 delete book || true
pm2 start src/server.js --name book --env production

echo "✅ Deployment complete! Running on port $PORT"
