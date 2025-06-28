"""
Samantha OS - Ultimate AI Companion with Voice Mode
A conversational AI assistant with real-time voice interaction using OpenAI's Realtime API.
"""

import os
import asyncio
import traceback
import time
from uuid import uuid4

import chainlit as cl
from chainlit.logger import logger

from realtime import RealtimeClient
from tools import tools

# Session management for cost control
session_start_times = {}

async def setup_openai_realtime():
    """Instantiate and configure the OpenAI Realtime Client"""
    # Ensure OpenAI API key is available
    openai_api_key = os.getenv("OPENAI_API_KEY")
    if not openai_api_key:
        await cl.ErrorMessage(
            content="❌ **OpenAI API Key Missing!**\n\n"
                    "Please set the `OPENAI_API_KEY` environment variable to use voice mode.\n\n"
                    "This is required for real-time voice conversation with Samantha."
        ).send()
        return False
    
    try:
        openai_realtime = RealtimeClient()
        cl.user_session.set("track_id", str(uuid4()))

        async def handle_conversation_updated(event):
            item = event.get("item")
            delta = event.get("delta")
            """Currently used to stream audio back to the client."""
            if delta:
                # Only one of the following will be populated for any given event
                if "audio" in delta:
                    audio = delta["audio"]  # Int16Array, audio added
                    await cl.context.emitter.send_audio_chunk(
                        cl.OutputAudioChunk(
                            mimeType="pcm16",
                            data=audio,
                            track=cl.user_session.get("track_id"),
                        )
                    )
                if "transcript" in delta:
                    transcript = delta["transcript"]  # string, transcript added
                    pass
                if "arguments" in delta:
                    arguments = delta["arguments"]  # string, function arguments added
                    pass

        async def handle_item_completed(item):
            """Used to populate the chat context with transcription once an item is completed."""
            pass

        async def handle_conversation_interrupt(event):
            """Used to cancel the client previous audio playback."""
            cl.user_session.set("track_id", str(uuid4()))
            await cl.context.emitter.send_audio_interrupt()

        async def handle_error(event):
            logger.error(f"Realtime error: {event}")

        openai_realtime.on("conversation.updated", handle_conversation_updated)
        openai_realtime.on("conversation.item.completed", handle_item_completed)
        openai_realtime.on("conversation.interrupted", handle_conversation_interrupt)
        openai_realtime.on("error", handle_error)

        cl.user_session.set("openai_realtime", openai_realtime)
        
        # Add tools to the realtime client
        coros = [
            openai_realtime.add_tool(tool_def, tool_handler)
            for tool_def, tool_handler in tools
        ]
        await asyncio.gather(*coros)
        
        return True
        
    except Exception as e:
        logger.error(f"Failed to setup OpenAI realtime: {e}")
        await cl.ErrorMessage(
            content=f"❌ **Failed to setup voice mode:** {str(e)}\n\n"
                    "Please check your OpenAI API key and try again."
        ).send()
        return False


async def schedule_session_timeout(user_id):
    """Schedule automatic session termination after 2 minutes"""
    await asyncio.sleep(120)  # 2 minutes
    if user_id in session_start_times:
        elapsed = time.time() - session_start_times[user_id]
        if elapsed >= 120:
            await cl.Message(
                content="⏰ Session timeout reached (2 minutes). Please refresh to start a new session."
            ).send()
            # Force disconnect
            openai_realtime: RealtimeClient = cl.user_session.get("openai_realtime")
            if openai_realtime and openai_realtime.is_connected():
                await openai_realtime.disconnect()


