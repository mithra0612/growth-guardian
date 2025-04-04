from fastapi import FastAPI
import joblib
import pandas as pd
import yfinance as yf

from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

# Load trained model
model = joblib.load("AAPL_model.pkl")  # Replace with your actual trained model

app = FastAPI()

# ✅ Allow CORS for your frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Adjust this if needed
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Asset mapping to ticker symbols
ASSET_TICKERS = {
    "Stock": {"AAPL": "Apple", "MSFT": "Microsoft"},
    "Cryptocurrency": {"BTC-USD": "Bitcoin", "ETH-USD": "Ethereum"},
    "Commodity": {"GC=F": "Gold", "CL=F": "Oil"},
    "Bond": {"^TNX": "Treasury Bond", "LQD": "Corporate Bond"},
    "Real Estate": {"VNQ": "REIT"},
}

# Expected 5-year growth per asset type
EXPECTED_GROWTH = {
    "Stock": 1.5,         # 50% growth
    "Cryptocurrency": 2.0, # 100% growth
    "Commodity": 1.3,     # 30% growth
    "Bond": 1.15,         # 15% growth
    "Real Estate": 1.4    # 40% growth
}

@app.post("/predict/")
async def predict(data: dict):
    asset_type = data.get("asset_type")
    asset_name = data.get("asset_name")
    interest_rate = data.get("interest_rate")
    inflation_rate = data.get("inflation_rate")

    if asset_type not in ASSET_TICKERS or asset_name not in ASSET_TICKERS[asset_type]:
        return {"error": "Invalid asset type or name"}

    ticker = asset_name

    # Fetch historical data (5 years, monthly)
    df = yf.download(ticker, period="5y", interval="1mo")

    if df.empty:
        return {"error": "No data found for this asset"}

    # Feature calculations
    df["30D_MA"] = df["Close"].rolling(window=3).mean()
    df["Volatility"] = df["Close"].pct_change().rolling(window=3).std()
    df["Price Change"] = df["Close"].pct_change()

    latest_data = df.iloc[-1]

    input_data = pd.DataFrame([[ 
        latest_data["Close"],
        latest_data["30D_MA"],
        latest_data["Volatility"],
        latest_data["Price Change"]
    ]], columns=["Close", "30D_MA", "Volatility", "Price Change"])

    base_prediction = model.predict(input_data)[0]

    # ✅ Apply expected growth multiplier
    expected_growth_multiplier = EXPECTED_GROWTH.get(asset_type, 1.0)
    growth_applied_prediction = base_prediction * expected_growth_multiplier

    # ✅ Adjust for economic factors
    adjusted_prediction = growth_applied_prediction * (1 + (interest_rate - inflation_rate) / 100)

    return {
        "asset": ASSET_TICKERS[asset_type][asset_name],
        "current_price": round(latest_data["Close"], 2),
        "predicted_price_5_years": round(adjusted_prediction, 2),
        "interest_rate": interest_rate,
        "inflation_rate": inflation_rate,
        "growth_applied": f"{int((expected_growth_multiplier - 1) * 100)}%"
    }
