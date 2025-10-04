#!/bin/bash
set -e

# ===============================
# PRODUCTION DEPLOYMENT
# ===============================
echo "🚀 Deploying production version..."

git fetch origin
git reset --hard
git checkout master
git pull origin master

echo "📦 Installing dependencies..."
npm install --production

echo "⚙️ Starting with PM2..."
pm2 delete book || true
pm2 start src/server.js --name book --env production

echo "✅ Deployment complete!"
