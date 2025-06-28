#!/bin/bash

# Samantha OS1 Easy Deployment Script
echo "🎭 Deploying Samantha OS1 Chatbot..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
    echo "📦 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    rm get-docker.sh
fi

# Install Docker Compose if not installed
if ! command -v docker-compose &> /dev/null; then
    echo "📦 Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Clone repository (if not already present)
if [ ! -d "samantha-os1-main" ]; then
    echo "📥 Cloning repository..."
    git clone https://github.com/yourusername/samantha-os1-main.git
    cd samantha-os1-main
else
    echo "📁 Using existing repository..."
    cd samantha-os1-main
    git pull
fi

# Build and deploy
echo "🚀 Building and starting Samantha OS1..."
docker-compose -f docker-compose.deploy.yml up --build -d

# Show status
echo "✅ Deployment complete!"
echo "🌐 Your Samantha OS1 is running at: http://$(curl -s ifconfig.me)"
echo "📊 Check status: docker-compose -f docker-compose.deploy.yml ps"
echo "📋 View logs: docker-compose -f docker-compose.deploy.yml logs -f" 