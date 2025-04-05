import { useState, useRef, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const API_URL = "https://fb67-2409-40f4-27-1d89-c149-9503-cfaf-bf9.ngrok-free.app";
const FUND_ANALYZER_API = "https://hackit-fin-tech-backend.vercel.app/api/fundAnalyzer";

export default function AssetPredictionTool() {
  const [assetType, setAssetType] = useState('');
  const [assetName, setAssetName] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [inflationRate, setInflationRate] = useState('');
  const [forecastYears, setForecastYears] = useState('2'); 
  const [prediction, setPrediction] = useState(null);
  const [fundAnalysis, setFundAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const resultsRef = useRef(null);

  const assetOptions = {
    Stock: ['AAPL - Apple', 'MSFT - Microsoft'],
    Cryptocurrency: ['BTC-USD - Bitcoin', 'ETH-USD - Ethereum'],
    Commodity: ['GC=F - Gold', 'CL=F - Oil'],
    Bond: ['^TNX - Treasury Bond', 'LQD - Corporate Bond'],
    'Real Estate': ['VNQ - REIT']
  };

  const USD_TO_INR = 83.50;

  useEffect(() => {
    if (prediction && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [prediction]);

  const generatePrediction = async () => {
    if (!assetType || !assetName || !interestRate || !inflationRate || !forecastYears) {
      alert('Please fill all fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    const assetSymbol = assetName.split(' - ')[0]; // e.g., "AAPL" from "AAPL - Apple"
    
    const requestPayload = {
      asset_type: assetType,
      asset_name: assetSymbol,
      interest_rate: parseFloat(interestRate) || 0,
      inflation_rate: parseFloat(inflationRate) || 0,
      forecast_years: parseInt(forecastYears) || 2,
    };

    try {
      // First, get the prediction data
      const predictionResponse = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload),
      });

      if (!predictionResponse.ok) {
        const errorData = await predictionResponse.json().catch(() => null);
        throw new Error(errorData?.error || `Error: ${predictionResponse.status}`);
      }

      const predictionData = await predictionResponse.json();
      console.log('Full Backend Response:', predictionData);

      // Extract current_price using the asset symbol
      const currentPriceUSD = Number(predictionData.current_price[assetSymbol]) || 0;
      const predictedPriceKey = `predicted_price_${forecastYears}_years`;
      const predictedPriceUSD = Number(predictionData[predictedPriceKey]) || 0;

      const currentPriceINR = currentPriceUSD * USD_TO_INR;
      const predictedPriceINR = predictedPriceUSD * USD_TO_INR;

      setPrediction({
        asset: assetName,
        currentPrice: currentPriceINR,
        predictedPrice: predictedPriceINR,
        interestRate: Number(predictionData.interest_rate) || 0,
        inflationRate: Number(predictionData.inflation_rate) || 0,
        growthApplied: predictionData.growth || '0%',
        forecastYears: parseInt(predictionData.forecast_years) || parseInt(forecastYears),
      });

      // Next, get the fund analysis data
      const fundAnalysisResponse = await fetch(FUND_ANALYZER_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload),
      });

      if (!fundAnalysisResponse.ok) {
        const errorData = await fundAnalysisResponse.json().catch(() => null);
        console.warn('Fund analysis request failed:', errorData?.error || fundAnalysisResponse.status);
        // We'll continue even if fund analysis fails
      } else {
        const fundAnalysisData = await fundAnalysisResponse.json();
        console.log('Fund Analysis Response:', fundAnalysisData);
        setFundAnalysis(fundAnalysisData.response);
      }

    } catch (error) {
      console.error('Error fetching prediction:', error);
      setError(`Failed to get prediction: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const formatINR = (value) => {
    return isNaN(value) ? '₹0' : `₹${Number(value).toLocaleString('en-IN')}`;
  };

  const generateChartData = () => {
    if (!prediction || !prediction.currentPrice || !prediction.predictedPrice) {
      console.log('Chart data generation failed: Invalid prediction data', prediction);
      return [];
    }

    const currentPrice = Number(prediction.currentPrice) || 0;
    const predictedPrice = Number(prediction.predictedPrice) || 0;
    const years = Number(prediction.forecastYears) || 1;
    const growthRate = predictedPrice > 0 && currentPrice > 0 
      ? Math.pow(predictedPrice / currentPrice, 1 / years) - 1 
      : 0;

    const data = [];
    for (let year = 0; year <= years; year++) {
      const projectedValue = currentPrice * Math.pow(1 + growthRate, year);
      const inflationAdjustedValue = currentPrice * Math.pow(1 + growthRate - (Number(prediction.inflationRate) / 100 || 0), year);

      data.push({
        year: year,
        projectedValue: Math.round(projectedValue) || 0,
        inflationAdjustedValue: Math.round(inflationAdjustedValue) || 0,
      });
    }
    console.log('Generated Chart Data:', data);
    return data;
  };

  // Format the fund analysis text with proper line breaks and styling
  const formatFundAnalysis = (text) => {
    if (!text) return null;
  
    // Split the text into sections based on double newlines
    const sections = text.split('\n\n');
  
    return sections.map((section, index) => {
      // Handle sections with asterisks as list items
      if (section.includes('*')) {
        return (
          <div key={index} className="mb-6">
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              {section
                .split('\n')
                .filter((line) => line.trim().startsWith('*'))
                .map((line, lineIndex) => (
                  <li key={lineIndex}>
                    {line
                      .replace('* ', '') // Remove the leading asterisk
                      .split(/(\*\*.*?\*\*)/) // Split by bold markers
                      .map((part, partIndex) =>
                        part.startsWith('**') && part.endsWith('**') ? (
                          <strong key={partIndex}>{part.replace(/\*\*/g, '')}</strong>
                        ) : (
                          part
                        )
                      )}
                  </li>
                ))}
            </ul>
          </div>
        );
      }
  
      // Default handling for other content
      return (
        <div key={index} className="mb-4">
          {section.split('\n').map((line, lineIndex) => (
            <p key={lineIndex} className="mb-2">
              {line.split(/(\*\*.*?\*\*|📌 Investment Summary:|⚠️ Risk Metrics:|💡 Risk Advisory:)/).map((part, partIndex) => {
                // Check for bold markers or specific phrases
                if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={partIndex}>{part.replace(/\*\*/g, '')}</strong>;
                } else if (
                  part === '📌 Investment Summary:' ||
                  part === '⚠️ Risk Metrics:' ||
                  part === '💡 Risk Advisory:'
                ) {
                  return <strong key={partIndex}>{part}</strong>;
                }
                return part;
              })}
            </p>
          ))}
        </div>
      );
    });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
          <p className="font-semibold text-gray-800">Year {label}</p>
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
        <header className="text-center mb-8">
          <h1 className="text-4xl font-semibold text-blue-900 ">Asset Return Forecast</h1>
        </header>

        <main className="flex flex-col gap-8">
          <section>
            <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 transition duration-300 hover:translate-y-1 hover:shadow-xl">
              <h2 className="text-2xl font-semibold text-blue-900 mb-6 pb-2 border-b-2 border-blue-500 inline-block">Prediction Parameters</h2>
              <div className="mb-6">
                <label htmlFor="assetType" className="block mb-2 text-gray-600 font-medium">Asset Type</label>
                <select id="assetType" value={assetType} onChange={(e) => { setAssetType(e.target.value); setAssetName(''); }} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                  <option value="">Select Asset Type</option>
                  {Object.keys(assetOptions).map(type => <option key={type} value={type}>{type}</option>)}
                </select>
              </div>
              {assetType && (
                <div className="mb-6">
                  <label htmlFor="assetName" className="block mb-2 text-gray-600 font-medium">Asset Name</label>
                  <select id="assetName" value={assetName} onChange={(e) => setAssetName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                    <option value="">Select Asset</option>
                    {assetOptions[assetType].map(asset => <option key={asset} value={asset}>{asset}</option>)}
                  </select>
                </div>
              )}
              <div className="mb-6">
                <label htmlFor="forecastYears" className="block mb-2 text-gray-600 font-medium flex items-center">
                  Forecast Period (Years)
                  <div className="group relative ml-2">
                    <span className="text-blue-500 cursor-help">ⓘ</span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-blue-900 text-white text-xs rounded py-2 px-3 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                      Number of years to forecast the asset's future value
                    </div>
                  </div>
                </label>
                <input type="number" id="forecastYears" value={forecastYears} onChange={(e) => setForecastYears(e.target.value)} min="1" max="30" step="1" placeholder="e.g., 2" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
              </div>
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
                <input type="number" id="interestRate" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} min="0" max="20" step="0.1" placeholder="e.g., 3" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
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
                <input type="number" id="inflationRate" value={inflationRate} onChange={(e) => setInflationRate(e.target.value)} min="0" max="20" step="0.1" placeholder="e.g., 2" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" />
              </div>
              <button onClick={generatePrediction} disabled={isLoading} className={`w-full py-4 px-6 rounded-lg text-white font-semibold text-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-lg ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-blue-800'}`}>
                {isLoading ? 'Processing...' : 'Predict'}
              </button>
              {error && <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700"><p>{error}</p></div>}
            </div>
          </section>

          {prediction && (
            <section ref={resultsRef} className="w-full pt-4 mt-2">
              <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 border-l-4 border-blue-500 transition duration-300 hover:shadow-xl">
                <h2 className="text-2xl font-semibold text-blue-900 mb-6 pb-2 border-b-2 border-blue-500 inline-block">{prediction.forecastYears}-Year Prediction Results</h2>
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
                      <span className="text-gray-500 text-sm">Predicted Price ({prediction.forecastYears} years):</span>
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
                  <div className="mt-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-xl font-semibold text-blue-900 mb-4">{prediction.forecastYears}-Year Investment Projection</h3>
                      <div className="flex flex-col md:flex-row md:justify-between mb-6">
                        <div className="mb-4 md:mb-0">
                          <span className="text-gray-500 text-sm block">Current Value:</span>
                          <span className="text-blue-900 font-semibold text-lg">{formatINR(prediction.currentPrice)}</span>
                        </div>
                        <div className="mb-4 md:mb-0">
                          <span className="text-gray-500 text-sm block">Projected in {prediction.forecastYears} Years:</span>
                          <span className="text-blue-600 font-bold text-lg">{formatINR(prediction.predictedPrice)}</span>
                        </div>
                      </div>
                      <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={generateChartData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="year" tick={{ fill: '#4a5568' }} axisLine={{ stroke: '#e2e8f0' }} label={{ value: 'Year', position: 'insideBottomRight', offset: -5 }} />
                            <YAxis tickFormatter={(value) => `₹${(value / 1000)}k`} tick={{ fill: '#4a5568' }} axisLine={{ stroke: '#e2e8f0' }} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line type="monotone" dataKey="projectedValue" name="Projected Value" stroke="#3182ce" strokeWidth={3} dot={{ stroke: '#3182ce', strokeWidth: 2, r: 4, fill: 'white' }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="inflationAdjustedValue" name="Inflation Adjusted" stroke="#38a169" strokeWidth={3} dot={{ stroke: '#38a169', strokeWidth: 2, r: 4, fill: 'white' }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="mt-4 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                        <p className="text-blue-800 text-sm">
                          <strong>Analysis:</strong> This projection is based on your input parameters including an interest rate of {prediction.interestRate}%, inflation rate of {prediction.inflationRate}%, and forecast period of {prediction.forecastYears} years. The green line shows purchasing power after accounting for inflation.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* New Fund Analysis Section */}
                  {fundAnalysis && (
                    <div className="mt-8">
                      <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-blue-900 mb-4">Detailed Asset Analysis</h3>
                        <div className="text-gray-700 space-y-2">
                          {formatFundAnalysis(fundAnalysis)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}