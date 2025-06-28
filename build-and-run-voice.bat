@echo off
echo 🎌 Samantha OS Voice Mode - Container Build and Run
echo ===================================================

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
echo 🐳 Building Samantha OS Voice Mode container...
docker-compose -f docker-compose.voice.yml build

if %ERRORLEVEL% neq 0 (
    echo ❌ Failed to build container
    pause
    exit /b 1
)

echo ✅ Container built successfully
echo.
echo 🚀 Starting Samantha OS Voice Mode...
echo 🎤 Voice mode will be available once the container starts
echo 📱 Open your browser to http://localhost:8000
echo 🎯 Press 'P' or click the microphone to start voice conversation
echo.
echo ===================================================

docker-compose -f docker-compose.voice.yml up

echo.
echo 👋 Samantha OS Voice Mode stopped
pause 