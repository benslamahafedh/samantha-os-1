"""Stock price querying tool."""

import yfinance as yf
from utils.common import logger

query_stock_price_def = {
    "name": "query_stock_price",
    "description": "Queries the latest stock price information for a given stock symbol.",
    "parameters": {
        "type": "object",
        "properties": {
            "symbol": {
                "type": "string",
                "description": "The stock symbol to query (e.g., 'AAPL' for Apple Inc.)",
            },
            "period": {
                "type": "string",
                "description": "The time period for which to retrieve stock data (e.g., '1d' for one day, '1mo' for one month)",
            },
        },
        "required": ["symbol", "period"],
    },
}


async def query_stock_price_handler(symbol, period):
    """Queries the latest stock price information for a given stock symbol."""
    try:
        logger.info(f"Fetching stock price for symbol: {symbol}, period: {period}")
        stock = yf.Ticker(symbol)
        hist = stock.history(period=period)
        if hist.empty:
            logger.warning(f"No data found for symbol: {symbol}")
            return {
                "success": False,
                "error": "No data found for the given symbol."
            }
        
        # Get latest price
        latest_price = hist['Close'].iloc[-1]
        latest_date = hist.index[-1].strftime('%Y-%m-%d')
        
        logger.info(f"Stock data retrieved successfully for symbol: {symbol}")
        return {
            "success": True,
            "symbol": symbol,
            "period": period,
            "latest_price": float(latest_price),
            "latest_date": latest_date,
            "currency": "USD",
            "data_points": len(hist),
            "price_change": float(hist['Close'].iloc[-1] - hist['Close'].iloc[0]) if len(hist) > 1 else 0,
            "price_change_percent": float(((hist['Close'].iloc[-1] / hist['Close'].iloc[0]) - 1) * 100) if len(hist) > 1 else 0
        }
    except Exception as e:
        logger.error(f"Error querying stock price for symbol: {symbol} - {str(e)}")
        return {
            "success": False,
            "error": str(e)
        }


query_stock_price = (query_stock_price_def, query_stock_price_handler)
