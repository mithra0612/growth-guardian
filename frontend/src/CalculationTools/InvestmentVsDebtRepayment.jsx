import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    principal: '',
    interestRate: '',
    tenure: '',
    type: 'investment',
    frequency: 'yearly',
    additional: '',
  });
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateResults = (e) => {
    e.preventDefault();
    setIsCalculating(true);

    const principal = parseFloat(formData.principal);
    const rate = parseFloat(formData.interestRate) / 100;
    const time = parseFloat(formData.tenure);
    const additional = parseFloat(formData.additional) || 0;
    const freqMap = { yearly: 1, quarterly: 4, monthly: 12 };
    const n = freqMap[formData.frequency];

    if (isNaN(principal) || isNaN(rate) || isNaN(time) || principal <= 0 || rate <= 0 || time <= 0) {
      alert('Please fill all required fields with valid positive numbers');
      setIsCalculating(false);
      return;
    }

    setTimeout(() => {
      let calculation;
      if (formData.type === 'investment') {
        const periods = time * n;
        const periodRate = rate / n;
        let futureValue = principal * Math.pow(1 + periodRate, periods);

        if (additional > 0) {
          const monthlyFactor = n === 12 ? 1 : n === 4 ? 3 : 12;
          for (let i = 1; i <= periods; i++) {
            futureValue += additional * monthlyFactor * Math.pow(1 + periodRate, periods - i);
          }
        }

        const interest = futureValue - principal - (additional * periods * (n === 12 ? 1 : n === 4 ? 3 : 12));
        calculation = {
          principal: principal.toFixed(2),
          total: futureValue.toFixed(2),
          interest: interest.toFixed(2),
          monthlyReturn: (futureValue / (time * 12)).toFixed(2),
          roi: ((futureValue - principal) / principal * 100).toFixed(2),
        };
      } else {
        const monthlyRate = rate / 12;
        const months = time * 12;
        const baseEmi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
                       (Math.pow(1 + monthlyRate, months) - 1);
        const emi = baseEmi + additional;
        const totalPayable = emi * months;
        const interest = totalPayable - principal;

        calculation = {
          principal: principal.toFixed(2),
          emi: emi.toFixed(2),
          total: totalPayable.toFixed(2),
          interest: interest.toFixed(2),
          interestPercentage: (interest / principal * 100).toFixed(2),
        };
      }

      setResult(calculation);
      setShowModal(true);
      setIsCalculating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8 border border-blue-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-800 mb-2">
            Financial Analyzer
          </h1>
          <p className="text-gray-500">Calculate investments and loans in Indian Rupees (₹)</p>
        </div>

        <div className="bg-indigo-50 p-4 rounded-lg mb-8">
          <div className="flex items-center mb-2">
            <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${formData.type === 'investment' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
              {formData.type === 'investment' ? '₹+' : '₹-'}
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">
                {formData.type === 'investment' ? 'Investment Calculator' : 'Debt Calculator'}
              </h2>
              <p className="text-sm text-gray-500">
                {formData.type === 'investment' ? 'Calculate returns on your investments' : 'Estimate your loan payments'}
              </p>
            </div>
          </div>
          
          <div className="flex">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: 'investment' }))}
              className={`flex-1 py-2 px-4 text-sm rounded-l-md transition-all ${
                formData.type === 'investment'
                  ? 'bg-blue-500 text-white font-medium'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Investment
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: 'debt' }))}
              className={`flex-1 py-2 px-4 text-sm rounded-r-md transition-all ${
                formData.type === 'debt'
                  ? 'bg-blue-500 text-white font-medium'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Debt
            </button>
          </div>
        </div>

        <form onSubmit={calculateResults} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium text-sm">Principal Amount (₹)*</label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-500">₹</span>
                <input
                  type="number"
                  name="principal"
                  value={formData.principal}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  min="0"
                  step="1000"
                  required
                  className="w-full p-3 pl-8 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all placeholder-gray-400"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium text-sm">Interest Rate (% p.a.)*</label>
              <div className="relative">
                <input
                  type="number"
                  name="interestRate"
                  value={formData.interestRate}
                  onChange={handleInputChange}
                  placeholder="Annual rate"
                  min="0"
                  max="100"
                  step="0.1"
                  required
                  className="w-full p-3 pr-8 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all placeholder-gray-400"
                />
                <span className="absolute right-3 top-3 text-gray-500">%</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium text-sm">Tenure (Years)*</label>
              <div className="relative">
                <input
                  type="number"
                  name="tenure"
                  value={formData.tenure}
                  onChange={handleInputChange}
                  placeholder="Years"
                  min="1"
                  step="1"
                  required
                  className="w-full p-3 pr-16 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all placeholder-gray-400"
                />
                <span className="absolute right-3 top-3 text-gray-500">Years</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-gray-700 font-medium text-sm">
                {formData.type === 'investment' ? 'Compounding Frequency' : 'Repayment Frequency'}
              </label>
              <select
                name="frequency"
                value={formData.frequency}
                onChange={handleInputChange}
                className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-gray-700 appearance-none"
                style={{ 
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 0.75rem center",
                  backgroundSize: "1.5em"
                }}
              >
                <option value="yearly">Yearly</option>
                <option value="quarterly">Quarterly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="block text-gray-700 font-medium text-sm">
                {formData.type === 'investment' ? 'Monthly Contribution (₹)' : 'Extra Payment (₹)'}
              </label>
              <span className="text-xs text-gray-500">Optional</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">₹</span>
              <input
                type="number"
                name="additional"
                value={formData.additional}
                onChange={handleInputChange}
                placeholder="Enter amount"
                min="0"
                step="100"
                className="w-full p-3 pl-8 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all placeholder-gray-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isCalculating}
            className={`w-full py-4 rounded-lg font-medium text-lg transition-all duration-200 ${
              formData.type === 'investment'
                ? 'bg-blue-500 hover:bg-blue-600 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } ${isCalculating ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
          >
            {isCalculating ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Calculating...
              </span>
            ) : (
              `Calculate ${formData.type === 'investment' ? 'Returns' : 'Payments'}`
            )}
          </button>
        </form>

        {showModal && result && (
          <div className="fixed inset-0 bg-gray-900/70 flex items-center justify-center p-6 z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
              <div className={`w-16 h-16 mx-auto -mt-10 rounded-full flex items-center justify-center text-white text-2xl ${formData.type === 'investment' ? 'bg-blue-500' : 'bg-blue-500'}`}>
                {formData.type === 'investment' ? '₹+' : '₹-'}
              </div>
              
              <h2 className="text-2xl text-center font-bold text-gray-800 mt-4 mb-6">
                {formData.type === 'investment' ? 'Investment Results' : 'Debt Results'}
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Principal:</span>
                  <span className="font-bold text-gray-900">₹{result.principal}</span>
                </div>
                
                {formData.type === 'investment' ? (
                  <>
                    <div className="flex justify-between p-3 bg-emerald-50 rounded-lg">
                      <span className="text-gray-700">Total Value:</span>
                      <span className="font-bold text-emerald-700">₹{result.total}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-emerald-50 rounded-lg">
                      <span className="text-gray-700">Interest Earned:</span>
                      <span className="font-bold text-emerald-700">₹{result.interest}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Monthly Return:</span>
                      <span className="font-bold text-gray-900">₹{result.monthlyReturn}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-emerald-50 rounded-lg">
                      <span className="text-gray-700">ROI:</span>
                      <span className="font-bold text-emerald-700">{result.roi}%</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-700">EMI:</span>
                      <span className="font-bold text-blue-700">₹{result.emi}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-700">Total Payment:</span>
                      <span className="font-bold text-blue-700">₹{result.total}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-gray-700">Interest Payable:</span>
                      <span className="font-bold text-blue-700">₹{result.interest}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">Interest Percentage:</span>
                      <span className="font-bold text-gray-900">{result.interestPercentage}%</span>
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-medium transition-all"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setFormData({
                      principal: '',
                      interestRate: '',
                      tenure: '',
                      type: formData.type,
                      frequency: 'yearly',
                      additional: '',
                    });
                    setResult(null);
                  }}
                  className={`flex-1 text-white py-3 rounded-lg font-medium transition-all ${
                    formData.type === 'investment' 
                      ? 'bg-blue-500 hover:bg-blue-600' 
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  New Calculation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;