@cl.on_chat_start
async def start():
    """Initialize the Samantha AI experience"""
    # Initialize session timing for cost control
    user_id = cl.user_session.get("user_id") or str(uuid4())
    cl.user_session.set("user_id", user_id)
    session_start_times[user_id] = time.time()
    
    # Create prominent mobile-friendly voice activation actions
    voice_action = cl.Action(
        name="activate_voice_mobile",
        icon="microphone",
        label="🎤 START TALKING TO SAMANTHA",
        description="Tap this button to begin voice conversation!",
        payload={}
    )
    
    help_action = cl.Action(
        name="voice_help",
        icon="help-circle",
        label="❓ Voice Help",
        description="How to use voice features",
        payload={}
    )
    
    await cl.Message(
        content="🎭 **SAMANTHA AI COMPANION** - Click-to-Talk Voice System!\n\n"
                "🎤 **CLICK THE BIG BUTTON BELOW TO START TALKING!** 👇\n\n"
                "💬 **How it works:**\n"
                "1. 🎤 **Tap the voice button below**\n"
                "2. 🗣️ **Grant microphone permission**\n"
                "3. 💬 **Start speaking to Samantha!**\n"
                "4. 🔊 **Hear her respond through speakers**\n\n"
                "🎯 **Voice Activation Methods:**\n"
                "• 🎤 **Action button** (most reliable for all devices)\n"
                "• 👆 **Click Samantha's avatar** (if visible)\n"
                "• 📱 **Touch gestures** (tap, double-tap, long-press)\n"
                "• ⌨️ **P key** (redirected to avatar click system)\n\n"
                "**No more keyboard-only activation - optimized for mobile!** 📱✨",
        actions=[voice_action, help_action]
    ).send()
    
    # Setup custom event listeners for avatar interactions
    custom_js = """
    // Setup custom event listener for avatar voice activation
    if (!window.samanthaEventListenersSetup) {
        window.addEventListener('samantha-voice-activate', function(event) {
            console.log('🎤 Samantha voice activation event received:', event.detail);
            
            // Try multiple methods to activate voice
            if (window.sendUserMessage) {
                window.sendUserMessage('!voice');
                console.log('✅ Sent !voice via sendUserMessage');
            }
            
            if (window.callAction) {
                window.callAction({
                    name: 'activate_voice',
                    payload: event.detail
                }).then(result => {
                    console.log('✅ Voice activation action result:', result);
                });
            }
        });
        
        window.samanthaEventListenersSetup = true;
        console.log('✅ Samantha custom event listeners setup complete');
    }
    """
    
    # Inject the custom JavaScript
    await cl.Message(
        content=f"<script>{custom_js}</script>",
        language="html"
    ).send()
    
    # Setup realtime client
    success = await setup_openai_realtime()
    if not success:
        return
    
    # Schedule automatic session termination after 2 minutes
    asyncio.create_task(schedule_session_timeout(user_id))


@cl.action_callback("activate_voice")
async def on_voice_activate_action(action):
    """Handle voice activation action from avatar click"""
    logger.info(f"🎤 Voice activation action received: {action}")
    success = await activate_voice_mode()
    return {"success": success}


@cl.action_callback("activate_voice_mobile")
async def on_voice_activate_mobile(action: cl.Action):
    """Handle mobile-friendly voice activation button"""
    logger.info(f"📱 Mobile voice activation button pressed: {action.payload}")
    
    # Send immediate feedback
    await cl.Message(
        content="🎤 **Activating voice mode...** Please wait!\n\n"
                "🔊 **Once connected, you'll see a recording indicator**\n"
                "🗣️ **Then start speaking to Samantha!**"
    ).send()
    
    # Activate voice mode
    success = await activate_voice_mode()
    
    if success:
        # Create a stop voice action for easy deactivation
        stop_action = cl.Action(
            name="stop_voice_mobile",
            icon="microphone-slash",
            label="🔇 Stop Voice",
            description="Tap to stop voice mode",
            payload={}
        )
        
        await cl.Message(
            content="✅ **Voice mode is now ACTIVE!** 🎤\n\n"
                    "🗣️ **Speak now** - Samantha is listening!\n"
                    "🔊 **You'll hear responses through your speakers**",
            actions=[stop_action]
        ).send()
    else:
        # Offer retry option
        retry_action = cl.Action(
            name="activate_voice_mobile",
            icon="microphone",
            label="🔄 Retry Voice",
            description="Try activating voice mode again",
            payload={}
        )
        
        await cl.Message(
            content="❌ **Voice activation failed**\n\n"
                    "💡 **Please check your microphone permissions and try again**",
            actions=[retry_action]
        ).send()
    
    return {"success": success}


@cl.action_callback("stop_voice_mobile")
async def on_voice_stop_mobile(action: cl.Action):
    """Handle stopping voice mode"""
    logger.info("🔇 Mobile voice stop button pressed")
    
    try:
        openai_realtime: RealtimeClient = cl.user_session.get("openai_realtime")
        if openai_realtime and openai_realtime.is_connected():
            await openai_realtime.disconnect()
            logger.info("🔇 Voice mode disconnected")
        
        # Create new voice activation button
        voice_action = cl.Action(
            name="activate_voice_mobile",
            icon="microphone",
            label="🎤 START TALKING TO SAMANTHA",
            description="Tap to start voice conversation again",
            payload={}
        )
        
        await cl.Message(
            content="🔇 **Voice mode stopped**\n\n"
                    "✨ **Ready to start a new voice conversation!**",
            actions=[voice_action]
        ).send()
        
        return {"success": True}
        
    except Exception as e:
        logger.error(f"Error stopping voice mode: {e}")
        await cl.ErrorMessage(
            content=f"❌ **Error stopping voice mode:** {str(e)}"
        ).send()
        return {"success": False}


