from fastapi import FastAPI
import joblib
import pandas as pd
import yfinance as yf

app = FastAPI()

# Load trained model
model = joblib.load("AAPL_model.pkl")  # Replace with your actual trained model

# Asset mapping to ticker symbols
ASSET_TICKERS = {
    "Stock": {"AAPL": "Apple", "MSFT": "Microsoft"},
    "Cryptocurrency": {"BTC-USD": "Bitcoin", "ETH-USD": "Ethereum"},
    "Commodity": {"GC=F": "Gold", "CL=F": "Oil"},
    "Bond": {"^TNX": "Treasury Bond", "LQD": "Corporate Bond"},
    "Real Estate": {"VNQ": "REIT"},
}

@app.post("/predict/")
async def predict(data: dict):
    asset_type = data.get("asset_type")
    asset_name = data.get("asset_name")
    interest_rate = data.get("interest_rate")
    inflation_rate = data.get("inflation_rate")

    if asset_type not in ASSET_TICKERS or asset_name not in ASSET_TICKERS[asset_type]:
        return {"error": "Invalid asset type or name"}

    ticker = asset_name  # Use Yahoo Finance ticker

    # Fetch historical price data
    df = yf.download(ticker, period="5y", interval="1mo")  # Last 5 years, monthly

    if df.empty:
        return {"error": "No data found for this asset"}

    # Feature calculations
    df["30D_MA"] = df["Close"].rolling(window=3).mean()  # 3-month moving average
    df["Volatility"] = df["Close"].pct_change().rolling(window=3).std()
    df["Price Change"] = df["Close"].pct_change()

    latest_data = df.iloc[-1]  # Get latest available data

    # Construct input for model
    input_data = pd.DataFrame([[
        latest_data["Close"],
        latest_data["30D_MA"],
        latest_data["Volatility"],
        latest_data["Price Change"]
    ]], columns=["Close", "30D_MA", "Volatility", "Price Change"])

    # Predict price movement for the next 5 years
    predicted_price = model.predict(input_data)[0]

    # Adjust based on economic factors (simplified linear effect)
    adjusted_price = predicted_price * (1 + (interest_rate - inflation_rate) / 100)

    return {
        "asset": ASSET_TICKERS[asset_type][asset_name],
        "current_price": round(latest_data["Close"], 2),
        "predicted_price_5_years": round(adjusted_price, 2),
        "interest_rate": interest_rate,
        "inflation_rate": inflation_rate
    }
