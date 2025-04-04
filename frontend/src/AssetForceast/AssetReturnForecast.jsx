import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AssetReturnForecast = () => {
  const [asset, setAsset] = useState("AAPL");
  const [assetType, setAssetType] = useState("Stock");
  const [interestRate, setInterestRate] = useState(3);
  const [inflationRate, setInflationRate] = useState(2);
  const [forecastData, setForecastData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Asset type options
  const assetTypes = [
    { value: "Stock", label: "Stock (e.g., AAPL, MSFT)" },
    { value: "Crypto", label: "Cryptocurrency (e.g., BTC, ETH)" },
    { value: "Commodity", label: "Commodity (e.g., Gold, Oil)" },
    { value: "Bond", label: "Bond (e.g., Treasury, Corporate)" },
    { value: "RealEstate", label: "Real Estate (e.g., REIT)" },
  ];

  // Generate forecast data based on input parameters
  const generateForecast = () => {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Base expected return calculation (simplified model)
      let baseReturn = 7 + (interestRate - inflationRate) / 2;
      let volatility = 2;

      // Adjust base return and volatility based on asset type
      switch (assetType) {
        case "Crypto":
          baseReturn = 12 + (interestRate - inflationRate);
          volatility = 8;
          break;
        case "Commodity":
          baseReturn = 5 + (interestRate - inflationRate) / 3;
          volatility = 3;
          break;
        case "Bond":
          baseReturn = 3 + interestRate / 2;
          volatility = 1;
          break;
        case "RealEstate":
          baseReturn = 6 + (interestRate - inflationRate) / 2;
          volatility = 2.5;
          break;
        default: // Stock
          baseReturn = 7 + (interestRate - inflationRate) / 2;
          volatility = 4;
      }

      // Generate 5-year data with some randomness
      const data = [];
      let cumulativeExpected = 100;
      let cumulativeOptimistic = 100;
      let cumulativePessimistic = 100;

      for (let year = 1; year <= 5; year++) {
        // Add some variance based on year and volatility
        const yearFactor = (year / 5) * volatility;
        const expectedReturn = baseReturn + (Math.random() - 0.5) * yearFactor;
        const optimisticReturn =
          expectedReturn + volatility * 0.75 + (Math.random() * volatility) / 2;
        const pessimisticReturn =
          expectedReturn - volatility - (Math.random() * volatility) / 2;

        // Calculate cumulative returns
        cumulativeExpected *= 1 + expectedReturn / 100;
        cumulativeOptimistic *= 1 + optimisticReturn / 100;
        cumulativePessimistic *= 1 + pessimisticReturn / 100;

        // Calculate annualized returns
        const expectedAnnualized =
          ((cumulativeExpected / 100) ** (1 / year) - 1) * 100;
        const optimisticAnnualized =
          ((cumulativeOptimistic / 100) ** (1 / year) - 1) * 100;
        const pessimisticAnnualized =
          ((cumulativePessimistic / 100) ** (1 / year) - 1) * 100;

        data.push({
          year: `Year ${year}`,
          expected: parseFloat(expectedAnnualized.toFixed(2)),
          optimistic: parseFloat(optimisticAnnualized.toFixed(2)),
          pessimistic: parseFloat(pessimisticAnnualized.toFixed(2)),
        });
      }

      setForecastData(data);
      setIsLoading(false);
    }, 800);
  };

  // Generate initial forecast on component mount
  useEffect(() => {
    generateForecast();
  }, []);

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-gray-100 min-h-screen flex flex-col items-center p-4">
      {/* Header Section */}
      <header className="w-full bg-white backdrop-blur-lg bg-opacity-90 p-6 text-center rounded-lg shadow-lg max-w-4xl mt-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Long-Term Asset Return Forecast
        </h1>
        <p className="text-gray-600 mt-2">
          Visualize 5-year returns with AI-powered insights
        </p>
      </header>

      {/* Input Section */}
      <div className="w-full max-w-4xl bg-white shadow-lg p-6 mt-6 rounded-lg border border-gray-100">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
            {/* Asset Type Dropdown */}
            <div className="flex-1">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="assetType"
              >
                Asset Type
              </label>
              <div className="relative">
                <select
                  id="assetType"
                  value={assetType}
                  onChange={(e) => setAssetType(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 pl-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  {assetTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Asset Ticker */}
            <div className="flex-1">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="asset"
              >
                Asset Ticker/Name
              </label>
              <div className="relative">
                <input
                  id="asset"
                  type="text"
                  value={asset}
                  onChange={(e) => setAsset(e.target.value)}
                  placeholder={
                    assetType === "Stock"
                      ? "e.g., AAPL"
                      : assetType === "Crypto"
                      ? "e.g., BTC"
                      : assetType === "Commodity"
                      ? "e.g., Gold"
                      : assetType === "Bond"
                      ? "e.g., T-Bill"
                      : "e.g., VNQ"
                  }
                  className="w-full border border-gray-300 rounded-lg p-3 pl-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-3 text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
            <div className="flex-1">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="interestRate"
              >
                Interest Rate (%)
              </label>
              <div className="flex items-center">
                <input
                  id="interestRate"
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <span className="w-12 ml-3 text-center font-medium bg-blue-50 text-blue-600 rounded-lg px-2 py-1">
                  {interestRate}%
                </span>
              </div>
            </div>

            <div className="flex-1">
              <label
                className="block text-gray-700 font-medium mb-2"
                htmlFor="inflationRate"
              >
                Inflation Rate (%)
              </label>
              <div className="flex items-center">
                <input
                  id="inflationRate"
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <span className="w-12 ml-3 text-center font-medium bg-blue-50 text-blue-600 rounded-lg px-2 py-1">
                  {inflationRate}%
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={generateForecast}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition duration-200 transform hover:scale-105 hover:shadow-lg flex items-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  Generate Forecast
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Visualization Section */}
      <div className="w-full max-w-4xl mt-8 p-8 bg-white shadow-lg rounded-lg border border-gray-100 flex flex-col items-center">
        <div className="flex items-center mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              5-Year Forecast for <span className="text-blue-600">{asset}</span>
            </h2>
            <p className="text-sm text-gray-500">Asset Type: {assetType}</p>
          </div>
        </div>

        <div className="w-full h-96 p-4 bg-white border border-gray-100 rounded-lg shadow-inner">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={forecastData}
              margin={{ top: 10, right: 30, left: 10, bottom: 20 }}
            >
              <defs>
                <linearGradient
                  id="colorOptimistic"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
                <linearGradient
                  id="colorPessimistic"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.3} />
                </linearGradient>
                <linearGradient id="gradientLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
              <XAxis
                dataKey="year"
                tick={{ fill: "#6B7280" }}
                axisLine={{ stroke: "#E5E7EB" }}
              />
              <YAxis
                label={{
                  value: "Annualized Return (%)",
                  angle: -90,
                  position: "insideLeft",
                  style: { fill: "#6B7280", fontSize: 12 },
                }}
                domain={["auto", "auto"]}
                tick={{ fill: "#6B7280" }}
                axisLine={{ stroke: "#E5E7EB" }}
              />
              <Tooltip
                formatter={(value) => [`${value}%`, ""]}
                labelFormatter={(label) => `${label}`}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px" }} />
              <Area
                type="monotone"
                dataKey="optimistic"
                stroke="#10B981"
                fillOpacity={1}
                fill="url(#colorOptimistic)"
                strokeWidth={2}
                name="Optimistic"
                activeDot={{
                  r: 6,
                  stroke: "#10B981",
                  strokeWidth: 2,
                  fill: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="expected"
                stroke="url(#gradientLine)"
                strokeWidth={3}
                dot={{ r: 4, fill: "#4F46E5", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{
                  r: 6,
                  fill: "#4F46E5",
                  strokeWidth: 2,
                  stroke: "#fff",
                }}
                name="Expected"
              />
              <Area
                type="monotone"
                dataKey="pessimistic"
                stroke="#F59E0B"
                fillOpacity={1}
                fill="url(#colorPessimistic)"
                strokeWidth={2}
                name="Pessimistic"
                activeDot={{
                  r: 6,
                  stroke: "#F59E0B",
                  strokeWidth: 2,
                  fill: "#fff",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {forecastData.length > 0 && (
          <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-md w-full max-w-md border border-gray-100">
            <h3 className="text-center font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
              5-Year Annualized Returns
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-green-600 font-bold text-xl">
                  {forecastData[forecastData.length - 1].optimistic.toFixed(2)}%
                </p>
                <p className="text-sm text-gray-600 mt-1">Optimistic</p>
              </div>
              <div className="p-3 bg-indigo-50 rounded-lg">
                <p className="text-indigo-600 font-bold text-xl">
                  {forecastData[forecastData.length - 1].expected.toFixed(2)}%
                </p>
                <p className="text-sm text-gray-600 mt-1">Expected</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg">
                <p className="text-amber-600 font-bold text-xl">
                  {forecastData[forecastData.length - 1].pessimistic.toFixed(2)}
                  %
                </p>
                <p className="text-sm text-gray-600 mt-1">Pessimistic</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="text-sm text-gray-500 mt-8 mb-6 text-center max-w-4xl px-4 bg-white bg-opacity-50 p-4 rounded-lg">
        <p>
          Note: This forecast tool uses a simplified model based on asset type,
          interest rates, inflation, and historical behavior. Different asset
          classes have different risk-return profiles. Actual returns may vary
          significantly. Not financial advice.
        </p>
      </div>
    </div>
  );
};

export default AssetReturnForecast;