@cl.action_callback("voice_help")
async def on_voice_help(action: cl.Action):
    """Provide voice activation help"""
    logger.info("❓ Voice help requested")
    
    voice_action = cl.Action(
        name="activate_voice_mobile",
        icon="microphone", 
        label="🎤 TRY VOICE NOW",
        description="Test voice activation",
        payload={}
    )
    
    await cl.Message(
        content="🎤 **CLICK-TO-TALK VOICE SYSTEM HELP**\n\n"
                "📱 **PRIMARY METHOD (Most Reliable):**\n"
                "• 🎤 **Use the action button** below this message\n"
                "• ✅ **Works on ALL devices and browsers**\n"
                "• 🔄 **Clear feedback and status updates**\n"
                "• 📱 **Mobile-optimized interface**\n\n"
                "👆 **AVATAR CLICK METHODS:**\n"
                "• **Single click/tap** Samantha's avatar\n"
                "• **Double tap** for direct voice activation\n"
                "• **Long press** (0.8s) for immediate microphone\n"
                "• **Haptic feedback** on supported devices\n\n"
                "⌨️ **KEYBOARD OVERRIDE:**\n"
                "• **P key** now redirects to avatar click system\n"
                "• **Prevents conflicts** when typing messages\n"
                "• **Smart detection** - only activates when not typing\n\n"
                "🔧 **TROUBLESHOOTING:**\n"
                "• 🎤 **Allow microphone permissions**\n"
                "• 🔊 **Check speaker volume**\n"
                "• 📶 **Ensure stable internet connection**\n"
                "• 🔄 **Refresh page if issues persist**\n\n"
                "**Ready to try? Use the button below!** 👇",
        actions=[voice_action]
    ).send()
    
    return {"success": True}





@cl.on_message
async def on_message(message: cl.Message):
    # Check if this is an avatar click trigger
    if message.content == "AVATAR_VOICE_ACTIVATE" or message.content == "!voice":
        await activate_voice_mode()
        return
    
    openai_realtime: RealtimeClient = cl.user_session.get("openai_realtime")
    if openai_realtime and openai_realtime.is_connected():
        # Send text message to realtime client
        await openai_realtime.send_user_message_content(
            [{"type": "input_text", "text": message.content}]
        )
    else:
        await cl.Message(
            content="🎭 Please click on Samantha's avatar to activate voice mode!\n\n"
                    "💡 **Tip:** Voice mode requires an active OpenAI API key to function."
        ).send()


async def activate_voice_mode():
    """Activate voice mode when avatar is clicked"""
    try:
        openai_realtime: RealtimeClient = cl.user_session.get("openai_realtime")
        if not openai_realtime:
            await cl.ErrorMessage(
                content="❌ **Voice mode not initialized!**\n\n"
                        "Please refresh the page and try again."
            ).send()
            return
            
        # Connect to realtime client
        await openai_realtime.connect()
        await openai_realtime.wait_for_session_created()
        logger.info("🎤 Voice mode activated by avatar click")
        
        # Send confirmation message
        await cl.Message(
            content="🎭✨ **Voice mode activated!** 🎤\n\n"
                    "🗣️ **Speak now** - Samantha is listening!\n"
                    "🔊 You'll hear her responses through your speakers."
        ).send()
        
        # Trigger audio start
        await cl.context.emitter.send_audio_start()
        
        return True
        
    except Exception as e:
        logger.error(f"Failed to activate voice mode from avatar: {e}")
        await cl.ErrorMessage(
            content=f"❌ **Failed to activate voice mode:** {str(e)}\n\n"
                    "Please check your OpenAI API key and try again."
        ).send()
        return False


@cl.on_audio_start
async def on_audio_start():
    try:
        openai_realtime: RealtimeClient = cl.user_session.get("openai_realtime")
        if not openai_realtime:
            await cl.ErrorMessage(
                content="❌ **Voice mode not initialized!**\n\n"
                        "Please refresh the page and try again."
            ).send()
            return False
            
        await openai_realtime.connect()
        await openai_realtime.wait_for_session_created()
        logger.info("Connected to OpenAI realtime")
        return True
    except Exception as e:
        logger.error(f"Failed to connect to OpenAI realtime: {e}")
        print(traceback.format_exc())
        await cl.ErrorMessage(
            content=f"❌ **Failed to connect to voice mode:** {str(e)}\n\n"
                    "Please check your OpenAI API key and try again."
        ).send()
        return False


@cl.on_audio_chunk
async def on_audio_chunk(chunk: cl.InputAudioChunk):
    openai_realtime: RealtimeClient = cl.user_session.get("openai_realtime")
    if openai_realtime and openai_realtime.is_connected():
        await openai_realtime.append_input_audio(chunk.data)
    else:
        logger.info("RealtimeClient is not connected")


@cl.on_audio_end
@cl.on_chat_end
@cl.on_stop
async def on_end():
    openai_realtime: RealtimeClient = cl.user_session.get("openai_realtime")
    if openai_realtime and openai_realtime.is_connected():
        await openai_realtime.disconnect()
