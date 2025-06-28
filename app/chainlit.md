# 🎤 Samantha Voice Assistant

## 🎭 **Voice-Enabled AI Companion**

Welcome to **Samantha** - your interactive AI companion with full voice capabilities!

### 🎤 **How to Use Voice Mode:**

1. **🎯 Click the "START TALKING" button** that appears below
2. **🔐 Grant microphone permission** when your browser asks
3. **🗣️ Start speaking** to Samantha
4. **🔊 Listen to her voice responses**

### 🚀 **Voice Features:**

- 🎤 **Real-time voice conversation** with OpenAI's advanced voice model
- 🔊 **Natural speech synthesis** - Samantha speaks back to you
- 📱 **Mobile-friendly** - Works on all devices
- ⚡ **Low latency** - Fast response times
- 🌍 **Advanced AI tools** - Weather, search, calculations and more

### 💡 **Tips for Best Experience:**

- **🎧 Use headphones** to prevent audio feedback
- **🤐 Speak clearly** and wait for Samantha to finish before speaking again
- **📱 On mobile:** Tap the voice button and grant microphone access
- **🔄 If issues occur:** Refresh the page and try again

---

**🎊 Ready to have a voice conversation with Samantha? Use the voice button that will appear below! 🎤**

<style>
/* Custom styling for voice interface */
.chainlit-app {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
    min-height: 100vh;
}

/* Avatar styling */
.avatar {
    border-radius: 50%;
    box-shadow: 0 0 30px rgba(255, 136, 0, 0.5);
    transition: all 0.3s ease;
}

.avatar:hover {
    box-shadow: 0 0 50px rgba(255, 136, 0, 0.8);
    transform: scale(1.05);
}

/* Voice button styling */
.cl-action-button {
    background: linear-gradient(145deg, #ff5500, #ff8800) !important;
    border: none !important;
    box-shadow: 0 0 20px rgba(255, 85, 0, 0.6) !important;
    color: white !important;
    font-weight: bold !important;
    font-size: 16px !important;
    padding: 15px 30px !important;
    border-radius: 25px !important;
    transition: all 0.3s ease !important;
}

.cl-action-button:hover {
    background: linear-gradient(145deg, #ff6600, #ff9900) !important;
    box-shadow: 0 0 30px rgba(255, 85, 0, 0.8) !important;
    transform: scale(1.05) !important;
}

/* Message styling */
.cl-message {
    background: rgba(255, 255, 255, 0.1) !important;
    border-radius: 15px !important;
    backdrop-filter: blur(10px) !important;
    border: 1px solid rgba(255, 136, 0, 0.3) !important;
}

/* Audio status indicators */
.cl-audio-recording {
    background: rgba(255, 0, 0, 0.2) !important;
    border: 2px solid #ff0000 !important;
    animation: pulse 1s ease-in-out infinite !important;
}

@keyframes pulse {
    0%, 100% { opacity: 0.8; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.02); }
}

/* Hide unnecessary elements but preserve audio functionality */
.cl-textField {
    display: none !important;
}

.cl-input {
    display: none !important;
}

/* Ensure audio elements remain visible */
[data-testid*="audio"],
[data-testid*="voice"],
[data-testid*="mic"],
.cl-action-button,
button[aria-label*="microphone" i],
button[title*="voice" i] {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
}
</style>

<script>
// Microphone permission helper
async function requestMicrophoneAccess() {
    try {
        console.log('🎤 Requesting microphone access...');
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('✅ Microphone access granted');
        
        // Stop the test stream
        stream.getTracks().forEach(track => track.stop());
        
        return true;
    } catch (error) {
        console.error('❌ Microphone access denied:', error);
        alert('🎤 Microphone access is required for voice mode. Please allow microphone access in your browser settings and try again.');
        return false;
    }
}

// Enhanced voice activation
function enhanceVoiceExperience() {
    console.log('🎤 Enhancing voice experience...');
    
    // Auto-request microphone permission on first interaction
    document.addEventListener('click', async function requestMicOnFirstClick() {
        await requestMicrophoneAccess();
        document.removeEventListener('click', requestMicOnFirstClick);
    }, { once: true });
    
    // Monitor for audio recording state
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const element = mutation.target;
                if (element.classList.contains('cl-audio-recording')) {
                    console.log('🎤 Voice recording active');
                    // Add visual feedback for recording state
                    document.body.style.background = 'linear-gradient(135deg, #2a1a1e 0%, #3a2640 50%, #4a3260 100%)';
                } else if (element.classList.contains('cl-audio-idle')) {
                    console.log('🔇 Voice recording stopped');
                    // Reset background
                    document.body.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
                }
            }
        });
    });
    
    // Start observing
    observer.observe(document.body, { 
        attributes: true, 
        childList: true, 
        subtree: true 
    });
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhanceVoiceExperience);
} else {
    enhanceVoiceExperience();
}

// Also initialize with delay to ensure Chainlit is ready
setTimeout(enhanceVoiceExperience, 1000);
</script> 