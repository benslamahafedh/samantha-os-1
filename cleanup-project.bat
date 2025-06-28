@echo off
echo Samantha OS Project Cleanup
echo ===========================
echo.
echo This script will remove unnecessary files to clean up the project.
echo.

echo Creating backup directory...
if not exist "backup-unused-files" mkdir "backup-unused-files"

echo.
echo === REMOVING TEMPORARY FILES ===
echo Removing Python cache files...
if exist "app\__pycache__" (
    echo Moving app\__pycache__ to backup...
    move "app\__pycache__" "backup-unused-files\"
)

echo Removing .files directory...
if exist "app\.files" (
    echo Moving app\.files to backup...
    move "app\.files" "backup-unused-files\"
)

echo.
echo === REMOVING OLD/UNUSED SCRIPTS ===
echo Removing old test and styling scripts...
if exist "app\display_mode.py" (
    echo Moving app\display_mode.py to backup...
    move "app\display_mode.py" "backup-unused-files\"
)

if exist "app\test_styling.py" (
    echo Moving app\test_styling.py to backup...
    move "app\test_styling.py" "backup-unused-files\"
)

if exist "app\restart_with_styling.py" (
    echo Moving app\restart_with_styling.py to backup...
    move "app\restart_with_styling.py" "backup-unused-files\"
)

if exist "app\run_ultimate_samantha.py" (
    echo Moving app\run_ultimate_samantha.py to backup...
    move "app\run_ultimate_samantha.py" "backup-unused-files\"
)

if exist "app\start_samantha.py" (
    echo Moving app\start_samantha.py to backup...
    move "app\start_samantha.py" "backup-unused-files\"
)

if exist "app\samantha_immersive.py" (
    echo Moving app\samantha_immersive.py to backup...
    move "app\samantha_immersive.py" "backup-unused-files\"
)

echo.
echo === REMOVING OLD INTERFACE FILES ===
echo Removing old anime interface files...
if exist "app\public\samantha-interface.js" (
    echo Moving app\public\samantha-interface.js to backup...
    move "app\public\samantha-interface.js" "backup-unused-files\"
)

if exist "app\public\stylesheet.css" (
    echo Moving app\public\stylesheet.css to backup...
    move "app\public\stylesheet.css" "backup-unused-files\"
)

if exist "app\public\samantha-animations.css" (
    echo Moving app\public\samantha-animations.css to backup...
    move "app\public\samantha-animations.css" "backup-unused-files\"
)

if exist "app\public\samantha-character.png" (
    echo Moving app\public\samantha-character.png to backup...
    move "app\public\samantha-character.png" "backup-unused-files\"
)

if exist "app\public\samantha-character.svg" (
    echo Moving app\public\samantha-character.svg to backup...
    move "app\public\samantha-character.svg" "backup-unused-files\"
)

if exist "app\public\CHARACTER_IMAGE_INSTRUCTIONS.md" (
    echo Moving app\public\CHARACTER_IMAGE_INSTRUCTIONS.md to backup...
    move "app\public\CHARACTER_IMAGE_INSTRUCTIONS.md" "backup-unused-files\"
)

echo.
echo === REMOVING OLD DEPLOYMENT SCRIPTS ===
echo Removing old deployment scripts...
if exist "deploy-anime-robust.bat" (
    echo Moving deploy-anime-robust.bat to backup...
    move "deploy-anime-robust.bat" "backup-unused-files\"
)

if exist "deploy-anime-fixed.bat" (
    echo Moving deploy-anime-fixed.bat to backup...
    move "deploy-anime-fixed.bat" "backup-unused-files\"
)

if exist "deploy-audio-fix-v3.bat" (
    echo Moving deploy-audio-fix-v3.bat to backup...
    move "deploy-audio-fix-v3.bat" "backup-unused-files\"
)

if exist "deploy-audio-fix-v2.bat" (
    echo Moving deploy-audio-fix-v2.bat to backup...
    move "deploy-audio-fix-v2.bat" "backup-unused-files\"
)

if exist "deploy-audio-fixed.bat" (
    echo Moving deploy-audio-fixed.bat to backup...
    move "deploy-audio-fixed.bat" "backup-unused-files\"
)

if exist "deploy-fixed.bat" (
    echo Moving deploy-fixed.bat to backup...
    move "deploy-fixed.bat" "backup-unused-files\"
)

