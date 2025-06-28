@echo off
echo 🎌 Samantha OS - Voice Mode Startup
echo ================================================

REM Check if OpenAI API key is set
if "%OPENAI_API_KEY%"=="" (
    echo ❌ OPENAI_API_KEY is not set!
    echo.
    echo 🔧 To fix this:
    echo 1. Get your OpenAI API key from: https://platform.openai.com/api-keys
    echo 2. Set the environment variable:
    echo    set OPENAI_API_KEY=your_key_here
    echo.
    echo 3. Or create a .env file in the project root with:
    echo    OPENAI_API_KEY=your_key_here
    echo.
    echo 📖 See VOICE_MODE_SETUP.md for detailed instructions.
    pause
    exit /b 1
)

echo ✅ OPENAI_API_KEY is set
echo.

REM Check optional keys
if not "%GROQ_API_KEY%"=="" (
    echo ✅ GROQ_API_KEY is set (Groq for faster text processing)
) else (
    echo ⚠️  GROQ_API_KEY is not set (optional)
)

if not "%TOGETHER_API_KEY%"=="" (
    echo ✅ TOGETHER_API_KEY is set (Together AI for image generation)
) else (
    echo ⚠️  TOGETHER_API_KEY is not set (optional)
)

if not "%TAVILY_API_KEY%"=="" (
    echo ✅ TAVILY_API_KEY is set (Tavily for web search)
) else (
    echo ⚠️  TAVILY_API_KEY is not set (optional)
)

echo.
echo 📦 Installing dependencies...
python -m pip install -e . || (
    echo ❌ Failed to install dependencies.
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully
echo.
echo 🚀 Starting Samantha OS...
echo 🎤 Voice mode will be available once the app loads
echo 📱 Open your browser to http://localhost:8000
echo 🎯 Press 'P' or click the microphone to start voice conversation
echo.
echo ================================================

cd app
python -m chainlit run samantha.py --host 0.0.0.0 --port 8000

echo.
echo 👋 Samantha OS stopped
pause 