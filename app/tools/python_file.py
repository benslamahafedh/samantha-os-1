"""Python file creation and execution tools."""

import os
import subprocess

from langchain.prompts import PromptTemplate
from pydantic import BaseModel, Field
from utils.ai_models import get_llm
from utils.common import logger, scratch_pad_dir


class PythonFile(BaseModel):
    """Python file content."""

    filename: str = Field(
        ...,
        description="The name of the Python file with the extension .py",
    )
    content: str = Field(
        ...,
        description="The Python code to be saved in the file",
    )


create_python_file_def = {
    "name": "create_python_file",
    "description": "Creates a Python file based on a given topic or content description.",
    "parameters": {
        "type": "object",
        "properties": {
            "filename": {
                "type": "string",
                "description": "The name of the Python file to be created (e.g., 'script.py').",
            },
            "content_description": {
                "type": "string",
                "description": "The content description for the Python file (e.g., 'Generate a random number').",
            },
        },
        "required": ["filename", "content_description"],
    },
}


async def create_python_file_handler(filename: str, content_description: str):
    """Creates a Python file with the provided filename based on content description."""
    try:
        logger.info(f"📝 Drafting Python file that '{content_description}'")

        llm = get_llm("python_code")

        structured_llm = llm.with_structured_output(PythonFile)

        system_template = """
        Create a Python script for the given topic. The script should be well-commented, use best practices, and aim to be simple yet effective. 
        Include informative docstrings and comments where necessary.

        # Topic
        {content_description}

        # Requirements
        1. **Define Purpose**: Write a brief docstring explaining the purpose of the script.
        2. **Implement Logic**: Implement the logic related to the topic, keeping the script easy to understand.
        3. **Best Practices**: Follow Python best practices, such as using functions where appropriate and adding comments to clarify the code.
        """

        prompt_template = PromptTemplate(
            input_variables=["content_description"],
            template=system_template,
        )

        chain = prompt_template | structured_llm
        python_file = chain.invoke({"content_description": content_description})
        content = python_file.content

        filepath = os.path.join(scratch_pad_dir, filename)
        with open(filepath, "w") as f:
            f.write(content)

        logger.info(f"💾 Python file '{filename}' created successfully at {filepath}")
        
        return {
            "success": True,
            "message": f"Python file '{filename}' created successfully based on the topic '{content_description}'.",
            "filepath": filepath,
            "content_preview": content[:200] + "..." if len(content) > 200 else content
        }

    except Exception as e:
        logger.error(f"Error creating Python file: {str(e)}")
        return {
            "success": False,
            "error": f"An error occurred while creating the Python file: {str(e)}"
        }


execute_python_file_def = {
    "name": "execute_python_file",
    "description": "Executes a Python file in the scratchpad directory.",
    "parameters": {
        "type": "object",
        "properties": {
            "filename": {
                "type": "string",
                "description": "The name of the Python file to be executed (e.g., 'script.py').",
            },
        },
        "required": ["filename"],
    },
}


async def execute_python_file_handler(filename: str):
    """Executes a Python file in the scratchpad directory."""
    try:
        filepath = os.path.join(scratch_pad_dir, filename)

        if not os.path.exists(filepath):
            error_message = f"Python file '{filename}' not found in scratchpad directory."
            logger.error(f"{error_message}")
            return {
                "success": False,
                "error": error_message
            }

        result = subprocess.run(
            ["python", filepath],
            capture_output=True,
            text=True,
        )

        if result.returncode == 0:
            logger.info(f"Successfully executed Python file '{filename}'")
            return {
                "success": True,
                "message": f"Successfully executed Python file '{filename}'",
                "output": result.stdout,
                "filename": filename
            }
        else:
            error_message = f"Error executing Python file '{filename}': {result.stderr}"
            logger.error(f"{error_message}")
            return {
                "success": False,
                "error": error_message,
                "stderr": result.stderr
            }

    except Exception as e:
        logger.error(f"Error executing Python file: {str(e)}")
        return {
            "success": False,
            "error": f"An error occurred while executing the Python file: {str(e)}"
        }


create_python_file = (create_python_file_def, create_python_file_handler)
execute_python_file = (execute_python_file_def, execute_python_file_handler)
