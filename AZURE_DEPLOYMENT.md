# Azure HTTPS Deployment Guide for Samantha OS

This guide explains how to deploy Samantha OS to Azure with HTTPS support using Nginx as a reverse proxy.

## 📋 Prerequisites

1. **Azure CLI** installed and configured
2. **Docker** installed on your local machine
3. **OpenAI API Key** for the AI functionality
4. **Domain name** (optional, for custom SSL certificates)

## 🏗️ Architecture

```
Internet → Azure Load Balancer → Nginx (HTTPS/SSL) → Chainlit App (HTTP:8000)
```

### Components:
- **Nginx**: Handles HTTPS termination, static files, and reverse proxy
- **Chainlit**: Python application running the Samantha AI interface
- **Supervisor**: Process manager for Nginx and Chainlit
- **Azure Container Instances**: Hosting platform

## 🚀 Quick Deployment

### 1. Set Environment Variables

```bash
export OPENAI_API_KEY="your-openai-api-key-here"
```

### 2. Run Deployment Script

```bash
chmod +x deploy-azure.sh
./deploy-azure.sh
```

The script will:
- Create Azure resource group
- Set up Azure Container Registry
- Build and push Docker image
- Generate SSL certificates
- Deploy to Azure Container Instances

### 3. Access Your Application

After deployment, you'll get:
- **HTTP URL**: `http://samantha-os-prod.eastus.azurecontainer.io`
- **HTTPS URL**: `https://samantha-os-prod.eastus.azurecontainer.io`

## 🔐 SSL Certificate Options

### Option 1: Self-Signed Certificates (Testing)
The deployment script automatically generates self-signed certificates for testing.

### Option 2: Let's Encrypt (Free)
For production with a custom domain:

```bash
# Install certbot
sudo apt-get install certbot

# Get certificate
certbot certonly --standalone -d yourdomain.com

# Copy certificates
cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ssl/cert.pem
cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ssl/key.pem
```

### Option 3: Custom SSL Certificate
Replace the generated certificates:

```bash
# Copy your certificates
cp your-certificate.pem ssl/cert.pem
cp your-private-key.pem ssl/key.pem
```

## 🔧 Manual Deployment

### 1. Build Production Image

```bash
docker build -f Dockerfile.production -t samantha-os:latest .
```

### 2. Push to Azure Container Registry

```bash
# Create registry
az acr create --name samanthaosregistry --resource-group samantha-os-rg --sku Basic

# Login and push
az acr login --name samanthaosregistry
docker tag samantha-os:latest samanthaosregistry.azurecr.io/samantha-os:latest
docker push samanthaosregistry.azurecr.io/samantha-os:latest
```

### 3. Deploy with Docker Compose

```bash
# For local production testing
docker-compose -f docker-compose.production.yml up -d
```

### 4. Deploy to Azure Container Instances

```bash
# Update azure-deploy.yml with your values
az container create --resource-group samantha-os-rg --file azure-deploy.yml
```

## 📊 Monitoring and Logs

### View Logs
```bash
az container logs --resource-group samantha-os-rg --name samantha-os-production
```

### Monitor Health
The application includes health checks at `/health` endpoint.

### Resource Usage
Monitor CPU and memory usage in Azure portal.

## 🔒 Security Features

### Nginx Security Headers
- HSTS (HTTP Strict Transport Security)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Content Security Policy
- X-XSS-Protection

### Rate Limiting
- API endpoints: 10 requests/second
- General endpoints: 30 requests/second

### SSL Configuration
- TLS 1.2 and 1.3 only
- Modern cipher suites
- Perfect Forward Secrecy

## 🌐 Custom Domain Setup

### 1. Configure DNS
Point your domain to the Azure Container Instance IP:

```
A record: yourdomain.com → [Azure Container Instance IP]
```

### 2. Update SSL Certificate
Generate certificate for your domain and update the deployment.

### 3. Update Nginx Configuration
Modify `nginx.conf` to include your domain:

```nginx
server_name yourdomain.com;
```

## 🔄 Scaling Options

### Azure Container Instances
- Vertical scaling: Increase CPU/Memory in deployment template
- Manual scaling: Deploy multiple instances behind Azure Load Balancer

### Azure Container Apps (Alternative)
For auto-scaling capabilities:

```bash
az containerapp create \
    --name samantha-os \
    --resource-group samantha-os-rg \
    --image samanthaosregistry.azurecr.io/samantha-os:latest
```

## 🛠️ Troubleshooting

### Common Issues

1. **SSL Certificate Errors**
   - Check certificate validity: `openssl x509 -in ssl/cert.pem -text -noout`
   - Verify certificate chain is complete

2. **WebSocket Connection Issues**
   - Ensure WebSocket upgrade headers are set
   - Check Azure Load Balancer configuration

3. **Application Not Starting**
   - Check logs: `az container logs --name samantha-os-production`
   - Verify environment variables are set

4. **High Memory Usage**
   - Monitor with: `az container show --resource-group samantha-os-rg --name samantha-os-production`
   - Increase memory limits if needed

### Debug Commands

```bash
# Check container status
az container show --resource-group samantha-os-rg --name samantha-os-production

# Stream logs
az container logs --resource-group samantha-os-rg --name samantha-os-production --follow

# Execute commands in container
az container exec --resource-group samantha-os-rg --name samantha-os-production --exec-command "/bin/sh"
```

## 💰 Cost Optimization

### Azure Container Instances Pricing
- Pay per second of execution
- CPU: ~$0.0000012 per vCPU per second
- Memory: ~$0.00000017 per GB per second

### Optimization Tips
1. Use appropriate resource limits
2. Implement auto-shutdown for development environments
3. Use Azure Reserved Instances for production

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy to Azure
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Azure Login
      uses: azure/login@v1
      with:
        creds: ${{ secrets.AZURE_CREDENTIALS }}
    
    - name: Build and Deploy
      run: |
        ./deploy-azure.sh
      env:
        OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

## 📞 Support

For issues with:
- **Azure deployment**: Check Azure documentation
- **SSL certificates**: Refer to certificate provider docs
- **Application bugs**: Check application logs and GitHub issues

## 🔗 Additional Resources

- [Azure Container Instances Documentation](https://docs.microsoft.com/en-us/azure/container-instances/)
- [Nginx SSL Configuration](https://nginx.org/en/docs/http/configuring_https_servers.html)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs/)
- [Chainlit Documentation](https://docs.chainlit.io/)

---

**Ready to deploy your own Samantha OS to Azure with HTTPS!** 🚀 