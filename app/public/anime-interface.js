// Samantha OS - Anime Interface Enhancement
// Interactive effects and animations for the anime-style interface

(function() {
    'use strict';

    // Wait for DOM to be ready
    function ready(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    // Add floating particles effect
    function createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'anime-particles';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        document.body.appendChild(particleContainer);

        // Create particles
        for (let i = 0; i < 20; i++) {
            createParticle(particleContainer);
        }
    }

    function createParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #ff6b9d, #8b5cf6);
            border-radius: 50%;
            opacity: 0.6;
            animation: floatParticle ${5 + Math.random() * 10}s linear infinite;
        `;

        // Random starting position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        container.appendChild(particle);

        // Remove and recreate particle when animation ends
        particle.addEventListener('animationend', () => {
            particle.remove();
            setTimeout(() => createParticle(container), Math.random() * 2000);
        });
    }

    // Add CSS for particle animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            90% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Add character floating effect
    function addCharacterEffect() {
        const character = document.createElement('div');
        character.className = 'samantha-character';
        character.innerHTML = `
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 100%;
                height: 100%;
                background: url('/public/avatars/my-assistant.png') no-repeat center;
                background-size: contain;
                filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
            "></div>
        `;
        document.body.appendChild(character);
    }

    // Add typing effect to messages
    function addTypingEffect() {
        const messages = document.querySelectorAll('.cl-message[data-author="Samantha"] .cl-message-content');
        messages.forEach(message => {
            if (!message.dataset.typed) {
                message.dataset.typed = 'true';
                const text = message.textContent;
                message.textContent = '';
                message.style.opacity = '1';
                
                let i = 0;
                const typeWriter = () => {
                    if (i < text.length) {
                        message.textContent += text.charAt(i);
                        i++;
                        setTimeout(typeWriter, 30);
                    }
                };
                typeWriter();
            }
        });
    }

    // Add hover effects to interactive elements
    function addHoverEffects() {
        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('.cl-send-button, .cl-voice-button');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add ripple animation CSS
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyle);
    }

    // Add voice mode visual feedback
    function addVoiceModeEffects() {
        const voiceButton = document.querySelector('.cl-voice-button');
        if (voiceButton) {
            // Add recording state detection
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        const isRecording = voiceButton.classList.contains('recording');
                        if (isRecording) {
                            document.body.classList.add('voice-mode-active');
                            addRecordingWaves();
                        } else {
                            document.body.classList.remove('voice-mode-active');
                            removeRecordingWaves();
                        }
                    }
                });
            });

            observer.observe(voiceButton, { attributes: true });
        }
    }

    function addRecordingWaves() {
        const waves = document.createElement('div');
        waves.className = 'recording-waves';
        waves.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 200px;
            pointer-events: none;
            z-index: 999;
        `;

        for (let i = 0; i < 3; i++) {
            const wave = document.createElement('div');
            wave.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 100px;
                height: 100px;
                border: 2px solid #ff6b9d;
                border-radius: 50%;
                animation: recordingWave ${1.5 + i * 0.3}s ease-out infinite;
                animation-delay: ${i * 0.2}s;
            `;
            waves.appendChild(wave);
        }

        document.body.appendChild(waves);
    }

    function removeRecordingWaves() {
        const waves = document.querySelector('.recording-waves');
        if (waves) {
            waves.remove();
        }
    }

    // Add recording wave animation CSS
    const waveStyle = document.createElement('style');
    waveStyle.textContent = `
        @keyframes recordingWave {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(3);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(waveStyle);

    // Add smooth scrolling to new messages
    function addSmoothScrolling() {
        const chatContainer = document.querySelector('.cl-chat-container');
        if (chatContainer) {
            const observer = new MutationObserver(() => {
                setTimeout(() => {
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }, 100);
            });

            observer.observe(chatContainer, { childList: true, subtree: true });
        }
    }

    // Add keyboard shortcuts
    function addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Space bar for voice mode
            if (e.code === 'Space' && !e.target.matches('input, textarea')) {
                e.preventDefault();
                const voiceButton = document.querySelector('.cl-voice-button');
                if (voiceButton) {
                    voiceButton.click();
                }
            }

            // Enter to send message (if not in input)
            if (e.code === 'Enter' && !e.target.matches('input, textarea') && !e.shiftKey) {
                e.preventDefault();
                const sendButton = document.querySelector('.cl-send-button');
                if (sendButton) {
                    sendButton.click();
                }
            }
        });
    }

    // Add loading animations
    function addLoadingAnimations() {
        const loadingElements = document.querySelectorAll('.cl-loading');
        loadingElements.forEach(loading => {
            if (!loading.querySelector('.anime-loading')) {
                const animeLoading = document.createElement('div');
                animeLoading.className = 'anime-loading';
                animeLoading.innerHTML = `
                    <div class="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                `;
                loading.appendChild(animeLoading);
            }
        });
    }

    // Add loading dots animation CSS
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        .loading-dots {
            display: flex;
            gap: 8px;
            justify-content: center;
            align-items: center;
        }

        .loading-dots span {
            width: 8px;
            height: 8px;
            background: linear-gradient(45deg, #ff6b9d, #8b5cf6);
            border-radius: 50%;
            animation: loadingDot 1.4s ease-in-out infinite both;
        }

        .loading-dots span:nth-child(1) { animation-delay: -0.32s; }
        .loading-dots span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes loadingDot {
            0%, 80%, 100% {
                transform: scale(0);
                opacity: 0.5;
            }
            40% {
                transform: scale(1);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(loadingStyle);

    // Initialize all effects
    function initAnimeInterface() {
        createParticles();
        addCharacterEffect();
        addHoverEffects();
        addVoiceModeEffects();
        addSmoothScrolling();
        addKeyboardShortcuts();
        
        // Observe for new messages and loading states
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    addTypingEffect();
                    addLoadingAnimations();
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Initial call
        addTypingEffect();
        addLoadingAnimations();
    }

    // Start when DOM is ready
    ready(initAnimeInterface);

    // Re-initialize on page changes (for SPA behavior)
    window.addEventListener('popstate', initAnimeInterface);
    window.addEventListener('pushstate', initAnimeInterface);

})(); 