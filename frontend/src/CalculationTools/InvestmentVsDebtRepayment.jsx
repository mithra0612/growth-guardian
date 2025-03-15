// App.jsx
import { useState } from 'react';

function InvestmentVsDebtRepayment() {
  const [formData, setFormData] = useState({
    principal: '',
    interestRate: '',
    tenure: '',
    type: 'investment',
    frequency: 'yearly', // compounding/repayment frequency
    additional: '', // additional monthly contribution/investment
  });
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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

    if (!principal || !rate || !time) {
      alert('Please fill all required fields with valid numbers');
      setIsCalculating(false);
      return;
    }

    setTimeout(() => {
      let calculation;
      if (formData.type === 'investment') {
        // Compound Interest with additional contributions
        const periods = time * n;
        const periodRate = rate / n;
        let futureValue = principal * Math.pow(1 + periodRate, periods);
        
        // Add additional contributions
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
          roi: ((futureValue - principal) / principal * 100).toFixed(2)
        };
      } else {
        // Debt repayment with EMI + extra payment
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
          interestPercentage: (interest / principal * 100).toFixed(2)
        };
      }

      setResult(calculation);
      setShowModal(true);
      setIsCalculating(false);
    }, 45000); // 45 seconds delay
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 transform hover:scale-[1.02] transition-transform duration-300">
        <h1 className="text-4xl font-extrabold text-primary-blue text-center mb-8 bg-gradient-to-r from-primary-blue to-blue-hover text-transparent bg-clip-text">
          Financial Analyzer (₹)
        </h1>

        <form onSubmit={calculateResults} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-primary-blue font-semibold mb-2">Principal Amount (₹)*</label>
              <input
                type="number"
                name="principal"
                value={formData.principal}
                onChange={handleInputChange}
                placeholder="Enter amount"
                min="0"
                step="1000"
                required
                className="w-full p-3 bg-blue-50 border-2 border-light-blue rounded-lg focus:outline-none focus:border-blue-hover focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            <div>
              <label className="block text-primary-blue font-semibold mb-2">Interest Rate (% p.a.)*</label>
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
                className="w-full p-3 bg-blue-50 border-2 border-light-blue rounded-lg focus:outline-none focus:border-blue-hover focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-primary-blue font-semibold mb-2">Tenure (Years)*</label>
              <input
                type="number"
                name="tenure"
                value={formData.tenure}
                onChange={handleInputChange}
                placeholder="Years"
                min="1"
                step="1"
                required
                className="w-full p-3 bg-blue-50 border-2 border-light-blue rounded-lg focus:outline-none focus:border-blue-hover focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>

            <div>
              <label className="block text-primary-blue font-semibold mb-2">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full p-3 bg-blue-50 border-2 border-light-blue rounded-lg focus:outline-none focus:border-blue-hover focus:ring-2 focus:ring-blue-200 transition-all"
              >
                <option value="investment">Investment</option>
                <option value="debt">Debt</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-primary-blue font-semibold mb-2">
                {formData.type === 'investment' ? 'Compounding Frequency' : 'Repayment Frequency'}
              </label>
              <select
                name="frequency"
                value={formData.frequency}
                onChange={handleInputChange}
                className="w-full p-3 bg-blue-50 border-2 border-light-blue rounded-lg focus:outline-none focus:border-blue-hover focus:ring-2 focus:ring-blue-200 transition-all"
              >
                <option value="yearly">Yearly</option>
                <option value="quarterly">Quarterly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div>
              <label className="block text-primary-blue font-semibold mb-2">
                {formData.type === 'investment' ? 'Monthly Contribution (₹)' : 'Extra Payment (₹)'}
              </label>
              <input
                type="number"
                name="additional"
                value={formData.additional}
                onChange={handleInputChange}
                placeholder="Optional"
                min="0"
                step="100"
                className="w-full p-3 bg-blue-50 border-2 border-light-blue rounded-lg focus:outline-none focus:border-blue-hover focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isCalculating}
            className={`w-full p-4 bg-gradient-to-r from-primary-blue to-blue-hover text-white rounded-lg font-semibold text-lg transition-all ${
              isCalculating ? 'opacity-70 cursor-not-allowed animate-pulse' : 'hover:shadow-lg'
            }`}
          >
            {isCalculating ? 'Calculating... (45s)' : 'Calculate'}
          </button>
        </form>

        {showModal && result && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 animate-fade-in">
            <div className="bg-white/95 backdrop-blur-md p-8 rounded-2xl max-w-md w-full shadow-2xl">
              <h2 className="text-2xl font-bold text-primary-blue mb-6 bg-gradient-to-r from-primary-blue to-blue-hover text-transparent bg-clip-text">
                {formData.type === 'investment' ? 'Investment Results' : 'Debt Results'}
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between p-3 bg-blue-bg rounded-lg shadow-sm">
                  <span className="text-primary-blue font-medium">Principal:</span>
                  <span className="text-blue-hover font-semibold">₹{result.principal}</span>
                </div>
                {formData.type === 'investment' ? (
                  <>
                    <div className="flex justify-between p-3 bg-blue-bg rounded-lg shadow-sm">
                      <span className="text-primary-blue font-medium">Total Value:</span>
                      <span className="text-blue-hover font-semibold">₹{result.total}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-blue-bg rounded-lg shadow-sm">
                      <span className="text-primary-blue font-medium">Interest Earned:</span>
                      <span className="text-blue-hover font-semibold">₹{result.interest}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-blue-bg rounded-lg shadow-sm">
                      <span className="text-primary-blue font-medium">Monthly Return:</span>
                      <span className="text-blue-hover font-semibold">₹{result.monthlyReturn}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-blue-bg rounded-lg shadow-sm">
                      <span className="text-primary-blue font-medium">ROI:</span>
                      <span className="text-blue-hover font-semibold">{result.roi}%</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between p-3 bg-blue-bg rounded-lg shadow-sm">
                      <span className="text-primary-blue font-medium">Monthly EMI:</span>
                      <span className="text-blue-hover font-semibold">₹{result.emi}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-blue-bg rounded-lg shadow-sm">
                      <span className="text-primary-blue font-medium">Total Payable:</span>
                      <span className="text-blue-hover font-semibold">₹{result.total}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-blue-bg rounded-lg shadow-sm">
                      <span className="text-primary-blue font-medium">Interest Paid:</span>
                      <span className="text-blue-hover font-semibold">₹{result.interest}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-blue-bg rounded-lg shadow-sm">
                      <span className="text-primary-blue font-medium">Interest %:</span>
                      <span className="text-blue-hover font-semibold">{result.interestPercentage}%</span>
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-full p-4 bg-gradient-to-r from-primary-blue to-blue-hover text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InvestmentVsDebtRepayment;