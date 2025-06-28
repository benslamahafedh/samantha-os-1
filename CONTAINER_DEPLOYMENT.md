# Container Deployment Guide - Samantha OS Voice Mode

## 🐳 Docker Deployment for Voice Mode

This guide will help you build and run Samantha OS with voice mode using Docker containers.

## Prerequisites

- **Docker** and **Docker Compose** installed
- **OpenAI API Key** (Required for voice mode)
- Microphone and speakers/headphones

## Quick Start

### 1. Set Environment Variables

#### Windows (PowerShell)
```powershell
$env:OPENAI_API_KEY="your_openai_api_key_here"
```

#### Windows (Command Prompt)
```cmd
set OPENAI_API_KEY=your_openai_api_key_here
```

#### Linux/Mac
```bash
export OPENAI_API_KEY="your_openai_api_key_here"
```

### 2. Build and Run

#### Windows Users
```cmd
build-and-run-voice.bat
```

#### Linux/Mac Users
```bash
./build-and-run-voice.sh
```

### 3. Access the Application
Open your browser to: `http://localhost:8000`

## Manual Docker Commands

### Build the Container
```bash
docker-compose -f docker-compose.voice.yml build
```

### Run the Container
```bash
docker-compose -f docker-compose.voice.yml up
```

### Run in Background
```bash
docker-compose -f docker-compose.voice.yml up -d
```

### Stop the Container
```bash
docker-compose -f docker-compose.voice.yml down
```

## Environment Variables

### Required
- `OPENAI_API_KEY` - Your OpenAI API key for voice mode

### Optional
- `GROQ_API_KEY` - For faster text processing
- `TOGETHER_API_KEY` - For image generation
- `TAVILY_API_KEY` - For web search functionality

### Azure OpenAI (Alternative)
- `USE_AZURE=true` - Enable Azure OpenAI
- `AZURE_OPENAI_URL` - Your Azure OpenAI endpoint
- `AZURE_OPENAI_API_KEY` - Your Azure OpenAI API key
- `OPENAI_DEPLOYMENT_NAME_REALTIME` - Deployment name (default: gpt-4o-realtime-preview)

## Container Configuration

### Ports
- **8000** - Main application port

### Volumes
- `samantha-scratch` - Persistent storage for generated files
- `./logs` - Application logs (optional)

### Health Check
The container includes a health check that monitors the application every 30 seconds.

## Troubleshooting

### Container Build Issues

**Issue: Build fails with dependency errors**
```bash
# Clean up and rebuild
docker-compose -f docker-compose.voice.yml down
docker system prune -f
docker-compose -f docker-compose.voice.yml build --no-cache
```

**Issue: Permission errors**
```bash
# On Linux/Mac, ensure proper permissions
sudo chown -R $USER:$USER .
```

### Container Runtime Issues

**Issue: Container exits immediately**
```bash
# Check logs
docker-compose -f docker-compose.voice.yml logs

# Run with interactive mode for debugging
docker-compose -f docker-compose.voice.yml run --rm samantha-voice bash
```

**Issue: Voice mode not working**
1. Verify OpenAI API key is set correctly
2. Check container logs for errors
3. Ensure microphone permissions in browser
4. Test with a simple voice command

### Network Issues

**Issue: Can't access the application**
```bash
# Check if container is running
docker ps

# Check port binding
docker port samantha-voice-mode

# Test connectivity
curl http://localhost:8000/health
```

## Production Deployment

### Using Docker Compose

1. **Create production environment file:**
```bash
cp .env.example .env
# Edit .env with your production API keys
```

2. **Deploy with restart policy:**
```bash
docker-compose -f docker-compose.voice.yml up -d
```

3. **Monitor logs:**
```bash
docker-compose -f docker-compose.voice.yml logs -f
```

### Using Docker Run

```bash
docker run -d \
  --name samantha-voice \
  -p 8000:8000 \
  -e OPENAI_API_KEY="your_openai_api_key" \
  -e CHAINLIT_HOST=0.0.0.0 \
  -e CHAINLIT_PORT=8000 \
  --restart unless-stopped \
  samantha-voice-mode
```

## Security Considerations

### Environment Variables
- Never commit API keys to version control
- Use Docker secrets for production deployments
- Rotate API keys regularly

### Network Security
- Use HTTPS in production
- Configure firewall rules
- Consider using a reverse proxy

### Container Security
- Run containers as non-root user
- Keep base images updated
- Scan for vulnerabilities regularly

## Monitoring and Logging

### View Logs
```bash
# All logs
docker-compose -f docker-compose.voice.yml logs

# Follow logs in real-time
docker-compose -f docker-compose.voice.yml logs -f

# Specific service logs
docker-compose -f docker-compose.voice.yml logs samantha-voice
```

### Health Monitoring
```bash
# Check container health
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Health check endpoint
curl http://localhost:8000/health
```

## Backup and Recovery

### Backup Generated Files
```bash
# Create backup of scratch pad
docker run --rm -v samantha-voice_scratch:/data -v $(pwd):/backup alpine tar czf /backup/samantha-backup-$(date +%Y%m%d).tar.gz -C /data .
```

### Restore from Backup
```bash
# Restore scratch pad data
docker run --rm -v samantha-voice_scratch:/data -v $(pwd):/backup alpine tar xzf /backup/samantha-backup-YYYYMMDD.tar.gz -C /data
```

## Performance Optimization

### Resource Limits
```yaml
# Add to docker-compose.voice.yml
services:
  samantha-voice:
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
        reservations:
          memory: 1G
          cpus: '0.5'
```

### Caching
- Use Docker layer caching for faster builds
- Consider using a multi-stage build for optimization
- Cache Python dependencies

## Troubleshooting Checklist

- [ ] Docker and Docker Compose installed
- [ ] OpenAI API key set correctly
- [ ] Port 8000 available
- [ ] Microphone permissions granted
- [ ] Container built successfully
- [ ] Application accessible at http://localhost:8000
- [ ] Voice mode working (press 'P' or click microphone)
- [ ] Tools responding to voice commands

## Support

If you encounter issues:

1. Check the logs: `docker-compose -f docker-compose.voice.yml logs`
2. Verify environment variables are set correctly
3. Test with a simple voice command
4. Check browser console for errors
5. Ensure microphone and speakers are working

For additional help, refer to:
- [Voice Mode Setup Guide](VOICE_MODE_SETUP.md)
- [Voice Mode Fixes Summary](VOICE_MODE_FIXES.md)
- [README.md](README.md) 