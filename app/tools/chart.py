"""Plotly chart drawing tool."""

import plotly
from utils.common import logger

draw_plotly_chart_def = {
    "name": "draw_plotly_chart",
    "description": "Draws a Plotly chart based on the provided JSON figure and displays it with an accompanying message.",
    "parameters": {
        "type": "object",
        "properties": {
            "message": {
                "type": "string",
                "description": "The message to display alongside the chart",
            },
            "plotly_json_fig": {
                "type": "string",
                "description": "A JSON string representing the Plotly figure to be drawn",
            },
        },
        "required": ["message", "plotly_json_fig"],
    },
}


async def draw_plotly_chart_handler(message: str, plotly_json_fig):
    try:
        logger.info(f"Drawing Plotly chart with message: {message}")
        fig = plotly.io.from_json(plotly_json_fig)
        
        # Convert figure to HTML for display
        html_content = fig.to_html(include_plotlyjs=False, full_html=False)
        
        logger.info(f"Plotly chart created successfully.")
        return {
            "success": True,
            "message": message,
            "chart_type": "plotly",
            "html_content": html_content,
            "figure_data": fig.to_dict()
        }
    except Exception as e:
        logger.error(f"Error drawing Plotly chart: {str(e)}")
        return {
            "success": False,
            "error": str(e)
        }


draw_plotly_chart = (draw_plotly_chart_def, draw_plotly_chart_handler)