if exist "deploy-simple.bat" (
    echo Moving deploy-simple.bat to backup...
    move "deploy-simple.bat" "backup-unused-files\"
)

if exist "deploy-bootstrap.bat" (
    echo Moving deploy-bootstrap.bat to backup...
    move "deploy-bootstrap.bat" "backup-unused-files\"
)

if exist "deploy-working.bat" (
    echo Moving deploy-working.bat to backup...
    move "deploy-working.bat" "backup-unused-files\"
)

if exist "deploy-ssl-bootstrap.bat" (
    echo Moving deploy-ssl-bootstrap.bat to backup...
    move "deploy-ssl-bootstrap.bat" "backup-unused-files\"
)

if exist "deploy-quick-update.bat" (
    echo Moving deploy-quick-update.bat to backup...
    move "deploy-quick-update.bat" "backup-unused-files\"
)

echo.
echo === REMOVING OLD NGINX CONFIGS ===
echo Removing old nginx configurations...
if exist "nginx-local-test.conf" (
    echo Moving nginx-local-test.conf to backup...
    move "nginx-local-test.conf" "backup-unused-files\"
)

if exist "nginx-chainlit-optimized.conf" (
    echo Moving nginx-chainlit-optimized.conf to backup...
    move "nginx-chainlit-optimized.conf" "backup-unused-files\"
)

if exist "nginx-bootstrap.conf" (
    echo Moving nginx-bootstrap.conf to backup...
    move "nginx-bootstrap.conf" "backup-unused-files\"
)

echo.
echo === REMOVING OLD DOCKERFILES ===
echo Removing old Dockerfiles...
if exist "Dockerfile.minimal" (
    echo Moving Dockerfile.minimal to backup...
    move "Dockerfile.minimal" "backup-unused-files\"
)

if exist "Dockerfile.alpine" (
    echo Moving Dockerfile.alpine to backup...
    move "Dockerfile.alpine" "backup-unused-files\"
)

if exist "Dockerfile.production" (
    echo Moving Dockerfile.production to backup...
    move "Dockerfile.production" "backup-unused-files\"
)

if exist "Dockerfile.simple" (
    echo Moving Dockerfile.simple to backup...
    move "Dockerfile.simple" "backup-unused-files\"
)

echo.
echo === REMOVING TEST SCRIPTS ===
echo Removing test scripts...
if exist "test-local-audio.bat" (
    echo Moving test-local-audio.bat to backup...
    move "test-local-audio.bat" "backup-unused-files\"
)

if exist "test-audio-fixes.bat" (
    echo Moving test-audio-fixes.bat to backup...
    move "test-audio-fixes.bat" "backup-unused-files\"
)

if exist "test-audio-endpoints.bat" (
    echo Moving test-audio-endpoints.bat to backup...
    move "test-audio-endpoints.bat" "backup-unused-files\"
)

if exist "test-nginx-local.bat" (
    echo Moving test-nginx-local.bat to backup...
    move "test-nginx-local.bat" "backup-unused-files\"
)

if exist "check-docker.bat" (
    echo Moving check-docker.bat to backup...
    move "check-docker.bat" "backup-unused-files\"
)

if exist "quick-local-test.bat" (
    echo Moving quick-local-test.bat to backup...
    move "quick-local-test.bat" "backup-unused-files\"
)

if exist "start-local-docker.bat" (
    echo Moving start-local-docker.bat to backup...
    move "start-local-docker.bat" "backup-unused-files\"
)

if exist "stop-local-docker.bat" (
    echo Moving stop-local-docker.bat to backup...
    move "stop-local-docker.bat" "backup-unused-files\"
)

if exist "stop-local-test.bat" (
    echo Moving stop-local-test.bat to backup...
    move "stop-local-test.bat" "backup-unused-files\"
)

echo.
echo === REMOVING OLD GUIDES ===
echo Removing old documentation...
if exist "LOCAL_DOCKER_TESTING_GUIDE.md" (
    echo Moving LOCAL_DOCKER_TESTING_GUIDE.md to backup...
    move "LOCAL_DOCKER_TESTING_GUIDE.md" "backup-unused-files\"
)

