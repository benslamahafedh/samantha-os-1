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
    
    await cl.Message(
        content="🎌 **Samantha OS** - Your Ultimate AI Companion!\n\n"
                "🌟 **Press `P` or click the microphone to start voice mode!**\n\n"
                "✨ **Features:**\n"
                "• 🎤 Real-time voice conversation\n"
                "• 🛠️ Advanced AI tools\n"
                "• ⏰ 2-minute session limit for cost control\n\n"
                "Ready to experience the future of AI interaction!"
    ).send()
    
    # Setup realtime client
    success = await setup_openai_realtime()
    if not success:
        return
    
    # Schedule automatic session termination after 2 minutes
    asyncio.create_task(schedule_session_timeout(user_id))


@cl.on_message
async def on_message(message: cl.Message):
    openai_realtime: RealtimeClient = cl.user_session.get("openai_realtime")
    if openai_realtime and openai_realtime.is_connected():
        # Send text message to realtime client
        await openai_realtime.send_user_message_content(
            [{"type": "input_text", "text": message.content}]
        )
    else:
        await cl.Message(
            content="🎤 Please activate voice mode first by pressing `P` or clicking the microphone button!\n\n"
                    "💡 **Tip:** Voice mode requires an active OpenAI API key to function."
        ).send()


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
