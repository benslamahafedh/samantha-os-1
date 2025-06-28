#!/usr/bin/env python3
"""
Samantha OS Voice Mode Startup Script
This script helps you start Samantha OS with proper voice mode configuration.
"""

import os
import sys
import subprocess
from pathlib import Path

def check_environment():
    """Check if required environment variables are set."""
    print("🎌 Samantha OS - Voice Mode Setup")
    print("=" * 50)
    
    # Check OpenAI API key
    openai_key = os.getenv("OPENAI_API_KEY")
    if not openai_key:
        print("❌ OPENAI_API_KEY is not set!")
        print("\n🔧 To fix this:")
        print("1. Get your OpenAI API key from: https://platform.openai.com/api-keys")
        print("2. Set the environment variable:")
        print("   Windows (PowerShell): $env:OPENAI_API_KEY='your_key_here'")
        print("   Windows (CMD): set OPENAI_API_KEY=your_key_here")
        print("   Linux/Mac: export OPENAI_API_KEY='your_key_here'")
        print("\n3. Or create a .env file in the project root with:")
        print("   OPENAI_API_KEY=your_key_here")
        return False
    
    print("✅ OPENAI_API_KEY is set")
    
    # Check optional keys
    optional_keys = {
        "GROQ_API_KEY": "Groq (for faster text processing)",
        "TOGETHER_API_KEY": "Together AI (for image generation)",
        "TAVILY_API_KEY": "Tavily (for web search)"
    }
    
    for key, description in optional_keys.items():
        if os.getenv(key):
            print(f"✅ {key} is set ({description})")
        else:
            print(f"⚠️  {key} is not set ({description}) - optional")
    
    return True

def install_dependencies():
    """Install required dependencies."""
    print("\n📦 Installing dependencies...")
    try:
        subprocess.run([sys.executable, "-m", "pip", "install", "-e", "."], check=True)
        print("✅ Dependencies installed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install dependencies: {e}")
        return False

def start_samantha():
    """Start Samantha OS."""
    print("\n🚀 Starting Samantha OS...")
    print("🎤 Voice mode will be available once the app loads")
    print("📱 Open your browser to http://localhost:8000")
    print("🎯 Press 'P' or click the microphone to start voice conversation")
    print("\n" + "=" * 50)
    
    try:
        # Change to the app directory
        app_dir = Path(__file__).parent / "app"
        os.chdir(app_dir)
        
        # Start chainlit
        subprocess.run([sys.executable, "-m", "chainlit", "run", "samantha.py", "--host", "0.0.0.0", "--port", "8000"])
    except KeyboardInterrupt:
        print("\n👋 Samantha OS stopped by user")
    except Exception as e:
        print(f"❌ Failed to start Samantha OS: {e}")

def main():
    """Main function."""
    if not check_environment():
        print("\n❌ Please set up your environment variables first.")
        print("📖 See VOICE_MODE_SETUP.md for detailed instructions.")
        sys.exit(1)
    
    if not install_dependencies():
        print("\n❌ Failed to install dependencies.")
        sys.exit(1)
    
    start_samantha()

if __name__ == "__main__":
    main() 