// 🎭 SAMANTHA INTERACTIVE AVATAR INTERFACE
// Simple Interactive Avatar with Tap-to-Talk

console.log('🎭 SAMANTHA INTERACTIVE AVATAR LOADING...');

(function() {
    'use strict';

    let isInterfaceCreated = false;
    let isVoiceActive = false;

    // Create interactive avatar interface
    function createInteractiveAvatar() {
        if (isInterfaceCreated) return;

        console.log('✨ Creating interactive Samantha avatar...');

        // Hide all Chainlit elements aggressively
        hideAllChainlitElements();

        // Create main avatar container
        const avatarContainer = document.createElement('div');
        avatarContainer.className = 'samantha-avatar-container';
        avatarContainer.style.cssText = `
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            z-index: 10000 !important;
            font-family: 'Inter', sans-serif !important;
        `;

        avatarContainer.innerHTML = `
            <!-- Main Avatar Circle -->
            <div class="samantha-main-avatar" id="mainAvatar" style="
                width: 300px;
                height: 300px;
                border-radius: 50%;
                position: relative;
                cursor: pointer;
                transition: all 0.3s ease;
                background: linear-gradient(145deg, #ff5500, #ff8800, #ffaa00);
                box-shadow: 
                    0 0 50px rgba(255, 85, 0, 0.6),
                    0 0 100px rgba(255, 136, 0, 0.4);
                animation: avatarFloat 3s ease-in-out infinite;
                border: 4px solid rgba(255, 255, 255, 0.1);
            ">
                <!-- Samantha Image -->
                <img src="/public/avatars/my-assistant.png" alt="Samantha" style="
                    width: 280px;
                    height: 280px;
                    border-radius: 50%;
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    border: 3px solid rgba(255, 255, 255, 0.3);
                    transition: all 0.3s ease;
                    object-fit: cover !important;
                    filter: brightness(1.1) contrast(1.1) !important;
                " class="samantha-img" id="samanthaImg" />
                
                <!-- Voice Activation Ring -->
                <div class="voice-ring" id="voiceRing" style="
                    position: absolute;
                    top: -20px;
                    left: -20px;
                    width: 340px;
                    height: 340px;
                    border: 4px solid rgba(255, 85, 0, 0.5);
                    border-radius: 50%;
                    opacity: 0;
                    animation: ringPulse 2s ease-in-out infinite;
                    background: transparent !important;
                "></div>
                
                <!-- Mic Icon Overlay -->
                <div class="mic-overlay" id="micOverlay" style="
                    position: absolute;
                    bottom: 20px;
                    right: 20px;
                    width: 60px;
                    height: 60px;
                    background: rgba(255, 85, 0, 0.9);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 24px;
                    color: white;
                    box-shadow: 0 0 20px rgba(255, 85, 0, 0.6);
                    animation: micPulse 2s ease-in-out infinite;
                    backdrop-filter: blur(5px) !important;
                    border: 2px solid rgba(255, 255, 255, 0.2) !important;
                ">🎤</div>
                
                <!-- Floating Icons Around Avatar -->
                <div class="floating-icon" style="
                    position: absolute;
                    top: -10px;
                    right: 30px;
                    font-size: 24px;
                    animation: floatIcon1 4s ease-in-out infinite;
                    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5) !important;
                    filter: brightness(1.2) !important;
                ">💜</div>
                
                <div class="floating-icon" style="
                    position: absolute;
                    bottom: -10px;
                    left: 30px;
                    font-size: 24px;
                    animation: floatIcon2 4s ease-in-out infinite;
                    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5) !important;
                    filter: brightness(1.2) !important;
                ">✨</div>
                
                <div class="floating-icon" style="
                    position: absolute;
                    top: 50px;
                    left: -30px;
                    font-size: 24px;
                    animation: floatIcon3 4s ease-in-out infinite;
                    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5) !important;
                    filter: brightness(1.2) !important;
                ">⚡</div>
                
                <div class="floating-icon" style="
                    position: absolute;
                    bottom: 50px;
                    right: -30px;
                    font-size: 24px;
                    animation: floatIcon4 4s ease-in-out infinite;
                    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5) !important;
                    filter: brightness(1.2) !important;
                ">🌟</div>
            </div>
            
            <!-- Instruction Text -->
            <div class="instruction-text" id="instructionText" style="
                position: absolute;
                top: 350px;
                left: 50%;
                transform: translateX(-50%);
                text-align: center;
                color: #ff8800;
                font-size: 18px;
                font-weight: 600;
                opacity: 0.8;
                animation: textGlow 2s ease-in-out infinite alternate;
                white-space: nowrap;
                text-shadow: 0 0 15px rgba(255, 136, 0, 0.6) !important;
                letter-spacing: 0.5px !important;
            ">
                👆 Click me = Press P! 🎤
            </div>
            
            <!-- Status Indicator -->
            <div class="status-indicator" id="statusIndicator" style="
                position: absolute;
                top: -70px;
                left: 50%;
                transform: translateX(-50%);
                padding: 12px 24px;
                background: rgba(0, 0, 0, 0.8);
                border-radius: 25px;
                color: #ff8800;
                font-size: 14px;
                font-weight: 600;
                opacity: 0;
                transition: all 0.3s ease;
                white-space: nowrap;
                backdrop-filter: blur(10px) !important;
                border: 1px solid rgba(255, 136, 0, 0.3) !important;
            ">
                🎭 Samantha Ready
            </div>
        `;

        document.body.appendChild(avatarContainer);
        
        // Initialize interactions
        initializeAvatarInteractions();
        
        // Add CSS animations
        addCSSAnimations();
        
        // Start ambient floating particles
        startFloatingParticles();

        isInterfaceCreated = true;
        console.log('🎭 Interactive Samantha avatar created successfully!');
    }

    // Hide all Chainlit elements but keep inputs accessible
    function hideAllChainlitElements() {
        const hideCompletelySelectors = [
            'button:not(.samantha-btn)', 
            '.MuiButton-root:not(.samantha-btn)', 
            '.MuiIconButton-root:not(.samantha-btn)',
            '[class*="message"]', 
            '[class*="Message"]', 
            '.cl-message',
            'footer', 
            '[data-testid="footer"]', 
            '.cl-footer',
            '.chat\\.input\\.placeholder', 
            '[class*="placeholder"]',
            '#root > *:not(.samantha-avatar-container)'
        ];

        const keepAccessibleSelectors = [
            'input:not([type="hidden"])', 
            'textarea', 
            '.MuiInputBase-root', 
            '.MuiTextField-root', 
            '.MuiOutlinedInput-root',
            '[data-testid="chat-input"]', 
            '[data-testid="chat-input-field"]',
            '[class*="input"]:not([type="hidden"])', 
            '[class*="Input"]', 
            '[class*="send"]', 
            '[class*="Submit"]',
            '[data-testid="chat-input-container"]', 
            '[data-testid="input-container"]',
            '.cl-input', 
            '.cl-textInput', 
            '.cl-button', 
            '.cl-sendButton',
            '.cl-chatInput', 
            '.cl-inputContainer', 
            '[class*="inputContainer"]',
            '[placeholder]', 
            '.cl-textField', 
            '.cl-input-field'
        ];

        const hideElements = () => {
            // Hide visual elements but keep event handling intact
            hideCompletelySelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    // Less aggressive hiding - keep in DOM for events
                    el.style.cssText = 'opacity: 0 !important; position: absolute !important; left: -9999px !important; pointer-events: none !important;';
                });
            });

            // Keep functional elements totally accessible
            keepAccessibleSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    // Very minimal hiding - just visual
                    el.style.cssText = 'opacity: 0.001 !important; position: absolute !important; left: -9999px !important; z-index: -1000 !important;';
                    // Keep all functionality intact
                });
            });
        };

        hideElements();
        // Less frequent hiding to avoid interfering with Chainlit
        setInterval(hideElements, 1000);
    }

    // Initialize avatar interactions
    function initializeAvatarInteractions() {
        const mainAvatar = document.getElementById('mainAvatar');
        const voiceRing = document.getElementById('voiceRing');
        const statusIndicator = document.getElementById('statusIndicator');
        const instructionText = document.getElementById('instructionText');
        const micOverlay = document.getElementById('micOverlay');

        if (!mainAvatar) return;

        // Hover effects
        mainAvatar.addEventListener('mouseenter', () => {
            mainAvatar.style.transform = 'scale(1.05)';
            mainAvatar.style.boxShadow = `
                0 0 70px rgba(255, 85, 0, 0.8),
                0 0 140px rgba(255, 136, 0, 0.6),
                inset 0 0 40px rgba(255, 255, 255, 0.3)
            `;
            statusIndicator.style.opacity = '1';
            statusIndicator.innerHTML = '🎤 Click = Press P!';
            micOverlay.style.transform = 'scale(1.1)';
        });

        mainAvatar.addEventListener('mouseleave', () => {
            mainAvatar.style.transform = 'scale(1)';
            mainAvatar.style.boxShadow = `
                0 0 50px rgba(255, 85, 0, 0.6),
                0 0 100px rgba(255, 136, 0, 0.4),
                inset 0 0 30px rgba(255, 255, 255, 0.2)
            `;
            statusIndicator.style.opacity = '0';
            micOverlay.style.transform = 'scale(1)';
        });

        // Avatar click = Simulate P key press
        let clickDebounce = null;
        
        // Click/Tap to simulate P key
        mainAvatar.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Debounce rapid clicks
            if (clickDebounce) {
                clearTimeout(clickDebounce);
            }
            
            clickDebounce = setTimeout(() => {
                console.log('🖱️ Avatar clicked - simulating P key press...');
                simulatePKeyPress();
                showClickFeedback();
                clickDebounce = null;
            }, 100);
        });

        // Touch events for mobile
        mainAvatar.addEventListener('touchstart', (e) => {
            e.preventDefault();
            mainAvatar.style.transform = 'scale(0.95)';
            
            // Haptic feedback
            if (navigator.vibrate) {
                navigator.vibrate([50]);
            }
        });

        mainAvatar.addEventListener('touchend', (e) => {
            e.preventDefault();
            console.log('📱 Touch ended - simulating P key press...');
            simulatePKeyPress();
            showClickFeedback();
        });
        
        // Cancel touch
        mainAvatar.addEventListener('touchcancel', (e) => {
            mainAvatar.style.transform = 'scale(1)';
        });
    }

    // Show visual feedback when avatar is clicked
    function showClickFeedback() {
        console.log('✨ Showing click feedback...');
        
        const mainAvatar = document.getElementById('mainAvatar');
        const voiceRing = document.getElementById('voiceRing');
        const statusIndicator = document.getElementById('statusIndicator');
        const instructionText = document.getElementById('instructionText');
        const micOverlay = document.getElementById('micOverlay');

        if (!mainAvatar) return;
        
        // Temporary visual feedback
        mainAvatar.style.transform = 'scale(1.15)';
        mainAvatar.style.boxShadow = '0 0 100px rgba(255, 85, 0, 1), 0 0 200px rgba(255, 136, 0, 0.8)';
        
        voiceRing.style.opacity = '1';
        voiceRing.style.animation = 'voiceActive 1s ease-in-out infinite';
        
        micOverlay.style.background = 'rgba(255, 0, 0, 0.9)';
        micOverlay.style.animation = 'micActive 0.5s ease-in-out infinite';
        
        statusIndicator.innerHTML = '🎤 P Key Pressed!';
        statusIndicator.style.opacity = '1';
        statusIndicator.style.background = 'rgba(255, 85, 0, 0.9)';
        
        instructionText.innerHTML = '🔥 Activating Voice Mode!';
        instructionText.style.color = '#ff0000';
        
        // Brief explosion effect
        createExplosionEffect();
        
        // Reset after 2 seconds
        setTimeout(() => {
            mainAvatar.style.transform = 'scale(1)';
            mainAvatar.style.boxShadow = '0 0 50px rgba(255, 85, 0, 0.6), 0 0 100px rgba(255, 136, 0, 0.4)';
            
            voiceRing.style.opacity = '0';
            voiceRing.style.animation = 'ringPulse 2s ease-in-out infinite';
            
            micOverlay.style.background = 'rgba(255, 85, 0, 0.9)';
            micOverlay.style.animation = 'micPulse 2s ease-in-out infinite';
            
            statusIndicator.innerHTML = '🎭 Samantha Ready';
            statusIndicator.style.background = 'rgba(0, 0, 0, 0.8)';
            statusIndicator.style.opacity = '0';
            
            instructionText.innerHTML = '👆 Click me = Press P! 🎤';
            instructionText.style.color = '#ff8800';
        }, 2000);
        
        // Try to activate voice mode
        activateChainlitVoiceMode();
    }

    // Real voice activation that connects to Chainlit - focused on P key simulation
    function activateChainlitVoiceMode() {
        console.log('🎤 AVATAR CLICKED - Activating voice mode via P key simulation...');
        
        // Method 1: Enhanced P key simulation (primary method)
        console.log('⌨️ Method 1: Enhanced P key simulation...');
        simulatePKeyPress();
        
        // Method 2: Try Chainlit action button as backup
        setTimeout(() => {
            console.log('🎯 Method 2: Looking for Chainlit action buttons...');
            const actionButtons = document.querySelectorAll(
                'button[data-testid*="action"], ' +
                '.cl-action-button, ' +
                'button[aria-label*="microphone" i], ' +
                'button[title*="voice" i], ' +
                'button:contains("🎤"), ' +
                'button:contains("Voice")'
            );
            
            if (actionButtons.length > 0) {
                console.log('🎯 Found action button, clicking it...');
                actionButtons[0].click();
            }
        }, 300);
        
        // Method 3: Send message to Chainlit backend
        setTimeout(() => {
            console.log('📤 Method 3: Sending activation message to backend...');
            sendMessageToChainlit('AVATAR_VOICE_ACTIVATE');
        }, 600);
        
        // Method 4: Custom events as final fallback
        setTimeout(() => {
            console.log('🎪 Method 4: Dispatching custom events...');
            dispatchVoiceActivationEvent();
        }, 900);
    }
    
    // Check if voice mode was successfully activated
    function checkForVoiceActivation() {
        // Look for visual indicators that voice mode is active
        const voiceIndicators = [
            '[data-testid*="recording"]',
            '[aria-label*="recording" i]',
            '[class*="recording" i]',
            '.voice-active',
            '[data-voice-active="true"]',
            'button[aria-pressed="true"]',
            '[class*="mic" i][class*="active" i]'
        ];
        
        let voiceActive = false;
        for (const selector of voiceIndicators) {
            if (document.querySelector(selector)) {
                voiceActive = true;
                console.log('✅ Voice mode detected active:', selector);
                break;
            }
        }
        
        // Also check for Chainlit action buttons
        const actionButtons = document.querySelectorAll(
            'button[data-testid*="action"]',
            '.cl-action-button'
        );
        
        if (voiceActive) {
            showNotification('🎤 Voice mode activated successfully!');
        } else if (actionButtons.length > 0) {
            showNotification('💡 Use the 🎤 START TALKING button below for reliable voice!');
        } else {
            console.log('❌ Voice mode not detected');
            showNotification('💡 Look for voice activation buttons in the chat below');
        }
    }

    // Send message to Chainlit backend using proper APIs
    function sendMessageToChainlit(message) {
        try {
            console.log('📤 Sending message to Chainlit:', message);
            
            // Method 1: Use Chainlit's sendUserMessage API (from custom elements)
            if (window.sendUserMessage) {
                window.sendUserMessage(message);
                console.log('✅ Sent via window.sendUserMessage');
                return;
            }
            
            // Method 2: Use Chainlit's global message API
            if (window.chainlit && window.chainlit.sendMessage) {
                window.chainlit.sendMessage(message);
                console.log('✅ Sent via window.chainlit.sendMessage');
                return;
            }
            
            // Method 3: Create and dispatch custom Chainlit event
            const chainlitEvent = new CustomEvent('chainlit-message', {
                detail: {
                    content: message,
                    type: 'user_message'
                },
                bubbles: true,
                cancelable: true
            });
            
            document.dispatchEvent(chainlitEvent);
            window.dispatchEvent(chainlitEvent);
            console.log('✅ Dispatched custom chainlit-message event');
            
            // Method 4: Try direct audio activation event
            const audioEvent = new CustomEvent('chainlit-audio-start', {
                bubbles: true,
                cancelable: true
            });
            
            document.dispatchEvent(audioEvent);
            window.dispatchEvent(audioEvent);
            console.log('✅ Dispatched chainlit-audio-start event');
            
            // Method 5: Use input field as reliable fallback
            setTimeout(() => {
                sendViaInputField(message);
            }, 100);
            
        } catch (error) {
            console.error('❌ Error sending message to Chainlit:', error);
            sendViaInputField(message);
        }
    }
    
    // Helper function to send via input field
    function sendViaInputField(message) {
        const inputSelectors = [
            'input[type="text"]',
            'textarea',
            '.MuiInputBase-input',
            '[data-testid*="input"]'
        ];
        
        for (const selector of inputSelectors) {
            const input = document.querySelector(selector);
            if (input) {
                console.log('📝 Using input field:', selector);
                
                // Temporarily make visible and functional
                const originalStyle = input.style.cssText;
                input.style.cssText = 'position: absolute !important; left: 0 !important; top: 0 !important; opacity: 1 !important; width: 200px !important; height: 40px !important; z-index: 9999 !important;';
                
                // Set value and trigger events
                input.focus();
                input.value = message;
                
                // Trigger all necessary events
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
                input.dispatchEvent(new Event('keyup', { bubbles: true }));
                
                // Submit with Enter
                setTimeout(() => {
                    const enterEvent = new KeyboardEvent('keydown', {
                        key: 'Enter',
                        code: 'Enter',
                        keyCode: 13,
                        which: 13,
                        bubbles: true,
                        cancelable: true
                    });
                    
                    input.dispatchEvent(enterEvent);
                    
                    // Also try to click submit button
                    const submitBtn = document.querySelector('button[type="submit"], button[data-testid*="send"], .MuiIconButton-root');
                    if (submitBtn) {
                        submitBtn.click();
                        console.log('🚀 Clicked submit button');
                    }
                    
                    // Restore original style
                    setTimeout(() => {
                        input.style.cssText = originalStyle;
                    }, 500);
                    
                    console.log('⌨️ Message sent successfully');
                }, 300);
                
                return;
            }
        }
        
        console.log('❌ No input fields found, using fallback');
    }
    
    // Web Speech API for direct microphone access (mobile-friendly)
    function startWebSpeechAPI() {
        console.log('🎤 Starting Web Speech API for mobile voice...');
        
        // Stop any existing recognition first
        if (window.currentSpeechRecognition) {
            console.log('🔄 Stopping existing speech recognition...');
            try {
                window.currentSpeechRecognition.stop();
            } catch (e) {
                console.log('Previous recognition already stopped');
            }
            window.currentSpeechRecognition = null;
        }
        
        // Check browser support
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.log('❌ Speech recognition not supported');
            showNotification('❌ Voice not supported - use button below chat');
            return false;
        }
        
        // Add delay to prevent rapid successive calls
        if (window.lastSpeechStart && Date.now() - window.lastSpeechStart < 2000) {
            console.log('⏳ Too soon to start speech again, waiting...');
            showNotification('⏳ Please wait before trying voice again');
            return false;
        }
        window.lastSpeechStart = Date.now();
        
        try {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            
            recognition.continuous = false; // Changed to false to prevent issues
            recognition.interimResults = false; // Simplified
            recognition.lang = 'en-US';
            recognition.maxAlternatives = 1;
            
            recognition.onstart = function() {
                console.log('✅ Web Speech API started successfully');
                showNotification('🎤 Listening... Speak now!');
                showVoiceActivationEffects();
            };
            
            recognition.onresult = function(event) {
                if (event.results.length > 0 && event.results[0].isFinal) {
                    const transcript = event.results[0][0].transcript.trim();
                    if (transcript) {
                        console.log('🗣️ Speech recognized:', transcript);
                        sendMessageToChainlit(transcript);
                        showNotification(`✅ Sent: "${transcript}"`);
                        
                        // Auto restart for continuous conversation
                        setTimeout(() => {
                            if (isVoiceActive) {
                                startWebSpeechAPI();
                            }
                        }, 1000);
                    }
                }
            };
            
            recognition.onerror = function(event) {
                console.error('❌ Speech error:', event.error);
                window.currentSpeechRecognition = null;
                
                if (event.error === 'aborted') {
                    console.log('🔄 Speech recognition was aborted');
                    return; // Don't show error for aborted
                }
                
                showNotification(`❌ Voice error - try action button instead`);
                setTimeout(() => deactivateVoiceMode(), 1000);
            };
            
            recognition.onend = function() {
                console.log('🎤 Speech recognition ended');
                window.currentSpeechRecognition = null;
            };
            
            recognition.start();
            window.currentSpeechRecognition = recognition;
            return true;
            
        } catch (error) {
            console.error('❌ Failed to start speech recognition:', error);
            showNotification('❌ Voice failed - use 🎤 button below chat');
            window.currentSpeechRecognition = null;
            return false;
        }
    }
    
    // Stop Web Speech API
    function stopWebSpeechAPI() {
        if (window.currentSpeechRecognition) {
            console.log('🔇 Stopping Web Speech API...');
            window.currentSpeechRecognition.stop();
            window.currentSpeechRecognition = null;
            showNotification('🔇 Voice recognition stopped');
        }
    }

    // Custom event system for voice activation (fallback method)
    function dispatchVoiceActivationEvent() {
        console.log('🎤 Dispatching custom voice activation event...');
        
        const event = new CustomEvent('samantha-voice-activate', {
            detail: {
                source: 'avatar-click',
                timestamp: Date.now(),
                method: 'custom-event',
                userAgent: navigator.userAgent
            },
            bubbles: true,
            cancelable: true
        });
        
        // Dispatch to both document and window for maximum compatibility
        document.dispatchEvent(event);
        window.dispatchEvent(event);
        
        console.log('✅ Custom voice activation event dispatched');
        showNotification('🎤 Voice activation event sent!');
        
        return true;
    }

    // Show visual activation effects


    // Create voice particles
    function createVoiceParticles() {
        const particles = ['🎤', '🎵', '🎶', '💜', '⚡', '✨'];
        
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
                particle.style.cssText = `
                    position: fixed;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 20px;
                    pointer-events: none;
                    z-index: 10005;
                    transition: all 1.5s ease-out;
                `;
                
                document.body.appendChild(particle);
                
                requestAnimationFrame(() => {
                    const angle = (Math.PI * 2 * i) / 8;
                    const distance = 150 + Math.random() * 100;
                    particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${Math.random() * 360}deg)`;
                    particle.style.opacity = '0';
                });
                
                setTimeout(() => particle.remove(), 1500);
            }, i * 100);
        }
    }

    // Create explosion effect
    function createExplosionEffect() {
        const emojis = ['🔥', '💥', '⚡', '✨', '🌟', '💜', '🚀', '💎'];
        
        for (let i = 0; i < 12; i++) {
            setTimeout(() => {
                const explosion = document.createElement('div');
                explosion.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
                explosion.style.cssText = `
                    position: fixed;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 24px;
                    pointer-events: none;
                    z-index: 10006;
                    transition: all 1.2s ease-out;
                `;
                
                document.body.appendChild(explosion);
                
                requestAnimationFrame(() => {
                    const angle = (Math.PI * 2 * i) / 12;
                    const distance = 200 + Math.random() * 150;
                    explosion.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${Math.random() * 720}deg)`;
                    explosion.style.opacity = '0';
                });
                
                setTimeout(() => explosion.remove(), 1200);
            }, i * 50);
        }
    }

    // Removed notification system - no more popups
    function showNotification(message) {
        // Notifications removed - no more popup distractions
        console.log('📢 [NOTIFICATION REMOVED]:', message);
    }

    // Show load notification
    function showLoadNotification() {
        // No load notification - clean interface
        console.log('📢 [LOAD NOTIFICATION REMOVED]');
    }

    // Add CSS animations
    function addCSSAnimations() {
        if (document.getElementById('samantha-animations')) return;

        const css = document.createElement('style');
        css.id = 'samantha-animations';
        css.textContent = `
            @keyframes avatarFloat {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            
            @keyframes ringPulse {
                0%, 100% { transform: scale(1); opacity: 0.3; }
                50% { transform: scale(1.05); opacity: 0.7; }
            }
            
            @keyframes voiceActive {
                0%, 100% { transform: scale(1); opacity: 0.8; }
                50% { transform: scale(1.1); opacity: 1; }
            }
            
            @keyframes micPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            
            @keyframes micActive {
                0%, 100% { transform: scale(1.1); }
                50% { transform: scale(1.2); }
            }
            
            @keyframes floatIcon1 {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-15px) rotate(10deg); }
            }
            
            @keyframes floatIcon2 {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                25% { transform: translateY(-10px) rotate(-5deg); }
                75% { transform: translateY(-20px) rotate(5deg); }
            }
            
            @keyframes floatIcon3 {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                33% { transform: translateY(-12px) rotate(8deg); }
                66% { transform: translateY(-8px) rotate(-8deg); }
            }
            
            @keyframes floatIcon4 {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                40% { transform: translateY(-18px) rotate(-10deg); }
                80% { transform: translateY(-5px) rotate(10deg); }
            }
            
            @keyframes textGlow {
                0% { opacity: 0.6; color: #ff8800; }
                100% { opacity: 1; color: #ffaa00; text-shadow: 0 0 20px rgba(255, 136, 0, 0.5); }
            }
            
            @keyframes slideIn {
                0% { transform: translateX(100%); opacity: 0; }
                100% { transform: translateX(0); opacity: 1; }
            }
            
            /* Mobile responsiveness */
            @media (max-width: 768px) {
                .samantha-avatar-container {
                    transform: translate(-50%, -50%) scale(0.85) !important;
                }
                
                .instruction-text {
                    font-size: 16px !important;
                    top: 320px !important;
                }
                
                .mic-overlay {
                    width: 50px !important;
                    height: 50px !important;
                    font-size: 20px !important;
                }
            }
            
            @media (max-width: 480px) {
                .samantha-avatar-container {
                    transform: translate(-50%, -50%) scale(0.7) !important;
                }
                
                .instruction-text {
                    font-size: 14px !important;
                    top: 280px !important;
                }
                
                .mic-overlay {
                    width: 40px !important;
                    height: 40px !important;
                    font-size: 16px !important;
                }
            }
        `;
        document.head.appendChild(css);
    }

    // Floating ambient particles
    function startFloatingParticles() {
        setInterval(() => {
            const ambientParticles = ['💜', '⚡', '✨', '🌟', '💎'];
            const particle = document.createElement('div');
            particle.innerHTML = ambientParticles[Math.floor(Math.random() * ambientParticles.length)];
            particle.style.cssText = `
                position: fixed;
                left: ${Math.random() * window.innerWidth}px;
                bottom: 0px;
                font-size: 16px;
                color: rgba(255, 85, 0, 0.4);
                pointer-events: none;
                z-index: 10001;
                transition: all 6s linear;
            `;
            
            document.body.appendChild(particle);
            
            requestAnimationFrame(() => {
                particle.style.transform = 'translateY(-100vh) rotate(360deg)';
                particle.style.opacity = '0';
            });
            
            setTimeout(() => particle.remove(), 6000);
        }, 2000);
    }

    // Enhanced P key simulation with multiple approaches  
    function simulatePKeyPress() {
        console.log('⌨️ Enhanced P key simulation starting...');
        
        // Method 1: Focus management and blur inputs
        const activeElement = document.activeElement;
        if (activeElement && (
            activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.contentEditable === 'true' ||
            activeElement.getAttribute('role') === 'textbox'
        )) {
            activeElement.blur();
            console.log('📝 Blurred active input field');
        }
        
        // Focus on document body to ensure key events are captured
        if (document.body && document.body.focus) {
            document.body.focus();
        }
        
        // Method 2: Multiple KeyboardEvent approaches with enhanced properties
        const simulateKeyEventSequence = () => {
            const keyEventProps = {
                key: 'p',
                code: 'KeyP', 
                keyCode: 80,
                which: 80,
                charCode: 0,
                bubbles: true,
                cancelable: true,
                composed: true,
                ctrlKey: false,
                shiftKey: false, 
                altKey: false,
                metaKey: false,
                repeat: false,
                location: KeyboardEvent.DOM_KEY_LOCATION_STANDARD,
                view: window,
                detail: 0
            };
            
            // Create events for keydown, keypress, keyup sequence
            const events = ['keydown', 'keypress', 'keyup'].map(type => {
                const eventProps = { ...keyEventProps };
                if (type === 'keypress') {
                    eventProps.charCode = 112; // lowercase p for keypress
                }
                return new KeyboardEvent(type, eventProps);
            });
            
            // Multiple targets to ensure capture
            const targets = [
                document,
                document.body, 
                document.documentElement,
                window
            ];
            
            // Dispatch to all targets
            targets.forEach(target => {
                events.forEach(event => {
                    try {
                        target.dispatchEvent(event);
                        console.log(`📤 Dispatched ${event.type} to ${target.constructor.name}`);
                    } catch (e) {
                        console.log(`❌ Failed to dispatch ${event.type}:`, e);
                    }
                });
            });
        };
        
        // Execute simulation
        simulateKeyEventSequence();
        
        // Method 3: Alternative key representations
        setTimeout(() => {
            const altKeyProps = {
                key: 'P', // uppercase
                code: 'KeyP',
                keyCode: 80,
                which: 80,
                bubbles: true,
                cancelable: true
            };
            
            const altEvent = new KeyboardEvent('keydown', altKeyProps);
            document.dispatchEvent(altEvent);
            console.log('📤 Dispatched alternative P key event');
        }, 50);
        
        // Method 4: Look for Chainlit-specific elements and try to trigger them directly
        setTimeout(() => {
            console.log('🔍 Looking for Chainlit-specific elements...');
            const chainlitSelectors = [
                '[data-testid*="voice"]',
                '[data-testid*="mic"]', 
                '[data-testid*="record"]',
                '.chainlit-voice-button',
                'button[aria-label*="voice" i]',
                'button[title*="voice" i]'
            ];
            
            for (const selector of chainlitSelectors) {
                const elements = document.querySelectorAll(selector);
                if (elements.length > 0) {
                    console.log(`🎯 Found ${selector}, trying to click...`);
                    elements[0].click();
                    break;
                }
            }
        }, 100);
        
        console.log('✅ Enhanced P key simulation complete!');
    }

    // Initialize everything
    function initialize() {
        // Set dark background immediately
        document.body.style.cssText = `
            background: linear-gradient(135deg, #0a0a0a, #1a1a1a, #0a0a0a) !important;
            margin: 0 !important;
            padding: 0 !important;
            font-family: 'Inter', sans-serif !important;
            overflow: hidden !important;
            height: 100vh !important;
            color: #ffffff !important;
        `;

        // Create interface
        createInteractiveAvatar();
        
        // Start ambient effects
        startFloatingParticles();
        
        // Override Chainlit's P key system with our avatar click system
        overrideChainlitPKeyListener();

        console.log('🎭 Samantha Interactive Avatar initialized - P key now uses avatar click system!');
    }

    // Wait for DOM and initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }

    // Also initialize after a short delay to ensure Chainlit has loaded
    setTimeout(initialize, 100);
    setTimeout(initialize, 500);
    setTimeout(initialize, 1000);

    // Keep trying to override Chainlit every few seconds
    setInterval(() => {
        if (!isInterfaceCreated) {
            initialize();
        }
    }, 3000);

})(); 