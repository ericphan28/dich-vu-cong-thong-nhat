#!/bin/bash

# Vercel Build Script
# This script ensures consistent builds between local and Vercel

echo "🚀 Starting Vercel build process..."

# Set environment variables for consistent builds
export NODE_ENV=production
export NEXT_TELEMETRY_DISABLED=1

echo "📦 Installing dependencies..."
npm ci

echo "🔧 Building Next.js application..."
npm run build

echo "✅ Build completed successfully!"

# Optional: Run security test after build
if [ "$RUN_SECURITY_TEST" = "true" ]; then
  echo "🔒 Running security test..."
  npm run security:test
fi

echo "🎉 Deployment ready!"