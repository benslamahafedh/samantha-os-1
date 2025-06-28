#!/bin/bash

# Set up logging
echo "Starting Samantha OS production container with automatic SSL setup..."

# Create necessary directories
mkdir -p /var/log/nginx /var/log/supervisor /var/log/letsencrypt /var/www/certbot

# Create minimal certificate directories (certbot will manage actual certificates)
mkdir -p /etc/letsencrypt/live /etc/letsencrypt/archive

# Test nginx configuration first
echo "Testing nginx configuration..."
nginx -t
if [ $? -ne 0 ]; then
    echo "Nginx configuration test failed!"
    exit 1
fi

# Only run certbot if domain is provided
if [ ! -z "$DOMAIN" ]; then
    echo "Running certbot for domain: $DOMAIN"
    
    # Start nginx temporarily for certbot
    nginx -g "daemon on;"
    sleep 5
    
    # Run certbot with nginx plugin - it will automatically modify nginx config
    certbot --nginx \
        --non-interactive \
        --agree-tos \
        --register-unsafely-without-email \
        --domains "$DOMAIN" \
        --redirect
    
    if [ $? -eq 0 ]; then
        echo "SSL certificate obtained successfully!"
    else
        echo "Certbot failed, but continuing..."
    fi
    
    # Stop nginx so supervisor can manage it
    nginx -s quit
    sleep 2
else
    echo "No DOMAIN environment variable set, skipping SSL setup"
fi

# Start supervisor for process management
echo "Starting supervisor..."
exec supervisord -c /etc/supervisord.conf 