@echo off
echo Samantha OS - 502 Bad Gateway Troubleshooting
echo =============================================
echo.

echo Checking Azure Container Instances...
az container list --resource-group samantha-os-rg --output table

echo.
echo Checking container logs for errors...
echo.

set /p container_name="Enter container name (or press Enter for latest): "
if "%container_name%"=="" (
    echo Using latest container...
    for /f "tokens=*" %%i in ('az container list --resource-group samantha-os-rg --query "[0].name" --output tsv') do set container_name=%%i
)

echo.
echo Container: %container_name%
echo.

echo === NGINX LOGS ===
az container logs --name %container_name% --resource-group samantha-os-rg --container-name nginx 2>nul
if errorlevel 1 (
    echo No nginx container found, checking main container logs...
    az container logs --name %container_name% --resource-group samantha-os-rg
)

echo.
echo === CONTAINER STATUS ===
az container show --name %container_name% --resource-group samantha-os-rg --query "{Name:name, Status:provisioningState, IP:ipAddress.ip, Ports:ipAddress.ports}" --output table

echo.
echo === HEALTH CHECK ===
for /f "tokens=*" %%i in ('az container show --name %container_name% --resource-group samantha-os-rg --query "ipAddress.ip" --output tsv') do set container_ip=%%i

if not "%container_ip%"=="" (
    echo Testing connection to %container_ip%:80...
    curl -I http://%container_ip%:80 --connect-timeout 10
) else (
    echo Container IP not available
)

echo.
echo === COMMON 502 FIXES ===
echo 1. Restart the container:
echo    az container restart --name %container_name% --resource-group samantha-os-rg
echo.
echo 2. Check if Chainlit is running:
echo    az container exec --name %container_name% --resource-group samantha-os-rg --exec-command "ps aux | grep chainlit"
echo.
echo 3. Check nginx configuration:
echo    az container exec --name %container_name% --resource-group samantha-os-rg --exec-command "nginx -t"
echo.
echo 4. Check supervisor status:
echo    az container exec --name %container_name% --resource-group samantha-os-rg --exec-command "supervisorctl status"
echo.

pause 