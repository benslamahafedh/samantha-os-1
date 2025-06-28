"""Internet search tool using Tavily API."""

from utils.common import logger, tavily_client

internet_search_def = {
    "name": "internet_search",
    "description": "Performs an internet search using the Tavily API.",
    "parameters": {
        "type": "object",
        "properties": {
            "query": {
                "type": "string",
                "description": "The search query to look up on the internet (e.g., 'What's the weather like in Madrid tomorrow?').",
            },
        },
        "required": ["query"],
    },
}


async def internet_search_handler(query):
    """Executes an internet search using the Tavily API and returns the result."""
    try:
        logger.info(f"🕵 Performing internet search for query: '{query}'")
        response = tavily_client.search(query)

        results = response.get("results", [])
        if not results:
            return {
                "success": False,
                "error": f"No results found for '{query}'."
            }

        formatted_results = "\n".join(
            [
                f"{i+1}. [{result['title']}]({result['url']})\n{result['content'][:200]}..."
                for i, result in enumerate(results)
            ]
        )

        logger.info(f"📏 Search results for '{query}' retrieved successfully.")
        return {
            "success": True,
            "query": query,
            "results": results,
            "formatted_results": formatted_results,
            "total_results": len(results)
        }
    except Exception as e:
        logger.error(f"Error performing internet search: {str(e)}")
        return {
            "success": False,
            "error": f"An error occurred while performing the search: {str(e)}"
        }


internet_search = (internet_search_def, internet_search_handler)
