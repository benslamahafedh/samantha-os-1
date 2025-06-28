#!/bin/sh
# Health check for Azure Container Instances
curl -f http://localhost/health || exit 1 