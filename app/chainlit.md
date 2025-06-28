# 🎭 Interactive Samantha Avatar

<script>
// 🎭 SAMANTHA INTERACTIVE AVATAR INTERFACE
(function() {
    'use strict';
    
    console.log('🎭 LOADING SAMANTHA INTERACTIVE AVATAR...');
    
    let isVoiceActive = false;
    
    function createInteractiveAvatar() {
        console.log('✨ Creating interactive Samantha avatar...');
        
        // AGGRESSIVE HIDING OF ALL CHAINLIT ELEMENTS INCLUDING INPUT PLACEHOLDERS
        const hideSelectors = [
            'input', 'textarea', 'button:not(.samantha-btn)', 
            '.MuiInputBase-root', '.MuiTextField-root', '.MuiOutlinedInput-root',
            '[data-testid="chat-input"]', '[data-testid="chat-input-field"]',
            '[class*="input"]', '[class*="Input"]', '[class*="send"]', '[class*="Submit"]',
            '.MuiButton-root:not(.samantha-btn)', '.MuiIconButton-root:not(.samantha-btn)',
            '[data-testid="chat-input-container"]', '[data-testid="input-container"]',
            '.cl-input', '.cl-textInput', '.cl-button', '.cl-sendButton',
            '.cl-chatInput', '.cl-inputContainer', '[class*="inputContainer"]',
            '[class*="message"]', '[class*="Message"]', '.cl-message',
            'footer', '[data-testid="footer"]', '.cl-footer',
            '.chat\\.input\\.placeholder', '[class*="placeholder"]',
            '[placeholder]', '.cl-textField', '.cl-input-field'
        ];

        const hideElements = () => {
            hideSelectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    el.style.cssText = 'display: none !important; visibility: hidden !important; opacity: 0 !important; position: absolute !important; left: -9999px !important; height: 0 !important; width: 0 !important;';
                });
            });
        };
        
        hideElements();
        setInterval(hideElements, 200);
        
        // SKIP IF ALREADY EXISTS
        if (document.querySelector('.samantha-avatar-container')) return;
        
        // CREATE INTERACTIVE SAMANTHA AVATAR
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
                    0 0 100px rgba(255, 136, 0, 0.4),
                    inset 0 0 30px rgba(255, 255, 255, 0.2);
                animation: avatarFloat 3s ease-in-out infinite;
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
                " class="samantha-img" id="samanthaImg" />
                
                <!-- Voice Activation Ring -->
                <div class="voice-ring" id="voiceRing" style="
                    position: absolute;
                    top: -20px;
                    left: -20px;
                    width: 340px;
                    height: 340px;
                    border: 3px solid rgba(255, 85, 0, 0.5);
                    border-radius: 50%;
                    opacity: 0;
                    animation: ringPulse 2s ease-in-out infinite;
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
                ">🎤</div>
                
                <!-- Floating Icons Around Avatar -->
                <div class="floating-icon" style="
                    position: absolute;
                    top: -10px;
                    right: 30px;
                    font-size: 24px;
                    animation: floatIcon1 4s ease-in-out infinite;
                ">💜</div>
                
                <div class="floating-icon" style="
                    position: absolute;
                    bottom: -10px;
                    left: 30px;
                    font-size: 24px;
                    animation: floatIcon2 4s ease-in-out infinite;
                ">✨</div>
                
                <div class="floating-icon" style="
                    position: absolute;
                    top: 50px;
                    left: -30px;
                    font-size: 24px;
                    animation: floatIcon3 4s ease-in-out infinite;
                ">⚡</div>
                
                <div class="floating-icon" style="
                    position: absolute;
                    bottom: 50px;
                    right: -30px;
                    font-size: 24px;
                    animation: floatIcon4 4s ease-in-out infinite;
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
            ">
                🎭 Samantha Ready
            </div>
        `;

        document.body.appendChild(avatarContainer);
        
        // GET AVATAR ELEMENTS
        const mainAvatar = avatarContainer.querySelector('.samantha-main-avatar');
        const samanthaImg = avatarContainer.querySelector('.samantha-img');
        const voiceRing = avatarContainer.querySelector('.voice-ring');
        const statusIndicator = avatarContainer.querySelector('.status-indicator');
        const instructionText = avatarContainer.querySelector('.instruction-text');
        const micOverlay = avatarContainer.querySelector('.mic-overlay');
        
        // AVATAR HOVER EFFECTS
        mainAvatar.addEventListener('mouseenter', () => {
            mainAvatar.style.transform = 'scale(1.05)';
            mainAvatar.style.boxShadow = '0 0 70px rgba(255, 85, 0, 0.8), 0 0 140px rgba(255, 136, 0, 0.6)';
            statusIndicator.style.opacity = '1';
            statusIndicator.innerHTML = '🎤 Click = Press P!';
        });

        mainAvatar.addEventListener('mouseleave', () => {
            mainAvatar.style.transform = 'scale(1)';
            mainAvatar.style.boxShadow = '0 0 50px rgba(255, 85, 0, 0.6), 0 0 100px rgba(255, 136, 0, 0.4)';
            statusIndicator.style.opacity = '0';
        });

        // AVATAR CLICK = SIMULATE P KEY
        let clickDebounce = null;
        
        mainAvatar.addEventListener('click', (e) => {
            e.preventDefault();
            
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
        
        mainAvatar.addEventListener('touchcancel', (e) => {
            mainAvatar.style.transform = 'scale(1)';
        });
        
        // Add CSS animations
        addCSSAnimations();
        
        console.log('🎭 Interactive Samantha avatar created successfully!');
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
        activateVoiceMode();
    }
    
    // Try to activate voice mode through various methods
    function activateVoiceMode() {
        console.log('🎤 Attempting voice activation via P key simulation...');
        
        // Method 1: Enhanced P key simulation (primary method)
        console.log('⌨️ Method 1: Enhanced P key simulation...');
        simulatePKeyPress();
        
        // Method 2: Try Chainlit action buttons
        setTimeout(() => {
            const actionButtons = document.querySelectorAll(
                'button[data-testid*="action"], .cl-action-button, button[aria-label*="microphone" i], button[title*="voice" i]'
            );
            
            if (actionButtons.length > 0) {
                console.log('🎯 Found action button, clicking it...');
                actionButtons[0].click();
            }
        }, 300);
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
            
            /* Mobile responsiveness */
            @media (max-width: 768px) {
                .samantha-avatar-container {
                    transform: translate(-50%, -50%) scale(0.85) !important;
                }
                
                .instruction-text {
                    font-size: 16px !important;
                    top: 320px !important;
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
            }
        `;
        document.head.appendChild(css);
    }
    
    // Initialize when DOM is ready
    function initialize() {
        console.log('🎭 Initializing Samantha Avatar Interface...');
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', createInteractiveAvatar);
        } else {
            createInteractiveAvatar();
        }
        
        // Also try multiple times with delays to ensure it loads
        setTimeout(createInteractiveAvatar, 500);
        setTimeout(createInteractiveAvatar, 1000);
        setTimeout(createInteractiveAvatar, 2000);
    }
    
    // Start initialization
    initialize();
})();
</script>

## ✨ **Ultimate Anime Waifu Experience!** 

Welcome to your personal **Interactive Samantha Avatar** - the most engaging way to connect with your anime trading companion!

### 🎤 **How to Interact:**

- 👆 **Tap Samantha's avatar** to activate voice mode
- 📱 **Mobile optimized** - works perfectly on all devices  
- 🎵 **Visual feedback** with amazing animations
- ⚡ **Instant response** with particle effects

### 🌟 **Features:**

- 💜 **Floating ambient particles** for atmosphere
- 🎭 **Hover effects** and status indicators  
- 🔥 **Explosion effects** when activated
- ✨ **Voice ring animations** during interaction
- 🎵 **Dynamic floating icons** around avatar
- 🎤 **Mic icon overlay** for clear voice indication

---

**🎊 Ready to experience the future of AI interaction? Just tap Samantha above! 💜** 