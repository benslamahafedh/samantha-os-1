# Voice Mode Setup Guide

## 🎤 Samantha OS Voice Mode Configuration

Samantha OS requires specific API keys to enable voice mode functionality. Follow this guide to set up your environment.

## Required Environment Variables

### 1. OpenAI API Key (Required for Voice Mode)
```bash
export OPENAI_API_KEY="your_openai_api_key_here"
```

**Why it's needed:** Voice mode uses OpenAI's realtime API for:
- Real-time speech-to-text transcription
- Text-to-speech synthesis
- Natural conversation flow

**How to get it:**
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and set it as an environment variable

### 2. Optional API Keys (For Additional Features)

#### Groq API Key (For faster text processing)
```bash
export GROQ_API_KEY="your_groq_api_key_here"
```

#### Together AI API Key (For image generation)
```bash
export TOGETHER_API_KEY="your_together_api_key_here"
```

#### Tavily API Key (For web search)
```bash
export TAVILY_API_KEY="your_tavily_api_key_here"
```

## Setup Methods

### Method 1: Environment Variables (Recommended)
Set the environment variables before running the app:

**Windows (PowerShell):**
```powershell
$env:OPENAI_API_KEY="your_openai_api_key_here"
python -m chainlit run app/samantha.py
```

**Windows (Command Prompt):**
```cmd
set OPENAI_API_KEY=your_openai_api_key_here
python -m chainlit run app/samantha.py
```

**Linux/Mac:**
```bash
export OPENAI_API_KEY="your_openai_api_key_here"
python -m chainlit run app/samantha.py
```

### Method 2: Docker with Environment Variables
```bash
docker run -d \
  --name samantha-voice \
  -p 8000:8000 \
  -e OPENAI_API_KEY="your_openai_api_key_here" \
  -e CHAINLIT_HOST=0.0.0.0 \
  -e CHAINLIT_PORT=8000 \
  your-docker-image
```

### Method 3: .env File (Development)
Create a `.env` file in the project root:
```
OPENAI_API_KEY=your_openai_api_key_here
GROQ_API_KEY=your_groq_api_key_here
TOGETHER_API_KEY=your_together_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
```

## Troubleshooting Voice Mode

### Issue: "OpenAI API Key Missing"
**Solution:** Ensure the `OPENAI_API_KEY` environment variable is set correctly.

### Issue: "Failed to connect to voice mode"
**Solutions:**
1. Check your OpenAI API key is valid
2. Ensure you have sufficient OpenAI credits
3. Verify internet connectivity
4. Check if OpenAI services are available

### Issue: Voice not being detected
**Solutions:**
1. Check microphone permissions in your browser
2. Ensure microphone is not muted
3. Try refreshing the page
4. Check browser console for errors

### Issue: No audio response
**Solutions:**
1. Check speaker/headphone volume
2. Ensure audio output is not muted
3. Try different audio output devices
4. Check browser audio permissions

## Voice Mode Features

- **Real-time conversation:** Speak naturally with Samantha
- **Voice detection:** Automatic speech detection and processing
- **Natural responses:** Samantha responds with her voice
- **Tool integration:** Use voice commands to access AI tools
- **Session management:** 2-minute sessions for cost control

## Cost Considerations

- OpenAI realtime API has usage costs
- Sessions are limited to 2 minutes to control costs
- Monitor your OpenAI usage in the OpenAI dashboard

## Security Notes

- Never commit API keys to version control
- Use environment variables for sensitive data
- Regularly rotate your API keys
- Monitor API usage for unexpected charges 