from fastapi import FastAPI
import joblib
import pandas as pd
import yfinance as yf
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Load trained model
model = joblib.load("AAPL_model.pkl")  # Replace with your actual trained model

# ✅ Allow CORS for your frontend origin (React app running on Vite default port)
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

# Expected annual growth rate per asset type
EXPECTED_ANNUAL_GROWTH = {
    "Stock": 1.084,         # ~8.4% per year (Compounds over time)
    "Cryptocurrency": 1.15,  # ~15% per year
    "Commodity": 1.055,     # ~5.5% per year
    "Bond": 1.03,           # ~3% per year
    "Real Estate": 1.07     # ~7% per year
}

@app.post("/predict/")
async def predict(data: dict):
    # Extract data from the frontend payload
    asset_type = data.get("asset_type")
    asset_name = data.get("asset_name")
    interest_rate = data.get("interest_rate")
    inflation_rate = data.get("inflation_rate")
    forecast_years = data.get("forecast_years", 5)  # Match frontend key, default to 5 years if not provided

    # Validate asset type and name
    if asset_type not in ASSET_TICKERS or asset_name not in ASSET_TICKERS[asset_type]:
        return {"error": "Invalid asset type or name"}

    ticker = asset_name

    # Fetch historical data (last 5 years, monthly)
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

    # Base prediction from the model
    base_prediction = model.predict(input_data)[0]

    # Apply growth over the given number of years using compound growth formula
    annual_growth = EXPECTED_ANNUAL_GROWTH.get(asset_type, 1.05)  # Default 5% per year if asset type not found
    growth_applied_prediction = base_prediction * (annual_growth ** forecast_years)  # Compounded growth

    # Adjust for economic factors
    adjusted_prediction = growth_applied_prediction * (1 + (interest_rate - inflation_rate) / 100)

    # Construct the response with dynamic key expected by frontend
    response = {
        "asset": ASSET_TICKERS[asset_type][asset_name],
        "current_price": round(latest_data["Close"], 2),
        f"predicted_price_{forecast_years}_years": round(adjusted_prediction, 2),  # Dynamic key
        "interest_rate": interest_rate,
        "inflation_rate": inflation_rate,
        "forecast_years": forecast_years,  # Return forecast_years for consistency
        "growth_applied": f"{int((annual_growth ** forecast_years - 1) * 100)}%"
    }

    return response
