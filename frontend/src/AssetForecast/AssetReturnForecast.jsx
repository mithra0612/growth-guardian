import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Updated API endpoint configuration
const API_URL = "http://127.0.0.1:8000";

export default function AssetPredictionTool() {
  const [assetType, setAssetType] = useState('');
  const [assetName, setAssetName] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [inflationRate, setInflationRate] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Asset type options and their corresponding assets
  const assetOptions = {
    Stock: ['AAPL - Apple', 'MSFT - Microsoft'],
    Cryptocurrency: ['BTC-USD - Bitcoin', 'ETH-USD - Ethereum'],
    Commodity: ['GC=F - Gold', 'CL=F - Oil'],
    Bond: ['^TNX - Treasury Bond', 'LQD - Corporate Bond'],
    'Real Estate': ['VNQ - REIT']
  };

  // USD to INR conversion rate (for this example)
  const USD_TO_INR = 83.50;

  // Generate investment tips based on input and prediction
  const generateTips = () => {
    if (!prediction) return [];

    const tips = [];
    const growthPercentage = ((prediction.predictedPrice / prediction.currentPrice) - 1) * 100;
    
    // Tips based on asset type
    if (assetType === 'Stock') {
      tips.push({
        title: "Diversification Strategy",
        text: "Consider balancing your stock portfolio with bonds or commodities to reduce volatility."
      });
    } else if (assetType === 'Cryptocurrency') {
      tips.push({
        title: "Volatility Warning",
        text: "Cryptocurrencies can experience extreme price swings. Consider limiting exposure to no more than 5-10% of your portfolio."
      });
    } else if (assetType === 'Commodity') {
      tips.push({
        title: "Inflation Hedge",
        text: `With your projected inflation rate of ${prediction.inflationRate}%, commodities can provide a good hedge against rising prices.`
      });
    } else if (assetType === 'Bond') {
      tips.push({
        title: "Interest Rate Sensitivity",
        text: `With interest rates at ${prediction.interestRate}%, bond prices could be impacted if rates continue to change. Consider ladder strategies.`
      });
    } else if (assetType === 'Real Estate') {
      tips.push({
        title: "REIT Tax Implications",
        text: "REITs typically distribute a large percentage of income to shareholders, which may have tax implications. Consider holding in tax-advantaged accounts."
      });
    }

    // Tips based on inflation
    if (prediction.inflationRate > 3) {
      tips.push({
        title: "High Inflation Strategy",
        text: "Consider TIPS (Treasury Inflation-Protected Securities) or other inflation-protected investments to preserve purchasing power."
      });
    }

    // Tips based on interest rates
    if (prediction.interestRate > 4) {
      tips.push({
        title: "High Interest Rate Environment",
        text: "Consider the impact of high rates on growth stocks and longer-duration bonds. Short-term bonds may offer better risk-adjusted returns."
      });
    } else if (prediction.interestRate < 2) {
      tips.push({
        title: "Low Interest Rate Environment",
        text: "Low rates may support higher stock valuations. Consider if growth assets are appropriate for your portfolio."
      });
    }

    // Tips based on growth prediction
    if (growthPercentage > 50) {
      tips.push({
        title: "Temper Expectations",
        text: `The predicted growth of ${growthPercentage.toFixed(1)}% over 5 years is significant. Consider regular rebalancing to manage risk.`
      });
    } else if (growthPercentage < 20) {
      tips.push({
        title: "Evaluate Return Potential",
        text: `The predicted growth of ${growthPercentage.toFixed(1)}% over 5 years may lag inflation. Consider if this asset fits your financial goals.`
      });
    }

    return tips;
  };

  // Generate prediction data via API call - Updated for the new endpoint and INR conversion
  const generatePrediction = async () => {
    if (!assetType || !assetName || !interestRate || !inflationRate) {
      alert('Please fill all fields');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    // Extract the asset symbol from the selected option (e.g., "AAPL" from "AAPL - Apple Inc.")
    const assetSymbol = assetName.split(' - ')[0];
    
    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          asset_type: assetType,
          asset_name: assetSymbol,
          interest_rate: parseFloat(interestRate),
          inflation_rate: parseFloat(inflationRate)
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Extract current price and convert to INR
      const currentPriceUSD = data.current_price && typeof data.current_price === 'object' 
        ? Object.values(data.current_price)[0] 
        : data.current_price;
      
      const currentPriceINR = currentPriceUSD * USD_TO_INR;
      const predictedPriceINR = data.predicted_price_5_years * USD_TO_INR;
      
      // Update the prediction state with the backend response and INR values
      setPrediction({
        asset: assetName,
        currentPrice: currentPriceINR,
        predictedPrice: predictedPriceINR,
        interestRate: data.interest_rate,
        inflationRate: data.inflation_rate,
        growthApplied: data.growth_applied
      });
      
      // Show the prediction modal
      setShowModal(true);
      
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setError(`Failed to get prediction: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Format INR value with the ₹ symbol and thousands separators
  const formatINR = (value) => {
    return `₹${value.toLocaleString('en-IN')}`;
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  // Get tips if prediction exists
  const tips = prediction ? generateTips() : [];

  // Generate data points for the 5-year period for the line chart
  const generateChartData = () => {
    if (!prediction) return [];
    
    const currentPrice = prediction.currentPrice;
    const predictedPrice = prediction.predictedPrice;
    const growthRate = Math.pow(predictedPrice / currentPrice, 1/5) - 1;
    
    const data = [];
    
    for (let year = 0; year <= 5; year++) {
      const projectedValue = currentPrice * Math.pow(1 + growthRate, year);
      const inflationAdjustedValue = currentPrice * Math.pow(1 + growthRate - (prediction.inflationRate / 100), year);
      
      data.push({
        year: `${year}`,
        projectedValue: Math.round(projectedValue),
        inflationAdjustedValue: Math.round(inflationAdjustedValue)
      });
    }
    
    return data;
  };

  // Custom tooltip component for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{label}</p>
          <p className="text-blue-600">
            <span className="inline-block w-3 h-3 bg-blue-600 rounded-full mr-2"></span>
            Projected Value: {formatINR(payload[0].value)}
          </p>
          <p className="text-green-600">
            <span className="inline-block w-3 h-3 bg-green-600 rounded-full mr-2"></span>
            Inflation Adjusted: {formatINR(payload[1].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">AI Asset Return Predictor</h1>
          <p className="text-gray-600 text-lg">Predict future asset values in INR based on market conditions and AI analysis</p>
        </header>

        <main className="flex flex-col gap-8">
          {/* Input Section */}
          <section>
            <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 transition duration-300 hover:translate-y-1 hover:shadow-xl">
              <h2 className="text-2xl font-semibold text-blue-900 mb-6 pb-2 border-b-2 border-blue-500 inline-block">Prediction Parameters</h2>
              
              <div className="mb-6">
                <label htmlFor="assetType" className="block mb-2 text-gray-600 font-medium">Asset Type</label>
                <select 
                  id="assetType" 
                  value={assetType} 
                  onChange={(e) => {
                    setAssetType(e.target.value);
                    setAssetName('');
                  }}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                >
                  <option value="">Select Asset Type</option>
                  {Object.keys(assetOptions).map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              {assetType && (
                <div className="mb-6">
                  <label htmlFor="assetName" className="block mb-2 text-gray-600 font-medium">Asset Name</label>
                  <select 
                    id="assetName" 
                    value={assetName} 
                    onChange={(e) => setAssetName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  >
                    <option value="">Select Asset</option>
                    {assetOptions[assetType].map(asset => (
                      <option key={asset} value={asset}>{asset}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mb-6">
                <label htmlFor="interestRate" className="block mb-2 text-gray-600 font-medium flex items-center">
                  Interest Rate (%)
                  <div className="group relative ml-2">
                    <span className="text-blue-500 cursor-help">ⓘ</span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-blue-900 text-white text-xs rounded py-2 px-3 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                      Current market interest rate. Higher rates may reduce asset values.
                    </div>
                  </div>
                </label>
                <input 
                  type="number" 
                  id="interestRate" 
                  value={interestRate} 
                  onChange={(e) => setInterestRate(e.target.value)}
                  min="0"
                  max="20"
                  step="0.1"
                  placeholder="e.g., 3.5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="inflationRate" className="block mb-2 text-gray-600 font-medium flex items-center">
                  Inflation Rate (%)
                  <div className="group relative ml-2">
                    <span className="text-blue-500 cursor-help">ⓘ</span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-blue-900 text-white text-xs rounded py-2 px-3 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                      Expected annual inflation rate. Higher inflation typically erodes asset values.
                    </div>
                  </div>
                </label>
                <input 
                  type="number" 
                  id="inflationRate" 
                  value={inflationRate} 
                  onChange={(e) => setInflationRate(e.target.value)}
                  min="0"
                  max="20"
                  step="0.1"
                  placeholder="e.g., 2.1"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
              </div>

              <button 
                onClick={generatePrediction}
                disabled={isLoading}
                className={`w-full py-4 px-6 rounded-lg text-white font-semibold text-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
                  isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-blue-800'
                }`}
              >
                {isLoading ? 'Processing...' : 'Predict'}
              </button>
              
              {error && (
                <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700">
                  <p>{error}</p>
                </div>
              )}
            </div>
          </section>

          {/* Investment Tips Section (always visible if prediction exists) */}
          {prediction && tips.length > 0 && (
            <section className="w-full">
              <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 border-l-4 border-green-500 transition duration-300 hover:translate-y-1 hover:shadow-xl">
                <h2 className="text-2xl font-semibold text-blue-900 mb-6 pb-2 border-b-2 border-green-500 inline-block">Smart Investment Tips</h2>
                
                <div className="grid grid-cols-1 gap-6">                  {tips.map((tip, index) => (
                    <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        {tip.title}
                      </h3>
                      <p className="text-gray-700">{tip.text}</p>
                    </div>
                  ))}
                </div>
                
                
              </div>
            </section>
          )}
        </main>
        
        {/* Modal for Prediction Results */}
        {showModal && prediction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-full overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-blue-900">5-Year Prediction Results</h2>
                  <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="mb-4">
                    <span className="text-gray-500 text-sm">Asset:</span>
                    <p className="text-blue-900 font-semibold text-lg">{prediction.asset}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <span className="text-gray-500 text-sm">Current Price:</span>
                      <p className="text-blue-900 font-semibold text-lg">{formatINR(prediction.currentPrice)}</p>
                    </div>
                    
                    <div>
                      <span className="text-gray-500 text-sm">Predicted Price (5 years):</span>
                      <p className="text-blue-600 font-bold text-xl">{formatINR(prediction.predictedPrice)}</p>
                    </div>
                    
                    <div>
                      <span className="text-gray-500 text-sm">Interest Rate:</span>
                      <p className="text-blue-900 font-semibold">{prediction.interestRate}%</p>
                    </div>
                    
                    <div>
                      <span className="text-gray-500 text-sm">Inflation Rate:</span>
                      <p className="text-blue-900 font-semibold">{prediction.inflationRate}%</p>
                    </div>
                  </div>
               
                  {/* Professional Line Chart */}
                  <div className="mt-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-xl font-semibold text-blue-900 mb-4">5-Year Investment Projection</h3>
                      
                      <div className="flex flex-col md:flex-row md:justify-between mb-6">
                        <div className="mb-4 md:mb-0">
                          <span className="text-gray-500 text-sm block">Current Value:</span>
                          <span className="text-blue-900 font-semibold text-lg">{formatINR(prediction.currentPrice)}</span>
                        </div>
                        <div className="mb-4 md:mb-0">
                          <span className="text-gray-500 text-sm block">Projected in 5 Years:</span>
                          <span className="text-blue-600 font-bold text-lg">{formatINR(prediction.predictedPrice)}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 text-sm block">Total Growth:</span>
                          <span className={`font-bold text-lg ${((prediction.predictedPrice / prediction.currentPrice) - 1) * 100 >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {(((prediction.predictedPrice / prediction.currentPrice) - 1) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={generateChartData()}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis 
                              dataKey="year" 
                              tick={{ fill: '#4a5568' }}
                              axisLine={{ stroke: '#e2e8f0' }}
                            />
                            <YAxis 
                              tickFormatter={(value) => `₹${(value/1000)}k`}
                              tick={{ fill: '#4a5568' }}
                              axisLine={{ stroke: '#e2e8f0' }}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey="projectedValue" 
                              name="Projected Value" 
                              stroke="#3182ce" 
                              strokeWidth={3}
                              dot={{ stroke: '#3182ce', strokeWidth: 2, r: 4, fill: 'white' }}
                              activeDot={{ r: 6 }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="inflationAdjustedValue" 
                              name="Inflation Adjusted" 
                              stroke="#38a169" 
                              strokeWidth={3}
                              dot={{ stroke: '#38a169', strokeWidth: 2, r: 4, fill: 'white' }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="mt-4 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                        <p className="text-blue-800 text-sm">
                          <strong>Analysis:</strong> This projection is based on your input parameters including an interest rate of {prediction.interestRate}% 
                          and inflation rate of {prediction.inflationRate}%. The green line shows purchasing power after accounting for inflation.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <button 
                    onClick={closeModal}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}