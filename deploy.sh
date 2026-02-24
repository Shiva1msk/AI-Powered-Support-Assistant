#!/bin/bash

# AI Support Assistant Deployment Script
echo "🚀 AI Support Assistant Deployment"
echo "=================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    echo "# Environment Variables for AI Support Assistant" > .env
    echo "GEMINI_API_KEY=your_gemini_api_key_here" >> .env
    echo "GEMINI_MODEL=gemini-pro" >> .env
    echo ""
    echo "⚠️  Please edit .env file and add your Gemini API key!"
    echo "   Then run this script again."
    exit 1
fi

# Check if API key is set
if grep -q "your_gemini_api_key_here" .env; then
    echo "⚠️  Please update your GEMINI_API_KEY in .env file!"
    echo "   Edit .env and replace 'your_gemini_api_key_here' with your actual API key."
    exit 1
fi

echo "✅ Environment file found"

# Build and start services
echo "🔨 Building Docker images..."
docker-compose build

echo "🚀 Starting services..."
docker-compose up -d

# Wait for services to start
echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo ""
    echo "🎉 Deployment successful!"
    echo ""
    echo "📱 Your AI Support Assistant is now running:"
    echo "   Frontend: http://localhost"
    echo "   Backend:  http://localhost:3001"
    echo "   Health:   http://localhost:3001/health"
    echo ""
    echo "🔧 Useful commands:"
    echo "   View logs:    docker-compose logs -f"
    echo "   Stop services: docker-compose down"
    echo "   Restart:      docker-compose restart"
    echo ""
    echo "✅ Ready to use!"
else
    echo "❌ Deployment failed. Check logs with: docker-compose logs"
    exit 1
fi