if exist "LOCAL_NGINX_TESTING_GUIDE.md" (
    echo Moving LOCAL_NGINX_TESTING_GUIDE.md to backup...
    move "LOCAL_NGINX_TESTING_GUIDE.md" "backup-unused-files\"
)

if exist "AUDIO_DEPLOYMENT_GUIDE.md" (
    echo Moving AUDIO_DEPLOYMENT_GUIDE.md to backup...
    move "AUDIO_DEPLOYMENT_GUIDE.md" "backup-unused-files\"
)

if exist "app\TOUCH_INTERFACE_GUIDE.md" (
    echo Moving app\TOUCH_INTERFACE_GUIDE.md to backup...
    move "app\TOUCH_INTERFACE_GUIDE.md" "backup-unused-files\"
)

if exist "app\VOICE_MODE_INSTRUCTIONS.md" (
    echo Moving app\VOICE_MODE_INSTRUCTIONS.md to backup...
    move "app\VOICE_MODE_INSTRUCTIONS.md" "backup-unused-files\"
)

echo.
echo === REMOVING OLD CONFIG FILES ===
echo Removing old configuration files...
if exist "deploy-container.json" (
    echo Moving deploy-container.json to backup...
    move "deploy-container.json" "backup-unused-files\"
)

if exist "deploy-container-v2.json" (
    echo Moving deploy-container-v2.json to backup...
    move "deploy-container-v2.json" "backup-unused-files\"
)

if exist "deploy-container-fixed.json" (
    echo Moving deploy-container-fixed.json to backup...
    move "deploy-container-fixed.json" "backup-unused-files\"
)

if exist "deploy-nginx-audio-fix.bat" (
    echo Moving deploy-nginx-audio-fix.bat to backup...
    move "deploy-nginx-audio-fix.bat" "backup-unused-files\"
)

if exist "deploy-audio-fix.sh" (
    echo Moving deploy-audio-fix.sh to backup...
    move "deploy-audio-fix.sh" "backup-unused-files\"
)

if exist "setup-ssl.bat" (
    echo Moving setup-ssl.bat to backup...
    move "setup-ssl.bat" "backup-unused-files\"
)

if exist "deploy-azure.ps1" (
    echo Moving deploy-azure.ps1 to backup...
    move "deploy-azure.ps1" "backup-unused-files\"
)

if exist "deploy-azure.sh" (
    echo Moving deploy-azure.sh to backup...
    move "deploy-azure.sh" "backup-unused-files\"
)

if exist "deploy-ssl.bat" (
    echo Moving deploy-ssl.bat to backup...
    move "deploy-ssl.bat" "backup-unused-files\"
)

if exist "deploy.bat" (
    echo Moving deploy.bat to backup...
    move "deploy.bat" "backup-unused-files\"
)

if exist "push.bat" (
    echo Moving push.bat to backup...
    move "push.bat" "backup-unused-files\"
)

if exist "hafedh.txt" (
    echo Moving hafedh.txt to backup...
    move "hafedh.txt" "backup-unused-files\"
)

echo.
echo === REMOVING WORKING REFERENCE ===
echo Removing working reference directory...
if exist "working-reference" (
    echo Moving working-reference to backup...
    move "working-reference" "backup-unused-files\"
)

echo.
echo === REMOVING TEST TOOLS ===
echo Removing test tools directory...
if exist "app\scripts\test_tools" (
    echo Moving app\scripts\test_tools to backup...
    move "app\scripts\test_tools" "backup-unused-files\"
)

if exist "app\scripts\test_touch_interface.py" (
    echo Moving app\scripts\test_touch_interface.py to backup...
    move "app\scripts\test_touch_interface.py" "backup-unused-files\"
)

echo.
echo === CLEANUP COMPLETE ===
echo.
echo Files moved to backup-unused-files directory:
dir "backup-unused-files" /s
echo.
echo Project cleanup completed successfully!
echo.
echo Remaining essential files:
echo - samantha.py (main application)
echo - chainlit.md (welcome message)
echo - .chainlit/config.toml (configuration)
echo - Dockerfile.502-fixed (production Dockerfile)
echo - nginx-chainlit-fixed.conf (nginx configuration)
echo - deploy-502-fixed.bat (deployment script)
echo - troubleshoot-502.bat (troubleshooting script)
echo.
echo If you need any of the removed files, they are in the backup-unused-files directory.
echo.
pause 